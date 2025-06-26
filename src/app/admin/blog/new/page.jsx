import PostForm from "@/components/admin/PostForm";
import { Typography } from "@mui/material";

export default function NewPostPage() {
  return (
    <div>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        fontWeight="bold"
      >
        Nowy Post
      </Typography>
      <PostForm />
    </div>
  );
}
