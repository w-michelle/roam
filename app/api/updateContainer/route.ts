import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { Card, Container } from "@prisma/client";
export async function POST(request: Request) {
  const body = await request.json();

  const { dates, containers, itinId } = body.data;

  try {
    const existingItinerary = await prisma.itinerary.update({
      where: { id: itinId },
      data: {
        startDate: dates.startDate,
        endDate: dates.endDate,
        container: {
          deleteMany: {},
          create: containers.map((container: any) => ({
            order: container.order,
            id: container.id,

            cards: {
              create: container.cards.map((card: any) => ({
                order: card.order,
                startTime: card.startTime,
                endTime: card.endTime,
                listingId: card.listingId,
                userId: card.userId,
                itineraryId: itinId,
              })),
            },
          })),
        },
      },
    });
    return NextResponse.json(existingItinerary);
  } catch (error) {
    return new NextResponse(`${error}`);
  }
}
