// Plik: src/app/admin/blog/new/page.jsx
import PostForm from "@/components/admin/PostForm";
import { Typography } from "@mui/material";
import prisma from "@/lib/prisma";

async function getCategories() {
  return await prisma.category.findMany({ orderBy: { name: "asc" } });
}

export default async function NewPostPage() {
  const categories = await getCategories();
  return (
    <div>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        fontWeight="bold"
      >
        Nowy Post
      </Typography>
      <PostForm categories={categories} />
    </div>
  );
}
