"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { Card } from "@heroui/card";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Projekty s barvami
const projects = [
  { key: "memeGenerator", icon: "🚀", bg: "from-[#ff416c] to-[#ff4b2b]", description: "Vytváření AI generovaných memů automaticky podle trendů." },
  { key: "acquisitionApp", icon: "📱", bg: "from-[#0072ff] to-[#00c6ff]", description: "Mobilní aplikace pro efektivní správu akvizic a klientů." },
  { key: "cmsSystem", icon: "📰", bg: "from-[#00c9ff] to-[#92fe9d]", description: "Redakční systém pro správu obsahu a publikování článků." },
  { key: "socialAutomation", icon: "🤖", bg: "from-[#f09819] to-[#ff512f]", description: "Automatizace postování obsahu na sociálních sítích." },
  { key: "businessDashboard", icon: "📊", bg: "from-[#7f00ff] to-[#e100ff]", description: "Dashboard pro analýzu podnikových dat a statistik." },
  {
    key: "superparmeni",
    icon: "🎮",
    bg: "from-[#667eea] to-[#764ba2]",
    link: "https://superparmeni.eu",
    description: "Herní magazín Superpařmeni, kde najdeš recenze a novinky ze světa her.",
  },
];

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center">{t("projects.title")}</h1>
      <p className="text-center text-muted-foreground mt-3">{t("projects.subtitle")}</p>

      {/* Seznam projektů v jednom sloupci */}
      <div className="mt-10 space-y-6">
        {projects.map((project, index) => {
          const isActive = expandedIndex === index;
          return (
            <div key={index} className="w-full">
              <button
                onClick={() => setExpandedIndex(isActive ? null : index)}
                className="w-full text-left"
              >
                <Card
                  className={clsx(
                    "relative w-full overflow-hidden border border-gray-300 dark:border-gray-700 transition-all duration-500",
                    "shadow-lg shadow-gray-400 dark:shadow-[0_0_20px_6px_rgba(255,255,255,0.2)]",
                    isActive ? "opacity-100" : "group"
                  )}
                >
                  {/* Aktivní barva zůstává dokud je karta otevřená */}
                  <div
                    className={clsx(
                      "absolute inset-0 transition-opacity duration-500",
                      `bg-gradient-to-r ${project.bg}`,
                      isActive ? "opacity-100" : "opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    )}
                  ></div>

                  {/* Obsah karty */}
                  <div className="relative z-10 p-6 flex items-center gap-4">
                    <span className="text-xl">{project.icon}</span>
                    <h2 className="text-lg font-semibold">{t(`projects.${project.key}`)}</h2>
                  </div>
                </Card>
              </button>

              {/* Rozbalovací část s animací */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-white dark:bg-black border-t border-gray-300 dark:border-gray-700">
                      <p className="text-muted-foreground">{t(`projects.descriptions.${project.key}`) || project.description}</p>
                      {project.link && (
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-2 text-primary font-medium"
                        >
                          {t("projects.viewMore")} →
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
