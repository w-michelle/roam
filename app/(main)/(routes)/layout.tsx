import type { Metadata } from "next";
import { Inter } from "next/font/google";

import LoginModal from "../../components/modals/LoginModal";
import Navbar from "../../components/navbar/Navbar";

import RegisterModal from "../../components/modals/RegisterModal";
import ToasterProvider from "../../providers/ToasterProvider";
import getCurrentUser from "../../actions/getCurrentUser";
import CategoryModal from "../../components/modals/CategoryModal";
import Categorybar from "../../components/category/Categorybar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  console.log("currentUser", currentUser);
  return (
    <div>
      <ToasterProvider />

      <CategoryModal />
      <LoginModal />
      <RegisterModal />
      <Navbar currentUser={currentUser} />
      <Categorybar currentUser={currentUser} />
      {children}
    </div>
  );
}
