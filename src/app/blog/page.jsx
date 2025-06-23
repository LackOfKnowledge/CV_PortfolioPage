"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import RGL, { WidthProvider } from "react-grid-layout";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

const ReactGridLayout = WidthProvider(RGL);

const PostTile = ({ post }) => {
  const theme = useTheme();

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ textDecoration: "none", height: "100%", display: "block" }}
    >
      <Paper
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          borderRadius: 2,
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0px 20px 40px rgba(0,0,0,0.3)",
          },
        }}
      >
        {/* WARSTWA 1: Obrazek w tle */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${post.thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
          }}
        />

        {/* WARSTWA 2: Kontener na treść, wypycha ją na dół */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            height: "100%",
          }}
        >
          {/* WARSTWA 3: "Mrożone szkło" i tekst */}
          <Box
            sx={{
              p: { xs: 2, md: 3 },
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(20, 20, 20, 0.6)" // Ciemne "mleko"
                  : "rgba(255, 255, 255, 0.7)", // Bardzo jasne "mleko"
              backdropFilter: "blur(10px)",
              borderTop: "1px solid",
              borderColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "text.primary", // Kolor z motywu (biały lub czarny)
              }}
            >
              {post.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: "text.secondary", // Kolor z motywu
              }}
            >
              {post.excerpt}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Link>
  );
};

export default function BlogGridPage() {
  const [layoutConfig, setLayoutConfig] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Nie udało się pobrać danych bloga");
        const { posts, layoutConfig } = await res.json();
        setPosts(posts);
        setLayoutConfig(layoutConfig);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const generateDOM = () => {
    if (!posts || !layoutConfig?.layout) return null;
    return layoutConfig.layout.map((item) => {
      const post = posts.find((p) => p.slug === item.i);
      return (
        <div key={item.i}>
          {post ? (
            <PostTile post={post} />
          ) : (
            <Paper sx={{ height: "100%", backgroundColor: "action.hover" }} />
          )}
        </div>
      );
    });
  };

  if (loading)
    return (
      <Container sx={{ py: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  if (error)
    return (
      <Container sx={{ py: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  return (
    <Container
      id="blog"
      maxWidth="xl"
      sx={{ py: 5 }}
    >
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
      >
        Blog
      </Typography>
      <Box sx={{ ".react-grid-layout": { mx: -1.5 } }}>
        <ReactGridLayout
          layout={layoutConfig.layout}
          cols={layoutConfig.cols}
          rowHeight={180}
          margin={[12, 12]}
          isDraggable={false}
          isResizable={false}
        >
          {generateDOM()}
        </ReactGridLayout>
      </Box>
    </Container>
  );
}
