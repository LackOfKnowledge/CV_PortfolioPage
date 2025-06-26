import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import Link from "next/link";

export default function BlogPostCard({ post }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "0.3s",
        "&:hover": { transform: "scale(1.03)" },
      }}
    >
      <CardActionArea
        component={Link}
        href={`/blog/${post.slug}`}
      >
        <CardMedia
          component="img"
          height="200"
          image={
            post.thumbnail ||
            "https://images.unsplash.com/photo-1518770660439-4636190af475"
          }
          alt={post.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            fontWeight="bold"
          >
            {post.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {post.excerpt}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
            >
              {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
            <Typography
              variant="caption"
              fontWeight="bold"
            >
              {post.author.name || "Autor"}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
