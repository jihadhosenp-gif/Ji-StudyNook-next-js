"use client";

import { Toaster } from "sonner";
import { useTheme } from "@/context/ThemeContext";

export default function ToastProvider() {
  const { theme } = useTheme();
  return (
    <Toaster
      theme={theme}
      position="top-center"
      richColors
      closeButton
      toastOptions={{ style: { fontFamily: "var(--font-inter)", borderRadius: "14px" } }}
    />
  );
}
