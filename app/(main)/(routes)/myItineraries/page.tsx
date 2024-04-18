import getAllItins from "@/app/actions/getAllItins";
import { formatCalDate, formatSingleDate } from "@/utils/formatDate";
import Link from "next/link";
import React from "react";

const MyItineraries = async () => {
  const allItins = await getAllItins();

  return (
    <div className="relative p-3 my-8 max-w-screen-lg mx-auto h-screen">
      <div className="text-center flex flex-col gap-6">
        <h1>All Itineraries</h1>

        <ul className="flex flex-col gap-4 my-10 mx-7">
          {allItins.map((item, index) => (
            <Link href={`/itinerary/${item.id}`} key={index}>
              <li className="cursor-pointer border-b-[1px] hover:border-cusGreen border-neutral-500/70 flex justify-between px-2">
                <h3>{item.title || "Itinerary"}</h3>
                <div className="text-sm">
                  {formatCalDate(new Date(item.createdAt))}
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyItineraries;
