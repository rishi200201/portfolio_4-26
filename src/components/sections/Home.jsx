import { useState, useEffect } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { AnimatedCounter } from "../AnimatedCounter";

const ROLES = ["MERN Stack Developer", "React Specialist", "Node.js Engineer", "Freelance Developer"];

export const Home = ({ onResumeOpen }) => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleFade, setRoleFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleFade(false);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setRoleFade(true);
      }, 300);
    }, 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-white relative overflow-hidden pt-20 pb-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Ambient glow */}
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-[#DC2626] opacity-[0.04] rounded-full blur-[140px] pointer-events-none" />

      <RevealOnScroll>
        <div className="max-w-[1160px] mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 xl:gap-20 items-center">

            {/* ── LEFT ── */}
            <div className="flex flex-col gap-7">

              {/* Availability badge */}
              <div className="inline-flex self-start items-center gap-2.5 px-4 py-2 rounded-full bg-red-50 border border-[#DC2626]/20">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DC2626]" />
                </span>
                <span className="text-[#DC2626] text-xs font-semibold tracking-wide">Available for Freelance</span>
              </div>

              {/* Name block */}
              <div>
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.25em] uppercase mb-3">Hi, I&apos;m</p>
                <h1
                  className="font-black leading-[0.95] tracking-tight text-gray-900"
                  style={{ fontSize: "clamp(3.2rem, 8vw, 5.5rem)" }}
                >
                  Rishi<br />
                  <span className="text-[#DC2626]">Kumar</span>
                </h1>
                <div className="flex items-center gap-2 mt-4">
                  <div className="h-[3px] w-12 bg-[#DC2626] rounded-full" />
                  <div className="h-[3px] w-4 bg-[#DC2626]/25 rounded-full" />
                </div>
              </div>

              {/* Role + stack */}
              <div>
                <h2
                  className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight leading-snug transition-opacity duration-300"
                  style={{ opacity: roleFade ? 1 : 0 }}
                >
                  {ROLES[roleIdx]}
                </h2>
                <p className="text-gray-400 text-sm mt-1 font-medium">
                  React · Node.js · MongoDB · Express
                </p>
              </div>

              {/* Bio */}
              <p className="text-gray-500 text-base leading-relaxed max-w-[420px]">
                I build web products clients love — fast, scalable MERN stack applications delivered on time, every time.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#DC2626] text-white text-sm font-bold hover:bg-[#B91C1C] transition-colors duration-200 shadow-[0_4px_18px_rgba(220,38,38,0.28)]"
                >
                  View Projects
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#DC2626] text-[#DC2626] text-sm font-bold hover:bg-[#DC2626] hover:text-white transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Hire Me
                </a>
                <button
                  onClick={onResumeOpen}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:border-[#DC2626] hover:text-[#DC2626] transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  View Resume
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 pt-5 border-t border-gray-100">
                {[
                  { target: 2,   suffix: "+",  label: "Years Exp." },
                  { target: 50,  suffix: "+",  label: "Projects" },
                  { target: 100, suffix: "K+", label: "Users Served" },
                ].map(({ target, suffix, label }) => (
                  <div key={label}>
                    <div className="text-[1.6rem] font-black text-gray-900 leading-none">
                      <AnimatedCounter target={target} suffix={suffix} />
                    </div>
                    <div className="text-xs text-gray-400 mt-1 font-medium">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Code card ── */}
            <div className="relative lg:justify-self-end w-full max-w-[520px] mx-auto lg:mx-0">
              <div className="relative overflow-visible">
                {/* Hiring badge — outside card, above-right corner */}
                <div className="absolute -top-3.5 -right-3.5 z-20 px-3 py-1.5 bg-[#DC2626] text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg rotate-2 select-none">
                  Hiring Open
                </div>

                <div className="overflow-hidden rounded-2xl bg-gray-950 border border-gray-800 shadow-[0_24px_64px_rgba(0,0,0,0.22)]">
                  {/* Titlebar */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border-b border-white/[0.06]">
                    <div className="flex gap-1.5 flex-shrink-0">
                      <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                      <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                      <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                    </div>
                    <div className="flex-1 mx-3 bg-white/[0.06] rounded px-3 py-0.5 text-[11px] text-gray-400 font-mono text-center truncate">
                      developer.js
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute h-full w-full rounded-full bg-[#DC2626] opacity-60" />
                        <span className="relative h-1.5 w-1.5 rounded-full bg-[#DC2626]" />
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">live</span>
                    </div>
                  </div>

                  {/* Code */}
                  <div className="p-6 font-mono text-[12.5px] leading-[1.85] select-none overflow-x-auto" style={{ fontFamily: "'Fira Code', 'JetBrains Mono', monospace" }}>
                    <div>
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-300">developer</span>{" "}
                      <span className="text-gray-200">= {"{"}</span>
                    </div>
                    <div className="pl-5">
                      <span className="text-[#f87171]">name</span>
                      <span className="text-gray-300">: </span>
                      <span className="text-amber-300">&quot;Rishi Kumar&quot;</span>
                      <span className="text-gray-500">,</span>
                    </div>
                    <div className="pl-5">
                      <span className="text-[#f87171]">role</span>
                      <span className="text-gray-300">: </span>
                      <span className="text-amber-300">&quot;MERN Stack Developer&quot;</span>
                      <span className="text-gray-500">,</span>
                    </div>
                    <div className="pl-5">
                      <span className="text-[#f87171]">stack</span>
                      <span className="text-gray-300">: [</span>
                      <span className="text-amber-300">&quot;React&quot;</span>
                      <span className="text-gray-500">, </span>
                      <span className="text-amber-300">&quot;Node.js&quot;</span>
                      <span className="text-gray-500">,</span>
                    </div>
                    <div className="pl-12">
                      <span className="text-amber-300">&quot;MongoDB&quot;</span>
                      <span className="text-gray-500">, </span>
                      <span className="text-amber-300">&quot;Express&quot;</span>
                      <span className="text-gray-500">],</span>
                    </div>
                    <div className="pl-5">
                      <span className="text-[#f87171]">experience</span>
                      <span className="text-gray-300">: </span>
                      <span className="text-green-400">&quot;2+ years&quot;</span>
                      <span className="text-gray-500">,</span>
                    </div>
                    <div className="pl-5">
                      <span className="text-[#f87171]">available</span>
                      <span className="text-gray-300">: </span>
                      <span className="text-[#f87171] font-semibold">true</span>
                      <span className="text-gray-500">,</span>
                    </div>
                    <div className="pl-5 truncate">
                      <span className="text-[#f87171]">email</span>
                      <span className="text-gray-300">: </span>
                      <span className="text-amber-300 text-[11px]">&quot;rishi20020107@gmail.com&quot;</span>
                    </div>
                    <div className="text-gray-200">{"}"}</div>
                    <div className="mt-2.5 text-gray-600 text-[11px]">&#47;&#47; Let&apos;s build something great together</div>
                    <div className="mt-1">
                      <span className="inline-block w-[7px] h-[17px] bg-[#DC2626] animate-blink rounded-[1px]" />
                    </div>
                  </div>

                  {/* Tech badges */}
                  <div className="flex items-center gap-2 px-6 py-3 border-t border-white/[0.06] bg-black/20 flex-wrap">
                    {["React", "Node.js", "MongoDB", "Express", "Tailwind"].map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-white/[0.07] text-gray-400 text-[10px] font-mono border border-white/[0.04]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
