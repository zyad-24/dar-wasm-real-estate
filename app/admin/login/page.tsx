"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin-login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("كلمة المرور غير صحيحة");
      return;
    }

    router.push("/admin");
  }

  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#061d26] px-5 text-white">
      <div className="w-full max-w-md rounded-3xl border border-[#d6a642]/20 bg-white/5 p-6">
        <h1 className="mb-6 text-center text-3xl font-bold text-[#d6a642]">
          دخول الإدارة
        </h1>

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-2xl bg-[#0d2b36] p-4 outline-none"
        />

        {error && <p className="mt-3 text-red-400">{error}</p>}

        <button
          onClick={login}
          disabled={loading}
          className="mt-5 w-full rounded-2xl bg-[#d6a642] py-4 font-bold text-[#061d26]"
        >
          {loading ? "جاري التحقق..." : "دخول"}
        </button>
      </div>
    </main>
  );
}