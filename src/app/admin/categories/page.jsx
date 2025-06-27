// Plik: src/app/admin/categories/page.jsx

import prisma from "@/lib/prisma";
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
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { createCategory, deleteCategory } from "@/app/actions/categoryActions";

export const dynamic = "force-dynamic";

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        fontWeight="bold"
      >
        Zarządzaj Kategoriami
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
        >
          Dodaj nową kategorię
        </Typography>
        <form action={createCategory}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              name="name"
              label="Nazwa kategorii"
              variant="outlined"
              size="small"
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
            >
              Dodaj
            </Button>
          </Box>
        </form>
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
          {categories.length > 0 ? (
            categories.map((category) => (
              <ListItem
                key={category.id}
                secondaryAction={
                  <form action={deleteCategory.bind(null, category.id)}>
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
            <Typography color="text.secondary">Brak kategorii.</Typography>
          )}
        </List>
      </Paper>
    </Box>
  );
}
