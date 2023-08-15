import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { NFT_ADDRESS } from "../../const/address";
import NftCard from "../../components/sellCard";
import Link from "next/link";
export default function Sell() {
    const signer = useAddress();
    const { contract } = useContract(NFT_ADDRESS);
    const { data, isLoading, error } = useOwnedNFTs(contract, signer);
    if (!isLoading) console.log(data)
    return (
        <div>
            <div className="text-5xl font-semibold m-2 ml-5 mt-5">
                Sell my NFT(s)
            </div>
            <div className="flex flex-row flex-wrap justify-start items-start p-4">
                {
                    !isLoading ? (data.map((nft, i) => {
                        return (
                            <NftCard key={i} nftData={nft.metadata}></NftCard>
                        )
                    })) : (
                        <div>Still Loading</div>
                    )
                }
            </div>
        </div>
    );
}
