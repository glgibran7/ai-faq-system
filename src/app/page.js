"use client";

import Link from "next/link";
import { useState } from "react";

import toast from "react-hot-toast";

import {
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquareText,
  Send,
  User2,
} from "lucide-react";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";

import { Card, CardContent } from "@/components/ui/card";

import ThemeToggle from "@/components/theme-toggle";

export default function HomePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !question) {
      return toast.error("Harap isi semua bidang");
    }

    if (question.length < 10) {
      return toast.error("Pesan terlalu pendek");
    }

    try {
      setLoading(true);

      const res = await fetch("/api/questions", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          question,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setSuccess(true);

      setName("");
      setEmail("");
      setQuestion("");

      toast.success("Pesan berhasil dikirim");
    } catch (error) {
      console.log(error);

      toast.error("Gagal mengirim pesan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* NAVBAR */}

      <header className="sticky top-0 z-50 w-full border-b border-default bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-3 font-black text-lg tracking-tight"
          >
            <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
              S
            </div>

            <span>SupportHub</span>
          </Link>

          {/* THEME */}

          <ThemeToggle />
        </div>
      </header>

      {/* MAIN */}

      <main className="min-h-screen bg-background text-foreground transition-colors">
        {/* BACKGROUND */}

        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl top-[-150px] left-[-150px]" />

          <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl bottom-[-150px] right-[-150px]" />
        </div>

        {/* HERO */}

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}

            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-default bg-card px-5 py-2 text-sm font-medium mb-8 shadow-sm">
                <CheckCircle2 size={16} />
                Layanan Bantuan Online
              </div>

              <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                Ajukan pertanyaan kapan saja.
                <br />
                <span className="text-muted">Kami siap membantu Anda.</span>
              </h1>

              <p className="mt-8 text-lg md:text-xl leading-8 text-muted max-w-2xl">
                Kirim pertanyaan atau pesan Anda melalui formulir di bawah ini.
              </p>

              {/* FEATURES */}

              <div className="mt-10 space-y-4 rounded-3xl border border-default bg-surface p-6 shadow-sm">
                {[
                  "Proses cepat dan mudah",
                  "Tim support responsif",
                  "Layanan modern dan nyaman",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center">
                      <CheckCircle2 size={18} />
                    </div>

                    <p className="text-base md:text-lg font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}

            <div>
              <Card className="overflow-hidden bg-card border border-default shadow-2xl backdrop-blur-xl ring-1 ring-slate-900/5">
                <CardContent className="p-8 md:p-10 space-y-6">
                  {!success ? (
                    <>
                      {/* HEADER */}

                      <div className="mb-8">
                        <h2 className="text-3xl font-black">Hubungi Kami</h2>

                        <p className="text-muted mt-3 leading-7">
                          Isi formulir berikut dan kirim pesan Anda kepada kami.
                        </p>
                      </div>

                      {/* FORM */}

                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* NAME */}

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Nama Lengkap
                          </label>

                          <div className="relative">
                            <User2
                              size={18}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                            />

                            <Input
                              placeholder="Nama Anda"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="pl-11"
                            />
                          </div>
                        </div>

                        {/* EMAIL */}

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Alamat Email
                          </label>

                          <div className="relative">
                            <Mail
                              size={18}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                            />

                            <Input
                              type="email"
                              placeholder="nama@contoh.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="pl-11"
                            />
                          </div>
                        </div>

                        {/* MESSAGE */}

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Pesan Anda
                          </label>

                          <div className="relative">
                            <MessageSquareText
                              size={18}
                              className="absolute left-4 top-5 text-muted"
                            />

                            <Textarea
                              placeholder="Tulis pesan Anda..."
                              value={question}
                              onChange={(e) => setQuestion(e.target.value)}
                              className="pl-11 min-h-[160px]"
                            />
                          </div>
                        </div>

                        {/* BUTTON */}

                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full h-14 rounded-[1.25rem] text-base gap-3"
                        >
                          {loading ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              Mengirim...
                            </>
                          ) : (
                            <>
                              <Send size={18} />
                              Kirim Pesan
                            </>
                          )}
                        </Button>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-10">
                      <div className="w-24 h-24 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={45} />
                      </div>

                      <h2 className="text-4xl font-black">
                        Berhasil Terkirim!
                      </h2>

                      <p className="text-muted mt-5 leading-8 max-w-md mx-auto">
                        Pesan Anda telah berhasil dikirim. Kami akan segera
                        menghubungi Anda.
                      </p>

                      <Button
                        className="mt-8"
                        onClick={() => setSuccess(false)}
                      >
                        Kirim Lagi
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
