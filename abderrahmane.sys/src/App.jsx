import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollCanvasBackground from './components/ScrollCanvasBackground';
import TiltCard from './components/TiltCard';
import SystemInspectorModal from './components/SystemInspectorModal';
import TrafficSimulator from './components/TrafficSimulator';
import {
  Code2,
  ShieldCheck,
  Server,
  GitBranch,
  GraduationCap,
  ExternalLink,
  Mail,
  Smartphone,
  Layers,
  BookOpen,
  Database,
  Cpu,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ArrowUpRight,
  ChevronDown,
  Activity,
  Zap,
  Lock,
  Boxes,
  CheckCheck,
  SearchCode
} from 'lucide-react';

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// Animation variants for smooth scroll-driven reveals
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function App() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [inspectingProjectId, setInspectingProjectId] = useState(null);

  const totalFrames = 77;
  const emailAddress = "abderrahmane.contact.pro@gmail.com";
  const progressPercentage = Math.min(100, Math.round(loadProgress * 100));

  // Lock scroll until all 77 frames are preloaded
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      const timer = setTimeout(() => {
        setShowLoadingScreen(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  // Track scroll depth and frame number
  useEffect(() => {
    const handleScroll = () => {
      if (!isLoaded) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight;

      const maxScroll = Math.max(1, scrollHeight - clientHeight);
      const fraction = Math.min(1, Math.max(0, scrollTop / maxScroll));

      setScrollPct(Math.round(fraction * 100));
      setCurrentFrame(Math.min(totalFrames - 1, Math.floor(fraction * totalFrames)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('wheel', handleScroll);
    };
  }, [totalFrames, isLoaded]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setToastMessage("Email copied to clipboard!");
    setTimeout(() => {
      setCopiedEmail(false);
      setToastMessage(null);
    }, 3000);
  };

  const primaryTech = [
    { name: 'React.js', role: 'Frontend UI', level: 'Advanced' },
    { name: 'React Native', role: 'Mobile Apps', level: 'Advanced' },
    { name: 'Node.js', role: 'Backend Runtime', level: 'Proficient' },
    { name: 'JavaScript (ES6+)', role: 'Core Language', level: 'Mastery' },
    { name: 'MongoDB', role: 'NoSQL Database', level: 'Proficient' },
    { name: 'HTML5 & CSS3', role: 'Semantic Web', level: 'Mastery' },
    { name: 'Tailwind CSS', role: 'Modern Styling', level: 'Advanced' }
  ];

  const academicFoundations = [
    { name: 'C', desc: 'Low-level memory management & system algorithms', icon: Terminal, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
    { name: 'Java', desc: 'Object-Oriented Programming & enterprise architecture', icon: Cpu, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { name: 'MySQL', desc: 'Relational database design, ACID compliance & indexing', icon: Database, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { name: 'XML', desc: 'Structured data schemas, document parsing & integrations', icon: Code2, color: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20' }
  ];

  const engineeringStandards = [
    {
      id: 'security',
      title: 'Cybersecurity & Defense',
      subtitle: 'Zero-Trust Security & Hardened APIs',
      icon: ShieldCheck,
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
      badge: 'Defensive Security',
      points: [
        'JWT, OAuth2 & Role-Based Access Control (RBAC)',
        'Data encryption in transit (TLS/HTTPS) & at rest',
        'OWASP Top 10 mitigation & secure input sanitization',
        'Defensive coding practices & API rate limiting'
      ]
    },
    {
      id: 'architecture',
      title: 'Scalable Architecture',
      subtitle: 'High-Concurrency & Distributed Backends',
      icon: Server,
      color: 'from-fuchsia-500/20 to-purple-500/20 text-fuchsia-400 border-fuchsia-500/30',
      badge: 'High Throughput',
      points: [
        'Event-driven Node.js & high-throughput REST/WebSocket APIs',
        'Optimized MongoDB & MySQL indexing, caching & transactions',
        'Decoupled component hierarchies & reactive state management',
        'Built for high traffic concurrency and horizontal scale'
      ]
    },
    {
      id: 'quality',
      title: 'Clean Code Quality',
      subtitle: 'Maintainable & Enterprise Scalability',
      icon: GitBranch,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
      badge: 'Enterprise Rigor',
      points: [
        'Modular, self-documenting code with separation of concerns',
        'Strict linting, automated testing & reproducible builds',
        'Micro-optimized memory management & resource lifecycles',
        'Production-grade reliability & frictionless team handoffs'
      ]
    }
  ];

  const projects = [
    {
      id: 'relizane-fellah',
      title: 'Relizane Fellah',
      subtitle: 'Graduation Project & Patent Concept',
      type: 'E-Commerce & AgriTech Platform',
      impactBadge: 'Patent-Pending Concept',
      metric: 'Direct Farm-to-Market Supply Chain',
      description:
        'An innovative digital ecosystem bridging agricultural producers directly with commercial markets and consumers. Features real-time stock management, transparent marketplace pricing, secure farmer-to-buyer transactions, and decentralized supply chain tools.',
      tags: ['React.js', 'Node.js', 'Firebase', 'Tailwind CSS', 'Patent Concept'],
      liveUrl: 'https://relizane-fellah.web.app/login',
      githubUrl: 'https://github.com',
      status: 'Live Platform',
      badgeColor: 'border-cyan-400/40 text-cyan-300 bg-cyan-500/15',
      featured: true
    },
    {
      id: 'gym-app',
      title: 'Gym Mobile App',
      subtitle: 'Cross-Platform Fitness Management',
      type: 'Mobile Application',
      impactBadge: 'Cross-Platform Mobile',
      metric: 'Offline-First & Biometrics',
      description:
        'A comprehensive fitness and gym ecosystem built with React Native. Offers automated member check-ins, custom workout routine planners, subscription tracking, and real-time biometric progress metrics.',
      tags: ['React Native', 'Mobile UI/UX', 'State Management', 'REST APIs'],
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      icon: Smartphone,
      status: 'Production Ready',
      badgeColor: 'border-fuchsia-400/40 text-fuchsia-300 bg-fuchsia-500/15'
    },
    {
      id: 'teamsync',
      title: 'TeamSync / Abdo-Team',
      subtitle: 'B2B SaaS Project Management',
      type: 'Enterprise Web Application',
      impactBadge: 'Multi-Tenant SaaS',
      metric: 'Real-time WebSockets & RBAC',
      description:
        'Scalable B2B SaaS platform engineered for engineering squads and enterprise collaboration. Implements real-time Kanban boards, sprint telemetry, granular role-based access control, and workspace activity audits.',
      tags: ['React.js', 'Node.js', 'MongoDB', 'WebSockets', 'B2B SaaS'],
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      icon: Layers,
      status: 'Enterprise SaaS',
      badgeColor: 'border-blue-400/40 text-blue-300 bg-blue-500/15'
    },
    {
      id: 'nhdro',
      title: 'Nhdro',
      subtitle: 'Interactive Education Platform',
      type: 'EdTech Learning Hub',
      impactBadge: 'EdTech Platform',
      metric: 'Zero-Latency Classroom LMS',
      description:
        'Educational learning management platform tailored for modern classrooms. Features interactive course modules, automated assessment grading, downloadable resources, and live peer collaboration spaces.',
      tags: ['React.js', 'JavaScript', 'EdTech', 'Responsive Design'],
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      icon: BookOpen,
      status: 'Deployed LMS',
      badgeColor: 'border-emerald-400/40 text-emerald-300 bg-emerald-500/15'
    }
  ];

  return (
    <div className="relative w-full text-slate-100 min-h-[440vh] selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      {/* Background Frame Sequence Canvas (Top-Anchored Cover) */}
      <ScrollCanvasBackground
        frameCount={totalFrames}
        yAnchor={0.0}
        xAnchor={0.5}
        onLoadProgress={(progress, loaded, total) => {
          setLoadProgress(progress);
          setLoadedCount(loaded || Math.round(progress * total));
        }}
        onAllLoaded={() => {
          setIsLoaded(true);
        }}
      />

      {/* Atmospheric Vignette Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/85 pointer-events-none -z-10" />

      {/* Floating Modern Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-black/90 border border-cyan-400/50 backdrop-blur-2xl shadow-[0_0_35px_rgba(0,240,255,0.4)] text-white text-xs font-mono"
          >
            <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-100">{toastMessage}</div>
              <div className="text-cyan-300 text-[11px] font-sans">{emailAddress}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. X-RAY SYSTEM INSPECTOR MODAL */}
      <AnimatePresence>
        {inspectingProjectId && (
          <SystemInspectorModal
            projectId={inspectingProjectId}
            onClose={() => setInspectingProjectId(null)}
          />
        )}
      </AnimatePresence>

      {/* FULL-SCREEN INTERACTIVE ASSET PRELOADER (z-index: 9999) */}
      {showLoadingScreen && (
        <div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] px-6 text-center transition-all duration-700 ${
            isLoaded ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 pointer-events-auto scale-100'
          }`}
          style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
        >
          <div className="absolute w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none animate-pulse delay-700" />

          <div className="relative z-10 max-w-lg w-full flex flex-col items-center">
            {/* Holographic Scanner Orb */}
            <div className="relative mb-8">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-black/80 border border-cyan-400/40 flex items-center justify-center backdrop-blur-2xl shadow-[0_0_40px_rgba(0,240,255,0.3)]">
                <Activity className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 animate-pulse" />
              </div>
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500 opacity-40 blur-lg -z-10 animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            {/* Futuristic Progress Header */}
            <h2 className="text-xl sm:text-3xl font-extrabold font-display tracking-tight text-white mb-2 text-glow-white">
              INITIALIZING SYSTEM ASSETS... [{progressPercentage}%]
            </h2>
            <p className="text-xs sm:text-sm text-cyan-400 font-mono tracking-widest uppercase mb-7">
              PARALLEL PROMISE.ALL() IMAGE STREAM • {loadedCount} / {totalFrames} FRAMES
            </p>

            {/* Sleek Neon Glow Progress Bar */}
            <div className="w-full bg-black/70 border border-white/15 rounded-full h-3.5 p-0.5 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] mb-4">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 rounded-full transition-all duration-150 ease-out shadow-[0_0_20px_rgba(0,240,255,0.9)]"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Telemetry Bar */}
            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-cyan-300 font-bold tracking-wider">
                {progressPercentage}% CACHED
              </span>
              <span className="text-slate-400">
                GPU BUFFER READY
              </span>
            </div>

            {/* Ready Status */}
            <div className="mt-8 text-[11px] font-mono tracking-widest text-slate-400 uppercase flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-200">{isLoaded ? 'ALL 77 ASSETS LOADED • LAUNCHING...' : 'PRELOADING CANVAS ASSETS INTO MEMORY'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Top Cyberpunk Neon Progress Line */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 z-40 transition-all duration-300 shadow-[0_0_8px_rgba(0,240,255,0.9)]"
        style={{
          width: `${progressPercentage}%`,
          opacity: progressPercentage >= 100 ? 0 : 1
        }}
      />

      {/* Compact Polished Glass Navbar */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md bg-black/40 border-b border-white/10 shadow-lg shadow-black/40 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 font-bold tracking-tight text-white group">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_8px_#00f0ff]"></span>
            </span>
            <span className="text-sm sm:text-base font-extrabold font-display bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent group-hover:text-glow-cyan transition-all">
              abderrahmane.sys
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-slate-300 font-mono">
            <a href="#about" className="hover:text-cyan-300 transition-colors">About</a>
            <a href="#skills" className="hover:text-cyan-300 transition-colors">Skills</a>
            <a href="#standards" className="hover:text-cyan-300 transition-colors">Standards</a>
            <a href="#projects" className="hover:text-cyan-300 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-cyan-300 transition-colors">Contact</a>
          </div>

          {/* Real-Time Telemetry Badge & Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.15)]">
              <span className="text-slate-400 hidden xs:inline">FRAME</span>
              <span className="font-bold text-white">#{String(currentFrame + 1).padStart(2, '0')}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">{totalFrames}</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-cyan-400 font-semibold hidden sm:inline">{scrollPct}%</span>
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,240,255,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              Connect
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* Main Content Layout Container (max-w-7xl, responsive padding) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-24 space-y-36 sm:space-y-48">

        {/* SECTION 1: HERO */}
        <section id="about" className="min-h-[85vh] flex flex-col justify-center items-center text-center pt-6 sm:pt-10">
          <TiltCard
            maxTilt={7}
            glareOpacity={0.2}
            className="backdrop-blur-xl bg-black/60 border border-white/15 rounded-3xl p-6 sm:p-12 max-w-4xl shadow-2xl shadow-black/80 relative group w-full hover:border-cyan-500/40 transition-colors duration-500"
          >
            {/* Ambient Cyber Neon Glow Orbs */}
            <div className="absolute -top-28 -left-28 w-80 h-80 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/35 transition-all duration-700" />
            <div className="absolute -bottom-28 -right-28 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-fuchsia-500/30 transition-all duration-700" />

            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={containerVariants}
              className="relative z-10"
            >
              {/* Pulsing Live Status Badge */}
              <motion.div variants={itemVariants} className="flex items-center justify-center mb-5">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_#10b981]"></span>
                  </span>
                  <span>Available for New Projects & Engineering Roles</span>
                </span>
              </motion.div>

              {/* Status Badges */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Full-Stack & Software Engineer
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-fuchsia-500/15 border border-fuchsia-400/40 text-fuchsia-300 shadow-[0_0_12px_rgba(255,0,127,0.2)]">
                  <GraduationCap className="w-3.5 h-3.5 text-fuchsia-400" />
                  Degree in Systèmes Informatiques
                </span>
              </motion.div>

              {/* Hero Title */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white mb-5 leading-[1.1] text-glow-white"
              >
                Engineering <span className="bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-transparent">Resilient Software</span> & Systems
              </motion.h1>

              {/* Subtitle / Core Focus */}
              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-7 font-normal"
              >
                Specialized in <strong className="text-cyan-300 font-semibold">Software Engineering & Cybersecurity</strong>. 
                Bridging high-performance modern web & mobile architectures with rigorous systems engineering, low-level algorithms, and defensive security.
              </motion.p>

              {/* High-Trust Metrics Bar */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-2xl bg-white/[0.03] border border-white/10 mb-8 max-w-2xl mx-auto text-xs font-mono"
              >
                <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/[0.02]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="text-slate-200 font-semibold">100% Production Ready</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/[0.02]">
                  <Lock className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                  <span className="text-slate-200 font-semibold">Systems & Web Security</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/[0.02]">
                  <Boxes className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-slate-200 font-semibold">Full-Stack Capabilities</span>
                </div>
              </motion.div>

              {/* Equalized Hero CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(0,240,255,0.5)" }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center justify-center h-12 px-6 rounded-xl font-medium text-sm w-full sm:w-auto bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-slate-950 tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.4)] gap-2 transition-all"
                >
                  <span>Explore Featured Projects</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-950 font-bold" />
                </motion.a>

                <motion.button
                  onClick={handleCopyEmail}
                  whileHover={{ scale: 1.03, borderColor: "rgba(0,240,255,0.5)" }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center justify-center h-12 px-6 rounded-xl font-medium text-sm w-full sm:w-auto bg-black/60 hover:bg-white/10 text-slate-200 border border-white/15 gap-2 transition-all shadow-lg cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Direct Email'}</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </TiltCard>

          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-10 sm:mt-14 flex flex-col items-center gap-1.5 text-cyan-400/80 text-[11px] font-mono tracking-widest uppercase animate-bounce"
          >
            <span>Scroll to animate interactive frames</span>
            <ChevronDown className="w-4 h-4 text-cyan-400" />
          </motion.div>
        </section>

        {/* SECTION 2: SKILLS & ENGINEERING FOUNDATIONS */}
        <motion.section
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="space-y-8 scroll-mt-24 sm:scroll-mt-28"
        >
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-bold mb-2">Technical Matrix</h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">Full-Stack Tech & Core Systems</h3>
          </motion.div>

          {/* Primary Technologies */}
          <motion.div variants={itemVariants}>
            <TiltCard
              maxTilt={6}
              glareOpacity={0.15}
              className="backdrop-blur-xl bg-black/60 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative hover:border-cyan-500/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-display text-white">Primary Development Stack</h4>
                  <p className="text-xs text-slate-400">High-performance web, mobile & cloud frameworks</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {primaryTech.map((tech) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                  >
                    <div className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors font-display">
                      {tech.name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">{tech.role}</div>
                  </motion.div>
                ))}
              </div>
            </TiltCard>
          </motion.div>

          {/* Academic & Low-Level Foundations */}
          <motion.div variants={itemVariants}>
            <TiltCard
              maxTilt={6}
              glareOpacity={0.15}
              className="backdrop-blur-xl bg-black/60 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl hover:border-fuchsia-500/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-2xl bg-fuchsia-500/15 border border-fuchsia-400/30 text-fuchsia-400 shadow-[0_0_15px_rgba(255,0,127,0.2)]">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-display text-white">Academic & Core Engineering Foundations</h4>
                  <p className="text-xs text-slate-400">Low-level algorithms, concurrency & database engineering rigor</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {academicFoundations.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all"
                    >
                      <div className={`p-2 rounded-xl border ${item.color} mt-0.5`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-100 font-display">{item.name}</div>
                        <div className="text-xs text-slate-400 leading-relaxed mt-0.5">{item.desc}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </TiltCard>
          </motion.div>
        </motion.section>

        {/* SECTION 3: ENGINEERING STANDARDS & 2. LIVE TRAFFIC STRESS TEST SIMULATOR */}
        <motion.section
          id="standards"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="space-y-8 scroll-mt-24 sm:scroll-mt-28"
        >
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-bold mb-2">Quality & Architecture</h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">Engineering Standards & Reliability</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5">Enterprise-grade practices built for zero downtime, security, and velocity</p>
          </motion.div>

          {/* 3-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {engineeringStandards.map((std) => {
              const IconComponent = std.icon;
              return (
                <motion.div key={std.id} variants={itemVariants} className="h-full">
                  <TiltCard
                    maxTilt={8}
                    glareOpacity={0.2}
                    className="backdrop-blur-xl bg-black/60 border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between h-full hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-colors duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className={`p-3 rounded-2xl border ${std.color} shadow-lg`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/5 border border-white/10 text-slate-300">
                          {std.badge}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold font-display text-white mb-1">
                        {std.title}
                      </h4>
                      <p className="text-xs text-cyan-300/80 font-mono mb-5">
                        {std.subtitle}
                      </p>

                      <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                        {std.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                      <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Built for enterprise scale & trust</span>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

          {/* 2. Interactive Architecture Stress Test Widget */}
          <motion.div variants={itemVariants}>
            <TrafficSimulator />
          </motion.div>
        </motion.section>

        {/* SECTION 4: FEATURED PROJECTS WITH 1. X-RAY INSPECT ARCHITECTURE BUTTON */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="space-y-8 scroll-mt-24 sm:scroll-mt-28"
        >
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-bold mb-2">Featured Showcase</h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">Key Projects & Inventions</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5">Web applications, mobile software, SaaS & patent concepts</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className={project.featured ? 'lg:col-span-2' : ''}
              >
                <TiltCard
                  maxTilt={project.featured ? 6 : 9}
                  glareOpacity={0.2}
                  className={`backdrop-blur-xl bg-black/60 border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] group h-full ${
                    project.featured ? 'bg-gradient-to-br from-black/70 via-black/60 to-cyan-950/30 border-cyan-500/30' : ''
                  }`}
                >
                  <div>
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold border ${project.badgeColor}`}>
                          {project.type}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                          {project.impactBadge}
                        </span>
                      </div>

                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/5 border border-white/10 text-slate-300 shrink-0">
                        {project.status}
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-cyan-200 transition-colors mb-1">
                      {project.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mb-3">{project.subtitle}</p>

                    {/* Result / Metric Highlight */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-cyan-300 mb-4">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{project.metric}</span>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/[0.04] text-slate-300 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons: Live Demo, Inspect Architecture & GitHub */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/10">
                      {project.liveUrl ? (
                        <motion.button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                          }}
                          whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(0,240,255,0.4)" }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center justify-center gap-2 h-11 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all flex-1 sm:flex-initial cursor-pointer"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-950 font-bold" />
                        </motion.button>
                      ) : null}

                      {/* 1. Interactive X-Ray System Inspector Button */}
                      <motion.button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectingProjectId(project.id);
                        }}
                        whileHover={{ scale: 1.04, borderColor: "rgba(0,240,255,0.6)", backgroundColor: "rgba(0,240,255,0.12)" }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center gap-2 h-11 px-4 sm:px-5 rounded-xl bg-cyan-500/10 text-cyan-300 text-xs font-bold tracking-wider uppercase border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all flex-1 sm:flex-initial cursor-pointer"
                      >
                        <SearchCode className="w-4 h-4 text-cyan-400" />
                        <span>Inspect Architecture</span>
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.githubUrl || "https://github.com", '_blank', 'noopener,noreferrer');
                        }}
                        whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.4)", backgroundColor: "rgba(255,255,255,0.08)" }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center gap-2 h-11 px-3.5 rounded-xl bg-black/50 text-slate-300 text-xs font-semibold tracking-wide border border-white/15 transition-all hover:text-white cursor-pointer"
                        aria-label="View Architecture Source Code"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">GitHub</span>
                      </motion.button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 5: CONTACT & CONNECT WITH EMBEDDED FOOTER */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="scroll-mt-24 sm:scroll-mt-28 pt-4 sm:pt-8"
        >
          <TiltCard
            maxTilt={6}
            glareOpacity={0.2}
            className="backdrop-blur-xl bg-black/60 border border-white/15 rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl relative w-full hover:border-cyan-400/40 transition-colors duration-500"
          >
            {/* Ambient Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />

            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 mb-3 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Enterprise Engineering Inquiries</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
                Let's Build Your System
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                Available for full-stack engineering roles, systems architecture consulting, and cybersecurity-focused custom software development.
              </p>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 w-full">
                {/* Standout Glowing Border Primary Button */}
                <motion.a
                  href={`mailto:${emailAddress}?subject=Engineering%20Collaboration%20Inquiry`}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 35px rgba(0,240,255,0.7)" }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-slate-950 text-sm font-extrabold tracking-wider uppercase shadow-[0_0_25px_rgba(0,240,255,0.5)] border-2 border-cyan-200 gap-2.5 transition-all animate-pulse-slow w-full sm:w-auto"
                >
                  <Mail className="w-4 h-4 text-slate-950" />
                  <span>Let's Build Your System</span>
                </motion.a>

                <motion.button
                  onClick={handleCopyEmail}
                  whileHover={{ scale: 1.03, borderColor: "rgba(0,240,255,0.5)", backgroundColor: "rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-black/60 hover:bg-white/10 text-slate-200 text-sm font-medium border border-white/15 gap-2 transition-all shadow-lg w-full sm:w-auto cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                  <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Direct Email'}</span>
                </motion.button>
              </div>

              {/* Social Channels & Trust Links */}
              <div className="flex items-center justify-center gap-4 pt-8 border-t border-white/10">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(0,240,255,0.4)" }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/40 transition-all shadow-lg"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(0,240,255,0.4)" }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/40 transition-all shadow-lg"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href={`mailto:${emailAddress}`}
                  whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(0,240,255,0.4)" }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/40 transition-all shadow-lg"
                  aria-label="Email Contact"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>

              {/* Embedded Footer inside Contact Card */}
              <div className="pt-6 mt-8 border-t border-white/10 text-center text-xs text-gray-400 opacity-80 font-mono">
                <p>© {new Date().getFullYear()} abderrahmane.sys — Full-Stack & Software Engineer.</p>
                <p className="mt-1 text-gray-500">Rendered via HTML5 Canvas Frame Engine, Framer Motion & Tailwind CSS.</p>
              </div>
            </motion.div>
          </TiltCard>
        </motion.section>

      </main>
    </div>
  );
}
