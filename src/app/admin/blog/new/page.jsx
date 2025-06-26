"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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

        <Box sx={{ my: 2 }}>
          <SimpleMDE onChange={setContentValue} />
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
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
