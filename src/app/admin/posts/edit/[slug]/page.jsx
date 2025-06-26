"use client"; // Ta strona musi być komponentem klienckim

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { updatePost } from "@/app/actions/postActions";
import { useRouter } from "next/navigation";

// Dynamiczny import edytora, tak jak na stronie dodawania posta
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// Musimy przekształcić ten komponent na kliencki, aby obsłużyć stan
export default function EditPostPage({ post }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [content, setContent] = useState(post.content);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);
    formData.set("content", content);

    const result = await updatePost(post.slug, formData);

    if (result && result.error) {
      setError(result.error);
    } else {
      setSuccess("Post został pomyślnie zaktualizowany!");
      setTimeout(() => router.push("/admin/dashboard"), 1500);
      router.refresh(); // Odśwież dane na stronie
    }

    setLoading(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4 }}
      >
        Edytuj Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Tytuł Posta"
          name="title"
          defaultValue={post.title}
          variant="outlined"
          sx={{ mb: 2 }}
          required
        />
        <Box sx={{ my: 2 }}>
          <SimpleMDE
            value={content}
            onChange={setContent}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Zapisz zmiany"}
        </Button>

        {error && (
          <Alert
            severity="error"
            sx={{ mt: 2 }}
          >
            {error}
          </Alert>
        )}
        {success && (
          <Alert
            severity="success"
            sx={{ mt: 2 }}
          >
            {success}
          </Alert>
        )}
      </form>
    </Box>
  );
}

// Ta funkcja jest potrzebna, aby pobrać dane posta na serwerze i przekazać je do komponentu
export async function getServerSideProps(context) {
  const { slug } = context.params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
  };
}
