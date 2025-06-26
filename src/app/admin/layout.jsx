import { Box, CssBaseline } from "@mui/material";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({ children }) {
  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AdminSidebar drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: "grey.100",
          minHeight: "100vh",
        }}
      >
        {/* Pusty Toolbar jako placeholder pod AppBar z sidebara */}
        <Box sx={{ height: "64px" }} />
        {children}
      </Box>
    </Box>
  );
}
