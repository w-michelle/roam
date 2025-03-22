import type { Metadata } from "next";
import { Inter } from "next/font/google";

import LoginModal from "../../components/modals/LoginModal";
import Navbar from "../../components/navbar/Navbar";

import RegisterModal from "../../components/modals/RegisterModal";
import ToasterProvider from "../../providers/ToasterProvider";
import getCurrentUser from "../../actions/getCurrentUser";
import CategoryModal from "../../components/modals/CategoryModal";
import Categorybar from "../../components/category/Categorybar";
import ClientOnly from "@/app/components/ClientOnly";
import { useSession } from "next-auth/react";
import { Auth } from "@/app/components/Auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return (
      <div className="relative">
        <ToasterProvider />

        <CategoryModal />

        <Navbar currentUser={currentUser} />
        <Categorybar currentUser={currentUser} />

        {children}
      </div>
    );
  }

  return (
    <div className="relative">
      <LoginModal />
      <RegisterModal />
      <Auth />
    </div>
  );
}
