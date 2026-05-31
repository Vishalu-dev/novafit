import { memo, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useMembership } from "./membership-context";

/** Height of mobile quick-actions bar + bottom nav (approx) */
const MOBILE_CHROME_OFFSET = "calc(7.75rem + env(safe-area-inset-bottom, 0px))";

function MobileStickyCta() {
  const { openMembership } = useMembership();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 z-[34] px-4 transition-[transform,opacity] duration-300 md:hidden ${
        show ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{ bottom: MOBILE_CHROME_OFFSET }}
    >
      <button
        type="button"
        onClick={openMembership}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-[0_8px_32px_oklch(0.62_0.24_22/0.45)]"
      >
        Free Consultation <FaArrowRight className="text-sm" />
      </button>
    </div>
  );
}

export default memo(MobileStickyCta);
