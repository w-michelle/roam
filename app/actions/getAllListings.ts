import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ca-central-1",
  credentials: {
    accessKeyId: process.env.A_ACCESS_KEY as string,
    secretAccessKey: process.env.A_SECRET_KEY as string,
  },
});
export const dynamic = "force-dynamic";
export default async function getAllListing() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  try {
    const listings = await prisma?.listing.findMany({
      where: { userId: currentUser.id },
      include: { images: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (listings) {
      for (let i = 0; i < listings.length; i++) {
        for (let j = 0; j < listings[i].images.length; j++) {
          const params = {
            Bucket: process.env.A_BUCKET_NAME,
            Key: listings[i].images[j].imageKey,
          };
          const command = new GetObjectCommand(params);
          const url = await getSignedUrl(s3Client, command, {
            expiresIn: 3600,
          });
          listings[i].images[j].url = url;
        }
      }
    }

    const safeListing = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
