'use client';
import React, { createContext, useContext, useState, ReactNode } from "react";

type SuccessContextType = {
    success: string | null;
    setSuccess: (msg: string | null) => void;
};

const SuccessContext = createContext<SuccessContextType | undefined>(undefined);

export function useSuccess() {
    const context = useContext(SuccessContext);
    if (!context) {
        throw new Error("useSuccess must be used within a SuccessProvider");
    }
    return context;
}

export function SuccessProvider({ children }: { children: ReactNode }) {
    const [success, setSuccess] = useState<string | null>(null);
    return (
        <SuccessContext.Provider value={{ success, setSuccess }}>
            {children}
        </SuccessContext.Provider>
    );
}
