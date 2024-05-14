"use client";
import { formatCalDate } from "@/utils/formatDate";
import { Itinerary } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

interface ItinContentProp {
  item: Itinerary;
}

const ItinContent: React.FC<ItinContentProp> = ({ item }) => {
  const router = useRouter();
  const handleDelete = (itinId: string) => {
    axios
      .delete("/api/deleteItinerary", { data: { id: itinId } })
      .then(() => {
        toast.success("Itinerary deleted");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };
  return (
    <>
      <li className="cursor-pointer border-b-[1px] hover:border-cusGreen border-neutral-500/70 flex justify-between px-2">
        <h3>{item.title || "Itinerary"}</h3>
        <div className="text-sm ml-auto">
          {formatCalDate(new Date(item.createdAt))}
        </div>
        <div onClick={() => handleDelete(item.id)}>
          <IoMdClose
            size={20}
            className="ml-3 text-neutral-400 hover:text-black cursor-pointer"
          />
        </div>
      </li>
    </>
  );
};

export default ItinContent;
