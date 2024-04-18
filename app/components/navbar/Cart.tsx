"use client";
import useCartModal from "@/app/hooks/useCartModal";
import React from "react";
import { LuLuggage } from "react-icons/lu";
const Cart = () => {
  const cartModal = useCartModal();
  return (
    <div>
      <button
        onClick={() => cartModal.onOpen()}
        className="hover:cursor-pointer"
      >
        <LuLuggage size={25} />
      </button>
    </div>
  );
};

export default Cart;
