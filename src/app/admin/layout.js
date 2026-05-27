"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  MessageSquare,
  LogOut,
  PanelLeftClose,
  X,
  Shield,
} from "lucide-react";

import ThemeToggle from "@/components/theme-toggle";
import Button from "@/components/ui/button";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // LOGIN PAGE CHECK
  const isLoginPage = pathname === "/admin/login";

  // AUTH CHECK
  useEffect(() => {
    if (isLoginPage) return;

    const isLogin = localStorage.getItem("admin_logged_in");

    if (!isLogin) {
      router.push("/admin/login");
    }
  }, [pathname, router, isLoginPage]);

  // LOGIN PAGE
  if (isLoginPage) {
    return children;
  }

  // MENUS
  const menus = [
    {
      name: "Dasbor",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Pertanyaan",
      path: "/admin/questions",
      icon: MessageSquare,
    },
  ];

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    router.push("/admin/login");
  };

  return (
    <div className="h-screen bg-background text-foreground flex overflow-hidden">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-overlay z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-card border-r border-default transition-transform duration-300 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* HEADER */}
        <div className="h-20 border-b border-default flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
              <Shield size={22} />
            </div>

            <div>
              <h1 className="text-xl font-black">FAQ System</h1>
              <p className="text-sm text-muted">Admin Panel</p>
            </div>
          </div>

          {/* CLOSE MOBILE */}
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={22} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto p-5 space-y-2">
          {menus.map((menu) => {
            const active = pathname.startsWith(menu.path);

            return (
              <Link
                key={menu.path}
                href={menu.path}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all font-medium ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-secondary text-foreground"
                }`}
              >
                <menu.icon size={20} />
                <span>{menu.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="p-5 border-t border-default shrink-0">
          <Button
            variant="destructive"
            className="w-full justify-center"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Keluar
          </Button>
        </div>
      </aside>

      {/* MAIN WRAPPER */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
        {/* TOPBAR */}
        <header className="h-20 border-b border-default glass px-6 flex items-center justify-between sticky top-0 z-30 bg-background/80 backdrop-blur-md shrink-0">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* MOBILE MENU */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-11 h-11 rounded-2xl border border-default flex items-center justify-center hover:bg-secondary transition"
            >
              <PanelLeftClose size={20} />
            </button>

            <div>
              <h2 className="text-2xl font-bold capitalize">
                {pathname.split("/").filter(Boolean).pop()?.replace("-", " ")}
              </h2>

              <p className="text-sm text-muted mt-1">
                Selamat datang kembali admin
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <div className="hidden md:block text-right">
              <p className="font-semibold">Administrator</p>
              <p className="text-sm text-muted">Sistem FAQ</p>
            </div>

            {/* AVATAR */}
            <div className="w-11 h-11 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-sm">
              A
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
