import PostForm from "@/components/admin/PostForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Typography } from "@mui/material";

export default async function EditPostPage({ params }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    notFound();
  }

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
      <PostForm post={post} />
    </div>
  );
}
