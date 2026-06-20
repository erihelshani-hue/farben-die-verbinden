"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface Props {
  /** Auf dunklem Hintergrund — Felder in Weiß */
  dark?: boolean;
}

export default function ContactForm({ dark = false }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

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

  const textColor   = dark ? "text-white"      : "text-ink";
  const borderColor = dark ? "border-white/30"  : "border-ink/20";
  const focusBorder = dark ? "focus:border-sonne"  : "focus:border-accent";
  const labelColor  = dark ? "text-white/50"    : "text-stone";
  const phColor     = dark ? "placeholder-transparent text-white" : "placeholder-transparent";

  const fieldBase = `peer w-full bg-transparent border-0 border-b ${borderColor} px-0 py-3 font-normal ${textColor} ${phColor} focus:outline-none ${focusBorder} transition-colors`;
  const labelBase = `absolute left-0 top-3 ${labelColor} text-sm transition-all duration-200 pointer-events-none peer-focus:-top-4 peer-focus:text-[0.72rem] peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[0.72rem]`;

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-16 text-center"
        >
          <p
            className={`text-3xl italic ${textColor}`}
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Vielen Dank.
          </p>
          <p className={`mt-3 text-sm ${dark ? "text-white/60" : "text-stone"}`}>
            Ihre Nachricht ist angekommen — wir melden uns in Kürze bei Ihnen.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-10"
          noValidate
        >
          <div className="relative">
            <input id="name" placeholder="Name" className={fieldBase}
              {...register("name", { required: "Bitte Namen eingeben" })} />
            <label htmlFor="name" className={labelBase}>Name</label>
            {errors.name && <p className="mt-2 text-[0.72rem] text-accent">{errors.name.message}</p>}
          </div>

          <div className="relative">
            <input id="email" type="email" placeholder="E-Mail" className={fieldBase}
              {...register("email", {
                required: "Bitte E-Mail eingeben",
                pattern: { value: /\S+@\S+\.\S+/, message: "Ungültige E-Mail-Adresse" },
              })} />
            <label htmlFor="email" className={labelBase}>E-Mail</label>
            {errors.email && <p className="mt-2 text-[0.72rem] text-accent">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <textarea id="message" placeholder="Nachricht" rows={4}
              className={`${fieldBase} resize-none`}
              {...register("message", { required: "Bitte Nachricht eingeben" })} />
            <label htmlFor="message" className={labelBase}>Nachricht</label>
            {errors.message && <p className="mt-2 text-[0.72rem] text-accent">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="flex items-center justify-center gap-3 rounded-full px-8 py-3.5 font-semibold uppercase tracking-[0.12em] text-[0.8rem] transition-all disabled:opacity-60 hover:-translate-y-0.5 cursor-pointer"
            style={{
              background: dark ? "var(--color-sonne)" : "var(--color-ink)",
              color: dark ? "var(--color-ink)" : "var(--color-canvas)",
              fontFamily: "var(--font-display)",
            }}
          >
            {status === "sending" && (
              <span className="w-4 h-4 border-2 border-current/40 border-t-current rounded-full animate-spin" />
            )}
            {status === "sending" ? "Wird gesendet" : "Anfrage senden"}
          </button>

          {status === "error" && (
            <p className={`text-center text-sm ${dark ? "text-sonne" : "text-accent"}`}>
              {errorMsg || "Leider ist etwas schiefgelaufen. Bitte versuchen Sie es erneut."}
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
