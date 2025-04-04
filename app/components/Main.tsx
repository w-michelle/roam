"use client";
import useListingModal from "@/app/hooks/useListingModal";
import { SafeCategory, SafeListing } from "@/types";
import React from "react";
import { IoMdAdd } from "react-icons/io";

import ListingModal from "./modals/ListingModal";
import EmptyState from "./EmptyState";
import { AllListings } from "./listing/AllListings";

interface MainProp {
  listings: SafeListing[];
  categories?: SafeCategory[];
}
const Main: React.FC<MainProp> = ({ listings, categories }) => {
  const listingModal = useListingModal();

  return (
    <div className=" w-full">
      <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4 w-full">
        <div
          onClick={listingModal.onOpen}
          className="hover:bg-neutral-400 hover:text-white hover:cursor-pointer min-w-[150px] h-[150px] border-2 border-neutral-200  rounded-xl shadow-md flex items-center justify-center"
        >
          <IoMdAdd size={28} />
        </div>
        <AllListings listings={listings} />
      </div>

      <div className="w-full flex items-center justify-center">
        {listings?.length === 0 && <EmptyState title="No listings yet" />}
      </div>
      <ListingModal categories={categories} />
    </div>
  );
};

export default Main;
