import { Grid, Typography, Paper, Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import PostCard from "./PostCard";

export const dynamic = "force-dynamic";

async function getPostsForUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const whereClause =
    session.user.role === "admin" ? {} : { authorId: session.user.id };

  return await prisma.post.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });
}

export default async function DashboardPage() {
  const posts = await getPostsForUser();

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        fontWeight="bold"
      >
        Witaj w panelu!
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Zarządzaj swoimi postami.
      </Typography>
      <Grid
        container
        spacing={3}
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={post.id}
            >
              <PostCard post={post} />
            </Grid>
          ))
        ) : (
          <Grid
            item
            xs={12}
          >
            <Paper sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
              <Typography>
                Nie masz jeszcze żadnych postów. Czas coś napisać!
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
