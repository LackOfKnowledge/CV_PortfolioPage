import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditPostForm from "@/components/admin/EditPostForm";

export default async function EditPostPage({ params }) {
  const { slug } = params;

  const post = await prisma.post.findUnique({
    where: { slug: slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4 }}
      >
        Edytuj Post
      </Typography>
      <EditPostForm post={post} />
    </Box>
  );
}
