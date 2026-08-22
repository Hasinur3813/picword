"use client";

import { useState } from "react";
import { Plus, FolderTree, Edit3, Trash2, BookOpen } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export default function AdminCategoriesPage() {
  const [categoriesList] = useState(CATEGORIES);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2
            className="text-2xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Category Matrix Management
          </h2>
          <p className="text-xs text-muted">
            Configure learning domains, icons, and word assignments ({categoriesList.length} active domains).
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-light transition-all hover:scale-105 shadow-md shrink-0 focus-ring"
        >
          <Plus size={15} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Table */}
      <div className="rounded-2xl glass border border-border/60 overflow-hidden bg-elevated/50 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface/80 text-muted uppercase text-[10px] tracking-wider border-b border-border/60">
              <tr>
                <th className="py-3.5 px-4">Icon & Name</th>
                <th className="py-3.5 px-4">Slug</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4">Word Count</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {categoriesList.map((cat) => (
                <tr key={cat.slug} className="hover-bg transition-colors">
                  <td className="py-3.5 px-4 font-bold text-foreground">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-muted font-mono text-[11px]">
                    {cat.slug}
                  </td>
                  <td className="py-3.5 px-4 text-muted max-w-sm">
                    {cat.description}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full subtle-bg border border-border/40 text-foreground">
                      <BookOpen size={12} className="text-primary-light" />
                      {cat.wordCount} words
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        className="p-1.5 rounded-lg text-primary-light hover:text-primary hover-bg transition-colors"
                        title="Edit Category"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover-bg transition-colors"
                        title="Delete Category"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
