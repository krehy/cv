"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { Card } from "@heroui/card";
import clsx from "clsx";

// Použití stejných barev jako u projektů
const experiences = [
  { company: "Fast ČR", position: "Prodejce", icon: "🛍️", bg: "from-[#ff416c] to-[#ff4b2b]" }, // Růžová → Červená
  { company: "Starnet", position: "Technik IT", icon: "🖥️", bg: "from-[#0072ff] to-[#00c6ff]" }, // Modrá → Tyrkysová
  { company: "Spacecom", position: "Technik IT", icon: "🛰️", bg: "from-[#00c9ff] to-[#92fe9d]" }, // Tyrkysová → Zelená
  { company: "Smarty", position: "Product Manager", icon: "📦", bg: "from-[#f09819] to-[#ff512f]" }, // Oranžová → Červená
  { company: "Snomi", position: "Obchodní zastoupení pro O2", icon: "📡", bg: "from-[#7f00ff] to-[#e100ff]" }, // Fialová → Magenta
  { company: "Freelancer", position: "Webové aplikace", icon: "💻", bg: "from-[#667eea] to-[#764ba2]" }, // Modrofialová
];

export default function ExperiencePage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center">{t("experience.title")}</h1>
      <p className="text-center text-muted-foreground mt-3">{t("experience.subtitle")}</p>

      {/* Grid layout */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiences.map((exp, index) => (
          <Card
            key={index}
            className={clsx(
              "relative w-full overflow-hidden border border-gray-300 dark:border-gray-700 transition-all duration-500",
              "group",
              // Středně silný stín ve světlém módu, decentní záře v tmavém
              "shadow-lg shadow-gray-400 dark:shadow-[0_0_20px_6px_rgba(255,255,255,0.2)]"
            )}
          >
            {/* Efekt fade-in / fade-out při hoveru */}
            <div
              className={clsx(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                `bg-gradient-to-r ${exp.bg}`
              )}
            ></div>

            {/* Obsah karty */}
            <div className="relative z-10 p-6 flex items-center gap-4">
              <span className="text-xl">{exp.icon}</span>
              <div>
                <h2 className="text-lg font-semibold">{exp.company}</h2>
                <p className="text-sm text-muted-foreground">{exp.position}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
