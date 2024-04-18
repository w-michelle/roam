import getListing from "@/app/actions/getListing";
import React from "react";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getCategory from "@/app/actions/getCategory";

interface IParams {
  listingId?: string;
}
const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListing(params);
  const currentUser = await getCurrentUser();

  if (!listing || !currentUser) {
    return null;
  }
  const categories = await getCategory(currentUser.id);
  return (
    <div>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        categories={categories}
      />
    </div>
  );
};

export default ListingPage;
