import React from "react";
import Logo from "./Logo";
import { LuLuggage } from "react-icons/lu";
import useCartModal from "@/app/hooks/useCartModal";
import Cart from "./Cart";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/types";
import getCart from "@/app/actions/getCart";
import Auth from "../Auth";
import CartModal from "../modals/CartModal";

interface NavbarProps {
  currentUser: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = async ({ currentUser }) => {
  if (!currentUser) {
    return <Auth />;
  }
  const cart = await getCart(currentUser?.id);

  return (
    <div className="flex justify-between items-center p-3 border-b-[1px]">
      <Logo />
      <div className="flex items-end gap-4">
        <Cart cart={cart} />
        <UserMenu currentUser={currentUser} />
      </div>
      <CartModal cart={cart} />
    </div>
  );
};

export default Navbar;
