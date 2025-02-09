"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Github, Linkedin, FileText, FileBadge } from "lucide-react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";

export const Footer = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "Samuel_Krehacek_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
  };

  return (
    <footer className="w-full bg-white dark:bg-black text-gray-900 dark:text-white py-10 border-t border-gray-300 dark:border-gray-700">
      <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* O mně */}
        <div>
          <h2 className="text-lg font-semibold text-purple-600 dark:text-purple-400">{t("footer.aboutTitle")}</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{t("footer.aboutText")}</p>
        </div>

        {/* Kontakt */}
        <div>
          <div className="mt-20 space-y-2">
            <Button
              variant="flat"
              className="flex items-center gap-2 w-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
              onClick={handleOpen}
            >
              <FileText className="w-5 h-5" />
              {t("footer.downloadCV")}
            </Button>
          </div>
        </div>

        {/* Sociální sítě */}
        <div>
          <div className="mt-20 space-y-2">
            <Button
              as={Link}
              href="/certifikat.pdf"
              target="_blank"
              variant="flat"
              className="flex items-center gap-2 w-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <FileBadge className="w-5 h-5" />
              {t("footer.viewCertificate")}
            </Button>
          </div>
        </div>
      </div>

      {/* 🔥 MODAL PRO UPOZORNĚNÍ PŘED STAŽENÍM CV 🔥 */}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <ModalHeader>{t("footer.cvWarningTitle")}</ModalHeader>
          <ModalBody>
            <p className="text-sm text-gray-700 dark:text-gray-300">{t("footer.cvWarningText")}</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={handleClose}>
              {t("footer.cancel")}
            </Button>
            <Button color="primary" onClick={handleDownload}>
              {t("footer.confirmDownload")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </footer>
  );
};
