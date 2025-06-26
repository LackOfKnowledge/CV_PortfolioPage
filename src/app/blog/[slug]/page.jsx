import { getPostData, getAllPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Box, Typography, Paper, Chip } from "@mui/material";

export async function generateStaticParams() {
  const paths = await getAllPostSlugs();
  return paths;
}

export default async function PostPage({ params }) {
  const postData = await getPostData(params.slug);

  if (!postData) {
    notFound();
  }

  const { frontmatter, contentHtml } = postData;

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", my: 4, px: 2 }}>
      <Paper
        elevation={3}
        sx={{ p: { xs: 2, md: 4 } }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          fontWeight="bold"
        >
          {frontmatter.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            color: "text.secondary",
          }}
        >
          <Typography
            variant="body1"
            sx={{ mr: 2 }}
          >
            {new Date(frontmatter.date).toLocaleDateString()}
          </Typography>
          <Chip
            label={frontmatter.category}
            color="primary"
            size="small"
          />
        </Box>
        {frontmatter.thumbnail && (
          <Box
            component="img"
            src={frontmatter.thumbnail}
            alt={frontmatter.title}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: 2,
              my: 3,
            }}
          />
        )}
        <Typography
          component="div"
          className="prose lg:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </Paper>
    </Box>
  );
}
