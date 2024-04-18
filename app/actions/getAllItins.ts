import { NextResponse } from "next/server";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";
export default async function getAllItins() {
  try {
    const currentUser = await getCurrentUser();

    const itineraries = await prisma.itinerary.findMany({
      where: { userId: currentUser?.id },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return itineraries;
  } catch (error: any) {
    throw new Error(error);
  }
}
