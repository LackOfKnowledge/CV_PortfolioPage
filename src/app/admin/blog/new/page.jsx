"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { createPost } from "@/app/actions/postActions";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function NewPostPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [contentValue, setContentValue] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);
    formData.set("content", contentValue);

    const result = await createPost(formData);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setSuccess(`Post "${result.slug}" został pomyślnie utworzony!`);
      setTimeout(() => router.push("/admin/dashboard"), 2000);
    }

    setLoading(false);
  };

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
          Nowy Post
        </Typography>
        <Link
          href="/admin/dashboard"
          passHref
        >
          <Button variant="outlined">&larr; Wróć do panelu</Button>
        </Link>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tytuł posta"
          name="title"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Zajawka (krótki opis)"
          name="excerpt"
          fullWidth
          margin="normal"
          multiline
          rows={2}
          required
        />
        <TextField
          label="URL do miniaturki (obrazka)"
          name="thumbnail"
          fullWidth
          margin="normal"
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
            defaultValue="programowanie"
            label="Kategoria"
          >
            <MenuItem value="programowanie">Programowanie</MenuItem>
            <MenuItem value="geodezja">Geodezja</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ my: 2, border: "1px solid #ccc", borderRadius: 1 }}>
          <SimpleMDE onChange={setContentValue} />
        </Box>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ mt: 2, py: 1.5, px: 4 }}
        >
          {loading ? <CircularProgress size={24} /> : "Zapisz i Opublikuj Post"}
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
