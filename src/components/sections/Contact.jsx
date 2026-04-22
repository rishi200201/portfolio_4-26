import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { AvailabilityCalendar } from "../AvailabilityCalendar";

const WHATSAPP_NUMBER = "918248568354";
const EMAIL = "rishi20020107@gmail.com";
const ADDRESS = "40, Thiruveethi Amman Koil Street, Kalikundram, Tharamani, Chennai - 600113";
const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.3220497755434!2d80.23879!3d12.99240!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267e9925b8acd%3A0x1!2sThiruveethi+Amman+Koil+Street%2C+Tharamani%2C+Chennai%2C+Tamil+Nadu+600113!5e0!3m2!1sen!2sin!4v1713000000000";

const PROJECT_TYPES = ["Business Website", "Full-Stack Web App", "Admin Portal / Dashboard", "E-Commerce Store", "API / Integration", "Other"];

function buildWhatsAppMessage({ name, email, projectType, date, time, brief }) {
  return encodeURIComponent(
    `Hi Rishi! 👋\n\nI'd like to book a freelance consultation.\n\n` +
    `*Name:* ${name}\n*Email:* ${email}\n*Project Type:* ${projectType}\n` +
    `*Preferred Date:* ${date}\n*Preferred Time:* ${time}\n*Project Brief:*\n${brief}\n\nLooking forward to connecting!`
  );
}

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", projectType: "", date: "", time: "", brief: "" });
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const validate = () => {
    const e = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) e.name = "Full name is required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Valid email is required";
    if (!formData.projectType) e.projectType = "Please select a project type";
    if (!formData.brief.trim()) e.brief = "Please describe your project";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const handleCalendarSelect = (date, time) => {
    handleChange("date", date);
    if (time) handleChange("time", time);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(formData)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
    setFormData({ name: "", email: "", projectType: "", date: "", time: "", brief: "" });
  };

  const base = "w-full bg-white border rounded-xl px-4 py-3 text-gray-900 text-sm transition-all focus:outline-none focus:ring-2 placeholder-gray-400 font-medium";
  const borderNormal = "border-gray-200 focus:border-[#DC2626]/40 focus:ring-[#DC2626]/10";
  const borderError  = "border-[#DC2626]/50 focus:border-[#DC2626] focus:ring-[#DC2626]/15";

  const Err = ({ k }) => errors[k] ? (
    <p className="text-[#DC2626] text-[11px] mt-1.5 flex items-center gap-1 font-medium">
      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {errors[k]}
    </p>
  ) : null;

  const Label = ({ children }) => (
    <label className="block text-xs font-bold text-gray-500 mb-2 tracking-wide uppercase">{children}</label>
  );

  return (
    <>
      <section
        id="contact"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#DC2626] opacity-[0.025] rounded-full blur-[140px] pointer-events-none" />

        <RevealOnScroll>
          <div className="max-w-[1200px] mx-auto">

            {/* ── Section header ── */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#DC2626]" />
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#DC2626] uppercase">Book a Slot</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Book a Free <span className="text-[#DC2626]">Consultation</span>
              </h2>
              <p className="text-gray-500 mt-3 text-base max-w-xl leading-relaxed">
                Freelance slots are limited. Pick your preferred time, describe your project, and I&apos;ll confirm within 24 hours.
              </p>
            </div>

            {/* ── How it works ── */}
            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              {[
                {
                  step: "01", title: "Fill the Form",
                  desc: "Select a date, time slot, and describe your project.",
                  icon: (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  ),
                },
                {
                  step: "02", title: "WhatsApp Redirect",
                  desc: "Your details are sent instantly to my WhatsApp.",
                  icon: (
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  ),
                },
                {
                  step: "03", title: "Slot Confirmed",
                  desc: "I confirm your slot and share a brief plan.",
                  icon: (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4 p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#DC2626]/20 transition-all duration-200">
                  <div className="w-10 h-10 rounded-lg bg-[#DC2626] flex items-center justify-center flex-shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#DC2626]/50 font-mono mb-0.5">{s.step}</div>
                    <h4 className="text-gray-900 font-bold text-sm">{s.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Main layout: Form + Sidebar ── */}
            <div className="grid lg:grid-cols-[1fr_360px] gap-7 items-start">

              {/* FORM + WHAT TO EXPECT */}
              <div className="flex flex-col gap-7">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Card header */}
                <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
                  <div>
                    <h3 className="font-bold text-gray-900">Reserve Your Freelance Slot</h3>
                    <p className="text-gray-400 text-xs mt-0.5">All fields required &mdash; takes 60 seconds</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-[#DC2626]/15">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute h-full w-full rounded-full bg-[#DC2626] opacity-60" />
                      <span className="relative h-2 w-2 rounded-full bg-[#DC2626]" />
                    </span>
                    <span className="text-[#DC2626] text-[10px] font-bold tracking-wide">Slots Open</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate className="p-7 space-y-5">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <input type="text" id="name" value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Rishi Kumar"
                        className={`${base} ${errors.name ? borderError : borderNormal}`}
                        aria-invalid={!!errors.name}
                      />
                      <Err k="name" />
                    </div>
                    <div>
                      <Label>Email Address</Label>
                      <input type="email" id="email" value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="you@company.com"
                        className={`${base} ${errors.email ? borderError : borderNormal}`}
                        aria-invalid={!!errors.email}
                      />
                      <Err k="email" />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <Label>Project Type</Label>
                    <div className="relative">
                      <select id="projectType" value={formData.projectType}
                        onChange={(e) => handleChange("projectType", e.target.value)}
                        className={`${base} appearance-none pr-10 cursor-pointer ${errors.projectType ? borderError : borderNormal}`}
                        aria-invalid={!!errors.projectType}
                      >
                        <option value="" disabled>Select project type...</option>
                        {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <Err k="projectType" />
                  </div>

                  {/* Brief */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Project Brief</Label>
                      <span className="text-[10px] text-gray-400 tabular-nums">{formData.brief.length}/1000</span>
                    </div>
                    <textarea id="brief" rows={4} value={formData.brief} maxLength={1000}
                      onChange={(e) => handleChange("brief", e.target.value)}
                      placeholder="Describe your project, goals, budget range, and deadline..."
                      className={`${base} resize-none ${errors.brief ? borderError : borderNormal}`}
                      aria-invalid={!!errors.brief}
                    />
                    <Err k="brief" />
                  </div>

                  {/* Submit */}
                  <button type="submit"
                    className="group w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#DC2626] text-white text-sm font-bold hover:bg-[#B91C1C] transition-colors duration-200 shadow-[0_4px_16px_rgba(220,38,38,0.28)]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Reserve Slot via WhatsApp
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>

                  {submitted && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-[#DC2626]/20 animate-fade-in">
                      <svg className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-[#DC2626] font-bold text-sm">WhatsApp opened!</p>
                        <p className="text-[#DC2626]/70 text-xs mt-0.5">Your details are pre-filled — hit send and I&apos;ll confirm within 24 hours.</p>
                      </div>
                    </div>
                  )}

                  <p className="text-gray-400 text-[11px] flex items-center gap-1.5">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Your info is used only to respond to your enquiry. No spam, ever.
                  </p>
                </form>
              </div>{/* end form card */}

                {/* What to Expect */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm">What to Expect</h3>
                    <p className="text-gray-400 text-xs mt-0.5">My commitment to every client</p>
                  </div>
                  <div className="p-6 grid sm:grid-cols-2 gap-3">
                    {[
                      "Reply within 24 hours, guaranteed",
                      "Free project plan & time estimate",
                      "NDA available on request",
                      "Clean code — no page builders",
                      "Remote & on-site work accepted",
                      "Transparent pricing, no hidden fees",
                    ].map((label) => (
                      <div key={label} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-[#DC2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-600 text-xs leading-relaxed">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>{/* end left column wrapper */}

              {/* SIDEBAR */}
              <div className="flex flex-col gap-5 lg:sticky lg:top-24">

                {/* Direct contact */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm">Contact Directly</h3>
                    <p className="text-gray-400 text-xs mt-0.5">Skip the form &mdash; reach me instantly</p>
                  </div>
                  <div className="p-5 space-y-3">
                    {[
                      {
                        href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Rishi! I visited your portfolio and I'd like to discuss a project.")}`,
                        target: "_blank", label: "WhatsApp", sub: "+91 8248568354",
                        icon: <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>,
                      },
                      {
                        href: `mailto:${EMAIL}?subject=Freelance%20Project%20Enquiry`,
                        label: "Email", sub: EMAIL,
                        icon: <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                      },
                    ].map(({ href, target, label, sub, icon }) => (
                      <a key={label} href={href} target={target} rel={target ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-[#DC2626]/25 hover:bg-red-50 transition-all duration-200"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#DC2626] flex items-center justify-center flex-shrink-0">{icon}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 text-xs font-bold">{label}</p>
                          <p className="text-gray-400 text-[10px] truncate">{sub}</p>
                        </div>
                        <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#DC2626] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(EMAIL).catch(() => {});
                        setEmailCopied(true);
                        setTimeout(() => setEmailCopied(false), 2500);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-gray-200 text-gray-400 text-xs font-semibold hover:border-[#DC2626]/40 hover:text-[#DC2626] transition-all duration-200"
                      aria-label="Copy email address"
                    >
                      {emailCopied ? (
                        <>
                          <svg className="w-3.5 h-3.5 text-[#DC2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-[#DC2626]">Email copied!</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy email address
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Interactive Availability Calendar */}
                <AvailabilityCalendar onSelect={handleCalendarSelect} />

              </div>
            </div>

            {/* ── Full-width map ── */}
            <div className="mt-7 rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
              <div className="lg:grid lg:grid-cols-[1fr_280px] items-stretch">
                <div className="relative min-h-[200px] lg:min-h-[240px]">
                  <iframe
                    title="Office Location"
                    src={MAPS_EMBED}
                    className="absolute inset-0 w-full h-full border-0"
                    style={{ filter: "grayscale(0.15) contrast(1.05)" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-6 border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col justify-center gap-5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#DC2626] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-1">Based in Chennai, India</h4>
                      <p className="text-gray-400 text-[11px] leading-relaxed">{ADDRESS}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href="https://maps.google.com/?q=Thiruveethi+Amman+Koil+Street,+Tharamani,+Chennai+600113"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-600 hover:border-[#DC2626]/30 hover:text-[#DC2626] transition-all duration-200"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open in Google Maps
                    </a>
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                      <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Available for remote &amp; on-site work
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </RevealOnScroll>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111111] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
          {/* Top: branding + links + social */}
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#DC2626] flex items-center justify-center flex-shrink-0">
                  <span className="font-black text-white text-sm font-mono">rk</span>
                </div>
                <span className="font-black text-white text-base">Rishi <span className="text-[#DC2626]">Kumar</span></span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">MERN Stack Developer building fast, scalable web applications for clients worldwide.</p>
            </div>
            {/* Quick links */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-gray-600 uppercase mb-3">Quick Links</p>
              <div className="flex flex-col gap-2">
                {["Home", "About", "Projects", "Contact"].map((l) => (
                  <a key={l} href={`#${l.toLowerCase()}`}
                    className="text-gray-500 text-xs hover:text-white transition-colors duration-200 font-medium w-fit">
                    {l}
                  </a>
                ))}
              </div>
            </div>
            {/* Get in touch */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-gray-600 uppercase mb-3">Get in Touch</p>
              <div className="flex flex-col gap-2">
                <a href={`mailto:${EMAIL}`} className="text-gray-500 text-xs hover:text-white transition-colors duration-200 font-medium">{EMAIL}</a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 text-xs hover:text-white transition-colors duration-200 font-medium">+91 8248568354</a>
                <p className="text-gray-600 text-xs">Chennai, India</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/[0.06] pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-xs">
                &copy; {new Date().getFullYear()} <span className="text-[#DC2626] font-semibold">Rishi Kumar</span> &mdash; All rights reserved
              </p>
              <div className="flex items-center gap-2">
                {[
                  {
                    href: "https://github.com/rishi200201", label: "GitHub", target: "_blank",
                    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>,
                  },
                  {
                    href: `https://wa.me/${WHATSAPP_NUMBER}`, label: "WhatsApp", target: "_blank",
                    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>,
                  },
                  {
                    href: `mailto:${EMAIL}`, label: "Email",
                    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                  },
                ].map(({ href, label, target, icon }) => (
                  <a key={label} href={href} target={target} rel={target ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-500 hover:text-[#DC2626] hover:border-[#DC2626]/30 transition-all duration-200"
                  >
                    {icon}
                  </a>
                ))}
                <a href="#home" aria-label="Back to top"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-[#DC2626]/30 hover:text-[#DC2626] transition-all duration-200 text-xs text-gray-500 ml-2"
                >
                  <span className="hidden sm:inline">Back to top</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
