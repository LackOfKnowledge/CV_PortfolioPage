"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

const ScrollSpyContext = createContext(null);

export const useScrollSpy = () => useContext(ScrollSpyContext);

export const ScrollSpyProvider = ({ children, navItems }) => {
  const [activeId, setActiveId] = useState(navItems[0]?.targetId);

  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  useEffect(() => {
    const mainContent = document.getElementById("main-content-area");
    if (!mainContent) return;

    const findClosestSection = () => {
      let closestSection = null;
      let smallestDistance = Infinity;

      navItems.forEach((item) => {
        if (!item.targetId) return;

        const element = document.getElementById(item.targetId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);

          if (distance < smallestDistance) {
            smallestDistance = distance;
            closestSection = item.targetId;
          }
        }
      });

      return closestSection;
    };

    const handleScroll = () => {
      const closestId = findClosestSection();
      if (closestId && closestId !== activeIdRef.current) {
        setActiveId(closestId);
      }
    };

    mainContent.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      mainContent.removeEventListener("scroll", handleScroll);
    };
  }, [navItems]);

  return (
    <ScrollSpyContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </ScrollSpyContext.Provider>
  );
};
