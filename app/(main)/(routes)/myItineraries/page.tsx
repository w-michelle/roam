import getAllItins from "@/app/actions/getAllItins";
import Link from "next/link";
import React from "react";

import ItinContent from "./ItinContent";
import { all } from "axios";
import EmptyState from "@/app/components/EmptyState";

export const dynamic = "force-dynamic";
const MyItineraries = async () => {
  const allItins = await getAllItins();

  if (allItins.length == 0) {
    return <EmptyState title="No Itineraries" />;
  }

  return (
    <div className="relative p-3 my-8 max-w-screen-lg mx-auto h-screen">
      <div className="text-center flex flex-col gap-6">
        <h1>All Itineraries</h1>

        <ul className="flex flex-col gap-4 my-10 mx-7">
          {allItins.map((item, index) => (
            <Link href={`/itinerary/${item.id}`} key={index}>
              <ItinContent item={item} />
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyItineraries;
