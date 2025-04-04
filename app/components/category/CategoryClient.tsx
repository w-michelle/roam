"use client";

import useCategoryModal from "@/app/hooks/useCategoryModal";
import { SafeCategory, SafeUser } from "@/types";
import { Category } from "@prisma/client";
import React, { Suspense } from "react";
import { IoIosAdd } from "react-icons/io";
import { categoryIcons } from "../modals/CategoryModal";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";

interface CategoryClientProps {
  categories?: SafeCategory[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
  categories,
}) => {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryClientSuspense categories={categories} />
    </Suspense>
  );
};

const CategorySkeleton = () => {
  const categoryBlock = Array.from({ length: 10 });

  return (
    <div>
      <div className="flex gap-4 overflow-x-auto">
        <div className="flex gap-4">
          {categoryBlock?.map((_, index) => (
            <div
              key={index}
              className="text-center relative"
            >
              <div className="rounded-lg p-3 w-[50px] h-[50px] flex items-center justify-center bg-neutral-300 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CategoryClientSuspense: React.FC<CategoryClientProps> = ({
  categories,
}) => {
  const loginModal = useLoginModal();

  const categoryModal = useCategoryModal();
  const router = useRouter();
  const renderIcon = (iconName: string) => {
    const Icon = categoryIcons.find((item) => item.name === iconName);
    if (Icon) {
      return <Icon.icon size={25} />;
    } else {
      return null;
    }
  };

  const gradientIcon = (first: string, second: string) => {
    return `linear-gradient(to left top, ${first}, ${second})`;
  };

  return (
    <div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        <div
          onClick={categoryModal.onOpen}
          className="cursor-pointer rounded-lg p-3 border-[1px] border-black w-[50px] h-[50px] flex items-center justify-center"
        >
          <IoIosAdd size={25} />
        </div>
        <div className="flex gap-4">
          {categories?.map((category) => (
            <div
              key={category.id}
              className="text-center relative"
              onClick={() => router.push(`/category/${category.id}`)}
            >
              <div className="cursor-pointer rounded-lg p-3 border-[1px] border-black w-[50px] h-[50px] flex items-center justify-center">
                {category.icon.includes("custom") ? (
                  <div
                    className={`w-7 h-6 `}
                    style={{
                      backgroundImage: `${gradientIcon(
                        category.icon.split(" ")[1],
                        category.icon.split(" ")[2]
                      )}`,
                    }}
                  ></div>
                ) : (
                  renderIcon(category.icon)
                )}
              </div>
              <div className="text-sm w-[50px] truncate">{category.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
