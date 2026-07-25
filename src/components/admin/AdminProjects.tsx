"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { slugify } from "@/lib/utils";
import type { ProjectDTO } from "@/types";

type ProjectFormState = Omit<
  ProjectDTO,
  "id" | "featured" | "order" | "gallery" | "techStack" | "longDescription" | "githubUrl" | "liveUrl"
> & {
  techStackInput: string;
  featured: boolean;
  longDescription: string;
  githubUrl: string;
  liveUrl: string;
};

const emptyForm: ProjectFormState = {
  title: "",
  slug: "",
  description: "",
  longDescription: "",
  image: "/images/PROJECT_IMAGE.jpg",
  category: "Full Stack",
  githubUrl: "",
  liveUrl: "",
  featured: false,
  techStackInput: "",
};

export function AdminProjects() {
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ProjectDTO | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProjectFormState>(emptyForm);

  async function loadProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(project: ProjectDTO) {
    setEditing(project);
    setForm({
      ...project,
      longDescription: project.longDescription ?? "",
      githubUrl: project.githubUrl ?? "",
      liveUrl: project.liveUrl ?? "",
      techStackInput: project.techStack.join(", "),
    });
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Project deleted.");
      loadProjects();
    } catch {
      toast.error("Failed to delete project.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      description: form.description,
      longDescription: form.longDescription,
      image: form.image,
      gallery: [form.image],
      techStack: form.techStackInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      category: form.category,
      githubUrl: form.githubUrl,
      liveUrl: form.liveUrl,
      featured: form.featured,
      order: editing?.order ?? projects.length + 1,
    };

    try {
      const res = await fetch(editing ? `/api/projects/${editing.id}` : "/api/projects", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Failed to save project.");
      }
      toast.success(editing ? "Project updated." : "Project created.");
      setShowForm(false);
      loadProjects();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save project.");
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">Projects</h2>
        <Button onClick={openCreate} size="sm">
          <FiPlus /> Add
        </Button>
      </div>

      {loading ? (
        <p className="text-white/50">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-white/50">No projects yet — add your first one.</p>
      ) : (
        <div className="glass-card overflow-x-auto p-2">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-white/40">
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-white/5">
                  <td className="p-4 font-medium text-white">{p.title}</td>
                  <td className="p-4 text-white/60">{p.category}</td>
                  <td className="p-4 text-white/60">{p.featured ? "Yes" : "No"}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        aria-label={`Edit ${p.title}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 hover:text-secondary"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        aria-label={`Delete ${p.title}`}
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
              {editing ? "Edit Project" : "New Project"}
            </h2>

            <div className="mt-5 space-y-4">
              <input
                required
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-secondary focus:outline-none"
              />
              <input
                placeholder="Slug (auto-generated if left blank)"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-secondary focus:outline-none"
              />
              <textarea
                required
                placeholder="Short description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-secondary focus:outline-none"
              />
              <textarea
                placeholder="Long description"
                value={form.longDescription}
                onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                rows={3}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-secondary focus:outline-none"
              />
              <input
                placeholder="Image path (/images/...)"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-secondary focus:outline-none"
              />
              <input
                placeholder="Tech stack (comma separated)"
                value={form.techStackInput}
                onChange={(e) => setForm({ ...form, techStackInput: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-secondary focus:outline-none"
              />
              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-secondary focus:outline-none"
              />
              <input
                placeholder="GitHub URL"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-secondary focus:outline-none"
              />
              <input
                placeholder="Live demo URL"
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-secondary focus:outline-none"
              />
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="h-4 w-4 rounded border-white/20 bg-white/5"
                />
                Featured project
              </label>
            </div>

            <Button type="submit" className="mt-6 w-full">
              {editing ? "Save Changes" : "Create Project"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
