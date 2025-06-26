"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { smoothScrollTo } from "@/utils/smoothScroll";

export default function NavLinks({ navItems, onLinkClick }) {
  const { activeId } = useScrollSpy();
  const mainContentAreaId = "main-content-area";
  const pathname = usePathname();
  const router = useRouter();

  const handleScrollClick = (targetId) => {
    if (pathname === "/") {
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
      {navItems.map((item) => (
        <ListItem
          key={item.label}
          disablePadding
        >
          {item.href ? (
            <ListItemButton
              component={Link}
              href={item.href}
              onClick={onLinkClick}
              sx={{ borderRadius: 1 }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ) : (
            <ListItemButton
              selected={activeId === item.targetId}
              onClick={() => handleScrollClick(item.targetId)}
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
          )}
        </ListItem>
      ))}
    </List>
  );
}
