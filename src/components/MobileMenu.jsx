export const MobileMenu = ({ menuOpen, setMenuOpen, onResumeOpen, theme, onThemeToggle }) => {
  return (
    <div
      className={`fixed inset-0 z-[45] flex flex-col items-center justify-center transition-all duration-300 bg-white md:hidden ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Red top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#DC2626]" />

      {/* Close button */}
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-5 right-4 sm:right-6 w-11 h-11 flex items-center justify-center text-gray-400 hover:text-[#DC2626] active:scale-95 transition-all duration-300 touch-manipulation"
        aria-label="Close Menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Logo inside menu */}
      <div className="absolute top-4 left-4 sm:left-6 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#DC2626] flex items-center justify-center">
          <span className="font-black text-white text-sm font-mono">rk</span>
        </div>
        <span className="font-black text-gray-900 text-base sm:text-lg">Rishi<span className="text-[#DC2626]"> Kumar</span></span>
      </div>

      <button
        onClick={onThemeToggle}
        className="absolute top-5 left-4 sm:left-6 w-11 h-11 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-[#DC2626] hover:border-[#DC2626]/30 transition-all duration-300"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
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

      <nav className="flex flex-col items-center gap-1 w-full px-4">
        {[
          { name: "Home",     delay: "60ms" },
          { name: "About",    delay: "100ms" },
          { name: "Projects", delay: "140ms" },
          { name: "Contact",  delay: "180ms" },
        ].map(({ name, delay }) => (
          <a
            key={name}
            href={`#${name.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            className={`relative text-3xl sm:text-4xl font-black text-gray-800 hover:text-[#DC2626] active:scale-95 transition-all duration-300 px-6 sm:px-8 py-2 group touch-manipulation ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: menuOpen ? delay : "0ms" }}
          >
            {name}
            <span className="absolute bottom-1 left-6 sm:left-8 h-0.5 w-0 bg-[#DC2626] group-hover:w-12 transition-all duration-300 rounded-full" />
          </a>
        ))}
        <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3 w-full px-4">
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className={`w-full max-w-[280px] text-center px-10 py-3.5 sm:py-4 bg-[#DC2626] text-white text-base sm:text-lg font-black rounded-xl hover:bg-[#B91C1C] active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(220,38,38,0.35)] touch-manipulation ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: menuOpen ? "220ms" : "0ms" }}
          >
            Hire Me
          </a>
          <button
            onClick={() => { setMenuOpen(false); onResumeOpen(); }}
            className={`w-full max-w-[280px] inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-gray-200 text-gray-600 text-sm sm:text-base font-bold rounded-xl hover:border-[#DC2626] hover:text-[#DC2626] active:scale-95 transition-all duration-300 touch-manipulation ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: menuOpen ? "260ms" : "0ms" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            View Resume
          </button>
        </div>
      </nav>

      {/* Bottom decoration */}
      <div className="absolute bottom-6 sm:bottom-8 flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-gray-400 px-4">
        <a href="https://github.com/rishi200201" target="_blank" rel="noopener noreferrer" className="hover:text-[#DC2626] active:text-[#DC2626] transition-colors duration-300 touch-manipulation">GitHub</a>
        <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
        <a href="mailto:rishi20020107@gmail.com" className="hover:text-[#DC2626] active:text-[#DC2626] transition-colors duration-300 touch-manipulation break-all">rishi20020107@gmail.com</a>
      </div>
    </div>
  );
};
