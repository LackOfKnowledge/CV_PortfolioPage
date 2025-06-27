import prisma from "@/lib/prisma";
import { Typography } from "@mui/material";
import CategoryManager from "./CategoryManager";

export const dynamic = "force-dynamic";

async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  } catch (e) {
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        fontWeight="bold"
      >
        Zarządzaj Kategoriami
      </Typography>
      <CategoryManager initialCategories={categories} />
    </>
  );
}
