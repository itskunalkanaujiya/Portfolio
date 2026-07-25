"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLock, FiMail } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { GradientBlobs } from "@/components/ui/GradientBlobs";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-mesh px-4">
      <GradientBlobs className="opacity-30" />
      <form
        onSubmit={onSubmit}
        className="glass-card relative w-full max-w-sm p-8"
        noValidate
      >
        <h1 className="font-display text-2xl font-bold">
          <span className="gradient-text">Admin Login</span>
        </h1>
        <p className="mt-1 text-sm text-white/50">Sign in to manage portfolio content.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-white/70">
              Email
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <FiMail className="text-white/40" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-none"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm text-white/70">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <FiLock className="text-white/40" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </form>
    </main>
  );
}
