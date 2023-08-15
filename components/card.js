import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFT_ADDRESS, MARKETPLACE_ADDRESS } from "../const/address.js"
import { useContract, useValidDirectListings } from "@thirdweb-dev/react";
import Link from "next/link";
export default function NftCard({ nftData }) {
    const { contract: marketplace, isLoading: loadingMarketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

    const { data: directListing, isLoading: loadingDirectListing } =
        useValidDirectListings(marketplace, {
            tokenContract: NFT_ADDRESS,
            tokenId: nftData.id,
        });
    console.log(directListing)
    return (
        <Link
            href={`/token/${NFT_ADDRESS}/${nftData.id}`}
            key={nftData.id}
            className="text-slate-100"
        >

            {loadingMarketplace || loadingDirectListing ? (<div>Hold on</div>) :
                directListing && directListing[0] ? (
                    <div className="transition ease-in-out delay-0 hover:-translate-y-5 hover:scale-105 duration-300 flex flex-col justify-start m-6 basis-1/4 relative overflow-hidden">
                        <div className='grow relative overflow-hidden'>
                            <ThirdwebNftMedia metadata={nftData} height="100%" />
                        </div >
                        <div className="font-serif text-5xl p-2 opacity-80">{nftData.name}</div>
                        <div className="font-serif text-xl ps-2 opacity-50">Price</div>
                        <div className="font-serif text-xl ps-2 opacity-50">{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</div>
                    </div >) :
                    (<div className="transition ease-in-out delay-0 hover:-translate-y-5 hover:scale-105 duration-300 flex flex-col justify-start m-6 basis-1/4 relative overflow-hidden">
                        <div className='grow relative overflow-hidden'>
                            <ThirdwebNftMedia metadata={nftData} height="100%" />
                        </div >
                        <div className="font-serif text-5xl p-2 opacity-80">{nftData.name}</div>
                        <div className="font-serif text-xl ps-2 opacity-50">Not Listed</div>
                    </div >)
            }
        </Link>
    )
}