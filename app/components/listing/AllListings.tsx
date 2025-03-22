import useCartModal from "@/app/hooks/useCartModal";
import { SafeListing } from "@/types";
import axios from "axios";

import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import toast from "react-hot-toast";

import Listing from "./Listing";

interface AllListingProps {
  listings: SafeListing[];
}

export const AllListings: React.FC<AllListingProps> = async ({ listings }) => {
  return (
    <Suspense fallback={<AllListingsSkeleton />}>
      <AllListingsSuspense listings={listings} />
    </Suspense>
  );
};

const AllListingsSkeleton = () => {
  const blocks = Array.from({ length: 15 });

  return (
    <div className="flex justify-center sm:justify-start gap-4 flex-wrap">
      {blocks.map((_, index) => (
        <div
          key={index}
          className="relative hover:cursor-pointer border-2 border-neutral-200 p-3 rounded-xl shadow-md bg-neutral-300 animate-pulse"
        >
          <div className="relative w-[150px] h-[150px]"></div>
        </div>
      ))}
    </div>
  );
};

const AllListingsSuspense: React.FC<AllListingProps> = ({ listings }) => {
  const router = useRouter();
  const cartModal = useCartModal();
  const handleAddToCart = (item: any) => {
    axios
      .post("/api/addToCart", item)
      .then(() => {
        toast.success("Added to bucket!");
        router.refresh();
        cartModal.onOpen();
      })
      .catch((error: any) => {
        toast.error("Something went wrong");
      });
  };

  const handleDeleteListing = (listingId: any) => {
    axios
      .delete(`/api/listings/${listingId}`)
      .then(() => {
        toast.success("Removed Listing");
        router.refresh();
      })
      .catch((error: any) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="flex justify-center sm:justify-start gap-4 flex-wrap">
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="relative hover:cursor-pointer border-2 border-neutral-200 p-3 rounded-xl shadow-md"
        >
          <Listing
            listing={listing}
            handleAddToCart={(value: SafeListing) => handleAddToCart(value)}
            handleDeleteListing={(value: string) => handleDeleteListing(value)}
          />
        </div>
      ))}
    </div>
  );
};
