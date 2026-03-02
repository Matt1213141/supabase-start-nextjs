'use client';
import React, { useEffect } from "react";
import { useSuccess } from "./SuccessContext";
import { buttonStyles } from "../../_globals/ButtonStyles";

export default function SuccessMessage() {
  const { success, setSuccess } = useSuccess();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [success, setSuccess]);

  if (!success) return null;

  return (
    <div className="fixed top-4 left-1/2 z-50 opacity-100 transition-opacity duration-300 -translate-x-1/2 rounded bg-green-500 px-4 py-2 text-white shadow-lg">
      {success}
      <button
        className={buttonStyles.light + " ml-4"}
        onClick={() => setSuccess(null)}
        aria-label="Dismiss success message"
      >
        ×
      </button>
    </div>
  );
}
