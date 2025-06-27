// Plik: src/app/blog/page.jsx

import prisma from "@/lib/prisma";
import { Container, Grid, Typography, Box, Chip, Button } from "@mui/material";
import Link from "next/link";
import BlogPostCard from "./BlogPostCard";

export const dynamic = "force-dynamic";

async function getBlogData(searchParams) {
  const selectedCategory = searchParams.category;

  const whereClause = {
    published: true,
    ...(selectedCategory && { category: { name: selectedCategory } }),
  };

  const posts = await prisma.post.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: { author: true, category: true },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return { posts, categories };
}

export default async function BlogPage({ searchParams }) {
  const { posts, categories } = await getBlogData(searchParams);

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 4 }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h2"
          component="h1"
          fontWeight="bold"
        >
          Mój Blog
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
        >
          Wpisy o programowaniu, technologii i nie tylko.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 1,
          mb: 6,
        }}
      >
        <Button
          component={Link}
          href="/blog"
          variant={!searchParams.category ? "contained" : "outlined"}
        >
          Wszystkie
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            component={Link}
            href={`/blog?category=${category.name}`}
            variant={
              searchParams.category === category.name ? "contained" : "outlined"
            }
          >
            {category.name}
          </Button>
        ))}
      </Box>

      <Grid
        container
        spacing={4}
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={post.id}
            >
              <BlogPostCard post={post} />
            </Grid>
          ))
        ) : (
          <Grid
            item
            xs={12}
          >
            <Typography sx={{ textAlign: "center", mt: 5 }}>
              Nie znaleziono postów w tej kategorii.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
