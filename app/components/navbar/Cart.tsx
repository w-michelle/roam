"use client";
import useCartModal from "@/app/hooks/useCartModal";
import { SafeCart } from "@/types";
import React from "react";
import { LuLuggage } from "react-icons/lu";
interface CartModalProp {
  cart?: SafeCart | null;
}

const Cart: React.FC<CartModalProp> = ({ cart }) => {
  const cartModal = useCartModal();

  return (
    <div>
      <button
        onClick={() => cartModal.onOpen()}
        className="relative hover:cursor-pointer"
      >
        <LuLuggage size={25} className="relative" />
        {cart && (
          <span
            className={`absolute text-xs text-center top-[-4px] right-[-4px] ${
              cart?.listings.length > 0 ? "" : "hidden"
            } rounded-full bg-cusGreen h-2 w-2`}
          ></span>
        )}
      </button>
    </div>
  );
};

export default Cart;
