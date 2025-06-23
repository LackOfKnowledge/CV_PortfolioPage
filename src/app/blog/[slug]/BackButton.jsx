"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="text"
      startIcon={<ArrowBackIcon />}
      onClick={() => router.back()}
      sx={{ mb: 4, alignSelf: "flex-start" }}
    >
      Powrót
    </Button>
  );
}
