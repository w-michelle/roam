import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
export async function POST(request: Request) {
  const listing = await request.json();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  try {
    const cart = (await getCart()) ?? (await createCart());

    const itemInCart = cart?.listings?.find(
      (item: any) => item.id === listing.id
    );

    if (itemInCart) {
      return new NextResponse("Already in bucket");
    } else {
      let allListings = [cart?.listings];
      allListings?.push(listing);
      const updatedCart = await prisma?.cart.update({
        where: { id: cart?.id },
        data: {
          listings: {
            connect: { id: listing.id },
          },
        },
      });
      return NextResponse.json(updatedCart);
    }
  } catch (error: any) {
    return NextResponse.json(error);
  }
}

async function getCart() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }
  const cart = await prisma?.cart.findFirst({
    where: { userId: currentUser.id },
    include: { listings: { include: { images: true } } },
  });
  if (cart) {
    const safeCart = { ...cart, createdAt: cart.createdAt.toISOString() };
    return safeCart;
  } else {
    return null;
  }
}

export async function createCart() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const cart = await prisma?.cart.create({
    data: {
      userId: currentUser.id,
    },
  });
  const newCart = { ...cart, listings: [] };
  return newCart;
}
