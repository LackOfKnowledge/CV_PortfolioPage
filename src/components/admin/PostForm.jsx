"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import {
  Paper,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { createPost, updatePost } from "@/app/actions/postActions";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function PostForm({ post, categories }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [contentValue, setContentValue] = useState(post?.content || "");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);
    formData.set("content", contentValue);

    const action = post
      ? updatePost.bind(null, post.id, formData)
      : createPost.bind(null, formData);

    const result = await action();

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setSuccess(`Post "${result.post.title}" został pomyślnie zapisany!`);
      router.refresh(); // Ważne dla odświeżenia danych
      setTimeout(() => router.push("/admin/dashboard"), 1500);
    }

    setLoading(false);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 3 }}
    >
      <TextField
        name="title"
        label="Tytuł posta"
        fullWidth
        margin="normal"
        required
        defaultValue={post?.title}
      />
      <TextField
        name="excerpt"
        label="Zajawka (krótki opis)"
        fullWidth
        margin="normal"
        multiline
        rows={2}
        required
        defaultValue={post?.excerpt}
      />
      <TextField
        name="thumbnail"
        label="URL do miniaturki"
        fullWidth
        margin="normal"
        defaultValue={post?.thumbnail}
      />
      <FormControl
        fullWidth
        margin="normal"
      >
        <InputLabel id="category-select-label">Kategoria</InputLabel>
        <Select
          name="categoryId"
          labelId="category-select-label"
          label="Kategoria"
          defaultValue={post?.categoryId || ""}
        >
          <MenuItem value="">
            <em>Brak kategorii</em>
          </MenuItem>
          {categories?.map((category) => (
            <MenuItem
              key={category.id}
              value={category.id}
            >
              {category.name}
            </MenuItem>
          ))}
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
        size="large"
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : post ? (
          "Zapisz zmiany"
        ) : (
          "Utwórz Post"
        )}
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
    </Paper>
  );
}
