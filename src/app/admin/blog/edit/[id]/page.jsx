// Plik: src/app/admin/blog/edit/[id]/page.jsx
import PostForm from "@/components/admin/PostForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Typography } from "@mui/material";

async function getCategories() {
  return await prisma.category.findMany({ orderBy: { name: "asc" } });
}

export default async function EditPostPage({ params }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    notFound();
  }

  const categories = await getCategories();

  return (
    <div>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        fontWeight="bold"
      >
        Edytujesz: {post.title}
      </Typography>
      <PostForm
        post={post}
        categories={categories}
      />
    </div>
  );
}
