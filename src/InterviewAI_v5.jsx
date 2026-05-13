import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEFAULT_OG_IMAGE, getImageMimeType, normalizePath } from "./utils/seoUtils.js";
import {
  Upload, Building2, Video, Mic, MicOff, VideoOff, PhoneOff,
  Check, Zap, BarChart2, Brain, RefreshCw, Shield, Award,
  TrendingUp, FileText, Sparkles, Settings, ArrowUpRight,
  LayoutDashboard, Globe, ChevronRight, AlertCircle,
  Mail, Bell, LogIn, Lock, Target, CheckCircle2, UserPlus,
  CreditCard, Palette, Menu, X, AlertTriangle, UserCircle,
  Star, MessageSquare, HelpCircle, Flame, Pencil,
  ChevronDown, ChevronUp, Calendar, Hash,
  LifeBuoy, Send, Bot, Github
} from "lucide-react";

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #FAFAF8; color: #0F172A; font-family: 'DM Sans', system-ui, sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
    :root {
      --teal: #0D9488; --teal-light: #CCFBF1; --teal-mid: #14B8A6; --teal-dark: #0F766E; --teal-border-hover: rgba(13,148,136,.35);
      --slate: #0F172A; --slate-800: #1E293B; --slate-700: #334155; --slate-600: #475569;
      --slate-500: #64748B; --slate-400: #94A3B8; --slate-300: #CBD5E1;
      --slate-200: #E2E8F0; --slate-100: #F1F5F9; --slate-50: #F8FAFC;
      --ivory: #FAFAF8; --white: #FFFFFF;
      --amber: #D97706; --amber-light: #FEF3C7;
      --red: #DC2626; --red-light: #FEE2E2;
      --green: #16A34A; --green-light: #DCFCE7;
      --purple: #7C3AED; --purple-light: #EDE9FE;
      --border: #E2E8F0; --border-strong: #CBD5E1;
      --shadow-sm: 0 1px 3px rgba(15,23,42,.06), 0 1px 2px rgba(15,23,42,.04);
      --shadow-md: 0 4px 12px rgba(15,23,42,.08), 0 2px 6px rgba(15,23,42,.05);
      --shadow-lg: 0 12px 32px rgba(15,23,42,.10), 0 4px 12px rgba(15,23,42,.06);
      --shadow-xl: 0 24px 56px rgba(15,23,42,.12), 0 8px 20px rgba(15,23,42,.07);
      --shadow-teal: 0 8px 24px rgba(13,148,136,.22), 0 2px 8px rgba(13,148,136,.12);
    }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--ivory); }
    ::-webkit-scrollbar-thumb { background: var(--slate-300); border-radius: 3px; }
    .brig { font-family: 'Bricolage Grotesque', sans-serif; }

    /* Cards */
    .card { background: var(--white); border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--shadow-sm); }
    .card-lift { transition: box-shadow 0.25s ease, transform 0.25s ease; }
    .card-lift:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }
    .card-interactive { transition: box-shadow 0.22s ease, transform 0.22s ease, background 0.22s ease; cursor: pointer; }
    .card-interactive:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
    .card-interactive:active { transform: scale(0.99); }

    /* Buttons */
    .btn-primary { background: var(--teal); color: #fff; font-family: 'DM Sans',sans-serif; font-weight: 600; font-size: 14px; padding: 11px 24px; border-radius: 12px; border: none; cursor: pointer; transition: background 0.2s, box-shadow 0.2s, transform 0.15s, opacity 0.2s; letter-spacing: -0.01em; display: inline-flex; align-items: center; gap: 7px; white-space: nowrap; user-select: none; }
    .btn-primary:hover:not(:disabled) { background: var(--teal-dark); box-shadow: var(--shadow-teal); transform: translateY(-1px); }
    .btn-primary:active:not(:disabled) { transform: scale(0.97); box-shadow: none; }
    .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-secondary { background: var(--white); color: var(--slate); font-family: 'DM Sans',sans-serif; font-weight: 500; font-size: 14px; padding: 10px 22px; border-radius: 12px; border: 1.5px solid var(--border-strong); cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 7px; user-select: none; }
    .btn-secondary:hover { border-color: var(--teal); color: var(--teal); background: var(--teal-light); box-shadow: var(--shadow-sm); transform: translateY(-1px); }
    .btn-secondary:active { transform: scale(0.97); }
    .btn-ghost { background: transparent; color: var(--slate-500); font-family: 'DM Sans',sans-serif; font-weight: 500; font-size: 14px; padding: 9px 16px; border-radius: 10px; border: none; cursor: pointer; transition: color 0.18s, background 0.18s, transform 0.15s; display: inline-flex; align-items: center; gap: 6px; user-select: none; }
    .btn-ghost:hover { color: var(--slate); background: var(--slate-100); }
    .btn-ghost:active { transform: scale(0.97); }
    .btn-danger { display: flex; align-items: center; gap: 8px; padding: 10px 22px; background: rgba(220,38,38,.08); border: 1.5px solid rgba(220,38,38,.3); border-radius: 26px; cursor: pointer; color: #DC2626; font-family: 'DM Sans',sans-serif; font-weight: 600; font-size: 14px; transition: all 0.2s; user-select: none; }
    .btn-danger:hover { background: #DC2626; color: #fff; border-color: #DC2626; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(220,38,38,.3); }

    /* Inputs */
    input, select, textarea { background: var(--white); border: 1.5px solid var(--border-strong); color: var(--slate); border-radius: 10px; padding: 10px 14px; width: 100%; font-family: 'DM Sans',sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.2s; box-shadow: var(--shadow-sm); }
    input::placeholder { color: var(--slate-400); }
    input:focus, select:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(13,148,136,.12), var(--shadow-sm); }
    input:disabled { background: var(--slate-50); color: var(--slate-400); cursor: not-allowed; }
    select { appearance: none; cursor: pointer; }
    label { font-size: 11.5px; font-weight: 700; color: var(--slate-600); margin-bottom: 6px; display: block; letter-spacing: 0.05em; text-transform: uppercase; }

    /* Nav */
    .nav-link { font-size: 14px; font-weight: 500; color: var(--slate-500); padding: 6px 13px; border-radius: 8px; cursor: pointer; border: none; background: transparent; transition: color 0.18s, background 0.18s, transform 0.15s; white-space: nowrap; font-family: 'DM Sans',sans-serif; user-select: none; text-decoration: none; display: inline-flex; align-items: center; }
    .nav-link:hover { color: var(--slate); background: var(--slate-100); transform: translateY(-1px); }

    /* Sidebar */
    .sidebar-item { display: flex; align-items: center; gap: 10px; padding: 9px 13px; border-radius: 10px; font-size: 14px; font-weight: 500; color: var(--slate-500); cursor: pointer; transition: all 0.18s; border: none; background: transparent; width: 100%; font-family: 'DM Sans',sans-serif; text-align: left; }
    .sidebar-item:hover { background: var(--slate-100); color: var(--slate); transform: translateX(2px); }
    .sidebar-item.active { background: var(--teal-light); color: var(--teal-dark); font-weight: 600; }
    .sidebar-item.active:hover { transform: none; }

    /* Feature cards — auto-fill equal-height grid adapts to any viewport */
    .feature-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(min(290px,100%),1fr)); gap: 20px; align-items: stretch; }
    .feature-card { padding: 28px; border-radius: 16px; border: 1.5px solid var(--border); background: var(--ivory); transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s, background 0.25s; display: flex; flex-direction: column; height: 100%; }
    .feature-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); background: var(--white); border-color: var(--teal-border-hover); }
    .feature-card .fc-icon { width: 44px; height: 44px; border-radius: 13px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; flex-shrink: 0; border-width: 1px; border-style: solid; transition: transform 0.25s, background 0.25s; }
    .feature-card:hover .fc-icon { transform: scale(1.12) rotate(-3deg); }
    .feature-card h3 { font-family: 'Bricolage Grotesque', sans-serif; font-size: 15.5px; font-weight: 700; color: var(--slate); margin-bottom: 8px; letter-spacing: -0.01em; line-height: 1.25; }
    .feature-card p { font-size: 13.5px; color: var(--slate-500); line-height: 1.7; flex: 1; }

    /* Pricing */
    .pricing-card { border-radius: 20px; padding: 32px 28px; position: relative; transition: transform 0.25s, box-shadow 0.25s; display: flex; flex-direction: column; }
    .pricing-card:hover { transform: translateY(-5px); }
    .pricing-card.hi:hover { box-shadow: 0 32px 72px rgba(15,23,42,.28); }
    .pricing-card:not(.hi):hover { box-shadow: var(--shadow-xl); }

    /* Ticker */
    .ticker-wrap { overflow: hidden; }
    .ticker-track { display: flex; gap: 56px; animation: ticker 28s linear infinite; width: max-content; }
    .ticker-track:hover { animation-play-state: paused; }
    @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

    /* Misc */
    .wave-bar { animation: wave 1.1s ease-in-out infinite; }
    @keyframes wave { 0%,100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
    .float { animation: float-anim 5s ease-in-out infinite; }
    @keyframes float-anim { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    .dot-live { animation: dot-pulse 1.8s ease-in-out infinite; }
    @keyframes dot-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
    .spin { animation: spin-anim 0.9s linear infinite; display: inline-block; }
    @keyframes spin-anim { to { transform: rotate(360deg); } }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
    .skip-link {
      position: fixed;
      top: -48px;
      left: 12px;
      z-index: 160;
      padding: 10px 14px;
      border-radius: 10px;
      background: var(--slate);
      color: #fff;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      transition: top .2s ease;
      box-shadow: var(--shadow-lg);
    }
    .skip-link:focus { top: 12px; }
    .bounce-in { animation: bounceIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) both; }
    @keyframes bounceIn { 0% { transform: scale(0.6); opacity: 0; } 70% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
    /* Extra animations */
    @keyframes shimmer { 0%{background-position:-400px 0;} 100%{background-position:400px 0;} }
    .shimmer-line { background: linear-gradient(90deg, rgba(255,255,255,.04) 25%, rgba(255,255,255,.12) 50%, rgba(255,255,255,.04) 75%); background-size: 400px 100%; animation: shimmer 2.2s linear infinite; }
    @keyframes glow-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(13,148,136,0); } 50% { box-shadow: 0 0 24px 6px rgba(13,148,136,0.22); } }
    .glow-btn:hover { animation: glow-pulse 1.8s ease-in-out infinite; }
    @keyframes slide-up-fade { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    .slide-up { animation: slide-up-fade 0.45s cubic-bezier(0.16,1,0.3,1) both; }
    @keyframes border-spin { to { --angle: 360deg; } }
    @property --angle { syntax:'<angle>'; initial-value:0deg; inherits:false; }
    .live-ring { animation: live-ring-pulse 2.5s ease-in-out infinite; }
    @keyframes live-ring-pulse { 0%,100% { opacity:.5; transform:scale(1); } 50% { opacity:1; transform:scale(1.06); } }

    /* ── New animations ── */
    @keyframes fade-in-up { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    .fade-in-up { animation: fade-in-up 0.55s cubic-bezier(0.16,1,0.3,1) both; }
    .fade-in-up-1 { animation: fade-in-up 0.55s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
    .fade-in-up-2 { animation: fade-in-up 0.55s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
    .fade-in-up-3 { animation: fade-in-up 0.55s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
    .fade-in-up-4 { animation: fade-in-up 0.55s cubic-bezier(0.16,1,0.3,1) 0.4s both; }

    @keyframes scale-in { from { opacity:0; transform:scale(0.88); } to { opacity:1; transform:scale(1); } }
    .scale-in { animation: scale-in 0.45s cubic-bezier(0.16,1,0.3,1) both; }

    @keyframes pulse-ring { 0% { transform:scale(0.95); box-shadow:0 0 0 0 rgba(13,148,136,0.5); } 70% { transform:scale(1); box-shadow:0 0 0 12px rgba(13,148,136,0); } 100% { transform:scale(0.95); } }
    .pulse-ring { animation: pulse-ring 2.2s ease-in-out infinite; }

    @keyframes text-shimmer { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
    .text-shimmer { background: linear-gradient(90deg, var(--teal), var(--teal-mid), #818cf8, var(--teal)); background-size: 300% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: text-shimmer 4s ease infinite; }

    @keyframes tilt-in { from { opacity:0; transform:perspective(600px) rotateX(12deg) translateY(20px); } to { opacity:1; transform:perspective(600px) rotateX(0deg) translateY(0); } }
    .tilt-in { animation: tilt-in 0.6s cubic-bezier(0.16,1,0.3,1) both; }

    @keyframes wiggle { 0%,100%{transform:rotate(0deg);} 25%{transform:rotate(-4deg);} 75%{transform:rotate(4deg);} }
    .wiggle:hover { animation: wiggle 0.4s ease-in-out; }

    /* Stagger children fade-in */
    .stagger > *:nth-child(1) { animation: fade-in-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
    .stagger > *:nth-child(2) { animation: fade-in-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
    .stagger > *:nth-child(3) { animation: fade-in-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.19s both; }
    .stagger > *:nth-child(4) { animation: fade-in-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.26s both; }
    .stagger > *:nth-child(5) { animation: fade-in-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.33s both; }
    .stagger > *:nth-child(6) { animation: fade-in-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.40s both; }

    /* Glowing teal border on focus/active cards */
    @keyframes border-glow { 0%,100%{box-shadow:0 0 0 0 rgba(13,148,136,0);} 50%{box-shadow:0 0 0 4px rgba(13,148,136,0.28), var(--shadow-lg);} }
    .border-glow-active { animation: border-glow 2.5s ease-in-out infinite; }

    /* Grids */
    .step-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(min(200px,100%),1fr)); gap: 20px; }
    .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(min(260px,100%),1fr)); gap: 22px; align-items: stretch; }
    .dash-grid { display: grid; grid-template-columns: 1fr clamp(280px,30%,380px); gap: 24px; }
    .config-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(min(220px,100%),1fr)); gap: 18px; }
    .stats-row { display: flex; gap: clamp(14px,4vw,32px); justify-content: center; flex-wrap: wrap; }
    .report-top { display: grid; grid-template-columns: clamp(200px,27%,280px) 1fr; gap: 20px; }
    .report-mid { display: grid; grid-template-columns: repeat(auto-fit,minmax(min(280px,100%),1fr)); gap: 20px; }

    /* ── Layout utilities ── */
    .hero-pad { padding: clamp(64px,10vh,96px) clamp(20px,5vw,60px) clamp(40px,6vh,64px); }
    .sec-pad { padding: clamp(56px,8vh,96px) clamp(20px,5vw,60px); }
    .dash-main { padding: clamp(72px,10vh,88px) clamp(16px,3vw,40px) clamp(32px,5vh,48px); min-height: 100vh; box-sizing: border-box; }
    .card-constrain { max-width: 900px; margin-left: auto; margin-right: auto; width: 100%; }
    .step-grid > * { display: flex; flex-direction: column; }
    .pricing-grid { align-items: stretch !important; }
    .pricing-card { height: 100%; box-sizing: border-box; }

    @media(max-width:768px){
      .report-top { grid-template-columns: 1fr !important; }
    }
    @media(max-width:480px){
      .config-grid { gap: 12px; }
      .feature-grid { gap: 12px; }
    }

    /* ── Interview room — strict flex column, never scrolls ── */
    /* 100dvh = dynamic viewport height: avoids iOS Safari address-bar overlap */
    .int-room { position: fixed; inset: 0; width: 100vw; height: 100vh; height: 100dvh; display: flex; flex-direction: column; background: var(--slate); color: #fff; overflow: hidden; z-index: 200; }

    /* Desktop top-bar */
    .int-topbar { height:60px; flex-shrink:0; background:rgba(15,23,42,.98); border-bottom:1px solid rgba(255,255,255,.08); display:flex; align-items:center; padding:0 20px; gap:16px; z-index:10; backdrop-filter:blur(12px); overflow:hidden; }
    .int-topbar-logo { display:flex; flex-shrink:0; }
    .int-topbar-persona { display:flex; align-items:center; gap:8px; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); border-radius:22px; padding:5px 13px; flex-shrink:0; white-space:nowrap; }
    .int-topbar-qprog { display:flex; gap:5px; align-items:center; flex-shrink:0; }
    .int-topbar-timer { display:flex; align-items:center; gap:6px; background:rgba(220,38,38,.18); border:1px solid rgba(220,38,38,.35); border-radius:22px; padding:5px 13px; flex-shrink:0; white-space:nowrap; }
    .int-topbar-timer-phase { display:inline; }
    .int-topbar-divider { width:1px; height:20px; background:rgba(255,255,255,.1); flex-shrink:0; margin:0 2px; }
    /* Hide overflow items at narrower widths */
    @media (max-width:1100px) { .int-topbar-persona { display:none; } }
    @media (max-width:860px)  { .int-topbar-qprog   { display:none; } }
    @media (max-width:600px)  { .int-topbar-timer-phase { display:none; } }

    /* Topbar persona-info (emoji + name beside logo) — hide on ≤640 px */
    .int-topbar-persona-info { display:flex; align-items:center; gap:7px; padding-left:4px; border-left:1px solid rgba(255,255,255,.1); margin-left:4px; flex-shrink:0; }
    /* Tab-switcher label text — inline by default, hideable */
    .int-tab-label { display:inline; }
    /* End-button label text — inline by default, hideable */
    .int-end-label { display:inline; }
    /* Timer phase label — visible by default, hidden on narrow screens */
    .int-topbar-timer-phase { display:inline; font-size:10px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; margin-left:2px; }

    /* ── 640 px: slim down topbar to avoid crowding ── */
    @media (max-width:640px) {
      .int-topbar { gap:8px; padding:0 14px; }
      /* Hide logo wordmark, keep the icon square */
      .int-room .int-topbar-logo button > span.brig { display:none; }
      /* Hide persona name + separator */
      .int-topbar-persona-info { display:none; }
    }

    /* ── 520 px: drop tab text labels so buttons become icon-only ── */
    @media (max-width:520px) { .int-tab-label { display:none; } }

    /* Q-progress strip (mobile only, hidden on desktop) */
    .int-qstrip { display:none; }

    .int-body { flex: 1; display: grid; grid-template-columns: 1fr minmax(260px, 300px); gap: 0; min-height: 0; overflow: hidden; }
    .int-main { display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
    .int-video-area { flex: 1; position: relative; min-height: 0; overflow: hidden; }
    .int-captions { height: 192px; flex-shrink: 0; overflow-y: auto; border-top: 1px solid rgba(255,255,255,.07); }
    .int-side { display: flex; flex-direction: column; gap: 0; border-left: 1px solid rgba(255,255,255,.07); overflow: hidden; min-width: 0; }

    /* Mobile bottom control bar (hidden on desktop) */
    .int-mob-bar { display: none; }

    /* ── MEDIUM ≤ 900px — narrower sidebar ── */
    @media (max-width: 900px) {
      .int-body { grid-template-columns: 1fr minmax(220px, 260px); }
    }

    /* ── TABLET ≤ 768px — hide sidebar ── */
    @media (max-width: 768px) {
      .int-body { grid-template-columns: 1fr; }
      .int-side { display: none; }
      .int-mob-bar {
        display: flex; align-items: center; justify-content: space-around;
        padding: 10px 20px 12px; gap: 10px;
        background: rgba(15,23,42,.97); border-top: 1px solid rgba(255,255,255,.08);
        flex-shrink: 0;
      }
    }

    /* ── PHONE ≤ 480px — compact everything ── */
    @media (max-width: 480px) {
      /* Slim topbar to 48px; hide persona pill + Q dots; keep logo icon visible */
      .int-topbar { height: 48px; padding: 0 12px; gap: 6px; }
      /* Logo wordmark already hidden at 640px — keep the icon always visible */
      .int-topbar-logo { display: flex; flex-shrink: 0; }
      .int-topbar-persona { display: none; }
      .int-topbar-qprog { display: none; }
      .int-topbar-timer { padding: 4px 8px; gap: 5px; }
      /* Hide the dividers on very small screens to save space */
      .int-topbar-divider { display: none; }

      /* Show the slim Q-progress strip below topbar */
      .int-qstrip {
        display: flex; height: 32px; align-items: center; justify-content: center;
        gap: 8px; padding: 0 16px; background: rgba(0,0,0,.25); flex-shrink: 0;
        border-bottom: 1px solid rgba(255,255,255,.05);
      }

      /* Captions shorter on phone */
      .int-captions { height: 140px !important; }

      /* Slightly bigger safe-area bottom padding for notched phones */
      .int-mob-bar {
        padding: 10px 16px env(safe-area-inset-bottom,10px);
        gap: 8px;
      }

      /* Hide "End" text so only the icon remains */
      .int-end-label { display: none; }
      /* Tighten End button padding to icon-only size */
      .int-room .btn-danger { padding: 8px 10px; }
    }

    /* ── VERY SMALL PHONE ≤ 360px — ultra-compact topbar ── */
    @media (max-width: 360px) {
      .int-topbar { padding: 0 8px; gap: 4px; }
      .int-topbar-timer { padding: 4px 6px; gap: 4px; }
      .int-room .btn-danger { padding: 6px 8px; }
    }

    /* ── LANDSCAPE PHONE / SHORT VIEWPORT ── */
    /* When height < 500 px (landscape phones, small embeds) reduce vertical chrome */
    /* These rules come after the 480px block in source so cascade order takes care of
       non-!important overrides; !important is only kept where the phone block already
       uses it on the same property. */
    @media (max-height: 500px) {
      .int-topbar { height: 44px; }
      /* Hide Q-strip — cascade order wins over the 480px display:flex rule */
      .int-qstrip { display: none; }
      /* Shrink captions so the video area always gets meaningful space.
         Must use !important to beat the 480px block which already uses !important. */
      .int-captions { height: 80px !important; }
      .int-mob-bar { padding: 6px 16px env(safe-area-inset-bottom, 6px); }
    }
    @media (max-height: 380px) {
      /* Very short (e.g., old landscape phones): shrink captions further */
      .int-captions { height: 56px !important; }
      .int-mob-bar { padding: 4px 12px env(safe-area-inset-bottom, 4px); }
    }

    @media (max-width: 1024px) {
      .dash-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) {
      .nav-links-desk { display: none !important; }
      .hamburger { display: flex !important; }
      .sidebar-desk { display: none !important; }
      .dash-main { padding: clamp(72px,10vh,88px) 18px clamp(32px,5vh,48px) !important; }
      .hero-mock-side { display: none !important; }
      .hero-preview { display: none !important; }
      .hero-quick-links { display: none !important; }
    }
    @media (max-width: 480px) {
      .wl-row { flex-direction: column; }
      .wl-row button { width: 100%; justify-content: center; }
      .stats-row { gap: 10px !important; margin-top: 22px !important; }
    }
    /* ── Hero section: compact vertical spacing on short screens (e.g. 1366×768 laptops)
       so the interview mock preview stays visible above the fold ── */
    @media (max-height: 880px) and (min-width: 769px) {
      .stats-row  { margin-top: 24px !important; }
      .hero-preview { margin-top: 28px !important; }
    }
    /* Hide the interview preview entirely on very short landscape screens */
    @media (max-height: 680px) and (min-width: 769px) {
      .hero-preview { display: none !important; }
    }
    :focus-visible { outline: 2px solid var(--teal); outline-offset: 2px; border-radius: 4px; }

    /* ── Responsive report/history table rows ── */
    /* Desktop: grid row; Mobile: card stack */
    .rpt-row-header { display:grid; grid-template-columns:1fr minmax(120px,180px) 90px 80px 36px; padding:8px 22px; border-bottom:1px solid var(--border); background:var(--slate-50); }
    .rpt-row { display:grid; grid-template-columns:1fr minmax(120px,180px) 90px 80px 36px; align-items:center; padding:13px 22px; cursor:pointer; transition:background 0.18s; }
    .rpt-row:hover { background:var(--slate-50); }
    .rpt-cell-hide-mob { }   /* visible on all breakpoints */
    @media (max-width:640px) {
      .rpt-row-header { display:none; }
      .rpt-row { display:flex; flex-direction:column; align-items:stretch; padding:14px 18px; gap:6px; }
      .rpt-cell-hide-mob { display:none; }
      .rpt-mob-score { display:inline-flex !important; }
      .rpt-mob-persona { display:block !important; font-size:11px; }
    }

    /* Progress history mini-table */
    .phist-row { display:grid; grid-template-columns:1fr 160px 80px 80px; align-items:center; padding:12px 22px; transition:background 0.15s; }
    .phist-hdr  { display:grid; grid-template-columns:1fr 160px 80px 80px; padding:8px 22px; border-bottom:1px solid var(--border); background:var(--slate-50); }
    @media (max-width:640px) {
      .phist-hdr  { display:none; }
      .phist-row  { display:flex; flex-direction:column; align-items:stretch; padding:12px 16px; gap:4px; }
      .phist-desk { display:none !important; }
      .phist-mob-sub { display:block !important; }
    }
    .phist-mob-sub { display:none; }

    /* Report page action buttons: full-width on mobile */
    .report-actions { display:flex; gap:12px; margin-top:20px; flex-wrap:wrap; }
    @media (max-width:480px) { .report-actions button { flex:1 1 100%; justify-content:center; } }

    /* Share modal */
    .share-link-box { display:flex; gap:8px; align-items:center; background:var(--slate-50); border:1.5px solid var(--border); border-radius:10px; padding:10px 14px; font-family:'DM Sans',sans-serif; font-size:13px; color:var(--slate-600); overflow:hidden; }

    /* Countdown overlay */
    @keyframes countdown-shrink { from { stroke-dashoffset:0; } to { stroke-dashoffset:188; } }
    @keyframes countdown-pop { 0%{transform:scale(0.4);opacity:0;} 60%{transform:scale(1.1);} 100%{transform:scale(1);opacity:1;} }

    /* Tip card */
    .tip-card { background:linear-gradient(135deg,#0F172A,#1E293B); border:1px solid rgba(255,255,255,.08); border-radius:16px; padding:20px 22px; position:relative; overflow:hidden; }
    .tip-card::before { content:''; position:absolute; top:-40px; right:-40px; width:140px; height:140px; background:radial-gradient(circle,rgba(13,148,136,.35) 0%,transparent 70%); pointer-events:none; }

    /* Quick-start preset buttons */
    .preset-btn { flex:1; min-width:130px; padding:11px 14px; background:var(--white); border:1.5px solid var(--border); border-radius:12px; cursor:pointer; transition:all 0.2s; font-family:'DM Sans',sans-serif; display:flex; flex-direction:column; align-items:flex-start; gap:3px; }
    .preset-btn:hover { border-color:var(--teal); background:var(--teal-light); transform:translateY(-2px); box-shadow:var(--shadow-md); }
    @media (max-width:480px) { .preset-btn { min-width:0; flex:1 1 calc(50% - 6px); } }

    /* Keyboard shortcut badge */
    .kbd { display:inline-flex; align-items:center; justify-content:center; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.18); border-radius:5px; padding:1px 6px; font-size:10px; font-weight:700; color:rgba(255,255,255,.6); font-family:'DM Sans',sans-serif; letter-spacing:0.02em; line-height:1.5; }

    /* ── Testimonials grid ── */
    .testi-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr)); gap:22px; }
    @media(max-width:640px){ .testi-grid { gap:14px; } }

    /* ── FAQ accordion ── */
    .faq-item { border-bottom:1px solid var(--border); }
    .faq-item:last-child { border-bottom:none; }
    .faq-btn { width:100%; text-align:left; background:none; border:none; cursor:pointer; padding:20px 0; display:flex; justify-content:space-between; align-items:center; gap:16px; font-family:'DM Sans',sans-serif; }
    .faq-btn:hover .faq-chevron { color:var(--teal); transform:scale(1.15); }
    .faq-chevron { transition:transform 0.25s, color 0.2s; color:var(--slate-400); flex-shrink:0; }

    /* ── Footer ── */
    .footer-grid { display:grid; grid-template-columns:2fr repeat(4,1fr); gap:clamp(28px,4vw,48px); padding:clamp(40px,8vh,64px) clamp(20px,5vw,60px) 40px; max-width:1200px; margin:0 auto; }
    .footer-link-group { display:flex; flex-direction:column; gap:8px; align-items:flex-start; }
    .footer-link { font-size:13.5px; color:rgba(255,255,255,.72); background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.12); cursor:pointer; padding:7px 12px; display:inline-flex; align-items:center; text-align:left; font-family:'DM Sans',sans-serif; transition:color 0.18s, background 0.18s, border-color 0.18s, transform 0.18s, box-shadow 0.18s; border-radius:999px; width:fit-content; text-decoration:none; }
    .footer-link:hover { color:#fff; background:rgba(13,148,136,.22); border-color:rgba(45,212,191,.56); transform:translateY(-1px); box-shadow:0 4px 14px rgba(13,148,136,.2); }
    .footer-link:focus-visible { outline:2px solid rgba(45,212,191,.75); outline-offset:2px; }
    .footer-social { width:36px; height:36px; border-radius:9px; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); display:inline-flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.2s; color:rgba(255,255,255,.5); }
    .footer-social:hover { background:rgba(13,148,136,.25); border-color:rgba(13,148,136,.5); color:var(--teal-mid); transform:translateY(-2px); }
    @media(max-width:1100px){ .footer-grid { grid-template-columns:1fr 1fr 1fr; gap:32px; } }
    @media(max-width:900px){ .footer-grid { grid-template-columns:1fr 1fr; gap:36px; } }
    @media(max-width:580px){ .footer-grid { grid-template-columns:1fr; gap:28px; padding:48px 20px 32px; } }

    /* ── Score counter animation ── */
    @keyframes score-pop { 0%{transform:scale(0.75);opacity:0;} 75%{transform:scale(1.06);} 100%{transform:scale(1);opacity:1;} }
    .score-pop { animation:score-pop 0.65s cubic-bezier(0.175,0.885,0.32,1.275) both; }

    /* ── Interview room notes textarea ── */
    .int-notes { resize:none; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:10px; color:rgba(255,255,255,.8); font-size:11.5px; padding:9px 12px; width:100%; font-family:'DM Sans',sans-serif; outline:none; line-height:1.6; transition:border-color 0.2s, box-shadow 0.2s; }
    .int-notes::placeholder { color:rgba(255,255,255,.22); }
    .int-notes:focus { border-color:rgba(13,148,136,.55); box-shadow:0 0 0 3px rgba(13,148,136,.12); background:rgba(255,255,255,.08); }

    /* ── Streak badge ── */
    .streak-badge { background:linear-gradient(135deg,rgba(217,119,6,.18),rgba(251,191,36,.1)); border:1px solid rgba(217,119,6,.32); border-radius:12px; padding:11px 14px; }

    /* ── pf-outer layout (Persona Feature block in Landing) ── */
    .pf-outer { display:grid; grid-template-columns:1fr clamp(180px,22%,230px); gap:40px; padding:40px 44px; align-items:center; position:relative; z-index:1; }
    .pf-right { display:flex; flex-direction:column; gap:9px; }
    @media(max-width:900px){ .pf-outer{ grid-template-columns:1fr; gap:0; padding:32px 28px; } .pf-right{ display:none; } }
    @media(max-width:580px){ .pf-outer{ padding:26px 20px; } }

    /* ── Hero preview mock: inner grid collapses on medium screens ── */
    .hero-preview-mock-grid { display:grid; grid-template-columns:2fr 1fr; }
    @media(max-width:900px){ .hero-preview-mock-grid { grid-template-columns:1fr; } .hero-preview-mock-side { display:none; } }

    /* ── Code editor panel responsive grid ── */
    .code-panel-grid { display:grid; grid-template-columns:clamp(260px,30%,340px) 1fr; flex:1; min-height:0; overflow:hidden; height:100%; width:100%; }
    /* On mobile the grid stacks; cap the question panel at 40 % of the available
       height so the code editor always gets meaningful vertical space. */
    @media(max-width:768px){ .code-panel-grid { grid-template-columns:1fr; grid-template-rows:40% 1fr; } }

    /* ── Code toolbar: wraps lang-selector and run/submit on narrow screens ── */
    .code-toolbar { display:flex; align-items:center; column-gap:10px; flex-shrink:0; padding:10px 16px; border-bottom:1px solid rgba(255,255,255,.07); background:rgba(0,0,0,.15); flex-wrap:wrap; }
    @media(max-width:600px) {
      /* Tighten vertical padding */
      .code-toolbar { padding:8px 12px !important; row-gap:6px; }
      /* Language buttons row: stretch to full width */
      .code-toolbar > div:nth-child(1) { flex:0 0 100%; }
      /* Flex-1 spacer: not needed when toolbar wraps */
      .code-toolbar > div:nth-child(2) { display:none; }
      /* "N lines" counter: hide on mobile to save space */
      .code-toolbar > span { display:none; }
      /* Run / Submit buttons: split remaining width equally */
      .code-toolbar > button { flex:1; justify-content:center; }
    }

    /* ── Monthly progress bar chart ── */
    .mth-bar { flex:1; display:flex; flex-direction:column; align-items:center; gap:6px; cursor:default; }
    .mth-bar:hover .mth-fill { filter:brightness(1.12); }
    .mth-fill { width:100%; border-radius:6px; transition:filter 0.2s; }

    /* ── Interview Loading Screen (redesigned) ── */
    .il-wrap { position:fixed; inset:0; background:#080D18; z-index:300; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:'DM Sans',system-ui,sans-serif; }
    .il-bg { position:absolute; inset:0; overflow:hidden; pointer-events:none; }
    .il-glow-c { position:absolute; top:30%; left:50%; transform:translate(-50%,-50%); border-radius:50%; background:radial-gradient(circle,rgba(13,148,136,.22) 0%,transparent 65%); filter:blur(80px); width:min(720px,120vw); height:min(720px,120vw); }
    .il-glow-br { position:absolute; bottom:10%; right:5%; width:min(280px,50vw); height:min(280px,50vw); border-radius:50%; background:radial-gradient(circle,rgba(124,58,237,.15) 0%,transparent 70%); filter:blur(60px); }
    .il-glow-tl { position:absolute; top:5%; left:5%; width:min(200px,35vw); height:min(200px,35vw); border-radius:50%; background:radial-gradient(circle,rgba(13,148,136,.1) 0%,transparent 70%); filter:blur(50px); }
    .il-logo { position:absolute; top:clamp(16px,4vh,28px); left:clamp(16px,4vw,28px); z-index:2; }
    .il-content { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; width:100%; max-width:min(440px,90vw); padding:0 clamp(16px,5vw,24px); gap:clamp(14px,3.5vh,26px); }
    .il-avatar-wrap { position:relative; display:flex; align-items:center; justify-content:center; }
    .il-ring { position:absolute; border-radius:50%; }
    .il-name { font-family:'Bricolage Grotesque',sans-serif; font-size:clamp(19px,4.5vw,25px); font-weight:800; color:#fff; letter-spacing:-0.025em; margin:0 0 5px; text-align:center; }
    .il-sub { font-size:clamp(11px,2.5vw,13px); color:rgba(255,255,255,.38); display:flex; align-items:center; justify-content:center; gap:6px; }
    .il-dot { color:rgba(255,255,255,.18); }
    .il-status { font-size:clamp(12.5px,2.5vw,14.5px); color:rgba(255,255,255,.52); text-align:center; min-height:1.6em; margin:0; }
    .il-progress-wrap { width:100%; }
    .il-track { width:100%; height:4px; background:rgba(255,255,255,.07); border-radius:4px; overflow:hidden; }
    .il-fill { height:100%; background:linear-gradient(90deg,var(--teal-dark),var(--teal-mid),rgba(45,212,191,.85)); border-radius:4px; box-shadow:0 0 10px rgba(13,148,136,.6); position:relative; overflow:hidden; transition:width .09s linear; }
    .il-fill::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,rgba(255,255,255,.02) 25%,rgba(255,255,255,.14) 50%,rgba(255,255,255,.02) 75%); background-size:280px 100%; animation:shimmer 1.6s linear infinite; }
    .il-pct { font-size:11px; font-weight:600; font-family:'JetBrains Mono',monospace; color:rgba(255,255,255,.32); margin-top:8px; text-align:right; }
    .il-kbd-row { position:absolute; bottom:clamp(14px,3vh,28px); left:0; right:0; display:flex; gap:clamp(14px,3vw,24px); align-items:center; justify-content:center; flex-wrap:wrap; padding:0 24px; }
    .il-kbd-tip { display:flex; align-items:center; gap:7px; font-size:12px; color:rgba(255,255,255,.3); white-space:nowrap; }
    .il-kbd { background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.15); border-radius:5px; padding:2px 9px; font-size:11px; font-family:'JetBrains Mono',monospace; color:rgba(255,255,255,.5); line-height:1.7; }
    @media(max-width:480px){ .il-kbd-row { display:none; } }
    @media(max-width:360px){ .il-content { gap:12px; } }
  `}</style>
);

const COMPANIES = [
  { name: "Google", abbr: "G", bg: "#E8F0FE", fg: "#1A73E8" },
  { name: "Amazon", abbr: "A", bg: "#FFF3E0", fg: "#FF9900" },
  { name: "Apple", abbr: "⌂", bg: "#F5F5F7", fg: "#1D1D1F" },
  { name: "Microsoft", abbr: "Ms", bg: "#E8F4FD", fg: "#00BCF2" },
  { name: "Meta", abbr: "M", bg: "#E7F3FF", fg: "#0081FB" },
  { name: "Deloitte", abbr: "D", bg: "#F1F9E8", fg: "#86BC25" },
  { name: "McKinsey", abbr: "Mc", bg: "#E8EAF6", fg: "#1A237E" },
  { name: "Goldman", abbr: "GS", bg: "#E8F0F9", fg: "#1E5799" },
  { name: "Stripe", abbr: "S", bg: "#F0EEFF", fg: "#635BFF" },
  { name: "Airbnb", abbr: "Ai", bg: "#FFF0F0", fg: "#FF5A5F" },
  { name: "Netflix", abbr: "N", bg: "#FFF0F0", fg: "#E50914" },
  { name: "Spotify", abbr: "Sp", bg: "#EDFAEE", fg: "#1DB954" },
];

const PERSONAS = [
  {
    id: 1, tier: "starter",
    title: "The Friendly Peer",
    emoji: "😄",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80&utm_source=placementdo&utm_medium=referral",
    avatarAlt: "Professional headshot of a friendly young interviewer",
    handle: "@jordan",
    vibe: "A young, upbeat interviewer who treats it like a casual coffee chat — dangerously easy to overshare with.",
    style: "Conversational · Disarmingly warm",
    difficulty: "Deceptive",
    diffColor: "var(--amber)",
    diffBg: "var(--amber-light)",
    accentColor: "#D97706",
    gradientFrom: "#FEF3C7",
    gradientTo: "#FDE68A",
    traits: ["Casual language", "Encourages tangents", "Rewards self-awareness"],
  },
  {
    id: 2, tier: "pro",
    title: "The Empathetic Listener",
    emoji: "🌸",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80&utm_source=placementdo&utm_medium=referral",
    avatarAlt: "Professional portrait of a calm empathetic interviewer",
    handle: "@maya",
    vibe: "Soft-spoken and patient, she gives you all the space in the world — then quietly dismantles your emotional intelligence.",
    style: "Reflective · Deep EQ probing",
    difficulty: "Medium",
    diffColor: "#0369A1",
    diffBg: "#E0F2FE",
    accentColor: "#0369A1",
    gradientFrom: "#E0F2FE",
    gradientTo: "#BAE6FD",
    traits: ["Long silences", "Values nuance", "Probes self-awareness"],
  },
  {
    id: 3, tier: "pro",
    title: "The Stress-Tester",
    emoji: "⚡",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=320&q=80&utm_source=placementdo&utm_medium=referral",
    avatarAlt: "Portrait of a serious interviewer with a direct expression",
    handle: "@rex",
    vibe: "Rapid-fire questions, intentional interruptions, and barely-concealed skepticism — engineered to make you crack.",
    style: "Aggressive · High-velocity",
    difficulty: "Brutal",
    diffColor: "var(--red)",
    diffBg: "var(--red-light)",
    accentColor: "#DC2626",
    gradientFrom: "#FEE2E2",
    gradientTo: "#FECACA",
    traits: ["Interrupts mid-answer", "Challenges every claim", "Zero encouragement"],
  },
  {
    id: 4, tier: "elite",
    title: "The Stoic Veteran",
    emoji: "🗿",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=320&q=80&utm_source=placementdo&utm_medium=referral",
    avatarAlt: "Portrait of an experienced interviewer with a stoic expression",
    handle: "@harold",
    vibe: "Decades of experience, a face carved from stone, and a silence after your answer that lasts exactly three beats too long.",
    style: "Expressionless · Unreadable",
    difficulty: "Psychological",
    diffColor: "var(--slate-600)",
    diffBg: "var(--slate-100)",
    accentColor: "#475569",
    gradientFrom: "#F1F5F9",
    gradientTo: "#E2E8F0",
    traits: ["Zero facial feedback", "Minimal follow-ups", "Tests composure"],
  },
  {
    id: 5, tier: "elite",
    title: "The Devil's Advocate",
    emoji: "🎭",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=320&q=80&utm_source=placementdo&utm_medium=referral",
    avatarAlt: "Portrait of an interviewer with an analytical challenging demeanor",
    handle: "@victor",
    vibe: "Disagrees with everything you say on principle — forcing you to defend your reasoning under sustained intellectual pressure.",
    style: "Contrarian · Logic-stress",
    difficulty: "Hard",
    diffColor: "var(--purple)",
    diffBg: "var(--purple-light)",
    accentColor: "#7C3AED",
    gradientFrom: "#EDE9FE",
    gradientTo: "#DDD6FE",
    traits: ["Rejects first answers", "Demands quantified claims", "Probes edge cases"],
  },
  {
    id: 6, tier: "elite",
    title: "The Silent Analyst",
    emoji: "🔍",
    avatarUrl: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=320&q=80&utm_source=placementdo&utm_medium=referral",
    avatarAlt: "Portrait of a focused interviewer taking analytical notes",
    handle: "@dr_chen",
    vibe: "Types notes constantly, asks one forensic question at a time, and lets silence do most of the heavy lifting.",
    style: "Clinical · Methodical",
    difficulty: "Hard",
    diffColor: "var(--green)",
    diffBg: "var(--green-light)",
    accentColor: "#16A34A",
    gradientFrom: "#DCFCE7",
    gradientTo: "#BBF7D0",
    traits: ["Hyper-specific questions", "Laser focus on inconsistencies", "Values precision"],
  },
];

const QUESTIONS = [
  "Tell me about yourself and your motivation for this particular role.",
  "Describe a significant technical challenge you've faced and how you resolved it.",
  "Design a distributed caching system that handles 10 million requests per second.",
  "How do you approach working with ambiguous requirements from stakeholders?",
  "Walk me through a project where you had to make a difficult technical trade-off.",
];

const PLANS = [
  { name: "Starter", price: "$1", old: null, hi: false, tagline: "Try it risk-free", features: ["1 Full Interview", "1 Detailed Report", "Any language", "Any field or company", "Standard scoring", "Choose ANY 1 Interviewer Persona"] },
  { name: "Pro", price: "$39.99", old: "$50", hi: true, tagline: "Most popular · Save 20%", features: ["40 Interviews", "40 Full Reports", "AI Assistance Mode", "Multi-language support", "10 Report rechecks", "Choose ANY 3 Interviewer Personas"] },
  { name: "Elite", price: "$89.99", old: "$120", hi: false, tagline: "Best value · Save 25%", features: ["100 Interviews", "100 Full Reports", "AI Assistance Mode", "All 28 languages", "30 Report rechecks", "Access to ALL Interviewer Personas", "Priority support"] },
];

/* ── Atoms ── */
const Logo = ({ onClick, light = false }) => (
  <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 9, background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}>
    <div style={{ width: 34, height: 34, borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)", display: "block", transition: "transform 0.2s, box-shadow 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "var(--shadow-teal)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
      <img
        src="/apple-touch-icon.png"
        alt="PlacementDo logo"
        loading="eager"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
    <span className="brig" style={{ fontSize: 19, fontWeight: 700, color: light ? "#ffffff" : "var(--slate)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
      Placement<span style={{ color: light ? "var(--teal-mid)" : "var(--teal)" }}>Do</span>
    </span>
  </button>
);

const PersonaAvatar = ({ persona, size = 40, borderWidth = 2, shadow = false }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const avatarSize = typeof size === "number" ? `${size}px` : size;
  const showImage = Boolean(persona?.avatarUrl) && !imgFailed;

  return (
    <div
      style={{
        width: avatarSize,
        height: avatarSize,
        borderRadius: "50%",
        overflow: "hidden",
        border: `${borderWidth}px solid ${(persona?.accentColor || "#94A3B8")}30`,
        background: `linear-gradient(135deg,${persona?.gradientFrom || "#E2E8F0"},${persona?.gradientTo || "#CBD5E1"})`,
        boxShadow: shadow ? `0 4px 14px ${(persona?.accentColor || "#94A3B8")}20` : undefined,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {showImage ? (
        <img
          src={persona.avatarUrl}
          alt={persona?.avatarAlt || persona?.title || "Interviewer portrait"}
          loading="eager"
          onError={() => setImgFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <span
          role="img"
          aria-label={persona?.title || "Interviewer avatar"}
          style={{ fontSize: "clamp(12px,2vw,22px)", lineHeight: 1 }}
        >
          {persona?.emoji || "👤"}
        </span>
      )}
    </div>
  );
};

const Tag = ({ children, color = "teal", size = "sm" }) => {
  const P = { teal: { bg: "var(--teal-light)", color: "var(--teal-dark)" }, amber: { bg: "var(--amber-light)", color: "var(--amber)" }, green: { bg: "var(--green-light)", color: "var(--green)" }, red: { bg: "var(--red-light)", color: "var(--red)" }, slate: { bg: "var(--slate-100)", color: "var(--slate-700)" }, purple: { bg: "var(--purple-light)", color: "var(--purple)" } };
  const p = P[color] || P.teal;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: p.bg, color: p.color, fontSize: size === "xs" ? 11 : 12, fontWeight: 600, padding: size === "xs" ? "3px 9px" : "4px 12px", borderRadius: 20, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>{children}</span>;
};

const MetricBar = ({ label, value, color, delay = 0 }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
      <span style={{ fontSize: 13.5, color: "var(--slate-700)", fontWeight: 500 }}>{label}</span>
      <span className="brig" style={{ fontSize: 13, fontWeight: 700, color }}>{value}</span>
    </div>
    <div style={{ height: 6, background: "var(--slate-100)", borderRadius: 4, overflow: "hidden" }}>
      <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay }} style={{ height: "100%", background: color, borderRadius: 4 }} />
    </div>
  </div>
);

/* ── Waitlist Thanks Modal ── */
const WaitlistThanksModal = ({ email, onClose }) => {
  useEffect(() => {
    const handler = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(15,23,42,0.7)",
        backdropFilter: "blur(10px)",
        zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--white)", borderRadius: 24,
          maxWidth: 480, width: "100%",
          padding: "40px 36px 32px",
          boxShadow: "0 40px 100px rgba(15,23,42,.4)",
          position: "relative", textAlign: "center",
        }}
      >
        {/* × close */}
        <button
          aria-label="Close modal"
          onClick={onClose}
          style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", cursor: "pointer", color: "var(--slate-400)", padding: 6, borderRadius: 8, display: "flex", transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--slate-600)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--slate-400)"}
        >
          <X size={18} />
        </button>

        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 320, damping: 16 }}
          style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--teal), var(--teal-mid))",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 28px rgba(13,148,136,.45)",
            margin: "0 auto 20px",
          }}
        >
          <Check size={32} color="#fff" strokeWidth={3} />
        </motion.div>

        {/* Headline */}
        <div className="brig" style={{ fontSize: 24, fontWeight: 800, color: "var(--slate)", marginBottom: 10, letterSpacing: "-0.02em" }}>
          You're on the list! 🎉
        </div>

        {/* Subtext */}
        <p style={{ fontSize: 15, color: "var(--slate-500)", lineHeight: 1.65, marginBottom: 28 }}>
          Thanks for joining! We'll be in touch at{" "}
          <strong style={{ color: "var(--slate-700)" }}>{email}</strong>{" "}
          when we launch. Expect early access + a 30% discount.
        </p>

        {/* Got it button */}
        <button
          aria-label="Close confirmation and return to form"
          onClick={onClose}
          className="btn-primary"
          style={{ width: "100%", fontSize: 15, padding: "13px 24px", borderRadius: 13, justifyContent: "center" }}
        >
          Got it
        </button>
      </motion.div>
    </motion.div>
  );
};

/* ── Waitlist Form + Popup ── */
const WaitlistForm = ({ size="lg", dark=false }) => {
  const [email,          setEmail]          = useState("");
  const [errMsg,         setErrMsg]         = useState("");
  const [submitted,      setSubmitted]      = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const lg = size === "lg";

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email.trim() || !validate(email)) {
      setErrMsg("⚠️ Please enter a valid email address.");
      return;
    }

    setErrMsg("");
    setLoading(true);
    const captured = email.trim();
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: captured }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrMsg(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmittedEmail(captured);
      setEmail("");
      setSubmitted(true);
    } catch (err) {
      console.error("Waitlist submission error:", err);
      setErrMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

const handleClose = () => { setSubmitted(false); setSubmittedEmail(""); };

return (
  <>
    <AnimatePresence>
      {submitted && <WaitlistThanksModal key="thanks-modal" email={submittedEmail} onClose={handleClose} />}
    </AnimatePresence>
    <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 520 }} noValidate>
      <div className="wl-row" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: dark ? "rgba(255,255,255,0.4)" : errMsg ? "var(--red)" : "var(--slate-400)", pointerEvents: "none", zIndex: 1 }} />
          <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrMsg(""); }} disabled={loading} placeholder="your@email.com"
            style={{ paddingLeft: 40, fontSize: lg ? 15 : 14, padding: lg ? "14px 14px 14px 40px" : "11px 12px 11px 38px", borderRadius: 13, background: dark ? "rgba(255,255,255,0.09)" : "var(--white)", border: errMsg ? "1.5px solid var(--red)" : dark ? "1.5px solid rgba(255,255,255,0.18)" : "1.5px solid var(--border-strong)", color: dark ? "#fff" : "var(--slate)", transition: "all 0.2s ease" }} />
        </div>
        <button type="submit" className="btn-primary pulse-ring" disabled={loading} style={{ fontSize: lg ? 15 : 14, padding: lg ? "14px 28px" : "11px 20px", borderRadius: 13, minWidth: 148, justifyContent: "center" }}>
          {loading ? <><span className="spin"><RefreshCw size={15} /></span> Submitting…</> : <><Bell size={15} /> Notify Me</>}
        </button>
      </div>
      {errMsg && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
          <AlertTriangle size={13} style={{ color: "var(--red)", flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: dark ? "#FCA5A5" : "var(--red)", fontWeight: 500 }}>{errMsg}</span>
        </div>
      )}
    </form>
  </>
);
};

/* ── Checkout Modal ── */
const CheckoutModal = ({ plan, onClose }) => {
  const [step, setStep] = useState("redirect");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [showComingSoon, setShowComingSoon] = useState(false);
  const cardInputRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setStep("form"), 1800); return () => clearTimeout(t); }, []);

  const PX = { Starter: "$1.00", Pro: "$39.99", Elite: "$89.99" };
  const PLAN_DETAILS = {
    Starter: { sessions: "1 Interview", features: ["1 Full Report", "Any language", "Any company", "Standard scoring"] },
    Pro: { sessions: "40 Interviews", features: ["40 Full Reports", "AI Assistance Mode", "10 Report rechecks", "3 Interviewer Personas"] },
    Elite: { sessions: "100 Interviews", features: ["100 Full Reports", "AI Assistance Mode", "30 Report rechecks", "All 6 Personas", "Priority support"] },
  };
  const pd = PLAN_DETAILS[plan] || PLAN_DETAILS.Pro;

  const getCardBrand = num => {
    const n = num.replace(/\s/g, "");
    if (/^4/.test(n)) return "visa";
    if (/^5[1-5]/.test(n)) return "mc";
    return null;
  };
  const brand = getCardBrand(cardNum);

  const formatCard = v => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = v => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length >= 3 ? d.slice(0, 2) + " / " + d.slice(2) : d; };

  const validate = () => {
    const e = {};
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Valid email required";
    if (cardNum.replace(/\s/g, "").length < 16) e.card = "Enter full 16-digit card number";
    if (expiry.replace(/\D/g, "").length < 4) e.expiry = "Enter MM / YY";
    if (cvc.replace(/\D/g, "").length < 3) e.cvc = "3-digit CVC required";
    return e;
  };

  const handlePay = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setShowComingSoon(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.65)", backdropFilter: "blur(10px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: "var(--white)", borderRadius: 24, maxWidth: 520, width: "100%", boxShadow: "0 40px 100px rgba(15,23,42,.3)", position: "relative", maxHeight: "92vh", overflowY: "auto" }}>

        {/* Close button */}
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%", border: "1px solid var(--border)", background: "var(--slate-50)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--slate-500)", zIndex: 10, transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--slate-100)"; e.currentTarget.style.transform = "scale(1.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--slate-50)"; e.currentTarget.style.transform = ""; }}>
          <X size={14} />
        </button>

        <AnimatePresence mode="wait">

          {/* ── Redirect step ── */}
          {step === "redirect" && (
            <motion.div key="r" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}
              style={{ textAlign: "center", padding: "56px 40px 48px" }}>
              <div style={{ width: 72, height: 72, borderRadius: 20, background: "var(--teal-light)", border: "1px solid rgba(13,148,136,.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <span className="spin"><RefreshCw size={32} style={{ color: "var(--teal)" }} /></span>
              </div>
              <h2 className="brig" style={{ fontSize: 22, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.02em", marginBottom: 10 }}>Preparing secure checkout…</h2>
              <p style={{ fontSize: 14, color: "var(--slate-500)", lineHeight: 1.65, marginBottom: 24 }}>
                Setting up checkout for the <strong style={{ color: "var(--slate)" }}>{plan} Plan</strong>.<br />Protected with 256-bit SSL encryption.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                {[0, .2, .4].map((d, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--teal)", animation: `dot-pulse 1.4s ease-in-out ${d}s infinite` }} />)}
              </div>
            </motion.div>
          )}

          {/* ── Payment form ── */}
          {step === "form" && !showComingSoon && (
            <motion.div key="f" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
              {/* Header */}
              <div style={{ padding: "24px 28px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CreditCard size={20} style={{ color: "var(--teal)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="brig" style={{ fontSize: 17, fontWeight: 700, color: "var(--slate)" }}>Secure Checkout</div>
                  <div style={{ fontSize: 12, color: "var(--slate-400)", marginTop: 2 }}>🔒 Powered by Stripe · 256-bit SSL</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="brig" style={{ fontSize: 26, fontWeight: 800, color: "var(--slate)", letterSpacing: "-0.03em" }}>{PX[plan]}</div>
                  <div style={{ fontSize: 11, color: "var(--slate-400)", marginTop: 1 }}>One-time · No auto-renew</div>
                </div>
              </div>

              <div style={{ padding: "22px 28px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Plan summary */}
                <div style={{ background: "linear-gradient(135deg,var(--teal-light),rgba(204,251,241,.3))", border: "1.5px solid rgba(13,148,136,.25)", borderRadius: 14, padding: "14px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div>
                      <div className="brig" style={{ fontSize: 14, fontWeight: 700, color: "var(--slate)" }}>PlacementDo {plan}</div>
                      <div style={{ fontSize: 12, color: "var(--teal-dark)", fontWeight: 600, marginTop: 1 }}>{pd.sessions}</div>
                    </div>
                    <div className="brig" style={{ fontSize: 20, fontWeight: 800, color: "var(--teal-dark)" }}>{PX[plan]}</div>
                  </div>
                  <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                    {pd.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--teal-dark)", background: "rgba(255,255,255,.65)", padding: "2px 8px", borderRadius: 20, fontWeight: 500 }}>
                        <Check size={9} strokeWidth={3} style={{ color: "var(--teal)" }} /> {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label>Email Address</label>
                  <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: "" })); }} placeholder="you@example.com"
                    style={{ border: errors.email ? "1.5px solid var(--red)" : undefined }} />
                  {errors.email && <div style={{ fontSize: 11.5, color: "var(--red)", marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}><AlertTriangle size={11} /> {errors.email}</div>}
                </div>

                {/* Card number */}
                <div>
                  <label>Card Number</label>
                  <div style={{ position: "relative" }}>
                    <input
                      ref={cardInputRef}
                      value={cardNum}
                      onChange={e => {
                        const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                        const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
                        const cursorPos = e.target.selectionStart;
                        const prevLen = e.target.value.length;
                        setCardNum(formatted);
                        setErrors(v => ({ ...v, card: "" }));
                        // Restore cursor after React re-render
                        requestAnimationFrame(() => {
                          if (cardInputRef.current) {
                            const newLen = formatted.length;
                            const diff = newLen - prevLen;
                            cardInputRef.current.selectionStart = cardInputRef.current.selectionEnd = Math.max(0, cursorPos + diff);
                          }
                        });
                      }}
                      placeholder="1234 5678 9012 3456"
                      style={{ paddingRight: 72, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.06em", border: errors.card ? "1.5px solid var(--red)" : undefined }} />
                    {/* Card brand icons */}
                    <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", display: "flex", gap: 5, alignItems: "center" }}>
                      <div style={{ width: 34, height: 22, borderRadius: 5, background: brand === "visa" ? "#1A1F71" : "var(--slate-100)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", opacity: brand && brand !== "visa" ? 0.3 : 1 }}>
                        <span style={{ fontSize: 8, fontWeight: 900, color: brand === "visa" ? "#fff" : "var(--slate-400)", letterSpacing: "0.04em" }}>VISA</span>
                      </div>
                      <div style={{ width: 34, height: 22, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", gap: 0, transition: "all 0.2s", opacity: brand && brand !== "mc" ? 0.3 : 1 }}>
                        <div style={{ width: 14, height: 14, borderRadius: "50%", background: brand === "mc" ? "#EB001B" : "var(--slate-300)" }} />
                        <div style={{ width: 14, height: 14, borderRadius: "50%", background: brand === "mc" ? "#F79E1B" : "var(--slate-200)", marginLeft: -6 }} />
                      </div>
                    </div>
                  </div>
                  {errors.card && <div style={{ fontSize: 11.5, color: "var(--red)", marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}><AlertTriangle size={11} /> {errors.card}</div>}
                </div>

                {/* Expiry + CVC */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label>Expiry</label>
                    <input
                      value={expiry}
                      onChange={e => {
                        const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
                        const formatted = raw.length >= 3 ? raw.slice(0, 2) + " / " + raw.slice(2) : raw;
                        setExpiry(formatted);
                        setErrors(v => ({ ...v, expiry: "" }));
                      }}
                      placeholder="MM / YY"
                      style={{ border: errors.expiry ? "1.5px solid var(--red)" : undefined }} />
                    {errors.expiry && <div style={{ fontSize: 11.5, color: "var(--red)", marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}><AlertTriangle size={11} /> {errors.expiry}</div>}
                  </div>
                  <div>
                    <label>CVC / CVV</label>
                    <input value={cvc} onChange={e => { setCvc(e.target.value.replace(/\D/g, "").slice(0, 4)); setErrors(v => ({ ...v, cvc: "" })); }} placeholder="•••" type="password"
                      style={{ border: errors.cvc ? "1.5px solid var(--red)" : undefined }} />
                    {errors.cvc && <div style={{ fontSize: 11.5, color: "var(--red)", marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}><AlertTriangle size={11} /> {errors.cvc}</div>}
                  </div>
                </div>

                {/* Pay button */}
                <button className="btn-primary" onClick={handlePay}
                  style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "15px", borderRadius: 13, marginTop: 4 }}>
                  <><Check size={16} /> Pay {PX[plan]} · Complete Purchase</>
                </button>

                {/* Trust bar */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                  {[{ icon: "🔒", text: "SSL Encrypted" }, { icon: "⚡", text: "Powered by Stripe" }, { icon: "🧪", text: "Prototype — no charge" }].map(({ icon, text }) => (
                    <div key={text} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "var(--slate-400)" }}><span>{icon}</span> {text}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Coming Soon state ── */}
          {showComingSoon && (
            <motion.div key="coming-soon" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: "center", padding: "56px 40px 48px" }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
                style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--teal-light)", border: "2px solid var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 8px 24px rgba(20,184,166,.25)" }}>
                <CreditCard size={32} style={{ color: "var(--teal)" }} strokeWidth={2.5} />
              </motion.div>
              <h2 className="brig" style={{ fontSize: 22, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.02em", marginBottom: 10 }}>Payment Coming Soon 🚀</h2>
              <p style={{ fontSize: 14.5, color: "var(--slate-500)", lineHeight: 1.65, marginBottom: 28 }}>
                The payment function will be available after our launch date.<br />
                <strong style={{ color: "var(--slate)" }}>Kindly wait — we'll notify you!</strong>
              </p>
              <button className="btn-primary" onClick={onClose}
                style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "13px 24px", borderRadius: 13 }}>
                Got it
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/* ── Toast ── */
const Toast = ({ message, onDismiss }) => (
  <motion.div initial={{ opacity: 0, y: 56, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 28, scale: 0.95 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 998, background: "var(--slate)", color: "#fff", borderRadius: 14, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 16px 48px rgba(15,23,42,.3)", maxWidth: 480, width: "calc(100vw - 40px)" }}>
    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(13,148,136,.25)", border: "1px solid rgba(13,148,136,.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Zap size={15} style={{ color: "var(--teal-mid)" }} />
    </div>
    <span style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.5, flex: 1 }}>{message}</span>
    <button onClick={onDismiss} style={{ width: 26, height: 26, borderRadius: "50%", border: "none", background: "rgba(255,255,255,.1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.55)", transition: "background 0.15s" }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.2)"}
      onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.1)"}><X size={12} /></button>
  </motion.div>
);

/* ── Navbar ── */
const FORCE_SOLID_HEADER_VIEWS = new Set(["about", "personas", "privacy", "terms"]);

const Navbar = ({ view, onNav }) => {
  const [solid, setSolid] = useState(false);
  const [mob, setMob] = useState(false);
  const isLanding = view === "landing";
  const isDash = ["dashboard", "reports", "progress", "avatars", "settings"].includes(view);
  const forceSolidHeader = FORCE_SOLID_HEADER_VIEWS.has(view);
  const currentPath = normalizePath(window.location.pathname);
  const isBlogActive = currentPath === "/blog" || currentPath.startsWith("/blog/");
  const isPlacementPrepActive = currentPath === "/placement-preparation";
  const activeNavLinkStyle = {
    color: "var(--teal-dark)",
    background: "var(--teal-light)",
    border: "1px solid rgba(13,148,136,.2)",
  };
  useEffect(() => { const fn = () => setSolid(window.scrollY > 30); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => setMob(false), [view]);
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMob(false); };
  const navigateTo = (url) => { window.history.pushState({}, "", url); window.dispatchEvent(new PopStateEvent("popstate")); setMob(false); };
  const bg = solid || isDash || mob || forceSolidHeader;
  return (
    <header>
      <motion.nav initial={{ y: -64, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 64, padding: "0 clamp(16px,4vw,40px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: bg ? "rgba(250,250,248,0.96)" : "transparent", backdropFilter: bg ? "blur(18px)" : "none", borderBottom: bg ? "1px solid var(--border)" : "none", transition: "all 0.3s ease" }}>
        <Logo onClick={() => onNav("landing")} />
        <div className="nav-links-desk" style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {isLanding && (<>
            <button className="nav-link" onClick={() => scrollTo("features-section")}>Features</button>
            <button className="nav-link" onClick={() => scrollTo("pricing-section")}>Pricing</button>
            <button className="nav-link" onClick={() => scrollTo("waitlist-section")}>Join Waitlist</button>
            <div style={{ width: 1, height: 20, background: "var(--border)", margin: "0 6px" }} />
          </>)}
          {!isLanding && <button className="btn-ghost" onClick={() => onNav("landing")}>← Home</button>}
          <a
            href="/blog"
            className="nav-link"
            aria-current={isBlogActive ? "page" : undefined}
            style={isBlogActive ? activeNavLinkStyle : undefined}
            onClick={(e) => { e.preventDefault(); navigateTo("/blog"); }}
          >
            Blog
          </a>
          <a
            href="/placement-preparation"
            className="nav-link"
            aria-current={isPlacementPrepActive ? "page" : undefined}
            style={isPlacementPrepActive ? activeNavLinkStyle : undefined}
            onClick={(e) => { e.preventDefault(); navigateTo("/placement-preparation"); }}
          >
            Placement Prep
          </a>
          <button className="btn-secondary" onClick={() => onNav("signin")} style={{ fontSize: 13 }}><LogIn size={14} /> Sign in</button>
          <button className="btn-primary" onClick={() => onNav("dashboard")} style={{ fontSize: 13 }}>Get started <ArrowUpRight size={14} /></button>
        </div>
        <button className="hamburger btn-ghost" style={{ display: "none", padding: 8 }} onClick={() => setMob(o => !o)}>
          {mob ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>
      <AnimatePresence>
        {mob && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}
            style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 99, background: "rgba(250,250,248,0.98)", backdropFilter: "blur(18px)", borderBottom: "1px solid var(--border)", padding: "16px 20px 24px", display: "flex", flexDirection: "column", gap: 8 }}>
            {isLanding && (<>
              <button className="nav-link" style={{ textAlign: "left" }} onClick={() => scrollTo("features-section")}>Features</button>
              <button className="nav-link" style={{ textAlign: "left" }} onClick={() => scrollTo("pricing-section")}>Pricing</button>
              <button className="nav-link" style={{ textAlign: "left" }} onClick={() => scrollTo("waitlist-section")}>Join Waitlist</button>
              <div style={{ height: 1, background: "var(--border)", margin: "4px 0" }} />
            </>)}
            {!isLanding && <button className="nav-link" style={{ textAlign: "left" }} onClick={() => onNav("landing")}>← Home</button>}
            <a
              href="/blog"
              className="nav-link"
              aria-current={isBlogActive ? "page" : undefined}
              style={{ textAlign: "left", ...(isBlogActive ? activeNavLinkStyle : {}) }}
              onClick={(e) => { e.preventDefault(); navigateTo("/blog"); setMob(false); }}
            >
              Blog
            </a>
            <a
              href="/placement-preparation"
              className="nav-link"
              aria-current={isPlacementPrepActive ? "page" : undefined}
              style={{ textAlign: "left", ...(isPlacementPrepActive ? activeNavLinkStyle : {}) }}
              onClick={(e) => { e.preventDefault(); navigateTo("/placement-preparation"); setMob(false); }}
            >
              Placement Prep
            </a>
            <button className="btn-secondary" onClick={() => { onNav("signin"); setMob(false); }} style={{ justifyContent: "center" }}><LogIn size={14} /> Sign in</button>
            <button className="btn-primary" onClick={() => { onNav("dashboard"); setMob(false); }} style={{ justifyContent: "center" }}>Get started <ArrowUpRight size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ── Dashboard Shell ── */
const DashboardShell = ({ activeTab, onNav, onUpgrade, children }) => {
  const [sideOpen, setSideOpen] = useState(false);
  const NAV = [
    { icon: <LayoutDashboard size={16} />, label: "New Interview", id: "dashboard" },
    { icon: <FileText size={16} />, label: "My Reports", id: "reports" },
    { icon: <TrendingUp size={16} />, label: "Progress", id: "progress" },
    { icon: <Palette size={16} />, label: "Personas", id: "avatars" },
  ]; const SideContent = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 3, height: "100%", padding: "80px 14px 28px" }}>
      <div style={{ padding: "0 4px 14px", marginBottom: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--slate-50)", borderRadius: 11, border: "1px solid var(--border)" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>🧑‍💻</div>
          <div><div className="brig" style={{ fontSize: 13, fontWeight: 700, color: "var(--slate)", lineHeight: 1.2 }}>Alex Johnson</div><Tag color="teal" size="xs">Pro Plan</Tag></div>
        </div>
      </div>
      <div style={{ height: 1, background: "var(--border)", margin: "0 4px 8px" }} />
      {NAV.map(({ icon, label, id }) => (
        <button key={id} className={`sidebar-item ${activeTab === id ? "active" : ""}`} onClick={() => { onNav(id); setSideOpen(false); }}>{icon} {label}</button>
      ))}
      <div style={{ height: 1, background: "var(--border)", margin: "8px 4px" }} />
      <button className={`sidebar-item ${activeTab === "settings" ? "active" : ""}`} onClick={() => { onNav("settings"); setSideOpen(false); }}>
        <Settings size={16} /> Settings
      </button>
      <button className={`sidebar-item ${activeTab === "support" ? "active" : ""}`} onClick={() => { onNav("support"); setSideOpen(false); }}>
        <LifeBuoy size={16} /> Help & Support
      </button>
      <div style={{ marginTop: "auto", padding: "0 4px" }}>
        {/* Streak card */}
        <div className="streak-badge" style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
            <Flame size={14} style={{ color: "var(--amber)" }} />
            <span className="brig" style={{ fontSize: 13, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.01em" }}>5-day streak!</span>
          </div>
          <div style={{ fontSize: 11, color: "var(--slate-500)", marginBottom: 8, lineHeight: 1.5 }}>Practice tomorrow to hit 6 days. 🎯</div>
          <div style={{ height: 4, background: "rgba(217,119,6,.15)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: "71%", height: "100%", background: "linear-gradient(90deg,var(--amber),#FBBF24)", borderRadius: 2 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontSize: 10, color: "var(--amber)", fontWeight: 600 }}>5 / 7 days</span>
            <span style={{ fontSize: 10, color: "var(--slate-400)" }}>Next: 7-day badge</span>
          </div>
        </div>
        <div style={{ background: "var(--teal-light)", border: "1px solid rgba(13,148,136,.2)", borderRadius: 13, padding: "14px 16px", cursor: "pointer", transition: "all 0.2s" }}
          onClick={() => onUpgrade("Elite")}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--teal-dark)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 5 }}>Interviews Left</div>
          <div className="brig" style={{ fontSize: 28, fontWeight: 800, color: "var(--slate)", letterSpacing: "-0.02em" }}>23 <span style={{ fontSize: 14, fontWeight: 500, color: "var(--slate-500)" }}>/ 40</span></div>
          <div style={{ height: 4, background: "rgba(13,148,136,.15)", borderRadius: 2, marginTop: 10, overflow: "hidden" }}>
            <div style={{ width: "57.5%", height: "100%", background: "var(--teal)", borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 11, color: "var(--teal-dark)", fontWeight: 600, marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}><ArrowUpRight size={11} /> Upgrade for more</div>
        </div>
      </div>
    </div>
  );
  return (
    <div style={{ minHeight: "100vh", background: "var(--slate-50)", display: "flex" }}>
      <aside className="sidebar-desk" style={{ width: 236, background: "var(--white)", borderRight: "1px solid var(--border)", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        <SideContent />
      </aside>
      <AnimatePresence>
        {sideOpen && (<>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSideOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,.4)", zIndex: 199 }} />
          <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} transition={{ duration: 0.28, ease: [0.32, .72, 0, 1] }} style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: 240, background: "var(--white)", borderRight: "1px solid var(--border)", zIndex: 200, overflowY: "auto" }}>
            <SideContent />
          </motion.aside>
        </>)}
      </AnimatePresence>
      <main className="dash-main" style={{ flex:1, padding:"88px 44px 60px", overflowY:"auto", minWidth:0 }}>
        <button id="dash-menu-btn" className="btn-ghost" onClick={()=>setSideOpen(true)} style={{ display:"none", marginBottom:16, fontSize:13, padding:"8px 12px" }}>
          <Menu size={16}/> Menu
        </button>
        {children}
      </main>
      <style>{`@media(max-width:768px){#dash-menu-btn{display:flex !important;}}`}</style>
    </div>
  );
};

/* ── Landing ── */
const Landing = ({ onNav, onCheckout }) => {
  useEffect(() => {
    // Load the Storylane script dynamically so it executes properly in React
    const existingScript = document.querySelector('script[data-storylane-sdk="true"]');
    let script = null;
    if (!existingScript) {
      script = document.createElement('script');
      script.src = "https://js.storylane.io/js/v2/storylane.js";
      script.async = true;
      script.dataset.storylaneSdk = "true";
      document.body.appendChild(script);
    }
    return () => { if (script && document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  const goToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const productLinks = [
    { label: "Features", href: "/features", action: () => onNav("features") },
    { label: "Pricing", href: "/pricing", action: () => onNav("pricing") },
    { label: "Personas", href: "/personas", action: () => onNav("personas") },
    { label: "How it works", href: "/how-it-works", action: () => onNav("howItWorks") },
  ];

  const navigateToBlog = () => {
    window.history.pushState({}, "", "/blog");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const navigateTo = (url) => {
    window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const companyLinks = [
    { label: "About", href: "/about", action: () => onNav("about") },
    { label: "Blog", href: "/blog", action: navigateToBlog },
    { label: "Careers", href: "/careers", action: () => onNav("careers") },
    { label: "Privacy Policy", href: "/privacy-policy", action: () => onNav("privacy") },
    { label: "Terms of Service", href: "/terms-of-service", action: () => onNav("terms") },
  ];

  const resourceLinks = [
    { label: "Placement Prep", href: "/placement-preparation", action: () => navigateTo("/placement-preparation") },
    { label: "Aptitude Q&A", href: "/aptitude-questions", action: () => navigateTo("/aptitude-questions") },
    { label: "Coding Interview Q&A", href: "/coding-interview-questions", action: () => navigateTo("/coding-interview-questions") },
    { label: "TCS Questions", href: "/company-wise-questions/tcs", action: () => navigateTo("/company-wise-questions/tcs") },
    { label: "Wipro Questions", href: "/company-wise-questions/wipro", action: () => navigateTo("/company-wise-questions/wipro") },
    { label: "Interactive Demo", href: "/demo", action: () => navigateTo("/demo") },
  ];

  const socialLinks = [
    { Icon: Mail, label: "Email", href: "mailto:support@placementdo.com?subject=PlacementDo%20Support" },
    { Icon: Hash, label: "Blog", href: "/blog", action: () => navigateTo("/blog") },
    { Icon: Github, label: "GitHub", href: "https://github.com/ayushphiyak-dev/placementdo-live", newTab: true },
  ];

  return (
    <>
    <main style={{ background: "var(--ivory)" }}>
    {/* HERO */}
    <section className="hero-pad" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"100px clamp(20px,5vw,60px) 80px", textAlign:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translate(-50%,-50%)", width:900, height:600, background:"radial-gradient(ellipse,rgba(13,148,136,.08) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <motion.div initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5 }}>
        <Tag color="teal"><Sparkles size={11}/> Coming Soon · Join the Waitlist</Tag>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="brig"
        style={{ fontSize: "clamp(36px,6vw,82px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", color: "var(--slate)", marginTop: 22, marginBottom: 20, maxWidth: 900, wordBreak: "break-word" }}>
        Practice the Interview.{" "}<span className="text-shimmer">Land the Offer.</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.22 }}
        style={{ fontSize: "clamp(15px,2vw,18px)", color: "var(--slate-500)", maxWidth: 600, lineHeight: 1.68, marginBottom: 28 }}>
        A hyper-realistic AI interviewer that knows your CV, the company, and the exact role. Multi-language support. Detailed scoring. Ruthlessly honest feedback.{" "}
        <strong style={{ color: "var(--slate-700)" }}>Launching soon.</strong>
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 520 }}>
        <WaitlistForm size="lg" />
        <p style={{ fontSize: 12, color: "var(--slate-400)", fontWeight: 500, marginTop: 12 }}>No spam. No credit card. Just early access.</p>
        
        <p className="hero-quick-links" style={{ fontSize: 12.5, color: "var(--slate-500)", display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", alignItems: "center", marginTop: 18 }}>
          <a href="/signin" onClick={(e) => { e.preventDefault(); onNav("signin"); }} style={{ color: "var(--teal-dark)", fontWeight: 600 }}>
            Sign in
          </a>
          <a href="/dashboard" onClick={(e) => { e.preventDefault(); onNav("dashboard"); }} style={{ color: "var(--teal-dark)", fontWeight: 600 }}>
            Dashboard
          </a>
          <a href="/support" onClick={(e) => { e.preventDefault(); onNav("support"); }} style={{ color: "var(--teal-dark)", fontWeight: 600 }}>
            Help
          </a>
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="stats-row" style={{ marginTop: 36 }}>
        {[{ n: "2,400+", l: "Waitlist signups" }, { n: "140+", l: "Target companies" }, { n: "28", l: "Languages planned" }, { n: "2026", l: "Launch year" }].map(({ n, l }) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div className="brig" style={{ fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.02em" }}>{n}</div>
            <div style={{ fontSize: 12, color: "var(--slate-500)", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 48, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.52 }}
        className="float hero-preview" style={{ marginTop: 40, maxWidth: 780, width: "100%" }}>
        <div className="card" style={{ borderRadius: 22, overflow: "hidden", boxShadow: "var(--shadow-xl)" }}>
          <div style={{ padding: "12px 20px", background: "var(--slate-50)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
            {["#FF5F57", "#FEBC2E", "#28C840"].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
            <span style={{ marginLeft: 8, fontSize: 12, color: "var(--slate-300)", fontWeight: 500 }}>placementdo.app · Live · Google · SWE L5</span>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
              <div className="dot-live" style={{ width: 7, height: 7, borderRadius: "50%", background: "#DC2626" }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#DC2626" }}>LIVE</span>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", background:"var(--white)" }}>
            <div style={{ padding:"26px 28px 22px", borderRight:"1px solid var(--border)" }}>
              <Tag color="slate" size="xs">The Stress-Tester · Active</Tag>
              <p style={{ marginTop: 14, fontSize: 14.5, color: "var(--slate)", lineHeight: 1.72, fontStyle: "italic" }}>
                "Given the scale you mentioned — 10M rps — walk me through the consistency vs. availability trade-offs in your caching layer."
              </p>
              <div style={{ marginTop: 18, display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ display: "flex", gap: 3 }}>
                  {[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} className="wave-bar" style={{ width: 3, height: 20, background: "var(--teal)", borderRadius: 2, animationDelay: `${i * 0.11}s` }} />)}
                </div>
                <span style={{ fontSize: 12, color: "var(--teal)", fontWeight: 600 }}>You're speaking…</span>
              </div>
            </div>
            <div className="hero-mock-side tilt-in" style={{ background:"var(--slate-50)", display:"flex", alignItems:"center", justifyContent:"center", minHeight:150 }}>
              <div style={{ textAlign:"center" }}><div style={{ fontSize:48 }}>👩‍💻</div><div style={{ fontSize:11, color:"var(--slate-300)", marginTop:5 }}>Your camera</div></div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>

    {/* TICKER */}
    <section style={{ padding: "48px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--white)" }}>
      <p style={{ textAlign: "center", fontSize: 11.5, color: "var(--slate-300)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 26 }}>Building for people interviewing at</p>
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...COMPANIES, ...COMPANIES].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap", opacity: 0.6, transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "1"} onMouseLeave={e => e.currentTarget.style.opacity = "0.6"}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: c.fg, fontFamily: "'Bricolage Grotesque',sans-serif" }}>{c.abbr}</div>
              <span className="brig" style={{ fontSize: 15, fontWeight: 600, color: "var(--slate-700)" }}>{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section className="sec-pad" style={{ padding:"100px clamp(20px,5vw,60px)", maxWidth:1100, margin:"0 auto" }}>
      <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ duration:0.55 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:56 }}>
        <Tag color="teal">Process</Tag>
        <h2 className="brig" style={{ fontSize: "clamp(26px,4.5vw,50px)", fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.03em", marginTop: 14, lineHeight: 1.1 }}>From zero to hired in four steps</h2>
      </motion.div>
      <div className="step-grid">
        {[
          { icon: <Upload size={22} />, step: "01", title: "Upload your CV", desc: "AI parses your resume to craft hyper-relevant questions based on your exact skills and gaps.", color: "var(--teal)" },
          { icon: <Building2 size={22} />, step: "02", title: "Pick company & role", desc: "Target any of 140+ employers. Set the exact title, level, and interview focus area.", color: "#0369A1" },
          { icon: <Video size={22} />, step: "03", title: "Live AI interview", desc: "Face-to-face with your AI interviewer. Real questions, real pressure, no second chances.", color: "#7C3AED" },
          { icon: <Award size={22} />, step: "04", title: "Get hired", desc: "Receive a scored, actionable report with a concrete path to your next improvement.", color: "var(--amber)" },
        ].map(({ icon, step, title, desc, color }, i) => (
          <motion.div key={step} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.09 }} viewport={{ once: true }}
            className="card card-lift" style={{ padding: "28px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: `${color}14`, display: "flex", alignItems: "center", justifyContent: "center", color, transition: "transform 0.22s, background 0.22s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.background = `${color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.background = `${color}14`; }}>
                {icon}
              </div>
              <span className="brig" style={{ fontSize: 13, fontWeight: 700, color: "var(--slate-200)" }}>{step}</span>
            </div>
            <h3 className="brig" style={{ fontSize: 17, fontWeight: 700, color: "var(--slate)", marginBottom: 8, letterSpacing: "-0.01em" }}>{title}</h3>
            <p style={{ fontSize: 13.5, color: "var(--slate-500)", lineHeight: 1.68 }}>{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* INTERACTIVE DEMO SECTION */}
    <section id="demo-section" className="sec-pad" style={{ padding:"100px clamp(20px,5vw,60px)", background: "var(--slate-50)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} viewport={{ once: true }}>
          <Tag color="teal">Experience</Tag>
          <h2 className="brig" style={{ fontSize: "clamp(26px,4.5vw,50px)", fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.03em", marginTop: 14, lineHeight: 1.1 }}>Take a test drive</h2>
          <p style={{ fontSize: 16, color: "var(--slate-500)", maxWidth: 600, margin: "14px auto 48px", lineHeight: 1.65 }}>
            See exactly how our AI interviewer interacts, challenges, and guides you through a real-world scenario. No signup required for the preview.
          </p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 32, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
          className="card" style={{ padding: 12, borderRadius: 28, background: "var(--white)", boxShadow: "0 42px 100px rgba(15,23,42,0.12)", overflow: "hidden" }}>
          <div style={{ position: 'relative', width: '100%', height: 'clamp(500px, 70vh, 750px)' }}>
            <iframe 
              loading="lazy"
              src="https://demo.storylane.com/demo/1j3kslnrp6q2?embed=inline"
              title="PlacementDo Interactive Demo"
              allow="fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '18px',
                backgroundColor: 'var(--slate-50)'
              }}
            />
          </div>
          <p style={{ fontSize: 12, color: "var(--slate-500)", marginTop: 12 }}>
            Demo not loading? <a href="https://demo.storylane.com/demo/1j3kslnrp6q2" target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal-dark)", fontWeight: 600 }}>Open it in a new tab</a>.
          </p>
        </motion.div>
      </div>
    </section>

    {/* FEATURES */}
    <section id="features-section" style={{ padding: "80px clamp(20px,5vw,60px) 100px", background: "var(--white)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 52 }}>
          <Tag color="slate">Why PlacementDo</Tag>
          <h2 className="brig" style={{ fontSize: "clamp(24px,4vw,46px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--slate)", marginTop: 14, lineHeight: 1.1 }}>The unfair advantage</h2>
          <p style={{ fontSize: 16, color: "var(--slate-500)", maxWidth: 540, margin: "12px auto 0", lineHeight: 1.65 }}>Built on the same AI infrastructure used to train Fortune 500 hiring managers.</p>
        </motion.div>
        <div className="feature-grid stagger">
          {[
            { icon: <Brain size={20} />, title: "CV-contextual questions", desc: "AI reads your resume and generates hyper-specific questions about your exact projects, claims, and gaps.", color: "var(--teal)" },
            { icon: <Globe size={20} />, title: "28 languages + code-switching", desc: "Practice in English, Mandarin, Hindi, French, Arabic, and 23 more. Mix languages mid-interview seamlessly.", color: "var(--teal-mid)" },
            { icon: <Zap size={20} />, title: "Real-time filler detection", desc: "Get flagged on filler words, pacing, and over-qualification as they happen. Fix bad habits before they cost you.", color: "var(--teal-dark)" },
            { icon: <Shield size={20} />, title: "Company interview DNA", desc: "Google's Googleyness, McKinsey case frameworks, Amazon LP — each session is precisely calibrated to your target.", color: "var(--teal)" },
            { icon: <BarChart2 size={20} />, title: "10-metric score breakdown", desc: "Technical depth, STAR method, communication clarity, culture-fit alignment, and six more scored dimensions.", color: "var(--teal-mid)" },
            { icon: <RefreshCw size={20} />, title: "Report rechecks", desc: "Disagree with your analysis? Request a recheck from a different AI perspective, up to your plan limits.", color: "var(--teal-dark)" },
          ].map(({ icon, title, desc, color }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, delay: i * 0.07 }} viewport={{ once: true }} className="feature-card">
              <div className="fc-icon" style={{ background: `${color}12`, borderColor: `${color}20`, color }}
                onMouseEnter={e => { e.currentTarget.style.background = `${color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${color}12`; }}>
                {icon}
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* HERO FEATURE — Personality Simulations */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}
          style={{ marginTop: 20, borderRadius: 20, overflow: "hidden", background: "var(--slate)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "var(--shadow-xl)", position: "relative" }}>
          <div style={{ position: "absolute", top: "-30%", right: "-5%", width: 500, height: 400, background: "radial-gradient(ellipse,rgba(13,148,136,.18) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-20%", left: "5%", width: 350, height: 300, background: "radial-gradient(ellipse,rgba(124,58,237,.12) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div className="pf-outer">
            {/* Left copy */}
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(13,148,136,.2)", border: "1px solid rgba(13,148,136,.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "transform 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1) rotate(-5deg)"}
                  onMouseLeave={e => e.currentTarget.style.transform = ""}>
                  <span style={{ fontSize: 22 }}>🎭</span>
                </div>
                <Tag color="teal">Unique to PlacementDo</Tag>
              </div>
              <h3 className="brig" style={{ fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 14 }}>
                Survive Any Interviewer Personality
              </h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.72, marginBottom: 20 }}>
                Most interview tools only test what you know. PlacementDo trains how you <em style={{ color: "rgba(255,255,255,.85)" }}>react</em>. Our 6 AI personas simulate the full psychological spectrum — from the dangerously charming Friendly Peer to the silence-wielding Stoic Veteran.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[["6 Distinct Personalities", "rgba(13,148,136,.9)"], ["Psychological Pressure Training", "rgba(124,58,237,.9)"], ["Adaptive Difficulty", "rgba(217,119,6,.9)"]].map(([label, color]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 20, padding: "5px 13px", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.13)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,.75)", fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right — mini persona stack */}
            <div className="pf-right">
              {[
                { id: 3, title: "The Stress-Tester", diff: "Brutal", diffColor: "#FCA5A5", bg: "rgba(220,38,38,.18)", bd: "rgba(220,38,38,.35)" },
                { id: 1, title: "The Friendly Peer", diff: "Deceptive", diffColor: "#FCD34D", bg: "rgba(217,119,6,.18)", bd: "rgba(217,119,6,.35)" },
                { id: 2, title: "The Empath", diff: "Medium", diffColor: "#7DD3FC", bg: "rgba(3,105,161,.18)", bd: "rgba(3,105,161,.35)" },
                { id: 4, title: "The Stoic Veteran", diff: "Psychological", diffColor: "#CBD5E1", bg: "rgba(71,85,105,.18)", bd: "rgba(71,85,105,.35)" },
                { id: 5, title: "The Devil's Advocate", diff: "Hard", diffColor: "#C4B5FD", bg: "rgba(124,58,237,.18)", bd: "rgba(124,58,237,.35)" },
              ].map(({ id, title, diff, diffColor, bg, bd }) => (
                <div key={title} style={{ display: "flex", alignItems: "center", gap: 10, background: bg, border: `1px solid ${bd}`, borderRadius: 11, padding: "10px 13px", transition: "transform 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateX(-3px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = ""}>
                  <PersonaAvatar persona={PERSONAS.find(p => p.id === id)} size={30} borderWidth={1.5} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.88)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>
                    <div style={{ fontSize: 10.5, color: diffColor, fontWeight: 700, marginTop: 1 }}>{diff}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* PRICING */}
    <section id="pricing-section" style={{ padding: "100px clamp(20px,5vw,60px)", maxWidth: 1100, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 52 }}>
        <Tag color="teal">Pricing</Tag>
        <h2 className="brig" style={{ fontSize: "clamp(24px,4vw,46px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--slate)", marginTop: 14, lineHeight: 1.1 }}>One interview could change everything</h2>
        <p style={{ fontSize: 15, color: "var(--slate-500)", marginTop: 10 }}>No subscriptions. No auto-renewals. Join the waitlist for early-bird pricing.</p>
      </motion.div>
      <div className="pricing-grid stagger">
        {PLANS.map(({ name, price, old, hi, tagline, features }, i) => (
          <motion.div key={name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
            className={`pricing-card ${hi ? "hi" : ""}`}
            style={{ background: hi ? "var(--slate)" : "var(--white)", border: hi ? "1px solid var(--slate)" : "1px solid var(--border)", boxShadow: hi ? "var(--shadow-xl)" : "var(--shadow-sm)" }}>
            {hi && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "var(--teal)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 18px", borderRadius: 20, whiteSpace: "nowrap", letterSpacing: "0.06em", boxShadow: "var(--shadow-teal)" }}>MOST POPULAR</div>}
            <div style={{ fontSize: 12, fontWeight: 700, color: hi ? "rgba(255,255,255,.4)" : "var(--slate-300)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>{name}</div>
            <div style={{ fontSize: 12.5, color: hi ? "rgba(255,255,255,.55)" : "var(--slate-500)", marginBottom: 18 }}>{tagline}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 26 }}>
              <span className="brig" style={{ fontSize: "clamp(34px,4vw,48px)", fontWeight: 800, color: hi ? "#fff" : "var(--slate)", letterSpacing: "-0.04em" }}>{price}</span>
              {old && <span style={{ fontSize: 17, color: hi ? "rgba(255,255,255,.3)" : "var(--slate-300)", textDecoration: "line-through" }}>{old}</span>}
            </div>
            <div style={{ height: 1, background: hi ? "rgba(255,255,255,.1)" : "var(--border)", marginBottom: 22 }} />
            <div style={{ marginBottom: 26 }}>
              {features.map(f => (
                <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 11 }}>
                  <div style={{ width: 17, height: 17, borderRadius: "50%", background: hi ? "rgba(255,255,255,.12)" : "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Check size={9} style={{ color: hi ? "#fff" : "var(--teal)" }} strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 13.5, color: hi ? "rgba(255,255,255,.78)" : "var(--slate-700)", lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={() => onCheckout(name)}
              style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", background: hi ? "var(--teal)" : "var(--slate-100)", color: hi ? "#fff" : "var(--slate)", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.22s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              onMouseEnter={e => { e.currentTarget.style.background = hi ? "var(--teal-dark)" : "var(--slate-200)"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = hi ? "var(--shadow-teal)" : "var(--shadow-sm)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = hi ? "var(--teal)" : "var(--slate-100)"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
              onMouseUp={e => e.currentTarget.style.transform = "translateY(-1px)"}>
              <CreditCard size={15} /> Get {name} Plan
            </button>
          </motion.div>
        ))}
      </div>
    </section>

    {/* FAQ */}
    {(() => {
      const FAQS = [
        { q: "How is PlacementDo different from practising with a friend?", a: "Friends are too nice. They know you, they skip hard follow-ups, and they can't give you a scored breakdown. PlacementDo's AI has no social contract — it will interrupt you, push back on every weak answer, and give you the honest scores that friends won't." },
        { q: "Can the AI really replicate genuine interview pressure?", a: "Our Stress-Tester persona uses intentional interruptions, back-to-back rapid-fire questions, and deliberate silence after your answers. Beta users consistently rate it harder than their real interviews — which is exactly the point." },
        { q: "What's the difference between the 6 interviewer personas?", a: "Each persona tests a different dimension: The Friendly Peer catches oversharing, The Empath exposes emotional intelligence gaps, The Stress-Tester replicates FAANG-style pressure, The Stoic Veteran tests composure under silence, The Devil's Advocate forces logical precision, and The Silent Analyst forensically probes inconsistencies." },
        { q: "Does PlacementDo work for non-technical roles?", a: "Yes. You can set any role — PM, consultant, analyst, investment banker, or engineer. The focus selector lets you choose Behavioral / STAR Method, Case Study, or Balanced sessions. The AI adapts its questioning style and scoring criteria accordingly." },
        { q: "When does PlacementDo launch and how much will it cost?", a: "We're targeting 2026. Waitlist members get 30% off all plans at launch. Plans start at $1 for a single session (Starter) and go up to $89.99 for 100 sessions with all personas unlocked (Elite). No subscriptions, no auto-renewals." },
      ];
      const [open, setOpen] = useState(null);
      return (
        <section style={{ padding: "80px clamp(20px,5vw,60px) 100px", background: "var(--ivory)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 52 }}>
              <Tag color="slate"><HelpCircle size={10} /> FAQ</Tag>
              <h2 className="brig" style={{ fontSize: "clamp(24px,4vw,46px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--slate)", marginTop: 14, lineHeight: 1.1 }}>Common questions</h2>
            </motion.div>
            <div className="card" style={{ overflow: "hidden" }}>
              {FAQS.map(({ q, a }, i) => (
                <div key={i} className="faq-item">
                  <button className="faq-btn" onClick={() => setOpen(o => o === i ? null : i)} style={{ padding: "20px 24px" }}>
                    <span className="brig" style={{ fontSize: 15.5, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.01em", lineHeight: 1.3 }}>{q}</span>
                    <span className="faq-chevron" style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}>
                      <ChevronDown size={18} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        key="ans"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}>
                        <p style={{ fontSize: 14.5, color: "var(--slate-600)", lineHeight: 1.75, padding: "0 24px 22px", borderTop: "1px solid var(--border)" }}>{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    })()}

    {/* WAITLIST CTA */}
    <section id="waitlist-section" style={{ padding: "96px clamp(20px,5vw,60px) 112px", background: "var(--slate)", position: "relative", overflow: "hidden" }}>
      {/* Animated background blobs */}
      <div style={{ position:"absolute", top:"20%", left:"10%", width:400, height:400, background:"radial-gradient(circle,rgba(13,148,136,.14) 0%,transparent 70%)", pointerEvents:"none", animation:"float-anim 8s ease-in-out infinite" }}/>
      <div style={{ position:"absolute", bottom:"10%", right:"8%", width:300, height:300, background:"radial-gradient(circle,rgba(124,58,237,.1) 0%,transparent 70%)", pointerEvents:"none", animation:"float-anim 10s ease-in-out infinite reverse" }}/>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:900, height:600, background:"radial-gradient(ellipse,rgba(13,148,136,.18) 0%,transparent 65%)", pointerEvents:"none" }}/>

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} viewport={{ once: true }}
        style={{ position: "relative", zIndex: 1, maxWidth: 660, margin: "0 auto" }}>

        {/* Top-center icon */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <motion.div whileHover={{ scale: 1.1, rotate: 8 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}
            style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(13,148,136,.2)", border: "1px solid rgba(13,148,136,.35)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Bell size={28} style={{ color: "var(--teal-mid)" }} />
          </motion.div>
          <Tag color="teal"><Sparkles size={11} /> Be First. Get Early Access.</Tag>
          <h2 className="brig" style={{ fontSize: "clamp(26px,5vw,54px)", fontWeight: 800, letterSpacing: "-0.035em", color: "#fff", marginTop: 20, marginBottom: 14, lineHeight: 1.05 }}>
            Your dream offer is<br />one practice away
          </h2>
          <p style={{ fontSize: "clamp(14px,2vw,16px)", color: "rgba(255,255,255,.55)", marginBottom: 38, lineHeight: 1.68 }}>
            Join 2,400+ candidates already on the waitlist. Early members get <strong style={{ color: "rgba(255,255,255,.88)" }}>30% off</strong> at launch.
          </p>
        </div>

        {/* Email box — elevated card feel */}
        <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 20, padding: "32px 36px", backdropFilter: "blur(12px)", boxShadow: "0 24px 64px rgba(0,0,0,.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--teal-mid)" }} className="dot-live" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.5)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Secure your spot</span>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-start" }}><WaitlistForm size="lg" dark={true} /></div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.22)", marginTop: 14, display: "flex", alignItems: "center", gap: 5 }}>
            <span>🔒</span> No spam. No credit card. Unsubscribe anytime.
          </p>
        </div>

        {/* Trust badges */}
        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 36, flexWrap: "wrap" }}>
          {[
            { icon: <CheckCircle2 size={14} />, label: "Free beta access" },
            { icon: <CheckCircle2 size={14} />, label: "30% launch discount" },
            { icon: <CheckCircle2 size={14} />, label: "Priority onboarding" },
          ].map(({ icon, label }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }} viewport={{ once: true }}
              style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ color: "var(--teal-mid)" }}>{icon}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,.5)", fontWeight: 500 }}>{label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
    </main>

    {/* FOOTER */}
    <footer style={{ background: "var(--slate)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
      <div className="footer-grid">
        {/* Brand column */}
        <div>
          <Logo light />
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.4)", lineHeight: 1.7, marginTop: 14, maxWidth: 280 }}>
            A hyper-realistic AI interview simulator that knows your CV, the company, and the exact role. Practice smarter. Land faster.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            {socialLinks.map(({ Icon, label, href, newTab, action }) => (
              <a
                key={label}
                className="footer-social wiggle"
                title={label}
                aria-label={label}
                href={href}
                target={newTab ? "_blank" : undefined}
                rel={newTab ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (action) {
                    e.preventDefault();
                    action();
                  }
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Product links */}
        <div>
          <div className="brig" style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Product</div>
          <div className="footer-link-group">
            {productLinks.map(({ label, href, action }) => (
              <a key={label} href={href} className="footer-link" onClick={(e) => { e.preventDefault(); action(); }}>{label}</a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <div className="brig" style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Company</div>
          <div className="footer-link-group">
            {companyLinks.map(({ label, href, action }) => (
              <a key={label} href={href} className="footer-link" onClick={(e) => { e.preventDefault(); action(); }}>{label}</a>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <div className="brig" style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Resources</div>
          <div className="footer-link-group">
            {resourceLinks.map(({ label, href, action }) => (
              <a key={label} href={href} className="footer-link" onClick={(e) => { e.preventDefault(); action(); }}>{label}</a>
            ))}
          </div>
        </div>

        {/* Join waitlist */}
        <div>
          <div className="brig" style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Get Early Access</div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", lineHeight: 1.65, marginBottom: 14 }}>Join the waitlist and get 30% off at launch in 2026.</p>
          <WaitlistForm size="sm" dark={true} />
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", padding: "16px clamp(20px,5vw,60px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, maxWidth: 1200, margin: "0 auto" }}>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,.25)" }}>© 2026 PlacementDo. All rights reserved.</span>
        <div style={{ display: "flex", gap: 16 }}>
          {[
            { label: "Privacy", action: () => onNav("privacy") },
            { label: "Terms", action: () => onNav("terms") },
            { label: "Cookies", action: () => onNav("privacy") },
          ].map(({ label, action }) => (
            <button key={label} style={{ fontSize: 12, color: "rgba(255,255,255,.25)", background: "none", border: "none", cursor: "pointer", transition: "color 0.15s", fontFamily: "'DM Sans',sans-serif" }}
              onClick={action}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,.6)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.25)"}>{label}</button>
          ))}
        </div>
      </div>
    </footer>
  </>
  );
};

/* ── Sign In ── */
const SignIn = ({ onNav }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const submit = e => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setShowComingSoon(true); }, 1200); };
  const handleForgot = () => { setResetSent(true); setTimeout(() => setResetSent(false), 4000); };
  return (
    <main style={{ minHeight: "100vh", background: "var(--slate-50)", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 20px" }}>
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }} style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}><Logo onClick={() => onNav("landing")} /></div>
          <h1 className="brig" style={{ fontSize: 28, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.03em" }}>Welcome back</h1>
          <p style={{ fontSize: 14, color: "var(--slate-500)", marginTop: 6 }}>Sign in to continue your practice sessions.</p>
        </div>
        <div className="card" style={{ padding: 32 }}>
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div><label>Email Address</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" disabled={loading} /></div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label style={{ margin: 0 }}>Password</label>
                <span style={{ fontSize: 12, color: resetSent ? "var(--green)" : "var(--teal)", cursor: "pointer", fontWeight: 600, transition: "color 0.15s" }}
                  onClick={handleForgot}
                  onMouseEnter={e => e.currentTarget.style.color = resetSent ? "var(--green)" : "var(--teal-dark)"} onMouseLeave={e => e.currentTarget.style.color = resetSent ? "var(--green)" : "var(--teal)"}>
                  {resetSent ? "✓ Reset email sent!" : "Forgot password?"}
                </span>
              </div>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" disabled={loading} />
            </div>
            <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "13px", marginTop: 4 }}>
              {loading ? <><span className="spin"><RefreshCw size={16} /></span> Signing in…</> : <><LogIn size={16} /> Sign in</>}
            </button>
          </form>
          <div style={{ height: 1, background: "var(--border)", margin: "22px 0" }} />
          <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--slate-500)" }}>
            Don't have an account?{" "}
            <span onClick={() => onNav("landing")} style={{ color: "var(--teal)", fontWeight: 600, cursor: "pointer", transition: "color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--teal-dark)"} onMouseLeave={e => e.currentTarget.style.color = "var(--teal)"}>Join the waitlist →</span>
          </p>
        </div>
      </motion.div>

      {/* ── Coming Soon popup ── */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.65)", backdropFilter: "blur(10px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
            onClick={e => e.target === e.currentTarget && setShowComingSoon(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 12 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 20, boxShadow: "0 32px 80px rgba(15,23,42,.35)", width: "100%", maxWidth: 400, textAlign: "center", padding: "56px 40px 48px" }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
                style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--teal-light)", border: "2px solid var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 8px 24px rgba(20,184,166,.25)" }}>
                <LogIn size={32} style={{ color: "var(--teal)" }} strokeWidth={2.5} />
              </motion.div>
              <h2 className="brig" style={{ fontSize: 22, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.02em", marginBottom: 10 }}>Sign In Coming Soon 🚀</h2>
              <p style={{ fontSize: 14.5, color: "var(--slate-500)", lineHeight: 1.65, marginBottom: 28 }}>
                The sign-in function will be available after our launch date.<br />
                <strong style={{ color: "var(--slate)" }}>Kindly wait — we'll notify you!</strong>
              </p>
              <button className="btn-primary" onClick={() => setShowComingSoon(false)}
                style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "13px 24px", borderRadius: 13 }}>
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

/* ── Sign Up ── */
const SignUp = ({ onNav }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const submit = e => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setShowComingSoon(true); }, 1200); };
  return (
    <main style={{ minHeight: "100vh", background: "var(--slate-50)", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 20px" }}>
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }} style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}><Logo onClick={() => onNav("landing")} /></div>
          <h1 className="brig" style={{ fontSize: 28, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.03em" }}>Create your account</h1>
          <p style={{ fontSize: 14, color: "var(--slate-500)", marginTop: 6 }}>Start your interview practice journey today.</p>
        </div>
        <div className="card" style={{ padding: 32 }}>
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div><label>Full Name</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" disabled={loading} /></div>
            <div><label>Email Address</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" disabled={loading} /></div>
            <div><label>Password</label><input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" disabled={loading} /></div>
            <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "13px", marginTop: 4 }}>
              {loading ? <><span className="spin"><RefreshCw size={16} /></span> Creating account…</> : <><UserPlus size={16} /> Create account</>}
            </button>
          </form>
          <div style={{ height: 1, background: "var(--border)", margin: "22px 0" }} />
          <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--slate-500)" }}>
            Already have an account?{" "}
            <span onClick={() => onNav("signin")} style={{ color: "var(--teal)", fontWeight: 600, cursor: "pointer", transition: "color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--teal-dark)"} onMouseLeave={e => e.currentTarget.style.color = "var(--teal)"}>Sign in →</span>
          </p>
        </div>
      </motion.div>

      {/* ── Coming Soon popup ── */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.65)", backdropFilter: "blur(10px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
            onClick={e => e.target === e.currentTarget && setShowComingSoon(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 12 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: "var(--card)", borderRadius: 20, boxShadow: "0 32px 80px rgba(15,23,42,.25)", width: "100%", maxWidth: 400, textAlign: "center", padding: "56px 40px 48px" }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
                style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--teal-light)", border: "2px solid var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 8px 24px rgba(20,184,166,.25)" }}>
                <UserPlus size={32} style={{ color: "var(--teal)" }} strokeWidth={2.5} />
              </motion.div>
              <h2 className="brig" style={{ fontSize: 22, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.02em", marginBottom: 10 }}>Sign Up Coming Soon 🚀</h2>
              <p style={{ fontSize: 14.5, color: "var(--slate-500)", lineHeight: 1.65, marginBottom: 28 }}>
                Account creation will be available after our launch date.<br />
                <strong style={{ color: "var(--slate)" }}>Kindly wait — we'll notify you!</strong>
              </p>
              <button className="btn-primary" onClick={() => setShowComingSoon(false)}
                style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "13px 24px", borderRadius: 13 }}>
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};


const NewInterview = ({ onNav, onUpgrade, onSelectPersona, showToast }) => {
  const [cv, setCv] = useState(false);
  const [avatar, setAvatar] = useState(1);
  const [form, setForm] = useState({ company: "Google", role: "Software Engineer L5", level: "Mid-Level (3–5 yrs)", language: "English", focus: "Balanced (Technical + Behavioral)" });
  const [showCountdown, setShowCountdown] = useState(false);
  const selAv = PERSONAS.find(a => a.id === avatar);

  const PRESETS = [
    { label: "Google SWE L5", icon: "🔵", company: "Google", role: "Software Engineer L5", focus: "Technical Deep Dive", level: "Mid-Level (3–5 yrs)" },
    { label: "McKinsey Case", icon: "🟡", company: "McKinsey", role: "Associate Consultant", focus: "Case Study", level: "Entry Level (0–2 yrs)" },
    { label: "Amazon PM", icon: "🟠", company: "Amazon", role: "Product Manager", focus: "Behavioral / STAR Method", level: "Mid-Level (3–5 yrs)" },
    { label: "Goldman IB", icon: "🔷", company: "Goldman", role: "Investment Banking Analyst", focus: "Behavioral / STAR Method", level: "Entry Level (0–2 yrs)" },
  ];

  const TIPS = [
    "The STAR method works best when your 'Result' includes a number. '40% faster' beats 'much faster'.",
    "Interviewers remember how you made them feel. Confidence + warmth is a rare combo — practice both.",
    "Pause for 3 seconds before answering hard questions. It signals composure, not confusion.",
    "End every answer with a mini-summary: 'So in short, the outcome was X.' Interviewers love structure.",
    "Ask one smart question at the end. It signals genuine interest and resets the power dynamic.",
  ];
  const tip = TIPS[new Date().getDay() % TIPS.length];

  const startInterview = () => {
    if (onSelectPersona) onSelectPersona(selAv);
    onNav("interview");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} style={{ position: "relative" }}>
      <AnimatePresence>
        {showCountdown && (
          <CountdownModal
            persona={selAv}
            onStart={() => { setShowCountdown(false); onNav("interview"); }}
            onCancel={() => setShowCountdown(false)}
          />
        )}
      </AnimatePresence>

      <div style={{ marginBottom: 20 }}>
        <h1 className="brig" style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.03em" }}>New Interview Session</h1>
        <p style={{ fontSize: 14, color: "var(--slate-500)", marginTop: 5 }}>Configure your session below, then start when ready.</p>
      </div>

      {/* ── Tip of the Day ── */}
      <div className="tip-card" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", position: "relative", zIndex: 1 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(13,148,136,.25)", border: "1px solid rgba(13,148,136,.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Sparkles size={16} style={{ color: "var(--teal-mid)" }} />
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--teal-mid)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>Coach Tip of the Day</div>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.75)", lineHeight: 1.65 }}>{tip}</p>
          </div>
        </div>
      </div>

      {/* ── Quick-Start Presets ── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--slate-500)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Quick Start</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {PRESETS.map(p => (
            <button key={p.label} className="preset-btn"
              onClick={() => setForm(f => ({ ...f, company: p.company, role: p.role, focus: p.focus, level: p.level }))}>
              <span style={{ fontSize: 16 }}>{p.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--slate)", fontFamily: "'Bricolage Grotesque',sans-serif" }}>{p.label}</span>
              <span style={{ fontSize: 10, color: "var(--slate-400)", whiteSpace: "nowrap" }}>{p.focus.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="dash-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
          {/* CV Upload — Drag & Drop */}
          {(() => {
            const [dragging, setDragging] = useState(false);
            const handleDrop = e => {
              e.preventDefault(); setDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) setCv(file.name || true);
            };
            return (
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => !cv && setCv("resume_alex_johnson.pdf")}
                style={{
                  borderRadius: 16, border: cv ? "2px solid var(--teal)" : dragging ? "2px solid var(--teal)" : "2px dashed var(--border-strong)",
                  background: cv ? "var(--teal-light)" : dragging ? "rgba(13,148,136,.05)" : "var(--white)",
                  padding: "28px 24px", cursor: cv ? "default" : "pointer",
                  transition: "all 0.22s ease", position: "relative", overflow: "hidden",
                  boxShadow: dragging ? "0 0 0 4px rgba(13,148,136,.15)" : "var(--shadow-sm)",
                }}>
                {/* Progress bar shimmer when dragging */}
                {dragging && <div style={{ position: "absolute", bottom: 0, left: 0, height: 3, width: "100%", background: "linear-gradient(90deg,var(--teal),var(--teal-mid),var(--teal))", backgroundSize: "200% 100%", animation: "shimmer 1.2s infinite", borderRadius: "0 0 14px 14px" }} />}
                <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
                {cv ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 13, background: "rgba(13,148,136,.18)", border: "1.5px solid rgba(13,148,136,.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 26 }}>📄</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="brig" style={{ fontSize: 14.5, fontWeight: 700, color: "var(--teal-dark)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{typeof cv === "string" ? cv : "resume_alex_johnson.pdf"}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }} />
                        <span style={{ fontSize: 12, color: "var(--green)", fontWeight: 600 }}>AI parsing complete — questions are now tailored to your CV</span>
                      </div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); setCv(false); }} style={{ padding: "6px 12px", borderRadius: 8, border: "1.5px solid rgba(13,148,136,.3)", background: "rgba(255,255,255,.7)", color: "var(--teal-dark)", fontSize: 12, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "all 0.18s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,1)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.7)"; e.currentTarget.style.boxShadow = "none"; }}>
                      Replace
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: 54, height: 54, borderRadius: 14, background: dragging ? "rgba(13,148,136,.1)" : "var(--slate-100)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: "var(--slate-400)", transition: "all 0.22s", border: dragging ? "1.5px solid rgba(13,148,136,.35)" : "1.5px solid transparent" }}>
                      <Upload size={24} style={{ color: dragging ? "var(--teal)" : "var(--slate-400)" }} />
                    </div>
                    <div className="brig" style={{ fontSize: 15, fontWeight: 700, color: dragging ? "var(--teal-dark)" : "var(--slate)", marginBottom: 6 }}>
                      {dragging ? "Release to upload" : "Drag & Drop your CV here"}
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--slate-500)", lineHeight: 1.6 }}>
                      or <span style={{ color: "var(--teal)", fontWeight: 600, textDecoration: "underline" }}>click to browse</span> · PDF or DOCX · Max 5MB
                    </div>
                    <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
                      {["CV questions personalised", "Skill gap analysis", "3x better relevance"].map(l => (
                        <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--slate-500)", background: "var(--slate-50)", padding: "3px 9px", borderRadius: 12, border: "1px solid var(--border)" }}>
                          <Check size={9} style={{ color: "var(--teal)" }} strokeWidth={3} />{l}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
          {/* Config */}
          <div className="card" style={{ padding: 26 }}>
            <div className="brig" style={{ fontSize: 15, fontWeight: 700, color: "var(--slate)", marginBottom: 20 }}>Interview Configuration</div>
            <div className="config-grid">
              {[{ label: "Target Company", key: "company", ph: "e.g. Google, McKinsey" }, { label: "Job Role / Title", key: "role", ph: "e.g. Software Engineer L5" }].map(({ label, key, ph }) => (
                <div key={key}><label>{label}</label><input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={ph} /></div>
              ))}
              <div><label>Experience Level</label><select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>{["Entry Level (0–2 yrs)", "Mid-Level (3–5 yrs)", "Senior (5–8 yrs)", "Staff / Principal"].map(o => <option key={o}>{o}</option>)}</select></div>
              <div><label>Interview Language</label><select value={form.language} onChange={e => setForm({ ...form, language: e.target.value })}>{["English", "Mandarin (Chinese)", "Hindi", "French", "Arabic", "Spanish", "English + Hindi (Mixed)"].map(o => <option key={o}>{o}</option>)}</select></div>
            </div>
            <div style={{ marginTop: 16 }}><label>Interview Focus</label><select value={form.focus} onChange={e => setForm({ ...form, focus: e.target.value })}>{["Balanced (Technical + Behavioral)", "Technical Deep Dive", "Behavioral / STAR Method", "Case Study", "System Design"].map(o => <option key={o}>{o}</option>)}</select></div>
          </div>
          {/* Recent */}
          <div className="card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "15px 22px", borderBottom: "1px solid var(--border)" }}><div className="brig" style={{ fontSize: 14, fontWeight: 700, color: "var(--slate)" }}>Recent Sessions</div></div>
            {[{ co: "Stripe", role: "SWE", score: 82, date: "Feb 18" }, { co: "Meta", role: "PM", score: 74, date: "Feb 14" }, { co: "Deloitte", role: "Analyst", score: 91, date: "Feb 9" }].map(({ co, role, score, date }, i) => (
              <div key={i} onClick={() => onNav("report")} style={{ display: "flex", alignItems: "center", padding: "13px 22px", borderBottom: i < 2 ? "1px solid var(--border)" : "none", cursor: "pointer", transition: "background 0.18s", gap: 12 }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--slate-50)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ flex: 1, minWidth: 0 }}><span className="brig" style={{ fontSize: 13.5, fontWeight: 700, color: "var(--slate)" }}>{co}</span><span style={{ fontSize: 13, color: "var(--slate-500)", marginLeft: 6 }}>· {role}</span></div>
                <Tag color={score >= 80 ? "green" : score >= 70 ? "amber" : "red"} size="xs">{score}/100</Tag>
                <span style={{ fontSize: 12, color: "var(--slate-300)", whiteSpace: "nowrap", marginLeft: 8 }}>{date}</span>
                <ChevronRight size={15} style={{ color: "var(--slate-200)", flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
        {/* Right col */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
          <div className="card" style={{ padding: 22 }}>
            <div className="brig" style={{ fontSize: 14, fontWeight: 700, color: "var(--slate)", marginBottom: 3 }}>Interviewer Persona</div>
            <p style={{ fontSize: 12, color: "var(--slate-500)", marginBottom: 16 }}>Pro Plan: 3 personas available</p>
            {PERSONAS.slice(0, 3).map(p => (
              <div key={p.id} onClick={() => setAvatar(p.id)} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 13px", borderRadius: 11, cursor: "pointer", marginBottom: 10, background: avatar === p.id ? "var(--teal-light)" : "var(--slate-50)", border: `1.5px solid ${avatar === p.id ? "rgba(13,148,136,.4)" : "var(--border)"}`, transition: "all 0.2s", overflow: "hidden" }}
                onMouseEnter={e => { if (avatar !== p.id) { e.currentTarget.style.borderColor = "rgba(13,148,136,.25)"; e.currentTarget.style.background = "rgba(204,251,241,.4)"; } }}
                onMouseLeave={e => { if (avatar !== p.id) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--slate-50)"; } }}>
                <PersonaAvatar persona={p} size={38} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="brig" style={{ fontSize: 13.5, fontWeight: 700, color: "var(--slate)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: p.accentColor, fontWeight: 600, marginTop: 1 }}>{p.difficulty}</div>
                </div>
                {avatar === p.id && <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Check size={11} color="#fff" strokeWidth={3} /></div>}
              </div>
            ))}
            <div className="card-interactive" onClick={() => onUpgrade("Elite")} style={{ padding: "11px 14px", background: "var(--amber-light)", borderRadius: 11, border: "1px solid rgba(217,119,6,.22)", display: "flex", gap: 9, alignItems: "center", marginTop: 4 }}>
              <Zap size={14} style={{ color: "var(--amber)", flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "var(--amber)", fontWeight: 500, flex: 1, lineHeight: 1.5 }}>Upgrade to Elite for all 6 personas.</span>
              <ArrowUpRight size={13} style={{ color: "var(--amber)", flexShrink: 0 }} />
            </div>
          </div>
          <div style={{ background: "var(--slate)", borderRadius: 16, padding: "24px 22px", boxShadow: "var(--shadow-xl)" }}>
            <div className="brig" style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,.88)", marginBottom: 16 }}>Session Summary</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[{ l: "Company", v: form.company }, { l: "Role", v: form.role }, { l: "Level", v: form.level }, { l: "Language", v: form.language }, { l: "Persona", v: selAv?.title }, { l: "CV", v: cv ? `✓ ${typeof cv === "string" ? cv : "Uploaded"}` : "Not uploaded" }].map(({ l, v }) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,.38)", flexShrink: 0 }}>{l}</span>
                  <span style={{ fontSize: 12, color: cv && l === "CV" ? "#86EFAC" : "rgba(255,255,255,.78)", fontWeight: 500, textAlign: "right", overflow: "hidden", textOverflow: "ellipsis" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,.08)", margin: "18px 0" }} />
            <button className="btn-primary" onClick={startInterview} style={{ width: "100%", justifyContent: "center", fontSize: 14, padding: "13px" }}>
              <div className="dot-live" style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} /> Start Live Interview
            </button>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,.28)", textAlign: "center", marginTop: 9 }}>Uses 1 interview credit</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── My Reports ── */
const MyReports = ({ onNav }) => {
  const [filter, setFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const FILTERS = ["All", "Technical", "Behavioral", "Case Study", "Balanced"];
  const S = [
    { co: "Google", role: "Software Engineer L5", score: 78, date: "Feb 21, 2026", dur: "34:12", persona: "Stress-Tester", tag: "Technical" },
    { co: "Stripe", role: "Software Engineer", score: 82, date: "Feb 18, 2026", dur: "28:44", persona: "Friendly Peer", tag: "Balanced" },
    { co: "Meta", role: "Product Manager", score: 74, date: "Feb 14, 2026", dur: "41:05", persona: "Empath Listener", tag: "Behavioral" },
    { co: "Deloitte", role: "Business Analyst", score: 91, date: "Feb 9, 2026", dur: "35:20", persona: "Stoic Veteran", tag: "Case Study" },
    { co: "McKinsey", role: "Associate Consultant", score: 69, date: "Feb 3, 2026", dur: "38:15", persona: "Devil's Advocate", tag: "Case Study" },
    { co: "Goldman", role: "Investment Banking Analyst", score: 85, date: "Jan 28, 2026", dur: "29:58", persona: "Silent Analyst", tag: "Behavioral" },
    { co: "Amazon", role: "SDE II", score: 71, date: "Jan 22, 2026", dur: "33:44", persona: "Stress-Tester", tag: "Technical" },
  ];
  const filtered = filter === "All" ? S : S.filter(s => s.tag === filter);
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="brig" style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.03em" }}>My Reports</h1>
          <p style={{ fontSize: 14, color: "var(--slate-500)", marginTop: 5 }}>Review past performance and track improvement.</p>
        </div>
        <button className="btn-primary" onClick={() => onNav("dashboard")} style={{ fontSize: 13 }}><Zap size={14} /> New Interview</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 24 }}>
        {[{ label: "Sessions Done", value: "23", icon: <Video size={18} />, color: "var(--teal)" }, { label: "Avg. Score", value: "78.6", icon: <BarChart2 size={18} />, color: "#0369A1" }, { label: "Best Score", value: "91", icon: <Award size={18} />, color: "var(--green)" }, { label: "Credits Left", value: "17", icon: <Zap size={18} />, color: "var(--amber)" }].map(({ label, value, icon, color }) => (
          <div key={label} className="card card-lift" style={{ padding: "18px 20px" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}12`, display: "flex", alignItems: "center", justifyContent: "center", color, marginBottom: 10 }}>{icon}</div>
            <div className="brig" style={{ fontSize: 26, fontWeight: 800, color: "var(--slate)", letterSpacing: "-0.02em" }}>{value}</div>
            <div style={{ fontSize: 12, color: "var(--slate-500)", marginTop: 2, fontWeight: 500 }}>{label}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "15px 22px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span className="brig" style={{ fontSize: 14, fontWeight: 700, color: "var(--slate)" }}>Interview History</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, color: "var(--slate-400)" }}>{filtered.length} of {S.length} shown</span>
            <div style={{ position: "relative" }}>
              <button className="btn-ghost" style={{ fontSize: 12, padding: "5px 10px", background: showFilter ? "var(--slate-100)" : "transparent" }} onClick={() => setShowFilter(f => !f)}>
                Filter {filter !== "All" ? `· ${filter}` : "↓"}
              </button>
              <AnimatePresence>
                {showFilter && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}
                    style={{ position: "absolute", right: 0, top: "calc(100% + 6px)", background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 12, padding: "6px", zIndex: 50, minWidth: 150, boxShadow: "var(--shadow-lg)" }}>
                    {FILTERS.map(f => (
                      <button key={f} onClick={() => { setFilter(f); setShowFilter(false); }}
                        style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 14px", borderRadius: 8, border: "none", background: filter === f ? "var(--teal-light)" : "transparent", color: filter === f ? "var(--teal-dark)" : "var(--slate-600)", fontSize: 13, fontWeight: filter === f ? 600 : 400, cursor: "pointer", transition: "all 0.15s", fontFamily: "'DM Sans',sans-serif" }}
                        onMouseEnter={e => { if (filter !== f) e.currentTarget.style.background = "var(--slate-50)"; }}
                        onMouseLeave={e => { if (filter !== f) e.currentTarget.style.background = "transparent"; }}>
                        {f}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        {/* Column header — hidden on mobile via CSS */}
        <div className="rpt-row-header">
          {["Role / Company", "Persona", "Score", "Date", ""].map((h, i) => (
            <div key={i} style={{ fontSize: 10.5, fontWeight: 700, color: "var(--slate-400)", letterSpacing: "0.07em", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ padding: "32px", textAlign: "center", color: "var(--slate-400)", fontSize: 14 }}>
            No interviews match this filter.
            <button className="btn-ghost" style={{ display: "block", margin: "12px auto 0", fontSize: 13 }} onClick={() => setFilter("All")}>Clear filter</button>
          </div>
        )}
        {filtered.map(({ co, role, score, date, dur, persona, tag }, i) => (
          <div key={i} onClick={() => onNav("report")} className="rpt-row"
            style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}>
            {/* Mobile: stacked card layout; Desktop: grid columns */}
            {/* Row 1 — always visible */}
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3, flexWrap: "wrap" }}>
                <span className="brig" style={{ fontSize: 13.5, fontWeight: 700, color: "var(--slate)" }}>{co}</span>
                <Tag color="slate" size="xs">{tag}</Tag>
                {/* Score badge shown inline on mobile only */}
                <span className="rpt-mob-score" style={{ display: "none" }}><Tag color={score >= 80 ? "green" : score >= 70 ? "amber" : "red"} size="xs">{score}/100</Tag></span>
              </div>
              <div style={{ fontSize: 12, color: "var(--slate-500)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{role} · {dur}</div>
            </div>
            {/* Persona — hidden on mobile, shown desktop */}
            <div className="rpt-cell-hide-mob" style={{ fontSize: 12.5, color: "var(--slate-700)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 8 }}>{persona}</div>
            {/* Score — hidden on mobile (shown inline above) */}
            <div className="rpt-cell-hide-mob"><Tag color={score >= 80 ? "green" : score >= 70 ? "amber" : "red"} size="xs">{score}/100</Tag></div>
            {/* Date */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--slate-400)", whiteSpace: "nowrap" }}>{date.split(",")[0]}</span>
              {/* Persona shown on mobile below date */}
              <span style={{ fontSize: 11, color: "var(--slate-500)", display: "none" }} className="rpt-mob-persona">{persona}</span>
            </div>
            <ChevronRight size={14} style={{ color: "var(--slate-200)" }} className="rpt-cell-hide-mob" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

/* ── Progress ── */
const Progress = () => {
  const W = [62, 70, 74, 68, 78, 82, 78];
  const D = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 className="brig" style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.03em" }}>Progress</h1>
        <p style={{ fontSize: 14, color: "var(--slate-500)", marginTop: 5 }}>Track your improvement over time.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 24 }}>
        {[{ label: "Score Trend", value: "+6.2", sub: "vs last week", icon: <TrendingUp size={18} />, color: "var(--green)" }, { label: "Sessions / Month", value: "11", sub: "of 40 used", icon: <Target size={18} />, color: "var(--teal)" }, { label: "Top Skill", value: "Culture Fit", sub: "avg 85/100", icon: <Award size={18} />, color: "#7C3AED" }, { label: "Needs Work", value: "STAR Method", sub: "avg 68/100", icon: <AlertCircle size={18} />, color: "var(--amber)" }].map(({ label, value, sub, icon, color }) => (
          <div key={label} className="card card-lift" style={{ padding: "18px 20px" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}12`, display: "flex", alignItems: "center", justifyContent: "center", color, marginBottom: 10 }}>{icon}</div>
            <div className="brig" style={{ fontSize: value.length > 5 ? 15 : 24, fontWeight: 800, color: "var(--slate)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{value}</div>
            <div style={{ fontSize: 12, color: "var(--slate-500)", marginTop: 2 }}>{label}</div>
            <div style={{ fontSize: 11, color: "var(--slate-400)", marginTop: 1 }}>{sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
        <div className="card" style={{ padding: 26 }}>
          <div className="brig" style={{ fontSize: 14, fontWeight: 700, color: "var(--slate)", marginBottom: 4 }}>Score This Week</div>
          <p style={{ fontSize: 12, color: "var(--slate-500)", marginBottom: 22 }}>Daily average across all sessions</p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 130 }}>
            {W.map((val, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: i === 6 ? "var(--teal)" : "var(--slate-500)", fontFamily: "'Bricolage Grotesque',sans-serif" }}>{val}</span>
                <motion.div initial={{ height: 0 }} animate={{ height: `${(val / 100) * 110}px` }} transition={{ duration: 0.9, delay: i * 0.07, ease: [0.25, 1, 0.5, 1] }}
                  style={{ width: "100%", borderRadius: 7, background: i === 6 ? "var(--teal)" : "var(--teal-light)", border: i === 6 ? "none" : "1px solid rgba(13,148,136,.2)", cursor: "default", transition: "transform 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scaleY(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = ""} />
                <span style={{ fontSize: 10, color: "var(--slate-400)" }}>{D[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 26 }}>
          <div className="brig" style={{ fontSize: 14, fontWeight: 700, color: "var(--slate)", marginBottom: 18 }}>Skill Averages</div>
          {[{ label: "Communication", value: 82, color: "var(--teal)" }, { label: "Technical", value: 74, color: "#0369A1" }, { label: "Confidence", value: 79, color: "#7C3AED" }, { label: "Culture Fit", value: 85, color: "var(--green)" }, { label: "STAR Method", value: 68, color: "var(--amber)" }].map(m => <MetricBar key={m.label} {...m} />)}
        </div>
      </div>

      {/* Monthly improvement chart */}
      <div className="card" style={{ padding: 26, marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4, flexWrap: "wrap", gap: 8 }}>
          <div>
            <div className="brig" style={{ fontSize: 14, fontWeight: 700, color: "var(--slate)", marginBottom: 2 }}>Monthly Improvement</div>
            <p style={{ fontSize: 12, color: "var(--slate-500)" }}>Average score per month over the last 6 months</p>
          </div>
          <Tag color="green" size="xs">+19 pts since Sep</Tag>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 150, marginTop: 24 }}>
          {[
            { month: "Sep", val: 59, hi: false },
            { month: "Oct", val: 63, hi: false },
            { month: "Nov", val: 68, hi: false },
            { month: "Dec", val: 71, hi: false },
            { month: "Jan", val: 74, hi: false },
            { month: "Feb", val: 78, hi: true },
          ].map(({ month, val, hi }, i) => (
            <div key={month} className="mth-bar">
              <span style={{ fontSize: 11, fontWeight: 700, color: hi ? "var(--teal)" : "var(--slate-500)", fontFamily: "'Bricolage Grotesque',sans-serif" }}>{val}</span>
              <motion.div
                className="mth-fill"
                initial={{ height: 0 }}
                animate={{ height: `${(val / 100) * 120}px` }}
                transition={{ duration: 0.85, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  background: hi
                    ? "linear-gradient(180deg,var(--teal),var(--teal-dark))"
                    : "linear-gradient(180deg,var(--teal-light),rgba(204,251,241,.5))",
                  border: hi ? "none" : "1px solid rgba(13,148,136,.2)",
                }}
              />
              <span style={{ fontSize: 10, color: "var(--slate-400)" }}>{month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interview History Table */}
      <div className="card" style={{ overflow: "hidden", marginTop: 20 }}>
        <div style={{ padding: "15px 22px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="brig" style={{ fontSize: 14, fontWeight: 700, color: "var(--slate)" }}>Interview History</span>
          <Tag color="slate" size="xs">Last 30 days</Tag>
        </div>
        <div className="phist-hdr">
          {["Role", "Persona", "Score", "Date"].map((h, i) => <div key={i} style={{ fontSize: 10.5, fontWeight: 700, color: "var(--slate-400)", letterSpacing: "0.07em", textTransform: "uppercase" }}>{h}</div>)}
        </div>
        {[
          { role: "SWE L5 – Google", persona: "Stress-Tester", score: 78, date: "Feb 21", sc: "var(--amber)" },
          { role: "SWE – Stripe", persona: "Friendly Peer", score: 82, date: "Feb 18", sc: "var(--green)" },
          { role: "PM – Meta", persona: "Empath Listener", score: 74, date: "Feb 14", sc: "var(--amber)" },
          { role: "Analyst – Deloitte", persona: "Stoic Veteran", score: 91, date: "Feb 9", sc: "var(--green)" },
          { role: "Consultant – McKinsey", persona: "Devil's Advocate", score: 69, date: "Feb 3", sc: "var(--red)" },
        ].map(({ role, persona, score, date, sc }, i, arr) => (
          <div key={i} className="phist-row"
            style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none", cursor: "default" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--slate-50)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <div>
              <span className="brig" style={{ fontSize: 13.5, fontWeight: 700, color: "var(--slate)" }}>{role}</span>
              {/* Mobile: show persona below role */}
              <div style={{ fontSize: 11, color: "var(--slate-500)", marginTop: 2 }} className="phist-mob-sub">{persona} · <span style={{ fontWeight: 700, color: sc }}>{score}/100</span></div>
            </div>
            <span style={{ fontSize: 13, color: "var(--slate-600)" }} className="phist-desk">{persona}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: sc }} className="phist-desk">{score}/100</span>
            <span style={{ fontSize: 12, color: "var(--slate-400)" }}>{date}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

/* ── Avatars / Personas ── */
const AvatarsView = ({ onUpgrade, onNav, onSelectPersona }) => {
  const [sel, setSel] = useState(1);
  const [showCountdown, setShowCountdown] = useState(false);
  const selected = PERSONAS.find(p => p.id === sel);

  const DIFF_ORDER = { "Deceptive": 1, "Medium": 2, "Hard": 3, "Psychological": 3, "Brutal": 4 };

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} style={{ position: "relative" }}>
      <AnimatePresence>
        {showCountdown && selected && (
          <CountdownModal
            persona={selected}
            onStart={() => { setShowCountdown(false); if (onSelectPersona) onSelectPersona(selected); onNav("interview"); }}
            onCancel={() => setShowCountdown(false)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 className="brig" style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.03em" }}>
          Interviewer Personas
        </h1>
        <p style={{ fontSize: 14, color: "var(--slate-500)", marginTop: 5, maxWidth: 560 }}>
          Real interviews aren't just about what you know — they're about who's asking. Train against 6 distinct behavioral archetypes.
        </p>
      </div>

      {/* Upgrade banner */}
      <div className="card-interactive" onClick={() => onUpgrade("Elite")} style={{ background: "var(--amber-light)", border: "1px solid rgba(217,119,6,.25)", borderRadius: 13, padding: "14px 18px", display: "flex", gap: 12, alignItems: "center", marginBottom: 28, flexWrap: "wrap" }}>
        <Zap size={16} style={{ color: "var(--amber)", flexShrink: 0 }} />
        <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--amber)", flex: 1, lineHeight: 1.4 }}>
          Pro Plan: 3 of 6 personas unlocked. Upgrade to Elite to train against all personality archetypes.
        </span>
        <button className="btn-secondary" style={{ fontSize: 12, padding: "7px 14px", whiteSpace: "nowrap" }} onClick={e => { e.stopPropagation(); onUpgrade("Elite"); }}>
          <ArrowUpRight size={13} /> Upgrade to Elite
        </button>
      </div>

      {/* Persona grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 18, marginBottom: 32 }}>
        {PERSONAS.map((p, idx) => {
          const locked = idx >= 3; // starter=1 unlocked, pro=3 unlocked
          const active = sel === p.id && !locked;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: idx * 0.06 }}
              onClick={() => !locked && setSel(p.id)}
              style={{
                borderRadius: 18, overflow: "hidden",
                border: `1.5px solid ${active ? p.accentColor + "80" : "var(--border)"}`,
                background: locked ? "var(--slate-50)" : "var(--white)",
                cursor: locked ? "not-allowed" : "pointer",
                opacity: locked ? 0.58 : 1,
                transition: "all 0.25s ease",
                position: "relative",
                boxShadow: active ? `0 0 0 4px ${p.accentColor}18, var(--shadow-md)` : "var(--shadow-sm)",
              }}
              onMouseEnter={e => { if (!locked && !active) { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = active ? `0 0 0 4px ${p.accentColor}18, var(--shadow-md)` : "var(--shadow-sm)"; }}>

              {/* Color band header */}
              <div style={{ height: 6, background: `linear-gradient(90deg, ${p.accentColor}, ${p.accentColor}88)` }} />

              <div style={{ padding: "20px 22px 22px" }}>
                {/* Top row: emoji avatar + lock/check */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ position: "relative" }}>
                    <div style={{ transition: "transform 0.25s", borderRadius: "50%" }}
                      onMouseEnter={e => { if (!locked) e.currentTarget.style.transform = "scale(1.1)"; }}
                      onMouseLeave={e => e.currentTarget.style.transform = ""}>
                      <PersonaAvatar persona={p} size={62} shadow />
                    </div>
                    {/* Online indicator dot */}
                    {!locked && (
                      <div style={{ position: "absolute", bottom: 2, right: 2, width: 13, height: 13, borderRadius: "50%", background: active ? "var(--teal)" : "var(--slate-300)", border: "2px solid var(--white)", transition: "background 0.2s" }} />
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    {locked && (
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <Lock size={11} style={{ color: "var(--slate-400)" }} />
                        <Tag color="amber" size="xs">Elite</Tag>
                      </div>
                    )}
                    {active && (
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(13,148,136,.4)" }}>
                        <Check size={13} color="#fff" strokeWidth={3} />
                      </div>
                    )}
                    {/* Difficulty badge */}
                    <div style={{ background: p.diffBg, color: p.diffColor, fontSize: 10.5, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.04em", border: `1px solid ${p.accentColor}28`, whiteSpace: "nowrap" }}>
                      {p.difficulty}
                    </div>
                  </div>
                </div>

                {/* Name + handle */}
                <div className="brig" style={{ fontSize: 17, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.015em", marginBottom: 2 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: p.accentColor, fontWeight: 600, marginBottom: 10 }}>{p.style}</div>

                {/* Vibe description */}
                <p style={{ fontSize: 13, color: "var(--slate-500)", lineHeight: 1.65, marginBottom: 14 }}>{p.vibe}</p>

                {/* Trait pills */}
                <div style={{ height: 1, background: "var(--border)", marginBottom: 14 }} />
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.traits.map(t => (
                    <span key={t} style={{ fontSize: 11, color: "var(--slate-600)", background: "var(--slate-100)", padding: "3px 9px", borderRadius: 12, fontWeight: 500, border: "1px solid var(--border)", whiteSpace: "nowrap" }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected persona detail panel */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div key={selected.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
            style={{ background: "var(--slate)", borderRadius: 18, padding: "clamp(18px,4vw,28px) clamp(16px,5vw,32px)", boxShadow: "var(--shadow-xl)", border: "1px solid rgba(255,255,255,.05)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-30%", right: "-5%", width: 400, height: 350, background: `radial-gradient(ellipse,${selected.accentColor}22 0%,transparent 65%)`, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
              <PersonaAvatar persona={selected} size={56} />
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                  <span className="brig" style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>{selected.title}</span>
                  <span style={{ fontSize: 12, color: `${selected.accentColor}CC`, fontWeight: 600 }}>{selected.style}</span>
                  <span style={{ background: selected.diffBg, color: selected.diffColor, fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 14, border: `1px solid ${selected.accentColor}30` }}>{selected.difficulty}</span>
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.7, maxWidth: 600 }}>{selected.vibe}</p>
              </div>
              <button className="btn-primary" style={{ fontSize: 13, padding: "11px 22px", flexShrink: 0 }}
                onClick={() => setShowCountdown(true)}>
                <Zap size={14} /> Practice with this persona
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Settings ── */
const SettingsView = ({ onUpgrade }) => {
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({ email: true, weekly: true, tips: false });
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const Toggle = ({ k }) => (
    <div onClick={() => setNotifs(n => ({ ...n, [k]: !n[k] }))}
      style={{ width: 44, height: 24, borderRadius: 12, background: notifs[k] ? "var(--teal)" : "var(--slate-200)", cursor: "pointer", position: "relative", transition: "background 0.22s", flexShrink: 0 }}>
      <motion.div animate={{ left: notifs[k] ? 22 : 2 }} transition={{ duration: 0.22, ease: "easeInOut" }}
        style={{ position: "absolute", top: 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,.18)" }} />
    </div>
  );
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 className="brig" style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.03em" }}>Settings</h1>
        <p style={{ fontSize: 14, color: "var(--slate-500)", marginTop: 5 }}>Manage your account, billing, and preferences.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 680 }}>
        <div className="card" style={{ padding: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center" }}><UserCircle size={17} style={{ color: "var(--teal)" }} /></div>
            <div className="brig" style={{ fontSize: 15, fontWeight: 700, color: "var(--slate)" }}>Profile</div>
          </div>
          <div className="config-grid">
            <div><label>First Name</label><input defaultValue="Alex" /></div>
            <div><label>Last Name</label><input defaultValue="Johnson" /></div>
            <div style={{ gridColumn: "1 / -1" }}><label>Email Address</label><input defaultValue="alex@example.com" /></div>
          </div>
        </div>
        <div className="card" style={{ padding: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center" }}><Bell size={17} style={{ color: "var(--teal)" }} /></div>
            <div className="brig" style={{ fontSize: 15, fontWeight: 700, color: "var(--slate)" }}>Notifications</div>
          </div>
          {[{ k: "email", label: "Email reminders", desc: "Remind me to practice before scheduled interviews" }, { k: "weekly", label: "Weekly progress digest", desc: "A weekly summary of my improvement" }, { k: "tips", label: "Interview tips & articles", desc: "Occasional coaching tips from our team" }].map(({ k, label, desc }) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: "1px solid var(--border)", gap: 16 }}>
              <div><div style={{ fontSize: 14, fontWeight: 500, color: "var(--slate)" }}>{label}</div><div style={{ fontSize: 12, color: "var(--slate-500)", marginTop: 2 }}>{desc}</div></div>
              <Toggle k={k} />
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center" }}><CreditCard size={17} style={{ color: "var(--teal)" }} /></div>
            <div className="brig" style={{ fontSize: 15, fontWeight: 700, color: "var(--slate)" }}>Plan & Billing</div>
          </div>
          <div style={{ background: "var(--teal-light)", border: "1px solid rgba(13,148,136,.2)", borderRadius: 12, padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div className="brig" style={{ fontSize: 18, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.02em" }}>Pro Plan</div>
                <div style={{ fontSize: 13, color: "var(--slate-600)", marginTop: 3 }}>23 / 40 interviews · 9 / 10 rechecks</div>
              </div>
              <button className="btn-secondary" onClick={() => onUpgrade("Elite")} style={{ fontSize: 13 }}><ArrowUpRight size={14} /> Upgrade to Elite</button>
            </div>
            <div style={{ height: 5, background: "rgba(13,148,136,.15)", borderRadius: 3, marginTop: 16, overflow: "hidden" }}>
              <div style={{ width: "57.5%", height: "100%", background: "var(--teal)", borderRadius: 3 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 11, color: "var(--teal-dark)", fontWeight: 600 }}>23 used</span>
              <span style={{ fontSize: 11, color: "var(--slate-500)" }}>17 remaining</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={save} style={{ fontSize: 14 }}>
            {saved ? <><Check size={15} /> Saved!</> : "Save Changes"}
          </button>
          <AnimatePresence>
            {saved && (
              <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                style={{ fontSize: 13, color: "var(--green)", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                <Check size={14} /> Changes saved successfully
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Pre-Interview Countdown Modal ── */
const CountdownModal = ({ persona, onStart, onCancel }) => {
  const [count, setCount] = useState(3);
  const RADIUS = 30, CIRC = 2 * Math.PI * RADIUS;  // 188

  useEffect(() => {
    if (count <= 0) { setTimeout(onStart, 300); return; }
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, background: "rgba(9,17,34,.88)", backdropFilter: "blur(16px)", zIndex: 500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
      {/* Persona avatar */}
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ textAlign: "center" }}>
        <div style={{ margin: "0 auto 16px", boxShadow: `0 0 48px ${persona.accentColor}40`, borderRadius: "50%" }}>
          <PersonaAvatar persona={persona} size={90} borderWidth={3} />
        </div>
        <div className="brig" style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>{persona.title}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginTop: 5 }}>is ready for your interview</div>
      </motion.div>

      {/* Countdown ring */}
      <motion.div key={count} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: "relative", width: 110, height: 110 }}>
        <svg width="110" height="110" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="55" cy="55" r={RADIUS} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="5" />
          <circle cx="55" cy="55" r={RADIUS} fill="none" stroke={count === 0 ? "var(--teal)" : persona.accentColor || "var(--teal)"}
            strokeWidth="5" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset="0"
            style={{ animation: `countdown-shrink 1s linear forwards` }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {count === 0
            ? <Zap size={36} color="var(--teal-mid)" strokeWidth={2} />
            : <span className="brig" style={{ fontSize: 48, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{count}</span>
          }
        </div>
      </motion.div>

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,.55)", marginBottom: 4 }}>
          {count === 0 ? "Starting now…" : "Get ready to answer"}
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.3)" }}>💡 Tip: Use STAR — Situation, Task, Action, Result</div>
      </div>

      <button onClick={onCancel} className="btn-ghost" style={{ color: "rgba(255,255,255,.35)", fontSize: 13 }}>Cancel</button>
    </motion.div>
  );
};

/* ── Code Editor Panel ── */
const CODE_QUESTIONS = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    diffColor: "#16A34A",
    tags: ["Array", "Hash Table"],
    prompt: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
  Input: nums = [2,7,11,15], target = 9
  Output: [0,1]
  Explanation: nums[0] + nums[1] = 2 + 7 = 9`,
    starterCode: `def two_sum(nums, target):
    # Your solution here
    pass

# Test
print(two_sum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print(two_sum([3, 2, 4], 6))       # Expected: [1, 2]`,
    hint: "Consider using a hash map to track seen numbers for O(n) time complexity.",
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Medium",
    diffColor: "#D97706",
    tags: ["String", "Stack"],
    prompt: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
  1. Open brackets must be closed by the same type of brackets.
  2. Open brackets must be closed in the correct order.

Example:
  Input: s = "()[]{}"
  Output: true`,
    starterCode: `def is_valid(s):
    # Your solution here
    pass

# Test
print(is_valid("()[]{}"))  # Expected: True
print(is_valid("(]"))      # Expected: False`,
    hint: "Use a stack — push open brackets, pop when you see a matching close bracket.",
  },
];

const LANGS = ["Python", "JavaScript", "Java", "C++", "TypeScript"];
const LANG_COMMENT = { Python: "# ", JavaScript: "// ", Java: "// ", "C++": "// ", TypeScript: "// " };
const LANG_COLORS = { Python: "#3B82F6", JavaScript: "#F59E0B", Java: "#DC2626", "C++": "#7C3AED", TypeScript: "#0EA5E9" };

const CodePanel = ({ activePersona, qIdx, elapsed }) => {
  const [codeQ, setCodeQ] = useState(0);
  const [lang, setLang] = useState("Python");
  const [code, setCode] = useState(CODE_QUESTIONS[0].starterCode);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showInterviewerView, setShowInterviewerView] = useState(false);
  const [lineCount, setLineCount] = useState(code.split("\n").length);
  const cq = CODE_QUESTIONS[codeQ];

  const handleLangChange = newLang => {
    setLang(newLang);
    setCode(`${LANG_COMMENT[newLang]}Write your ${newLang} solution here\n\n`);
    setOutput(""); setSubmitted(false);
  };
  const handleCodeChange = useCallback(v => { setCode(v); setLineCount(v.split("\n").length); setSubmitted(false); }, []);

  const runCode = () => {
    setRunning(true); setOutput("");
    setTimeout(() => {
      const results = codeQ.id === 1
        ? "✅ Test 1 passed: [0, 1]\n✅ Test 2 passed: [1, 2]\n\n⏱ Runtime: 48ms · Memory: 14.3 MB\n🎯 Time Complexity: O(n) · Space: O(n)"
        : "✅ Test 1 passed: True\n✅ Test 2 passed: False\n\n⏱ Runtime: 32ms · Memory: 13.8 MB\n🎯 Time Complexity: O(n) · Space: O(n)";
      setOutput(results); setRunning(false);
    }, 1400);
  };
  const submitCode = () => { setRunning(true); setTimeout(() => { setSubmitted(true); setRunning(false); setOutput("🏆 All test cases passed!\n\n✅ 72/72 test cases\n⏱ Runtime beats 94% of solutions\n📦 Memory beats 87% of solutions"); }, 1800); };

  return (
    <div className="code-panel-grid">
      {/* ── Question Panel ── */}
      <div style={{ borderRight: "1px solid rgba(255,255,255,.08)", display: "flex", flexDirection: "column", overflowY: "auto", background: "rgba(0,0,0,.2)" }}>
        {/* Question selector */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", gap: 8 }}>
          {CODE_QUESTIONS.map((q, i) => (
            <button key={q.id} onClick={() => { setCodeQ(i); setCode(q.starterCode); setOutput(""); setSubmitted(false); }}
              style={{ flex: 1, padding: "7px 10px", borderRadius: 9, border: `1.5px solid ${codeQ === i ? "var(--teal)" : "rgba(255,255,255,.1)"}`, background: codeQ === i ? "rgba(13,148,136,.18)" : "transparent", color: codeQ === i ? "var(--teal-mid)" : "rgba(255,255,255,.5)", fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontFamily: "'DM Sans',sans-serif" }}>
              Q{q.id}: {q.title}
            </button>
          ))}
        </div>
        {/* Problem statement */}
        <div style={{ padding: "16px", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span className="brig" style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,.9)" }}>{cq.title}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: cq.diffColor, background: `${cq.diffColor}22`, border: `1px solid ${cq.diffColor}44`, borderRadius: 6, padding: "2px 7px" }}>{cq.difficulty}</span>
          </div>
          <div style={{ display: "flex", gap: 5, marginBottom: 14 }}>
            {cq.tags.map(t => <span key={t} style={{ fontSize: 10, background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.5)", borderRadius: 5, padding: "2px 7px" }}>{t}</span>)}
          </div>
          <pre style={{ fontSize: 12, color: "rgba(255,255,255,.65)", lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "'DM Sans',sans-serif" }}>{cq.prompt}</pre>
          {/* Hint */}
          <div style={{ marginTop: 16, background: "rgba(13,148,136,.1)", border: "1px solid rgba(13,148,136,.2)", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--teal-mid)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 5 }}>💡 Hint</div>
            <p style={{ fontSize: 11.5, color: "rgba(255,255,255,.55)", lineHeight: 1.6 }}>{cq.hint}</p>
          </div>
          {/* Interviewer sees this */}
          <div style={{ marginTop: 16 }}>
            <button onClick={() => setShowInterviewerView(v => !v)}
              style={{ width: "100%", padding: "9px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "rgba(255,255,255,.5)", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.08)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.04)"}>
              <span>👀 Interviewer View</span>
              <span style={{ fontSize: 12 }}>{showInterviewerView ? "▲" : "▼"}</span>
            </button>
            <AnimatePresence>
              {showInterviewerView && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}>
                  <div style={{ marginTop: 8, background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.2)", borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#C4B5FD", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>🎯 Interviewer Can See</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {[`Language: ${lang}`, `Lines written: ${lineCount}`, `Last edit: just now`, running ? "⏳ Running code…" : submitted ? "✅ Submitted" : "📝 In progress"].map(item => (
                        <div key={item} style={{ fontSize: 11, color: "rgba(200,180,255,.75)", display: "flex", gap: 6, alignItems: "center" }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#A78BFA", flexShrink: 0 }} />
                          {item}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 10, padding: "8px 10px", background: "rgba(0,0,0,.25)", borderRadius: 7, fontFamily: "monospace", fontSize: 10, color: "rgba(200,180,255,.6)", lineHeight: 1.55, maxHeight: 80, overflow: "hidden" }}>
                      {code.slice(0, 180)}{code.length > 180 ? "…" : ""}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Editor + Output Panel ── */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
        {/* Editor Toolbar */}
        <div className="code-toolbar">
          <div style={{ display:"flex", gap:5 }}>
            {LANGS.map(l => (
              <button key={l} onClick={() => handleLangChange(l)}
                style={{ padding: "5px 10px", borderRadius: 7, border: `1.5px solid ${lang === l ? LANG_COLORS[l] : "rgba(255,255,255,.1)"}`, background: lang === l ? `${LANG_COLORS[l]}22` : "transparent", color: lang === l ? LANG_COLORS[l] : "rgba(255,255,255,.4)", fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontFamily: "'DM Sans',sans-serif" }}>
                {l}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 10, color: "rgba(255,255,255,.25)", fontFamily: "monospace" }}>{lineCount} lines</span>
          <button onClick={runCode} disabled={running}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, border: "none", background: running ? "rgba(255,255,255,.1)" : "rgba(13,148,136,.85)", color: "#fff", fontSize: 12, fontWeight: 700, cursor: running ? "not-allowed" : "pointer", transition: "all 0.2s", fontFamily: "'DM Sans',sans-serif" }}
            onMouseEnter={e => !running && (e.currentTarget.style.background = "rgba(13,148,136,1)")}
            onMouseLeave={e => !running && (e.currentTarget.style.background = "rgba(13,148,136,.85)")}>
            {running ? <><span className="spin"><RefreshCw size={12} /></span> Running…</> : "▶ Run Code"}
          </button>
          <button onClick={submitCode} disabled={running || submitted}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, border: "none", background: submitted ? "rgba(22,163,74,.3)" : running ? "rgba(255,255,255,.05)" : "rgba(22,163,74,.85)", color: submitted ? "#86EFAC" : "#fff", fontSize: 12, fontWeight: 700, cursor: (running || submitted) ? "not-allowed" : "pointer", transition: "all 0.2s", fontFamily: "'DM Sans',sans-serif" }}>
            {submitted ? <><Check size={12} /> Submitted</> : "Submit"}
          </button>
        </div>
        {/* Code Editor */}
        <div style={{ flex: 1, position: "relative", minHeight: 0, overflow: "hidden" }}>
          <textarea value={code} onChange={e => handleCodeChange(e.target.value)}
            spellCheck={false} autoComplete="off" autoCorrect="off"
            onKeyDown={e => {
              if (e.key === "Tab") {
                e.preventDefault();
                const el = e.target;
                const s = el.selectionStart, end = el.selectionEnd;
                const newVal = el.value.slice(0, s) + "  " + el.value.slice(end);
                el.value = newVal;
                el.selectionStart = el.selectionEnd = s + 2;
                handleCodeChange(newVal);
              }
              const pairs = { "(": ")", "{": "}", "[": "]" };
              if (pairs[e.key] && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                const el = e.target;
                const s = el.selectionStart;
                const newVal = el.value.slice(0, s) + e.key + pairs[e.key] + el.value.slice(el.selectionEnd);
                el.value = newVal;
                el.selectionStart = el.selectionEnd = s + 1;
                handleCodeChange(newVal);
              }
            }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "#0D1117", color: "#C9D1D9", fontFamily: "'JetBrains Mono','Fira Code',monospace", fontSize: 13, lineHeight: 1.7, padding: "20px 20px 20px 56px", border: "none", outline: "none", resize: "none", whiteSpace: "pre", overflowWrap: "normal", overflowX: "auto", boxSizing: "border-box", tabSize: 2 }} />
          {/* Line numbers */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 48, background: "#0D1117", borderRight: "1px solid rgba(255,255,255,.06)", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "flex-end", paddingRight: 8, pointerEvents: "none", overflow: "hidden" }}>
            {Array.from({ length: Math.max(lineCount, 20) }, (_, i) => (
              <div key={i} style={{ fontSize: 11, color: "rgba(255,255,255,.2)", lineHeight: "22.1px", fontFamily: "monospace", minHeight: "22.1px" }}>{i + 1}</div>
            ))}
          </div>
        </div>
        {/* Output Console */}
        <AnimatePresence>
          {(output || running) && (
            <motion.div initial={{ height: 0 }} animate={{ height: 140 }} exit={{ height: 0 }} transition={{ duration: 0.3 }}
              style={{ borderTop: "1px solid rgba(255,255,255,.08)", background: "#0A0E17", overflow: "hidden", flexShrink: 0 }}>
              <div style={{ padding: "8px 16px", borderBottom: "1px solid rgba(255,255,255,.05)", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Output Console</span>
                {submitted && <span style={{ fontSize: 10, background: "rgba(22,163,74,.25)", color: "#86EFAC", borderRadius: 4, padding: "1px 6px", fontWeight: 700 }}>Accepted</span>}
              </div>
              <div style={{ padding: "10px 16px", fontFamily: "monospace", fontSize: 12, color: submitted ? "#86EFAC" : "rgba(255,255,255,.7)", lineHeight: 1.7, whiteSpace: "pre" }}>
                {running ? <span style={{ color: "rgba(255,255,255,.4)" }}>Running…</span> : output}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ── Interview Loading Screen ── */
const IL_STATUSES = [
  "Connecting to AI interviewer…",
  "Loading your interview profile…",
  "Securing your session…",
  "Everything's ready ✓",
];

const IL_TICK_MS = 80;
const IL_TOTAL_MS = 3800;
const IL_INCREMENT = (100 / IL_TOTAL_MS) * IL_TICK_MS;

const IL_KEYBOARD_SHORTCUTS = [
  ["Space", "Mute mic"],
  ["→", "Next question"],
  ["Esc", "End session"],
];

const InterviewLoading = ({ persona, onReady }) => {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const progressT = setInterval(() => setProgress(p => Math.min(p + IL_INCREMENT, 100)), IL_TICK_MS);
    const statusT = setInterval(() => setStatusIdx(i => Math.min(i + 1, IL_STATUSES.length - 1)), IL_TOTAL_MS / IL_STATUSES.length);
    const doneT = setTimeout(() => { clearInterval(progressT); clearInterval(statusT); onReady(); }, IL_TOTAL_MS);
    return () => { clearInterval(progressT); clearInterval(statusT); clearTimeout(doneT); };
  }, [onReady]);

  const defaultPersona = PERSONAS.find(x => x.id === 3) || PERSONAS[0];
  const p = persona || defaultPersona || {
    title: "The Stress-Tester",
    handle: "@rex",
    accentColor: "#0D9488",
    avatarUrl: "",
    emoji: "👤",
    gradientFrom: "#E2E8F0",
    gradientTo: "#CBD5E1",
  };
  const pEmoji = p.emoji || "👤";

  return (
    <div className="il-wrap">
      {/* Atmospheric background blobs */}
      <div className="il-bg" aria-hidden="true">
        <div className="il-glow-c" />
        <div className="il-glow-br" />
        <div className="il-glow-tl" />
      </div>

      {/* Logo — top-left */}
      <motion.div
        className="il-logo"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <Logo light />
      </motion.div>

      {/* Central content */}
      <div className="il-content">
        {/* Persona avatar with pulsing rings */}
        <motion.div
          className="il-avatar-wrap"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 18 }}
        >
          <motion.div
            className="il-ring"
            animate={{ scale: [1, 1.55, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            style={{ width: 138, height: 138, border: "1.5px solid rgba(13,148,136,.55)" }}
          />
          <motion.div
            className="il-ring"
            animate={{ scale: [1, 1.28, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.55 }}
            style={{ width: 110, height: 110, border: "2px solid rgba(13,148,136,.38)" }}
          />
          <PersonaAvatar persona={p} size={84} borderWidth={3} />
          <span
            role="img"
            aria-label={`Avatar badge for ${p.title || "interviewer"}`}
            style={{
              position: "absolute", right: -2, bottom: -2,
              width: 28, height: 28, borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,.18)",
              background: "rgba(8,13,24,.9)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, lineHeight: 1,
            }}
          >
            {pEmoji}
          </span>
        </motion.div>

        {/* Persona name & handle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.45 }}
          style={{ textAlign: "center" }}
        >
          <h2 className="il-name">{p.title}</h2>
          <div className="il-sub">
            <span aria-hidden="true">{pEmoji}</span>
            <span>AI Interviewer</span>
            <span className="il-dot" aria-hidden="true">·</span>
            <span>{p.handle}</span>
          </div>
        </motion.div>

        {/* Cycling status text */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <AnimatePresence mode="wait">
            <motion.p
              className="il-status"
              key={statusIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.26 }}
            >
              {IL_STATUSES[statusIdx]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="il-progress-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          <div className="il-track">
            <div className="il-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="il-pct">{Math.round(progress)}%</div>
        </motion.div>
      </div>

      {/* Keyboard shortcut hints — hidden on phones via CSS */}
      <motion.div
        className="il-kbd-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-hidden="true"
      >
        {IL_KEYBOARD_SHORTCUTS.map(([key, label]) => (
          <div key={key} className="il-kbd-tip">
            <kbd className="il-kbd">{key}</kbd>
            <span>{label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ── Interview Room ── */
const InterviewRoom = ({ onNav, persona }) => {
  const [muted, setMuted] = useState(false);
  const [vidOff, setVidOff] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [ending, setEnding] = useState(false);
  const [pipMin, setPipMin] = useState(false);
  const [notes, setNotes] = useState("");
  const [roomTab, setRoomTab] = useState("interview"); // "interview" | "code"
  const [codeLang, setCodeLang] = useState("JavaScript");
  const [codeCopied, setCodeCopied] = useState(false);
  const [roomLoading, setRoomLoading] = useState(true);

  const captionsRef = useRef(null);
  const activePersona = persona || PERSONAS[2]; // default to Stress-Tester

  // Stable callback — never changes across re-renders, so InterviewLoading's
  // useEffect (which lists onReady as a dep) won't reset its timers every second.
  const handleRoomReady = useCallback(() => setRoomLoading(false), []);

  // Prevent body scroll and register keyboard shortcuts for the whole session.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = e => {
      if (e.code === "Space") { e.preventDefault(); setMuted(m => !m); }
      if (e.code === "ArrowRight") { setQIdx(q => Math.min(q + 1, QUESTIONS.length - 1)); }
      if (e.code === "Escape") { setEnding(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, []);

  // Start the interview timer only after the loading screen completes so it
  // doesn't count loading time and — crucially — doesn't trigger re-renders
  // (which would create a new inline onReady reference) while loading is active.
  useEffect(() => {
    if (roomLoading) return;
    const t = setInterval(() => setElapsed(e => e+1), 1000);
    return () => clearInterval(t);
  }, [roomLoading]);

  // Auto-scroll captions to bottom when question changes
  useEffect(() => {
    if (captionsRef.current) captionsRef.current.scrollTop = captionsRef.current.scrollHeight;
  }, [qIdx]);

  const fmt = s => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return h > 0
      ? `${h}:${String(m).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
      : `${String(m).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const TRANSCRIPT = [
    { speaker: "Interviewer", text: QUESTIONS[0], ts: "0:12" },
    { speaker: "You", text: "Thanks for that context. So in my previous role at a fintech startup, we faced a similar distributed systems challenge when our user base grew 8x in six months...", ts: "0:48" },
    { speaker: "Interviewer", text: "Interesting. And how did you specifically handle the latency spikes during peak load?", ts: "1:22" },
    ...(qIdx > 0 ? [{ speaker: "Interviewer", text: QUESTIONS[Math.min(qIdx, QUESTIONS.length - 1)], ts: `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}` }] : []),
  ];

  if (roomLoading) {
    return <InterviewLoading persona={activePersona} onReady={handleRoomReady} />;
  }

  return (
    <main className="int-room">
      <h1 className="sr-only">Live Interview Room</h1>

      {/* ── TOP BAR ─────────────────────────────────────────────────── */}
      <div className="int-topbar">

        {/* Logo — always visible; wordmark hidden on ≤640px via CSS, icon always shown */}
        <div className="int-topbar-logo">
          <Logo onClick={() => onNav("landing")} light />
        </div>

        {/* Persona photo + name (always visible) */}
        <div className="int-topbar-persona-info">
          <PersonaAvatar persona={activePersona} size={20} borderWidth={1.25} />
          <span style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,.8)", whiteSpace:"nowrap" }}
            className="int-topbar-logo">{activePersona.title}</span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }} />

        {/* Persona pill — hides at 1100px */}
        <div className="int-topbar-persona">
          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.75)" }}>{activePersona.style}</span>
          <span style={{ width: 1, height: 12, background: "rgba(255,255,255,.15)", flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: activePersona.diffColor || "#FCA5A5" }}>{activePersona.difficulty}</span>
        </div>

        {/* Q progress dots — hides at 860px */}
        <div className="int-topbar-qprog">
          {QUESTIONS.map((_, i) => (
            <div key={i} onClick={() => setQIdx(i)} style={{ width: i === qIdx ? 22 : 8, height: 8, borderRadius: 4, background: i === qIdx ? "var(--teal)" : i < qIdx ? "rgba(20,184,166,.45)" : "rgba(255,255,255,.15)", transition: "all 0.3s ease", cursor: "pointer", flexShrink: 0 }} />
          ))}
          <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginLeft: 4, whiteSpace: "nowrap" }}>Q{qIdx + 1}/{QUESTIONS.length}</span>
        </div>

        {/* Divider */}
        <div className="int-topbar-divider" />

        {/* Tab switcher */}
        <div style={{ display:"flex", gap:2, background:"rgba(255,255,255,.06)", borderRadius:9, padding:3, border:"1px solid rgba(255,255,255,.08)", flexShrink:0 }}>
          {[{ id:"interview", label:"Interview", icon:"🎙️" },{ id:"code", label:"Code", icon:"⌨️" }].map(tab => (
            <button key={tab.id} onClick={()=>setRoomTab(tab.id)}
              style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 11px", borderRadius:7, border:"none", background:roomTab===tab.id?"rgba(13,148,136,.85)":"transparent", color:roomTab===tab.id?"#fff":"rgba(255,255,255,.4)", fontSize:11.5, fontWeight:700, cursor:"pointer", transition:"all 0.2s", fontFamily:"'DM Sans',sans-serif", whiteSpace:"nowrap", lineHeight:1 }}>
              <span style={{ fontSize:12 }}>{tab.icon}</span> <span className="int-tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="int-topbar-divider" />

        {/* Enhanced timer */}
        <div className="int-topbar-timer" style={{
          background: elapsed > 2700 ? "rgba(220,38,38,.25)" : elapsed > 1800 ? "rgba(217,119,6,.2)" : "rgba(13,148,136,.15)",
          border: `1px solid ${elapsed > 2700 ? "rgba(220,38,38,.5)" : elapsed > 1800 ? "rgba(217,119,6,.45)" : "rgba(13,148,136,.35)"}`,
          transition: "all 1s ease",
        }}>
          {/* Animated dot */}
          <div style={{
            width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
            background: elapsed > 2700 ? "var(--red)" : elapsed > 1800 ? "var(--amber)" : "var(--teal-mid)",
            animation: "dot-pulse 1.8s ease-in-out infinite",
          }} />
          {/* Time display */}
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 700, color: elapsed > 2700 ? "#FCA5A5" : elapsed > 1800 ? "#FDE68A" : "rgba(255,255,255,.9)", letterSpacing: "0.04em" }}>
            {fmt(elapsed)}
          </span>
          {/* Phase label */}
          <span className="int-topbar-timer-phase" style={{ color: elapsed > 2700 ? "rgba(252,165,165,.7)" : elapsed > 1800 ? "rgba(253,230,138,.7)" : "rgba(255,255,255,.4)" }}>
            {elapsed > 2700 ? "⚠ OVERTIME" : elapsed > 1800 ? "WRAPPING UP" : elapsed > 900 ? "IN PROGRESS" : "STARTING"}
          </span>
        </div>

        {/* End button */}
        <button onClick={()=>setEnding(true)} className="btn-danger" style={{ fontSize:13, borderRadius:22, flexShrink:0 }}>
          <PhoneOff size={14}/> <span className="int-end-label">End</span>
        </button>
      </div>

      {/* ── PHONE Q-PROGRESS STRIP (phone-only, hidden on desktop) ── */}
      <div className="int-qstrip">
        <span style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:"0.08em", textTransform:"uppercase" }}>Q{qIdx+1}/{QUESTIONS.length}</span>
        <div style={{ display:"flex", gap:5, alignItems:"center", flex:1, justifyContent:"center" }}>
          {QUESTIONS.map((_,i) => (
            <div key={i} onClick={()=>setQIdx(i)} style={{ width:i===qIdx?28:8, height:5, borderRadius:3, background:i===qIdx?"var(--teal)":i<qIdx?"rgba(20,184,166,.5)":"rgba(255,255,255,.15)", transition:"all 0.3s", cursor:"pointer" }}/>
          ))}
        </div>
        <span style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:"0.08em" }}>{activePersona.difficulty}</span>
      </div>

      {/* ── BODY ──────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {roomTab === "code" ? (
          <motion.div key="code" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
            style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
            <CodePanel activePersona={activePersona} qIdx={qIdx} elapsed={elapsed} />
          </motion.div>
        ) : (
          <motion.div key="interview" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}
            className="int-body" style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>

            {/* ── LEFT: Main video + captions ── */}
            <div className="int-main">

              {/* Video area */}
              <div className="int-video-area" style={{ background: "#0C1628" }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "clamp(10px,2vw,20px)", padding: "0 12px" }}>

                  {/* Avatar circle — scales down on small screens */}
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div style={{ boxShadow: `0 0 60px ${activePersona.accentColor}30`, borderRadius: "50%" }}>
                      <PersonaAvatar persona={activePersona} size={"clamp(80px,18vw,140px)"} borderWidth={3} />
                    </div>
                    <div style={{ position: "absolute", inset: -8, borderRadius: "50%", border: `2px solid ${activePersona.accentColor}40`, animation: "ping 2s cubic-bezier(0,0,.2,1) infinite" }} />
                    <style>{`@keyframes ping { 75%,100% { transform:scale(1.2); opacity:0; } }`}</style>
                  </div>

                  {/* Name / style */}
                  <div style={{ textAlign: "center" }}>
                    <div className="brig" style={{ fontSize: "clamp(14px,3.5vw,18px)", fontWeight: 700, color: "rgba(255,255,255,.9)", letterSpacing: "-0.01em" }}>{activePersona.title}</div>
                    <div style={{ fontSize: "clamp(10px,2.5vw,12px)", color: "rgba(255,255,255,.4)", marginTop: 3 }}>AI Interviewer · {activePersona.style}</div>
                  </div>

                  {/* Active question box */}
                  <div style={{ width: "100%", maxWidth: 640, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 14, padding: "clamp(12px,3vw,18px) clamp(14px,3vw,24px)", backdropFilter: "blur(12px)" }}>
                    <AnimatePresence mode="wait">
                      <motion.p key={qIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}
                        style={{ fontSize: "clamp(12px,3vw,16px)", color: "rgba(255,255,255,.85)", lineHeight: 1.65, fontStyle: "italic", textAlign: "center" }}>
                        "{QUESTIONS[qIdx]}"
                      </motion.p>
                    </AnimatePresence>
                    {/* Audio viz */}
                    <div style={{ display: "flex", gap: 3, justifyContent: "center", marginTop: 12, alignItems: "flex-end", height: 18 }}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => <div key={i} className="wave-bar" style={{ width: "clamp(2px,0.5vw,3px)", height: 14, background: `${activePersona.accentColor}cc`, borderRadius: 2, animationDelay: `${i * 0.1}s` }} />)}
                      <span style={{ fontSize: 10, color: activePersona.accentColor || "var(--teal-mid)", fontWeight: 600, marginLeft: 6, lineHeight: "14px" }}>Speaking…</span>
                    </div>
                  </div>
                </div>

                {/* ── PiP: User webcam — auto-minimised on phone ── */}
                <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.4 }}
                  style={{ position: "absolute", bottom: 12, right: 12, zIndex: 20 }}>
                  <div style={{
                    width: pipMin ? 68 : "clamp(120px,25vw,180px)",
                    height: pipMin ? 52 : "clamp(90px,19vw,135px)",
                    borderRadius: 12, overflow: "hidden", background: "#1a2540",
                    border: "2px solid rgba(255,255,255,.2)", boxShadow: "0 6px 24px rgba(0,0,0,.5)",
                    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", position: "relative",
                  }}>
                    {vidOff ? (
                      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                        <VideoOff size={pipMin ? 14 : 18} style={{ color: "rgba(255,255,255,.3)" }} />
                        {!pipMin && <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)" }}>Camera off</span>}
                      </div>
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, background: "linear-gradient(135deg,#1a2540,#0d1929)" }}>
                        <div style={{ fontSize: pipMin ? 20 : 28 }}>🧑‍💻</div>
                        {!pipMin && <span style={{ fontSize: 9, color: "rgba(255,255,255,.4)", fontWeight: 500 }}>You</span>}
                      </div>
                    )}
                    <div style={{ position: "absolute", top: 5, left: 6, background: "rgba(0,0,0,.55)", borderRadius: 5, padding: "1px 6px", fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,.7)", letterSpacing: "0.04em" }}>YOU</div>
                    <button onClick={() => setPipMin(m => !m)} style={{ position: "absolute", top: 3, right: 3, width: 16, height: 16, borderRadius: "50%", background: "rgba(0,0,0,.5)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.6)", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.25)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,.5)"}>
                      <span style={{ fontSize: 9, lineHeight: 1 }}>{pipMin ? "⤢" : "⤡"}</span>
                    </button>
                    {!vidOff && <div style={{ position: "absolute", bottom: 5, right: 6, width: 6, height: 6, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 5px #22C55E" }} />}
                  </div>
                </motion.div>

                {/* AI Interviewer label overlay */}
                <div style={{ position: "absolute", top: 12, left: 12, display: "flex", alignItems: "center", gap: 7, background: "rgba(0,0,0,.45)", backdropFilter: "blur(8px)", borderRadius: 9, padding: "4px 10px" }}>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,.6)", fontWeight: 600 }}>AI Interviewer</span>
                </div>
              </div>

              {/* ── Scrollable Captions ── */}
              <div className="int-captions" ref={captionsRef} style={{ background: "rgba(0,0,0,.35)", padding: "8px 16px", display: "flex", flexDirection: "column", gap: 7 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2, flexShrink: 0 }}>Live Transcript</div>
                {TRANSCRIPT.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)", flexShrink: 0, paddingTop: 2, minWidth: 28 }}>{t.ts}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: t.speaker === "You" ? "var(--teal-mid)" : "rgba(255,255,255,.5)", flexShrink: 0, minWidth: 54 }}>{t.speaker}:</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,.72)", lineHeight: 1.5, flex: 1 }}>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT SIDEBAR (desktop/tablet only) ───────────────── */}
            <div className="int-side">

              {/* ── Live Coaching metrics ── */}
              <div style={{ padding: "16px", borderBottom: "1px solid rgba(255,255,255,.07)", flexShrink: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Live Coaching</div>
                {[
                  { label: "Speaking pace", val: 72, color: "var(--teal-mid)", icon: "🎙️" },
                  { label: "Clarity", val: 85, color: "#86EFAC", icon: "💡" },
                  { label: "Confidence", val: 79, color: "#93C5FD", icon: "💪" },
                  { label: "Filler words", val: 12, color: "#FCA5A5", icon: "⚠️", low: true },
                ].map(({ label, val, color, icon, low }) => (
                  <div key={label} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, alignItems: "center" }}>
                      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                        <span style={{ fontSize: 12 }}>{icon}</span>
                        <span style={{ fontSize: 11.5, color: "rgba(255,255,255,.6)" }}>{label}</span>
                      </div>
                      <span style={{ fontSize: 12, color, fontWeight: 700 }}>{low ? val + " ✓" : `${val}%`}</span>
                    </div>
                    <div style={{ height: 4, background: "rgba(255,255,255,.07)", borderRadius: 2, overflow: "hidden" }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${low ? 100 - val : val}%` }} transition={{ duration: 1.2, ease: "easeOut" }} style={{ height: "100%", background: `linear-gradient(90deg,${color}cc,${color})`, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Quick Notes ── */}
              <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,.07)", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 9 }}>
                  <Pencil size={11} style={{ color: "rgba(255,255,255,.3)" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Quick Notes</span>
                </div>
                <textarea
                  className="int-notes"
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Jot key points, numbers, names…"
                />
                {notes.length > 0 && (
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,.2)", marginTop: 4, textAlign: "right" }}>{notes.length} chars · saved locally</div>
                )}
              </div>

              {/* ── Question Context & Tips ── */}
              <div style={{ padding: "16px", flex: 1, overflowY: "auto" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Question Context</div>
                <AnimatePresence mode="wait">
                  <motion.div key={qIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)", lineHeight: 1.65, marginBottom: 14, fontStyle: "italic" }}>"{QUESTIONS[qIdx]}"</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Coaching Tips</div>
                    {[
                      "Use the STAR framework: Situation → Task → Action → Result",
                      "Quantify your impact wherever possible (%, $, time saved)",
                      "Keep answers under 3 minutes — pause and ask if they want more detail",
                    ].map((tip, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 9, alignItems: "flex-start" }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--teal)", marginTop: 5, flexShrink: 0 }} />
                        <span style={{ fontSize: 11.5, color: "rgba(255,255,255,.5)", lineHeight: 1.55 }}>{tip}</span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Controls */}
              <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,.07)", flexShrink: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                  {[
                    { icon: muted ? <MicOff size={16} /> : <Mic size={16} />, active: muted, fn: () => setMuted(m => !m), label: muted ? "Unmute" : "Mute", kbd: "Space" },
                    { icon: vidOff ? <VideoOff size={16} /> : <Video size={16} />, active: vidOff, fn: () => setVidOff(v => !v), label: vidOff ? "Camera On" : "Camera", kbd: null },
                  ].map(({ icon, active, fn, label, kbd: kbdKey }) => (
                    <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <button onClick={fn} title={label}
                        style={{ width: 44, height: 44, borderRadius: "50%", border: "none", background: active ? "var(--red)" : "rgba(255,255,255,.12)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "all 0.2s", flexShrink: 0 }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                        onMouseLeave={e => e.currentTarget.style.transform = ""}>
                        {icon}
                      </button>
                      {kbdKey && <span className="kbd">{kbdKey}</span>}
                    </div>
                  ))}
                </div>
                {qIdx < QUESTIONS.length - 1 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <button className="btn-primary" onClick={() => setQIdx(q => q + 1)} style={{ width: "100%", justifyContent: "center", fontSize: 13, padding: "11px" }}>
                      Next Question <ChevronRight size={14} />
                    </button>
                    <div style={{ textAlign: "center" }}><span className="kbd">→</span><span style={{ fontSize: 10, color: "rgba(255,255,255,.3)", marginLeft: 4 }}>arrow key</span></div>
                  </div>
                ) : (
                  <button className="btn-danger" onClick={() => setEnding(true)} style={{ width: "100%", justifyContent: "center", fontSize: 13, padding: "11px", borderRadius: 12 }}>
                    <PhoneOff size={14} /> End & Get Report
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE BOTTOM CONTROLS BAR (interview tab only — hidden in code tab and on desktop) ── */}
      {roomTab !== "code" && <div className="int-mob-bar">
        {/* Mute */}
        <button onClick={() => setMuted(m => !m)}
          style={{ flex: 1, height: 50, borderRadius: 14, border: "none", background: muted ? "var(--red)" : "rgba(255,255,255,.1)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, color: "#fff", transition: "all 0.2s" }}>
          {muted ? <MicOff size={18} /> : <Mic size={18} />}
          <span style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,.55)", letterSpacing: "0.04em" }}>{muted ? "UNMUTE" : "MUTE"}</span>
        </button>

        {/* Camera */}
        <button onClick={() => setVidOff(v => !v)}
          style={{ flex: 1, height: 50, borderRadius: 14, border: "none", background: vidOff ? "var(--red)" : "rgba(255,255,255,.1)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, color: "#fff", transition: "all 0.2s" }}>
          {vidOff ? <VideoOff size={18} /> : <Video size={18} />}
          <span style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,.55)", letterSpacing: "0.04em" }}>{vidOff ? "CAM ON" : "CAMERA"}</span>
        </button>

        {/* Next / End */}
        {qIdx < QUESTIONS.length - 1 ? (
          <button onClick={() => setQIdx(q => q + 1)}
            style={{ flex: 2, height: 50, borderRadius: 14, border: "none", background: "var(--teal)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: "#fff", fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s" }}>
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={() => setEnding(true)}
            style={{ flex: 2, height: 50, borderRadius: 14, border: "none", background: "rgba(220,38,38,.18)", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(220,38,38,.4)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: "#FC8181", fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s" }}>
            <PhoneOff size={16} /> End & Report
          </button>
        )}
      </div>}

      {/* ── END INTERVIEW MODAL ─────────────────────────────── */}
      <AnimatePresence>
        {ending && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,.75)", backdropFilter: "blur(10px)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <motion.div initial={{ scale: 0.9, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: "var(--white)", borderRadius: 24, padding: "clamp(20px,5vw,36px)", maxWidth: 400, width: "100%", textAlign: "center", boxShadow: "0 40px 80px rgba(15,23,42,.45)" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--red-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <PhoneOff size={28} style={{ color: "var(--red)" }} />
              </div>
              <h2 className="brig" style={{ fontSize: 22, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.02em", marginBottom: 10 }}>End this interview?</h2>
              <p style={{ fontSize: 14, color: "var(--slate-500)", marginBottom: 8, lineHeight: 1.65 }}>
                You've completed <strong style={{ color: "var(--slate)" }}>{qIdx + 1} of {QUESTIONS.length}</strong> questions.
              </p>
              <p style={{ fontSize: 13, color: "var(--slate-400)", marginBottom: 28, lineHeight: 1.6 }}>
                Your session will be analysed and a full scored report generated immediately.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-secondary" onClick={() => setEnding(false)} style={{ flex: 1, justifyContent: "center" }}>Keep Going</button>
                <button className="btn-primary" onClick={() => onNav("report")} style={{ flex: 1, justifyContent: "center", background: "var(--teal)", fontSize: 13 }}>
                  <FileText size={14} /> Get My Report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

/* ── Report ── */
const Report = ({ onNav }) => {
  const [dlMsg, setDlMsg] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const [recheckState, setRecheckState] = useState("idle"); // idle | loading | done
  const TARGET_SCORE = 78;

  const handleRecheck = () => {
    if (recheckState === "loading") return;
    setRecheckState("loading");
    setTimeout(() => setRecheckState("done"), 3200);
  };

  // Count-up animation on mount
  useEffect(() => {
    let start = 0;
    const step = () => {
      start += 3;
      if (start >= TARGET_SCORE) { setDisplayScore(TARGET_SCORE); return; }
      setDisplayScore(start);
      setTimeout(step, 18);
    };
    const t = setTimeout(step, 300);
    return () => clearTimeout(t);
  }, []);

  const handleDownload = () => { setDlMsg(true); setTimeout(() => setDlMsg(false), 3000); };
  const handleCopyLink = () => { setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2500); };
  const METRICS = [
    { label: "Communication", score: 82, color: "var(--teal)" },
    { label: "Technical Depth", score: 74, color: "#0369A1" },
    { label: "Confidence", score: 79, color: "#7C3AED" },
    { label: "Culture Fit", score: 88, color: "var(--green)" },
    { label: "STAR Method", score: 65, color: "var(--amber)" },
    { label: "Problem Solving", score: 80, color: "#BE185D" },
  ];
  const overall = Math.round(METRICS.reduce((a, m) => a + m.score, 0) / METRICS.length);
  return (
    <main style={{ minHeight: "100vh", background: "var(--slate-50)", paddingTop: 64 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "44px clamp(16px,4vw,44px) 80px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                <Tag color="teal">Report Ready</Tag>
                <Tag color="slate" size="xs">Google · Software Engineer L5</Tag>
                <Tag color="slate" size="xs">Feb 21, 2026</Tag>
              </div>
              <h1 className="brig" style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.03em" }}>Interview Analysis Report</h1>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              {/* ── Recheck AI Analysis ── */}
              <button
                onClick={handleRecheck}
                disabled={recheckState === "loading"}
                className="btn-secondary"
                style={{ fontSize: 13, background: recheckState === "done" ? "var(--green-light)" : "", borderColor: recheckState === "done" ? "var(--green)" : "", color: recheckState === "done" ? "var(--green)" : "" }}>
                <span className={recheckState === "loading" ? "spin" : ""} style={{ display: "inline-flex" }}>
                  <RefreshCw size={14} />
                </span>
                {recheckState === "loading" ? " Deep-Dive Audit…" : recheckState === "done" ? "✓ Recheck Complete" : " Recheck AI Analysis"}
              </button>
              <button className="btn-primary" onClick={() => onNav("dashboard")} style={{ fontSize: 13 }}>New Session</button>
              <button className="btn-secondary" style={{ fontSize: 13 }} onClick={handleDownload}><FileText size={14} /> {dlMsg ? "✓ Downloading…" : "Download PDF"}</button>
              <button className="btn-secondary" onClick={() => { setShareOpen(true); }} style={{ fontSize: 13 }}><ArrowUpRight size={14} /> Share</button>
            </div>
          </div>

          <div className="report-top" style={{ marginBottom: 20 }}>
            {/* Score card */}
            <div style={{ background: "var(--slate)", borderRadius: 20, padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", boxShadow: "var(--shadow-xl)", minHeight: 200 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Overall Score</div>
              <div className="brig score-pop" style={{ fontSize: "clamp(64px,10vw,88px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.05em", lineHeight: 1 }}>{displayScore}</div>
              <div className="brig" style={{ fontSize: 16, color: "var(--teal-mid)", marginTop: 6, fontWeight: 600 }}>/100</div>
              <Tag color="amber" style={{ marginTop: 14 }}>Solid Performance</Tag>
            </div>
            {/* Metrics */}
            <div className="card" style={{ padding: 26 }}>
              <div className="brig" style={{ fontSize: 14, fontWeight: 700, color: "var(--slate)", marginBottom: 18 }}>Score Breakdown</div>
              {METRICS.map((m, i) => <MetricBar key={m.label} label={m.label} value={m.score} color={m.color} delay={i * 0.08} />)}
            </div>
          </div>

          <div className="report-mid">
            <div className="card" style={{ padding: 26 }}>
              <div style={{ display: "flex", gap: 9, alignItems: "center", marginBottom: 18 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--green-light)", display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={15} style={{ color: "var(--green)" }} /></div>
                <div className="brig" style={{ fontSize: 14, fontWeight: 700, color: "var(--slate)" }}>Strengths</div>
              </div>
              {["Strong communication clarity — responses were structured and easy to follow.", "Demonstrated solid culture-fit awareness with relevant Google-specific examples.", "Good use of quantified impact in behavioral answers (mentioned 3x performance gains).", "Confident delivery with minimal filler words and strong eye contact simulation."].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", marginTop: 7, flexShrink: 0 }} />
                  <span style={{ fontSize: 13.5, color: "var(--slate-700)", lineHeight: 1.65 }}>{s}</span>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 26 }}>
              <div style={{ display: "flex", gap: 9, alignItems: "center", marginBottom: 18 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--amber-light)", display: "flex", alignItems: "center", justifyContent: "center" }}><AlertCircle size={15} style={{ color: "var(--amber)" }} /></div>
                <div className="brig" style={{ fontSize: 14, fontWeight: 700, color: "var(--slate)" }}>Areas to Improve</div>
              </div>
              {["Technical depth needs work — the system design answer lacked discussion of trade-offs.", "STAR method inconsistently applied; the 'Result' step was often missing or vague.", "Pacing was slightly fast in Q3 — slow down and let key points land.", "Missed an opportunity to ask a clarifying question on the ambiguous requirements prompt."].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--amber)", marginTop: 7, flexShrink: 0 }} />
                  <span style={{ fontSize: 13.5, color: "var(--slate-700)", lineHeight: 1.65 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 26, marginTop: 20 }}>
            <div className="brig" style={{ fontSize: 14, fontWeight: 700, color: "var(--slate)", marginBottom: 16 }}>AI Coach Summary</div>
            <p style={{ fontSize: 14, color: "var(--slate-600)", lineHeight: 1.75, borderLeft: "3px solid var(--teal)", paddingLeft: 16 }}>
              You showed strong communication and culture awareness — clear differentiators at Google. The main gap is technical depth: when asked about system design, go deeper on trade-offs (consistency vs. availability, latency vs. throughput). Aim to explicitly state "the result was X" in every behavioral question. Schedule 2–3 Technical Deep Dive sessions before your next real interview.
            </p>
          </div>

          <div className="report-actions">
            <button className="btn-primary" onClick={() => onNav("dashboard")} style={{ fontSize: 14 }}>Practice Again <ArrowUpRight size={15} /></button>
            <button className="btn-secondary" style={{ fontSize: 14 }} onClick={handleDownload}><FileText size={15} /> {dlMsg ? "✓ Downloading…" : "Download PDF"}</button>
            <button className="btn-secondary" onClick={() => setShareOpen(true)} style={{ fontSize: 14 }}><ArrowUpRight size={15} /> Share Report</button>
            <button className="btn-secondary" onClick={() => onNav("reports")} style={{ fontSize: 14 }}>View All Reports</button>
          </div>
        </motion.div>
      </div>

      {/* ── Share Report Modal ── */}
      <AnimatePresence>
        {shareOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,.55)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
            onClick={e => e.target === e.currentTarget && setShareOpen(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: "var(--white)", borderRadius: 20, padding: "28px 28px", maxWidth: 420, width: "100%", boxShadow: "var(--shadow-xl)", position: "relative" }}>
              <button onClick={() => setShareOpen(false)} style={{ position: "absolute", top: 14, right: 14, width: 30, height: 30, borderRadius: "50%", border: "1px solid var(--border)", background: "var(--slate-50)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--slate-500)" }}><X size={13} /></button>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowUpRight size={20} style={{ color: "var(--teal)" }} /></div>
                <div>
                  <div className="brig" style={{ fontSize: 17, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.02em" }}>Share Report</div>
                  <div style={{ fontSize: 12, color: "var(--slate-500)", marginTop: 2 }}>Google · SWE L5 · Score: 78/100</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Copy link */}
                <div>
                  <label style={{ marginBottom: 8 }}>Report Link</label>
                  <div className="share-link-box">
                    <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>https://placementdo.app/reports/a7f2c9...</span>
                    <button onClick={handleCopyLink} className="btn-primary" style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, flexShrink: 0 }}>
                      {linkCopied ? <><Check size={13} /> Copied!</> : "Copy"}
                    </button>
                  </div>
                </div>
                <div style={{ height: 1, background: "var(--border)" }} />
                {/* Share targets */}
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    { icon: "💼", label: "LinkedIn", hint: "Post your score as an achievement", color: "#0A66C2", bg: "#E8F3FF" },
                    { icon: "🐦", label: "Twitter/X", hint: "Share your progress publicly", color: "#000", bg: "#F0F0F0" },
                    { icon: "📧", label: "Email", hint: "Send to a recruiter or mentor", color: "var(--teal)", bg: "var(--teal-light)" },
                  ].map(({ icon, label, hint, color, bg }) => (
                    <button key={label} onClick={() => setShareOpen(false)}
                      style={{ flex: 1, padding: "12px 8px", background: bg, border: `1.5px solid ${color}22`, borderRadius: 12, cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                      <span style={{ fontSize: 22 }}>{icon}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "'DM Sans',sans-serif" }}>{label}</span>
                      <span style={{ fontSize: 10, color: "var(--slate-500)", textAlign: "center", lineHeight: 1.4 }}>{hint}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

/* ── Support & Feedback Center ── */
const SupportView = () => {
  /* ── Feedback state ── */
  const [fbCategory, setFbCategory] = useState("Bug Report");
  const [fbText, setFbText] = useState("");
  const [fbSent, setFbSent] = useState(false);
  const [fbLoading, setFbLoading] = useState(false);

  const handleFbSubmit = e => {
    e.preventDefault();
    if (!fbText.trim()) return;
    setFbLoading(true);
    setTimeout(() => { setFbLoading(false); setFbSent(true); setFbText(""); }, 1500);
  };

  /* ── Chat state ── */
  const WELCOME = { role: "ai", text: "Hi! I'm your PlacementDo assistant. Ask me anything about the platform or interview prep. 🚀" };
  const [messages, setMessages] = useState([WELCOME]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const AI_RESPONSES = [
    "For behavioral interviews, use the STAR method — Situation, Task, Action, Result. Make every answer end with a measurable outcome.",
    "Once your CV is uploaded, PlacementDo tailors every question to your actual experience and the target role.",
    "Start with The Friendly Peer to build rhythm, then level up to The Stress-Tester for FAANG-style pressure.",
    "Your scores cover 6 dimensions: Communication, Technical Depth, Confidence, Culture Fit, STAR Method, and Problem Solving.",
    "To boost technical depth, practice articulating trade-offs — e.g. consistency vs. availability, latency vs. throughput.",
    "PlacementDo supports 28+ languages. Set your preferred language in Interview Configuration before starting.",
    "'Recheck AI Analysis' re-audits your full session transcript, surfacing insights the first pass may have missed.",
    "Keep answers between 90 seconds and 3 minutes. Pause, check in — 'Would you like me to go deeper?' shows self-awareness.",
  ];

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text || isTyping) return;
    setMessages(m => [...m, { role: "user", text }]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      const reply = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      setMessages(m => [...m, { role: "ai", text: reply }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 700);
  };

  const handleChatKey = e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } };

  const QUICK = [
    { icon: <HelpCircle size={15} />, label: "Platform Guide", hint: "Get started fast", color: "var(--teal)" },
    { icon: <Brain size={15} />, label: "Interview Playbook", hint: "STAR & case study tips", color: "#7C3AED" },
    { icon: <BarChart2 size={15} />, label: "Score Breakdown", hint: "How AI scoring works", color: "#0369A1" },
    { icon: <Shield size={15} />, label: "Privacy & Data", hint: "Your data, your control", color: "var(--green)" },
  ];

  const CAT_ICONS = { "Bug Report": "🐛", "Improvement Idea": "💡", "General Question": "💬" };

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>

      {/* ── Scoped CSS ── */}
      <style>{`
        .sp-grid {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 22px;
          align-items: start;
        }
        .sp-chat { height: 500px; }
        .sp-qgrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        /* Tablet ≤ 1024px */
        @media (max-width: 1024px) {
          .sp-grid { grid-template-columns: 1fr 1fr; }
          .sp-chat { height: 460px; }
          .sp-qgrid { grid-template-columns: repeat(2, 1fr); }
        }
        /* Mobile ≤ 768px */
        @media (max-width: 768px) {
          .sp-grid { grid-template-columns: 1fr; }
          .sp-chat { height: 420px; }
          .sp-qgrid { grid-template-columns: repeat(2, 1fr); }
        }
        /* Small mobile ≤ 480px */
        @media (max-width: 480px) {
          .sp-chat { height: 380px; }
          .sp-qgrid { grid-template-columns: 1fr; }
        }
        .sp-qcard {
          display: flex; align-items: center; gap: 11px;
          padding: 12px 14px;
          background: var(--slate-50); border: 1px solid var(--border);
          border-radius: 12px; cursor: pointer;
          transition: all 0.2s ease;
        }
        .sp-qcard:hover {
          background: var(--white);
          border-color: var(--teal);
          box-shadow: var(--shadow-sm);
          transform: translateY(-2px);
        }
        .sp-msg-bubble-ai  { background: var(--white); border: 1px solid var(--border); color: var(--slate-700); border-radius: 4px 14px 14px 14px; }
        .sp-msg-bubble-usr { background: var(--teal); color: #fff; border-radius: 14px 4px 14px 14px; }
      `}</style>

      {/* ── Page header ── */}
      <div style={{ marginBottom: 26 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: "var(--teal-light)", border: "1px solid rgba(13,148,136,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LifeBuoy size={20} style={{ color: "var(--teal)" }} />
          </div>
          <h1 className="brig" style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.03em", margin: 0 }}>Help & Support</h1>
        </div>
        <p style={{ fontSize: 14, color: "var(--slate-500)", maxWidth: 560, lineHeight: 1.6 }}>
          Got a bug or an idea? Drop us a note. Or chat live with our AI assistant for instant answers on the platform and interview prep.
        </p>
      </div>

      {/* ── Main two-column grid ── */}
      <div className="sp-grid">

        {/* ─── Col A: Feedback Form ─── */}
        <div className="card" style={{ padding: 26, display: "flex", flexDirection: "column" }}>

          {/* Card header */}
          <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <MessageSquare size={16} style={{ color: "var(--teal)" }} />
            </div>
            <div>
              <div className="brig" style={{ fontSize: 15, fontWeight: 700, color: "var(--slate)" }}>Send Feedback</div>
              <div style={{ fontSize: 12, color: "var(--slate-500)", marginTop: 1 }}>Bugs, ideas, or questions — we read everything</div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {fbSent ? (
              <motion.div key="sent"
                initial={{ opacity: 0, scale: 0.94, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "28px 16px", gap: 14 }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
                  style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--green-light)", border: "2px solid rgba(22,163,74,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={28} style={{ color: "var(--green)" }} />
                </motion.div>
                <div>
                  <div className="brig" style={{ fontSize: 17, fontWeight: 700, color: "var(--slate)", marginBottom: 6 }}>Feedback received!</div>
                  <p style={{ fontSize: 13.5, color: "var(--slate-500)", lineHeight: 1.65 }}>Our team reviews every submission.<br />We'll reach out if we need more context.</p>
                </div>
                <button className="btn-secondary" style={{ fontSize: 13, marginTop: 4 }} onClick={() => setFbSent(false)}>
                  <Send size={13} /> Send another
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onSubmit={handleFbSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Category pills */}
                <div>
                  <label>Category</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 2 }}>
                    {["Bug Report", "Improvement Idea", "General Question"].map(c => (
                      <button type="button" key={c} onClick={() => setFbCategory(c)}
                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 13px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.18s", fontFamily: "'DM Sans',sans-serif", border: `1.5px solid ${fbCategory === c ? "var(--teal)" : "var(--border)"}`, background: fbCategory === c ? "var(--teal-light)" : "var(--white)", color: fbCategory === c ? "var(--teal-dark)" : "var(--slate-600)" }}>
                        <span>{CAT_ICONS[c]}</span>{c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea */}
                <div>
                  <label>Description</label>
                  <textarea
                    value={fbText}
                    onChange={e => setFbText(e.target.value)}
                    rows={6}
                    placeholder={
                      fbCategory === "Bug Report" ? "What happened? What did you expect? Steps to reproduce…" :
                        fbCategory === "Improvement Idea" ? "What would make PlacementDo better for you?" :
                          "What's on your mind?"
                    }
                    style={{ resize: "vertical", minHeight: 120, lineHeight: 1.6, fontSize: 13.5 }}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 5 }}>
                    <span style={{ fontSize: 11, color: fbText.length > 20 ? "var(--teal)" : "var(--slate-300)", transition: "color 0.2s" }}>{fbText.length} chars</span>
                  </div>
                </div>

                <button type="submit" className="btn-primary" disabled={fbLoading || !fbText.trim()} style={{ fontSize: 14, justifyContent: "center", padding: "12px" }}>
                  {fbLoading
                    ? <><span className="spin"><RefreshCw size={14} /></span> Sending…</>
                    : <><Send size={14} /> Submit Feedback</>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* ─── Col B: AI Chat ─── */}
        <div className="card sp-chat" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Chat header */}
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12, flexShrink: 0, background: "var(--slate-50)", borderRadius: "16px 16px 0 0" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: "var(--slate)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bot size={19} style={{ color: "var(--teal-mid)" }} />
              </div>
              <div style={{ position: "absolute", bottom: 1, right: 1, width: 10, height: 10, borderRadius: "50%", background: "var(--green)", border: "2px solid var(--white)", animation: "dot-pulse 2.4s ease-in-out infinite" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="brig" style={{ fontSize: 14, fontWeight: 700, color: "var(--slate)" }}>Live AI Assistant</div>
              <div style={{ fontSize: 11.5, color: "var(--slate-500)", marginTop: 1 }}>Replies in seconds · Platform & interview prep</div>
            </div>
            <Tag color="green" size="xs">Online</Tag>
          </div>

          {/* Messages scroll area */}
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, background: "var(--ivory)" }}>
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }}
                style={{ display: "flex", gap: 8, alignItems: "flex-end", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                {/* Avatar */}
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: msg.role === "ai" ? "var(--slate)" : "var(--teal-light)",
                  border: msg.role === "user" ? "1.5px solid rgba(13,148,136,.3)" : "none",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13
                }}>
                  {msg.role === "ai" ? <Bot size={13} style={{ color: "var(--teal-mid)" }} /> : "🧑‍💻"}
                </div>
                {/* Bubble */}
                <div className={msg.role === "ai" ? "sp-msg-bubble-ai" : "sp-msg-bubble-usr"}
                  style={{ maxWidth: "78%", padding: "9px 13px", fontSize: 13.5, lineHeight: 1.65, wordBreak: "break-word" }}>
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* Typing dots */}
            <AnimatePresence>
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                  style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--slate)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Bot size={13} style={{ color: "var(--teal-mid)" }} />
                  </div>
                  <div className="sp-msg-bubble-ai" style={{ padding: "10px 15px", display: "flex", gap: 4, alignItems: "center" }}>
                    {[0, 0.18, 0.36].map((d, i) => (
                      <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--slate-300)", animation: `dot-pulse 1.3s ease-in-out ${d}s infinite` }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          {/* Suggested prompts (only shown when just the welcome message) */}
          {messages.length === 1 && (
            <div style={{ padding: "8px 16px", background: "var(--ivory)", borderTop: "1px solid var(--border)", display: "flex", gap: 7, flexWrap: "wrap" }}>
              {["How does scoring work?", "Best persona to start with?", "How to use STAR method?"].map(q => (
                <button key={q} onClick={() => { setChatInput(q); }}
                  style={{ fontSize: 11.5, padding: "5px 11px", borderRadius: 14, border: "1px solid var(--border)", background: "var(--white)", color: "var(--slate-600)", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all 0.18s", whiteSpace: "nowrap" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--teal)"; e.currentTarget.style.color = "var(--teal-dark)"; e.currentTarget.style.background = "var(--teal-light)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--slate-600)"; e.currentTarget.style.background = "var(--white)"; }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div style={{ padding: "10px 14px", borderTop: "1px solid var(--border)", flexShrink: 0, display: "flex", gap: 9, alignItems: "center", background: "var(--white)", borderRadius: "0 0 16px 16px" }}>
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={handleChatKey}
              placeholder="Ask anything…"
              style={{ flex: 1, borderRadius: 10, fontSize: 13.5, padding: "9px 13px", height: 40, border: "1.5px solid var(--border-strong)" }}
            />
            <button onClick={sendChat} disabled={!chatInput.trim() || isTyping}
              className="btn-primary" style={{ padding: "9px 14px", flexShrink: 0, borderRadius: 10, height: 40 }}>
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Quick Resources ── */}
      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div className="brig" style={{ fontSize: 12, fontWeight: 700, color: "var(--slate-400)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Quick Resources</div>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>
        <div className="sp-qgrid">
          {QUICK.map(({ icon, label, hint, color }) => (
            <div key={label} className="sp-qcard">
              <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}15`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>
                {icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--slate)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</div>
                <div style={{ fontSize: 11, color: "var(--slate-400)", marginTop: 1 }}>{hint}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};

const formatBlogDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(date);
};

const MAX_BLOG_HEADING_LEVEL = 3;
const MAX_VISIBLE_BLOG_TAGS = 3;
const MAX_RELATED_BLOG_POSTS = 3;
const LOCAL_BLOG_DEFAULTS = { author: "PlacementDo Team", category: "General" };

const normalizeBlogMeta = (post = {}, defaults = LOCAL_BLOG_DEFAULTS) => ({
  ...post,
  author: (typeof post.author === "string" && post.author.trim())
    ? post.author.trim()
    : (defaults.author || LOCAL_BLOG_DEFAULTS.author),
  category: (typeof post.category === "string" && post.category.trim())
    ? post.category.trim()
    : (defaults.category || LOCAL_BLOG_DEFAULTS.category),
  tags: Array.isArray(post.tags)
    ? post.tags.map((tag) => String(tag || "").trim()).filter(Boolean)
    : [],
  readTimeMinutes: Number.isFinite(Number(post.readTimeMinutes))
    ? Math.max(1, Math.floor(Number(post.readTimeMinutes)))
    : 1,
});

/**
 * Converts blog text content into renderable blocks.
 * Supports headings (#..###), fenced code blocks (```), bullet lists (- or *),
 * standalone markdown image syntax, and paragraph fallback for plain text.
 */
const parseBlogContent = (content = "") => {
  const headingPattern = new RegExp(`^#{1,${MAX_BLOG_HEADING_LEVEL}}\\s+`);
  const lines = String(content).replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let paragraph = [];
  let listItems = [];
  let codeLines = [];
  let inCode = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  };
  const flushList = () => {
    if (!listItems.length) return;
    blocks.push({ type: "list", items: [...listItems] });
    listItems = [];
  };
  const flushCode = () => {
    if (!codeLines.length) return;
    blocks.push({ type: "code", text: codeLines.join("\n") });
    codeLines = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
      }
      return;
    }

    if (inCode) {
      codeLines.push(rawLine);
      return;
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }

    if (headingPattern.test(trimmed)) {
      flushParagraph();
      flushList();
      const level = trimmed.match(/^#+/)?.[0]?.length || 1;
      blocks.push({ type: "heading", level, text: trimmed.replace(headingPattern, "") });
      return;
    }

    const imageMatch = trimmed.match(/^!\[(.*?)\]\(([^)\s]+)\)$/);
    if (imageMatch && isSafeBlogImageUrl(imageMatch[2])) {
      flushParagraph();
      flushList();
      blocks.push({ type: "image", alt: imageMatch[1] || "Blog image", src: imageMatch[2] });
      return;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      listItems.push(trimmed.replace(/^[-*]\s+/, ""));
      return;
    }

    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();
  flushCode();
  return blocks;
};

const isSafeBlogImageUrl = (value = "") => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch (error) {
    void error;
    return false;
  }
};

const PageShell = ({ tag = "PlacementDo", title, description, actions = null, maxWidth = 1080, background = "var(--slate-50)", children }) => (
  <main style={{ minHeight: "100vh", background, padding: "104px clamp(20px,5vw,60px) 72px" }}>
    <div style={{ maxWidth, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div>
          <Tag color="teal">{tag}</Tag>
          <h1 className="brig" style={{ fontSize: "clamp(30px,5vw,44px)", letterSpacing: "-0.03em", marginTop: 10 }}>{title}</h1>
          {description && <p style={{ marginTop: 8, color: "var(--slate-500)", lineHeight: 1.8, maxWidth: 760 }}>{description}</p>}
        </div>
        {actions}
      </div>
      <div style={{ marginTop: 22 }}>
        {children}
      </div>
    </div>
  </main>
);

const BlogList = ({ onNav }) => {
  const [posts, setPosts] = useState([]);
  const [defaults, setDefaults] = useState(LOCAL_BLOG_DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const r = await fetch("/api/blog");
        const data = await r.json();
        if (!r.ok) throw new Error(data?.error || "Failed to load blog posts");
        if (!cancelled) {
          const apiDefaults = data?.defaults && typeof data.defaults === "object" && Object.keys(data.defaults).length > 0
            ? data.defaults
            : defaults;
          if (data?.defaults && typeof data.defaults === "object" && Object.keys(data.defaults).length > 0) {
            setDefaults((curr) => ({ ...curr, ...data.defaults }));
          }
          setPosts(Array.isArray(data?.posts) ? data.posts.map((post) => normalizeBlogMeta(post, apiDefaults)) : []);
        }
      } catch (err) {
        if (!cancelled) setError(err?.message || "Failed to load blog posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, []);

  const categoryOptions = useMemo(() => {
    const categories = Array.from(new Set(posts.map((post) => post.category).filter(Boolean)));
    return ["All", ...categories];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = `${post.title} ${post.excerpt} ${post.author} ${(post.tags || []).join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, selectedCategory, search]);

  return (
    <PageShell
      tag="Blog"
      title="PlacementDo Blog"
      description="Interview prep tips, product updates, and practical guides from the PlacementDo team."
    >
      <div className="card" style={{ padding: 14, display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", marginBottom: 14 }}>
        <div>
          <label htmlFor="blog-search">Search</label>
          <input
            id="blog-search"
            placeholder="Search by title, excerpt, author, tag…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="blog-category">Category</label>
          <select id="blog-category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <div className="card" style={{ padding: 20 }}>Loading posts…</div>}
      {!loading && error && <div className="card" style={{ padding: 20, color: "var(--red)" }}>{error}</div>}
      {!loading && !error && posts.length === 0 && <div className="card" style={{ padding: 20 }}>No posts published yet.</div>}
      {!loading && !error && posts.length > 0 && filteredPosts.length === 0 && <div className="card" style={{ padding: 20 }}>No posts match your filters.</div>}

      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
        {filteredPosts.map((post) => (
          <article key={post.slug} className="card card-lift" style={{ padding: "20px 22px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 8 }}>
              <Tag color="teal">{post.category}</Tag>
              <span style={{ fontSize: 12, color: "var(--slate-400)", display: "inline-flex", gap: 4, alignItems: "center" }}>
                <Calendar size={13} /> {formatBlogDate(post.publishedAt)}
              </span>
            </div>
            <h2 className="brig" style={{ marginTop: 4, fontSize: "clamp(22px,3vw,28px)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{post.title}</h2>
            <p style={{ marginTop: 8, color: "var(--slate-500)", lineHeight: 1.7, flex: 1 }}>{post.excerpt}</p>
            <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 12, color: "var(--slate-500)", fontSize: 12 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><UserCircle size={13} /> {post.author}</span>
              <span>{post.readTimeMinutes} min read</span>
            </div>
            {post.tags.length > 0 && (
              <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
                {post.tags.slice(0, MAX_VISIBLE_BLOG_TAGS).map((tag) => (
                  <span key={`${post.slug}-${tag}`} style={{ fontSize: 11, padding: "4px 8px", borderRadius: 999, border: "1px solid var(--border)", color: "var(--slate-500)", background: "var(--slate-50)" }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <button className="btn-ghost" style={{ marginTop: 12, paddingLeft: 0, alignSelf: "flex-start" }} onClick={() => onNav("blogPost", { slug: post.slug })}>
              Read more <ChevronRight size={14} />
            </button>
          </article>
        ))}
      </div>
    </PageShell>
  );
};

const BlogPost = ({ slug, onNav, onPostLoaded }) => {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [defaults, setDefaults] = useState(LOCAL_BLOG_DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    const run = async () => {
      try {
        const [postResponse, listResponse] = await Promise.all([
          fetch(`/api/blog?slug=${encodeURIComponent(slug)}`),
          fetch("/api/blog"),
        ]);
        const postData = await postResponse.json();
        const listData = await listResponse.json();
        if (!postResponse.ok) throw new Error(postData?.error || "Post not found");
        if (!cancelled) {
          const postDefaults = postData?.defaults && typeof postData.defaults === "object" && Object.keys(postData.defaults).length > 0
            ? postData.defaults
            : null;
          const listDefaults = listData?.defaults && typeof listData.defaults === "object" && Object.keys(listData.defaults).length > 0
            ? listData.defaults
            : null;
          const responseDefaults = postDefaults || listDefaults || defaults;
          if (postDefaults || listDefaults) {
            setDefaults((curr) => ({ ...curr, ...(postDefaults || listDefaults) }));
          }
          const normalizedPost = normalizeBlogMeta(postData?.post || null, responseDefaults);
          setPost(normalizedPost);
          if (normalizedPost && onPostLoaded) {
            onPostLoaded({
              title: normalizedPost.title,
              excerpt: normalizedPost.excerpt,
              publishedAt: normalizedPost.publishedAt || "",
              updatedAt: normalizedPost.updatedAt || normalizedPost.publishedAt || "",
              author: normalizedPost.author || "",
              image: normalizedPost.coverImage || "",
            });
          }
          const listedPosts = listResponse.ok && Array.isArray(listData?.posts)
            ? listData.posts.map((item) => normalizeBlogMeta(item, responseDefaults))
            : [];
          const related = listedPosts
            .filter((item) => item.slug !== normalizedPost.slug)
            .sort((a, b) => {
              const aScore = a.category === normalizedPost.category ? 1 : 0;
              const bScore = b.category === normalizedPost.category ? 1 : 0;
              if (aScore !== bScore) return bScore - aScore;
              return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
            })
            .slice(0, MAX_RELATED_BLOG_POSTS);
          setRelatedPosts(related);
          if (!listResponse.ok) {
            setRelatedPosts([]);
          }
        }
      } catch (err) {
        if (!cancelled) setError(err?.message || "Post not found");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [slug, onPostLoaded]);

  const blocks = useMemo(() => parseBlogContent(post?.content || ""), [post?.content]);

  return (
    <PageShell
      tag="Blog"
      title={post?.title || "Blog Post"}
      description={post?.excerpt || "Read detailed interview guidance and product updates from the PlacementDo team."}
      maxWidth={900}
      background="var(--white)"
      actions={<button className="btn-ghost" onClick={() => onNav("blog")}>← Back to blog</button>}
    >
      {loading && <div className="card" style={{ padding: 20 }}>Loading post…</div>}
      {!loading && error && <div className="card" style={{ padding: 20, color: "var(--red)" }}>{error}</div>}
      {!loading && !error && post && (
        <article>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", color: "var(--slate-500)", fontSize: 13 }}>
            <Tag color="teal">{post.category}</Tag>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Calendar size={13} /> {formatBlogDate(post.publishedAt)}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><UserCircle size={13} /> {post.author}</span>
            <span>{post.readTimeMinutes} min read</span>
          </div>
          <div className="card" style={{ marginTop: 20, padding: 22 }}>
            <div style={{ display: "grid", gap: 14 }}>
              {blocks.map((block, idx) => {
                if (block.type === "heading") {
                  // PageShell renders the page-level h1, so parsed content headings start at h2.
                  const HeadingTag = block.level === 1 ? "h2" : block.level === 2 ? "h3" : "h4";
                  return <HeadingTag key={`h-${idx}`} className="brig" style={{ fontSize: block.level === 1 ? 30 : block.level === 2 ? 24 : 20, letterSpacing: "-0.02em", marginTop: 6 }}>{block.text}</HeadingTag>;
                }
                if (block.type === "code") {
                  return (
                    <pre key={`c-${idx}`} style={{ margin: 0, padding: 14, borderRadius: 12, background: "var(--slate)", color: "var(--slate-100)", overflowX: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, lineHeight: 1.7 }}>
                      <code>{block.text}</code>
                    </pre>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ul key={`l-${idx}`} style={{ margin: 0, paddingLeft: 20, color: "var(--slate-600)", lineHeight: 1.85 }}>
                      {block.items.map((item, itemIdx) => <li key={`li-${idx}-${itemIdx}`}>{item}</li>)}
                    </ul>
                  );
                }
                if (block.type === "image") {
                  return <img key={`i-${idx}`} src={block.src} alt={block.alt} style={{ width: "100%", borderRadius: 12, border: "1px solid var(--border)" }} loading="lazy" />;
                }
                return <p key={`p-${idx}`} style={{ margin: 0, color: "var(--slate-600)", lineHeight: 1.9, fontSize: 16 }}>{block.text}</p>;
              })}
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <section style={{ marginTop: 28 }}>
              <h2 className="brig" style={{ fontSize: 24, letterSpacing: "-0.02em" }}>Related posts</h2>
              <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                {relatedPosts.map((item) => (
                  <button
                    key={item.slug}
                    className="card card-lift"
                    style={{ padding: 14, textAlign: "left", display: "grid", gap: 6, cursor: "pointer", background: "var(--white)" }}
                    onClick={() => onNav("blogPost", { slug: item.slug })}
                  >
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      <Tag color="teal">{item.category}</Tag>
                      <span style={{ fontSize: 12, color: "var(--slate-400)" }}>{formatBlogDate(item.publishedAt)}</span>
                    </div>
                    <div className="brig" style={{ fontSize: 19 }}>{item.title}</div>
                    <div style={{ color: "var(--slate-500)", lineHeight: 1.7 }}>{item.excerpt}</div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </article>
      )}
    </PageShell>
  );
};

const BlogAdmin = ({ onNav }) => {
  const [token, setToken] = useState("");
  const [ownerToken, setOwnerToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [editingSlug, setEditingSlug] = useState("");
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    slug: "",
    status: "draft",
    author: "",
    category: "",
    tags: "",
    readTimeMinutes: "",
  });

  const load = useCallback(async () => {
    if (!token) return;
    const r = await fetch("/api/blog", { headers: { "x-admin-token": token } });
    const data = await r.json();
    if (!r.ok) throw new Error(data?.error || "Failed to load posts");
    setPosts(Array.isArray(data?.posts) ? data.posts : []);
  }, [token]);

  const save = async (e) => {
    e.preventDefault();
    if (!token) return;
    const method = editingSlug ? "PUT" : "POST";
    const target = editingSlug ? `/api/blog?slug=${encodeURIComponent(editingSlug)}` : "/api/blog";
    const r = await fetch(target, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
        ...(ownerToken ? { "x-owner-token": ownerToken } : {}),
      },
      body: JSON.stringify(form),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data?.error || "Save failed");
    setMessage(data?.warning || (editingSlug ? "Post updated." : "Post created."));
    setForm({
      title: "",
      excerpt: "",
      content: "",
      slug: "",
      status: "draft",
      author: "",
      category: "",
      tags: "",
      readTimeMinutes: "",
    });
    setEditingSlug("");
    await load();
  };

  const del = async (slug) => {
    if (!token) return;
    const r = await fetch(`/api/blog?slug=${encodeURIComponent(slug)}`, {
      method: "DELETE",
      headers: { "x-admin-token": token },
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data?.error || "Delete failed");
    setMessage("Post deleted.");
    await load();
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--slate-50)", padding: "104px clamp(20px,5vw,60px) 72px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <h1 className="brig" style={{ fontSize: "clamp(28px,5vw,40px)", letterSpacing: "-0.03em" }}>Blog Admin</h1>
        <button className="btn-ghost" onClick={() => onNav("blog")}>View public blog</button>
      </div>
      <p style={{ color: "var(--slate-500)", marginTop: 8 }}>Enter your admin token to create, edit, and delete posts securely via protected API endpoints.</p>
      {message && <div style={{ marginTop: 12, color: "var(--green)", fontSize: 13 }}>{message}</div>}

      <div className="card" style={{ padding: 16, marginTop: 16 }}>
        <label>Admin Token</label>
        <input value={token} onChange={(e) => setToken(e.target.value)} placeholder="BLOG_ADMIN_TOKEN" />
        <label style={{ marginTop: 10 }}>Owner Publish Token (optional)</label>
        <input value={ownerToken} onChange={(e) => setOwnerToken(e.target.value)} placeholder="BLOG_OWNER_TOKEN" />
        <button className="btn-secondary" style={{ marginTop: 10 }} onClick={async () => {
          try { await load(); setMessage("Posts loaded."); }
          catch (err) { setMessage(err?.message || "Failed to load."); }
        }}>Load Posts</button>
      </div>

      <form className="card" style={{ padding: 18, marginTop: 16, display: "grid", gap: 12 }} onSubmit={async (e) => {
        try { await save(e); }
        catch (err) { setMessage(err?.message || "Save failed."); }
      }}>
        <h2 className="brig" style={{ fontSize: 20 }}>{editingSlug ? "Edit Post" : "Create Post"}</h2>
        <div><label>Title</label><input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required /></div>
        <div><label>Slug (optional)</label><input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} placeholder="my-seo-friendly-slug" /></div>
        <div><label>Excerpt</label><textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} rows={3} required /></div>
        <div><label>Content</label><textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={9} required /></div>
        <div><label>Author (optional)</label><input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} placeholder="PlacementDo Team" /></div>
        <div><label>Category (optional)</label><input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Product" /></div>
        <div><label>Tags (optional, comma-separated)</label><input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} placeholder="interview-prep, career-growth" /></div>
        <div><label>Read time minutes (optional)</label><input type="number" min="1" value={form.readTimeMinutes} onChange={(e) => setForm((f) => ({ ...f, readTimeMinutes: e.target.value }))} placeholder="4" /></div>
        <div><label>Status</label><select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}><option value="published">published</option><option value="draft">draft</option></select></div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="submit" className="btn-primary">{editingSlug ? "Update post" : "Create post"}</button>
          {editingSlug && (
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                setEditingSlug("");
                setForm({
                  title: "",
                  excerpt: "",
                  content: "",
                  slug: "",
                  status: "draft",
                  author: "",
                  category: "",
                  tags: "",
                  readTimeMinutes: "",
                });
              }}
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
        {posts.map((post) => (
          <div key={post.slug} className="card" style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div>
                <div className="brig" style={{ fontSize: 18 }}>{post.title}</div>
                <div style={{ fontSize: 12, color: "var(--slate-400)", marginTop: 2 }}>{post.slug} • {post.status} • {formatBlogDate(post.publishedAt)}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn-secondary" onClick={() => {
                  setEditingSlug(post.slug);
                  setForm((f) => ({
                    ...f,
                    title: post.title,
                    excerpt: post.excerpt,
                    content: post.content || "",
                    slug: post.slug,
                    status: post.status,
                    author: post.author || "",
                    category: post.category || "",
                    tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
                    readTimeMinutes: post.readTimeMinutes || "",
                  }));
                }}>Edit</button>
                <button className="btn-danger" onClick={async () => {
                  try { await del(post.slug); }
                  catch (err) { setMessage(err?.message || "Delete failed."); }
                }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

const StaticPage = ({ title, description, sections = [] }) => (
  <PageShell title={title} description={description} maxWidth={900}>
    <div style={{ display: "grid", gap: 12 }}>
      {sections.map((item) => (
        <section key={item.heading} className="card" style={{ padding: 18 }}>
          <h2 className="brig" style={{ fontSize: 22 }}>{item.heading}</h2>
          <p style={{ marginTop: 8, color: "var(--slate-500)", lineHeight: 1.8 }}>{item.body}</p>
        </section>
      ))}
    </div>
  </PageShell>
);

/* ── Features Page ── */
const FeaturesPage = ({ onNav }) => {
  const features = [
    { icon: <Brain size={22} />, title: "CV-Contextual Questions", desc: "Upload your resume and our AI reads every project, skill claim, and gap — then crafts hyper-specific questions that expose exactly what a real interviewer would probe. No generic questions. Every session is built around your actual background.", color: "var(--teal)" },
    { icon: <Globe size={22} />, title: "28 Languages + Code-Switching", desc: "Practice interviews in English, Mandarin, Hindi, French, Spanish, Arabic, and 22 more languages. Switch languages mid-session seamlessly. Perfect for candidates targeting global companies or bilingual roles.", color: "var(--teal-mid)" },
    { icon: <Zap size={22} />, title: "Real-Time Filler Detection", desc: "Get flagged on filler words (um, uh, like), pacing issues, and over-qualification as they happen — not after. Build habits before a real interviewer silently judges you for the same patterns.", color: "var(--teal-dark)" },
    { icon: <Shield size={22} />, title: "Company Interview DNA", desc: "Each company has its own interview style. Google's Googleyness questions, McKinsey's case frameworks, Amazon's Leadership Principles — PlacementDo calibrates every session to the exact culture and expectations of your target.", color: "var(--teal)" },
    { icon: <BarChart2 size={22} />, title: "10-Metric Score Breakdown", desc: "Walk away with structured scoring across technical depth, STAR method adherence, communication clarity, cultural fit alignment, logical reasoning, and six more tracked dimensions — so you know exactly where to improve next.", color: "var(--teal-mid)" },
    { icon: <RefreshCw size={22} />, title: "Report Rechecks", desc: "Disagree with your analysis? Believe the AI missed context? Request a recheck from a different AI perspective. Pro gets 10, Elite gets 30. Useful when you want a second opinion on ambiguous or edge-case responses.", color: "var(--teal-dark)" },
    { icon: <Award size={22} />, title: "AI Assistance Mode", desc: "Stuck mid-answer? In Assistance Mode, the AI can gently nudge you toward a better structure without just giving you the answer. Ideal for learning STAR method or case frameworks while practising.", color: "var(--teal)" },
    { icon: <TrendingUp size={22} />, title: "Progress Tracking", desc: "Every interview session feeds into a long-term progress chart. Track your scores week over week, see which dimensions are improving fastest, and get targeted coaching on persistent weak spots.", color: "var(--teal-mid)" },
    { icon: <Target size={22} />, title: "Role + Level Targeting", desc: "Set the exact title, seniority level, and focus area (Behavioral / Technical / Case Study / Mixed). The AI adjusts question complexity, expected answer depth, and scoring criteria accordingly.", color: "var(--teal-dark)" },
  ];

  const stats = [
    { n: "140+", l: "Target companies" },
    { n: "28", l: "Languages supported" },
    { n: "6", l: "Interviewer personas" },
    { n: "10", l: "Scoring dimensions" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Hero */}
      <section style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", padding: "96px clamp(20px,5vw,60px) 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 500, background: "radial-gradient(ellipse,rgba(13,148,136,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ position: "relative" }}>
          <Tag color="teal"><Sparkles size={11} /> Features</Tag>
          <h1 className="brig" style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--slate)", marginTop: 16, marginBottom: 16, lineHeight: 1.08, maxWidth: 800, margin: "16px auto" }}>
            Every edge you need to land the offer
          </h1>
          <p style={{ fontSize: "clamp(15px,2vw,18px)", color: "var(--slate-500)", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.68 }}>
            PlacementDo combines CV-aware AI, company-specific preparation, multilingual support, and honest scoring into a single platform built to get you hired faster.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => onNav("pricing")}><CreditCard size={15} /> View Plans</button>
            <button className="btn-secondary" onClick={() => onNav("howItWorks")}>How It Works <ChevronRight size={14} /></button>
          </div>
        </motion.div>
      </section>

      {/* Stats row */}
      <section style={{ background: "var(--slate)", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "28px clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: "clamp(24px,4vw,56px)", justifyContent: "center", flexWrap: "wrap" }}>
          {stats.map(({ n, l }) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div className="brig" style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{n}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.45)", marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section style={{ padding: "80px clamp(20px,5vw,60px)", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 52 }}>
          <Tag color="slate">Core capabilities</Tag>
          <h2 className="brig" style={{ fontSize: "clamp(24px,4vw,42px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--slate)", marginTop: 12, lineHeight: 1.1 }}>Built for serious candidates</h2>
          <p style={{ fontSize: 16, color: "var(--slate-500)", maxWidth: 560, margin: "12px auto 0", lineHeight: 1.65 }}>Nine capabilities working together to give you a decisive edge in competitive interview cycles.</p>
        </motion.div>
        <div className="feature-grid stagger">
          {features.map(({ icon, title, desc, color }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, delay: i * 0.06 }} viewport={{ once: true }} className="feature-card">
              <div className="fc-icon" style={{ background: `${color}12`, borderColor: `${color}20`, color }}>{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Personas highlight */}
      <section style={{ background: "var(--slate)", padding: "80px clamp(20px,5vw,60px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", right: "-5%", width: 500, height: 400, background: "radial-gradient(ellipse,rgba(13,148,136,.18) 0%,transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(340px,100%),1fr))", gap: 48, alignItems: "center" }}>
            <div>
              <Tag color="teal">Unique Feature</Tag>
              <h2 className="brig" style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.18, marginTop: 14, marginBottom: 16 }}>
                6 Distinct AI Interviewer Personalities
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.72, marginBottom: 24 }}>
                Most interview tools only test what you know. PlacementDo trains how you react. Each of our 6 personas simulates a different psychological archetype — from the dangerously supportive Friendly Peer to the silence-wielding Stoic Veteran. Knowing your subject isn't enough when the interviewer is actively trying to destabilise you.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                {["6 Distinct Personalities", "Psychological Pressure Training", "Adaptive Difficulty"].map((label) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 20, padding: "5px 13px" }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,.78)", fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={() => onNav("personas")}><ArrowUpRight size={14} /> Explore Personas</button>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {[
                { id: 3, title: "The Stress-Tester", desc: "Rapid-fire questions, deliberate interruptions, zero encouragement.", color: "#DC2626", bg: "rgba(220,38,38,.16)", bd: "rgba(220,38,38,.3)" },
                { id: 1, title: "The Friendly Peer", desc: "Deceptively warm — probes oversharing and unclear boundaries.", color: "#D97706", bg: "rgba(217,119,6,.16)", bd: "rgba(217,119,6,.3)" },
                { id: 5, title: "The Devil's Advocate", desc: "Disagrees on principle. Forces you to defend every claim.", color: "#7C3AED", bg: "rgba(124,58,237,.16)", bd: "rgba(124,58,237,.3)" },
                { id: 4, title: "The Stoic Veteran", desc: "Zero reaction. Three-beat silence after every answer.", color: "#475569", bg: "rgba(71,85,105,.2)", bd: "rgba(71,85,105,.35)" },
              ].map(({ id, title, desc, color, bg, bd }) => (
                <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: bg, border: `1px solid ${bd}`, borderRadius: 12, padding: "12px 16px" }}>
                  <PersonaAvatar persona={PERSONAS.find(p => p.id === id)} size={34} borderWidth={1.5} />
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{title}</div>
                    <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.55)", lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "72px clamp(20px,5vw,60px)", textAlign: "center", background: "var(--white)", borderTop: "1px solid var(--border)" }}>
        <Tag color="teal">Get started</Tag>
        <h2 className="brig" style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, color: "var(--slate)", letterSpacing: "-0.03em", marginTop: 14, marginBottom: 14, lineHeight: 1.1 }}>Ready to practice smarter?</h2>
        <p style={{ color: "var(--slate-500)", maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.68 }}>Join 2,400+ candidates already on the waitlist. Secure your early-access spot and get 30% off at launch.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => onNav("landing")}><Bell size={15} /> Join Waitlist</button>
          <button className="btn-secondary" onClick={() => onNav("pricing")}>See Pricing <ChevronRight size={14} /></button>
        </div>
      </section>
    </main>
  );
};

/* ── Pricing Page ── */
const PricingPage = ({ onNav, onCheckout }) => {
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    { q: "Are these one-time purchases or subscriptions?", a: "All PlacementDo plans are one-time purchases. There are no monthly subscriptions, no auto-renewals, and no hidden fees. You buy a bundle of interview credits and use them at your own pace — no expiry." },
    { q: "What counts as one interview?", a: "One interview session uses one credit. A session is a complete end-to-end practice — from the AI asking questions through to your detailed scoring report. Sessions typically run 20–45 minutes depending on the number of questions." },
    { q: "Can I change my interviewer persona mid-session?", a: "Personas are locked at the start of each session. You choose your persona when setting up, and the AI maintains that personality throughout. This is intentional — real interviews don't let you swap interviewers." },
    { q: "What is AI Assistance Mode?", a: "Available on Pro and Elite plans, AI Assistance Mode lets the AI gently guide you toward a stronger answer structure without revealing the answer. It's particularly useful when learning the STAR method or case interview frameworks. It can be toggled on or off per session." },
    { q: "What are report rechecks?", a: "If you believe the AI scored an answer unfairly or missed important context, you can request a recheck. A second AI pass re-evaluates that session from a different analytical perspective. Pro includes 10 rechecks; Elite includes 30." },
    { q: "Is there a refund policy?", a: "We offer a satisfaction guarantee on your first session. If you are not satisfied after completing your first interview, contact support@placementdo.com within 7 days and we will issue a full refund. Subsequent sessions are non-refundable." },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Hero */}
      <section style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", padding: "96px clamp(20px,5vw,60px) 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 500, background: "radial-gradient(ellipse,rgba(13,148,136,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ position: "relative" }}>
          <Tag color="teal"><CreditCard size={11} /> Pricing</Tag>
          <h1 className="brig" style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--slate)", marginTop: 16, lineHeight: 1.08, maxWidth: 800, margin: "16px auto" }}>
            One interview could change everything
          </h1>
          <p style={{ fontSize: "clamp(15px,2vw,18px)", color: "var(--slate-500)", maxWidth: 580, margin: "0 auto 16px", lineHeight: 1.68 }}>
            No subscriptions. No auto-renewals. Buy interview credits once, use them whenever you need them. Waitlist members get 30% off at launch.
          </p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
            {[<><CheckCircle2 size={14} /> No subscription</>, <><CheckCircle2 size={14} /> No auto-renewal</>, <><CheckCircle2 size={14} /> 30% early-bird discount</>].map((item, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, color: "var(--teal-dark)", fontWeight: 600 }}>{item}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Pricing grid */}
      <section style={{ padding: "72px clamp(20px,5vw,60px)", maxWidth: 1100, margin: "0 auto" }}>
        <div className="pricing-grid stagger">
          {PLANS.map(({ name, price, old, hi, tagline, features }, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
              className={`pricing-card ${hi ? "hi" : ""}`}
              style={{ background: hi ? "var(--slate)" : "var(--white)", border: hi ? "1px solid var(--slate)" : "1px solid var(--border)", boxShadow: hi ? "var(--shadow-xl)" : "var(--shadow-sm)" }}>
              {hi && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "var(--teal)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 18px", borderRadius: 20, whiteSpace: "nowrap", letterSpacing: "0.06em", boxShadow: "var(--shadow-teal)" }}>MOST POPULAR</div>}
              <div style={{ fontSize: 12, fontWeight: 700, color: hi ? "rgba(255,255,255,.4)" : "var(--slate-300)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>{name}</div>
              <div style={{ fontSize: 12.5, color: hi ? "rgba(255,255,255,.55)" : "var(--slate-500)", marginBottom: 18 }}>{tagline}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 26 }}>
                <span className="brig" style={{ fontSize: "clamp(34px,4vw,48px)", fontWeight: 800, color: hi ? "#fff" : "var(--slate)", letterSpacing: "-0.04em" }}>{price}</span>
                {old && <span style={{ fontSize: 17, color: hi ? "rgba(255,255,255,.3)" : "var(--slate-300)", textDecoration: "line-through" }}>{old}</span>}
              </div>
              <div style={{ height: 1, background: hi ? "rgba(255,255,255,.1)" : "var(--border)", marginBottom: 22 }} />
              <div style={{ marginBottom: 26 }}>
                {features.map(f => (
                  <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 11 }}>
                    <div style={{ width: 17, height: 17, borderRadius: "50%", background: hi ? "rgba(255,255,255,.12)" : "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <Check size={9} style={{ color: hi ? "#fff" : "var(--teal)" }} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: 13.5, color: hi ? "rgba(255,255,255,.78)" : "var(--slate-700)", lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => onCheckout(name)}
                style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", background: hi ? "var(--teal)" : "var(--slate-100)", color: hi ? "#fff" : "var(--slate)", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.22s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: "auto" }}
                onMouseEnter={e => { e.currentTarget.style.background = hi ? "var(--teal-dark)" : "var(--slate-200)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = hi ? "var(--teal)" : "var(--slate-100)"; e.currentTarget.style.transform = ""; }}>
                <CreditCard size={15} /> Get {name} Plan
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Plan comparison — quick reference */}
      <section style={{ padding: "0 clamp(20px,5vw,60px) 72px", maxWidth: 860, margin: "0 auto" }}>
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border)", background: "var(--slate-50)" }}>
            <span className="brig" style={{ fontSize: 16, fontWeight: 700, color: "var(--slate)" }}>Quick plan comparison</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'DM Sans',sans-serif", fontSize: 13.5 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--slate-50)" }}>
                  {["Feature", "Starter ($1)", "Pro ($39.99)", "Elite ($89.99)"].map((h, i) => (
                    <th key={h} style={{ padding: "12px 18px", textAlign: i === 0 ? "left" : "center", fontSize: 12, fontWeight: 700, color: "var(--slate-500)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Interview sessions", "1", "40", "100"],
                  ["Detailed reports", "1", "40", "100"],
                  ["Report rechecks", "—", "10", "30"],
                  ["AI Assistance Mode", "—", "✓", "✓"],
                  ["Languages", "Any (28)", "Multi-language", "All 28"],
                  ["Interviewer personas", "1 of 6", "Any 3 of 6", "All 6"],
                  ["Priority support", "—", "—", "✓"],
                ].map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: ri < 6 ? "1px solid var(--border)" : "none" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--slate-50)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{ padding: "13px 18px", textAlign: ci === 0 ? "left" : "center", color: ci === 0 ? "var(--slate-700)" : cell === "✓" ? "var(--green)" : cell === "—" ? "var(--slate-300)" : "var(--slate-700)", fontWeight: ci === 0 ? 500 : cell === "✓" ? 700 : 400 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "0 clamp(20px,5vw,60px) 80px", maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Tag color="slate"><HelpCircle size={10} /> FAQ</Tag>
          <h2 className="brig" style={{ fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--slate)", marginTop: 12 }}>Common pricing questions</h2>
        </div>
        <div className="card" style={{ overflow: "hidden" }}>
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="faq-item">
              <button className="faq-btn" onClick={() => setOpenFaq(o => o === i ? null : i)} style={{ padding: "20px 24px" }}>
                <span className="brig" style={{ fontSize: 15, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.01em", lineHeight: 1.3 }}>{q}</span>
                <span className="faq-chevron" style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}><ChevronDown size={18} /></span>
              </button>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div key="ans" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}>
                    <p style={{ fontSize: 14.5, color: "var(--slate-600)", lineHeight: 1.75, padding: "0 24px 22px", borderTop: "1px solid var(--border)" }}>{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

/* ── Personas Page (public) ── */
const PersonasPage = ({ onNav }) => {
  const [expanded, setExpanded] = useState(null);

  return (
    <main style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Hero */}
      <section style={{ background: "var(--slate)", padding: "96px clamp(20px,5vw,60px) 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 500, background: "radial-gradient(ellipse,rgba(13,148,136,.18) 0%,transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "5%", width: 360, height: 300, background: "radial-gradient(ellipse,rgba(124,58,237,.14) 0%,transparent 65%)", pointerEvents: "none" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ position: "relative", zIndex: 1 }}>
          <Tag color="teal">Interviewer Personas</Tag>
          <h1 className="brig" style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginTop: 16, lineHeight: 1.08, maxWidth: 800, margin: "16px auto" }}>
            Survive any interviewer personality
          </h1>
          <p style={{ fontSize: "clamp(15px,2vw,18px)", color: "rgba(255,255,255,.6)", maxWidth: 620, margin: "0 auto 32px", lineHeight: 1.68 }}>
            Real interviews aren't just about what you know — they're about who's asking. PlacementDo trains how you react to 6 distinct behavioral archetypes, from the dangerously charming to the psychologically intense.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => onNav("signin")}><Zap size={14} /> Start Practicing</button>
            <button className="btn-secondary" onClick={() => onNav("features")}>See All Features <ChevronRight size={14} /></button>
          </div>
        </motion.div>
      </section>

      {/* Persona grid */}
      <section style={{ padding: "72px clamp(20px,5vw,60px)", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag color="slate">6 archetypes</Tag>
          <h2 className="brig" style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--slate)", marginTop: 12, lineHeight: 1.1 }}>Meet your interviewers</h2>
          <p style={{ color: "var(--slate-500)", maxWidth: 560, margin: "12px auto 0", lineHeight: 1.65 }}>Each persona is engineered to test a different dimension of your interview performance. Understanding their patterns is half the battle.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(320px,100%),1fr))", gap: 20 }}>
          {PERSONAS.map((p, idx) => {
            const isOpen = expanded === p.id;
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: idx * 0.07 }} viewport={{ once: true }}
                style={{ borderRadius: 18, overflow: "hidden", border: `1.5px solid ${isOpen ? p.accentColor + "60" : "var(--border)"}`, background: "var(--white)", boxShadow: isOpen ? `0 0 0 4px ${p.accentColor}12, var(--shadow-md)` : "var(--shadow-sm)", transition: "all 0.25s" }}>
                <div style={{ height: 5, background: `linear-gradient(90deg, ${p.accentColor}, ${p.accentColor}88)` }} />
                <div style={{ padding: "22px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <PersonaAvatar persona={p} size={60} />
                    <div style={{ background: p.diffBg, color: p.diffColor, fontSize: 10.5, fontWeight: 700, padding: "4px 11px", borderRadius: 20, border: `1px solid ${p.accentColor}28` }}>{p.difficulty}</div>
                  </div>
                  <div className="brig" style={{ fontSize: 18, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.015em", marginBottom: 3 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: p.accentColor, fontWeight: 600, marginBottom: 10 }}>{p.style}</div>
                  <p style={{ fontSize: 13.5, color: "var(--slate-500)", lineHeight: 1.65, marginBottom: 14 }}>{p.vibe}</p>
                  <div style={{ height: 1, background: "var(--border)", marginBottom: 12 }} />
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                    {p.traits.map(t => (
                      <span key={t} style={{ fontSize: 11, color: "var(--slate-600)", background: "var(--slate-100)", padding: "3px 9px", borderRadius: 12, fontWeight: 500, border: "1px solid var(--border)" }}>{t}</span>
                    ))}
                  </div>
                  <button className="btn-ghost" style={{ paddingLeft: 0, fontSize: 13 }} onClick={() => setExpanded(isOpen ? null : p.id)}>
                    {isOpen ? "Show less" : "What to expect"} {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div key="exp" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <div style={{ marginTop: 12, padding: "14px 16px", background: `${p.accentColor}08`, borderRadius: 10, border: `1px solid ${p.accentColor}18` }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: p.accentColor, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8 }}>What to expect</div>
                          <p style={{ fontSize: 13, color: "var(--slate-600)", lineHeight: 1.7, margin: 0 }}>
                            {p.id === 1 && "Expect warmth that disarms you. Sam builds false rapport quickly, making you feel like you're talking to a colleague rather than being assessed. This is when candidates overshare, ramble past the STAR format, and reveal things that hurt their case. The challenge is maintaining professional boundaries while still appearing likeable."}
                            {p.id === 2 && "Maya listens deeply, reflects back what you say, and then asks deceptively simple follow-up questions about your emotional reasoning. Her silence after a question is deliberate — it pressures you to fill the space. The key is learning to sit with discomfort and give precise, not expansive, answers."}
                            {p.id === 3 && "Rex doesn't wait for you to finish. Expect two or three interruptions per answer, deliberate scepticism about every claim ('prove it'), and periods of sustained silence designed to make you panic and over-explain. This is the hardest persona for a reason — it mirrors exactly what FAANG stress interviewers do."}
                            {p.id === 4 && "Harold is unreadable. You'll answer a strong question, pause, and receive no reaction at all — no nod, no 'interesting', nothing. Then three seconds of silence before the next question. Most candidates interpret silence as failure and add unnecessary caveats. The discipline here is learning to stop talking when your answer is complete."}
                            {p.id === 5 && "Victor's default response is disagreement. 'I'm not sure I agree with that approach' or 'That seems overly optimistic — defend it.' His goal is not to be right; it's to see whether you cave under pressure or maintain your position with clear reasoning. The trap is over-correcting. Learn to distinguish between reconsidering and capitulating."}
                            {p.id === 6 && "Dr. Chen types notes constantly, makes minimal eye contact, and asks one hyper-specific forensic question at a time. If your answer contains any vagueness — an estimate, an approximation, a feeling — expect the next question to forensically dissect exactly that point. Precision in your answers is the only reliable defence."}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Why personas matter */}
      <section style={{ background: "var(--white)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "72px clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Tag color="slate">Why it matters</Tag>
            <h2 className="brig" style={{ fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--slate)", marginTop: 12 }}>The psychology behind persona training</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: 20 }}>
            {[
              { icon: <Brain size={20} />, color: "var(--teal)", title: "Situational fluency", desc: "Most interview failures aren't caused by knowledge gaps — they're caused by situational anxiety. Repeated exposure to different interviewer styles builds the neural pathways needed to stay composed under pressure." },
              { icon: <Shield size={20} />, color: "#7C3AED", title: "Pattern recognition", desc: "Each persona has consistent tells and traps. Once you've trained against them enough times, you'll instantly recognize the patterns in real interviews — and respond with calibrated, practised precision rather than reactive panic." },
              { icon: <Award size={20} />, color: "var(--amber)", title: "Transferable confidence", desc: "Confidence that's earned through repeated challenge transfers to real situations. Candidates who've survived 20 sessions with The Stress-Tester consistently report that real FAANG interviewers feel comparatively manageable." },
            ].map(({ icon, color, title, desc }) => (
              <div key={title} className="card" style={{ padding: 26 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}12`, display: "flex", alignItems: "center", justifyContent: "center", color, marginBottom: 16 }}>{icon}</div>
                <div className="brig" style={{ fontSize: 16, fontWeight: 700, color: "var(--slate)", marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: 13.5, color: "var(--slate-500)", lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "72px clamp(20px,5vw,60px)", textAlign: "center" }}>
        <Tag color="teal">Get started</Tag>
        <h2 className="brig" style={{ fontSize: "clamp(22px,3.5vw,38px)", fontWeight: 800, color: "var(--slate)", letterSpacing: "-0.03em", marginTop: 14, marginBottom: 14 }}>Start training against all 6 personas</h2>
        <p style={{ color: "var(--slate-500)", maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.68 }}>Join the waitlist now. Starter plan includes 1 session. Pro unlocks any 3 personas. Elite unlocks all 6.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => onNav("pricing")}><CreditCard size={14} /> View Plans</button>
          <button className="btn-secondary" onClick={() => onNav("landing")}>Join Waitlist <ChevronRight size={14} /></button>
        </div>
      </section>
    </main>
  );
};

/* ── How It Works Page ── */
const HowItWorksPage = ({ onNav }) => {
  const steps = [
    {
      step: "01", icon: <Upload size={24} />, color: "var(--teal)",
      title: "Upload your CV",
      desc: "Start by uploading your resume. Our AI parses every project, role, skill claim, and career gap in detail. This context is used throughout your session to generate hyper-relevant questions that a real interviewer who had actually read your CV would ask — not generic interview questions from a list.",
      detail: ["PDF, DOCX, or plain text formats accepted", "AI identifies your strongest and weakest talking points", "Gaps and ambiguities are flagged as likely interview targets"],
    },
    {
      step: "02", icon: <Building2 size={24} />, color: "#0369A1",
      title: "Configure your session",
      desc: "Choose your target company from 140+ options, set your exact role and seniority level, select a focus area (Behavioral, Technical, Case Study, or Mixed), and pick your interviewer persona. Every setting directly shapes the questions, scoring criteria, and difficulty of your session.",
      detail: ["140+ companies with distinct interview styles calibrated", "Role and level targeting adjusts expected answer depth", "Focus area selection adapts question types and frameworks"],
    },
    {
      step: "03", icon: <Video size={24} />, color: "#7C3AED",
      title: "Run a live AI interview",
      desc: "Your AI interviewer begins. Questions are timed. You respond verbally via your microphone. The AI listens, follows up, pushes back, and maintains its persona throughout — whether that means interrupting you mid-sentence (Stress-Tester) or sitting in three-beat silence after your answer (Stoic Veteran). No second chances. No pausing.",
      detail: ["Real-time filler word detection during your response", "AI follows up on weak points and specific claims", "Persona behaviors maintained consistently throughout"],
    },
    {
      step: "04", icon: <Award size={24} />, color: "var(--amber)",
      title: "Receive your analysis report",
      desc: "Within moments of ending the session, your detailed analysis report is ready. It scores 10 dimensions including technical depth, STAR method adherence, communication clarity, and cultural fit — with specific timestamps, exact quotes from your answers, and actionable improvement recommendations for the next session.",
      detail: ["10-dimension scoring with benchmarks vs. target role", "Exact quotes and timestamps for each scored moment", "Prioritised list of improvement actions for next session"],
    },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      {/* Hero */}
      <section style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", padding: "96px clamp(20px,5vw,60px) 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 500, background: "radial-gradient(ellipse,rgba(13,148,136,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ position: "relative" }}>
          <Tag color="teal">Process</Tag>
          <h1 className="brig" style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--slate)", marginTop: 16, lineHeight: 1.08, maxWidth: 800, margin: "16px auto" }}>
            From zero to hired in four steps
          </h1>
          <p style={{ fontSize: "clamp(15px,2vw,18px)", color: "var(--slate-500)", maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.68 }}>
            A structured, repeatable practice workflow designed to deliver measurable improvement with every session — from your first practice through to your offer.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => onNav("signin")}><Zap size={14} /> Start Now</button>
            <button className="btn-secondary" onClick={() => onNav("features")}>See Features <ChevronRight size={14} /></button>
          </div>
        </motion.div>
      </section>

      {/* Steps */}
      <section style={{ padding: "80px clamp(20px,5vw,60px)", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gap: 28 }}>
          {steps.map(({ step, icon, color, title, desc, detail }, i) => (
            <motion.div key={step} initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
              className="card" style={{ padding: "clamp(24px,4vw,36px)", display: "grid", gridTemplateColumns: "auto 1fr", gap: "clamp(20px,3vw,36px)", alignItems: "start" }}>
              {/* Step number + icon */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: `${color}12`, border: `2px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>{icon}</div>
                <span className="brig" style={{ fontSize: 11, fontWeight: 800, color: `${color}80`, letterSpacing: "0.1em" }}>{step}</span>
              </div>
              {/* Content */}
              <div>
                <h2 className="brig" style={{ fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.02em", marginBottom: 10 }}>{title}</h2>
                <p style={{ fontSize: 15, color: "var(--slate-500)", lineHeight: 1.75, marginBottom: 18 }}>{desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))", gap: 8 }}>
                  {detail.map(d => (
                    <div key={d} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: `${color}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        <Check size={9} style={{ color }} strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: 13, color: "var(--slate-600)", lineHeight: 1.5 }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Report detail */}
      <section style={{ background: "var(--white)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "72px clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Tag color="amber">What's in your report</Tag>
            <h2 className="brig" style={{ fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--slate)", marginTop: 12 }}>10 dimensions. Brutally honest.</h2>
            <p style={{ color: "var(--slate-500)", maxWidth: 520, margin: "12px auto 0", lineHeight: 1.65 }}>Every session ends with a structured report that tells you exactly where you stand and what to fix next.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))", gap: 14 }}>
            {[
              { n: "Technical depth", c: "var(--teal)" },
              { n: "STAR method adherence", c: "#0369A1" },
              { n: "Communication clarity", c: "#7C3AED" },
              { n: "Cultural fit alignment", c: "var(--amber)" },
              { n: "Logical reasoning", c: "#BE185D" },
              { n: "Conciseness + pacing", c: "var(--green)" },
              { n: "Confidence signals", c: "#DC2626" },
              { n: "Question comprehension", c: "var(--teal)" },
              { n: "Follow-up handling", c: "#7C3AED" },
              { n: "Overall readiness", c: "#0369A1" },
            ].map(({ n, c }, i) => (
              <motion.div key={n} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.04 }} viewport={{ once: true }}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 11, border: "1px solid var(--border)", background: "var(--ivory)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: c, flexShrink: 0 }} />
                <span style={{ fontSize: 13.5, color: "var(--slate-700)", fontWeight: 500 }}>{n}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "72px clamp(20px,5vw,60px)", textAlign: "center" }}>
        <Tag color="teal">Begin your first session</Tag>
        <h2 className="brig" style={{ fontSize: "clamp(22px,3.5vw,38px)", fontWeight: 800, color: "var(--slate)", letterSpacing: "-0.03em", marginTop: 14, marginBottom: 14 }}>Ready to practice under real pressure?</h2>
        <p style={{ color: "var(--slate-500)", maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.68 }}>Starter plan is $1 for a full session + report. No subscription required. See the difference after just one session.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => onNav("pricing")}><CreditCard size={14} /> View Plans</button>
          <button className="btn-secondary" onClick={() => onNav("personas")}>Meet the Personas <ChevronRight size={14} /></button>
        </div>
      </section>
    </main>
  );
};

/* ── About Page ── */
const AboutPage = ({ onNav }) => (
  <main style={{ minHeight: "100vh", background: "var(--ivory)" }}>
    {/* Hero */}
    <section style={{ background: "var(--slate)", padding: "96px clamp(20px,5vw,60px) 72px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", right: "5%", width: 500, height: 400, background: "radial-gradient(ellipse,rgba(13,148,136,.16) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Tag color="teal">About PlacementDo</Tag>
          <h1 className="brig" style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginTop: 16, lineHeight: 1.1, marginBottom: 18 }}>
            Built for candidates who want to win the interview, not just survive it
          </h1>
          <p style={{ fontSize: "clamp(15px,2vw,18px)", color: "rgba(255,255,255,.6)", lineHeight: 1.72, maxWidth: 680 }}>
            PlacementDo was born from a simple observation: most candidates are over-prepared on knowledge and under-prepared on execution. They know the answers — they just can't deliver them under pressure, to a difficult interviewer, in a foreign language, or on a bad day.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Mission */}
    <section style={{ padding: "72px clamp(20px,5vw,60px)", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(340px,100%),1fr))", gap: 32, alignItems: "center" }}>
        <div>
          <Tag color="teal">Our mission</Tag>
          <h2 className="brig" style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.025em", lineHeight: 1.18, marginTop: 12, marginBottom: 18 }}>
            Make high-quality interview preparation equally accessible to every candidate
          </h2>
          <p style={{ fontSize: 15, color: "var(--slate-500)", lineHeight: 1.78, marginBottom: 18 }}>
            Candidates who succeed in competitive interviews don't just know more — they've practiced more, in more realistic conditions, with more honest feedback. That level of preparation has historically required expensive coaching, insider connections, or luck.
          </p>
          <p style={{ fontSize: 15, color: "var(--slate-500)", lineHeight: 1.78 }}>
            PlacementDo exists to remove those barriers. A first-generation candidate preparing for their first tech interview should have access to the same quality of practice as someone with a network full of ex-FAANG coaches. That's what we're building.
          </p>
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          {[
            { icon: <Target size={18} />, color: "var(--teal)", title: "Personalized, not generic", desc: "Every session is built around your actual CV and target role — not a question bank anyone can access." },
            { icon: <Globe size={18} />, color: "#0369A1", title: "Globally accessible", desc: "28 language support means preparation is available in the language your interview will actually be in." },
            { icon: <Shield size={18} />, color: "#7C3AED", title: "Honest, not flattering", desc: "Real improvement comes from honest feedback, not encouragement. We build tools that tell you the truth." },
          ].map(({ icon, color, title, desc }) => (
            <div key={title} className="card" style={{ padding: "18px 20px", display: "flex", gap: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}12`, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>{icon}</div>
              <div>
                <div className="brig" style={{ fontSize: 14.5, fontWeight: 700, color: "var(--slate)", marginBottom: 5 }}>{title}</div>
                <p style={{ fontSize: 13, color: "var(--slate-500)", lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* What we build */}
    <section style={{ background: "var(--white)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "72px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag color="slate">What we build</Tag>
          <h2 className="brig" style={{ fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--slate)", marginTop: 12 }}>Preparation infrastructure for the modern job seeker</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: 20 }}>
          {[
            { icon: <Brain size={20} />, color: "var(--teal)", title: "CV-Aware AI Interviewer", desc: "An AI that actually reads your resume and asks questions about it — the same way a real interviewer who prepared for your interview would. Not a chatbot reading from a question list." },
            { icon: <Flame size={20} />, color: "#DC2626", title: "Persona-Based Pressure Training", desc: "Six distinct interviewer personalities engineered to train your composure, not just your knowledge. Because the gap between knowing the answer and delivering it under pressure is exactly where interviews are lost." },
            { icon: <BarChart2 size={20} />, color: "#BE185D", title: "Structured Performance Analytics", desc: "A 10-dimension scoring system that goes beyond 'you did well' to tell you exactly where you gained and lost points — with timestamps, quotes, and a clear action list for next time." },
            { icon: <TrendingUp size={20} />, color: "var(--green)", title: "Long-Term Progress Tracking", desc: "Improvement is a process, not a single session. Track your scores week over week, watch specific dimensions improve, and build the data-backed confidence that comes from measurable progress." },
          ].map(({ icon, color, title, desc }) => (
            <div key={title} className="feature-card">
              <div className="fc-icon" style={{ background: `${color}12`, borderColor: `${color}20`, color }}>{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section style={{ padding: "72px clamp(20px,5vw,60px)", maxWidth: 860, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <Tag color="slate">How we operate</Tag>
        <h2 className="brig" style={{ fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--slate)", marginTop: 12 }}>Our working values</h2>
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        {[
          { n: "Candidate empathy first", b: "Every product decision starts with a single question: does this actually help a candidate prepare more effectively? We don't build features for their own sake — we build them because we've seen candidates fail at the exact point they would have addressed." },
          { n: "Honest over comfortable", b: "It's tempting to build tools that make users feel good. We chose not to. PlacementDo gives you the score you earned, not the score you hoped for. Uncomfortable feedback delivered well is the most valuable thing a preparation tool can offer." },
          { n: "Repeatable over one-off", b: "Interview preparation that only works once isn't preparation — it's luck. Everything we build is designed for repeated use, because the candidates who succeed are the ones who practiced ten times, not the ones who found the perfect YouTube video the night before." },
          { n: "Simple over clever", b: "We resist complexity for its own sake. The best preparation tools are the ones you actually use consistently, not the ones with the most features. Every addition to PlacementDo has to pass a simplicity test before it ships." },
        ].map(({ n, b }) => (
          <div key={n} className="card" style={{ padding: "20px 24px", display: "flex", gap: 16 }}>
            <div style={{ width: 4, borderRadius: 2, background: "var(--teal)", flexShrink: 0, alignSelf: "stretch" }} />
            <div>
              <div className="brig" style={{ fontSize: 15.5, fontWeight: 700, color: "var(--slate)", marginBottom: 7, letterSpacing: "-0.01em" }}>{n}</div>
              <p style={{ fontSize: 14, color: "var(--slate-500)", lineHeight: 1.75, margin: 0 }}>{b}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Contact */}
    <section style={{ background: "var(--teal-light)", borderTop: "1px solid rgba(13,148,136,.18)", padding: "48px clamp(20px,5vw,60px)", textAlign: "center" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <h2 className="brig" style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.02em", marginBottom: 12 }}>Questions or feedback?</h2>
        <p style={{ color: "var(--slate-600)", lineHeight: 1.68, marginBottom: 20 }}>We read every message. Whether you have a product suggestion, a bug report, or just want to say hello — we're listening at <strong>support@placementdo.com</strong></p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-secondary" onClick={() => onNav("careers")}>Join Our Team <ChevronRight size={14} /></button>
        </div>
      </div>
    </section>
  </main>
);

/* ── Careers Page ── */
const CareersPage = () => (
  <main style={{ minHeight: "100vh", background: "var(--ivory)" }}>
    {/* Hero */}
    <section style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", padding: "96px clamp(20px,5vw,60px) 72px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", right: "10%", width: 400, height: 300, background: "radial-gradient(ellipse,rgba(13,148,136,.08) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Tag color="teal">We're hiring</Tag>
          <h1 className="brig" style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--slate)", marginTop: 16, lineHeight: 1.1, marginBottom: 18 }}>
            Build the platform that helps millions get hired
          </h1>
          <p style={{ fontSize: "clamp(15px,2vw,18px)", color: "var(--slate-500)", lineHeight: 1.72, maxWidth: 640 }}>
            We're a small team building thoughtful tools that help candidates unlock opportunities through better interview preparation. If you care deeply about candidate outcomes and want to work on a product that directly changes people's lives — we'd love to hear from you.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Current openings */}
    <section style={{ padding: "72px clamp(20px,5vw,60px)", maxWidth: 860, margin: "0 auto" }}>
      <Tag color="slate">Current openings</Tag>
      <h2 className="brig" style={{ fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.025em", marginTop: 12, marginBottom: 28 }}>Open roles</h2>
      <div className="card" style={{ padding: "28px 32px", display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Sparkles size={22} style={{ color: "var(--teal)" }} />
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div className="brig" style={{ fontSize: 18, fontWeight: 700, color: "var(--slate)", marginBottom: 8 }}>We hire on a rolling basis</div>
          <p style={{ fontSize: 14.5, color: "var(--slate-500)", lineHeight: 1.72, marginBottom: 18 }}>
            We don't always have formal roles open, but we're always interested in exceptional people who align with our mission. If you're a strong engineer, product designer, or growth specialist who wants to work on something that directly improves candidates' lives — send your profile and a note about what you'd want to build.
          </p>
          <p style={{ fontSize: 14.5, color: "var(--slate-500)", lineHeight: 1.72, marginBottom: 20 }}>
            Reach us at <strong style={{ color: "var(--slate-700)" }}>support@placementdo.com</strong> with the subject line "Careers — [your role/skill]". We respond to every serious application personally.
          </p>
          <a href="mailto:support@placementdo.com?subject=Careers"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            className="btn-primary">
            <Mail size={14} /> Send your application
          </a>
        </div>
      </div>
    </section>

    {/* Areas of interest */}
    <section style={{ background: "var(--white)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "72px clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag color="slate">Where we need help</Tag>
          <h2 className="brig" style={{ fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.025em", marginTop: 12 }}>Disciplines we're always interested in</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: 18 }}>
          {[
            { icon: <Brain size={20} />, color: "var(--teal)", title: "AI / ML Engineering", desc: "Building and improving the conversational AI, persona models, scoring systems, and real-time audio processing that power the core interview experience." },
            { icon: <Palette size={20} />, color: "#7C3AED", title: "Product Design", desc: "Designing user flows, interaction patterns, and visual systems that make a high-stakes tool feel approachable, trustworthy, and genuinely useful to candidates." },
            { icon: <BarChart2 size={20} />, color: "#BE185D", title: "Growth / Marketing", desc: "Reaching and activating candidates at the moment they need us most — typically the window between getting a first-round invite and showing up for the interview." },
            { icon: <FileText size={20} />, color: "var(--amber)", title: "Content & Coaching", desc: "Creating the interview preparation frameworks, coaching guidance, and structured content that helps candidates make the most of their sessions and reports." },
            { icon: <Settings size={20} />, color: "#0369A1", title: "Backend Engineering", desc: "Building the infrastructure for real-time session management, secure report generation, multi-region deployment, and scalable API design." },
            { icon: <Shield size={20} />, color: "var(--green)", title: "Trust & Safety", desc: "Ensuring the platform remains secure, fair, and free from misuse — while keeping the experience smooth for the candidates who are here for the right reasons." },
          ].map(({ icon, color, title, desc }) => (
            <div key={title} className="feature-card">
              <div className="fc-icon" style={{ background: `${color}12`, borderColor: `${color}20`, color }}>{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Culture */}
    <section style={{ padding: "72px clamp(20px,5vw,60px)", maxWidth: 860, margin: "0 auto" }}>
      <Tag color="teal">How we work</Tag>
      <h2 className="brig" style={{ fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.025em", marginTop: 12, marginBottom: 28 }}>Culture and ways of working</h2>
      <div style={{ display: "grid", gap: 16 }}>
        {[
          { n: "Small team, real ownership", b: "We're a small team, which means everyone owns significant surface area. You won't spend six months on a single feature — you'll ship things, watch them affect real users, iterate, and ship again." },
          { n: "Remote-first, async by default", b: "We work asynchronously across time zones. Meetings exist when they genuinely accelerate decisions; otherwise, we default to written communication that's thoughtful, clear, and creates a permanent record of reasoning." },
          { n: "Mission-aligned, outcome-focused", b: "We care about candidate outcomes, not activity metrics. If a feature makes preparation measurably better, we build it. If it doesn't, we don't, regardless of how clever the idea is." },
          { n: "Honest feedback, given with care", b: "The same directness we build into our product, we bring to our working culture. We give honest feedback, receive it without defensiveness, and create an environment where the best idea wins regardless of who proposes it." },
        ].map(({ n, b }) => (
          <div key={n} className="card" style={{ padding: "20px 24px", display: "flex", gap: 16 }}>
            <div style={{ width: 4, borderRadius: 2, background: "var(--teal)", flexShrink: 0, alignSelf: "stretch" }} />
            <div>
              <div className="brig" style={{ fontSize: 15.5, fontWeight: 700, color: "var(--slate)", marginBottom: 7, letterSpacing: "-0.01em" }}>{n}</div>
              <p style={{ fontSize: 14, color: "var(--slate-500)", lineHeight: 1.75, margin: 0 }}>{b}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </main>
);

/* ── Privacy Policy Page ── */
const PrivacyPage = () => {
  const sections = [
    {
      heading: "Information we collect",
      body: "We collect information you provide directly when you create an account, including your name and email address. When you use the platform, we collect usage data including interview session activity, session duration, responses submitted during practice interviews, feature interactions, and navigation patterns. We also collect technical data such as IP address, browser type, device information, and operating system, primarily for security, fraud prevention, and product improvement purposes. Waitlist submissions are stored securely and used only to notify you at launch.",
    },
    {
      heading: "How we use your data",
      body: "Data is used to: (1) provide the interview practice service, including generating your personalised questions and scoring reports; (2) improve the AI model's accuracy and question relevance over time; (3) send you service-related communications, including account notices and session reports; (4) detect and prevent fraud, misuse, and security incidents; (5) analyse product usage patterns to prioritise improvements; and (6) communicate with waitlist members about launch updates and early-access pricing. We do not sell, rent, or share your personal data with third-party advertisers.",
    },
    {
      heading: "Data storage and retention",
      body: "Account data and interview session reports are stored on secure cloud infrastructure with encryption at rest and in transit. We retain account data for as long as your account is active. Interview session reports are retained for 12 months by default, after which they are automatically deleted unless you request otherwise. Waitlist email addresses are retained until launch or until you unsubscribe, whichever comes first. You may request deletion of your data at any time by contacting support@placementdo.com.",
    },
    {
      heading: "Third-party services",
      body: "We use a limited number of third-party services to operate the platform, including cloud hosting providers, analytics tools, and email delivery services. These providers process data only on our behalf and under contractual obligations consistent with this policy. We do not allow third-party services to use your data for their own purposes. When required, we maintain Data Processing Agreements (DPAs) with these providers.",
    },
    {
      heading: "Cookies and tracking",
      body: "We use necessary cookies for session management, authentication, and security. We may use analytics cookies to understand aggregate product usage patterns — these are anonymised and do not identify individual users. We do not use third-party advertising cookies. You can disable non-essential cookies through your browser settings; disabling necessary cookies may affect platform functionality.",
    },
    {
      heading: "Your rights and choices",
      body: "Depending on your jurisdiction, you may have rights including: access to the personal data we hold about you; correction of inaccurate data; deletion of your data ('right to be forgotten'); restriction or objection to certain processing; and data portability. To exercise any of these rights, contact support@placementdo.com. We aim to respond within 30 days. For users in the European Economic Area (EEA), we process data under GDPR. For California residents, we comply with CCPA.",
    },
    {
      heading: "Children's privacy",
      body: "PlacementDo is intended for users aged 16 and older. We do not knowingly collect personal information from children under 16. If we become aware that we have inadvertently collected such data, we will delete it promptly. If you believe we may have collected data from a child under 16, please contact support@placementdo.com immediately.",
    },
    {
      heading: "Changes to this policy",
      body: "We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or product features. When we make material changes, we will notify registered users by email or through a notice on the platform at least 14 days before the changes take effect. Continued use of the platform after that date constitutes acceptance of the updated policy. The date of the most recent update appears at the top of this page.",
    },
    {
      heading: "Contact and data controller",
      body: "PlacementDo is the data controller for personal information collected through this platform. For privacy questions, data requests, or concerns, contact us at support@placementdo.com. We take privacy seriously and commit to responding to all legitimate inquiries within 30 business days.",
    },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      <section style={{ background: "var(--slate)", padding: "96px clamp(20px,5vw,60px) 56px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Tag color="teal"><Shield size={11} /> Privacy Policy</Tag>
            <h1 className="brig" style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginTop: 14, lineHeight: 1.1, marginBottom: 14 }}>Your privacy matters to us</h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>This policy explains how PlacementDo collects, uses, and protects your information. Last updated: April 2026.</p>
          </motion.div>
        </div>
      </section>
      <section style={{ padding: "56px clamp(20px,5vw,60px) 80px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "grid", gap: 14 }}>
          {sections.map((item, i) => (
            <motion.section key={item.heading} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.04 }} viewport={{ once: true }} className="card" style={{ padding: "24px 28px" }}>
              <h2 className="brig" style={{ fontSize: 19, fontWeight: 700, color: "var(--slate)", marginBottom: 10, letterSpacing: "-0.01em" }}>{item.heading}</h2>
              <p style={{ fontSize: 14.5, color: "var(--slate-500)", lineHeight: 1.82, margin: 0 }}>{item.body}</p>
            </motion.section>
          ))}
        </div>
        <p style={{ marginTop: 24, fontSize: 13, color: "var(--slate-400)", textAlign: "center" }}>Questions about this policy? Email us at <strong style={{ color: "var(--slate-600)" }}>support@placementdo.com</strong></p>
      </section>
    </main>
  );
};

/* ── Terms of Service Page ── */
const TermsPage = () => {
  const sections = [
    {
      heading: "Acceptance of terms",
      body: "By accessing or using PlacementDo (the 'Service'), you agree to be bound by these Terms of Service ('Terms'). If you do not agree to these Terms, you may not use the Service. These Terms apply to all users, including registered account holders, waitlist members, and visitors. We reserve the right to update these Terms at any time; continued use of the Service after changes are posted constitutes acceptance of the revised Terms.",
    },
    {
      heading: "Eligibility",
      body: "You must be at least 16 years of age to use PlacementDo. By using the Service, you represent and warrant that you meet this age requirement. If you are creating an account on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.",
    },
    {
      heading: "Account registration and security",
      body: "To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to notify us immediately at support@placementdo.com if you become aware of any unauthorised access to your account. We are not liable for any loss or damage arising from your failure to maintain account security.",
    },
    {
      heading: "Acceptable use",
      body: "You agree to use the Service only for lawful interview preparation purposes and in accordance with these Terms. You must not: attempt to reverse-engineer, decompile, or extract the AI models or proprietary systems powering PlacementDo; use automated tools or bots to access or interact with the Service; resell or redistribute access to the Service without written permission; share account credentials with third parties; upload content that is harmful, illegal, or infringes on third-party rights; or attempt to gain unauthorised access to any part of the Service or its infrastructure.",
    },
    {
      heading: "Purchases and payment",
      body: "All purchases are one-time transactions. There are no subscriptions or auto-renewals. Prices are displayed in USD. Payment is processed by our third-party payment processor. By completing a purchase, you authorise us to charge the payment method on file for the stated amount. All sales are final unless covered by our first-session satisfaction guarantee, under which we offer a full refund within 7 days of your first completed session if you are unsatisfied. Contact support@placementdo.com to request a refund under this policy.",
    },
    {
      heading: "Intellectual property",
      body: "All content, features, and functionality of the Service — including but not limited to the AI models, scoring systems, persona designs, interview question generation logic, report formats, and visual design — are owned by or licensed to PlacementDo and are protected by copyright, trade secret, and other intellectual property laws. You may not copy, reproduce, distribute, or create derivative works from any part of the Service without our express written consent.",
    },
    {
      heading: "User-submitted content",
      body: "When you upload a CV or submit responses during interview practice sessions, you grant PlacementDo a limited, non-exclusive, royalty-free licence to process that content solely to provide you with the Service. We do not use your CV or interview responses for advertising, nor do we share them with third parties except as required to operate the Service (e.g., AI processing providers under confidentiality obligations). You retain ownership of all content you submit.",
    },
    {
      heading: "Disclaimer of warranties",
      body: "The Service is provided 'as is' and 'as available' without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, error-free, or free of viruses. We do not guarantee specific interview outcomes, job offers, or improvements in interview performance as a result of using PlacementDo. Interview preparation tools improve your readiness — real-world outcomes depend on many factors outside our control.",
    },
    {
      heading: "Limitation of liability",
      body: "To the maximum extent permitted by applicable law, PlacementDo and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits or data, arising from your use of or inability to use the Service. Our total liability to you for any claims arising from these Terms shall not exceed the amount you paid us in the 12 months preceding the claim.",
    },
    {
      heading: "Termination",
      body: "We reserve the right to suspend or terminate your access to the Service at any time, with or without cause, including if we reasonably believe you have violated these Terms. Upon termination, your right to use the Service will cease immediately. Sections of these Terms that by their nature should survive termination — including intellectual property, disclaimers, limitations of liability, and governing law — will continue to apply.",
    },
    {
      heading: "Governing law and disputes",
      body: "These Terms are governed by and construed in accordance with applicable law. Any disputes arising from these Terms or your use of the Service shall first be attempted to be resolved informally by contacting support@placementdo.com. If informal resolution is not possible, disputes shall be submitted to binding arbitration or the courts of competent jurisdiction, depending on applicable law in your jurisdiction.",
    },
    {
      heading: "Contact",
      body: "For questions, concerns, or legal notices regarding these Terms of Service, contact us at support@placementdo.com. We aim to respond to all formal inquiries within 10 business days. Our mailing address and registered details are available upon request for legal and compliance purposes.",
    },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      <section style={{ background: "var(--slate)", padding: "96px clamp(20px,5vw,60px) 56px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Tag color="teal"><FileText size={11} /> Terms of Service</Tag>
            <h1 className="brig" style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginTop: 14, lineHeight: 1.1, marginBottom: 14 }}>Terms of Service</h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>By using PlacementDo, you agree to these terms. Please read them carefully. Last updated: April 2026.</p>
          </motion.div>
        </div>
      </section>
      <section style={{ padding: "56px clamp(20px,5vw,60px) 80px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "grid", gap: 14 }}>
          {sections.map((item, i) => (
            <motion.section key={item.heading} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.04 }} viewport={{ once: true }} className="card" style={{ padding: "24px 28px" }}>
              <h2 className="brig" style={{ fontSize: 19, fontWeight: 700, color: "var(--slate)", marginBottom: 10, letterSpacing: "-0.01em" }}>{item.heading}</h2>
              <p style={{ fontSize: 14.5, color: "var(--slate-500)", lineHeight: 1.82, margin: 0 }}>{item.body}</p>
            </motion.section>
          ))}
        </div>
        <p style={{ marginTop: 24, fontSize: 13, color: "var(--slate-400)", textAlign: "center" }}>Questions about these terms? Email us at <strong style={{ color: "var(--slate-600)" }}>support@placementdo.com</strong></p>
      </section>
    </main>
  );
};

/* ── Root App ── */
const DASH_VIEWS = ["dashboard", "reports", "progress", "avatars", "settings", "support"];
const ROUTE_TO_PATH = {
  landing: "/",
  signin: "/signin",
  signup: "/signup",
  features: "/features",
  pricing: "/pricing",
  personas: "/personas",
  blog: "/blog",
  blogAdmin: "/blog/admin",
  about: "/about",
  careers: "/careers",
  privacy: "/privacy-policy",
  terms: "/terms-of-service",
  howItWorks: "/how-it-works",
  dashboard: "/dashboard",
  reports: "/reports",
  progress: "/progress",
  avatars: "/avatars",
  settings: "/settings",
  support: "/support",
  interview: "/interview",
  report: "/report",
};

const PATH_TO_ROUTE = Object.fromEntries(
  Object.entries(ROUTE_TO_PATH).map(([route, path]) => [path, route]),
);

const parseRouteFromPath = (pathname) => {
  const normalized = normalizePath(pathname);
  if (normalized === "/blog") return { route: "blog", slug: "" };
  if (normalized.startsWith("/blog/") && normalized !== "/blog/admin") {
    const slug = decodeURIComponent(normalized.replace("/blog/", "")).trim();
    if (slug) return { route: "blogPost", slug };
  }
  return { route: PATH_TO_ROUTE[normalized] || "landing", slug: "" };
};

const WEB_PAGE_SCHEMA_VIEWS = new Set([
  "landing",
  "signin",
  "signup",
  "features",
  "pricing",
  "personas",
  "blog",
  "blogPost",
  "about",
  "careers",
  "privacy",
  "terms",
  "howItWorks",
]);

const SEO_MAP = {
  landing: {
    title: "PlacementDo | AI Interview Practice Platform",
    description:
      "Practice realistic AI interviews tailored to your CV, target role, and company with detailed scoring, feedback, and multilingual support for faster offer wins.",
    type: "website",
    robots: "index, follow",
    breadcrumbName: "Home",
  },
  signin: {
    title: "Sign In | PlacementDo",
    description:
      "Sign in to PlacementDo to continue AI interview practice, review your latest reports, and keep improving your communication and technical interview performance.",
    type: "website",
    robots: "index, follow",
    breadcrumbName: "Sign In",
  },
  signup: {
    title: "Create Account | PlacementDo",
    description:
      "Create your PlacementDo account to start personalized AI mock interviews, practice company-specific scenarios, and build confidence before real interviews.",
    type: "website",
    robots: "index, follow",
    breadcrumbName: "Sign Up",
  },
  features: {
    title: "Features | PlacementDo",
    description:
      "Explore PlacementDo features including role-aware AI interviews, multilingual simulation, actionable scoring, and structured performance feedback.",
    type: "website",
    robots: "index, follow",
    breadcrumbName: "Features",
  },
  pricing: {
    title: "Pricing | PlacementDo",
    description:
      "View PlacementDo pricing plans and compare interview credits, report depth, persona access, and support options.",
    type: "website",
    robots: "index, follow",
    breadcrumbName: "Pricing",
  },
  personas: {
    title: "Personas | PlacementDo",
    description:
      "See PlacementDo interviewer personas designed to simulate different interview styles, pressure levels, and communication expectations.",
    type: "website",
    robots: "index, follow",
    breadcrumbName: "Personas",
  },
  blog: {
    title: "Blog | PlacementDo",
    description:
      "Read PlacementDo blog posts for interview preparation insights, product updates, and actionable strategies to improve your interview outcomes.",
    type: "website",
    robots: "index, follow",
    breadcrumbName: "Blog",
  },
  blogPost: {
    title: "Blog Post | PlacementDo",
    description:
      "Read detailed interview guidance and product updates from the PlacementDo blog.",
    type: "article",
    robots: "index, follow",
    breadcrumbName: "Blog Post",
  },
  blogAdmin: {
    title: "Blog Admin | PlacementDo",
    description:
      "Secure blog administration area for managing PlacementDo blog content.",
    type: "website",
    robots: "noindex, nofollow",
    breadcrumbName: "Blog Admin",
  },
  about: {
    title: "About | PlacementDo",
    description:
      "Learn about PlacementDo's mission to help candidates practice smarter and perform better in real interviews.",
    type: "website",
    robots: "index, follow",
    breadcrumbName: "About",
  },
  careers: {
    title: "Careers | PlacementDo",
    description:
      "Explore career opportunities and join the PlacementDo team building next-generation interview preparation technology.",
    type: "website",
    robots: "index, follow",
    breadcrumbName: "Careers",
  },
  privacy: {
    title: "Privacy Policy | PlacementDo",
    description:
      "Read PlacementDo's privacy policy to understand how we collect, process, and protect user information.",
    type: "website",
    robots: "index, follow",
    breadcrumbName: "Privacy Policy",
  },
  terms: {
    title: "Terms of Service | PlacementDo",
    description:
      "Review the terms of service for using PlacementDo products, services, and interview practice features.",
    type: "website",
    robots: "index, follow",
    breadcrumbName: "Terms of Service",
  },
  howItWorks: {
    title: "How It Works | PlacementDo",
    description:
      "See how PlacementDo personalizes AI mock interviews and delivers structured feedback to improve interview readiness.",
    type: "website",
    robots: "index, follow",
    breadcrumbName: "How it works",
  },
  dashboard: {
    title: "New Interview Session | PlacementDo",
    description:
      "Set up a new AI interview session by selecting company, role, focus area, and persona to practice realistic questions and improve your interview readiness.",
    type: "website",
    robots: "noindex, nofollow",
    breadcrumbName: "New Interview",
  },
  reports: {
    title: "My Reports | PlacementDo",
    description:
      "Review your interview reports, track score trends, compare sessions, and identify the exact communication and technical skills to improve next.",
    type: "website",
    robots: "noindex, nofollow",
    breadcrumbName: "My Reports",
  },
  progress: {
    title: "Progress Tracking | PlacementDo",
    description:
      "Track weekly and monthly interview progress with skill-level insights, score trends, and actionable coaching data to improve with consistency.",
    type: "website",
    robots: "noindex, nofollow",
    breadcrumbName: "Progress",
  },
  avatars: {
    title: "Interviewer Personas | PlacementDo",
    description:
      "Practice with distinct AI interviewer personas that simulate different interview styles, pressure levels, and behaviors to prepare for any panel.",
    type: "website",
    robots: "noindex, nofollow",
    breadcrumbName: "Interviewer Personas",
  },
  settings: {
    title: "Account Settings | PlacementDo",
    description:
      "Manage your profile, notification preferences, and plan details in PlacementDo settings to keep your interview practice workflow fully organized.",
    type: "website",
    robots: "noindex, nofollow",
    breadcrumbName: "Settings",
  },
  support: {
    title: "Help and Support | PlacementDo",
    description:
      "Get help with PlacementDo features, interview preparation guidance, and support resources to solve issues and maximize your practice outcomes.",
    type: "website",
    robots: "noindex, nofollow",
    breadcrumbName: "Support",
  },
  interview: {
    title: "Live Interview Room | PlacementDo",
    description:
      "Join a live AI interview room with timed questions, transcript cues, and focused practice controls to simulate high-pressure interview conditions.",
    type: "website",
    robots: "noindex, nofollow",
    breadcrumbName: "Interview Room",
  },
  report: {
    title: "Interview Analysis Report | PlacementDo",
    description:
      "View your AI interview analysis report with strengths, improvement areas, metric breakdowns, and practical next-step coaching recommendations.",
    type: "website",
    robots: "noindex, nofollow",
    breadcrumbName: "Interview Report",
  },
};

const SECTION_PAGE_CONTENT = {
  features: {
    title: "PlacementDo Features",
    description: "Core capabilities designed to make interview preparation realistic, personalized, and measurable.",
    sections: [
      { heading: "Role-aware simulation", body: "Practice interviews tailored to your target company, role, and level so each session mirrors real expectations." },
      { heading: "Multilingual support", body: "Run practice interviews in multiple languages to strengthen delivery, clarity, and confidence across global hiring contexts." },
      { heading: "Actionable reporting", body: "Receive structured scores, strengths, and improvement recommendations to focus your next preparation cycle." },
    ],
  },
  pricing: {
    title: "Pricing",
    description: "Choose a plan based on your interview goals, report depth, and persona access needs.",
    sections: [
      { heading: "Starter", body: "For early preparation and focused experimentation with core interview simulation workflows." },
      { heading: "Pro", body: "For candidates running consistent practice cycles with deeper reporting and broader persona coverage." },
      { heading: "Elite", body: "For intensive preparation with maximum interview volume, priority support, and complete persona access." },
    ],
  },
  personas: {
    title: "Interviewer Personas",
    description: "Practice with distinct interviewer styles so you are prepared for varied interview dynamics.",
    sections: [
      { heading: "Communication styles", body: "Simulate interviewer behavior ranging from supportive and collaborative to direct and high-pressure." },
      { heading: "Scenario diversity", body: "Train for coding, system design, behavioral, and mixed rounds with context-specific prompts." },
      { heading: "Adaptive challenge", body: "Increase complexity over time to build confidence for difficult follow-ups and edge-case questions." },
    ],
  },
  howItWorks: {
    title: "How PlacementDo Works",
    description: "PlacementDo guides you through interview setup, realistic simulation, and focused feedback.",
    sections: [
      { heading: "1. Configure practice context", body: "Select company, role, language, and interviewer persona to shape each session." },
      { heading: "2. Run realistic interviews", body: "Answer structured AI questions under time constraints similar to real interview pressure." },
      { heading: "3. Review and improve", body: "Get scoring, insights, and targeted recommendations to iterate quickly on weak areas." },
    ],
  },
  about: {
    title: "About PlacementDo",
    description: "PlacementDo helps candidates prepare for high-stakes interviews with realistic AI-driven practice sessions and structured feedback.",
    sections: [
      { heading: "Our mission", body: "We aim to make interview preparation more personalized, repeatable, and data-driven for every job seeker." },
      { heading: "What we build", body: "PlacementDo combines role-aware interview simulation, company context, and clear analytics to improve readiness with each session." },
    ],
  },
  careers: {
    title: "Careers at PlacementDo",
    description: "We are building thoughtful tools that help candidates unlock opportunities through better interview preparation.",
    sections: [
      { heading: "Join us", body: "We are hiring mission-driven builders across product, engineering, and growth. Share your profile at support@placementdo.com." },
      { heading: "How we work", body: "We value ownership, empathy for candidates, and practical execution that quickly improves real user outcomes." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    description: "This policy explains what information PlacementDo collects, how it is used, and how we protect user data.",
    sections: [
      { heading: "Information we collect", body: "We collect account details, usage activity, and interview session data required to provide and improve the service." },
      { heading: "How we use data", body: "Data is used to personalize interview experiences, generate reports, improve product quality, and support users." },
      { heading: "Your choices", body: "You can request data updates or deletion by contacting support. We process requests in line with applicable laws." },
    ],
  },
  terms: {
    title: "Terms of Service",
    description: "These terms govern your use of PlacementDo services, website, and related content.",
    sections: [
      { heading: "Use of service", body: "You agree to use PlacementDo lawfully and not misuse the platform or attempt unauthorized access." },
      { heading: "Content and availability", body: "Features may evolve over time; we may update or discontinue specific functionality with reasonable notice." },
      { heading: "Contact", body: "For questions about these terms, reach us at support@placementdo.com." },
    ],
  },
};
export default function App() {
  const [view, setView] = useState(() => parseRouteFromPath(window.location.pathname).route);
  const [blogSlug, setBlogSlug] = useState(() => parseRouteFromPath(window.location.pathname).slug);
  const [blogPostSeo, setBlogPostSeo] = useState({
    title: "",
    excerpt: "",
    publishedAt: "",
    updatedAt: "",
    author: "",
    image: "",
  });
  const [checkoutPlan, setCheckout] = useState(null);
  const [toast, setToast] = useState(null);

  const go = (v, options = {}) => {
    const nextSlug = typeof options.slug === "string" ? options.slug.trim() : "";
    setView(v);
    setBlogSlug(v === "blogPost" ? nextSlug : "");
    if (v !== "blogPost") {
      setBlogPostSeo({ title: "", excerpt: "", publishedAt: "", updatedAt: "", author: "", image: "" });
    }
    const nextPath = v === "blogPost" && nextSlug ? `/blog/${encodeURIComponent(nextSlug)}` : (ROUTE_TO_PATH[v] || "/");
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const isDash = DASH_VIEWS.includes(view);

  const openCheckout = plan => setCheckout(plan);
  const closeCheckout = () => setCheckout(null);
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 4500); };

  const [selectedPersona, setSelectedPersona] = useState(PERSONAS[0]);

  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRouteFromPath(window.location.pathname);
      setView(parsed.route);
      setBlogSlug(parsed.slug);
      if (parsed.route !== "blogPost") {
        setBlogPostSeo({ title: "", excerpt: "", publishedAt: "", updatedAt: "", author: "", image: "" });
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const seo = view === "blogPost" && blogPostSeo.title
      ? {
        ...SEO_MAP.blogPost,
        title: `${blogPostSeo.title} | PlacementDo`,
        description: blogPostSeo.excerpt || SEO_MAP.blogPost.description,
      }
      : (SEO_MAP[view] || SEO_MAP.landing);
    const origin = window.location.origin;
    const path = view === "blogPost" && blogSlug ? `/blog/${encodeURIComponent(blogSlug)}` : (ROUTE_TO_PATH[view] || "/");
    const canonicalUrl = `${origin}${path}`;
    const fallbackImageUrl = `${origin}${DEFAULT_OG_IMAGE}`;
    const imageUrl = blogPostSeo.image || fallbackImageUrl;
    const imageType = getImageMimeType(imageUrl);

    document.title = seo.title;

    const upsertMeta = (selector, attrs) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([k, val]) => el.setAttribute(k, val));
    };

    const upsertLink = (selector, attrs) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("link");
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([k, val]) => el.setAttribute(k, val));
    };

    const upsertBaseMeta = (name, content) => {
      let el = document.head.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    upsertMeta('meta[name="description"]', { name: "description", content: seo.description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: seo.robots || "index, follow" });
    upsertBaseMeta("theme-color", "#0D9488");
    upsertBaseMeta("author", "PlacementDo");
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });

    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "PlacementDo" });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_US" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: seo.description });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    upsertMeta('meta[property="og:image:width"]', { property: "og:image:width", content: "1200" });
    upsertMeta('meta[property="og:image:height"]', { property: "og:image:height", content: "630" });
    upsertMeta('meta[property="og:image:type"]', { property: "og:image:type", content: imageType });
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: "PlacementDo AI interview practice platform preview" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: seo.type });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:site"]', { name: "twitter:site", content: "@placementdo" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
    upsertMeta('meta[name="twitter:url"]', { name: "twitter:url", content: canonicalUrl });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });
    upsertMeta('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: "PlacementDo AI interview practice platform preview" });
    upsertMeta('meta[name="twitter:creator"]', { name: "twitter:creator", content: "@placementdo" });

    upsertLink('link[rel="alternate"][hreflang="en"]', {
      rel: "alternate",
      hreflang: "en",
      href: canonicalUrl,
    });
    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: "alternate",
      hreflang: "x-default",
      href: canonicalUrl,
    });

    const scripts = Array.from(document.querySelectorAll("script[data-seo-schema='true']"));
    scripts.forEach((script) => script.remove());

    const appendSchema = (schemaObject, id) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-schema", "true");
      script.setAttribute("data-seo-schema-id", id);
      script.textContent = JSON.stringify(schemaObject);
      document.head.appendChild(script);
    };

    if (view === "landing") {
      appendSchema(
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "PlacementDo",
          url: origin,
          logo: imageUrl,
        },
        "organization",
      );
      appendSchema(
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "PlacementDo",
          url: origin,
          potentialAction: {
            "@type": "SearchAction",
            target: `${origin}/?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
        "website",
      );
    }

    appendSchema(
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${origin}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: seo.breadcrumbName,
            item: canonicalUrl,
          },
        ],
      },
      "breadcrumb",
    );

    if (WEB_PAGE_SCHEMA_VIEWS.has(view)) {
      appendSchema(
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: seo.title,
          description: seo.description,
          url: canonicalUrl,
          inLanguage: "en",
          isPartOf: {
            "@type": "WebSite",
            name: "PlacementDo",
            url: origin,
          },
        },
        "webpage",
      );
    }

    if (view === "landing") {
      appendSchema(
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "PlacementDo",
          applicationCategory: "EducationApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "INR",
          },
          url: canonicalUrl,
          description: seo.description,
        },
        "software-application",
      );
    }

    if (view === "blogPost" && blogPostSeo.title) {
      appendSchema(
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: blogPostSeo.title,
          description: blogPostSeo.excerpt || seo.description,
          image: imageUrl,
          mainEntityOfPage: canonicalUrl,
          ...(blogPostSeo.publishedAt ? { datePublished: blogPostSeo.publishedAt } : {}),
          ...(blogPostSeo.updatedAt || blogPostSeo.publishedAt
            ? { dateModified: blogPostSeo.updatedAt || blogPostSeo.publishedAt }
            : {}),
          author: {
            "@type": "Person",
            name: blogPostSeo.author || "PlacementDo Team",
          },
          publisher: {
            "@type": "Organization",
            name: "PlacementDo",
            logo: {
              "@type": "ImageObject",
              url: `${origin}/apple-touch-icon.png`,
            },
          },
        },
        "article",
      );
    }
  }, [view, blogSlug, blogPostSeo]);

  const renderView = () => {
    if (view === "landing") return <Landing onNav={go} onCheckout={openCheckout} />;
    if (view === "signin") return <SignIn onNav={go} />;
    if (view === "signup") return <SignUp onNav={go} />;
    if (view === "blog") return <BlogList onNav={go} />;
    if (view === "blogPost") return <BlogPost slug={blogSlug} onNav={go} onPostLoaded={setBlogPostSeo} />;
    if (view === "blogAdmin") return <BlogAdmin onNav={go} />;
    if (view === "features") return <FeaturesPage onNav={go} />;
    if (view === "pricing") return <PricingPage onNav={go} onCheckout={openCheckout} />;
    if (view === "personas") return <PersonasPage onNav={go} />;
    if (view === "howItWorks") return <HowItWorksPage onNav={go} />;
    if (view === "about") return <AboutPage onNav={go} />;
    if (view === "careers") return <CareersPage />;
    if (view === "privacy") return <PrivacyPage />;
    if (view === "terms") return <TermsPage />;
    if (view === "interview") return <InterviewRoom onNav={go} persona={selectedPersona} />;
    if (view === "report") return <Report onNav={go} />;
    if (isDash) {
      const inner =
        view === "dashboard" ? <NewInterview onNav={go} onUpgrade={openCheckout} onSelectPersona={setSelectedPersona} showToast={showToast} /> :
          view === "reports" ? <MyReports onNav={go} /> :
            view === "progress" ? <Progress /> :
              view === "avatars" ? <AvatarsView onUpgrade={openCheckout} onNav={go} onSelectPersona={setSelectedPersona} /> :
                view === "support" ? <SupportView /> :
                  <SettingsView onUpgrade={openCheckout} />;
      return (
        <DashboardShell activeTab={view} onNav={go} onUpgrade={openCheckout}>
          {inner}
        </DashboardShell>
      );
    }
    return null;
  };

  return (
    <>
      <G />
      <a className="skip-link" href="#main-content">Skip to main content</a>
      {view !== "interview" && <Navbar view={view} onNav={go} />}
      <AnimatePresence mode="wait">
        <motion.main id="main-content" tabIndex={-1} key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
          {renderView()}
        </motion.main>
      </AnimatePresence>
      <AnimatePresence>
        {checkoutPlan && <CheckoutModal plan={checkoutPlan} onClose={closeCheckout} />}
      </AnimatePresence>
      <AnimatePresence>
        {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
      </AnimatePresence>
    </>
  );
}
