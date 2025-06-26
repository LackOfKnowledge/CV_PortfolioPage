import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditPostForm from "@/components/admin/EditPostForm";

// Ta strona jest teraz Komponentem Serwerowym
export default async function EditPostPage({ params }) {
  const { slug } = params;

  // Pobieramy dane posta bezpośrednio na serwerze
  const post = await prisma.post.findUnique({
    where: { slug: slug },
  });

  // Jeśli nie ma posta, wyświetlamy stronę 404
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
      {/* Renderujemy formularz i przekazujemy mu dane posta */}
      <EditPostForm post={post} />
    </Box>
  );
}
