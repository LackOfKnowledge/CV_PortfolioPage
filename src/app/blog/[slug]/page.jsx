// Plik: src/app/blog/[slug]/page.jsx

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { markdownToHtml } from "@/lib/posts";
import { Box, Typography, Paper, Chip, Avatar } from "@mui/material";
import BackButton from "./BackButton";

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts?.map((post) => ({
    slug: post.slug,
  }));
}

async function getPost(slug) {
  const post = await prisma.post.findUnique({
    where: { slug: slug },
    include: {
      author: true,
      category: true, // WAŻNE: Dołączamy dane powiązanej kategorii
    },
  });

  if (!post) {
    return null;
  }

  const contentHtml = await markdownToHtml(post.content || "");
  return { ...post, contentHtml };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", my: 5, px: 2 }}>
      <BackButton />
      <Paper
        elevation={2}
        sx={{ p: { xs: 3, md: 5 } }}
      >
        {/* POPRAWKA: Wyświetlamy nazwę kategorii z obiektu */}
        {post.category && (
          <Chip
            label={post.category.name}
            color="primary"
            sx={{ mb: 2 }}
          />
        )}
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          fontWeight="700"
        >
          {post.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            color: "text.secondary",
          }}
        >
          <Avatar
            src={post.author.image || ""}
            sx={{ width: 24, height: 24, mr: 1 }}
          />
          <Typography
            variant="body1"
            sx={{ mr: 2 }}
          >
            {post.author.name}
          </Typography>
          <Typography variant="body1">
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        {post.thumbnail && (
          <Box
            component="img"
            src={post.thumbnail}
            alt={post.title}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "450px",
              objectFit: "cover",
              borderRadius: 2,
              my: 4,
            }}
          />
        )}
        <Box
          component="div"
          className="content-prose"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </Paper>
    </Box>
  );
}
