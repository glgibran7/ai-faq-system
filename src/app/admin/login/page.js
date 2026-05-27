"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { Eye, EyeOff, LockKeyhole, LogIn, Mail, Shield } from "lucide-react";

import Input from "@/components/ui/input";

import Button from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import ThemeToggle from "@/components/theme-toggle";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  // LOGIN

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // HARDCODE LOGIN

      if (email === "admin@gmail.com" && password === "admin123") {
        localStorage.setItem("admin_logged_in", "true");

        toast.success("Berhasil masuk");

        router.push("/admin/dashboard");
      } else {
        toast.error("Kredensial salah");
      }
    } catch (error) {
      console.log(error);

      toast.error("Gagal masuk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex overflow-hidden transition-colors">
      {/* LEFT SIDE */}

      <div className="hidden lg:flex flex-1 relative bg-primary text-primary-foreground p-12">
        {/* BACKGROUND */}

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-primary-foreground/10 blur-3xl top-[-150px] left-[-150px]" />

          <div className="absolute w-[400px] h-[400px] rounded-full bg-primary-foreground/10 blur-3xl bottom-[-100px] right-[-100px]" />
        </div>

        {/* CONTENT */}

        <div className="relative z-10 flex flex-col justify-between w-full">
          {/* LOGO */}

          <div>
            <div className="inline-flex items-center gap-3 rounded-2xl bg-primary-foreground/10 px-5 py-3 backdrop-blur">
              <div className="w-10 h-10 rounded-xl bg-background text-foreground flex items-center justify-center">
                <Shield size={20} />
              </div>

              <div>
                <h2 className="font-bold">Sistem Dukungan</h2>

                <p className="text-sm opacity-70">Dashboard Admin</p>
              </div>
            </div>
          </div>

          {/* HERO */}

          <div className="max-w-xl">
            <h1 className="text-6xl font-black leading-tight tracking-tight">
              Kelola Dukungan
              <br />
              Pelanggan
              <br />
              dengan Mudah.
            </h1>

            <p className="mt-8 text-xl opacity-70 leading-9">
              Sistem manajemen pertanyaan pelanggan dengan dashboard modern dan
              alur kerja yang praktis.
            </p>
          </div>

          {/* FOOTER */}

          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-primary-foreground/10 backdrop-blur flex items-center justify-center">
              <LogIn size={20} />
            </div>

            <div>
              <p className="font-semibold">Respons Cepat</p>

              <p className="opacity-70 text-sm">
                Kelola pesan pelanggan dengan mudah
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="flex-1 flex items-center justify-center p-6 relative">
        {/* THEME */}

        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        {/* LOGIN CARD */}

        <Card className="w-full max-w-md shadow-2xl border-default glass">
          <CardContent className="p-8 md:p-10">
            {/* MOBILE LOGO */}

            <div className="lg:hidden mb-10 text-center">
              <div className="w-16 h-16 rounded-3xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-5 shadow-sm">
                <Shield size={28} />
              </div>

              <h1 className="text-3xl font-black">Sistem Dukungan</h1>

              <p className="text-muted mt-2">Login Admin</p>
            </div>

            {/* HEADER */}

            <div className="hidden lg:block mb-10">
              <h1 className="text-4xl font-black">Selamat Datang Kembali</h1>

              <p className="text-muted mt-3 leading-7">
                Masuk untuk melanjutkan pengelolaan pertanyaan pelanggan.
              </p>
            </div>

            {/* FORM */}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* EMAIL */}

              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />

                  <Input
                    type="email"
                    placeholder="admin@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11"
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />

                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 pr-11"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* BUTTON */}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base gap-2 mt-4"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Memuat...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Masuk
                  </>
                )}
              </Button>
            </form>

            {/* DEMO ACCOUNT */}

            <div className="mt-8 rounded-2xl bg-secondary p-5 border border-default">
              <p className="text-sm font-semibold mb-3">Akun Demo</p>

              <div className="space-y-2 text-sm text-muted">
                <p>Email: admin@gmail.com</p>

                <p>Password: admin123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
