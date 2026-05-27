"use client";

import { collection, onSnapshot } from "firebase/firestore";

import { db } from "@/lib/firebase";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Inbox,
  Sparkles,
  TrendingUp,
  Bot,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import Badge from "@/components/ui/badge";

export default function DashboardPage() {
  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "questions"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setQuestions(data);

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // STATS
  const totalQuestions = questions.length;

  const totalPending = questions.filter(
    (item) => item.status === "pending"
  ).length;

  const totalAnswered = questions.filter(
    (item) => item.status === "answered"
  ).length;

  // RECENT QUESTIONS
  const recentQuestions = [...questions]
    .sort((a, b) => {
      const aTime = a.createdAt?.toDate?.()?.getTime?.() || 0;

      const bTime = b.createdAt?.toDate?.()?.getTime?.() || 0;

      return bTime - aTime;
    })
    .slice(0, 5);

  // CARDS
  const cards = [
    {
      title: "Total Pertanyaan",
      value: totalQuestions,
      icon: Inbox,
      badge: "Semua Pertanyaan",
      variant: "default",
    },

    {
      title: "Tertunda",
      value: totalPending,
      icon: Clock3,
      badge: "Perlu Ditinjau",
      variant: "warning",
    },

    {
      title: "Dijawab",
      value: totalAnswered,
      icon: CheckCircle2,
      badge: "Selesai",
      variant: "success",
    },
  ];

  // LOADING
  if (loading) {
    return (
      <div className="space-y-5">
        <div className="h-44 rounded-3xl bg-card border border-default animate-pulse" />

        <div className="grid md:grid-cols-3 gap-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-32 rounded-3xl bg-card border border-default animate-pulse"
            />
          ))}
        </div>

        <div className="h-72 rounded-3xl bg-card border border-default animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* HERO */}

      <Card className="overflow-hidden relative">
        <CardContent className="relative p-6 md:p-7 overflow-hidden">
          {/* BACKGROUND */}

          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-surface blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">
            {/* LEFT */}

            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-default bg-surface px-4 py-2 text-xs font-medium text-muted mb-5">
                <Sparkles size={14} />
                Dasbor Bertenaga AI
              </div>

              <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight">
                Dasbor
                <br />
                Dukungan Pelanggan
              </h1>

              <p className="mt-4 text-sm md:text-[15px] leading-7 text-muted max-w-lg">
                Pantau pertanyaan pelanggan, tinjau jawaban AI, dan kelola alur
                dukungan secara efisien.
              </p>
            </div>

            {/* RIGHT */}

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-default bg-surface p-4 min-w-[140px]">
                <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center mb-4">
                  <Inbox size={18} />
                </div>

                <p className="text-xs text-muted">Pertanyaan</p>

                <h2 className="text-3xl font-black mt-1">{totalQuestions}</h2>
              </div>

              <div className="rounded-2xl border border-default bg-surface p-4 min-w-[140px]">
                <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center mb-4">
                  <Bot size={18} />
                </div>

                <p className="text-xs text-muted">Jawaban AI</p>

                <h2 className="text-3xl font-black mt-1">{totalAnswered}</h2>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Card
              key={card.title}
              className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted">{card.title}</p>

                    <h2 className="text-4xl font-black mt-3">{card.value}</h2>
                  </div>

                  <div className="w-11 h-11 rounded-2xl border border-default bg-surface flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <Badge variant={card.variant}>{card.badge}</Badge>

                  <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
                    <TrendingUp size={12} />
                    Aktif
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* RECENT QUESTIONS */}

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* HEADER */}

          <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Pertanyaan Terbaru</h2>

              <p className="text-sm text-muted mt-1">
                Pertanyaan pelanggan terbaru
              </p>
            </div>

            <Link
              href="/admin/questions"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition"
            >
              Lihat Semua
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* LIST */}

          <div className="divide-y divide-default">
            {recentQuestions.length === 0 ? (
              <div className="p-10 text-center">
                <div className="w-14 h-14 rounded-2xl border border-default bg-surface flex items-center justify-center mx-auto">
                  <Inbox size={24} className="text-muted" />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  Belum Ada Pertanyaan
                </h3>

                <p className="text-sm text-muted mt-2">
                  Pertanyaan masuk akan muncul di sini.
                </p>
              </div>
            ) : (
              recentQuestions.map((item) => (
                <Link
                  key={item.id}
                  href={`/admin/questions/${item.id}`}
                  className="block p-5 hover:bg-surface transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* LEFT */}

                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-2xl bg-foreground text-background flex items-center justify-center font-bold text-sm shrink-0">
                        {item.name?.charAt(0)?.toUpperCase()}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="font-semibold truncate">
                            {item.name}
                          </h3>

                          <Badge
                            variant={
                              item.status === "answered" ? "success" : "warning"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted line-clamp-2 leading-6">
                          {item.question}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT */}

                    <div className="hidden md:flex w-9 h-9 rounded-xl border border-default bg-surface items-center justify-center shrink-0">
                      <ArrowRight size={15} className="text-muted" />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
