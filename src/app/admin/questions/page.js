"use client";

import { collection, onSnapshot } from "firebase/firestore";

import { db } from "@/lib/firebase";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import { ArrowRight, Inbox, Search, Filter } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import Input from "@/components/ui/input";

import Badge from "@/components/ui/badge";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  // FETCH QUESTIONS
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

  // FILTERED QUESTIONS
  const filteredQuestions = useMemo(() => {
    return questions.filter((item) => {
      const matchSearch =
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase()) ||
        item.question?.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [questions, search, statusFilter]);

  // SORT LATEST
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    const aTime = a.createdAt?.toDate?.()?.getTime?.() || 0;

    const bTime = b.createdAt?.toDate?.()?.getTime?.() || 0;

    return bTime - aTime;
  });

  return (
    <div className="space-y-5">
      {/* PAGE HEADER */}

      <div>
        <h1 className="text-3xl font-black text-foreground">Pertanyaan</h1>

        <p className="text-sm text-muted mt-2">
          Kelola semua pertanyaan pelanggan yang masuk.
        </p>
      </div>

      {/* FILTER */}

      <Card className="bg-card border-default shadow-sm">
        <CardContent className="p-5">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* SEARCH */}

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <Input
                placeholder="Search question..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11"
              />
            </div>

            {/* FILTER */}

            <div className="relative">
              <Filter
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="
                  h-11
                  rounded-2xl
                  border
                  border-default
                  bg-card
                  text-foreground
                  px-10
                  text-sm
                  outline-none
                  min-w-[180px]
                  transition-all
                  focus:ring-4
                  focus:ring-black/5
                  dark:focus:ring-white/10
                "
              >
                <option value="all">Semua Status</option>

                <option value="pending">Tertunda</option>

                <option value="answered">Dijawab</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TABLE */}

      <Card className="overflow-hidden bg-card border-default shadow-sm">
        <CardContent className="p-0">
          {/* LOADING */}

          {loading ? (
            <div className="divide-y divide-default">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="p-5 animate-pulse">
                  <div className="h-5 w-52 rounded bg-secondary mb-4" />

                  <div className="h-4 w-full rounded bg-secondary mb-2" />

                  <div className="h-4 w-1/2 rounded bg-secondary" />
                </div>
              ))}
            </div>
          ) : sortedQuestions.length === 0 ? (
            // EMPTY STATE

            <div className="py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto">
                <Inbox size={28} className="text-muted" />
              </div>

              <h2 className="text-2xl font-bold mt-6 text-foreground">
                Tidak Ada Pertanyaan
              </h2>

              <p className="text-muted mt-2">Tidak ada pertanyaan pelanggan.</p>
            </div>
          ) : (
            <div className="divide-y divide-default">
              {sortedQuestions.map((item) => (
                <Link
                  key={item.id}
                  href={`/admin/questions/${item.id}`}
                  className="
                    block
                    p-5
                    transition
                    hover:bg-surface
                  "
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    {/* LEFT */}

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-2xl bg-foreground text-background flex items-center justify-center font-bold shrink-0">
                          {item.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold text-foreground">
                            {item.name}
                          </h3>

                          <p className="text-sm text-muted truncate">
                            {item.email}
                          </p>
                        </div>

                        <Badge
                          variant={
                            item.status === "answered" ? "success" : "warning"
                          }
                        >
                          {item.status === "answered" ? "Dijawab" : "Tertunda"}
                        </Badge>
                      </div>

                      <p className="text-sm leading-7 text-muted line-clamp-2">
                        {item.question}
                      </p>
                    </div>

                    {/* RIGHT */}

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right hidden md:block">
                        <p className="text-xs text-muted">Created At</p>

                        <p className="text-sm font-medium text-foreground mt-1">
                          {item.createdAt?.toDate?.()?.toLocaleDateString()}
                        </p>
                      </div>

                      <div className="w-11 h-11 rounded-2xl border border-default bg-secondary flex items-center justify-center">
                        <ArrowRight size={18} className="text-muted" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
