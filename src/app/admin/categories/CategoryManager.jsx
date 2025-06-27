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

const initialState = { message: null, type: null };

function SubmitCreateButton() {
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

function SubmitDeleteButton() {
  const { pending } = useFormStatus();
  return (
    <IconButton
      edge="end"
      aria-label="delete"
      type="submit"
      disabled={pending}
    >
      <Delete />
    </IconButton>
  );
}

export default function CategoryManager({ initialCategories }) {
  const [createState, createFormAction] = useFormState(
    createCategory,
    initialState
  );
  const formRef = useRef(null);

  const handleDeleteAction = async (formData) => {
    const result = await deleteCategory(null, formData);

    if (result?.type === "error") {
      alert(result.message);
    }
  };

  useEffect(() => {
    if (createState?.type === "success") {
      formRef.current?.reset();
    }
  }, [createState]);

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
          action={createFormAction}
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
            <SubmitCreateButton />
          </Box>
        </form>
        {createState?.message && (
          <Alert
            severity={createState.type || "info"}
            sx={{ mt: 2 }}
          >
            {createState.message}
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
                  <form action={handleDeleteAction}>
                    <input
                      type="hidden"
                      name="id"
                      value={category.id}
                    />
                    <SubmitDeleteButton />
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
