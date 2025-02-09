"use client";

import { useLanguage } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitch } from "@/components/theme-switch";
import { Github, Linkedin } from "lucide-react";
import clsx from "clsx";

export const Navbar = () => {
  const { t } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { href: "/experience", label: t("navbar.experience") },
    { href: "/projects", label: t("navbar.projects") },
    { href: "/skills", label: t("navbar.skills") },
    { href: "/contact", label: t("navbar.contact") },
  ];

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent justify="start">
        {/* Jméno + sociální ikony */}
        <NavbarBrand as="li" className="flex items-center gap-4">
          <NextLink className="flex items-center gap-2" href="/">
            <p className="font-bold text-inherit">Samuel</p>
          </NextLink>

          {/* Sociální ikony vedle jména */}
          <div className="flex gap-3">
            <Link isExternal href="https://github.com/krehy" title="GitHub">
              <Github className="w-5 h-5 text-default-500 hover:text-primary" />
            </Link>
            <Link isExternal href="https://www.linkedin.com/in/samuel-k%C5%99eh%C3%A1%C4%8Dek-516a16220/?originalSubdomain=cz" title="LinkedIn">
              <Linkedin className="w-5 h-5 text-default-500 hover:text-primary" />
            </Link>
          </div>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop navigace */}
      <NavbarContent justify="end" className="hidden md:flex">
        {navItems.map((item) => (
          <NavbarItem key={item.href}>
            <NextLink
              href={item.href}
              className={clsx(
                "transition-colors hover:text-primary",
                pathname === item.href ? "text-primary font-semibold" : "text-foreground"
              )}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
        <NavbarItem>
          <LanguageSwitcher />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* Mobilní menu tlačítko */}
      <NavbarContent justify="end" className="md:hidden">
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobilní menu */}
      <NavbarMenu>
        {/* Horní řádek s přepínačem jazyka, dark mode a zavíracím tlačítkem */}
        <div className="flex justify-between items-center p-4 border-b border-default-300">
          <div className="flex gap-3">
            <LanguageSwitcher />
            <ThemeSwitch />
          </div>
        </div>

        {/* Navigační položky */}
        {navItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <NextLink
              href={item.href}
              className={clsx(
                "block w-full text-center p-3 transition-colors hover:text-primary",
                pathname === item.href ? "text-primary font-semibold" : "text-foreground"
              )}
            >
              {item.label}
            </NextLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  );
};
