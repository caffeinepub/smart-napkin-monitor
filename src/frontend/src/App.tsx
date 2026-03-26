import {
  Activity,
  AlertCircle,
  Bell,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  Droplets,
  Eye,
  Heart,
  Layers,
  Mail,
  MapPin,
  Menu,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Scroll animation hook ───────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function AnimSection({
  children,
  className = "",
  delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Nav links ───────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Problem", href: "#problem" },
  { label: "SDG Goals", href: "#sdg" },
  { label: "Cost", href: "#cost" },
  { label: "Contact", href: "#contact" },
];

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ─── Sticky Nav ──────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-purple-950/95 shadow-lg shadow-purple-900/30"
          : "bg-purple-950/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-2 font-poppins font-bold text-lg">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center glow-pulse">
              <Droplets size={16} className="text-white" />
            </div>
            <span className="text-purple-200 hidden sm:block">
              Smart Napkin Monitor
            </span>
            <span className="text-purple-200 sm:hidden">SNM</span>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <button
                type="button"
                key={l.href}
                data-ocid={`nav.${l.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}.link`}
                onClick={() => scrollTo(l.href)}
                className="px-3 py-1.5 text-sm font-medium text-purple-200 hover:text-white rounded-lg hover:bg-purple-700/50 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-ocid="nav.dashboard.button"
              onClick={() => scrollTo("#dashboard")}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-md hover:shadow-purple-500/40"
            >
              <Activity size={14} />
              Dashboard
            </button>
            <button
              type="button"
              className="lg:hidden text-purple-200 hover:text-white p-1.5"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-purple-950/95 border-t border-purple-800/50 px-4 pb-4 space-y-1">
          {NAV_LINKS.map((l) => (
            <button
              type="button"
              key={l.href}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-purple-200 hover:text-white hover:bg-purple-800/50 rounded-lg transition-colors"
              onClick={() => {
                scrollTo(l.href);
                setOpen(false);
              }}
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              scrollTo("#dashboard");
              setOpen(false);
            }}
            className="w-full mt-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-full transition-colors"
          >
            Launch Dashboard
          </button>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      className="relative pt-16 min-h-screen flex items-center overflow-hidden particles-bg"
      style={{
        background:
          "linear-gradient(135deg, #1a0f35 0%, #2d1b69 50%, #0f0a1e 100%)",
      }}
    >
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "rgba(124, 58, 237, 0.25)",
            animation: "float 7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-10 -left-20 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: "rgba(109, 40, 217, 0.2)",
            animation: "float 9s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: "rgba(167, 139, 250, 0.12)",
            animation: "float 11s ease-in-out infinite 2s",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full blur-3xl"
          style={{
            background: "rgba(196, 181, 253, 0.1)",
            animation: "float 8s ease-in-out infinite 1s alternate",
          }}
        />
        {/* Ring decorations */}
        <svg
          role="img"
          aria-label="Decorative background circles"
          className="absolute top-1/4 right-1/3 opacity-15"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          style={{ animation: "spin-slow 20s linear infinite" }}
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="#a78bfa"
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r="50"
            stroke="#7c3aed"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <AnimSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-900/60 border border-purple-500/40 rounded-full text-purple-300 text-sm font-semibold mb-6 backdrop-blur-sm">
              <Sparkles size={14} />
              Engineering Innovation Project
            </div>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-5xl xl:text-6xl leading-tight text-white mb-4">
              Smart Sanitary{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #a78bfa, #7c3aed, #c4b5fd)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Napkin
              </span>{" "}
              Monitoring System
            </h1>
            <p className="text-xl font-semibold text-purple-300 mb-4">
              Ready to Protect Women
            </p>
            <p className="text-purple-200/80 text-base leading-relaxed mb-8 max-w-lg">
              A revolutionary wearable health-monitoring device that uses
              conductive thread, NFC technology, and ESP32 to detect moisture
              levels in real-time — keeping women safe, healthy, and informed.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                data-ocid="hero.learn_more.button"
                onClick={() => scrollTo("#about")}
                className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-purple-500/40"
              >
                Learn More <ChevronRight size={18} />
              </button>
              <button
                type="button"
                data-ocid="hero.dashboard.button"
                onClick={() => scrollTo("#dashboard")}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-purple-200 font-semibold rounded-full border border-purple-400/30 transition-all duration-200 backdrop-blur-sm"
              >
                View Dashboard
              </button>
            </div>
          </AnimSection>

          {/* Right illustration */}
          <AnimSection delay={200}>
            <div className="flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                {/* Phone mockup */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-48 h-80 rounded-3xl shadow-2xl border flex flex-col overflow-hidden glow-pulse"
                    style={{
                      background: "linear-gradient(180deg, #2d1b69, #1a0f35)",
                      borderColor: "rgba(167,139,250,0.3)",
                    }}
                  >
                    <div className="bg-purple-700 px-4 py-3">
                      <div className="w-12 h-1 bg-white/30 rounded mx-auto mb-2" />
                      <p className="text-white text-xs font-semibold text-center">
                        Napkin Monitor
                      </p>
                    </div>
                    <div className="flex-1 p-3 space-y-2">
                      <div
                        className="flex items-center gap-2 p-2 rounded-lg"
                        style={{ background: "rgba(34,197,94,0.15)" }}
                      >
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                        <span className="text-xs text-green-300 font-medium">
                          Dry — Safe
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-2 p-2 rounded-lg"
                        style={{ background: "rgba(234,179,8,0.15)" }}
                      >
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <span className="text-xs text-yellow-300 font-medium">
                          Moderate
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-2 p-2 rounded-lg"
                        style={{ background: "rgba(239,68,68,0.15)" }}
                      >
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <span className="text-xs text-red-300 font-medium">
                          Wet — Alert!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating badges */}
                <div
                  className="absolute -top-4 -right-4 rounded-2xl shadow-lg p-3 border"
                  style={{
                    background: "rgba(45,27,105,0.9)",
                    borderColor: "rgba(124,58,237,0.4)",
                    animation: "float 5s ease-in-out infinite",
                  }}
                >
                  <Zap size={20} className="text-purple-400" />
                </div>
                <div
                  className="absolute -bottom-2 -left-4 rounded-2xl shadow-lg p-3 border"
                  style={{
                    background: "rgba(45,27,105,0.9)",
                    borderColor: "rgba(167,139,250,0.4)",
                    animation: "float 7s ease-in-out infinite 1s",
                  }}
                >
                  <ShieldCheck size={20} className="text-purple-300" />
                </div>
                <div
                  className="absolute top-1/2 -right-8 bg-purple-600 rounded-2xl shadow-lg p-2.5"
                  style={{ animation: "float 6s ease-in-out infinite 0.5s" }}
                >
                  <Bell size={16} className="text-white" />
                </div>
              </div>
            </div>
          </AnimSection>
        </div>
      </div>
    </section>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <section
      id="dashboard"
      className="py-20"
      style={{
        background: "linear-gradient(180deg, #130d2b 0%, #1a0f35 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection>
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-3">
              Live Status Dashboard
            </h2>
            <p className="text-purple-300 text-base">
              Real-time moisture level monitoring for device SN-001
            </p>
          </div>
        </AnimSection>

        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
          data-ocid="dashboard.status.panel"
        >
          {[
            {
              label: "Dry",
              badge: "Safe",
              icon: <CheckCircle2 size={32} className="text-green-400" />,
              time: "Updated 1 min ago",
              bg: "rgba(34,197,94,0.08)",
              border: "rgba(34,197,94,0.2)",
              badgeBg: "bg-green-900/50 text-green-300",
              ocid: "dashboard.dry.card",
            },
            {
              label: "Moderate",
              badge: "Caution",
              icon: <AlertCircle size={32} className="text-yellow-400" />,
              time: "Updated 2 min ago",
              bg: "rgba(234,179,8,0.08)",
              border: "rgba(234,179,8,0.2)",
              badgeBg: "bg-yellow-900/50 text-yellow-300",
              ocid: "dashboard.moderate.card",
            },
            {
              label: "Wet",
              badge: "Alert!",
              icon: <Droplets size={32} className="text-red-400" />,
              time: "Updated 30 sec ago",
              bg: "rgba(239,68,68,0.08)",
              border: "rgba(239,68,68,0.2)",
              badgeBg: "bg-red-900/50 text-red-300",
              ocid: "dashboard.wet.card",
            },
          ].map((s, i) => (
            <AnimSection key={s.label} delay={i * 120}>
              <div
                data-ocid={s.ocid}
                className="rounded-2xl border-2 p-6 text-center backdrop-blur-sm"
                style={{ background: s.bg, borderColor: s.border }}
              >
                <div className="flex justify-center mb-3">{s.icon}</div>
                <p className="font-poppins font-bold text-white text-lg mb-2">
                  {s.label}
                </p>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${s.badgeBg}`}
                >
                  {s.badge}
                </span>
                <p className="text-purple-400 text-xs mt-3">{s.time}</p>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-20" style={{ background: "#0f0a1e" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection>
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-3">
              About the Project
            </h2>
            <div className="w-16 h-1 bg-purple-400 rounded mx-auto" />
          </div>
        </AnimSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <AnimSection>
            <div
              className="rounded-2xl p-8 border backdrop-blur-sm"
              style={{
                background: "rgba(124,58,237,0.08)",
                borderColor: "rgba(124,58,237,0.2)",
              }}
            >
              <h3 className="font-poppins font-bold text-xl text-white mb-4">
                Our Mission
              </h3>
              <p className="text-purple-200/80 leading-relaxed mb-4">
                The Smart Sanitary Napkin Monitoring System is an engineering
                innovation designed to address the critical health challenge of
                menstrual hygiene management in developing countries.
              </p>
              <p className="text-purple-200/80 leading-relaxed">
                By integrating conductive threads, NFC technology, and the ESP32
                microcontroller, we've created an affordable, smart system that
                monitors moisture levels in real-time and sends instant alerts —
                all for under ₹250.
              </p>
            </div>
          </AnimSection>
          <AnimSection delay={150}>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <Heart size={24} className="text-purple-400" />,
                  label: "Women's Health",
                  sub: "Primary focus",
                },
                {
                  icon: <Zap size={24} className="text-purple-400" />,
                  label: "Real-Time",
                  sub: "Instant alerts",
                },
                {
                  icon: <Shield size={24} className="text-purple-400" />,
                  label: "Affordable",
                  sub: "Under ₹250",
                },
                {
                  icon: <Smartphone size={24} className="text-purple-400" />,
                  label: "Mobile-First",
                  sub: "Smart alerts",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-4 text-center border"
                  style={{
                    background: "rgba(124,58,237,0.1)",
                    borderColor: "rgba(167,139,250,0.2)",
                  }}
                >
                  <div className="flex justify-center mb-2">{item.icon}</div>
                  <p className="font-poppins font-semibold text-white text-sm">
                    {item.label}
                  </p>
                  <p className="text-purple-400 text-xs">{item.sub}</p>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </div>
    </section>
  );
}

// ─── Feasibility ──────────────────────────────────────────────────────────────
function Feasibility() {
  return (
    <section
      id="feasibility"
      className="py-20"
      style={{ background: "#130d2b" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection>
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-3">
              Feasibility
            </h2>
            <div className="w-16 h-1 bg-purple-400 rounded mx-auto" />
          </div>
        </AnimSection>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: <Zap size={28} className="text-purple-400" />,
              title: "Ease of Use",
              desc: "No technical expertise required. Standard smartphone with Bluetooth/NFC reader is all that's needed.",
            },
            {
              icon: <DollarSign size={28} className="text-purple-400" />,
              title: "Cost-Effective",
              desc: "Total system cost under ₹250, making it accessible for women across all economic backgrounds.",
            },
            {
              icon: <Shield size={28} className="text-purple-400" />,
              title: "Reliable & Safe",
              desc: "Tested for accuracy and durability with biocompatible materials safe for body contact.",
            },
          ].map((card, i) => (
            <AnimSection key={card.title} delay={i * 120}>
              <div
                className="rounded-2xl p-6 text-center border hover:border-purple-400/40 transition-colors"
                style={{
                  background: "rgba(124,58,237,0.08)",
                  borderColor: "rgba(124,58,237,0.2)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(124,58,237,0.2)" }}
                >
                  {card.icon}
                </div>
                <h3 className="font-poppins font-semibold text-white text-base mb-2">
                  {card.title}
                </h3>
                <p className="text-purple-200/70 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    icon: <Layers size={28} className="text-white" />,
    title: "Conductive Thread",
    desc: "Specially designed thread embedded in the napkin detects moisture changes through electrical conductivity.",
    image: "/assets/generated/conductive-thread.dim_600x400.jpg",
  },
  {
    num: "02",
    icon: <Zap size={28} className="text-white" />,
    title: "NFC Tag",
    desc: "Near-field communication transfers moisture data wirelessly to the ESP32 microcontroller module.",
    image: "/assets/generated/nfc-tag.dim_600x400.jpg",
  },
  {
    num: "03",
    icon: <Activity size={28} className="text-white" />,
    title: "ESP32 Module",
    desc: "The ESP32 processes sensor data and determines the saturation level — Dry, Moderate, or Wet.",
    image: "/assets/generated/esp32-module.dim_600x400.jpg",
  },
  {
    num: "04",
    icon: <Smartphone size={28} className="text-white" />,
    title: "Mobile Alert",
    desc: "Instant push notifications are sent to the user's smartphone, prompting a timely napkin change.",
    image: "/assets/generated/mobile-app-ui.dim_600x400.jpg",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20"
      style={{ background: "#0f0a1e" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection>
          <div className="text-center mb-14">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-3">
              How It Works
            </h2>
            <p className="text-purple-300">
              A seamless 4-step process from detection to alert
            </p>
            <div className="w-16 h-1 bg-purple-400 rounded mx-auto mt-3" />
          </div>
        </AnimSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <AnimSection key={step.num} delay={i * 120}>
              <div
                className="relative rounded-2xl p-6 border text-center h-full hover:border-purple-400/40 transition-all duration-200 hover:-translate-y-1 backdrop-blur-sm"
                style={{
                  background: "rgba(124,58,237,0.08)",
                  borderColor: "rgba(124,58,237,0.2)",
                }}
              >
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-8 h-8 rounded-full"
                    style={{ background: "rgba(124,58,237,0.3)" }}
                  >
                    <ChevronRight size={16} className="text-purple-300" />
                  </div>
                )}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {step.icon}
                </div>
                <div className="text-purple-400 font-poppins font-bold text-2xl mb-1">
                  {step.num}
                </div>
                <h3 className="font-poppins font-semibold text-white text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-purple-200/70 text-sm leading-relaxed">
                  {step.desc}
                </p>
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-28 object-cover rounded-xl mt-3 mb-2 opacity-80"
                />
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <Activity size={26} className="text-white" />,
    title: "Real-time Monitoring",
    desc: "Continuous 24/7 moisture level tracking with instant data transmission to your mobile device.",
    bg: "from-purple-500 to-purple-700",
  },
  {
    icon: <Bell size={26} className="text-white" />,
    title: "Smart Alerts",
    desc: "Intelligent push notifications alert users precisely when it's time to change, reducing health risks.",
    bg: "from-violet-500 to-purple-600",
  },
  {
    icon: <DollarSign size={26} className="text-white" />,
    title: "Low-Cost Design",
    desc: "Engineered for affordability — the complete system costs under ₹250, making it accessible to all.",
    bg: "from-purple-400 to-violet-600",
  },
  {
    icon: <Shield size={26} className="text-white" />,
    title: "Hygiene Safety",
    desc: "Promotes healthy hygiene habits and significantly reduces the risk of bacterial infections.",
    bg: "from-violet-600 to-purple-700",
  },
];

function Features() {
  return (
    <section id="features" className="py-20" style={{ background: "#130d2b" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection>
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-3">
              Key Features
            </h2>
            <p className="text-purple-300">
              Everything you need for proactive health management
            </p>
            <div className="w-16 h-1 bg-purple-400 rounded mx-auto mt-3" />
          </div>
        </AnimSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FEATURES.map((f, i) => (
            <AnimSection key={f.title} delay={i * 100}>
              <div
                className="rounded-2xl border p-6 hover:border-purple-400/40 transition-all duration-200 hover:-translate-y-1 flex gap-5 backdrop-blur-sm"
                style={{
                  background: "rgba(124,58,237,0.08)",
                  borderColor: "rgba(124,58,237,0.2)",
                }}
              >
                <div
                  className={`w-12 h-12 min-w-[3rem] rounded-xl bg-gradient-to-br ${f.bg} flex items-center justify-center shadow-md`}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-white text-base mb-1">
                    {f.title}
                  </h3>
                  <p className="text-purple-200/70 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Problem & Solution ───────────────────────────────────────────────────────
function ProblemSolution() {
  return (
    <section id="problem" className="py-20" style={{ background: "#0f0a1e" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection>
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-3">
              Problem &amp; Solution
            </h2>
            <div className="w-16 h-1 bg-purple-400 rounded mx-auto" />
          </div>
        </AnimSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimSection>
            <div
              className="rounded-2xl p-8 border-l-4 h-full"
              style={{
                background: "rgba(239,68,68,0.07)",
                borderLeftColor: "#ef4444",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(239,68,68,0.15)" }}
                >
                  <AlertCircle size={22} className="text-red-400" />
                </div>
                <h3 className="font-poppins font-bold text-xl text-white">
                  The Problem
                </h3>
              </div>
              <ul className="space-y-3 text-purple-200/80">
                {[
                  "Women often forget or delay changing sanitary napkins due to busy schedules.",
                  "Prolonged use of saturated napkins creates a breeding ground for harmful bacteria.",
                  "This leads to urinary tract infections, fungal diseases, and cervical cancer risks.",
                  "In developing nations, 64% of women lack access to proper menstrual hygiene.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimSection>
          <AnimSection delay={150}>
            <div
              className="rounded-2xl p-8 border-l-4 h-full"
              style={{
                background: "rgba(124,58,237,0.1)",
                borderLeftColor: "#7c3aed",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(124,58,237,0.2)" }}
                >
                  <CheckCircle2 size={22} className="text-purple-400" />
                </div>
                <h3 className="font-poppins font-bold text-xl text-white">
                  Our Solution
                </h3>
              </div>
              <ul className="space-y-3 text-purple-200/80">
                {[
                  "Conductive threads detect moisture levels in real-time, continuously and accurately.",
                  "NFC technology wirelessly transmits data to ESP32 without any manual intervention.",
                  "Smart mobile alerts notify users exactly when a napkin change is required.",
                  "Entire system costs under ₹250 — affordable for women of all economic backgrounds.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-purple-400 mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimSection>
        </div>
      </div>
    </section>
  );
}

// ─── What Else It Solves ──────────────────────────────────────────────────────
function WhatElse() {
  return (
    <section id="what-else" className="py-20" style={{ background: "#130d2b" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection>
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-3">
              What Else It Solves
            </h2>
            <div className="w-16 h-1 bg-purple-400 rounded mx-auto" />
          </div>
        </AnimSection>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: <Eye size={30} className="text-purple-400" />,
              title: "Hygiene Awareness",
              desc: "Educates users about proper menstrual hygiene practices through timely reminders and alerts.",
            },
            {
              icon: <ShieldCheck size={30} className="text-purple-300" />,
              title: "Infection Prevention",
              desc: "Proactively prevents bacterial and fungal infections by ensuring timely napkin changes.",
            },
            {
              icon: <Smartphone size={30} className="text-violet-400" />,
              title: "User Convenience",
              desc: "Integrates seamlessly with smartphones, delivering alerts wherever the user goes.",
            },
          ].map((card, i) => (
            <AnimSection key={card.title} delay={i * 120}>
              <div
                className="rounded-2xl p-6 text-center border h-full hover:border-purple-400/40 transition-colors"
                style={{
                  background: "rgba(124,58,237,0.08)",
                  borderColor: "rgba(124,58,237,0.2)",
                }}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(124,58,237,0.15)" }}
                  >
                    {card.icon}
                  </div>
                </div>
                <h3 className="font-poppins font-semibold text-white text-base mb-2">
                  {card.title}
                </h3>
                <p className="text-purple-200/70 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SDG Goals ────────────────────────────────────────────────────────────────
function SDGGoals() {
  return (
    <section id="sdg" className="py-20" style={{ background: "#0f0a1e" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection>
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-3">
              UN SDG Alignment
            </h2>
            <p className="text-purple-300">
              Our project contributes to three United Nations Sustainable
              Development Goals
            </p>
            <div className="w-16 h-1 bg-purple-400 rounded mx-auto mt-3" />
          </div>
        </AnimSection>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              num: "3",
              label: "Good Health & Well-being",
              desc: "Promotes women's health by preventing hygiene-related infections and diseases.",
              color: "#4CAF50",
            },
            {
              num: "5",
              label: "Gender Equality",
              desc: "Empowers women through technology, ensuring menstrual health is not a barrier to daily life.",
              color: "#F44336",
            },
            {
              num: "6",
              label: "Clean Water & Sanitation",
              desc: "Advances sanitation awareness and promotes clean hygiene practices for all women.",
              color: "#2196F3",
            },
          ].map((sdg, i) => (
            <AnimSection key={sdg.num} delay={i * 120}>
              <div
                className="rounded-2xl overflow-hidden h-full border"
                style={{ borderColor: "rgba(124,58,237,0.2)" }}
              >
                <div
                  className="p-6 flex flex-col items-center text-center"
                  style={{ background: sdg.color }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-2">
                    <span className="font-poppins font-black text-4xl text-white">
                      {sdg.num}
                    </span>
                  </div>
                  <p className="font-poppins font-bold text-sm text-white">
                    SDG {sdg.num}
                  </p>
                </div>
                <div
                  className="p-5"
                  style={{ background: "rgba(124,58,237,0.1)" }}
                >
                  <h3 className="font-poppins font-semibold text-white text-sm mb-2">
                    {sdg.label}
                  </h3>
                  <p className="text-purple-200/70 text-xs leading-relaxed">
                    {sdg.desc}
                  </p>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Cost Estimation ──────────────────────────────────────────────────────────
const COST_ITEMS = [
  { component: "Conductive Thread", cost: "₹40" },
  { component: "NFC Tag (NTAG213)", cost: "₹25" },
  { component: "ESP32 Module", cost: "₹150" },
  { component: "Mobile App (Open Source)", cost: "₹0" },
  { component: "Sanitary Napkin Base", cost: "₹20" },
  { component: "Misc (Wires, Adhesive)", cost: "₹15" },
];

function CostEstimation() {
  return (
    <section id="cost" className="py-20" style={{ background: "#130d2b" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection>
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-3">
              Cost Estimation
            </h2>
            <p className="text-purple-300">
              Affordable components for maximum accessibility
            </p>
            <div className="w-16 h-1 bg-purple-400 rounded mx-auto mt-3" />
          </div>
        </AnimSection>
        <AnimSection delay={100}>
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "rgba(124,58,237,0.3)" }}
          >
            <div className="bg-gradient-to-r from-purple-700 to-violet-700 px-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <span className="font-poppins font-semibold text-white text-sm">
                  Component
                </span>
                <span className="font-poppins font-semibold text-white text-sm text-right">
                  Cost
                </span>
              </div>
            </div>
            {COST_ITEMS.map((item, i) => (
              <div
                key={item.component}
                className="px-6 py-4 grid grid-cols-2 gap-4 items-center"
                style={{
                  background:
                    i % 2 === 0
                      ? "rgba(124,58,237,0.06)"
                      : "rgba(124,58,237,0.12)",
                }}
              >
                <span className="font-medium text-purple-100 text-sm">
                  {item.component}
                </span>
                <span className="text-purple-300 font-semibold text-sm text-right">
                  {item.cost}
                </span>
              </div>
            ))}
            <div
              className="px-6 py-4 grid grid-cols-2 gap-4 border-t-2"
              style={{
                background: "rgba(124,58,237,0.2)",
                borderColor: "rgba(167,139,250,0.4)",
              }}
            >
              <span className="font-poppins font-bold text-white text-sm">
                Total
              </span>
              <span className="font-poppins font-bold text-purple-300 text-base text-right">
                ₹250
              </span>
            </div>
          </div>
        </AnimSection>
      </div>
    </section>
  );
}

// ─── Statistics ───────────────────────────────────────────────────────────────
function Statistics() {
  const CX = 100;
  const CY = 100;
  const pinkPct = 0.36;
  const pieR = 80;

  function describeArc(startAngle: number, endAngle: number, r: number) {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = CX + r * Math.cos(toRad(startAngle - 90));
    const y1 = CY + r * Math.sin(toRad(startAngle - 90));
    const x2 = CX + r * Math.cos(toRad(endAngle - 90));
    const y2 = CY + r * Math.sin(toRad(endAngle - 90));
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${CX} ${CY} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  }

  const pinkEnd = pinkPct * 360;

  return (
    <section
      id="statistics"
      className="py-20"
      style={{ background: "#0f0a1e" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection>
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-3">
              Menstrual Hygiene Access Gap
            </h2>
            <p className="text-purple-300 max-w-lg mx-auto">
              Only 36% of women in developing countries have access to proper
              hygiene products.
            </p>
            <div className="w-16 h-1 bg-purple-400 rounded mx-auto mt-3" />
          </div>
        </AnimSection>
        <AnimSection delay={100}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <svg
              role="img"
              aria-label="Pie chart showing 36% access vs 64% without access"
              width="200"
              height="200"
              viewBox="0 0 200 200"
            >
              <path d={describeArc(0, pinkEnd, pieR)} fill="#7c3aed" />
              <path d={describeArc(pinkEnd, 360, pieR)} fill="#a78bfa" />
              <circle cx={CX} cy={CY} r={40} fill="#1a0f35" />
              <text
                x={CX}
                y={CY - 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fill="#e9d5ff"
              >
                36%
              </text>
              <text
                x={CX}
                y={CY + 12}
                textAnchor="middle"
                fontSize="8"
                fill="#a78bfa"
              >
                vs 64%
              </text>
            </svg>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-purple-600 flex-shrink-0" />
                <div>
                  <p className="font-poppins font-semibold text-white">
                    36% — Have Access
                  </p>
                  <p className="text-purple-300 text-sm">
                    Women with proper hygiene products
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-purple-300 flex-shrink-0" />
                <div>
                  <p className="font-poppins font-semibold text-white">
                    64% — Without Access
                  </p>
                  <p className="text-purple-300 text-sm">
                    Women lacking proper menstrual hygiene
                  </p>
                </div>
              </div>
              <div
                className="mt-4 p-4 rounded-xl border text-sm text-purple-200/80 leading-relaxed max-w-xs"
                style={{
                  background: "rgba(124,58,237,0.1)",
                  borderColor: "rgba(124,58,237,0.25)",
                }}
              >
                <span className="font-semibold text-purple-300">Source:</span>{" "}
                WHO &amp; UNICEF Joint Monitoring Programme, 2023. The Smart
                Napkin Monitor aims to bridge this critical gap.
              </div>
            </div>
          </div>
        </AnimSection>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  {
    caption: "Circuit Diagram",
    image: "/assets/generated/circuit-diagram.dim_600x400.jpg",
  },
  {
    caption: "Wearable Integration",
    image: "/assets/generated/conductive-thread.dim_600x400.jpg",
  },
  {
    caption: "Sensor Module",
    image: "/assets/generated/esp32-module.dim_600x400.jpg",
  },
  {
    caption: "Mobile App UI",
    image: "/assets/generated/mobile-app-ui.dim_600x400.jpg",
  },
  {
    caption: "NFC Tag",
    image: "/assets/generated/nfc-tag.dim_600x400.jpg",
  },
];

function Gallery() {
  return (
    <section id="gallery" className="py-20" style={{ background: "#130d2b" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection>
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-3">
              Gallery
            </h2>
            <p className="text-purple-300">
              Circuit diagrams, wearable integration, and component visuals
            </p>
            <div className="w-16 h-1 bg-purple-400 rounded mx-auto mt-3" />
          </div>
        </AnimSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, i) => (
            <AnimSection key={item.caption} delay={i * 80}>
              <div
                data-ocid={`gallery.item.${i + 1}`}
                className="rounded-2xl overflow-hidden border hover:border-purple-400/40 transition-all duration-200 hover:-translate-y-1 group"
                style={{
                  background: "rgba(124,58,237,0.08)",
                  borderColor: "rgba(124,58,237,0.2)",
                }}
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85"
                  />
                </div>
                <div className="p-4">
                  <p className="font-poppins font-semibold text-purple-200 text-sm text-center">
                    {item.caption}
                  </p>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-20" style={{ background: "#0f0a1e" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection>
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-3">
              Get in Touch
            </h2>
            <p className="text-purple-300">
              Have questions or want to collaborate? We'd love to hear from you.
            </p>
            <div className="w-16 h-1 bg-purple-400 rounded mx-auto mt-3" />
          </div>
        </AnimSection>
        <AnimSection>
          <div
            className="rounded-2xl p-8 text-center space-y-6 border"
            style={{
              background: "rgba(124,58,237,0.1)",
              borderColor: "rgba(124,58,237,0.25)",
            }}
          >
            <div className="space-y-3">
              {[
                "mahasudhar2006@gmail.com",
                "gkakshaya509@gmail.com",
                "imsuzanmaria5@gmail.com",
              ].map((email) => (
                <div
                  key={email}
                  className="flex items-center justify-center gap-3"
                >
                  <Mail size={18} className="text-purple-400 flex-shrink-0" />
                  <a
                    href={`mailto:${email}`}
                    className="text-purple-300 font-medium text-sm hover:text-white transition-colors"
                  >
                    {email}
                  </a>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <MapPin size={18} className="text-purple-400 flex-shrink-0" />
              <p className="text-purple-200 font-medium text-sm">
                Rajalakshmi Institute of Technology
              </p>
            </div>
            <div
              className="pt-2 border-t"
              style={{ borderColor: "rgba(124,58,237,0.3)" }}
            >
              <p className="text-sm text-purple-300/70 leading-relaxed">
                We are open to collaborations with NGOs, healthcare
                institutions, and technology partners to bring this solution to
                women globally.
              </p>
            </div>
          </div>
        </AnimSection>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 px-4" style={{ background: "#080514" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center">
              <Droplets size={14} className="text-white" />
            </div>
            <span className="font-poppins font-bold text-white text-sm">
              Smart Sanitary Napkin Monitoring System
            </span>
          </div>
          <p className="text-purple-400 text-xs">
            Ready to Protect Women — Engineering Innovation Project
          </p>
          <p className="text-purple-500 text-xs">
            © {year} Smart Napkin Monitor
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <Nav />
      <Hero />
      <Dashboard />
      <About />
      <HowItWorks />
      <Features />
      <ProblemSolution />
      <Feasibility />
      <WhatElse />
      <SDGGoals />
      <CostEstimation />
      <Statistics />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}
