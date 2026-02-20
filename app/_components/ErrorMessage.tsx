'use client';
import React, { useEffect } from "react";
import { useError } from "./ErrorContext";

export default function ErrorMessage() {
  const { error, setError } = useError();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  if (!error) return null;

  return (
    <div className="fixed top-4 left-1/2 z-50 opacity-100 transition-opacity duration-300 -translate-x-1/2 rounded bg-red-500 px-4 py-2 text-white shadow-lg">
      {error}
      <button
        className="ml-4 text-white/80 hover:text-white font-bold hover:cursor-pointer"
        onClick={() => setError(null)}
        aria-label="Dismiss error"
      >
        ×
      </button>
    </div>
  );
}
