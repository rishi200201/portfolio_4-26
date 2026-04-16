
export const projects = [
  // ── Live sites (custom domain) ──────────────────────────────────────
  {
    title: "FCTamilions",
    description:
      "Dynamic Tamil fan-community platform delivering sports news, match updates, and fan engagement for Tamil culture enthusiasts.",
    technologies: ["React", "TailwindCSS", "Vite"],
    gradient: "from-orange-500 to-amber-500",
    iconType: "trophy",
    url: "https://fctamilions.com/",
    badge: "Live",
  },
  {
    title: "5 Rings",
    description:
      "Multi-sport platform featuring match updates, team profiles, and scheduling — built for peak performance and user engagement.",
    technologies: ["React", "TailwindCSS", "Vite"],
    gradient: "from-yellow-400 to-orange-500",
    iconType: "activity",
    url: "https://5rings.in/",
    badge: "Live",
  },
  {
    title: "NVZ Website",
    description:
      "Responsive freelance site built with React + Vite and a hybrid Material UI + Tailwind design system. Fast, polished, and client-focused.",
    technologies: ["React", "Vite", "Material UI", "TailwindCSS"],
    gradient: "from-indigo-500 to-blue-500",
    iconType: "briefcase",
    url: "https://nivuzzdesign.github.io/NVZ/",
    badge: "Live",
  },
  {
    title: "Fine Click Photography",
    description:
      "Minimal, elegant photography showcase with performance optimisations and a distraction-free viewing experience.",
    technologies: ["React", "Vite", "Material UI", "TailwindCSS"],
    gradient: "from-pink-500 to-rose-500",
    iconType: "camera",
    url: "https://fineclickphotography.github.io/fine_click/",
    badge: "Live",
  },
  // ── Hosted (Vercel, no custom domain) ────────────────────────────────
  {
    title: "Friends Xerox Corner",
    description:
      "Digital storefront for a local xerox and printing service, making it easy for customers to explore services and get in touch instantly.",
    technologies: ["React", "TailwindCSS", "Vercel"],
    gradient: "from-sky-500 to-blue-600",
    iconType: "printer",
    url: "https://fnc-ch113.vercel.app/",
    badge: "Hosted",
  },
  {
    title: "Super Market Enquiry",
    description:
      "Customer-centric enquiry portal for Sri Saravana Store, helping shoppers check product availability and connect in seconds.",
    technologies: ["React", "TailwindCSS", "Vercel"],
    gradient: "from-green-500 to-emerald-600",
    iconType: "store",
    url: "https://sri-saravana-store-ch113.vercel.app/",
    badge: "Hosted",
  },
  {
    title: "Royal Enterprises Packaging & Storage",
    description:
      "Professional business website showcasing packaging and storage solutions, services, and contact details for Royal Enterprises.",
    technologies: ["React", "TailwindCSS", "Vercel"],
    gradient: "from-amber-500 to-yellow-600",
    iconType: "package",
    url: "http://re-ch113.vercel.app/",
    badge: "Hosted",
  },
{
  title: "Sivakami Iyarkai Suvai",
  description:
    "A clean and elegant website showcasing natural and traditional food products, highlighting offerings, brand story, and contact details.",
  technologies: ["React", "TailwindCSS", "Vercel"],
  gradient: "from-green-500 to-emerald-600",
  iconType: "leaf",
  url: "https://sivakamiiyarkaisuvai.vercel.app/",
  badge: "Hosted",
},

  // ── Personal / concept projects ──────────────────────────────────────
  {
    title: "Birthday Cards Portfolio",
    description:
      "Unique personalised digital birthday card portfolios crafted as memorable gifts — blending design, animation, and emotion.",
    technologies: ["React", "TailwindCSS", "Vite"],
    gradient: "from-rose-500 to-pink-600",
    iconType: "gift",
    badge: "Personal",
  },
  {
    title: "MSK Mart (E-Commerce)",
    description:
      "Full-stack e-commerce platform with secure payments, inventory controls, and an adaptive layout for all devices.",
    technologies: ["React", "Express.js", "MongoDB", "Stripe"],
    gradient: "from-emerald-500 to-teal-500",
    iconType: "cart",
    badge: "Personal",
  },
];

export function getProjectSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
