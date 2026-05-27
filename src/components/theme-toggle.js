"use client";

import { Moon, Sun } from "lucide-react";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  const [mounted, setMounted] = useState(false);

  // INIT THEME
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";

    setTheme(savedTheme);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setMounted(true);
  }, []);

  // TOGGLE
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // AVOID HYDRATION ERROR
  if (!mounted) {
    return (
      <div className="w-11 h-11 rounded-2xl border border-gray-200 dark:border-slate-800" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-11 h-11 rounded-2xl border border-gray-200 dark:border-slate-800 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-900 transition"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
