import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Box, Typography, Paper, Alert } from "@mui/material";

const CVComponent = () => (
  <Paper sx={{ p: 4 }}>
    <Typography variant="h4">Twoje CV</Typography>
    <Typography>Tutaj znajduje się cała treść Twojego CV...</Typography>
  </Paper>
);

async function getLinkAndMarkAsUsed(id) {
  const link = await prisma.cvLink.findUnique({
    where: { id },
  });

  if (!link) return { status: "not_found" };
  if (new Date(link.expiresAt) < new Date()) return { status: "expired" };
  if (link.usedAt) return { status: "already_used" };

  await prisma.cvLink.update({
    where: { id },
    data: { usedAt: new Date() },
  });

  return { status: "valid", link };
}

export default async function ViewCvPage({ params }) {
  const { status } = await getLinkAndMarkAsUsed(params.linkId);

  if (status === "not_found") {
    notFound();
  }

  const renderContent = () => {
    switch (status) {
      case "valid":
        return <CVComponent />;
      case "expired":
        return (
          <Alert severity="error">
            Ten link wygasł i nie jest już aktywny.
          </Alert>
        );
      case "already_used":
        return (
          <Alert severity="warning">Ten link został już wykorzystany.</Alert>
        );
      default:
        return <Alert severity="error">Wystąpił nieznany błąd.</Alert>;
    }
  };

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", my: 5, p: 2 }}>
      {renderContent()}
    </Box>
  );
}
