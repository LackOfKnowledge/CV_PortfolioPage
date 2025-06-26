"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { updatePost } from "@/app/actions/postActions";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function EditPostForm({ post }) {
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

    try {
      await updatePost(post.slug, formData);
      setSuccess("Post został pomyślnie zaktualizowany!");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message || "Wystąpił nieoczekiwany błąd.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
}
