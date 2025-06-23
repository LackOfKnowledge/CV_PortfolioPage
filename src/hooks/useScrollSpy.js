// src/hooks/useScrollSpy.js
"use client";

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";

const ScrollSpyContext = createContext(null);

export const useScrollSpy = () => useContext(ScrollSpyContext);

export const ScrollSpyProvider = ({ navItems, children }) => {
  const [activeSection, setActiveSection] = useState(
    navItems[0]?.targetId || ""
  );
  const observerRef = useRef(null);
  const visibleSectionsRef = useRef(new Set());

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSectionsRef.current.add(entry.target.id);
          } else {
            visibleSectionsRef.current.delete(entry.target.id);
          }
        });

        const sortedVisibleSections = navItems
          .map((item) => item.targetId)
          .filter((id) => visibleSectionsRef.current.has(id));

        if (sortedVisibleSections.length > 0) {
          setActiveSection(sortedVisibleSections[0]);
        }
      },
      {
        rootMargin: "0px 0px -80% 0px",
        threshold: 0,
      }
    );

    const { current: observer } = observerRef;
    navItems.forEach(({ targetId }) => {
      const element = document.getElementById(targetId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [navItems]);

  return (
    <ScrollSpyContext.Provider value={{ activeSection }}>
      {children}
    </ScrollSpyContext.Provider>
  );
};
