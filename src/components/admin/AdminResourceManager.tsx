"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import type { AdminResourceConfig } from "@/types";

type Row = Record<string, unknown> & { id: string; order?: number };
type FormValues = Record<string, string | boolean>;

function rowToFormValues(config: AdminResourceConfig, row?: Row): FormValues {
  const values: FormValues = {};
  for (const field of config.fields) {
    const raw = row?.[field.key];
    if (field.type === "checkbox") {
      values[field.key] = Boolean(raw);
    } else if (field.type === "array") {
      values[field.key] = Array.isArray(raw) ? (raw as string[]).join("\n") : "";
    } else {
      values[field.key] = typeof raw === "string" ? raw : "";
    }
  }
  return values;
}

function buildPayload(config: AdminResourceConfig, values: FormValues, editing: Row | null, rowCount: number) {
  const payload: Record<string, unknown> = {};
  for (const field of config.fields) {
    const value = values[field.key];
    if (field.type === "array") {
      payload[field.key] = String(value)
        .split("\n")
        .map((v) => v.trim())
        .filter(Boolean);
    } else if (field.type === "checkbox") {
      payload[field.key] = Boolean(value);
    } else {
      payload[field.key] = value ?? "";
    }
  }
  if (config.hasOrder !== false) {
    payload.order = editing?.order ?? rowCount + 1;
  }
  return payload;
}

export function AdminResourceManager({ config }: { config: AdminResourceConfig }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Row | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormValues>(rowToFormValues(config));

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/${config.resource}`);
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
    } catch {
      toast.error(`Failed to load ${config.label.toLowerCase()}.`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.resource]);

  function openCreate() {
    setEditing(null);
    setForm(rowToFormValues(config));
    setShowForm(true);
  }

  function openEdit(row: Row) {
    setEditing(row);
    setForm(rowToFormValues(config, row));
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!confirm(`Delete this ${config.label.toLowerCase().slice(0, -1) || "item"}? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/${config.resource}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Deleted.");
      load();
    } catch {
      toast.error("Failed to delete.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = buildPayload(config, form, editing, rows.length);

    try {
      const res = await fetch(
        editing ? `/api/${config.resource}/${editing.id}` : `/api/${config.resource}`,
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Failed to save.");
      }
      toast.success(editing ? "Updated." : "Created.");
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save.");
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">{config.label}</h2>
        <Button onClick={openCreate} size="sm">
          <FiPlus /> Add
        </Button>
      </div>

      {loading ? (
        <p className="text-white/50">Loading...</p>
      ) : rows.length === 0 ? (
        <p className="text-white/50">Nothing here yet — add your first entry.</p>
      ) : (
        <div className="glass-card overflow-x-auto p-2">
          <table className="w-full text-left text-sm">
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-white/5 first:border-t-0">
                  <td className="p-4">
                    <p className="font-medium text-white">{String(row[config.titleKey] ?? "")}</p>
                    {config.subtitleKey && (
                      <p className="mt-0.5 line-clamp-1 text-xs text-white/50">
                        {String(row[config.subtitleKey] ?? "")}
                      </p>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(row)}
                        aria-label="Edit"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 hover:text-secondary"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        aria-label="Delete"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setShowForm(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="glass relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/10 p-6"
          >
            <button
              type="button"
              onClick={() => setShowForm(false)}
              aria-label="Close form"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <FiX size={16} />
            </button>
            <h2 className="font-display text-xl font-semibold">
              {editing ? `Edit ${config.label.slice(0, -1) || config.label}` : `New ${config.label.slice(0, -1) || config.label}`}
            </h2>

            <div className="mt-5 space-y-4">
              {config.fields.map((field) => {
                if (field.type === "checkbox") {
                  return (
                    <label key={field.key} className="flex items-center gap-2 text-sm text-white/70">
                      <input
                        type="checkbox"
                        checked={Boolean(form[field.key])}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.checked })}
                        className="h-4 w-4 rounded border-white/20 bg-white/5"
                      />
                      {field.label}
                    </label>
                  );
                }
                if (field.type === "textarea" || field.type === "array") {
                  return (
                    <div key={field.key}>
                      <textarea
                        required={field.required}
                        placeholder={field.placeholder || field.label}
                        value={String(form[field.key] ?? "")}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        rows={field.type === "array" ? 3 : 4}
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-secondary focus:outline-none"
                      />
                      {field.helperText && (
                        <p className="mt-1 text-xs text-white/40">{field.helperText}</p>
                      )}
                    </div>
                  );
                }
                return (
                  <input
                    key={field.key}
                    required={field.required}
                    placeholder={field.placeholder || field.label}
                    value={String(form[field.key] ?? "")}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-secondary focus:outline-none"
                  />
                );
              })}
            </div>

            <Button type="submit" className="mt-6 w-full">
              {editing ? "Save Changes" : "Create"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
