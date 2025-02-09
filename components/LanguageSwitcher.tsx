"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <Dropdown>
      <DropdownTrigger aria-haspopup="true" aria-controls="language-menu">
        <Button variant="flat" className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          {locale === "en" ? "English" : "Čeština"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu id="language-menu" aria-label="Select Language">
        <DropdownItem key="en" onPress={() => setLocale("en")}>
          English
        </DropdownItem>
        <DropdownItem key="cs" onPress={() => setLocale("cs")}>
          Čeština
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
