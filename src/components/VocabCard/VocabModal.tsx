"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VocabModalHeader from "./VocabModalHeader";
import VocabModalTabs from "./VocabModalTabs";
import VocabSRSAction, { type SRSRating } from "./VocabSRSAction";
import type { IVocabulary } from "@/types";

interface VocabModalProps {
  vocab: IVocabulary;
  isOpen: boolean;
  saved: boolean;
  onToggleSave: (id: string) => void;
  onClose: () => void;
  onSrsRate?: (rating: SRSRating) => void;
}

export default function VocabModal({
  vocab,
  isOpen,
  saved,
  onToggleSave,
  onClose,
  onSrsRate,
}: VocabModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap / Focus modal on open
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  // Lock background body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-auto xxl:overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label={`Details for ${vocab.word}`}
        >
          {/* Glassmorphism Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Box Container (Fully responsive height & width across all screen sizes) */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full mt-16 xxl:mt-auto max-w-2xl lg:max-w-3xl max-h-[calc(100vh-1.25rem)] sm:max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-3rem)] rounded-2xl sm:rounded-3xl glass glow-effect bg-elevated/95 border border-glass-border shadow-2xl flex flex-col overflow-hidden outline-none z-10 my-auto shrink-0"
          >
            {/* Header */}
            <VocabModalHeader
              vocab={vocab}
              saved={saved}
              onToggleSave={onToggleSave}
              onClose={onClose}
            />

            {/* Tabbed Content (Flex-1 scrollable body) */}
            <VocabModalTabs vocab={vocab} />

            {/* Sticky SRS Footer */}
            <VocabSRSAction onRate={onSrsRate} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
