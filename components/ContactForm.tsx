"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  artwork?: string;
  message: string;
}

interface Props {
  artworkTitle?: string;
}

export default function ContactForm({ artworkTitle }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { artwork: artworkTitle ?? "" },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        const body = await res.json().catch(() => null);
        setErrorMsg(body?.error ?? "");
        setStatus("error");
      }
    } catch {
      setErrorMsg("");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-[#211E1A]/20 rounded-lg bg-white focus:outline-none focus:border-[#D87436] transition-colors text-[#211E1A] placeholder:text-[#211E1A]/40";

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="block text-sm font-medium text-[#211E1A] mb-1.5">Name *</label>
        <input
          {...register("name", { required: "Bitte Namen eingeben" })}
          className={inputClass}
          placeholder="Ihr Name"
        />
        {errors.name && <p className="text-[#D8365E] text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#211E1A] mb-1.5">E-Mail *</label>
        <input
          {...register("email", {
            required: "Bitte E-Mail eingeben",
            pattern: { value: /\S+@\S+\.\S+/, message: "Ungültige E-Mail-Adresse" },
          })}
          className={inputClass}
          placeholder="ihre@email.de"
          type="email"
        />
        {errors.email && <p className="text-[#D8365E] text-xs mt-1">{errors.email.message}</p>}
      </div>

      {!artworkTitle && (
        <div>
          <label className="block text-sm font-medium text-[#211E1A] mb-1.5">Interesse an Werk</label>
          <input
            {...register("artwork")}
            className={inputClass}
            placeholder="Titel des Werks (optional)"
          />
        </div>
      )}

      {artworkTitle && (
        <input type="hidden" {...register("artwork")} value={artworkTitle} />
      )}

      <div>
        <label className="block text-sm font-medium text-[#211E1A] mb-1.5">Nachricht *</label>
        <textarea
          {...register("message", { required: "Bitte Nachricht eingeben" })}
          className={`${inputClass} resize-none`}
          rows={5}
          placeholder="Ihre Anfrage..."
        />
        {errors.message && <p className="text-[#D8365E] text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3.5 bg-[#D87436] hover:bg-[#c4672d] text-white font-medium rounded-lg transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Wird gesendet…" : "Anfrage senden"}
      </button>

      {status === "success" && (
        <p className="text-center text-[#1B589F] font-medium">
          ✓ Vielen Dank! Wir melden uns bald bei Ihnen.
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-[#D8365E]">
          {errorMsg || "Leider ist etwas schiefgelaufen. Bitte versuchen Sie es erneut."}
        </p>
      )}
    </motion.form>
  );
}
