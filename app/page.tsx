"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider"; // Lokalizace
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import confetti from "canvas-confetti";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  const { t } = useLanguage();
  const buttonRef = useRef(null);
  const router = useRouter();

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      router.push("/contact");
    }, 1000);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-12 md:py-16">
      {/* Jméno a úvod */}
      <div className="inline-block max-w-xl text-center">
        <h1 className={title()}>
          {t("home.intro")}{" "}
          <span className={title({ color: "violet" })}>{t("home.developer")}</span>.
        </h1>
        <p className={subtitle({ class: "mt-4 text-lg text-muted-foreground" })}>
          {t("home.subtitle")}
        </p>
      </div>

      {/* Odkazy na důležité sekce */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
        <div className="p-6 bg-background rounded-xl shadow-lg text-center border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">{t("navbar.experience")}</h2>
          <p className="text-muted-foreground">{t("home.experienceDescription")}</p>
          <Link href="/experience" className="text-primary font-medium mt-2 block">
            Více →
          </Link>
        </div>

        <div className="p-6 bg-background rounded-xl shadow-lg text-center border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">{t("navbar.projects")}</h2>
          <p className="text-muted-foreground">{t("home.projectsDescription")}</p>
          <Link href="/projects" className="text-primary font-medium mt-2 block">
            Více →
          </Link>
        </div>

        <div className="p-6 bg-background rounded-xl shadow-lg text-center border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">{t("navbar.skills")}</h2>
          <p className="text-muted-foreground">{t("home.skillsDescription")}</p>
          <Link href="/skills" className="text-primary font-medium mt-2 block">
            Více →
          </Link>
        </div>
      </div>

      {/* Kontaktovací tlačítko s konfetami a přesměrováním */}
      <div className="mt-6">
        <button
          ref={buttonRef}
          onClick={handleConfetti}
          className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 py-3 shadow-xl bg-primary text-white text-lg font-medium transition-transform after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
        >
          {t("home.contactButton")}
        </button>
      </div>
    </section>
  );
}
