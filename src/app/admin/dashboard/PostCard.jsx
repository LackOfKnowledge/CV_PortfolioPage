"use client";

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deletePost } from "@/app/actions/postActions";

export default function PostCard({ post }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm(`Czy na pewno chcesz usunąć posta "${post.title}"?`)) {
      await deletePost(post.id);
      router.refresh();
    }
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          noWrap
        >
          {post.title}
        </Typography>
        <Chip
          label={post.category || "Ogólne"}
          size="small"
          sx={{ mb: 1 }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
        >
          {post.excerpt}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          href={`/admin/blog/edit/${post.id}`}
        >
          Edytuj
        </Button>
        <Button
          size="small"
          color="error"
          onClick={handleDelete}
        >
          Usuń
        </Button>
      </CardActions>
    </Card>
  );
}
