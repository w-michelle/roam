import getCurrentCategory from "@/app/actions/getCurrentCategory";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingsByCat from "@/app/actions/getListingsByCat";
import CategoryContent from "./CategoryContent";
import getCategory from "@/app/actions/getCategory";

interface IParams {
  categoryId: string;
}
const CategoryPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const listings = await getListingsByCat(params.categoryId);
  const currentCategory = await getCurrentCategory(params.categoryId);

  if (!listings || !currentCategory || !currentUser) {
    return null;
  }
  const categories = await getCategory(currentUser?.id);
  return (
    <CategoryContent
      listings={listings}
      currentCategory={currentCategory}
      categories={categories}
    />
  );
};

export default CategoryPage;
