import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.json();
  const { timeSlot, cardId, itinId } = body.data;

  const card = await prisma?.card.update({
    where: { id: cardId, itineraryId: itinId },
    data: {
      startTime: timeSlot.stb + timeSlot.ste,
      endTime: timeSlot.etb + timeSlot.ete,
    },
  });

  return NextResponse.json(card);
}
