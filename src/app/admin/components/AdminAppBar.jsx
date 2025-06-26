"use client";

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "../theme-provider";

export default function AdminAppBar({ drawerWidth }) {
  const theme = useTheme();
  const colorMode = useColorMode();

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        // Używamy kolorów z motywu, aby pasek też się zmieniał
        backgroundColor:
          theme.palette.mode === "dark" ? "grey.900" : "primary.main",
      }}
    >
      <Toolbar>
        {/* Pusty element, który "pcha" ikonę na prawą stronę */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1 }}
        />

        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
