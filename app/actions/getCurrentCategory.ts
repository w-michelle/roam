import prisma from "@/app/libs/prismadb";
export default async function getCurrentCategory(catId: string) {
  try {
    const category = await prisma?.category.findFirst({
      where: { id: catId },
    });
    if (!category) {
      return null;
    }
    return {
      ...category,
      createdAt: category.createdAt.toString(),
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
