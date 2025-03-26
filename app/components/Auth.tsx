"use client";
import { signIn } from "next-auth/react";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import Logo from "./navbar/Logo";
import toast from "react-hot-toast";

import { Suspense, useState } from "react";

import Loader from "./Loader";
import { useRouter } from "next/navigation";

export const Auth = () => {
  return (
    <Suspense fallback={<AuthSkeleton />}>
      <AuthSuspense />
    </Suspense>
  );
};

const AuthSkeleton = () => {
  return <Loader />;
};

const AuthSuspense = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGuest = async () => {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        email: "roamguest@roamwith.com",
        password: "roamwith2024@",
        redirect: true,
      });
      if (response?.ok) {
        toast.success("Welcome");
        router.push("/");
      }
    } catch (error) {
      toast.error(`${error}`);
    }
    setLoading(false);
  };

  return (
    <div className="relative max-w-screen-lg mx-auto flex flex-col gap-4 items-center justify-center h-screen">
      <Logo />
      <button
        className="disabled:cursor-not-allowed disabled:bg-black/30 py-2 px-6 text-xs bg-black text-white rounded-lg hover:text-black hover:bg-neutral-300"
        disabled={loading}
        onClick={loginModal.onOpen}
      >
        Login
      </button>
      <button
        className="disabled:cursor-not-allowed disabled:bg-black/30 py-2 px-6 text-xs bg-black text-white rounded-lg hover:text-black hover:bg-neutral-300"
        disabled={loading}
        onClick={registerModal.onOpen}
      >
        Register
      </button>
      <button
        onClick={() => handleGuest()}
        disabled={loading}
        className="disabled:cursor-not-allowed disabled:bg-cusGreen/30 py-2 px-6 text-xs bg-cusGreen text-white rounded-lg hover:text-cusGreen hover:bg-[#16461e]"
      >
        TESTER LOG IN
      </button>

      {loading && (
        <div className="absolute top-0 left-0 h-screen flex items-center justify-center w-full bg-white opacity-95">
          <Loader />
          <p className="absolute bg-transparent">Loading...</p>
        </div>
      )}
    </div>
  );
};
