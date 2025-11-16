"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"

interface CommandPaletteContextValue {
  open: boolean
  setOpen: (value: boolean) => void
  openPalette: (query?: string) => void
  pendingQuery: string | null
  clearPendingQuery: () => void
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null)

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [pendingQuery, setPendingQuery] = useState<string | null>(null)

  const openPalette = useCallback((query?: string) => {
    if (typeof query !== "undefined") {
      setPendingQuery(query)
    }
    setOpen(true)
  }, [])

  const clearPendingQuery = useCallback(() => {
    setPendingQuery(null)
  }, [])

  const value = useMemo(() => ({
    open,
    setOpen,
    openPalette,
    pendingQuery,
    clearPendingQuery,
  }), [open, pendingQuery, openPalette, clearPendingQuery])

  return <CommandPaletteContext.Provider value={value}>{children}</CommandPaletteContext.Provider>
}

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext)
  if (!ctx) {
    throw new Error("useCommandPalette must be used within a CommandPaletteProvider")
  }
  return ctx
}
