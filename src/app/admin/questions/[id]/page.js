"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  ArrowLeft,
  Bot,
  Calendar,
  Check,
  Loader2,
  Mail,
  RefreshCcw,
  Trash2,
  User2,
} from "lucide-react";

import Button from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import Badge from "@/components/ui/badge";

import Textarea from "@/components/ui/textarea";

export default function QuestionDetailPage() {
  const router = useRouter();

  const params = useParams();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [regenerating, setRegenerating] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [questionData, setQuestionData] = useState(null);

  const [answer, setAnswer] = useState("");

  // FETCH QUESTION
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const docRef = doc(db, "questions", params.id);

        const snap = await getDoc(docRef);

        if (!snap.exists()) {
          toast.error("Pertanyaan tidak ditemukan");

          return router.push("/admin/questions");
        }

        const data = {
          id: snap.id,
          ...snap.data(),
        };

        setQuestionData(data);

        setAnswer(data.answer || "");
      } catch (error) {
        console.log(error);

        toast.error("Gagal memuat pertanyaan");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [params.id, router]);

  // SAVE
  const handleSave = async () => {
    try {
      setSaving(true);

      const docRef = doc(db, "questions", params.id);

      await updateDoc(docRef, {
        answer,
        status: "answered",
      });

      toast.success("Jawaban berhasil disimpan");

      router.push("/admin/dashboard");
    } catch (error) {
      console.log(error);

      toast.error("Gagal menyimpan jawaban");
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const handleDelete = async () => {
    try {
      const docRef = doc(db, "questions", params.id);

      await deleteDoc(docRef);

      toast.success("Pertanyaan dihapus");

      router.push("/admin/questions");
    } catch (error) {
      console.log(error);

      toast.error("Gagal menghapus pertanyaan");
    }
  };

  // REGENERATE AI
  const handleRegenerateAI = async () => {
    try {
      setRegenerating(true);

      const res = await fetch("/api/ai", {
        method: "POST",

        body: JSON.stringify({
          question: questionData.question,
        }),
      });

      const data = await res.json();

      setAnswer(data.answer);

      toast.success("Draf AI berhasil dibuat ulang");
    } catch (error) {
      console.log(error);

      toast.error("Gagal membuat ulang AI");
    } finally {
      setRegenerating(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-32 rounded-3xl bg-secondary animate-pulse" />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 h-72 rounded-3xl bg-secondary animate-pulse" />

          <div className="lg:col-span-2 h-72 rounded-3xl bg-secondary animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <Button
            variant="outline"
            className="mb-4 gap-2"
            onClick={() => router.push("/admin/questions")}
          >
            <ArrowLeft size={16} />
            Kembali
          </Button>

          <h1 className="text-4xl font-black text-foreground">
            Detail Pertanyaan
          </h1>

          <p className="text-muted mt-2">
            Tinjau dan jawab pertanyaan pelanggan.
          </p>
        </div>

        <Badge
          variant={questionData.status === "answered" ? "success" : "warning"}
          className="w-fit text-sm px-4 py-2"
        >
          {questionData.status}
        </Badge>
      </div>

      {/* GRID */}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT */}

        <div className="space-y-6">
          {/* CUSTOMER */}

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Pelanggan</h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center">
                    <User2 size={18} />
                  </div>

                  <div>
                    <p className="text-sm text-muted">Name</p>

                    <p className="font-semibold mt-1">{questionData.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center">
                    <Mail size={18} />
                  </div>

                  <div>
                    <p className="text-sm text-muted">Email</p>

                    <p className="font-semibold mt-1 break-all">
                      {questionData.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center">
                    <Calendar size={18} />
                  </div>

                  <div>
                    <p className="text-sm text-muted">Dibuat pada</p>

                    <p className="font-semibold mt-1">
                      {questionData.createdAt?.toDate?.()?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DELETE */}

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-3">Zona Bahaya</h2>

              <p className="text-sm text-muted mb-6">
                Hapus permanen pertanyaan dan jawaban ini.
              </p>

              <Button
                variant="destructive"
                className="w-full gap-2"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 size={18} />
                Hapus Pertanyaan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}

        <div className="lg:col-span-2 space-y-6">
          {/* QUESTION */}

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold">Pertanyaan Pelanggan</h2>

                <Badge>Masuk</Badge>
              </div>

              <div className="rounded-3xl bg-secondary p-6 leading-8 text-foreground">
                {questionData.question}
              </div>
            </CardContent>
          </Card>

          {/* ANSWER */}

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Draf Jawaban AI</h2>

                  <p className="text-muted text-sm mt-1">
                    Sunting jawaban AI sebelum menyimpan.
                  </p>
                </div>

                <Button
                  variant="secondary"
                  className="gap-2"
                  disabled={regenerating}
                  onClick={handleRegenerateAI}
                >
                  {regenerating ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <RefreshCcw size={18} />
                  )}

                  {regenerating ? "Membuat..." : "Buat Ulang AI"}
                </Button>
              </div>

              <Textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="min-h-[350px]"
                placeholder="Tulis jawaban..."
              ></Textarea>
              <div className="flex justify-end mt-6">
                <Button
                  className="gap-2"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Check size={18} />
                  )}

                  {saving ? "Menyimpan..." : "Simpan Jawaban"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* DELETE MODAL */}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-overlay backdrop-blur-sm flex items-center justify-center z-50 p-5">
          <div className="w-full max-w-md rounded-3xl bg-card border border-default p-7">
            <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-5">
              <Trash2 size={24} className="text-red-500" />
            </div>

            <h2 className="text-2xl font-bold">Hapus Pertanyaan?</h2>

            <p className="text-muted mt-3 leading-7">
              Tindakan ini tidak dapat dibatalkan. Pertanyaan dan jawaban akan
              dihapus permanen.
            </p>

            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowDeleteModal(false)}
              >
                Batal
              </Button>

              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDelete}
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
