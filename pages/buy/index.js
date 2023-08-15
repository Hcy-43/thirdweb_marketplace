import Image from "next/image";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFT_ADDRESS, MARKETPLACE_ADDRESS } from "../../const/address.js"
import { useContract, useValidDirectListings } from "@thirdweb-dev/react";
import NftCard from "../../components/card";
import Link from "next/link";

export default function Home() {
    const { contract: marketplace, isLoading: loadingMarketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

    const { data: directListing, isLoading: loadingDirectListing } =useValidDirectListings(marketplace);
    console.log(directListing)
    return (
        <div>
            <div className="text-5xl font-semibold m-2 ml-5 mt-5">
                Listed NFT(s)
            </div>
            <div className="flex flex-row flex-wrap justify-start items-start p-4">
                {
                    !loadingDirectListing ? (directListing.map((nft, i) => {
                        return (
                            <NftCard key={i} nftData={nft.asset}></NftCard>)
                    })) : (
                        <div>Still Loading</div>
                    )
                }
            </div>
        </div>
    );
}
