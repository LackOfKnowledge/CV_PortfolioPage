// src/app/chat/page.jsx
"use client";

// Poprawiony import useChat
import { useChat } from "@ai-sdk/react";

// Importy MUI (bez zmian)
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";

export default function ChatPage() {
  // Hook useChat - używa nowego importu
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/chat", // Endpoint bez zmian
    });

  // JSX bez zmian
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px - 70px)",
        mt: 2,
        mb: 2,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
      >
        {" "}
        Porozmawiaj z AI{" "}
      </Typography>
      <Paper
        variant="outlined"
        sx={{ flexGrow: 1, overflowY: "auto", mb: 2, p: 2 }}
      >
        <List>
          {messages.map((m) => (
            <ListItem
              key={m.id}
              sx={{
                alignItems: "flex-start",
                bgcolor: m.role === "user" ? "action.hover" : "transparent",
                borderRadius: 1,
                mb: 1,
              }}
            >
              <Avatar
                sx={{
                  bgcolor:
                    m.role === "user" ? "primary.main" : "secondary.main",
                  mr: 2,
                  mt: 0.5,
                }}
              >
                {m.role === "user" ? <PersonIcon /> : <SmartToyIcon />}
              </Avatar>
              <ListItemText
                primary={m.role === "user" ? "Ty" : "Bot AI"}
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                  >
                    {" "}
                    {m.content}{" "}
                  </Typography>
                }
              />
            </ListItem>
          ))}
          {isLoading && (
            <ListItem sx={{ justifyContent: "center" }}>
              {" "}
              <CircularProgress size={24} />{" "}
            </ListItem>
          )}
          {error && (
            <ListItem sx={{ justifyContent: "center" }}>
              {" "}
              <Typography color="error">Błąd: {error.message}</Typography>{" "}
            </ListItem>
          )}
        </List>
      </Paper>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 1 }}
      >
        <TextField
          value={input}
          onChange={handleInputChange}
          placeholder="Zapytaj o coś..."
          fullWidth
          variant="outlined"
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          disabled={isLoading}
        >
          {" "}
          Wyślij{" "}
        </Button>
      </Box>
    </Container>
  );
}
