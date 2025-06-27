import prisma from "@/lib/prisma";
import { Typography } from "@mui/material";
import CvLinkManager from "./CvLinkManager";

export const dynamic = "force-dynamic";

async function getCvLinks() {
  const links = await prisma.cvLink.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return links;
}

export default async function CvLinksPage() {
  const links = await getCvLinks();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  return (
    <div>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        fontWeight="bold"
      >
        Generator Linków do CV
      </Typography>
      <CvLinkManager
        initialLinks={links}
        siteUrl={siteUrl}
      />
    </div>
  );
}
