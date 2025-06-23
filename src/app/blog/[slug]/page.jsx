import { Box, Container, Typography, Divider, Paper } from "@mui/material";
import BackButton from "./BackButton";
import { getPostData, getAllPostSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  return await getAllPostSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostData(params.slug);
  if (!post) {
    return { title: "Nie znaleziono posta" };
  }
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function PostPage({ params }) {
  const post = await getPostData(params.slug);

  if (!post) {
    return (
      <Container sx={{ py: 5 }}>
        <BackButton />
        <Typography>Nie znaleziono posta.</Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{ py: 5 }}
    >
      <BackButton />
      <Paper
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
        >
          {post.frontmatter.title}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Opublikowano:{" "}
          {new Date(post.frontmatter.date).toLocaleDateString("pl-PL")}
        </Typography>
        <Divider sx={{ my: 4 }} />
        <Box
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          sx={{
            color: "text.primary",
            "& h1, & h2, & h3": { mt: 4, mb: 2, fontWeight: "bold" },
            "& p": { lineHeight: 1.7, my: 2, fontSize: "1.1rem" },
            "& a": { color: "primary.main", textDecoration: "underline" },
            "& blockquote": {
              borderLeft: "4px solid",
              borderColor: "divider",
              pl: 2,
              my: 2,
              fontStyle: "italic",
              color: "text.secondary",
            },
            "& pre": {
              p: 2,
              my: 2,
              backgroundColor: "action.hover",
              borderRadius: 1,
              overflowX: "auto",
            },
            "& code": { fontFamily: "monospace" },
            "& ul, & ol": { pl: 3, my: 2 },
            "& li": { mb: 1 },
          }}
        />
      </Paper>
    </Container>
  );
}
