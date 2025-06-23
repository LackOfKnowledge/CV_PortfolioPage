// src/app/admin/blog/new/page.jsx
"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css"; // Import stylów dla edytora
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

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("programowanie");
  const [excerpt, setExcerpt] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category, excerpt, thumbnail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `Błąd: ${res.status}`);
      }
      setSuccess(`Post "${data.slug}" został pomyślnie utworzony!`);
      setTimeout(() => router.push("/admin/dashboard"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 5 }}
    >
      <Typography
        variant="h4"
        gutterBottom
      >
        Nowy Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tytuł posta"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Zajawka (krótki opis)"
          fullWidth
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          margin="normal"
          multiline
          rows={2}
        />
        <TextField
          label="URL do miniaturki (obrazka)"
          fullWidth
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          margin="normal"
        />
        <FormControl
          fullWidth
          margin="normal"
        >
          <InputLabel id="category-select-label">Kategoria</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            label="Kategoria"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="programowanie">Programowanie</MenuItem>
            <MenuItem value="geodezja">Geodezja</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ my: 2 }}>
          <SimpleMDE
            value={content}
            onChange={setContent}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={loading || !title || !content}
          sx={{ mt: 2 }}
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
    </Container>
  );
}
