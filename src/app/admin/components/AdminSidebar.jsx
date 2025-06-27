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
  LinkIcon,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  PostAdd as PostAddIcon,
  Description as DescriptionIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const menuItems = [
  { text: "Panel", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { text: "Kategorie", icon: <CategoryIcon />, path: "/admin/categories" },
  { text: "Dodaj Post", icon: <PostAddIcon />, path: "/admin/blog/new" },
  {
    text: "Linki CV",
    icon: <LinkIcon />,
    path: "/admin/cv",
  },
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
