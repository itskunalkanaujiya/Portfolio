"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiEye, FiEyeOff, FiTrash2 } from "react-icons/fi";
import { formatDate } from "@/lib/utils";
import type { ContactMessageDTO } from "@/types";

export function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessageDTO[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(id: string, read: boolean) {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !read }),
      });
      if (!res.ok) throw new Error();
      load();
    } catch {
      toast.error("Failed to update message.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Deleted.");
      load();
    } catch {
      toast.error("Failed to delete.");
    }
  }

  return (
    <div>
      <h2 className="mb-6 font-display text-lg font-semibold">Contact Messages</h2>

      {loading ? (
        <p className="text-white/50">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-white/50">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`glass-card p-5 ${msg.read ? "opacity-60" : ""}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white">
                    {msg.subject}{" "}
                    {!msg.read && (
                      <span className="ml-2 rounded-full bg-secondary/20 px-2 py-0.5 text-xs text-secondary">
                        New
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-sm text-white/50">
                    {msg.name} · {msg.email} · {formatDate(msg.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleRead(msg.id, msg.read)}
                    aria-label={msg.read ? "Mark unread" : "Mark read"}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 hover:text-secondary"
                  >
                    {msg.read ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    aria-label="Delete message"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/70">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
