import { getPostData } from "@/lib/posts";
import EditPostForm from "@/components/admin/EditPostForm";
import { notFound } from "next/navigation";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default async function EditPostPage({ params }) {
  const { slug } = params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <Box sx={{ bgcolor: "white", p: 4, borderRadius: 2, boxShadow: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
        >
          Edytujesz: {post.frontmatter.title}
        </Typography>
        <Link
          href="/admin/dashboard"
          passHref
        >
          <Typography
            component="a"
            sx={{ textDecoration: "none", color: "primary.main" }}
          >
            &larr; Wróć do panelu
          </Typography>
        </Link>
      </Box>
      <EditPostForm post={post} />
    </Box>
  );
}
