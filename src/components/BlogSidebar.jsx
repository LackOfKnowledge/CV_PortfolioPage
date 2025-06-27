// Plik: src/components/BlogSidebar.jsx

import Link from "next/link";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Toolbar,
} from "@mui/material";
import prisma from "@/lib/prisma";

// Ta funkcja jest serwerowa, ale cały komponent będzie używany w klienckim
// Dlatego dane pobierzemy raz i przekażemy jako props
async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

// Ten komponent jest asynchroniczny, aby mógł pobrać dane
export default async function BlogSidebar() {
  const categories = await getCategories();

  return (
    <Box>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
        >
          Nawigacja Bloga
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/blog"
          >
            <ListItemText primary="Wszystkie posty" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Box
        px={2}
        pt={2}
      >
        <Typography
          variant="overline"
          color="text.secondary"
        >
          Kategorie
        </Typography>
      </Box>
      <List>
        {categories.length > 0 ? (
          categories.map((category) => (
            <ListItem
              key={category.id}
              disablePadding
            >
              <ListItemButton
                component={Link}
                href={`/blog?category=${category.name}`}
              >
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText secondary="Brak kategorii" />
          </ListItem>
        )}
      </List>
    </Box>
  );
}
