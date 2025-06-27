"use client";

import React from "react";
import { useRouter } from "next/navigation";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { smoothScrollTo } from "@/utils/smoothScroll";

export default function NavLinks({
  navItems,
  onLinkClick,
  scrollSpyEnabled = false,
}) {
  const { activeId } = scrollSpyEnabled ? useScrollSpy() : { activeId: null };
  const mainContentAreaId = "main-content-area";
  const router = useRouter();

  const handleLinkClick = (targetId) => {
    if (scrollSpyEnabled) {
      smoothScrollTo(targetId, mainContentAreaId);
    } else {
      router.push(`/#${targetId}`);
    }

    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <List>
      {navItems?.map((item) => (
        <ListItem
          key={item.label}
          disablePadding
        >
          <ListItemButton
            selected={scrollSpyEnabled && activeId === item.targetId}
            onClick={() => handleLinkClick(item.targetId)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              },
              borderRadius: 1,
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
