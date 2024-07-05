import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();

  const { dates, containers, itinId, dateLen, cards } = body.data;

  try {
    for (let i = 0; i < dateLen; i++) {
      if (i == 0) {
        await prisma.container.create({
          data: {
            itineraryId: itinId,
            cards: {
              connect: cards.map((card: any) => ({ id: card.id })),
            },
          },
        });
      } else {
        await prisma.container.create({
          data: {
            itineraryId: itinId,
            cards: {
              create: [],
            },
          },
        });
      }
    }
    for (let i = 0; i < containers.length; i++) {
      await prisma.container.deleteMany({
        where: { id: containers[i].id },
      });
    }

    await prisma.itinerary.update({
      where: { id: itinId },
      data: {
        startDate: new Date(dates.startDate),
        endDate: new Date(dates.endDate),
      },
    });

    const containersThisItin = await prisma.container.findMany({
      where: { itineraryId: itinId },
      include: {
        cards: {
          include: { listing: { include: { images: true } } },
        },
      },
    });

    return NextResponse.json(containersThisItin);
  } catch (error) {
    return new NextResponse(`${error}`);
  }
}
