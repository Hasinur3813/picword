"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "picword-saved-words";

function readSaved(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function writeSaved(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

let savedCache = new Set<string>();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return savedCache;
}

function getServerSnapshot() {
  return emptySet;
}

const emptySet = new Set<string>();

function ensureHydrated() {
  if (typeof window === "undefined") return;
  savedCache = readSaved();
}

/** Persist “learn later” bookmarks in localStorage */
export function useSavedWords() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    ensureHydrated();
    emit();
    setHydrated(true);
  }, []);

  const saved = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isSaved = useCallback(
    (id: string) => saved.has(id),
    [saved]
  );

  const toggleSave = useCallback((id: string) => {
    ensureHydrated();
    const next = new Set(readSaved());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    writeSaved(next);
    savedCache = next;
    emit();
  }, []);

  return {
    saved,
    savedCount: saved.size,
    isSaved,
    toggleSave,
    hydrated,
  };
}
