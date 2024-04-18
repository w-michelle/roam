import React from "react";
import getCurrentUser from "../../actions/getCurrentUser";
import getCategory from "../../actions/getCategory";

import CategoryClient from "./CategoryClient";
import { SafeCategory, SafeUser } from "@/types";
import NoUser from "../NoUser";

interface CategorybarProps {
  currentUser?: SafeUser | null;
}
const Categorybar: React.FC<CategorybarProps> = async ({ currentUser }) => {
  if (!currentUser) {
    return <NoUser />;
  }
  const categories = await getCategory(currentUser?.id);

  return (
    <div className="p-3 border-b-[1px]">
      <div>
        <CategoryClient categories={categories} />
      </div>
    </div>
  );
};

export default Categorybar;
