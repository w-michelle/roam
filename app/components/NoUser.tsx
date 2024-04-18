"use client";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import Logo from "./navbar/Logo";

const NoUser = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
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
    </div>
  );
};

export default NoUser;
