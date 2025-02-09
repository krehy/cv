"use client";

import { Switch } from "@heroui/switch";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/icons"; // Ikony Moon a Sun
import { useEffect, useState } from "react";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Nezobrazuje komponentu během server renderingu

  return (
    <Switch
      isSelected={theme === "dark"}
      onChange={() => setTheme(theme === "light" ? "dark" : "light")}
      color="primary"
      size="lg"
      className="transition-all duration-300"
      startContent={<SunIcon className="w-5 h-5 text-yellow-500" />}
      endContent={<MoonIcon className="w-5 h-5 text-blue-400" />}
      aria-label={`Přepnout na ${theme === "light" ? "tmavý" : "světlý"} režim`}
    />
  );
};
