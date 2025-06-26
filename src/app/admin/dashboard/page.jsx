import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import prisma from "@/lib/prisma";
import { deletePost } from "@/app/actions/postActions";

// Komponent do obsługi usuwania po stronie klienta
function DeletePostButton({ slug }) {
  // Akcja serwerowa jest "wiązana" ze slugiem posta
  const deletePostWithSlug = deletePost.bind(null, slug);

  return (
    <form
      action={deletePostWithSlug}
      onSubmit={(e) => {
        if (
          !confirm(
            "Czy na pewno chcesz usunąć ten post? Tej akcji nie można cofnąć."
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <IconButton
        edge="end"
        aria-label="delete"
        type="submit"
      >
        <DeleteIcon />
      </IconButton>
    </form>
  );
}

export default async function DashboardPage() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
        >
          Panel Administratora
        </Typography>
        <Button
          component={Link}
          href="/admin/add-post"
          variant="contained"
        >
          Dodaj nowy post
        </Button>
      </Box>

      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2 }}
      >
        Zarządzaj Postami
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem
            key={post.id}
            secondaryAction={
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  component={Link}
                  href={`/admin/posts/edit/${post.slug}`}
                >
                  <EditIcon />
                </IconButton>
                <DeletePostButton slug={post.slug} />
              </Box>
            }
          >
            <ListItemText
              primary={post.title}
              secondary={`Opublikowano: ${new Date(post.createdAt).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
