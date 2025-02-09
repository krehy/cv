"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import clsx from "clsx";

// Dovednosti s procenty zvládnutí
const skills = [
  { key: "nextjsReact", icon: "⚡", percentage: 90, bg: "from-[#0072ff] to-[#00c6ff]" },
  { key: "tailwindHeroUI", icon: "🎨", percentage: 85, bg: "from-[#667eea] to-[#764ba2]" },
  { key: "aiAutomation", icon: "🤖", percentage: 80, bg: "from-[#f09819] to-[#ff512f]" },
  { key: "postgresql", icon: "🗄️", percentage: 75, bg: "from-[#00c9ff] to-[#92fe9d]" },
  { key: "nodeExpress", icon: "🛠️", percentage: 70, bg: "from-[#7f00ff] to-[#e100ff]" },
  { key: "linuxSSH", icon: "🐧", percentage: 65, bg: "from-[#ff416c] to-[#ff4b2b]" },
  { key: "docker", icon: "🐳", percentage: 60, bg: "from-[#f09819] to-[#ff512f]" },
  { key: "githubActions", icon: "🐙", percentage: 55, bg: "from-[#667eea] to-[#764ba2]" },
  { key: "seo", icon: "🔍", percentage: 90, bg: "from-[#0072ff] to-[#00c6ff]" },
];

export default function SkillsPage() {
  const { t } = useLanguage();
  const [counts, setCounts] = useState(skills.map(() => 0));

  // Animované načítání čísel
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((value, index) =>
          value < skills[index].percentage ? value + 1 : skills[index].percentage
        )
      );
    }, 20);

    setTimeout(() => clearInterval(interval), 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center">{t("skills.title")}</h1>
      <p className="text-center text-muted-foreground mt-3">{t("skills.subtitle")}</p>

      {/* GRID layout pro dva sloupce */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <div key={index} className="flex flex-col space-y-1">
            {/* Ikona + Název */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <span className="text-xl w-8 text-center">{skill.icon}</span>
                <h2 className="text-lg font-semibold">{t(`skills.${skill.key}`)}</h2>
              </div>

              {/* Číslo procent - pevná šířka pro zarovnání */}
              <motion.span
                className="text-sm font-medium w-12 text-right"
                animate={{ opacity: [0, 1], y: [-5, 0] }}
                transition={{ duration: 0.5 }}
              >
                {counts[index]}%
              </motion.span>
            </div>

            {/* Animovaný Progress Bar - sloupce mají stejnou šířku */}
            <div className="relative w-full h-5 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.percentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={clsx("absolute inset-0 rounded-full", `bg-gradient-to-r ${skill.bg}`)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
