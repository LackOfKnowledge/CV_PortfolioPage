"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import {
  TextField,
  Button,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { updatePost } from "@/app/actions/postActions";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function EditPostForm({ post }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [contentValue, setContentValue] = useState(post.content || "");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);
    formData.set("content", contentValue);

    const result = await updatePost(post.slug, formData);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setSuccess(`Post "${result.slug}" został pomyślnie zaktualizowany!`);
      router.refresh(); // odświeża dane na stronie
      setTimeout(() => router.push("/admin/dashboard"), 2000);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Tytuł posta"
        name="title"
        fullWidth
        margin="normal"
        required
        defaultValue={post.frontmatter.title}
      />
      <TextField
        label="Zajawka (krótki opis)"
        name="excerpt"
        fullWidth
        margin="normal"
        multiline
        rows={2}
        required
        defaultValue={post.frontmatter.excerpt}
      />
      <TextField
        label="URL do miniaturki (obrazka)"
        name="thumbnail"
        fullWidth
        margin="normal"
        defaultValue={post.frontmatter.thumbnail}
      />
      <FormControl
        fullWidth
        margin="normal"
        required
      >
        <InputLabel id="category-select-label">Kategoria</InputLabel>
        <Select
          labelId="category-select-label"
          name="category"
          label="Kategoria"
          defaultValue={post.frontmatter.category || "programowanie"}
        >
          <MenuItem value="programowanie">Programowanie</MenuItem>
          <MenuItem value="geodezja">Geodezja</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ my: 2, border: "1px solid #ccc", borderRadius: 1 }}>
        <SimpleMDE
          value={contentValue}
          onChange={setContentValue}
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{ mt: 2, py: 1.5, px: 4 }}
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
