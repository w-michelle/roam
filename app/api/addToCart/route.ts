import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCart from "@/app/actions/checkCart";
import createCart from "@/app/actions/createCart";
export async function POST(request: Request) {
  const listing = await request.json();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  try {
    const cart = (await getCart()) ?? (await createCart());
    console.log("addtocart cart: did we get or create?;", cart);
    const itemInCart = cart?.listings?.find(
      (item: any) => item.id === listing.id
    );
    console.log("listing added to cart", listing);

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
