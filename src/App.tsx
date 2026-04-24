import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { ArrowRight, ArrowUpRight, Code2, TerminalSquare, Zap, Cpu, Globe, Github, GitMerge, Mail, Package, Box, Layers, LayoutGrid, Calendar, Network, Share2, FileCode2, Map } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 20, mass: 1 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const Section = ({ id, className, children }: { id?: string, className?: string, children: React.ReactNode }) => {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0, margin: "0px 0px -40px 0px" }}
      variants={staggerContainer}
    >
      {children}
    </motion.section>
  );
};

export default function App() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [activeSection, setActiveSection] = useState("hero");
  const isManualScroll = useRef(false);
  const scrollTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (isManualScroll.current) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-20% 0px -40% 0px", threshold: 0 });

    const sections = document.querySelectorAll("section[id]");
    sections.forEach(s => observer.observe(s));

    return () => sections.forEach(s => observer.unobserve(s));
  }, []);

  // Background global opacity
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 1200], [1, 0.2]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 100 && !isManualScroll.current) {
      setActiveSection("hero");
    }
  });

  // Specific Hero Section Scroll Progress
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax displacement reduced structurally to prevent next-section layout bleeding
  const heroY = useTransform(heroProgress, [0, 1], [0, 50]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8, 1], [1, 1, 0]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-[#081220] selection:bg-[#3B82F6]/30">
      <motion.div style={{ opacity: bgOpacity }} className="bg-hero-glow absolute inset-0 z-0 pointer-events-none will-change-[opacity]"></motion.div>

      <main className="max-w-[1200px] mx-auto px-6 py-8 relative z-10 w-full">
        {/* Navigation */}
        <motion.nav
          aria-label="Main Navigation"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex items-center justify-between mb-24 md:mb-32 px-2"
        >
          <div className="text-2xl font-bold tracking-tighter text-white cursor-pointer group flex items-center gap-2">
            R<span className="text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">J</span>
          </div>
          <div className="hidden md:flex items-center space-x-10 text-[15px] font-medium text-[var(--color-text-secondary)]">
            <a href="#projects" className="hover:text-white transition-colors">Open Source</a>
            <a href="#npm" className="hover:text-white transition-colors">Ecosystem</a>
            <a href="#prs" className="hover:text-white transition-colors">PRs</a>
            <a href="#principles" className="hover:text-white transition-colors">Principles</a>
          </div>
          <a href="https://github.com/roojay" target="_blank" rel="noopener noreferrer" className="bg-[var(--color-primary)] hover:bg-[#2563EB] text-white text-[14px] font-medium px-6 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
            Follow me <Github className="w-4 h-4 ml-1" />
          </a>
        </motion.nav>

        {/* Hero Section */}
        <motion.section
          id="hero"
          ref={heroRef}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px] gap-16 lg:gap-10 xl:gap-16 mb-24 md:mb-40 items-center will-change-transform"
        >
          <div className="flex flex-col items-start pr-0 xl:pr-8">
            <motion.div variants={fadeUp} className="relative inline-block mb-6 lg:mb-8">
              <h1 className="text-[56px] lg:text-[72px] xl:text-[88px] leading-[1.1] font-bold text-white tracking-[-0.02em] drop-shadow-xl text-glow relative z-10">
                Roojay
              </h1>
              <svg className="absolute -bottom-2 lg:-bottom-4 left-0 w-[110%] h-[16px] lg:h-[24px] text-[var(--color-primary)] opacity-80 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
                <path d="M0,15 Q100,25 200,5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-[32px] lg:text-[40px] xl:text-[48px] leading-[1.2] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 mb-6 lg:mb-8 tracking-tight">
              Digital Nomad.<br className="hidden md:block"/> Digital Hamster.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[16px] lg:text-[18px] xl:text-[20px] leading-[1.8] text-[var(--color-text-secondary)] mb-10 max-w-2xl xl:max-w-3xl font-light">
              在工具、界面与创作之间持续探索，享受从想法到成品的打磨过程。偏爱简洁清晰的表达，也相信好的体验不只是功能完整，更是使用时那种自然、顺畅又恰到好处的感觉。
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-wrap w-full gap-3 lg:gap-4 mt-6">
              <span className="flex items-center justify-center xl:justify-start gap-2 w-full xl:w-[150px] px-4 lg:px-5 py-2.5 lg:py-3 rounded-full border border-[#CB3837]/30 bg-[#CB3837]/10 text-[#CB3837] text-[13px] lg:text-[14px] leading-[20px] font-bold tracking-wide backdrop-blur-sm shadow-[0_0_15px_rgba(203,56,55,0.15)] transition-colors hover:bg-[#CB3837]/20 whitespace-nowrap">
                <TerminalSquare className="w-4 lg:w-4.5 h-4 lg:h-4.5 shrink-0" strokeWidth={2.5} /> CLI & Tools
              </span>
              <span className="flex items-center justify-center xl:justify-start gap-2 w-full xl:w-[150px] px-4 lg:px-5 py-2.5 lg:py-3 rounded-full border border-[#41B883]/30 bg-[#41B883]/10 text-[#41B883] text-[13px] lg:text-[14px] leading-[20px] font-bold tracking-wide backdrop-blur-sm shadow-[0_0_15px_rgba(65,184,131,0.15)] transition-colors hover:bg-[#41B883]/20 whitespace-nowrap">
                <Layers className="w-4 lg:w-4.5 h-4 lg:h-4.5 shrink-0" strokeWidth={2.5} /> Vue Eco
              </span>
              <span className="flex items-center justify-center xl:justify-start gap-2 w-full xl:w-[150px] px-4 lg:px-5 py-2.5 lg:py-3 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[13px] lg:text-[14px] leading-[20px] font-bold tracking-wide backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-colors hover:bg-[var(--color-primary)]/20 whitespace-nowrap">
                <Box className="w-4 lg:w-4.5 h-4 lg:h-4.5 shrink-0" strokeWidth={2.5} /> macOS App
              </span>
              <span className="flex items-center justify-center xl:justify-start gap-2 w-full xl:w-[150px] px-4 lg:px-5 py-2.5 lg:py-3 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 text-[#6366F1] text-[13px] lg:text-[14px] leading-[20px] font-bold tracking-wide backdrop-blur-sm shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-colors hover:bg-[#6366F1]/20 whitespace-nowrap">
                <FileCode2 className="w-4 lg:w-4.5 h-4 lg:h-4.5 shrink-0" strokeWidth={2.5} /> TypeScript
              </span>
              <span className="flex items-center justify-center xl:justify-start gap-2 w-full xl:w-[150px] px-4 lg:px-5 py-2.5 lg:py-3 rounded-full border border-[#06B6D4]/30 bg-[#06B6D4]/10 text-[#06B6D4] text-[13px] lg:text-[14px] leading-[20px] font-bold tracking-wide backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-colors hover:bg-[#06B6D4]/20 whitespace-nowrap">
                <Code2 className="w-4 lg:w-4.5 h-4 lg:h-4.5 shrink-0" strokeWidth={2.5} /> Components
              </span>
              <span className="flex items-center justify-center xl:justify-start gap-2 w-full xl:w-[150px] px-4 lg:px-5 py-2.5 lg:py-3 rounded-full border border-[#F43F5E]/30 bg-[#F43F5E]/10 text-[#F43F5E] text-[13px] lg:text-[14px] leading-[20px] font-bold tracking-wide backdrop-blur-sm shadow-[0_0_15px_rgba(244,63,94,0.15)] transition-colors hover:bg-[#F43F5E]/20 whitespace-nowrap">
                <Zap className="w-4 lg:w-4.5 h-4 lg:h-4.5 shrink-0" strokeWidth={2.5} /> Automation
              </span>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="w-full relative group/hamster-container">
             {/* Redesigned Tech/Profile Card */}
            <div className="relative bg-gradient-to-b from-[#0F172A]/80 to-[#081220] rounded-[32px] border border-[var(--color-border)] backdrop-blur-2xl p-6 lg:p-8 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group/card overflow-hidden z-10">
              {/* Animated Background Accents */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover/card:bg-[#41B883]/10 transition-colors duration-700 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#CB3837]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover/card:bg-[#F59E0B]/10 transition-colors duration-700 pointer-events-none"></div>

              {/* Header */}
              <div className="relative z-10 flex flex-col w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3 text-white font-bold text-xl tracking-tight">
                    <div className="w-10 h-10 rounded-xl bg-[#1E293B] border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                      <Cpu className="w-5 h-5 text-white/80" />
                    </div>
                    Roojay.sys
                  </div>
                  <div className="px-3 py-1.5 rounded-full border border-white/10 bg-[#0F172A]/80 text-[11px] font-mono text-[#94A3B8] font-semibold backdrop-blur-md shadow-sm shrink-0">
                    v2026.4
                  </div>
                </div>
                <div className="text-[12px] leading-[20px] text-[#94A3B8] font-mono flex flex-wrap items-center gap-x-3 gap-y-2 mt-3">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span className="w-2 h-2 shrink-0 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.7)]"></span>
                    <span>STATUS: ONLINE</span>
                  </div>
                  <span className="w-1 h-1 shrink-0 rounded-full bg-[#334155]"></span>
                  <a href="mailto:roojay520@gmail.com" className="flex items-center gap-1 text-[var(--color-primary)] hover:text-[#60A5FA] transition-colors group whitespace-nowrap pt-0.5">
                    <Mail className="w-3.5 h-3.5 mr-0.5 shrink-0" />
                    <span className="underline decoration-[var(--color-primary)]/40 underline-offset-4 tracking-wider">PING</span>
                    <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                  </a>
                </div>
              </div>

              {/* Terminal / Code Window */}
              <div className="relative z-10 w-full rounded-2xl bg-[#090E17] border border-white/10 overflow-hidden shadow-2xl flex-grow">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#111827] border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                  <div className="ml-2 text-[12px] text-[#6B7280] font-mono font-medium">guest@roojay:~</div>
                </div>
                <div className="p-4 sm:p-5 font-mono text-[13px] leading-relaxed text-[#D1D5DB]">
                  <div className="flex items-center gap-2"><span className="text-[#3B82F6]">➜</span> <span className="text-[#A78BFA]">~</span> <span className="text-white font-semibold">whoami</span></div>
                  <div className="mt-1 text-[#6EE7B7] mb-4">Front-End Infra Engineer</div>

                  <div className="flex items-center gap-2"><span className="text-[#3B82F6]">➜</span> <span className="text-[#A78BFA]">~</span> <span className="text-white font-semibold">skills</span></div>
                  <div className="mt-2 flex flex-wrap gap-2 text-[#9CA3AF] text-[12px]">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/90">Vue 3</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/90">Node.js</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/90">CLI Tools</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/90">TypeScript</span>
                  </div>
                </div>
              </div>

              {/* Global Impact / Stats footer */}
              <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4 mt-auto">
                <a
                  href="https://github.com/roojay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/5 bg-white/[0.03] p-4 flex flex-col justify-center hover:bg-white/[0.06] hover:border-white/10 transition-colors group relative overflow-hidden"
                >
                   <div className="flex items-center justify-between mb-1.5">
                     <div className="flex items-center gap-1.5 overflow-hidden">
                       <Github className="w-4 h-4 text-[#94A3B8] shrink-0" />
                       <span className="text-[11px] font-bold tracking-widest text-[#94A3B8] uppercase whitespace-nowrap">GitHub</span>
                     </div>
                     <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white/70 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                   </div>
                   <div className="text-[13px] sm:text-[15px] max-w-[120px] sm:max-w-none break-words whitespace-normal font-bold text-white tracking-tight leading-tight mt-1">Open Source</div>
                </a>

                <a
                  href="https://www.npmjs.com/~roojay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[#CB3837]/20 bg-[#CB3837]/[0.03] p-3 sm:p-4 flex flex-col justify-center hover:bg-[#CB3837]/[0.08] hover:border-[#CB3837]/40 transition-colors group relative overflow-hidden"
                >
                   <div className="flex items-center justify-between mb-1.5">
                     <div className="flex items-center gap-1.5 overflow-hidden">
                       <Package className="w-4 h-4 text-[#CB3837] shrink-0" />
                       <span className="text-[11px] font-bold tracking-widest text-[#CB3837]/80 uppercase whitespace-nowrap">NPM</span>
                     </div>
                     <ArrowUpRight className="w-3.5 h-3.5 text-[#CB3837]/40 group-hover:text-[#CB3837] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                   </div>
                   <div className="text-[13px] sm:text-[15px] max-w-[120px] sm:max-w-none break-words whitespace-normal font-bold text-white tracking-tight leading-tight mt-1">Infrastructure</div>
                </a>
              </div>
            </div>

            {/* Mascot / Hamster - Highly Interactive */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 10, x: 40 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.6 }}
              className="absolute -right-3 bottom-[110px] lg:-right-14 lg:bottom-[130px] w-28 h-28 lg:w-44 lg:h-44 z-30 group/mascot"
            >
              <motion.div
                animate={{ y: [-6, 6, -6], rotate: [-1.5, 1.5, -1.5] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="w-full h-full relative cursor-pointer"
              >
                {/* Reactive Space Aura */}
                <div className="absolute inset-0 bg-[var(--color-primary)]/0 blur-[40px] scale-50 rounded-full group-hover/mascot:bg-[var(--color-primary)]/40 group-hover/mascot:scale-110 transition-all duration-500 pointer-events-none"></div>

                <img
                  src="/hamster.png"
                  alt="RJ Digital Hamster Buddy"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] group-hover/mascot:brightness-110 group-hover/mascot:scale-110 group-hover/mascot:-translate-y-2 origin-bottom transition-all duration-300 ease-out"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Featured Open Source */}
        <Section id="projects" className="scroll-mt-24 mb-24 md:mb-40 relative z-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-10">
            <div className="flex items-center gap-4">
              <div className="w-6 h-[2px] bg-[var(--color-primary)] rounded-full"></div>
              <h3 className="text-[22px] leading-[28px] font-semibold text-white tracking-wide">Featured Open Source</h3>
            </div>
            <a href="https://github.com/roojay?tab=repositories" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[14px] leading-[20px] text-[var(--color-text-secondary)] hover:text-white transition-colors">
              Explore Original Work <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.a variants={fadeUp} href="https://github.com/roojay/bobplugin-google-translate" target="_blank" rel="noopener noreferrer" className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 h-full border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#081220] border border-[var(--color-primary)]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(59,130,246,0.2)] shrink-0">
                  <Globe className="w-5 h-5 text-[var(--color-primary)]" strokeWidth={1.5} />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-[17px] font-bold text-white group-hover:text-[var(--color-primary)] transition-colors leading-tight tracking-tight">bobplugin-google-<wbr/>translate</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#3178c6] shadow-[0_0_8px_rgba(49,120,198,0.5)]"></div>
                    <span className="text-[12px] font-medium text-[var(--color-text-secondary)] truncate">TypeScript</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-white opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light mt-1 flex-grow">
                 为 macOS 环境开发的 Bob 翻译扩展插件。原生接入 Google 翻译 API 引擎，支持流畅的多语种阅读与即时互译体验。
              </p>
            </motion.a>

            <motion.a variants={fadeUp} href="https://github.com/roojay/FantasyMapGenerator" target="_blank" rel="noopener noreferrer" className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 h-full border border-[var(--color-border)] hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-300 bg-gradient-to-br from-emerald-500/10 to-transparent relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#081220] border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)] shrink-0">
                  <Map className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-[17px] font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight tracking-tight">FantasyMap<wbr/>Generator</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#dea584] shadow-[0_0_8px_rgba(222,165,132,0.5)]"></div>
                    <span className="text-[12px] font-medium text-[var(--color-text-secondary)] truncate">Rust / WASM</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-white opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light mt-1 flex-grow">
                 原 C++ 奇幻地图生成器的 Rust 移植版。通过 WebAssembly（WASM）技术编译至前端，在现代浏览器中实现原生级的高性能地图渲染。
              </p>
            </motion.a>

            <motion.a variants={fadeUp} href="https://github.com/roojay/alfred-linux-command" target="_blank" rel="noopener noreferrer" className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 h-full border border-[var(--color-border)] hover:border-yellow-500/40 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] transition-all duration-300 bg-gradient-to-br from-yellow-500/10 to-transparent relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#081220] border border-yellow-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(234,179,8,0.2)] shrink-0">
                  <TerminalSquare className="w-5 h-5 text-yellow-500" strokeWidth={1.5} />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-[17px] font-bold text-white group-hover:text-yellow-400 transition-colors leading-tight tracking-tight">alfred-linux-<wbr/>command</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#f1e05a] shadow-[0_0_8px_rgba(241,224,90,0.5)]"></div>
                    <span className="text-[12px] font-medium text-[var(--color-text-secondary)] truncate">JavaScript</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-white opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light mt-1 flex-grow">
                 适用于开发人员的 Alfred Workflow 配置工程。支持在快捷输入面板中快速检索与查询 Linux 命令手册参数。
              </p>
            </motion.a>
          </div>
        </Section>

        {/* NPM Ecosystem */}
        <Section id="npm" className="scroll-mt-24 mb-24 md:mb-40 relative z-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-10">
            <div className="flex items-center gap-4">
              <div className="w-6 h-[2px] bg-[#CB3837] rounded-full"></div>
              <h3 className="text-[22px] leading-[28px] font-semibold text-white tracking-wide">NPM Ecosystem & Toolchains</h3>
            </div>
            <a href="https://www.npmjs.com/~roojay" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[14px] leading-[20px] text-[var(--color-text-secondary)] hover:text-white transition-colors">
              NPM Registry <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.a variants={fadeUp} href="https://www.npmjs.com/package/@sec-fe/v-grid-layout" target="_blank" rel="noopener noreferrer" className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 border border-[var(--color-border)] hover:border-[#41B883]/40 hover:shadow-[0_0_30px_rgba(65,184,131,0.1)] transition-all duration-300 bg-gradient-to-br from-[#41B883]/5 to-transparent relative">
              <div className="flex justify-between items-start mb-1 mt-1">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-[#081220] border border-[#41B883]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(65,184,131,0.2)]">
                     <LayoutGrid className="w-5 h-5 text-[#41B883]" />
                   </div>
                   <div>
                     <h4 className="text-[17px] font-bold text-white group-hover:text-[#41B883] leading-tight tracking-tight transition-colors">@sec-fe/v-grid-<wbr/>layout</h4>
                     <div className="text-[13px] text-[var(--color-text-secondary)] font-mono mt-0.5">v0.0.2</div>
                   </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-white opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light flex-grow">
                 基于 Vue 3 + Element Plus 构建的响应式数据可视化大屏网格拖拽组件，内置 Pinia 状态与 JSON 持久读写。
              </p>
            </motion.a>

            <motion.a variants={fadeUp} href="https://www.npmjs.com/package/@sec-fe/sec-date-picker" target="_blank" rel="noreferrer" className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 border border-[var(--color-border)] hover:border-[#3B82F6]/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 bg-gradient-to-br from-[#3B82F6]/5 to-transparent relative">
              <div className="flex justify-between items-start mb-1 mt-1">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-[#081220] border border-[#3B82F6]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                     <Calendar className="w-5 h-5 text-[#3B82F6]" />
                   </div>
                   <div>
                     <h4 className="text-[17px] font-bold text-white group-hover:text-[#3B82F6] leading-tight tracking-tight transition-colors">@sec-fe/sec-<wbr/>date-picker</h4>
                     <div className="text-[13px] text-[var(--color-text-secondary)] font-mono mt-0.5">v1.0.0</div>
                   </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-white opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light flex-grow">
                 针对中后台表单场景封装的增强版日期范围选择器，内置多项预设时间选项及高频时间段区间锁定能力。
              </p>
            </motion.a>

            <motion.a variants={fadeUp} href="https://www.npmjs.com/package/@sec-fe/sec-condition-tree" target="_blank" rel="noreferrer" className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 border border-[var(--color-border)] hover:border-[#F59E0B]/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-300 bg-gradient-to-br from-[#F59E0B]/5 to-transparent relative">
              <div className="flex justify-between items-start mb-1 mt-1">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-[#081220] border border-[#F59E0B]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                     <Network className="w-5 h-5 text-[#F59E0B]" />
                   </div>
                   <div>
                     <h4 className="text-[17px] font-bold text-white group-hover:text-[#F59E0B] leading-tight tracking-tight transition-colors">@sec-fe/sec-<wbr/>condition-tree</h4>
                     <div className="text-[13px] text-[var(--color-text-secondary)] font-mono mt-0.5">v1.0.0</div>
                   </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-white opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light flex-grow">
                 条件规则树组件级构建器，支持处理复杂的 AND/OR 逻辑嵌套、规则级联树深度分层以及动态表达式组装。
              </p>
            </motion.a>

            <motion.a variants={fadeUp} href="https://www.npmjs.com/package/@sec-fe/sec-topo" target="_blank" rel="noreferrer" className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 border border-[var(--color-border)] hover:border-[#8B5CF6]/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent relative">
              <div className="flex justify-between items-start mb-1 mt-1">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-[#081220] border border-[#8B5CF6]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                     <Share2 className="w-5 h-5 text-[#8B5CF6]" />
                   </div>
                   <div>
                     <h4 className="text-[17px] font-bold text-white group-hover:text-[#8B5CF6] leading-tight tracking-tight transition-colors">@sec-fe/sec-<wbr/>topo</h4>
                     <div className="text-[13px] text-[var(--color-text-secondary)] font-mono mt-0.5">v1.0.0</div>
                   </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-white opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light flex-grow">
                 底层前端拓扑网络结构交互渲染组件，适用于复杂微服务链路监控、IT 设备状态大盘等实体关系图谱场景。
              </p>
            </motion.a>

            <motion.a variants={fadeUp} href="https://www.npmjs.com/package/@feq/element-theme-generator" target="_blank" rel="noreferrer" className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 border border-[var(--color-border)] hover:border-[#0EA5E9]/40 hover:shadow-[0_0_30px_rgba(14,165,233,0.1)] transition-all duration-300 bg-gradient-to-br from-[#0EA5E9]/5 to-transparent relative">
              <div className="flex justify-between items-start mb-1 mt-1">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-[#081220] border border-[#0EA5E9]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                     <Box className="w-5 h-5 text-[#0EA5E9]" />
                   </div>
                   <div>
                     <h4 className="text-[17px] font-bold text-white group-hover:text-[#0EA5E9] leading-tight tracking-tight transition-colors">@feq/element-theme-<wbr/>generator</h4>
                     <div className="text-[13px] text-[var(--color-text-secondary)] font-mono mt-0.5">v4.0.0</div>
                   </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-white opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light flex-grow">
                 配合 Element UI 底层定制的全局主题色构建命令行管道（CLI），协助跨团队微前端项目统一主题设计变量。
              </p>
            </motion.a>

            <motion.a variants={fadeUp} href="https://www.npmjs.com/package/@feq/gulp-css-wrap" target="_blank" rel="noreferrer" className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 border border-[var(--color-border)] hover:border-[#EC4899]/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)] transition-all duration-300 bg-gradient-to-br from-[#EC4899]/5 to-transparent relative">
              <div className="flex justify-between items-start mb-1 mt-1">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-[#081220] border border-[#EC4899]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                     <FileCode2 className="w-5 h-5 text-[#EC4899]" />
                   </div>
                   <div>
                     <h4 className="text-[17px] font-bold text-white group-hover:text-[#EC4899] leading-tight tracking-tight transition-colors">@feq/gulp-css-<wbr/>wrap</h4>
                     <div className="text-[13px] text-[var(--color-text-secondary)] font-mono mt-0.5">v1.1.0</div>
                   </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-white opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light flex-grow">
                 针对重型微前端工程提供从编译期源头控制的强样式隔离。以极低成本自动为全局 CSS 规则包裹独立命名空间。
              </p>
            </motion.a>
          </div>
        </Section>

        {/* Community Contributions */}
        <Section id="prs" className="scroll-mt-24 mb-24 md:mb-40 relative z-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-10">
            <div className="flex items-center gap-4">
              <div className="w-6 h-[2px] bg-[var(--color-primary)] rounded-full"></div>
              <h3 className="text-[22px] leading-[28px] font-semibold text-white tracking-wide">Community PRs</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.a variants={fadeUp} href="https://github.com/element-plus/element-plus/pull/19166" target="_blank" rel="noreferrer" className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 border border-[var(--color-border)] hover:border-[#409EFF]/40 hover:shadow-[0_0_30px_rgba(64,158,255,0.1)] transition-all duration-300 bg-gradient-to-br from-[#409EFF]/5 to-transparent relative">
              <div className="flex justify-between items-start mb-1 mt-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#081220] border border-[#409EFF]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(64,158,255,0.2)]">
                    <GitMerge className="w-5 h-5 text-[#409EFF]" />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-white group-hover:text-[#409EFF] leading-tight tracking-tight transition-colors truncate">Element Plus</h4>
                    <div className="text-[13px] text-[var(--color-text-secondary)] font-mono mt-0.5 truncate">#19166</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-white opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light flex-grow">
                Fixed a SCSS compilation error in <code className="text-[#409EFF]/80 bg-[#409EFF]/10 px-1 py-1 rounded text-[12px] font-mono mx-1">theme-chalk</code> by adding a missing <code className="text-[#409EFF]/80 bg-[#409EFF]/10 px-1 py-1 rounded text-[12px] font-mono mx-1">$space</code> parameter to the color channel function.
              </p>
            </motion.a>

            <motion.a variants={fadeUp} href="https://github.com/ElemeFE/element/pull/18478" target="_blank" rel="noreferrer" className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 border border-[var(--color-border)] hover:border-[#409EFF]/40 hover:shadow-[0_0_30px_rgba(64,158,255,0.1)] transition-all duration-300 bg-gradient-to-br from-[#409EFF]/5 to-transparent relative">
              <div className="flex justify-between items-start mb-1 mt-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#081220] border border-[#409EFF]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(64,158,255,0.2)]">
                    <GitMerge className="w-5 h-5 text-[#409EFF]" />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-white group-hover:text-[#409EFF] leading-tight tracking-tight transition-colors truncate">Element UI</h4>
                    <div className="text-[13px] text-[var(--color-text-secondary)] font-mono mt-0.5 truncate">#18478</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-white opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light flex-grow">
                Fixed an issue in the <code className="text-[#409EFF]/80 bg-[#409EFF]/10 px-1 py-1 rounded text-[12px] font-mono mx-1">Autocomplete</code> component where suggestions would not display correctly when the input type was set to <code className="text-[#409EFF]/80 bg-[#409EFF]/10 px-1 py-1 rounded text-[12px] font-mono mx-1">textarea</code>.
              </p>
            </motion.a>

            <motion.a variants={fadeUp} href="https://github.com/ElemeFE/element/pull/20022" target="_blank" rel="noreferrer" className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 border border-[var(--color-border)] hover:border-[#409EFF]/40 hover:shadow-[0_0_30px_rgba(64,158,255,0.1)] transition-all duration-300 bg-gradient-to-br from-[#409EFF]/5 to-transparent relative">
              <div className="flex justify-between items-start mb-1 mt-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#081220] border border-[#409EFF]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(64,158,255,0.2)]">
                    <GitMerge className="w-5 h-5 text-[#409EFF]" />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-white group-hover:text-[#409EFF] leading-tight tracking-tight transition-colors truncate">Element UI</h4>
                    <div className="text-[13px] text-[var(--color-text-secondary)] font-mono mt-0.5 truncate">#20022</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-white opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light flex-grow">
                Resolved a breaking styling issue where SCSS files failed to compile when migrating the project to <code className="text-[#409EFF]/80 bg-[#409EFF]/10 px-1 py-1 rounded text-[12px] font-mono mx-1">dart-sass</code>.
              </p>
            </motion.a>

            <motion.a variants={fadeUp} href="https://github.com/apache/echarts/pull/18390" target="_blank" rel="noreferrer" className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 border border-[var(--color-border)] hover:border-[#AA344D]/40 hover:shadow-[0_0_30px_rgba(170,52,77,0.1)] transition-all duration-300 bg-gradient-to-br from-[#AA344D]/5 to-transparent relative">
              <div className="flex justify-between items-start mb-1 mt-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#081220] border border-[#AA344D]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(170,52,77,0.2)]">
                    <GitMerge className="w-5 h-5 text-[#AA344D]" />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-white group-hover:text-[#AA344D] leading-tight tracking-tight transition-colors truncate">Apache ECharts</h4>
                    <div className="text-[13px] text-[var(--color-text-secondary)] font-mono mt-0.5 truncate">#18390</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-white opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light flex-grow">
                Fixed a crashing bug in the Legend Model by guarding against <code className="text-[#AA344D]/80 bg-[#AA344D]/10 px-1 py-1 rounded text-[12px] font-mono mx-1">undefined</code> dataItem variables.
              </p>
            </motion.a>

            <motion.a variants={fadeUp} href="https://github.com/tauri-apps/tauri/pull/2065" target="_blank" rel="noreferrer" className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 border border-[var(--color-border)] hover:border-[#FFC131]/40 hover:shadow-[0_0_30px_rgba(255,193,49,0.1)] transition-all duration-300 bg-gradient-to-br from-[#FFC131]/5 to-transparent relative">
              <div className="flex justify-between items-start mb-1 mt-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#081220] border border-[#FFC131]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(255,193,49,0.2)]">
                    <GitMerge className="w-5 h-5 text-[#FFC131]" />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-white group-hover:text-[#FFC131] leading-tight tracking-tight transition-colors truncate">Tauri</h4>
                    <div className="text-[13px] text-[var(--color-text-secondary)] font-mono mt-0.5 truncate">#2065</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-white opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light flex-grow">
                Resolved a TypeScript bindings error in the HTTP API by correctly exporting <code className="text-[#FFC131]/80 bg-[#FFC131]/10 px-1 py-1 rounded text-[12px] font-mono mx-1">ResponseType</code> as a value instead of exclusively as a type.
              </p>
            </motion.a>

            <motion.a variants={fadeUp} href="https://github.com/vuejs/docs-next-zh-cn/pull/25" target="_blank" rel="noreferrer" className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 border border-[var(--color-border)] hover:border-[#41B883]/40 hover:shadow-[0_0_30px_rgba(65,184,131,0.1)] transition-all duration-300 bg-gradient-to-br from-[#41B883]/5 to-transparent relative">
              <div className="flex justify-between items-start mb-1 mt-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#081220] border border-[#41B883]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(65,184,131,0.2)]">
                    <GitMerge className="w-5 h-5 text-[#41B883]" />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-white group-hover:text-[#41B883] leading-tight tracking-tight transition-colors truncate">Vue.js Docs</h4>
                    <div className="text-[13px] text-[var(--color-text-secondary)] font-mono mt-0.5 truncate">#25</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-white opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light flex-grow">
                Contributed to the Vue 3 ecosystem by completely translating the <code className="text-[#41B883]/80 bg-[#41B883]/10 px-1 py-1 rounded text-[12px] font-mono mx-1">editable-svg-icons.md</code> documentation into Chinese.
              </p>
            </motion.a>

          </div>
        </Section>

        {/* My Principles */}
        <Section id="principles" className="scroll-mt-24 mb-24 md:mb-40 relative z-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-10">
            <div className="flex items-center gap-4">
              <div className="w-6 h-[2px] bg-[var(--color-primary)] rounded-full"></div>
              <h3 className="text-[22px] leading-[28px] font-semibold text-white tracking-wide">Maker's Principles</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={fadeUp} className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 border border-[var(--color-border)] hover:border-[#F43F5E]/40 hover:shadow-[0_0_30px_rgba(244,63,94,0.1)] transition-all duration-300 bg-gradient-to-br from-[#F43F5E]/5 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#081220] border border-[#F43F5E]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(244,63,94,0.2)] shrink-0">
                  <TerminalSquare className="w-5 h-5 text-[#F43F5E]" strokeWidth={1.5} />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-[17px] leading-tight font-bold text-white group-hover:text-[#F43F5E] transition-colors tracking-tight">Fast & Compact</h4>
                </div>
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light mt-1">
                偏好模块化的底层逻辑与轻便架构，关注项目的可维护性，兼顾代码质量与运行时资源开销。
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 border border-[var(--color-border)] hover:border-[#10B981]/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-300 bg-gradient-to-br from-[#10B981]/5 to-transparent">
              <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-[#081220] border border-[#10B981]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)] shrink-0">
                  <Zap className="w-5 h-5 text-[#10B981]" strokeWidth={1.5} />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-[17px] leading-tight font-bold text-white group-hover:text-[#10B981] transition-colors tracking-tight">Deploy Anywhere</h4>
                </div>
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light mt-1">
                注重跨平台分发体验，遵循工程化规范设计工具流水线，确保在多端环境下均能稳定构建。
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="glass-card p-6 sm:p-7 rounded-[24px] group flex flex-col gap-4 border border-[var(--color-border)] hover:border-[#F59E0B]/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-300 bg-gradient-to-br from-[#F59E0B]/5 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#081220] border border-[#F59E0B]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] shrink-0">
                  <GitMerge className="w-5 h-5 text-[#F59E0B]" strokeWidth={1.5} />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-[17px] leading-tight font-bold text-white group-hover:text-[#F59E0B] transition-colors tracking-tight">Always Open</h4>
                </div>
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] font-light mt-1">
                积极参与前端开源建设，热衷于知识共享与社区共建，在反馈生态的同时输出业务中打磨出的方案。
              </p>
            </motion.div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="mt-20 border-t border-[var(--color-border)]/50 pt-10 pb-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] p-[1px]">
              <div className="w-full h-full rounded-full bg-[#081220] flex items-center justify-center">
                <span className="text-white font-bold text-[12px]">RJ</span>
              </div>
            </div>
            <span className="text-[14px] text-[var(--color-text-secondary)] font-light">© {new Date().getFullYear()} Roojay. <span className="hidden sm:inline">Crafted with pixels & passion.</span></span>
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:roojay520@gmail.com" aria-label="Email Me" className="text-[var(--color-text-secondary)] hover:text-white hover:-translate-y-1 transition-all duration-300">
              <span className="sr-only">Email</span>
              <Mail className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href="https://github.com/roojay" aria-label="My GitHub Profile" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] hover:text-white hover:-translate-y-1 transition-all duration-300">
              <span className="sr-only">GitHub</span>
              <Github className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>
        </footer>

        {/* Minimal Side Navigation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="fixed right-4 xl:right-8 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-3 pointer-events-none"
        >
          {[
            { id: "hero", label: "Hero" },
            { id: "projects", label: "Open Source" },
            { id: "npm", label: "Ecosystem" },
            { id: "prs", label: "PRs" },
            { id: "principles", label: "Principles" },
          ].map(item => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.id);
                  isManualScroll.current = true;
                  if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
                  scrollTimeout.current = window.setTimeout(() => {
                    isManualScroll.current = false;
                  }, 800);

                  if (item.id === "hero") {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }
                  window.history.pushState(null, '', `#${item.id}`);
                }}
                className="group pointer-events-auto flex items-center justify-end h-10 md:h-12 focus:outline-none pr-3 relative w-12 md:w-16"
                aria-label={`Scroll to ${item.label}`}
              >
                <span className={`absolute right-8 text-[12px] font-medium tracking-wide transition-all duration-300 pointer-events-none whitespace-nowrap opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 ${
                  isActive
                  ? "text-[var(--color-primary)]"
                  : "text-white/80"
                }`}>
                  {item.label}
                </span>
                <div className={`rounded-full transition-all duration-300 ease-out absolute right-2 md:right-4 ${
                  isActive
                  ? "h-8 w-[3px] bg-[var(--color-primary)] shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                  : "h-3 w-[3px] bg-white/20 group-hover:bg-white/60 group-hover:h-5"
                }`} />
              </a>
            );
          })}
        </motion.div>

      </main>
    </div>
  );
}
