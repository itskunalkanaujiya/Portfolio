"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { AdminProjects } from "@/components/admin/AdminProjects";
import { AdminResourceManager } from "@/components/admin/AdminResourceManager";
import { AdminMessages } from "@/components/admin/AdminMessages";
import { adminResourceConfigs } from "@/lib/data/admin-resources";
import { cn } from "@/lib/utils";

const TABS = ["Projects", ...adminResourceConfigs.map((c) => c.label), "Messages"] as const;

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Projects");

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="section-container max-w-5xl pt-32">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="section-heading !text-3xl">
            <span className="gradient-text">Admin Dashboard</span>
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Manage every section of the portfolio from here.
          </p>
        </div>
        <Button onClick={handleLogout} size="sm" variant="outline">
          <FiLogOut /> Logout
        </Button>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 border-b border-white/5 pb-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab
                ? "bg-gradient-to-r from-primary to-secondary text-white"
                : "bg-white/5 text-white/60 hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Projects" && <AdminProjects />}
      {activeTab === "Messages" && <AdminMessages />}
      {adminResourceConfigs.map(
        (config) =>
          activeTab === config.label && (
            <AdminResourceManager key={config.resource} config={config} />
          )
      )}
    </main>
  );
}
