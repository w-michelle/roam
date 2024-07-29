import React from "react";
import getCurrentUser from "../../actions/getCurrentUser";
import getCategory from "../../actions/getCategory";

import CategoryClient from "./CategoryClient";
import { SafeCategory, SafeUser } from "@/types";
import Auth from "../Auth";

interface CategorybarProps {
  currentUser?: SafeUser | null;
}
const Categorybar: React.FC<CategorybarProps> = async ({ currentUser }) => {
  if (!currentUser) {
    return;
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
