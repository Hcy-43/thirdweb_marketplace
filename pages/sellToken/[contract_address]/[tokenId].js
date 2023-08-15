import { useState } from "react";
import { NFT as NFTType } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { MediaRenderer, useCreateDirectListing, useAddress, useOwnedNFTs, useNFT, useNFTs, ThirdwebNftMedia, Web3Button, useContract, useMinimumNextBid, useValidDirectListings, useValidEnglishAuctions } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../../../const/address.js";



export default function NftInfo() {
    const router = useRouter();
    const signer = useAddress();
    const { contract_address, tokenId } = router.query;
    const { contract } = useContract(contract_address);
    const { data, isLoading, error } = useNFT(contract, tokenId);

    const [price, setPrice] = useState()


    const { contract: marketplace, isLoading: loadingMarketplace } =
        useContract(
            MARKETPLACE_ADDRESS,
            "marketplace-v3"
        );

    const { mutateAsync: createDirectListing } = useCreateDirectListing(marketplace);
    const { data: directListing, isLoading: loadingDirectListing } =
        useValidDirectListings(marketplace, {
            tokenContract: contract_address,
            tokenId: tokenId,
        });

    async function createListing() {
        if (price <= 0) return;
        const txResult = await createDirectListing({
            assetContractAddress: contract_address, // Required - smart contract address of NFT to sell
            tokenId: tokenId, // Required - token ID of the NFT to sell
            pricePerToken: price, // Required - price of each token in the listing
        });
    }

    return (
        !isLoading &&
        <div className="flex flex-row items-start p-5 w-full">
            <div className="w-1/2">
                <ThirdwebNftMedia metadata={data.metadata} height="100%" width="100%" className="m-3" />
            </div>
            <div className="flex flex-col w-1/2 flex-start items-start ml-8 mt-0">
                <div className="font-serif text-8xl mb-5 opacity-80">{data.metadata.name}</div>
                <div className="mb-6">
                    <label for="price" className="block mb-2 text-4xl font-medium opacity-50">Listing Price (ETH)</label>
                    <input type="price" id="price" onChange={(e) => setPrice(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required></input>
                </div>
                <button type="button" onClick={createListing} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-5xl px-5 py-2.5 text-center m-3 ml-0 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                    Create Direct Listing
                </button>
            </div>
        </div>
    )
}

