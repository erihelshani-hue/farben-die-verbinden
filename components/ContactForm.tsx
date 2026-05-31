"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

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
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
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

  // Floating-Label-Feld mit reiner Unterlinie.
  const fieldBase =
    "peer w-full bg-transparent border-0 border-b border-ink/20 px-0 py-3 text-ink font-light placeholder-transparent focus:outline-none focus:border-accent transition-colors";
  const labelBase =
    "absolute left-0 top-3 text-stone font-light transition-all duration-200 pointer-events-none peer-focus:-top-3.5 peer-focus:text-[12px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-[12px]";

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-16 text-center"
        >
          <p className="font-serif italic font-light text-3xl text-ink">
            Vielen Dank.
          </p>
          <p className="mt-3 text-stone font-light">
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
            <input
              id="name"
              placeholder="Name"
              className={fieldBase}
              {...register("name", { required: "Bitte Namen eingeben" })}
            />
            <label htmlFor="name" className={labelBase}>
              Name
            </label>
            {errors.name && (
              <p className="mt-2 text-[12px] text-accent font-light">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="E-Mail"
              className={fieldBase}
              {...register("email", {
                required: "Bitte E-Mail eingeben",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Ungültige E-Mail-Adresse",
                },
              })}
            />
            <label htmlFor="email" className={labelBase}>
              E-Mail
            </label>
            {errors.email && (
              <p className="mt-2 text-[12px] text-accent font-light">
                {errors.email.message}
              </p>
            )}
          </div>

          {artworkTitle ? (
            <input type="hidden" value={artworkTitle} {...register("artwork")} />
          ) : (
            <div className="relative">
              <input
                id="artwork"
                placeholder="Interesse an Werk"
                className={fieldBase}
                {...register("artwork")}
              />
              <label htmlFor="artwork" className={labelBase}>
                Interesse an Werk (optional)
              </label>
            </div>
          )}

          <div className="relative">
            <textarea
              id="message"
              placeholder="Nachricht"
              rows={4}
              className={`${fieldBase} resize-none`}
              {...register("message", { required: "Bitte Nachricht eingeben" })}
            />
            <label htmlFor="message" className={labelBase}>
              Nachricht
            </label>
            {errors.message && (
              <p className="mt-2 text-[12px] text-accent font-light">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-4 bg-accent text-white font-light uppercase tracking-[0.15em] text-[13px] hover:bg-[#b5612f] transition-colors disabled:opacity-60 flex items-center justify-center gap-3"
          >
            {status === "sending" && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            {status === "sending" ? "Wird gesendet" : "Anfrage senden"}
          </button>

          {status === "error" && (
            <p className="text-center text-accent font-light text-sm">
              {errorMsg ||
                "Leider ist etwas schiefgelaufen. Bitte versuchen Sie es erneut."}
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
