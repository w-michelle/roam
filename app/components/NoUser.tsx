"use client";
import { signIn } from "next-auth/react";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import Logo from "./navbar/Logo";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const NoUser = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();
  const handleGuest = () => {
    signIn("credentials", {
      email: "roamguest@roamwith.com",
      password: "roamwith2024@",
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast.success("Welcome");
        window.location.reload();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col gap-4 items-center justify-center h-screen">
      <Logo />
      <button
        className="py-2 px-6 text-xs bg-black text-white rounded-lg"
        onClick={loginModal.onOpen}
      >
        Login
      </button>
      <button
        className="py-2 px-6 text-xs bg-black text-white rounded-lg"
        onClick={registerModal.onOpen}
      >
        Register
      </button>
      <button
        onClick={() => handleGuest()}
        className="py-2 px-6 text-xs bg-cusGreen text-white rounded-lg hover:text-cusGreen hover:bg-[#16461e]"
      >
        Guest Sign In
      </button>
    </div>
  );
};

export default NoUser;
