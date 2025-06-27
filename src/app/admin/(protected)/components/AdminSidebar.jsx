// Plik: src/app/admin/components/AdminSidebar.jsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  PostAdd as PostAddIcon,
  Category as CategoryIcon,
  Link as LinkIcon, // Poprawna ikona dla linków
  Home as HomeIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { signOut } from "next-auth/react";

// Definicja menu w jednym miejscu
const menuItems = [
  { text: "Panel", path: "/admin/dashboard", icon: <DashboardIcon /> },
  { text: "Kategorie", path: "/admin/categories", icon: <CategoryIcon /> },
  { text: "Nowy Post", path: "/admin/blog/new", icon: <PostAddIcon /> },
  { text: "Linki CV", path: "/admin/cv", icon: <LinkIcon /> },
];

export default function AdminSidebar({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
}) {
  const pathname = usePathname();

  const drawerContent = (
    <div>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
        >
          Panel Admina
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
          >
            <ListItemButton
              component={Link}
              href={item.path}
              selected={pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/"
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Strona Główna" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => signOut({ callbackUrl: "/" })}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Wyloguj" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
