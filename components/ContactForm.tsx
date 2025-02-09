"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { useState } from "react";
import { Spinner } from "@heroui/spinner"; // Přidán loading indikátor

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
      e.currentTarget.reset();
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      alert("Nepodařilo se odeslat zprávu. Zkus to znovu.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {/* Skryté parametry pro FormSubmit */}
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value="Nová zpráva z formuláře" />
      <input type="hidden" name="_template" value="table" />

      <Input label="Jméno" name="name" required />
      <Input type="email" label="E-mail" name="email" required />
      <Textarea label="Zpráva" name="message" required />

      <Button type="submit" color="primary" disabled={loading}>
        {loading ? <Spinner size="sm" className="mr-2" /> : null}
        {submitted ? "Odesláno 🎉" : "Odeslat"}
      </Button>
    </form>
  );
}
