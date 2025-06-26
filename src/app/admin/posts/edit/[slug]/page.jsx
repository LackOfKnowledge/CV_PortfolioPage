import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SimpleMdeEditor from "@/components/admin/SimpleMdeEditor";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updatePost } from "@/app/actions/postActions";

export default async function EditPostPage({ params }) {
  const { slug } = params;
  const post = await prisma.post.findUnique({
    where: { slug: slug },
  });

  if (!post) {
    notFound();
  }

  // Wiążemy slug posta z akcją aktualizacji
  const updatePostWithSlug = updatePost.bind(null, post.slug);

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4 }}
      >
        Edytuj Post
      </Typography>
      <form action={updatePostWithSlug}>
        <TextField
          fullWidth
          label="Tytuł Posta"
          name="title"
          defaultValue={post.title}
          variant="outlined"
          sx={{ mb: 2 }}
          required
        />
        <SimpleMdeEditor
          name="content"
          initialValue={post.content}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Zapisz zmiany
        </Button>
      </form>
    </Box>
  );
}
