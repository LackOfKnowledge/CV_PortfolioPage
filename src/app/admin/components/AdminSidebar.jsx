"use client";

import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  PostAdd as PostAddIcon,
  Description as DescriptionIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const menuItems = [
  { text: "Panel", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { text: "Dodaj Post", icon: <PostAddIcon />, path: "/admin/blog/new" },
  {
    text: "Generuj Link CV",
    icon: <DescriptionIcon />,
    action: () => alert("Funkcjonalność wkrótce!"),
  },
];

export default function AdminSidebar({ drawerWidth }) {
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
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
          >
            <ListItemButton
              component={item.path ? Link : "button"}
              href={item.path}
              onClick={item.action}
              selected={item.path === pathname}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
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
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
