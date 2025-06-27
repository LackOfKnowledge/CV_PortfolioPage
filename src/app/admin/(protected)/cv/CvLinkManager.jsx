"use client";

import { useState } from "react";
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
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import { ContentCopy, Delete } from "@mui/icons-material";
import { createCvLink, deleteCvLink } from "@/app/actions/cvLinkActions";

export default function CvLinkManager({ initialLinks, siteUrl }) {
  const [links, setLinks] = useState(initialLinks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateLink = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const result = await createCvLink(formData);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setLinks([result.link, ...links]);
      event.target.reset();
    }
    setLoading(false);
  };

  const handleDeleteLink = async (id) => {
    const result = await deleteCvLink(id);
    if (result.success) {
      setLinks(links.filter((link) => link.id !== id));
    } else {
      alert(result.error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Link skopiowany do schowka!");
    });
  };

  return (
    <>
      <Paper
        component="form"
        onSubmit={handleCreateLink}
        sx={{ p: 3, mb: 4 }}
      >
        <Typography
          variant="h6"
          gutterBottom
        >
          Wygeneruj nowy link
        </Typography>
        <TextField
          name="name"
          label="Nazwa (np. Dla firmy X)"
          fullWidth
          required
          margin="normal"
        />
        <FormControl
          fullWidth
          margin="normal"
        >
          <InputLabel id="expires-in-label">Link ważny przez</InputLabel>
          <Select
            name="expiresIn"
            labelId="expires-in-label"
            label="Link ważny przez"
            defaultValue="7"
          >
            <MenuItem value="1">1 dzień</MenuItem>
            <MenuItem value="7">7 dni</MenuItem>
            <MenuItem value="30">30 dni</MenuItem>
            <MenuItem value="90">90 dni</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          size="large"
        >
          {loading ? <CircularProgress size={24} /> : "Generuj"}
        </Button>
        {error && (
          <Alert
            severity="error"
            sx={{ mt: 2 }}
          >
            {error}
          </Alert>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
        >
          Aktywne linki
        </Typography>
        <List>
          {links.map((link) => {
            const fullUrl = `${siteUrl}/view-cv/${link.id}`;
            const isExpired = new Date(link.expiresAt) < new Date();
            return (
              <ListItem
                key={link.id}
                sx={{ opacity: isExpired ? 0.5 : 1 }}
                secondaryAction={
                  <>
                    <Tooltip title="Kopiuj link">
                      <IconButton
                        edge="end"
                        onClick={() => copyToClipboard(fullUrl)}
                      >
                        <ContentCopy />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Usuń link">
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteLink(link.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </>
                }
              >
                <ListItemText
                  primary={link.name}
                  secondary={`Wygasa: ${new Date(link.expiresAt).toLocaleString()} ${isExpired ? "(Wygasł)" : ""}`}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </>
  );
}
