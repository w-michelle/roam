"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import { SafeUser } from "@/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <div className="">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center gap-2 border-[1px] border-neutral-300 shadow-sm py-1 px-3 rounded-3xl hover:shadow-md"
      >
        <AiOutlineMenu size={20} />
        <div className="rounded-full">
          <Avatar src={currentUser?.image} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute p-2 w-[200px] bg-white right-3 top-20 rounded-xl shadow-md z-20">
          {currentUser ? (
            <div className="flex flex-col gap-2 cursor-pointer z-5">
              <div
                onClick={() => router.push("/myItineraries")}
                className="hover:bg-neutral-100 transition px-4 py-2"
              >
                My Itineraries
              </div>
              <div
                onClick={() => signOut()}
                className="hover:bg-neutral-100 transition px-4 py-2"
              >
                Log out
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 cursor-pointer z-5">
              <div
                onClick={loginModal.onOpen}
                className="hover:bg-neutral-100 transition px-4 py-2"
              >
                Log in
              </div>
              <div
                onClick={registerModal.onOpen}
                className="hover:bg-neutral-100 transition px-4 py-2"
              >
                Register
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
