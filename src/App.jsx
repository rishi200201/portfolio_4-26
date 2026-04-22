import { useEffect, useState } from "react";
import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { ResumeModal } from "./components/ResumeModal";
import { FloatingSocials } from "./components/FloatingSocials";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import "./index.css";
import { Contact } from "./components/sections/Contact";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [cursor, setCursor] = useState({ x: -1000, y: -1000 });
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("portfolio-theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[201] h-[3px] bg-[#DC2626] pointer-events-none"
        style={{ width: `${scrollProgress}%`, transition: "width 80ms linear" }}
      />

      {/* Cursor spotlight — desktop only */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] hidden md:block"
        style={{
          background: `radial-gradient(500px circle at ${cursor.x}px ${cursor.y}px, rgba(220,38,38,0.05), transparent 75%)`,
        }}
      />

      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}{" "}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } theme-shell`}
      >
        <Navbar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          onResumeOpen={() => setResumeOpen(true)}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
        <MobileMenu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          onResumeOpen={() => setResumeOpen(true)}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
        <FloatingSocials isLoaded={isLoaded} />
        <Home onResumeOpen={() => setResumeOpen(true)} />
        <About />
        <Projects />
        <Contact />
        <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

        {/* Scroll-to-top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-xl bg-[#DC2626] text-white shadow-lg shadow-[#DC2626]/30 hover:bg-[#B91C1C] active:scale-95 transition-all duration-300 ${
            showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </>
  );
}

export default App;
