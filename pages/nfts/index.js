import { useAddress, useContract, useNFTs } from "@thirdweb-dev/react";
import { NFT_ADDRESS } from "../../const/address";
import NftCard from "../../components/card";

export default function AllNfts() {
  const signer = useAddress();
  const { contract } = useContract(NFT_ADDRESS);
  const { data, isLoading, error } = useNFTs(contract);
  if (!isLoading) console.log(data)
  return (
    <div>
      <div className="text-5xl m-2 font-semibold ml-5 mt-5">
        All NFTs
      </div>
      <div className="flex flex-row flex-wrap justify-start items-start p-4">
        {
          !isLoading ? (data.map((nft, i) => {
            return (
              <NftCard key={i} nftData={nft.metadata}></NftCard>)
          })) : (
            <div>Still Loading</div>
          )
        }
      </div>
    </div>
  );
}
