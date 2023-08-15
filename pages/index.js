import { useAddress } from "@thirdweb-dev/react";
import { useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { NFT_ADDRESS } from "../const/address";
import NftCard from "../components/card";
import Link from "next/link";

export default function Home() {
  const signer = useAddress();
  const { contract } = useContract(NFT_ADDRESS);
  const { data, isLoading, error } = useOwnedNFTs(contract, signer);
  if (!isLoading) console.log(data)
  return (
    <div className="flex flex-col h-screen p-12 flex-wrap">
      {/* title */}
      <div className="flex justify-center items-center h-2/3">
        <div className="text-8xl font-medium font-serif">
          Welcome to CY{" "}
          <div className="text-8xl font-medium font-serif underline text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            MarketPlace
          </div>
        </div>
      </div>
      {/* buttons */}
      <div className="flex flex-start justify-between px-32 flex-wrap">
        <Link href="/myNFT" className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-4xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          <span className="relative px-5 py-5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            My Nfts
          </span>
        </Link>
        <Link href="/buy" className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-4xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          <span className="relative px-5 py-5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Buy Nfts
          </span>
        </Link>
        <Link href="/sell" className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-4xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          <span className="relative px-5 py-5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Sell Nfts
          </span>
        </Link>
        <Link href="/nfts" className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-4xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          <span className="relative px-5 py-5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            All Nfts
          </span>
        </Link>
      </div>
    </div>
  );
}
