import getAllListing from "../../actions/getAllListings";
import getCategory from "../../actions/getCategory";
import getCurrentUser from "../../actions/getCurrentUser";
import Auth from "../../components/Auth";

import AllListingsContent from "../../components/listing/AllListingsContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <Auth />;
  }

  const listings = await getAllListing();

  if (!listings) {
    return null;
  }

  const categories = await getCategory(currentUser?.id);
  return (
    <div className="flex gap-2 mt-2 p-3">
      <AllListingsContent listings={listings} categories={categories} />
    </div>
  );
}
