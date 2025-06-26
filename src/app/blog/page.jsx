import prisma from "@/lib/prisma";
import { Container, Grid, Typography, Box } from "@mui/material";
import BlogPostCard from "./BlogPostCard";

export const dynamic = "force-dynamic";

async function getPublishedPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 4 }}
    >
      <Box sx={{ textAlign: "center", mb: 6 }}>
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
              Nie opublikowano jeszcze żadnych postów.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
