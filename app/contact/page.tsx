"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { useState, useRef } from "react";
import { Spinner } from "@heroui/spinner";
import confetti from "canvas-confetti";

export default function ContactForm() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("https://formsubmit.co/samuel.krehy@gmail.com", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      setSubmitted(true);
      formRef.current?.reset(); // Resetuje formulář

      // Spuštění konfet 🎉
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });

      setTimeout(() => setSubmitted(false), 3000);
    } else {
      alert(t("contact.errorMessage"));
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4">
      {/* Skryté parametry pro FormSubmit */}
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value={t("contact.emailSubject")} />
      <input type="hidden" name="_template" value="table" />

      <Input label={t("contact.name")} name="name" required />
      <Input type="email" label={t("contact.email")} name="email" required />
      <Textarea label={t("contact.message")} name="message" required />

      <Button type="submit" color="primary" disabled={loading}>
        {submitted ? t("contact.sent") : t("contact.send")}
      </Button>
    </form>
  );
}
