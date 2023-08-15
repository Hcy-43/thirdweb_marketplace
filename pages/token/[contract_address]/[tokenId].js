import { MediaRenderer, useAddress, useOwnedNFTs, useNFT, useNFTs, ThirdwebNftMedia, Web3Button, useContract, useMinimumNextBid, useValidDirectListings, useValidEnglishAuctions } from "@thirdweb-dev/react";
import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import { MARKETPLACE_ADDRESS } from "../../../const/address.js";
import { useRouter } from "next/router.js";

export default function NftInfo() {
    const router = useRouter();
    const signer = useAddress();
    const { contract_address, tokenId } = router.query;
    const { contract } = useContract(contract_address);
    const { data, isLoading, error } = useNFT(contract, tokenId);
    let owner;
    if (!isLoading) owner = data.owner;



    const { contract: marketplace, isLoading: loadingMarketplace } =
        useContract(
            MARKETPLACE_ADDRESS,
            "marketplace-v3"
        );


    const { data: directListing, isLoading: loadingDirectListing } =
        useValidDirectListings(marketplace, {
            tokenContract: contract_address,
            tokenId: tokenId,
        });

    const isOwner = owner === signer ? true : false;

    async function buyListing() {
        let txResult;

        if (directListing?.[0]) {
            txResult = await marketplace?.directListings.buyFromListing(
                directListing[0].id,
                1
            );
        } else {
            throw new Error("No listing found");
        }

        return txResult;
    }

    return (
        !isLoading &&
        <div className="flex flex-row items-start p-5 w-full">
            <div className="w-1/2">
                <ThirdwebNftMedia metadata={data.metadata} height="100%" width="100%" className="m-3" />
            </div>
            <div className="flex flex-col w-1/2 flex-start items-start ml-8 mt-0">
                <div className="font-serif text-8xl mb-5 opacity-80">{data.metadata.name}</div>
                <div className="font-serif text-4xl opacity-40">Owner</div>
                <div className="font-serif text-2xl mb-3 opacity-80 overflow-hidden truncate">{owner}</div>
                <div className="font-serif text-4xl opacity-40">Description</div>
                {
                    data.metadata.description ? (
                        <div className="font-serif text-2xl mb-3 opacity-80 overflow-hidden">{data.metadata.description}</div>
                    ) : (
                        <div className="font-serif text-2xl mb-3 opacity-80 overflow-hidden">No description</div>
                    )
                }
                {
                    isOwner ? (<div>
                        <div className="font-serif text-4xl opacity-50">Price</div>
                                <div className="font-serif text-2xl opacity-80">{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</div>
                        <div className="font-serif text-4xl mt-3 opacity-50">You are the Owner</div>
                    </div>) :
                        directListing && directListing[0] ?
                            (<div>
                                <div className="font-serif text-4xl opacity-50">Price</div>
                                <div className="font-serif text-2xl opacity-80">{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</div>
                                <button type="button" onClick={buyListing} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-5xl px-5 py-2.5 text-center m-3 ml-0 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                                    Buy this NFT
                                </button>
                            </div>

                            )
                            : (<div>
                                <div className="font-serif text-4xl opacity-50">Not For Sale</div>
                            </div>)
                }
            </div>
        </div>
    )
}

