// Plik: src/app/blog/layout.jsx

import BlogLayout from "@/components/BlogLayout";
import MobileHeader from "@/components/MobileHeader"; // Twoja nawigacja mobilna
import { Box } from "@mui/material";

export default function LayoutForBlog({ children }) {
  return (
    <>
      {/* Na urządzeniach mobilnych wyświetlamy standardowy header */}
      <Box sx={{ display: { md: "none" } }}>
        <MobileHeader />
      </Box>

      {/* Na urządzeniach desktopowych używamy naszego nowego, specjalnego layoutu */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <BlogLayout>{children}</BlogLayout>
      </Box>

      {/* Na mobilce content wyświetla się normalnie */}
      <Box sx={{ display: { md: "none" }, p: 2 }}>{children}</Box>
    </>
  );
}
