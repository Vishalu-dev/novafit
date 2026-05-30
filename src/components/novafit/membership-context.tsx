import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import MembershipModal from "./MembershipModal";

type Ctx = { openMembership: () => void };

const MembershipContext = createContext<Ctx | null>(null);

export function MembershipProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openMembership = useCallback(() => setOpen(true), []);

  const value = useMemo(() => ({ openMembership }), [openMembership]);

  return (
    <MembershipContext.Provider value={value}>
      {children}
      <MembershipModal open={open} onOpenChange={setOpen} />
    </MembershipContext.Provider>
  );
}

export function useMembership() {
  const ctx = useContext(MembershipContext);
  if (!ctx) throw new Error("useMembership must be used within MembershipProvider");
  return ctx;
}
