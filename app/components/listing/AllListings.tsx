import useCartModal from "@/app/hooks/useCartModal";
import { SafeListing } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import Listing from "./Listing";
import EmptyState from "../EmptyState";

interface AllListingProps {
  listings: SafeListing[];
}

const AllListings: React.FC<AllListingProps> = ({ listings }) => {
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
    <div className="flex gap-4 flex-wrap">
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

export default AllListings;
