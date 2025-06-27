// Stwórz nowy plik: src/app/admin/categories/CategoryManager.jsx

"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { createCategory, deleteCategory } from "@/app/actions/categoryActions";

const initialState = {
  message: null,
  type: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={pending}
    >
      {pending ? "Dodawanie..." : "Dodaj"}
    </Button>
  );
}

export default function CategoryManager({ initialCategories }) {
  const [state, formAction] = useFormState(createCategory, initialState);
  const formRef = useRef(null);

  useEffect(() => {
    if (state?.type === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
        >
          Dodaj nową kategorię
        </Typography>
        <form
          action={formAction}
          ref={formRef}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              name="name"
              label="Nazwa kategorii"
              variant="outlined"
              size="small"
              required
              fullWidth
            />
            <SubmitButton />
          </Box>
        </form>
        {state?.message && (
          <Alert
            severity={state.type || "info"}
            sx={{ mt: 2 }}
          >
            {state.message}
          </Alert>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
        >
          Istniejące kategorie
        </Typography>
        <List>
          {initialCategories.length > 0 ? (
            initialCategories.map((category) => (
              <ListItem
                key={category.id}
                secondaryAction={
                  <form action={() => deleteCategory(category.id)}>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      type="submit"
                    >
                      <Delete />
                    </IconButton>
                  </form>
                }
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))
          ) : (
            <Typography color="text.secondary">
              Brak dodanych kategorii.
            </Typography>
          )}
        </List>
      </Paper>
    </Box>
  );
}
