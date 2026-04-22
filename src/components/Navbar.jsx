import { useEffect, useState } from "react";

const NAV_LINKS = [
  { name: "Home",     href: "#home" },
  { name: "About",    href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact",  href: "#contact" },
];

export const Navbar = ({ menuOpen, setMenuOpen, onResumeOpen, theme, onThemeToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("home");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["home", "about", "projects", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-[0_1px_24px_rgba(0,0,0,0.08)] border-b border-gray-100"
          : "bg-white/95 backdrop-blur-xl border-b border-gray-100/60"
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[60px] sm:h-[70px]">

          {/* ── Logo ── */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#DC2626] flex items-center justify-center flex-shrink-0 group-hover:bg-[#B91C1C] transition-colors duration-300">
              <span className="font-black text-white text-sm font-mono leading-none">rk</span>
            </div>
            <div>
              <span className="font-black text-gray-900 text-lg tracking-tight leading-none">Rishi</span>
              <span className="font-black text-[#DC2626] text-lg tracking-tight leading-none"> Kumar</span>
            </div>
          </a>

          {/* ── Hamburger — Mobile ── */}
          <div className="md:hidden flex items-center gap-1.5">
            <button
              className="w-11 h-11 flex items-center justify-center rounded-xl text-gray-600 hover:text-[#DC2626] hover:bg-red-50 active:scale-95 transition-all duration-300 touch-manipulation"
              onClick={onThemeToggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v2.2m0 13.6V21m9-9h-2.2M5.2 12H3m15.164 6.364l-1.556-1.556M7.392 7.392L5.836 5.836m12.328 0l-1.556 1.556M7.392 16.608l-1.556 1.556M12 16a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20.354 15.354A9 9 0 018.646 3.646a9.002 9.002 0 1011.708 11.708z" />
                </svg>
              )}
            </button>
            <button
              className="w-11 h-11 flex items-center justify-center text-gray-600 hover:text-[#DC2626] active:scale-95 transition-all duration-300 relative z-50 touch-manipulation"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>

          {/* ── Desktop Navigation ── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                  active === item.href.slice(1)
                    ? "text-[#DC2626]"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.name}
                {active === item.href.slice(1) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-5 bg-[#DC2626] rounded-full" />
                )}
              </a>
            ))}
            <button
              onClick={onThemeToggle}
              className="ml-2 inline-flex items-center justify-center w-10 h-10 text-gray-600 border border-gray-200 rounded-lg hover:border-[#DC2626] hover:text-[#DC2626] transition-all duration-200"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v2.2m0 13.6V21m9-9h-2.2M5.2 12H3m15.164 6.364l-1.556-1.556M7.392 7.392L5.836 5.836m12.328 0l-1.556 1.556M7.392 16.608l-1.556 1.556M12 16a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20.354 15.354A9 9 0 018.646 3.646a9.002 9.002 0 1011.708 11.708z" />
                </svg>
              )}
            </button>
            <button
              onClick={onResumeOpen}
              className="ml-3 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:border-[#DC2626] hover:text-[#DC2626] transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              Resume
            </button>
            <a
              href="#contact"
              className="ml-2 px-5 py-2.5 bg-[#DC2626] text-white text-sm font-bold rounded-lg hover:bg-[#B91C1C] transition-colors duration-300 shadow-[0_2px_8px_rgba(220,38,38,0.35)]"
            >
              Hire Me
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
};
