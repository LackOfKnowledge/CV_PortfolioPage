"use client";

import { useEffect, useRef, useCallback } from "react";

export const useSecretCode = (targetCode, callback) => {
  const inputRef = useRef("");
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const onKeyDown = useCallback(
    (event) => {
      if (!targetCode) {
        return;
      }

      if (event.key.length > 1) {
        return;
      }

      inputRef.current = (inputRef.current + event.key.toLowerCase()).slice(
        -targetCode.length
      );

      if (inputRef.current === targetCode.toLowerCase()) {
        if (callbackRef.current) {
          callbackRef.current();
        }
        inputRef.current = "";
      }
    },
    [targetCode]
  );

  useEffect(() => {
    if (!targetCode) return;

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [targetCode, onKeyDown]);
};
