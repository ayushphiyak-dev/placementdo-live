import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, Building2, Video, Mic, MicOff, VideoOff, PhoneOff,
  Check, Zap, BarChart2, Brain, RefreshCw, Shield, Award,
  TrendingUp, FileText, Sparkles, Settings, ArrowUpRight,
  LayoutDashboard, Globe, ChevronRight, AlertCircle,
  Mail, Bell, LogIn, Lock, Target, CheckCircle2,
  CreditCard, Palette, Menu, X, AlertTriangle, UserCircle,
  Star, MessageSquare, HelpCircle, Flame, Pencil,
  ChevronDown, ChevronUp, Calendar, Hash, Bookmark,
  LifeBuoy, Send, Bot
} from "lucide-react";

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #FAFAF8; color: #0F172A; font-family: 'DM Sans', system-ui, sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
    :root {
      --teal: #0D9488; --teal-light: #CCFBF1; --teal-mid: #14B8A6; --teal-dark: #0F766E;
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
    .nav-link { font-size: 14px; font-weight: 500; color: var(--slate-500); padding: 6px 13px; border-radius: 8px; cursor: pointer; border: none; background: transparent; transition: color 0.18s, background 0.18s, transform 0.15s; white-space: nowrap; font-family: 'DM Sans',sans-serif; user-select: none; }
    .nav-link:hover { color: var(--slate); background: var(--slate-100); transform: translateY(-1px); }

    /* Sidebar */
    .sidebar-item { display: flex; align-items: center; gap: 10px; padding: 9px 13px; border-radius: 10px; font-size: 14px; font-weight: 500; color: var(--slate-500); cursor: pointer; transition: all 0.18s; border: none; background: transparent; width: 100%; font-family: 'DM Sans',sans-serif; text-align: left; }
    .sidebar-item:hover { background: var(--slate-100); color: var(--slate); transform: translateX(2px); }
    .sidebar-item.active { background: var(--teal-light); color: var(--teal-dark); font-weight: 600; }
    .sidebar-item.active:hover { transform: none; }

    /* Feature cards — auto-fill equal-height grid adapts to any viewport */
    .feature-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(min(290px,100%),1fr)); gap: 20px; align-items: stretch; }
    .feature-card { padding: 28px; border-radius: 16px; border: 1.5px solid var(--border); background: var(--ivory); transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s, background 0.25s; display: flex; flex-direction: column; height: 100%; }
    .feature-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); background: var(--white); border-color: var(--border-strong); }
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
    .hero-pad { padding: clamp(80px,12vh,120px) clamp(20px,5vw,60px) clamp(48px,8vh,80px); }
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
      /* Slim topbar to 48px, hide logo text + persona pill + Q dots */
      .int-topbar { height: 48px; padding: 0 12px; gap: 8px; }
      .int-topbar-logo { display: none; }
      .int-topbar-persona { display: none; }
      .int-topbar-qprog { display: none; }
      .int-topbar-timer { padding: 4px 10px; }

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
    }
    @media (max-width: 480px) {
      .wl-row { flex-direction: column; }
      .wl-row button { width: 100%; justify-content: center; }
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
    .footer-grid { display:grid; grid-template-columns:2fr repeat(3,1fr); gap:clamp(28px,4vw,48px); padding:clamp(40px,8vh,64px) clamp(20px,5vw,60px) 40px; max-width:1200px; margin:0 auto; }
    .footer-link { font-size:13.5px; color:rgba(255,255,255,.45); background:none; border:none; cursor:pointer; padding:5px 0; display:block; text-align:left; font-family:'DM Sans',sans-serif; transition:color 0.18s; width:fit-content; }
    .footer-link:hover { color:rgba(255,255,255,.85); }
    .footer-social { width:36px; height:36px; border-radius:9px; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); display:inline-flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.2s; color:rgba(255,255,255,.5); }
    .footer-social:hover { background:rgba(13,148,136,.25); border-color:rgba(13,148,136,.5); color:var(--teal-mid); transform:translateY(-2px); }
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
    .code-panel-grid { display:grid; grid-template-columns:clamp(260px,30%,340px) 1fr; flex:1; min-height:0; overflow:hidden; }
    @media(max-width:768px){ .code-panel-grid { grid-template-columns:1fr; grid-template-rows:auto 1fr; } }

    /* ── Monthly progress bar chart ── */
    .mth-bar { flex:1; display:flex; flex-direction:column; align-items:center; gap:6px; cursor:default; }
    .mth-bar:hover .mth-fill { filter:brightness(1.12); }
    .mth-fill { width:100%; border-radius:6px; transition:filter 0.2s; }
  `}</style>
);

const COMPANIES = [
  { name:"Google",    abbr:"G",  bg:"#E8F0FE", fg:"#1A73E8" },
  { name:"Amazon",    abbr:"A",  bg:"#FFF3E0", fg:"#FF9900" },
  { name:"Apple",     abbr:"⌂",  bg:"#F5F5F7", fg:"#1D1D1F" },
  { name:"Microsoft", abbr:"Ms", bg:"#E8F4FD", fg:"#00BCF2" },
  { name:"Meta",      abbr:"M",  bg:"#E7F3FF", fg:"#0081FB" },
  { name:"Deloitte",  abbr:"D",  bg:"#F1F9E8", fg:"#86BC25" },
  { name:"McKinsey",  abbr:"Mc", bg:"#E8EAF6", fg:"#1A237E" },
  { name:"Goldman",   abbr:"GS", bg:"#E8F0F9", fg:"#1E5799" },
  { name:"Stripe",    abbr:"S",  bg:"#F0EEFF", fg:"#635BFF" },
  { name:"Airbnb",    abbr:"Ai", bg:"#FFF0F0", fg:"#FF5A5F" },
  { name:"Netflix",   abbr:"N",  bg:"#FFF0F0", fg:"#E50914" },
  { name:"Spotify",   abbr:"Sp", bg:"#EDFAEE", fg:"#1DB954" },
];

const PERSONAS = [
  {
    id:1, tier:"starter",
    title:"The Friendly Peer",
    emoji:"😄",
    handle:"@jordan",
    vibe:"A young, upbeat interviewer who treats it like a casual coffee chat — dangerously easy to overshare with.",
    style:"Conversational · Disarmingly warm",
    difficulty:"Deceptive",
    diffColor:"var(--amber)",
    diffBg:"var(--amber-light)",
    accentColor:"#D97706",
    gradientFrom:"#FEF3C7",
    gradientTo:"#FDE68A",
    traits:["Casual language","Encourages tangents","Rewards self-awareness"],
  },
  {
    id:2, tier:"pro",
    title:"The Empathetic Listener",
    emoji:"🌸",
    handle:"@maya",
    vibe:"Soft-spoken and patient, she gives you all the space in the world — then quietly dismantles your emotional intelligence.",
    style:"Reflective · Deep EQ probing",
    difficulty:"Medium",
    diffColor:"#0369A1",
    diffBg:"#E0F2FE",
    accentColor:"#0369A1",
    gradientFrom:"#E0F2FE",
    gradientTo:"#BAE6FD",
    traits:["Long silences","Values nuance","Probes self-awareness"],
  },
  {
    id:3, tier:"pro",
    title:"The Stress-Tester",
    emoji:"⚡",
    handle:"@rex",
    vibe:"Rapid-fire questions, intentional interruptions, and barely-concealed skepticism — engineered to make you crack.",
    style:"Aggressive · High-velocity",
    difficulty:"Brutal",
    diffColor:"var(--red)",
    diffBg:"var(--red-light)",
    accentColor:"#DC2626",
    gradientFrom:"#FEE2E2",
    gradientTo:"#FECACA",
    traits:["Interrupts mid-answer","Challenges every claim","Zero encouragement"],
  },
  {
    id:4, tier:"elite",
    title:"The Stoic Veteran",
    emoji:"🗿",
    handle:"@harold",
    vibe:"Decades of experience, a face carved from stone, and a silence after your answer that lasts exactly three beats too long.",
    style:"Expressionless · Unreadable",
    difficulty:"Psychological",
    diffColor:"var(--slate-600)",
    diffBg:"var(--slate-100)",
    accentColor:"#475569",
    gradientFrom:"#F1F5F9",
    gradientTo:"#E2E8F0",
    traits:["Zero facial feedback","Minimal follow-ups","Tests composure"],
  },
  {
    id:5, tier:"elite",
    title:"The Devil's Advocate",
    emoji:"🎭",
    handle:"@victor",
    vibe:"Disagrees with everything you say on principle — forcing you to defend your reasoning under sustained intellectual pressure.",
    style:"Contrarian · Logic-stress",
    difficulty:"Hard",
    diffColor:"var(--purple)",
    diffBg:"var(--purple-light)",
    accentColor:"#7C3AED",
    gradientFrom:"#EDE9FE",
    gradientTo:"#DDD6FE",
    traits:["Rejects first answers","Demands quantified claims","Probes edge cases"],
  },
  {
    id:6, tier:"elite",
    title:"The Silent Analyst",
    emoji:"🔍",
    handle:"@dr_chen",
    vibe:"Types notes constantly, asks one forensic question at a time, and lets silence do most of the heavy lifting.",
    style:"Clinical · Methodical",
    difficulty:"Hard",
    diffColor:"var(--green)",
    diffBg:"var(--green-light)",
    accentColor:"#16A34A",
    gradientFrom:"#DCFCE7",
    gradientTo:"#BBF7D0",
    traits:["Hyper-specific questions","Laser focus on inconsistencies","Values precision"],
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
  { name:"Starter", price:"$1",     old:null,   hi:false, tagline:"Try it risk-free",        features:["1 Full Interview","1 Detailed Report","Any language","Any field or company","Standard scoring","Choose ANY 1 Interviewer Persona"] },
  { name:"Pro",     price:"$39.99", old:"$50",  hi:true,  tagline:"Most popular · Save 20%", features:["40 Interviews","40 Full Reports","AI Assistance Mode","Multi-language support","10 Report rechecks","Choose ANY 3 Interviewer Personas"] },
  { name:"Elite",   price:"$89.99", old:"$120", hi:false, tagline:"Best value · Save 25%",   features:["100 Interviews","100 Full Reports","AI Assistance Mode","All 28 languages","30 Report rechecks","Access to ALL Interviewer Personas","Priority support"] },
];

/* ── Atoms ── */
const Logo = ({ onClick, light=false }) => (
  <button onClick={onClick} style={{ display:"flex", alignItems:"center", gap:9, background:"none", border:"none", cursor:"pointer", padding:0, flexShrink:0 }}>
    <div style={{ width:34, height:34, borderRadius:10, background:"var(--teal)", display:"flex", alignItems:"center", justifyContent:"center", transition:"transform 0.2s, box-shadow 0.2s" }}
      onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.08)"; e.currentTarget.style.boxShadow="var(--shadow-teal)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
      <Zap size={18} color="#fff" strokeWidth={2.5}/>
    </div>
    <span className="brig" style={{ fontSize:19, fontWeight:700, color: light ? "#ffffff" : "var(--slate)", letterSpacing:"-0.02em", whiteSpace:"nowrap" }}>
      Placement<span style={{ color: light ? "var(--teal-mid)" : "var(--teal)" }}>Do</span>
    </span>
  </button>
);

const Tag = ({ children, color="teal", size="sm" }) => {
  const P = { teal:{bg:"var(--teal-light)",color:"var(--teal-dark)"}, amber:{bg:"var(--amber-light)",color:"var(--amber)"}, green:{bg:"var(--green-light)",color:"var(--green)"}, red:{bg:"var(--red-light)",color:"var(--red)"}, slate:{bg:"var(--slate-100)",color:"var(--slate-700)"}, purple:{bg:"var(--purple-light)",color:"var(--purple)"} };
  const p = P[color] || P.teal;
  return <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:p.bg, color:p.color, fontSize:size==="xs"?11:12, fontWeight:600, padding:size==="xs"?"3px 9px":"4px 12px", borderRadius:20, letterSpacing:"0.02em", whiteSpace:"nowrap" }}>{children}</span>;
};

const MetricBar = ({ label, value, color, delay=0 }) => (
  <div style={{ marginBottom:16 }}>
    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
      <span style={{ fontSize:13.5, color:"var(--slate-700)", fontWeight:500 }}>{label}</span>
      <span className="brig" style={{ fontSize:13, fontWeight:700, color }}>{value}</span>
    </div>
    <div style={{ height:6, background:"var(--slate-100)", borderRadius:4, overflow:"hidden" }}>
      <motion.div initial={{ width:0 }} animate={{ width:`${value}%` }} transition={{ duration:1.2, ease:[0.25,1,0.5,1], delay }} style={{ height:"100%", background:color, borderRadius:4 }}/>
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
        style={{ position:"absolute", top:14, right:14, background:"none", border:"none", cursor:"pointer", color:"var(--slate-400)", padding:6, borderRadius:8, display:"flex", transition:"color 0.15s" }}
        onMouseEnter={e => e.currentTarget.style.color = "var(--slate-600)"}
        onMouseLeave={e => e.currentTarget.style.color = "var(--slate-400)"}
      >
        <X size={18}/>
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
        <Check size={32} color="#fff" strokeWidth={3}/>
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
const WAITLIST_API_URL =
  "https://script.google.com/macros/s/AKfycbz4rHlYQhyopUDpwLGOzdesm6ZfkDgQFFEroZiyUJ_nK7BG-UGX4JUWqVOojXK1QGOJ/exec";

const WaitlistForm = ({ size="lg", dark=false }) => {
  const [email,          setEmail]          = useState("");
  const [errMsg,         setErrMsg]         = useState("");
  const [submitted,      setSubmitted]      = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [loading,        setLoading]        = useState(false);

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
    const params = new URLSearchParams({ email: captured, source: "placementdo-live" });
    console.log("Waitlist: submitting for", captured.replace(/(?<=.{2}).(?=.*@)/g, "*"));
    let sent = false;
    try {
      // POST with URL-encoded body — a "simple request" (no CORS preflight).
      // Apps Script doPost reads the values via e.parameter.email / e.parameter.source.
      await fetch(WAITLIST_API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: params,
      });
      // no-cors → response is opaque; assume success if fetch completes without throwing.
      sent = true;
    } catch (postErr) {
      console.warn("Waitlist POST failed, trying GET fallback:", postErr);
      try {
        // GET fallback — Apps Script doGet reads via e.parameter as well.
        await fetch(
          `${WAITLIST_API_URL}?email=${encodeURIComponent(captured)}&source=${encodeURIComponent("placementdo-live")}`,
          { method: "GET", mode: "no-cors" }
        );
        sent = true;
      } catch (getErr) {
        console.error("Waitlist GET fallback also failed:", getErr);
      }
    }
    if (sent) {
      setSubmittedEmail(captured);
      setEmail("");
      setSubmitted(true);
    } else {
      setErrMsg("⚠️ Something went wrong. Please try again in a moment.");
    }
    setLoading(false);
  };

  const handleClose = () => { setSubmitted(false); setSubmittedEmail(""); };

  return (
    <>
      <AnimatePresence>
        {submitted && <WaitlistThanksModal key="thanks-modal" email={submittedEmail} onClose={handleClose}/>}
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
  const [step, setStep]       = useState("redirect");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry]   = useState("");
  const [cvc, setCvc]         = useState("");
  const [email, setEmail]     = useState("");
  const [errors, setErrors]   = useState({});
  const [paying, setPaying]   = useState(false);
  const [paid, setPaid]       = useState(false);
  const cardInputRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setStep("form"), 1800); return () => clearTimeout(t); }, []);

  const PX = { Starter: "$1.00", Pro: "$39.99", Elite: "$89.99" };
  const PLAN_DETAILS = {
    Starter: { sessions:"1 Interview",    features:["1 Full Report","Any language","Any company","Standard scoring"] },
    Pro:     { sessions:"40 Interviews",  features:["40 Full Reports","AI Assistance Mode","10 Report rechecks","3 Interviewer Personas"] },
    Elite:   { sessions:"100 Interviews", features:["100 Full Reports","AI Assistance Mode","30 Report rechecks","All 6 Personas","Priority support"] },
  };
  const pd = PLAN_DETAILS[plan] || PLAN_DETAILS.Pro;

  const getCardBrand = num => {
    const n = num.replace(/\s/g,"");
    if (/^4/.test(n)) return "visa";
    if (/^5[1-5]/.test(n)) return "mc";
    return null;
  };
  const brand = getCardBrand(cardNum);

  const formatCard   = v => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const formatExpiry = v => { const d=v.replace(/\D/g,"").slice(0,4); return d.length>=3?d.slice(0,2)+" / "+d.slice(2):d; };

  const validate = () => {
    const e = {};
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Valid email required";
    if (cardNum.replace(/\s/g,"").length < 16) e.card = "Enter full 16-digit card number";
    if (expiry.replace(/\D/g,"").length < 4)   e.expiry = "Enter MM / YY";
    if (cvc.replace(/\D/g,"").length < 3)      e.cvc = "3-digit CVC required";
    return e;
  };

  const handlePay = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setPaying(true);
    setTimeout(() => { setPaying(false); setPaid(true); setTimeout(onClose, 2400); }, 1600);
  };

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      style={{ position:"fixed", inset:0, background:"rgba(15,23,42,0.65)", backdropFilter:"blur(10px)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}
      onClick={e => e.target===e.currentTarget && onClose()}>
      <motion.div initial={{ opacity:0, scale:0.92, y:28 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.92, y:20 }} transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}
        style={{ background:"var(--white)", borderRadius:24, maxWidth:520, width:"100%", boxShadow:"0 40px 100px rgba(15,23,42,.3)", position:"relative", maxHeight:"92vh", overflowY:"auto" }}>

        {/* Close button */}
        <button onClick={onClose} style={{ position:"absolute", top:16, right:16, width:32, height:32, borderRadius:"50%", border:"1px solid var(--border)", background:"var(--slate-50)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--slate-500)", zIndex:10, transition:"all 0.2s" }}
          onMouseEnter={e=>{ e.currentTarget.style.background="var(--slate-100)"; e.currentTarget.style.transform="scale(1.1)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background="var(--slate-50)"; e.currentTarget.style.transform=""; }}>
          <X size={14}/>
        </button>

        <AnimatePresence mode="wait">

          {/* ── Redirect step ── */}
          {step==="redirect" && (
            <motion.div key="r" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0, y:-10 }}
              style={{ textAlign:"center", padding:"56px 40px 48px" }}>
              <div style={{ width:72, height:72, borderRadius:20, background:"var(--teal-light)", border:"1px solid rgba(13,148,136,.25)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>
                <span className="spin"><RefreshCw size={32} style={{ color:"var(--teal)" }}/></span>
              </div>
              <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)", letterSpacing:"-0.02em", marginBottom:10 }}>Preparing secure checkout…</h2>
              <p style={{ fontSize:14, color:"var(--slate-500)", lineHeight:1.65, marginBottom:24 }}>
                Setting up checkout for the <strong style={{ color:"var(--slate)" }}>{plan} Plan</strong>.<br/>Protected with 256-bit SSL encryption.
              </p>
              <div style={{ display:"flex", justifyContent:"center", gap:8 }}>
                {[0,.2,.4].map((d,i)=><div key={i} style={{ width:8, height:8, borderRadius:"50%", background:"var(--teal)", animation:`dot-pulse 1.4s ease-in-out ${d}s infinite` }}/>)}
              </div>
            </motion.div>
          )}

          {/* ── Payment form ── */}
          {step==="form" && !paid && (
            <motion.div key="f" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.32 }}>
              {/* Header */}
              <div style={{ padding:"24px 28px 20px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:44, height:44, borderRadius:12, background:"var(--teal-light)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <CreditCard size={20} style={{ color:"var(--teal)" }}/>
                </div>
                <div style={{ flex:1 }}>
                  <div className="brig" style={{ fontSize:17, fontWeight:700, color:"var(--slate)" }}>Secure Checkout</div>
                  <div style={{ fontSize:12, color:"var(--slate-400)", marginTop:2 }}>🔒 Powered by Stripe · 256-bit SSL</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div className="brig" style={{ fontSize:26, fontWeight:800, color:"var(--slate)", letterSpacing:"-0.03em" }}>{PX[plan]}</div>
                  <div style={{ fontSize:11, color:"var(--slate-400)", marginTop:1 }}>One-time · No auto-renew</div>
                </div>
              </div>

              <div style={{ padding:"22px 28px 28px", display:"flex", flexDirection:"column", gap:16 }}>
                {/* Plan summary */}
                <div style={{ background:"linear-gradient(135deg,var(--teal-light),rgba(204,251,241,.3))", border:"1.5px solid rgba(13,148,136,.25)", borderRadius:14, padding:"14px 18px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <div>
                      <div className="brig" style={{ fontSize:14, fontWeight:700, color:"var(--slate)" }}>PlacementDo {plan}</div>
                      <div style={{ fontSize:12, color:"var(--teal-dark)", fontWeight:600, marginTop:1 }}>{pd.sessions}</div>
                    </div>
                    <div className="brig" style={{ fontSize:20, fontWeight:800, color:"var(--teal-dark)" }}>{PX[plan]}</div>
                  </div>
                  <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                    {pd.features.map(f=>(
                      <div key={f} style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, color:"var(--teal-dark)", background:"rgba(255,255,255,.65)", padding:"2px 8px", borderRadius:20, fontWeight:500 }}>
                        <Check size={9} strokeWidth={3} style={{ color:"var(--teal)" }}/> {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label>Email Address</label>
                  <input type="email" value={email} onChange={e=>{ setEmail(e.target.value); setErrors(v=>({...v,email:""})); }} placeholder="you@example.com"
                    style={{ border:errors.email?"1.5px solid var(--red)":undefined }}/>
                  {errors.email && <div style={{ fontSize:11.5, color:"var(--red)", marginTop:5, display:"flex", alignItems:"center", gap:4 }}><AlertTriangle size={11}/> {errors.email}</div>}
                </div>

                {/* Card number */}
                <div>
                  <label>Card Number</label>
                  <div style={{ position:"relative" }}>
                    <input
                      ref={cardInputRef}
                      value={cardNum}
                      onChange={e => {
                        const raw = e.target.value.replace(/\D/g,"").slice(0,16);
                        const formatted = raw.replace(/(.{4})/g,"$1 ").trim();
                        const cursorPos = e.target.selectionStart;
                        const prevLen = e.target.value.length;
                        setCardNum(formatted);
                        setErrors(v=>({...v,card:""}));
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
                      style={{ paddingRight:72, fontFamily:"'JetBrains Mono',monospace", letterSpacing:"0.06em", border:errors.card?"1.5px solid var(--red)":undefined }}/>
                    {/* Card brand icons */}
                    <div style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", display:"flex", gap:5, alignItems:"center" }}>
                      <div style={{ width:34, height:22, borderRadius:5, background:brand==="visa"?"#1A1F71":"var(--slate-100)", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", opacity:brand&&brand!=="visa"?0.3:1 }}>
                        <span style={{ fontSize:8, fontWeight:900, color:brand==="visa"?"#fff":"var(--slate-400)", letterSpacing:"0.04em" }}>VISA</span>
                      </div>
                      <div style={{ width:34, height:22, borderRadius:5, display:"flex", alignItems:"center", justifyContent:"center", gap:0, transition:"all 0.2s", opacity:brand&&brand!=="mc"?0.3:1 }}>
                        <div style={{ width:14, height:14, borderRadius:"50%", background:brand==="mc"?"#EB001B":"var(--slate-300)" }}/>
                        <div style={{ width:14, height:14, borderRadius:"50%", background:brand==="mc"?"#F79E1B":"var(--slate-200)", marginLeft:-6 }}/>
                      </div>
                    </div>
                  </div>
                  {errors.card && <div style={{ fontSize:11.5, color:"var(--red)", marginTop:5, display:"flex", alignItems:"center", gap:4 }}><AlertTriangle size={11}/> {errors.card}</div>}
                </div>

                {/* Expiry + CVC */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  <div>
                    <label>Expiry</label>
                    <input
                      value={expiry}
                      onChange={e => {
                        const raw = e.target.value.replace(/\D/g,"").slice(0,4);
                        const formatted = raw.length >= 3 ? raw.slice(0,2) + " / " + raw.slice(2) : raw;
                        setExpiry(formatted);
                        setErrors(v=>({...v,expiry:""}));
                      }}
                      placeholder="MM / YY"
                      style={{ border:errors.expiry?"1.5px solid var(--red)":undefined }}/>
                    {errors.expiry && <div style={{ fontSize:11.5, color:"var(--red)", marginTop:5, display:"flex", alignItems:"center", gap:4 }}><AlertTriangle size={11}/> {errors.expiry}</div>}
                  </div>
                  <div>
                    <label>CVC / CVV</label>
                    <input value={cvc} onChange={e=>{ setCvc(e.target.value.replace(/\D/g,"").slice(0,4)); setErrors(v=>({...v,cvc:""})); }} placeholder="•••" type="password"
                      style={{ border:errors.cvc?"1.5px solid var(--red)":undefined }}/>
                    {errors.cvc && <div style={{ fontSize:11.5, color:"var(--red)", marginTop:5, display:"flex", alignItems:"center", gap:4 }}><AlertTriangle size={11}/> {errors.cvc}</div>}
                  </div>
                </div>

                {/* Pay button */}
                <button className="btn-primary" onClick={handlePay} disabled={paying}
                  style={{ width:"100%", justifyContent:"center", fontSize:15, padding:"15px", borderRadius:13, marginTop:4 }}>
                  {paying ? <><span className="spin"><RefreshCw size={16}/></span> Processing…</> : <><Check size={16}/> Pay {PX[plan]} · Complete Purchase</>}
                </button>

                {/* Trust bar */}
                <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:18, flexWrap:"wrap" }}>
                  {[{ icon:"🔒", text:"SSL Encrypted" }, { icon:"⚡", text:"Powered by Stripe" }, { icon:"🧪", text:"Prototype — no charge" }].map(({ icon, text })=>(
                    <div key={text} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11.5, color:"var(--slate-400)" }}><span>{icon}</span> {text}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Success state ── */}
          {paid && (
            <motion.div key="success" initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
              style={{ textAlign:"center", padding:"56px 40px 48px" }}>
              <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring", stiffness:280, damping:18, delay:0.1 }}
                style={{ width:72, height:72, borderRadius:"50%", background:"var(--green-light)", border:"2px solid var(--green)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", boxShadow:"0 8px 24px rgba(22,163,74,.25)" }}>
                <Check size={32} style={{ color:"var(--green)" }} strokeWidth={2.5}/>
              </motion.div>
              <h2 className="brig" style={{ fontSize:24, fontWeight:700, color:"var(--slate)", letterSpacing:"-0.02em", marginBottom:10 }}>Payment Successful! 🎉</h2>
              <p style={{ fontSize:14.5, color:"var(--slate-500)", lineHeight:1.65 }}>
                Your <strong style={{ color:"var(--slate)" }}>{plan} Plan</strong> is active.<br/>Check your email for your receipt.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/* ── Toast ── */
const Toast = ({ message, onDismiss }) => (
  <motion.div initial={{ opacity:0, y:56, scale:0.92 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:28, scale:0.95 }} transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}
    style={{ position:"fixed", bottom:28, left:"50%", transform:"translateX(-50%)", zIndex:998, background:"var(--slate)", color:"#fff", borderRadius:14, padding:"14px 20px", display:"flex", alignItems:"center", gap:12, boxShadow:"0 16px 48px rgba(15,23,42,.3)", maxWidth:480, width:"calc(100vw - 40px)" }}>
    <div style={{ width:32, height:32, borderRadius:"50%", background:"rgba(13,148,136,.25)", border:"1px solid rgba(13,148,136,.4)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
      <Zap size={15} style={{ color:"var(--teal-mid)" }}/>
    </div>
    <span style={{ fontSize:13.5, fontWeight:500, lineHeight:1.5, flex:1 }}>{message}</span>
    <button onClick={onDismiss} style={{ width:26, height:26, borderRadius:"50%", border:"none", background:"rgba(255,255,255,.1)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,.55)", transition:"background 0.15s" }}
      onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.2)"}
      onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.1)"}><X size={12}/></button>
  </motion.div>
);

/* ── Navbar ── */
const Navbar = ({ view, onNav }) => {
  const [solid, setSolid] = useState(false);
  const [mob, setMob] = useState(false);
  const isLanding = view==="landing";
  const isDash = ["dashboard","reports","progress","avatars","settings"].includes(view);
  useEffect(() => { const fn=()=>setSolid(window.scrollY>30); window.addEventListener("scroll",fn); return ()=>window.removeEventListener("scroll",fn); }, []);
  useEffect(() => setMob(false), [view]);
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMob(false); };
  const bg = solid||isDash||mob;
  return (
    <>
      <motion.nav initial={{ y:-64,opacity:0 }} animate={{ y:0,opacity:1 }} transition={{ duration:0.5 }}
        style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, height:64, padding:"0 clamp(16px,4vw,40px)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, background:bg?"rgba(250,250,248,0.96)":"transparent", backdropFilter:bg?"blur(18px)":"none", borderBottom:bg?"1px solid var(--border)":"none", transition:"all 0.3s ease" }}>
        <Logo onClick={()=>onNav("landing")}/>
        <div className="nav-links-desk" style={{ display:"flex", gap:4, alignItems:"center" }}>
          {isLanding && (<>
            <button className="nav-link" onClick={()=>scrollTo("features-section")}>Features</button>
            <button className="nav-link" onClick={()=>scrollTo("pricing-section")}>Pricing</button>
            <button className="nav-link" onClick={()=>scrollTo("waitlist-section")}>Join Waitlist</button>
            <div style={{ width:1, height:20, background:"var(--border)", margin:"0 6px" }}/>
          </>)}
          {!isLanding && <button className="btn-ghost" onClick={()=>onNav("landing")}>← Home</button>}
          <button className="btn-secondary" onClick={()=>onNav("signin")} style={{ fontSize:13 }}><LogIn size={14}/> Sign in</button>
          <button className="btn-primary" onClick={()=>onNav("dashboard")} style={{ fontSize:13 }}>Get started <ArrowUpRight size={14}/></button>
        </div>
        <button className="hamburger btn-ghost" style={{ display:"none", padding:8 }} onClick={()=>setMob(o=>!o)}>
          {mob ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </motion.nav>
      <AnimatePresence>
        {mob && (
          <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:0.22 }}
            style={{ position:"fixed", top:64, left:0, right:0, zIndex:99, background:"rgba(250,250,248,0.98)", backdropFilter:"blur(18px)", borderBottom:"1px solid var(--border)", padding:"16px 20px 24px", display:"flex", flexDirection:"column", gap:8 }}>
            {isLanding && (<>
              <button className="nav-link" style={{ textAlign:"left" }} onClick={()=>scrollTo("features-section")}>Features</button>
              <button className="nav-link" style={{ textAlign:"left" }} onClick={()=>scrollTo("pricing-section")}>Pricing</button>
              <button className="nav-link" style={{ textAlign:"left" }} onClick={()=>scrollTo("waitlist-section")}>Join Waitlist</button>
              <div style={{ height:1, background:"var(--border)", margin:"4px 0" }}/>
            </>)}
            {!isLanding && <button className="nav-link" style={{ textAlign:"left" }} onClick={()=>onNav("landing")}>← Home</button>}
            <button className="btn-secondary" onClick={()=>{ onNav("signin"); setMob(false); }} style={{ justifyContent:"center" }}><LogIn size={14}/> Sign in</button>
            <button className="btn-primary"   onClick={()=>{ onNav("dashboard"); setMob(false); }} style={{ justifyContent:"center" }}>Get started <ArrowUpRight size={14}/></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ── Dashboard Shell ── */
const DashboardShell = ({ activeTab, onNav, onUpgrade, children }) => {
  const [sideOpen, setSideOpen] = useState(false);
  const NAV = [
    { icon:<LayoutDashboard size={16}/>, label:"New Interview", id:"dashboard" },
    { icon:<FileText size={16}/>,        label:"My Reports",    id:"reports"   },
    { icon:<TrendingUp size={16}/>,      label:"Progress",      id:"progress"  },
    { icon:<Palette size={16}/>,         label:"Personas",       id:"avatars"   },
  ];  const SideContent = () => (
    <div style={{ display:"flex", flexDirection:"column", gap:3, height:"100%", padding:"80px 14px 28px" }}>
      <div style={{ padding:"0 4px 14px", marginBottom:4 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"var(--slate-50)", borderRadius:11, border:"1px solid var(--border)" }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:"var(--teal-light)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>🧑‍💻</div>
          <div><div className="brig" style={{ fontSize:13, fontWeight:700, color:"var(--slate)", lineHeight:1.2 }}>Alex Johnson</div><Tag color="teal" size="xs">Pro Plan</Tag></div>
        </div>
      </div>
      <div style={{ height:1, background:"var(--border)", margin:"0 4px 8px" }}/>
      {NAV.map(({ icon, label, id }) => (
        <button key={id} className={`sidebar-item ${activeTab===id?"active":""}`} onClick={()=>{ onNav(id); setSideOpen(false); }}>{icon} {label}</button>
      ))}
      <div style={{ height:1, background:"var(--border)", margin:"8px 4px" }}/>
      <button className={`sidebar-item ${activeTab==="settings"?"active":""}`} onClick={()=>{ onNav("settings"); setSideOpen(false); }}>
        <Settings size={16}/> Settings
      </button>
      <button className={`sidebar-item ${activeTab==="support"?"active":""}`} onClick={()=>{ onNav("support"); setSideOpen(false); }}>
        <LifeBuoy size={16}/> Help & Support
      </button>
      <div style={{ marginTop:"auto", padding:"0 4px" }}>
        {/* Streak card */}
        <div className="streak-badge" style={{ marginBottom:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:6 }}>
            <Flame size={14} style={{ color:"var(--amber)" }}/>
            <span className="brig" style={{ fontSize:13, fontWeight:700, color:"var(--slate)", letterSpacing:"-0.01em" }}>5-day streak!</span>
          </div>
          <div style={{ fontSize:11, color:"var(--slate-500)", marginBottom:8, lineHeight:1.5 }}>Practice tomorrow to hit 6 days. 🎯</div>
          <div style={{ height:4, background:"rgba(217,119,6,.15)", borderRadius:2, overflow:"hidden" }}>
            <div style={{ width:"71%", height:"100%", background:"linear-gradient(90deg,var(--amber),#FBBF24)", borderRadius:2 }}/>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
            <span style={{ fontSize:10, color:"var(--amber)", fontWeight:600 }}>5 / 7 days</span>
            <span style={{ fontSize:10, color:"var(--slate-400)" }}>Next: 7-day badge</span>
          </div>
        </div>
        <div style={{ background:"var(--teal-light)", border:"1px solid rgba(13,148,136,.2)", borderRadius:13, padding:"14px 16px", cursor:"pointer", transition:"all 0.2s" }}
          onClick={()=>onUpgrade("Elite")}
          onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="var(--shadow-md)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
          <div style={{ fontSize:10, fontWeight:700, color:"var(--teal-dark)", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:5 }}>Interviews Left</div>
          <div className="brig" style={{ fontSize:28, fontWeight:800, color:"var(--slate)", letterSpacing:"-0.02em" }}>23 <span style={{ fontSize:14, fontWeight:500, color:"var(--slate-500)" }}>/ 40</span></div>
          <div style={{ height:4, background:"rgba(13,148,136,.15)", borderRadius:2, marginTop:10, overflow:"hidden" }}>
            <div style={{ width:"57.5%", height:"100%", background:"var(--teal)", borderRadius:2 }}/>
          </div>
          <div style={{ fontSize:11, color:"var(--teal-dark)", fontWeight:600, marginTop:8, display:"flex", alignItems:"center", gap:4 }}><ArrowUpRight size={11}/> Upgrade for more</div>
        </div>
      </div>
    </div>
  );
  return (
    <div style={{ minHeight:"100vh", background:"var(--slate-50)", display:"flex" }}>
      <aside className="sidebar-desk" style={{ width:236, background:"var(--white)", borderRight:"1px solid var(--border)", flexShrink:0, position:"sticky", top:0, height:"100vh", overflowY:"auto" }}>
        <SideContent/>
      </aside>
      <AnimatePresence>
        {sideOpen && (<>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={()=>setSideOpen(false)} style={{ position:"fixed", inset:0, background:"rgba(15,23,42,.4)", zIndex:199 }}/>
          <motion.aside initial={{ x:-260 }} animate={{ x:0 }} exit={{ x:-260 }} transition={{ duration:0.28, ease:[0.32,.72,0,1] }} style={{ position:"fixed", top:0, left:0, bottom:0, width:240, background:"var(--white)", borderRight:"1px solid var(--border)", zIndex:200, overflowY:"auto" }}>
            <SideContent/>
          </motion.aside>
        </>)}
      </AnimatePresence>
      <main className="dash-main" style={{ flex:1, overflowY:"auto", minWidth:0 }}>
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
const Landing = ({ onNav, onCheckout }) => (
  <div style={{ background:"var(--ivory)" }}>
    {/* HERO */}
    <section className="hero-pad" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translate(-50%,-50%)", width:"min(900px,100%)", height:"min(600px,100%)", background:"radial-gradient(ellipse,rgba(13,148,136,.08) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <motion.div initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5 }}>
        <Tag color="teal"><Sparkles size={11}/> Coming Soon · Join the Waitlist</Tag>
      </motion.div>
      <motion.h1 initial={{ opacity:0,y:32 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.65,delay:0.1 }} className="brig"
        style={{ fontSize:"clamp(36px,6vw,82px)", fontWeight:800, lineHeight:1.06, letterSpacing:"-0.03em", color:"var(--slate)", marginTop:22, marginBottom:20, maxWidth:900, wordBreak:"break-word" }}>
        Practice the Interview.{" "}<span className="text-shimmer">Land the Offer.</span>
      </motion.h1>
      <motion.p initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.55,delay:0.22 }}
        style={{ fontSize:"clamp(15px,2vw,19px)", color:"var(--slate-500)", maxWidth:600, lineHeight:1.72, marginBottom:36 }}>
        A hyper-realistic AI interviewer that knows your CV, the company, and the exact role. Multi-language support. Detailed scoring. Ruthlessly honest feedback.{" "}
        <strong style={{ color:"var(--slate-700)" }}>Launching soon.</strong>
      </motion.p>
      <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5,delay:0.35 }}
        style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, width:"100%", maxWidth:520 }}>
        <WaitlistForm size="lg"/>
        <p style={{ fontSize:12, color:"var(--slate-400)", fontWeight:500 }}>No spam. No credit card. Just early access.</p>
      </motion.div>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.65 }} className="stats-row" style={{ marginTop:52 }}>
        {[{ n:"2,400+",l:"Waitlist signups" },{ n:"140+",l:"Target companies" },{ n:"28",l:"Languages planned" },{ n:"2026",l:"Launch year" }].map(({ n,l }) => (
          <div key={l} style={{ textAlign:"center" }}>
            <div className="brig" style={{ fontSize:"clamp(18px,2.5vw,26px)", fontWeight:700, color:"var(--slate)", letterSpacing:"-0.02em" }}>{n}</div>
            <div style={{ fontSize:12, color:"var(--slate-500)", marginTop:2 }}>{l}</div>
          </div>
        ))}
      </motion.div>
      <motion.div initial={{ opacity:0,y:48,scale:0.95 }} animate={{ opacity:1,y:0,scale:1 }} transition={{ duration:0.8,delay:0.52 }}
        className="float hero-preview" style={{ marginTop:68, maxWidth:780, width:"100%" }}>
        <div className="card" style={{ borderRadius:22, overflow:"hidden", boxShadow:"var(--shadow-xl)" }}>
          <div style={{ padding:"12px 20px", background:"var(--slate-50)", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:8 }}>
            {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{ width:11, height:11, borderRadius:"50%", background:c }}/>)}
            <span style={{ marginLeft:8, fontSize:12, color:"var(--slate-300)", fontWeight:500 }}>placementdo.app · Live · Google · SWE L5</span>
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:5 }}>
              <div className="dot-live" style={{ width:7, height:7, borderRadius:"50%", background:"#DC2626" }}/>
              <span style={{ fontSize:11, fontWeight:600, color:"#DC2626" }}>LIVE</span>
            </div>
          </div>
          <div className="hero-preview-mock-grid" style={{ background:"var(--white)" }}>
            <div style={{ padding:"26px 28px 22px", borderRight:"1px solid var(--border)" }}>
              <Tag color="slate" size="xs">The Stress-Tester · Active</Tag>
              <p style={{ marginTop:14, fontSize:14.5, color:"var(--slate)", lineHeight:1.72, fontStyle:"italic" }}>
                "Given the scale you mentioned — 10M rps — walk me through the consistency vs. availability trade-offs in your caching layer."
              </p>
              <div style={{ marginTop:18, display:"flex", gap:10, alignItems:"center" }}>
                <div style={{ display:"flex", gap:3 }}>
                  {[1,2,3,4,5,6,7].map(i=><div key={i} className="wave-bar" style={{ width:3, height:20, background:"var(--teal)", borderRadius:2, animationDelay:`${i*0.11}s` }}/>)}
                </div>
                <span style={{ fontSize:12, color:"var(--teal)", fontWeight:600 }}>You're speaking…</span>
              </div>
            </div>
            <div className="hero-mock-side hero-preview-mock-side tilt-in" style={{ background:"var(--slate-50)", display:"flex", alignItems:"center", justifyContent:"center", minHeight:150 }}>
              <div style={{ textAlign:"center" }}><div style={{ fontSize:48 }}>👩‍💻</div><div style={{ fontSize:11, color:"var(--slate-300)", marginTop:5 }}>Your camera</div></div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>

    {/* TICKER */}
    <section style={{ padding:"48px 0", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", background:"var(--white)" }}>
      <p style={{ textAlign:"center", fontSize:11.5, color:"var(--slate-300)", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:26 }}>Building for people interviewing at</p>
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...COMPANIES,...COMPANIES].map((c,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, whiteSpace:"nowrap", opacity:0.6, transition:"opacity 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.6"}>
              <div style={{ width:34, height:34, borderRadius:9, background:c.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:c.fg, fontFamily:"'Bricolage Grotesque',sans-serif" }}>{c.abbr}</div>
              <span className="brig" style={{ fontSize:15, fontWeight:600, color:"var(--slate-700)" }}>{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section className="sec-pad" style={{ maxWidth:1100, margin:"0 auto" }}>
      <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ duration:0.55 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:56 }}>
        <Tag color="teal">Process</Tag>
        <h2 className="brig" style={{ fontSize:"clamp(26px,4.5vw,50px)", fontWeight:700, color:"var(--slate)", letterSpacing:"-0.03em", marginTop:14, lineHeight:1.1 }}>From zero to hired in four steps</h2>
      </motion.div>
      <div className="step-grid">
        {[
          { icon:<Upload size={22}/>, step:"01", title:"Upload your CV", desc:"AI parses your resume to craft hyper-relevant questions based on your exact skills and gaps.", color:"var(--teal)" },
          { icon:<Building2 size={22}/>, step:"02", title:"Pick company & role", desc:"Target any of 140+ employers. Set the exact title, level, and interview focus area.", color:"#0369A1" },
          { icon:<Video size={22}/>, step:"03", title:"Live AI interview", desc:"Face-to-face with your AI interviewer. Real questions, real pressure, no second chances.", color:"#7C3AED" },
          { icon:<Award size={22}/>, step:"04", title:"Get hired", desc:"Receive a scored, actionable report with a concrete path to your next improvement.", color:"var(--amber)" },
        ].map(({ icon, step, title, desc, color }, i) => (
          <motion.div key={step} initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} transition={{ duration:0.45,delay:i*0.09 }} viewport={{ once:true }}
            className="card card-lift" style={{ padding:"28px 24px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
              <div style={{ width:46, height:46, borderRadius:13, background:`${color}14`, display:"flex", alignItems:"center", justifyContent:"center", color, transition:"transform 0.22s, background 0.22s" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.1)"; e.currentTarget.style.background=`${color}22`; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.background=`${color}14`; }}>
                {icon}
              </div>
              <span className="brig" style={{ fontSize:13, fontWeight:700, color:"var(--slate-200)" }}>{step}</span>
            </div>
            <h3 className="brig" style={{ fontSize:17, fontWeight:700, color:"var(--slate)", marginBottom:8, letterSpacing:"-0.01em" }}>{title}</h3>
            <p style={{ fontSize:13.5, color:"var(--slate-500)", lineHeight:1.68 }}>{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* FEATURES */}
    <section id="features-section" style={{ padding:"80px clamp(20px,5vw,60px) 100px", background:"var(--white)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ duration:0.55 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:52 }}>
          <Tag color="slate">Why PlacementDo</Tag>
          <h2 className="brig" style={{ fontSize:"clamp(24px,4vw,46px)", fontWeight:700, letterSpacing:"-0.03em", color:"var(--slate)", marginTop:14, lineHeight:1.1 }}>The unfair advantage</h2>
          <p style={{ fontSize:16, color:"var(--slate-500)", maxWidth:540, margin:"12px auto 0", lineHeight:1.65 }}>Built on the same AI infrastructure used to train Fortune 500 hiring managers.</p>
        </motion.div>
        <div className="feature-grid stagger">
          {[
            { icon:<Brain size={20}/>,    title:"CV-contextual questions",      desc:"AI reads your resume and generates hyper-specific questions about your exact projects, claims, and gaps.", color:"var(--teal)"  },
            { icon:<Globe size={20}/>,    title:"28 languages + code-switching", desc:"Practice in English, Mandarin, Hindi, French, Arabic, and 23 more. Mix languages mid-interview seamlessly.", color:"#0369A1"     },
            { icon:<Zap size={20}/>,      title:"Real-time filler detection",    desc:"Get flagged on filler words, pacing, and over-qualification as they happen. Fix bad habits before they cost you.", color:"var(--amber)" },
            { icon:<Shield size={20}/>,   title:"Company interview DNA",         desc:"Google's Googleyness, McKinsey case frameworks, Amazon LP — each session is precisely calibrated to your target.", color:"#7C3AED"     },
            { icon:<BarChart2 size={20}/>,title:"10-metric score breakdown",     desc:"Technical depth, STAR method, communication clarity, culture-fit alignment, and six more scored dimensions.", color:"#BE185D"     },
            { icon:<RefreshCw size={20}/>,title:"Report rechecks",               desc:"Disagree with your analysis? Request a recheck from a different AI perspective, up to your plan limits.", color:"var(--green)" },
          ].map(({ icon, title, desc, color }, i) => (
            <motion.div key={title} initial={{ opacity:0,y:22 }} whileInView={{ opacity:1,y:0 }} transition={{ duration:0.42,delay:i*0.07 }} viewport={{ once:true }} className="feature-card">
              <div className="fc-icon" style={{ background:`${color}12`, borderColor:`${color}20`, color }}
                onMouseEnter={e=>{ e.currentTarget.style.background=`${color}22`; }}
                onMouseLeave={e=>{ e.currentTarget.style.background=`${color}12`; }}>
                {icon}
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* HERO FEATURE — Personality Simulations */}
        <motion.div initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }} transition={{ duration:0.6, delay:0.1 }} viewport={{ once:true }}
          style={{ marginTop:20, borderRadius:20, overflow:"hidden", background:"var(--slate)", border:"1px solid rgba(255,255,255,0.06)", boxShadow:"var(--shadow-xl)", position:"relative" }}>
          <div style={{ position:"absolute", top:"-30%", right:"-5%", width:500, height:400, background:"radial-gradient(ellipse,rgba(13,148,136,.18) 0%,transparent 65%)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", bottom:"-20%", left:"5%", width:350, height:300, background:"radial-gradient(ellipse,rgba(124,58,237,.12) 0%,transparent 65%)", pointerEvents:"none" }}/>
          <div className="pf-outer">
            {/* Left copy */}
            <div style={{ minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <div style={{ width:48, height:48, borderRadius:14, background:"rgba(13,148,136,.2)", border:"1px solid rgba(13,148,136,.35)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"transform 0.3s" }}
                  onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1) rotate(-5deg)"}
                  onMouseLeave={e=>e.currentTarget.style.transform=""}>
                  <span style={{ fontSize:22 }}>🎭</span>
                </div>
                <Tag color="teal">Unique to PlacementDo</Tag>
              </div>
              <h3 className="brig" style={{ fontSize:"clamp(20px,2.5vw,26px)", fontWeight:700, color:"#fff", letterSpacing:"-0.025em", lineHeight:1.2, marginBottom:14 }}>
                Survive Any Interviewer Personality
              </h3>
              <p style={{ fontSize:14, color:"rgba(255,255,255,.6)", lineHeight:1.72, marginBottom:20 }}>
                Most interview tools only test what you know. PlacementDo trains how you <em style={{ color:"rgba(255,255,255,.85)" }}>react</em>. Our 6 AI personas simulate the full psychological spectrum — from the dangerously charming Friendly Peer to the silence-wielding Stoic Veteran.
              </p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {[["6 Distinct Personalities","rgba(13,148,136,.9)"],["Psychological Pressure Training","rgba(124,58,237,.9)"],["Adaptive Difficulty","rgba(217,119,6,.9)"]].map(([label,color]) => (
                  <div key={label} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.12)", borderRadius:20, padding:"5px 13px", transition:"all 0.2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,.13)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,.07)"; }}>
                    <div style={{ width:6, height:6, borderRadius:"50%", background:color, flexShrink:0 }}/>
                    <span style={{ fontSize:12, color:"rgba(255,255,255,.75)", fontWeight:500 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right — mini persona stack */}
            <div className="pf-right">
              {[
                { emoji:"⚡", title:"The Stress-Tester",   diff:"Brutal",        diffColor:"#FCA5A5", bg:"rgba(220,38,38,.18)",  bd:"rgba(220,38,38,.35)"  },
                { emoji:"😄", title:"The Friendly Peer",   diff:"Deceptive",     diffColor:"#FCD34D", bg:"rgba(217,119,6,.18)",  bd:"rgba(217,119,6,.35)"  },
                { emoji:"🌸", title:"The Empath",          diff:"Medium",        diffColor:"#7DD3FC", bg:"rgba(3,105,161,.18)",  bd:"rgba(3,105,161,.35)"  },
                { emoji:"🗿", title:"The Stoic Veteran",   diff:"Psychological", diffColor:"#CBD5E1", bg:"rgba(71,85,105,.18)",  bd:"rgba(71,85,105,.35)"  },
                { emoji:"🎭", title:"The Devil's Advocate",diff:"Hard",          diffColor:"#C4B5FD", bg:"rgba(124,58,237,.18)", bd:"rgba(124,58,237,.35)" },
              ].map(({ emoji, title, diff, diffColor, bg, bd }) => (
                <div key={title} style={{ display:"flex", alignItems:"center", gap:10, background:bg, border:`1px solid ${bd}`, borderRadius:11, padding:"10px 13px", transition:"transform 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.transform="translateX(-3px)"}
                  onMouseLeave={e=>e.currentTarget.style.transform=""}>
                  <span style={{ fontSize:18, flexShrink:0 }}>{emoji}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,.88)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{title}</div>
                    <div style={{ fontSize:10.5, color:diffColor, fontWeight:700, marginTop:1 }}>{diff}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* PRICING */}
    <section id="pricing-section" style={{ padding:"100px clamp(20px,5vw,60px)", maxWidth:1100, margin:"0 auto" }}>
      <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ duration:0.55 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:52 }}>
        <Tag color="teal">Pricing</Tag>
        <h2 className="brig" style={{ fontSize:"clamp(24px,4vw,46px)", fontWeight:700, letterSpacing:"-0.03em", color:"var(--slate)", marginTop:14, lineHeight:1.1 }}>One interview could change everything</h2>
        <p style={{ fontSize:15, color:"var(--slate-500)", marginTop:10 }}>No subscriptions. No auto-renewals. Join the waitlist for early-bird pricing.</p>
      </motion.div>
      <div className="pricing-grid stagger">
        {PLANS.map(({ name, price, old, hi, tagline, features }, i) => (
          <motion.div key={name} initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} transition={{ duration:0.5,delay:i*0.1 }} viewport={{ once:true }}
            className={`pricing-card ${hi?"hi":""}`}
            style={{ background:hi?"var(--slate)":"var(--white)", border:hi?"1px solid var(--slate)":"1px solid var(--border)", boxShadow:hi?"var(--shadow-xl)":"var(--shadow-sm)" }}>
            {hi && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:"var(--teal)", color:"#fff", fontSize:11, fontWeight:700, padding:"4px 18px", borderRadius:20, whiteSpace:"nowrap", letterSpacing:"0.06em", boxShadow:"var(--shadow-teal)" }}>MOST POPULAR</div>}
            <div style={{ fontSize:12, fontWeight:700, color:hi?"rgba(255,255,255,.4)":"var(--slate-300)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:5 }}>{name}</div>
            <div style={{ fontSize:12.5, color:hi?"rgba(255,255,255,.55)":"var(--slate-500)", marginBottom:18 }}>{tagline}</div>
            <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:26 }}>
              <span className="brig" style={{ fontSize:"clamp(34px,4vw,48px)", fontWeight:800, color:hi?"#fff":"var(--slate)", letterSpacing:"-0.04em" }}>{price}</span>
              {old && <span style={{ fontSize:17, color:hi?"rgba(255,255,255,.3)":"var(--slate-300)", textDecoration:"line-through" }}>{old}</span>}
            </div>
            <div style={{ height:1, background:hi?"rgba(255,255,255,.1)":"var(--border)", marginBottom:22 }}/>
            <div style={{ marginBottom:26 }}>
              {features.map(f => (
                <div key={f} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:11 }}>
                  <div style={{ width:17, height:17, borderRadius:"50%", background:hi?"rgba(255,255,255,.12)":"var(--teal-light)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
                    <Check size={9} style={{ color:hi?"#fff":"var(--teal)" }} strokeWidth={3}/>
                  </div>
                  <span style={{ fontSize:13.5, color:hi?"rgba(255,255,255,.78)":"var(--slate-700)", lineHeight:1.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={()=>onCheckout(name)}
              style={{ width:"100%", padding:"13px", borderRadius:12, border:"none", background:hi?"var(--teal)":"var(--slate-100)", color:hi?"#fff":"var(--slate)", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:14, cursor:"pointer", transition:"all 0.22s", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
              onMouseEnter={e=>{ e.currentTarget.style.background=hi?"var(--teal-dark)":"var(--slate-200)"; e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow=hi?"var(--shadow-teal)":"var(--shadow-sm)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background=hi?"var(--teal)":"var(--slate-100)"; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
              onMouseDown={e=>e.currentTarget.style.transform="scale(0.97)"}
              onMouseUp={e=>e.currentTarget.style.transform="translateY(-1px)"}>
              <CreditCard size={15}/> Get {name} Plan
            </button>
          </motion.div>
        ))}
      </div>
    </section>

    {/* FAQ */}
    {(() => {
      const FAQS = [
        { q:"How is PlacementDo different from practising with a friend?", a:"Friends are too nice. They know you, they skip hard follow-ups, and they can't give you a scored breakdown. PlacementDo's AI has no social contract — it will interrupt you, push back on every weak answer, and give you the honest scores that friends won't." },
        { q:"Can the AI really replicate genuine interview pressure?", a:"Our Stress-Tester persona uses intentional interruptions, back-to-back rapid-fire questions, and deliberate silence after your answers. Beta users consistently rate it harder than their real interviews — which is exactly the point." },
        { q:"What's the difference between the 6 interviewer personas?", a:"Each persona tests a different dimension: The Friendly Peer catches oversharing, The Empath exposes emotional intelligence gaps, The Stress-Tester replicates FAANG-style pressure, The Stoic Veteran tests composure under silence, The Devil's Advocate forces logical precision, and The Silent Analyst forensically probes inconsistencies." },
        { q:"Does PlacementDo work for non-technical roles?", a:"Yes. You can set any role — PM, consultant, analyst, investment banker, or engineer. The focus selector lets you choose Behavioral / STAR Method, Case Study, or Balanced sessions. The AI adapts its questioning style and scoring criteria accordingly." },
        { q:"When does PlacementDo launch and how much will it cost?", a:"We're targeting 2026. Waitlist members get 30% off all plans at launch. Plans start at $1 for a single session (Starter) and go up to $89.99 for 100 sessions with all personas unlocked (Elite). No subscriptions, no auto-renewals." },
      ];
      const [open, setOpen] = useState(null);
      return (
        <section style={{ padding:"80px clamp(20px,5vw,60px) 100px", background:"var(--ivory)", borderTop:"1px solid var(--border)" }}>
          <div style={{ maxWidth:780, margin:"0 auto" }}>
            <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ duration:0.55 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:52 }}>
              <Tag color="slate"><HelpCircle size={10}/> FAQ</Tag>
              <h2 className="brig" style={{ fontSize:"clamp(24px,4vw,46px)", fontWeight:700, letterSpacing:"-0.03em", color:"var(--slate)", marginTop:14, lineHeight:1.1 }}>Common questions</h2>
            </motion.div>
            <div className="card" style={{ overflow:"hidden" }}>
              {FAQS.map(({ q, a }, i) => (
                <div key={i} className="faq-item">
                  <button className="faq-btn" onClick={()=>setOpen(o=>o===i?null:i)} style={{ padding:"20px 24px" }}>
                    <span className="brig" style={{ fontSize:15.5, fontWeight:700, color:"var(--slate)", letterSpacing:"-0.01em", lineHeight:1.3 }}>{q}</span>
                    <span className="faq-chevron" style={{ transform:open===i?"rotate(180deg)":"rotate(0deg)" }}>
                      <ChevronDown size={18}/>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        key="ans"
                        initial={{ height:0, opacity:0 }}
                        animate={{ height:"auto", opacity:1 }}
                        exit={{ height:0, opacity:0 }}
                        transition={{ duration:0.28, ease:[0.25,0.1,0.25,1] }}>
                        <p style={{ fontSize:14.5, color:"var(--slate-600)", lineHeight:1.75, padding:"0 24px 22px", borderTop:"1px solid var(--border)" }}>{a}</p>
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
    <section id="waitlist-section" style={{ padding:"96px clamp(20px,5vw,60px) 112px", background:"var(--slate)", position:"relative", overflow:"hidden" }}>
      {/* Animated background blobs */}
      <div style={{ position:"absolute", top:"20%", left:"10%", width:400, height:400, background:"radial-gradient(circle,rgba(13,148,136,.14) 0%,transparent 70%)", pointerEvents:"none", animation:"float-anim 8s ease-in-out infinite" }}/>
      <div style={{ position:"absolute", bottom:"10%", right:"8%", width:300, height:300, background:"radial-gradient(circle,rgba(124,58,237,.1) 0%,transparent 70%)", pointerEvents:"none", animation:"float-anim 10s ease-in-out infinite reverse" }}/>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"min(900px,100%)", height:"min(600px,100%)", background:"radial-gradient(ellipse,rgba(13,148,136,.18) 0%,transparent 65%)", pointerEvents:"none" }}/>

      <motion.div initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }} transition={{ duration:0.65 }} viewport={{ once:true }}
        style={{ position:"relative", zIndex:1, maxWidth:660, margin:"0 auto" }}>

        {/* Top-center icon */}
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <motion.div whileHover={{ scale:1.1, rotate:8 }} transition={{ type:"spring", stiffness:300, damping:15 }}
            style={{ width:64, height:64, borderRadius:18, background:"rgba(13,148,136,.2)", border:"1px solid rgba(13,148,136,.35)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
            <Bell size={28} style={{ color:"var(--teal-mid)" }}/>
          </motion.div>
          <Tag color="teal"><Sparkles size={11}/> Be First. Get Early Access.</Tag>
          <h2 className="brig" style={{ fontSize:"clamp(26px,5vw,54px)", fontWeight:800, letterSpacing:"-0.035em", color:"#fff", marginTop:20, marginBottom:14, lineHeight:1.05 }}>
            Your dream offer is<br/>one practice away
          </h2>
          <p style={{ fontSize:"clamp(14px,2vw,16px)", color:"rgba(255,255,255,.55)", marginBottom:38, lineHeight:1.68 }}>
            Join 2,400+ candidates already on the waitlist. Early members get <strong style={{ color:"rgba(255,255,255,.88)" }}>30% off</strong> at launch.
          </p>
        </div>

        {/* Email box — elevated card feel */}
        <div style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.12)", borderRadius:20, padding:"32px 36px", backdropFilter:"blur(12px)", boxShadow:"0 24px 64px rgba(0,0,0,.3)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"var(--teal-mid)" }} className="dot-live"/>
            <span style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,.5)", letterSpacing:"0.07em", textTransform:"uppercase" }}>Secure your spot</span>
          </div>
          <div style={{ display:"flex", justifyContent:"flex-start" }}><WaitlistForm size="lg" dark={true}/></div>
          <p style={{ fontSize:12, color:"rgba(255,255,255,.22)", marginTop:14, display:"flex", alignItems:"center", gap:5 }}>
            <span>🔒</span> No spam. No credit card. Unsubscribe anytime.
          </p>
        </div>

        {/* Trust badges */}
        <div style={{ display:"flex", gap:20, justifyContent:"center", marginTop:36, flexWrap:"wrap" }}>
          {[
            { icon:<CheckCircle2 size={14}/>, label:"Free beta access" },
            { icon:<CheckCircle2 size={14}/>, label:"30% launch discount" },
            { icon:<CheckCircle2 size={14}/>, label:"Priority onboarding" },
          ].map(({ icon, label }, i) => (
            <motion.div key={label} initial={{ opacity:0, y:8 }} whileInView={{ opacity:1, y:0 }} transition={{ delay:i*0.1, duration:0.4 }} viewport={{ once:true }}
              style={{ display:"flex", alignItems:"center", gap:7 }}>
              <span style={{ color:"var(--teal-mid)" }}>{icon}</span>
              <span style={{ fontSize:13, color:"rgba(255,255,255,.5)", fontWeight:500 }}>{label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>

    {/* FOOTER */}
    <footer style={{ background:"var(--slate)", borderTop:"1px solid rgba(255,255,255,.06)" }}>
      <div className="footer-grid">
        {/* Brand column */}
        <div>
          <Logo light/>
          <p style={{ fontSize:13.5, color:"rgba(255,255,255,.4)", lineHeight:1.7, marginTop:14, maxWidth:280 }}>
            A hyper-realistic AI interview simulator that knows your CV, the company, and the exact role. Practice smarter. Land faster.
          </p>
          <div style={{ display:"flex", gap:8, marginTop:20 }}>
            {[
              { icon:<MessageSquare size={15}/>, label:"Twitter/X" },
              { icon:<Hash size={15}/>,          label:"LinkedIn"  },
              { icon:<Bookmark size={15}/>,       label:"GitHub"   },
            ].map(({ icon, label }) => (
              <div key={label} className="footer-social wiggle" title={label}>{icon}</div>
            ))}
          </div>
        </div>

        {/* Product links */}
        <div>
          <div className="brig" style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 }}>Product</div>
          {["Features","Pricing","Personas","How it works","Changelog"].map(l => (
            <button key={l} className="footer-link">{l}</button>
          ))}
        </div>

        {/* Company */}
        <div>
          <div className="brig" style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 }}>Company</div>
          {["About","Blog","Careers","Privacy Policy","Terms of Service"].map(l => (
            <button key={l} className="footer-link">{l}</button>
          ))}
        </div>

        {/* Join waitlist */}
        <div>
          <div className="brig" style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 }}>Get Early Access</div>
          <p style={{ fontSize:13, color:"rgba(255,255,255,.4)", lineHeight:1.65, marginBottom:14 }}>Join the waitlist and get 30% off at launch in 2026.</p>
          <WaitlistForm size="sm" dark={true}/>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,.07)", padding:"16px clamp(20px,5vw,60px)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10, maxWidth:1200, margin:"0 auto" }}>
        <span style={{ fontSize:12, color:"rgba(255,255,255,.25)" }}>© 2026 PlacementDo. All rights reserved.</span>
        <div style={{ display:"flex", gap:16 }}>
          {["Privacy","Terms","Cookies"].map(l => (
            <button key={l} style={{ fontSize:12, color:"rgba(255,255,255,.25)", background:"none", border:"none", cursor:"pointer", transition:"color 0.15s", fontFamily:"'DM Sans',sans-serif" }}
              onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,.6)"}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.25)"}>{l}</button>
          ))}
        </div>
      </div>
    </footer>
  </div>
);

/* ── Sign In ── */
const SignIn = ({ onNav }) => {
  const [form, setForm] = useState({ email:"", password:"" });
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const submit = e => { e.preventDefault(); setLoading(true); setTimeout(()=>{ setLoading(false); onNav("dashboard"); }, 1200); };
  const handleForgot = () => { setResetSent(true); setTimeout(()=>setResetSent(false),4000); };
  return (
    <div style={{ minHeight:"100vh", background:"var(--slate-50)", display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 20px" }}>
      <motion.div initial={{ opacity:0,y:24,scale:0.97 }} animate={{ opacity:1,y:0,scale:1 }} transition={{ duration:0.42,ease:[0.16,1,0.3,1] }} style={{ width:"100%", maxWidth:420 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:18 }}><Logo onClick={()=>onNav("landing")}/></div>
          <h1 className="brig" style={{ fontSize:28, fontWeight:700, color:"var(--slate)", letterSpacing:"-0.03em" }}>Welcome back</h1>
          <p style={{ fontSize:14, color:"var(--slate-500)", marginTop:6 }}>Sign in to continue your practice sessions.</p>
        </div>
        <div className="card" style={{ padding:32 }}>
          <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:18 }}>
            <div><label>Email Address</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com" disabled={loading}/></div>
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                <label style={{ margin:0 }}>Password</label>
                <span style={{ fontSize:12, color: resetSent ? "var(--green)" : "var(--teal)", cursor:"pointer", fontWeight:600, transition:"color 0.15s" }}
                  onClick={handleForgot}
                  onMouseEnter={e=>e.currentTarget.style.color=resetSent?"var(--green)":"var(--teal-dark)"} onMouseLeave={e=>e.currentTarget.style.color=resetSent?"var(--green)":"var(--teal)"}>
                  {resetSent ? "✓ Reset email sent!" : "Forgot password?"}
                </span>
              </div>
              <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="••••••••" disabled={loading}/>
            </div>
            <button type="submit" className="btn-primary" disabled={loading} style={{ width:"100%", justifyContent:"center", fontSize:15, padding:"13px", marginTop:4 }}>
              {loading ? <><span className="spin"><RefreshCw size={16}/></span> Signing in…</> : <><LogIn size={16}/> Sign in</>}
            </button>
          </form>
          <div style={{ height:1, background:"var(--border)", margin:"22px 0" }}/>
          <p style={{ textAlign:"center", fontSize:13.5, color:"var(--slate-500)" }}>
            Don't have an account?{" "}
            <span onClick={()=>onNav("landing")} style={{ color:"var(--teal)", fontWeight:600, cursor:"pointer", transition:"color 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.color="var(--teal-dark)"} onMouseLeave={e=>e.currentTarget.style.color="var(--teal)"}>Join the waitlist →</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

/* ── New Interview ── */
const NewInterview = ({ onNav, onUpgrade, onSelectPersona, showToast }) => {
  const [cv, setCv] = useState(false);
  const [avatar, setAvatar] = useState(1);
  const [form, setForm] = useState({ company:"Google", role:"Software Engineer L5", level:"Mid-Level (3–5 yrs)", language:"English", focus:"Balanced (Technical + Behavioral)" });
  const [showCountdown, setShowCountdown] = useState(false);
  const selAv = PERSONAS.find(a=>a.id===avatar);

  const PRESETS = [
    { label:"Google SWE L5", icon:"🔵", company:"Google",   role:"Software Engineer L5", focus:"Technical Deep Dive",         level:"Mid-Level (3–5 yrs)" },
    { label:"McKinsey Case",  icon:"🟡", company:"McKinsey", role:"Associate Consultant",  focus:"Case Study",                  level:"Entry Level (0–2 yrs)" },
    { label:"Amazon PM",      icon:"🟠", company:"Amazon",   role:"Product Manager",       focus:"Behavioral / STAR Method",    level:"Mid-Level (3–5 yrs)" },
    { label:"Goldman IB",     icon:"🔷", company:"Goldman",  role:"Investment Banking Analyst", focus:"Behavioral / STAR Method", level:"Entry Level (0–2 yrs)" },
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
    setShowCountdown(true);
  };

  return (
    <motion.div initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35 }} style={{ position:"relative" }}>
      <AnimatePresence>
        {showCountdown && (
          <CountdownModal
            persona={selAv}
            onStart={()=>{ setShowCountdown(false); onNav("interview"); }}
            onCancel={()=>setShowCountdown(false)}
          />
        )}
      </AnimatePresence>

      <div style={{ marginBottom:20 }}>
        <h1 className="brig" style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:700, color:"var(--slate)", letterSpacing:"-0.03em" }}>New Interview Session</h1>
        <p style={{ fontSize:14, color:"var(--slate-500)", marginTop:5 }}>Configure your session below, then start when ready.</p>
      </div>

      {/* ── Tip of the Day ── */}
      <div className="tip-card" style={{ marginBottom:20 }}>
        <div style={{ display:"flex", gap:10, alignItems:"flex-start", position:"relative", zIndex:1 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"rgba(13,148,136,.25)", border:"1px solid rgba(13,148,136,.35)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <Sparkles size={16} style={{ color:"var(--teal-mid)" }}/>
          </div>
          <div>
            <div style={{ fontSize:10, fontWeight:700, color:"var(--teal-mid)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:5 }}>Coach Tip of the Day</div>
            <p style={{ fontSize:13.5, color:"rgba(255,255,255,.75)", lineHeight:1.65 }}>{tip}</p>
          </div>
        </div>
      </div>

      {/* ── Quick-Start Presets ── */}
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"var(--slate-500)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:10 }}>Quick Start</div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          {PRESETS.map(p => (
            <button key={p.label} className="preset-btn"
              onClick={()=>setForm(f=>({ ...f, company:p.company, role:p.role, focus:p.focus, level:p.level }))}>
              <span style={{ fontSize:16 }}>{p.icon}</span>
              <span style={{ fontSize:12, fontWeight:700, color:"var(--slate)", fontFamily:"'Bricolage Grotesque',sans-serif" }}>{p.label}</span>
              <span style={{ fontSize:10, color:"var(--slate-400)", whiteSpace:"nowrap" }}>{p.focus.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="dash-grid">
        <div style={{ display:"flex", flexDirection:"column", gap:20, minWidth:0 }}>
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
                onDragOver={e=>{ e.preventDefault(); setDragging(true); }}
                onDragLeave={()=>setDragging(false)}
                onDrop={handleDrop}
                onClick={()=>!cv && setCv("resume_alex_johnson.pdf")}
                style={{
                  borderRadius:16, border: cv ? "2px solid var(--teal)" : dragging ? "2px solid var(--teal)" : "2px dashed var(--border-strong)",
                  background: cv ? "var(--teal-light)" : dragging ? "rgba(13,148,136,.05)" : "var(--white)",
                  padding:"28px 24px", cursor: cv ? "default" : "pointer",
                  transition:"all 0.22s ease", position:"relative", overflow:"hidden",
                  boxShadow: dragging ? "0 0 0 4px rgba(13,148,136,.15)" : "var(--shadow-sm)",
                }}>
                {/* Progress bar shimmer when dragging */}
                {dragging && <div style={{ position:"absolute", bottom:0, left:0, height:3, width:"100%", background:"linear-gradient(90deg,var(--teal),var(--teal-mid),var(--teal))", backgroundSize:"200% 100%", animation:"shimmer 1.2s infinite", borderRadius:"0 0 14px 14px" }}/>}
                <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
                {cv ? (
                  <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                    <div style={{ width:52, height:52, borderRadius:13, background:"rgba(13,148,136,.18)", border:"1.5px solid rgba(13,148,136,.35)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <span style={{ fontSize:26 }}>📄</span>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div className="brig" style={{ fontSize:14.5, fontWeight:700, color:"var(--teal-dark)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{typeof cv==="string"?cv:"resume_alex_johnson.pdf"}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:4 }}>
                        <div style={{ width:8, height:8, borderRadius:"50%", background:"var(--green)" }}/>
                        <span style={{ fontSize:12, color:"var(--green)", fontWeight:600 }}>AI parsing complete — questions are now tailored to your CV</span>
                      </div>
                    </div>
                    <button onClick={e=>{ e.stopPropagation(); setCv(false); }} style={{ padding:"6px 12px", borderRadius:8, border:"1.5px solid rgba(13,148,136,.3)", background:"rgba(255,255,255,.7)", color:"var(--teal-dark)", fontSize:12, fontWeight:600, cursor:"pointer", flexShrink:0, transition:"all 0.18s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,1)"; e.currentTarget.style.boxShadow="var(--shadow-sm)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,.7)"; e.currentTarget.style.boxShadow="none"; }}>
                      Replace
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign:"center" }}>
                    <div style={{ width:54, height:54, borderRadius:14, background: dragging?"rgba(13,148,136,.1)":"var(--slate-100)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", color:"var(--slate-400)", transition:"all 0.22s", border: dragging?"1.5px solid rgba(13,148,136,.35)":"1.5px solid transparent" }}>
                      <Upload size={24} style={{ color: dragging?"var(--teal)":"var(--slate-400)" }}/>
                    </div>
                    <div className="brig" style={{ fontSize:15, fontWeight:700, color: dragging?"var(--teal-dark)":"var(--slate)", marginBottom:6 }}>
                      {dragging ? "Release to upload" : "Drag & Drop your CV here"}
                    </div>
                    <div style={{ fontSize:12.5, color:"var(--slate-500)", lineHeight:1.6 }}>
                      or <span style={{ color:"var(--teal)", fontWeight:600, textDecoration:"underline" }}>click to browse</span> · PDF or DOCX · Max 5MB
                    </div>
                    <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:12, flexWrap:"wrap" }}>
                      {["CV questions personalised","Skill gap analysis","3x better relevance"].map(l=>(
                        <div key={l} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:"var(--slate-500)", background:"var(--slate-50)", padding:"3px 9px", borderRadius:12, border:"1px solid var(--border)" }}>
                          <Check size={9} style={{ color:"var(--teal)" }} strokeWidth={3}/>{l}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
          {/* Config */}
          <div className="card" style={{ padding:26 }}>
            <div className="brig" style={{ fontSize:15, fontWeight:700, color:"var(--slate)", marginBottom:20 }}>Interview Configuration</div>
            <div className="config-grid">
              {[{ label:"Target Company", key:"company", ph:"e.g. Google, McKinsey" },{ label:"Job Role / Title", key:"role", ph:"e.g. Software Engineer L5" }].map(({ label, key, ph }) => (
                <div key={key}><label>{label}</label><input value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} placeholder={ph}/></div>
              ))}
              <div><label>Experience Level</label><select value={form.level} onChange={e=>setForm({...form,level:e.target.value})}>{["Entry Level (0–2 yrs)","Mid-Level (3–5 yrs)","Senior (5–8 yrs)","Staff / Principal"].map(o=><option key={o}>{o}</option>)}</select></div>
              <div><label>Interview Language</label><select value={form.language} onChange={e=>setForm({...form,language:e.target.value})}>{["English","Mandarin (Chinese)","Hindi","French","Arabic","Spanish","English + Hindi (Mixed)"].map(o=><option key={o}>{o}</option>)}</select></div>
            </div>
            <div style={{ marginTop:16 }}><label>Interview Focus</label><select value={form.focus} onChange={e=>setForm({...form,focus:e.target.value})}>{["Balanced (Technical + Behavioral)","Technical Deep Dive","Behavioral / STAR Method","Case Study","System Design"].map(o=><option key={o}>{o}</option>)}</select></div>
          </div>
          {/* Recent */}
          <div className="card" style={{ overflow:"hidden" }}>
            <div style={{ padding:"15px 22px", borderBottom:"1px solid var(--border)" }}><div className="brig" style={{ fontSize:14, fontWeight:700, color:"var(--slate)" }}>Recent Sessions</div></div>
            {[{ co:"Stripe",role:"SWE",score:82,date:"Feb 18" },{ co:"Meta",role:"PM",score:74,date:"Feb 14" },{ co:"Deloitte",role:"Analyst",score:91,date:"Feb 9" }].map(({ co,role,score,date },i) => (
              <div key={i} onClick={()=>onNav("report")} style={{ display:"flex", alignItems:"center", padding:"13px 22px", borderBottom:i<2?"1px solid var(--border)":"none", cursor:"pointer", transition:"background 0.18s", gap:12 }}
                onMouseEnter={e=>e.currentTarget.style.background="var(--slate-50)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{ flex:1, minWidth:0 }}><span className="brig" style={{ fontSize:13.5, fontWeight:700, color:"var(--slate)" }}>{co}</span><span style={{ fontSize:13, color:"var(--slate-500)", marginLeft:6 }}>· {role}</span></div>
                <Tag color={score>=80?"green":score>=70?"amber":"red"} size="xs">{score}/100</Tag>
                <span style={{ fontSize:12, color:"var(--slate-300)", whiteSpace:"nowrap", marginLeft:8 }}>{date}</span>
                <ChevronRight size={15} style={{ color:"var(--slate-200)", flexShrink:0 }}/>
              </div>
            ))}
          </div>
        </div>
        {/* Right col */}
        <div style={{ display:"flex", flexDirection:"column", gap:20, minWidth:0 }}>
          <div className="card" style={{ padding:22 }}>
            <div className="brig" style={{ fontSize:14, fontWeight:700, color:"var(--slate)", marginBottom:3 }}>Interviewer Persona</div>
            <p style={{ fontSize:12, color:"var(--slate-500)", marginBottom:16 }}>Pro Plan: 3 personas available</p>
            {PERSONAS.slice(0,3).map(p => (
              <div key={p.id} onClick={()=>setAvatar(p.id)} style={{ display:"flex", gap:12, alignItems:"center", padding:"10px 13px", borderRadius:11, cursor:"pointer", marginBottom:10, background:avatar===p.id?"var(--teal-light)":"var(--slate-50)", border:`1.5px solid ${avatar===p.id?"rgba(13,148,136,.4)":"var(--border)"}`, transition:"all 0.2s", overflow:"hidden" }}
                onMouseEnter={e=>{ if(avatar!==p.id){ e.currentTarget.style.borderColor="rgba(13,148,136,.25)"; e.currentTarget.style.background="rgba(204,251,241,.4)"; } }}
                onMouseLeave={e=>{ if(avatar!==p.id){ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.background="var(--slate-50)"; } }}>
                {/* Color-banded emoji avatar */}
                <div style={{ width:38, height:38, borderRadius:"50%", background:`linear-gradient(135deg,${p.gradientFrom},${p.gradientTo})`, border:`2px solid ${p.accentColor}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{p.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div className="brig" style={{ fontSize:13.5, fontWeight:700, color:"var(--slate)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.title}</div>
                  <div style={{ fontSize:11, color:p.accentColor, fontWeight:600, marginTop:1 }}>{p.difficulty}</div>
                </div>
                {avatar===p.id && <div style={{ width:20, height:20, borderRadius:"50%", background:"var(--teal)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Check size={11} color="#fff" strokeWidth={3}/></div>}
              </div>
            ))}
            <div className="card-interactive" onClick={()=>onUpgrade("Elite")} style={{ padding:"11px 14px", background:"var(--amber-light)", borderRadius:11, border:"1px solid rgba(217,119,6,.22)", display:"flex", gap:9, alignItems:"center", marginTop:4 }}>
              <Zap size={14} style={{ color:"var(--amber)", flexShrink:0 }}/>
              <span style={{ fontSize:12, color:"var(--amber)", fontWeight:500, flex:1, lineHeight:1.5 }}>Upgrade to Elite for all 6 personas.</span>
              <ArrowUpRight size={13} style={{ color:"var(--amber)", flexShrink:0 }}/>
            </div>
          </div>
          <div style={{ background:"var(--slate)", borderRadius:16, padding:"24px 22px", boxShadow:"var(--shadow-xl)" }}>
            <div className="brig" style={{ fontSize:14, fontWeight:700, color:"rgba(255,255,255,.88)", marginBottom:16 }}>Session Summary</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[{ l:"Company",v:form.company },{ l:"Role",v:form.role },{ l:"Level",v:form.level },{ l:"Language",v:form.language },{ l:"Persona",v:selAv?.title },{ l:"CV",v:cv?`✓ ${typeof cv==="string"?cv:"Uploaded"}`:"Not uploaded" }].map(({ l,v }) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", gap:8 }}>
                  <span style={{ fontSize:12, color:"rgba(255,255,255,.38)", flexShrink:0 }}>{l}</span>
                  <span style={{ fontSize:12, color:cv&&l==="CV"?"#86EFAC":"rgba(255,255,255,.78)", fontWeight:500, textAlign:"right", overflow:"hidden", textOverflow:"ellipsis" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ height:1, background:"rgba(255,255,255,.08)", margin:"18px 0" }}/>
            <button className="btn-primary" onClick={startInterview} style={{ width:"100%", justifyContent:"center", fontSize:14, padding:"13px" }}>
              <div className="dot-live" style={{ width:8, height:8, borderRadius:"50%", background:"#fff" }}/> Start Live Interview
            </button>
            <p style={{ fontSize:11, color:"rgba(255,255,255,.28)", textAlign:"center", marginTop:9 }}>Uses 1 interview credit</p>
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
  const FILTERS = ["All","Technical","Behavioral","Case Study","Balanced"];
  const S = [
    { co:"Google",   role:"Software Engineer L5",  score:78, date:"Feb 21, 2026", dur:"34:12", persona:"⚡ Stress-Tester",    tag:"Technical"  },
    { co:"Stripe",   role:"Software Engineer",      score:82, date:"Feb 18, 2026", dur:"28:44", persona:"😄 Friendly Peer",    tag:"Balanced"   },
    { co:"Meta",     role:"Product Manager",        score:74, date:"Feb 14, 2026", dur:"41:05", persona:"🌸 Empath Listener",  tag:"Behavioral" },
    { co:"Deloitte", role:"Business Analyst",       score:91, date:"Feb 9, 2026",  dur:"35:20", persona:"🗿 Stoic Veteran",    tag:"Case Study" },
    { co:"McKinsey", role:"Associate Consultant",   score:69, date:"Feb 3, 2026",  dur:"38:15", persona:"🎭 Devil's Advocate", tag:"Case Study" },
    { co:"Goldman",  role:"Investment Banking Analyst",score:85,date:"Jan 28, 2026",dur:"29:58",persona:"🔍 Silent Analyst",  tag:"Behavioral" },
    { co:"Amazon",   role:"SDE II",                 score:71, date:"Jan 22, 2026", dur:"33:44", persona:"⚡ Stress-Tester",    tag:"Technical"  },
  ];
  const filtered = filter === "All" ? S : S.filter(s => s.tag === filter);
  return (
    <motion.div initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 className="brig" style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:700, color:"var(--slate)", letterSpacing:"-0.03em" }}>My Reports</h1>
          <p style={{ fontSize:14, color:"var(--slate-500)", marginTop:5 }}>Review past performance and track improvement.</p>
        </div>
        <button className="btn-primary" onClick={()=>onNav("dashboard")} style={{ fontSize:13 }}><Zap size={14}/> New Interview</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:14, marginBottom:24 }}>
        {[{ label:"Sessions Done",value:"23",icon:<Video size={18}/>,color:"var(--teal)" },{ label:"Avg. Score",value:"78.6",icon:<BarChart2 size={18}/>,color:"#0369A1" },{ label:"Best Score",value:"91",icon:<Award size={18}/>,color:"var(--green)" },{ label:"Credits Left",value:"17",icon:<Zap size={18}/>,color:"var(--amber)" }].map(({ label,value,icon,color }) => (
          <div key={label} className="card card-lift" style={{ padding:"18px 20px" }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`${color}12`, display:"flex", alignItems:"center", justifyContent:"center", color, marginBottom:10 }}>{icon}</div>
            <div className="brig" style={{ fontSize:26, fontWeight:800, color:"var(--slate)", letterSpacing:"-0.02em" }}>{value}</div>
            <div style={{ fontSize:12, color:"var(--slate-500)", marginTop:2, fontWeight:500 }}>{label}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ overflow:"hidden" }}>
        <div style={{ padding:"15px 22px", borderBottom:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
          <span className="brig" style={{ fontSize:14, fontWeight:700, color:"var(--slate)" }}>Interview History</span>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:12, color:"var(--slate-400)" }}>{filtered.length} of {S.length} shown</span>
            <div style={{ position:"relative" }}>
              <button className="btn-ghost" style={{ fontSize:12, padding:"5px 10px", background:showFilter?"var(--slate-100)":"transparent" }} onClick={()=>setShowFilter(f=>!f)}>
                Filter {filter !== "All" ? `· ${filter}` : "↓"}
              </button>
              <AnimatePresence>
                {showFilter && (
                  <motion.div initial={{ opacity:0,y:-6 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-6 }} transition={{ duration:0.18 }}
                    style={{ position:"absolute", right:0, top:"calc(100% + 6px)", background:"var(--white)", border:"1.5px solid var(--border)", borderRadius:12, padding:"6px", zIndex:50, minWidth:150, boxShadow:"var(--shadow-lg)" }}>
                    {FILTERS.map(f => (
                      <button key={f} onClick={()=>{ setFilter(f); setShowFilter(false); }}
                        style={{ display:"block", width:"100%", textAlign:"left", padding:"8px 14px", borderRadius:8, border:"none", background:filter===f?"var(--teal-light)":"transparent", color:filter===f?"var(--teal-dark)":"var(--slate-600)", fontSize:13, fontWeight:filter===f?600:400, cursor:"pointer", transition:"all 0.15s", fontFamily:"'DM Sans',sans-serif" }}
                        onMouseEnter={e=>{ if(filter!==f) e.currentTarget.style.background="var(--slate-50)"; }}
                        onMouseLeave={e=>{ if(filter!==f) e.currentTarget.style.background="transparent"; }}>
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
          {["Role / Company","Persona","Score","Date",""].map((h,i)=>(
            <div key={i} style={{ fontSize:10.5, fontWeight:700, color:"var(--slate-400)", letterSpacing:"0.07em", textTransform:"uppercase" }}>{h}</div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ padding:"32px", textAlign:"center", color:"var(--slate-400)", fontSize:14 }}>
            No interviews match this filter.
            <button className="btn-ghost" style={{ display:"block", margin:"12px auto 0", fontSize:13 }} onClick={()=>setFilter("All")}>Clear filter</button>
          </div>
        )}
        {filtered.map(({ co, role, score, date, dur, persona, tag }, i) => (
          <div key={i} onClick={()=>onNav("report")} className="rpt-row"
            style={{ borderBottom:i<filtered.length-1?"1px solid var(--border)":"none" }}>
            {/* Mobile: stacked card layout; Desktop: grid columns */}
            {/* Row 1 — always visible */}
            <div style={{ minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3, flexWrap:"wrap" }}>
                <span className="brig" style={{ fontSize:13.5, fontWeight:700, color:"var(--slate)" }}>{co}</span>
                <Tag color="slate" size="xs">{tag}</Tag>
                {/* Score badge shown inline on mobile only */}
                <span className="rpt-mob-score" style={{ display:"none" }}><Tag color={score>=80?"green":score>=70?"amber":"red"} size="xs">{score}/100</Tag></span>
              </div>
              <div style={{ fontSize:12, color:"var(--slate-500)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{role} · {dur}</div>
            </div>
            {/* Persona — hidden on mobile, shown desktop */}
            <div className="rpt-cell-hide-mob" style={{ fontSize:12.5, color:"var(--slate-700)", fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", paddingRight:8 }}>{persona}</div>
            {/* Score — hidden on mobile (shown inline above) */}
            <div className="rpt-cell-hide-mob"><Tag color={score>=80?"green":score>=70?"amber":"red"} size="xs">{score}/100</Tag></div>
            {/* Date */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:12, color:"var(--slate-400)", whiteSpace:"nowrap" }}>{date.split(",")[0]}</span>
              {/* Persona shown on mobile below date */}
              <span style={{ fontSize:11, color:"var(--slate-500)", display:"none" }} className="rpt-mob-persona">{persona}</span>
            </div>
            <ChevronRight size={14} style={{ color:"var(--slate-200)" }} className="rpt-cell-hide-mob"/>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

/* ── Progress ── */
const Progress = () => {
  const W = [62,70,74,68,78,82,78];
  const D = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  return (
    <motion.div initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35 }}>
      <div style={{ marginBottom:28 }}>
        <h1 className="brig" style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:700, color:"var(--slate)", letterSpacing:"-0.03em" }}>Progress</h1>
        <p style={{ fontSize:14, color:"var(--slate-500)", marginTop:5 }}>Track your improvement over time.</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:14, marginBottom:24 }}>
        {[{ label:"Score Trend",value:"+6.2",sub:"vs last week",icon:<TrendingUp size={18}/>,color:"var(--green)" },{ label:"Sessions / Month",value:"11",sub:"of 40 used",icon:<Target size={18}/>,color:"var(--teal)" },{ label:"Top Skill",value:"Culture Fit",sub:"avg 85/100",icon:<Award size={18}/>,color:"#7C3AED" },{ label:"Needs Work",value:"STAR Method",sub:"avg 68/100",icon:<AlertCircle size={18}/>,color:"var(--amber)" }].map(({ label,value,sub,icon,color }) => (
          <div key={label} className="card card-lift" style={{ padding:"18px 20px" }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`${color}12`, display:"flex", alignItems:"center", justifyContent:"center", color, marginBottom:10 }}>{icon}</div>
            <div className="brig" style={{ fontSize:value.length>5?15:24, fontWeight:800, color:"var(--slate)", letterSpacing:"-0.01em", lineHeight:1.2 }}>{value}</div>
            <div style={{ fontSize:12, color:"var(--slate-500)", marginTop:2 }}>{label}</div>
            <div style={{ fontSize:11, color:"var(--slate-400)", marginTop:1 }}>{sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
        <div className="card" style={{ padding:26 }}>
          <div className="brig" style={{ fontSize:14, fontWeight:700, color:"var(--slate)", marginBottom:4 }}>Score This Week</div>
          <p style={{ fontSize:12, color:"var(--slate-500)", marginBottom:22 }}>Daily average across all sessions</p>
          <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:130 }}>
            {W.map((val,i) => (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                <span style={{ fontSize:10, fontWeight:700, color:i===6?"var(--teal)":"var(--slate-500)", fontFamily:"'Bricolage Grotesque',sans-serif" }}>{val}</span>
                <motion.div initial={{ height:0 }} animate={{ height:`${(val/100)*110}px` }} transition={{ duration:0.9,delay:i*0.07,ease:[0.25,1,0.5,1] }}
                  style={{ width:"100%", borderRadius:7, background:i===6?"var(--teal)":"var(--teal-light)", border:i===6?"none":"1px solid rgba(13,148,136,.2)", cursor:"default", transition:"transform 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.transform="scaleY(1.05)"}
                  onMouseLeave={e=>e.currentTarget.style.transform=""}/>
                <span style={{ fontSize:10, color:"var(--slate-400)" }}>{D[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding:26 }}>
          <div className="brig" style={{ fontSize:14, fontWeight:700, color:"var(--slate)", marginBottom:18 }}>Skill Averages</div>
          {[{ label:"Communication",value:82,color:"var(--teal)" },{ label:"Technical",value:74,color:"#0369A1" },{ label:"Confidence",value:79,color:"#7C3AED" },{ label:"Culture Fit",value:85,color:"var(--green)" },{ label:"STAR Method",value:68,color:"var(--amber)" }].map(m=><MetricBar key={m.label} {...m}/>)}
        </div>
      </div>

      {/* Monthly improvement chart */}
      <div className="card" style={{ padding:26, marginTop:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4, flexWrap:"wrap", gap:8 }}>
          <div>
            <div className="brig" style={{ fontSize:14, fontWeight:700, color:"var(--slate)", marginBottom:2 }}>Monthly Improvement</div>
            <p style={{ fontSize:12, color:"var(--slate-500)" }}>Average score per month over the last 6 months</p>
          </div>
          <Tag color="green" size="xs">+19 pts since Sep</Tag>
        </div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:150, marginTop:24 }}>
          {[
            { month:"Sep", val:59, hi:false },
            { month:"Oct", val:63, hi:false },
            { month:"Nov", val:68, hi:false },
            { month:"Dec", val:71, hi:false },
            { month:"Jan", val:74, hi:false },
            { month:"Feb", val:78, hi:true  },
          ].map(({ month, val, hi }, i) => (
            <div key={month} className="mth-bar">
              <span style={{ fontSize:11, fontWeight:700, color:hi?"var(--teal)":"var(--slate-500)", fontFamily:"'Bricolage Grotesque',sans-serif" }}>{val}</span>
              <motion.div
                className="mth-fill"
                initial={{ height:0 }}
                animate={{ height:`${(val/100)*120}px` }}
                transition={{ duration:0.85, delay:i*0.08, ease:[0.25,1,0.5,1] }}
                style={{
                  background: hi
                    ? "linear-gradient(180deg,var(--teal),var(--teal-dark))"
                    : "linear-gradient(180deg,var(--teal-light),rgba(204,251,241,.5))",
                  border: hi ? "none" : "1px solid rgba(13,148,136,.2)",
                }}
              />
              <span style={{ fontSize:10, color:"var(--slate-400)" }}>{month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interview History Table */}
      <div className="card" style={{ overflow:"hidden", marginTop:20 }}>
        <div style={{ padding:"15px 22px", borderBottom:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span className="brig" style={{ fontSize:14, fontWeight:700, color:"var(--slate)" }}>Interview History</span>
          <Tag color="slate" size="xs">Last 30 days</Tag>
        </div>
        <div className="phist-hdr">
          {["Role","Persona","Score","Date"].map((h,i)=><div key={i} style={{ fontSize:10.5, fontWeight:700, color:"var(--slate-400)", letterSpacing:"0.07em", textTransform:"uppercase" }}>{h}</div>)}
        </div>
        {[
          { role:"SWE L5 – Google",     persona:"⚡ Stress-Tester",    score:78, date:"Feb 21", sc:"var(--amber)" },
          { role:"SWE – Stripe",         persona:"😄 Friendly Peer",    score:82, date:"Feb 18", sc:"var(--green)" },
          { role:"PM – Meta",            persona:"🌸 Empath Listener",  score:74, date:"Feb 14", sc:"var(--amber)" },
          { role:"Analyst – Deloitte",   persona:"🗿 Stoic Veteran",    score:91, date:"Feb 9",  sc:"var(--green)" },
          { role:"Consultant – McKinsey",persona:"🎭 Devil's Advocate", score:69, date:"Feb 3",  sc:"var(--red)"   },
        ].map(({ role, persona, score, date, sc }, i, arr) => (
          <div key={i} className="phist-row"
            style={{ borderBottom:i<arr.length-1?"1px solid var(--border)":"none", cursor:"default" }}
            onMouseEnter={e=>e.currentTarget.style.background="var(--slate-50)"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div>
              <span className="brig" style={{ fontSize:13.5, fontWeight:700, color:"var(--slate)" }}>{role}</span>
              {/* Mobile: show persona below role */}
              <div style={{ fontSize:11, color:"var(--slate-500)", marginTop:2 }} className="phist-mob-sub">{persona} · <span style={{ fontWeight:700, color:sc }}>{score}/100</span></div>
            </div>
            <span style={{ fontSize:13, color:"var(--slate-600)" }} className="phist-desk">{persona}</span>
            <span style={{ fontSize:13, fontWeight:700, color:sc }} className="phist-desk">{score}/100</span>
            <span style={{ fontSize:12, color:"var(--slate-400)" }}>{date}</span>
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

  const DIFF_ORDER = { "Deceptive":1, "Medium":2, "Hard":3, "Psychological":3, "Brutal":4 };

  return (
    <motion.div initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35 }} style={{ position:"relative" }}>
      <AnimatePresence>
        {showCountdown && selected && (
          <CountdownModal
            persona={selected}
            onStart={()=>{ setShowCountdown(false); if(onSelectPersona) onSelectPersona(selected); onNav("interview"); }}
            onCancel={()=>setShowCountdown(false)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <h1 className="brig" style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:700, color:"var(--slate)", letterSpacing:"-0.03em" }}>
          Interviewer Personas
        </h1>
        <p style={{ fontSize:14, color:"var(--slate-500)", marginTop:5, maxWidth:560 }}>
          Real interviews aren't just about what you know — they're about who's asking. Train against 6 distinct behavioral archetypes.
        </p>
      </div>

      {/* Upgrade banner */}
      <div className="card-interactive" onClick={()=>onUpgrade("Elite")} style={{ background:"var(--amber-light)", border:"1px solid rgba(217,119,6,.25)", borderRadius:13, padding:"14px 18px", display:"flex", gap:12, alignItems:"center", marginBottom:28, flexWrap:"wrap" }}>
        <Zap size={16} style={{ color:"var(--amber)", flexShrink:0 }}/>
        <span style={{ fontSize:13.5, fontWeight:600, color:"var(--amber)", flex:1, lineHeight:1.4 }}>
          Pro Plan: 3 of 6 personas unlocked. Upgrade to Elite to train against all personality archetypes.
        </span>
        <button className="btn-secondary" style={{ fontSize:12, padding:"7px 14px", whiteSpace:"nowrap" }} onClick={e=>{e.stopPropagation();onUpgrade("Elite");}}>
          <ArrowUpRight size={13}/> Upgrade to Elite
        </button>
      </div>

      {/* Persona grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:18, marginBottom:32 }}>
        {PERSONAS.map((p, idx) => {
          const locked = idx >= 3; // starter=1 unlocked, pro=3 unlocked
          const active = sel === p.id && !locked;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.35, delay:idx*0.06 }}
              onClick={()=>!locked && setSel(p.id)}
              style={{
                borderRadius:18, overflow:"hidden",
                border:`1.5px solid ${active ? p.accentColor+"80" : "var(--border)"}`,
                background: locked ? "var(--slate-50)" : "var(--white)",
                cursor: locked ? "not-allowed" : "pointer",
                opacity: locked ? 0.58 : 1,
                transition:"all 0.25s ease",
                position:"relative",
                boxShadow: active ? `0 0 0 4px ${p.accentColor}18, var(--shadow-md)` : "var(--shadow-sm)",
              }}
              onMouseEnter={e=>{ if(!locked&&!active){ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="var(--shadow-lg)"; } }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=active?`0 0 0 4px ${p.accentColor}18, var(--shadow-md)`:"var(--shadow-sm)"; }}>

              {/* Color band header */}
              <div style={{ height:6, background:`linear-gradient(90deg, ${p.accentColor}, ${p.accentColor}88)` }}/>

              <div style={{ padding:"20px 22px 22px" }}>
                {/* Top row: emoji avatar + lock/check */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                  <div style={{ position:"relative" }}>
                    {/* Emoji in gradient circle */}
                    <div style={{
                      width:62, height:62, borderRadius:"50%",
                      background:`linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})`,
                      border:`2px solid ${p.accentColor}30`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:28,
                      boxShadow:`0 4px 14px ${p.accentColor}20`,
                      transition:"transform 0.25s",
                    }}
                      onMouseEnter={e=>{ if(!locked) e.currentTarget.style.transform="scale(1.1)"; }}
                      onMouseLeave={e=>e.currentTarget.style.transform=""}>
                      {p.emoji}
                    </div>
                    {/* Online indicator dot */}
                    {!locked && (
                      <div style={{ position:"absolute", bottom:2, right:2, width:13, height:13, borderRadius:"50%", background:active?"var(--teal)":"var(--slate-300)", border:"2px solid var(--white)", transition:"background 0.2s" }}/>
                    )}
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
                    {locked && (
                      <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                        <Lock size={11} style={{ color:"var(--slate-400)" }}/>
                        <Tag color="amber" size="xs">Elite</Tag>
                      </div>
                    )}
                    {active && (
                      <div style={{ width:24, height:24, borderRadius:"50%", background:"var(--teal)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(13,148,136,.4)" }}>
                        <Check size={13} color="#fff" strokeWidth={3}/>
                      </div>
                    )}
                    {/* Difficulty badge */}
                    <div style={{ background:p.diffBg, color:p.diffColor, fontSize:10.5, fontWeight:700, padding:"3px 10px", borderRadius:20, letterSpacing:"0.04em", border:`1px solid ${p.accentColor}28`, whiteSpace:"nowrap" }}>
                      {p.difficulty}
                    </div>
                  </div>
                </div>

                {/* Name + handle */}
                <div className="brig" style={{ fontSize:17, fontWeight:700, color:"var(--slate)", letterSpacing:"-0.015em", marginBottom:2 }}>{p.title}</div>
                <div style={{ fontSize:12, color:p.accentColor, fontWeight:600, marginBottom:10 }}>{p.style}</div>

                {/* Vibe description */}
                <p style={{ fontSize:13, color:"var(--slate-500)", lineHeight:1.65, marginBottom:14 }}>{p.vibe}</p>

                {/* Trait pills */}
                <div style={{ height:1, background:"var(--border)", marginBottom:14 }}/>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {p.traits.map(t => (
                    <span key={t} style={{ fontSize:11, color:"var(--slate-600)", background:"var(--slate-100)", padding:"3px 9px", borderRadius:12, fontWeight:500, border:"1px solid var(--border)", whiteSpace:"nowrap" }}>{t}</span>
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
          <motion.div key={selected.id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.3 }}
            style={{ background:"var(--slate)", borderRadius:18, padding:"clamp(18px,4vw,28px) clamp(16px,5vw,32px)", boxShadow:"var(--shadow-xl)", border:"1px solid rgba(255,255,255,.05)", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:"-30%", right:"-5%", width:400, height:350, background:`radial-gradient(ellipse,${selected.accentColor}22 0%,transparent 65%)`, pointerEvents:"none" }}/>
            <div style={{ position:"relative", zIndex:1, display:"flex", gap:20, alignItems:"flex-start", flexWrap:"wrap" }}>
              <div style={{ width:56, height:56, borderRadius:"50%", background:`linear-gradient(135deg,${selected.gradientFrom}30,${selected.gradientTo}20)`, border:`2px solid ${selected.accentColor}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>
                {selected.emoji}
              </div>
              <div style={{ flex:1, minWidth:220 }}>
                <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:6, flexWrap:"wrap" }}>
                  <span className="brig" style={{ fontSize:20, fontWeight:700, color:"#fff", letterSpacing:"-0.02em" }}>{selected.title}</span>
                  <span style={{ fontSize:12, color:`${selected.accentColor}CC`, fontWeight:600 }}>{selected.style}</span>
                  <span style={{ background:selected.diffBg, color:selected.diffColor, fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:14, border:`1px solid ${selected.accentColor}30` }}>{selected.difficulty}</span>
                </div>
                <p style={{ fontSize:14, color:"rgba(255,255,255,.6)", lineHeight:1.7, maxWidth:600 }}>{selected.vibe}</p>
              </div>
              <button className="btn-primary" style={{ fontSize:13, padding:"11px 22px", flexShrink:0 }}
                onClick={()=>setShowCountdown(true)}>
                <Zap size={14}/> Practice with this persona
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
  const [notifs, setNotifs] = useState({ email:true, weekly:true, tips:false });
  const save = () => { setSaved(true); setTimeout(()=>setSaved(false),2500); };
  const Toggle = ({ k }) => (
    <div onClick={()=>setNotifs(n=>({...n,[k]:!n[k]}))}
      style={{ width:44, height:24, borderRadius:12, background:notifs[k]?"var(--teal)":"var(--slate-200)", cursor:"pointer", position:"relative", transition:"background 0.22s", flexShrink:0 }}>
      <motion.div animate={{ left:notifs[k]?22:2 }} transition={{ duration:0.22, ease:"easeInOut" }}
        style={{ position:"absolute", top:2, width:20, height:20, borderRadius:"50%", background:"#fff", boxShadow:"0 1px 4px rgba(0,0,0,.18)" }}/>
    </div>
  );
  return (
    <motion.div initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35 }}>
      <div style={{ marginBottom:28 }}>
        <h1 className="brig" style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:700, color:"var(--slate)", letterSpacing:"-0.03em" }}>Settings</h1>
        <p style={{ fontSize:14, color:"var(--slate-500)", marginTop:5 }}>Manage your account, billing, and preferences.</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:18, maxWidth:680 }}>
        <div className="card" style={{ padding:26 }}>
          <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:20 }}>
            <div style={{ width:32, height:32, borderRadius:9, background:"var(--teal-light)", display:"flex", alignItems:"center", justifyContent:"center" }}><UserCircle size={17} style={{ color:"var(--teal)" }}/></div>
            <div className="brig" style={{ fontSize:15, fontWeight:700, color:"var(--slate)" }}>Profile</div>
          </div>
          <div className="config-grid">
            <div><label>First Name</label><input defaultValue="Alex"/></div>
            <div><label>Last Name</label><input defaultValue="Johnson"/></div>
            <div style={{ gridColumn:"1 / -1" }}><label>Email Address</label><input defaultValue="alex@example.com"/></div>
          </div>
        </div>
        <div className="card" style={{ padding:26 }}>
          <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:20 }}>
            <div style={{ width:32, height:32, borderRadius:9, background:"var(--teal-light)", display:"flex", alignItems:"center", justifyContent:"center" }}><Bell size={17} style={{ color:"var(--teal)" }}/></div>
            <div className="brig" style={{ fontSize:15, fontWeight:700, color:"var(--slate)" }}>Notifications</div>
          </div>
          {[{ k:"email",label:"Email reminders",desc:"Remind me to practice before scheduled interviews" },{ k:"weekly",label:"Weekly progress digest",desc:"A weekly summary of my improvement" },{ k:"tips",label:"Interview tips & articles",desc:"Occasional coaching tips from our team" }].map(({ k,label,desc }) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"13px 0", borderBottom:"1px solid var(--border)", gap:16 }}>
              <div><div style={{ fontSize:14, fontWeight:500, color:"var(--slate)" }}>{label}</div><div style={{ fontSize:12, color:"var(--slate-500)", marginTop:2 }}>{desc}</div></div>
              <Toggle k={k}/>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding:26 }}>
          <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:20 }}>
            <div style={{ width:32, height:32, borderRadius:9, background:"var(--teal-light)", display:"flex", alignItems:"center", justifyContent:"center" }}><CreditCard size={17} style={{ color:"var(--teal)" }}/></div>
            <div className="brig" style={{ fontSize:15, fontWeight:700, color:"var(--slate)" }}>Plan & Billing</div>
          </div>
          <div style={{ background:"var(--teal-light)", border:"1px solid rgba(13,148,136,.2)", borderRadius:12, padding:"18px 20px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10 }}>
              <div>
                <div className="brig" style={{ fontSize:18, fontWeight:700, color:"var(--slate)", letterSpacing:"-0.02em" }}>Pro Plan</div>
                <div style={{ fontSize:13, color:"var(--slate-600)", marginTop:3 }}>23 / 40 interviews · 9 / 10 rechecks</div>
              </div>
              <button className="btn-secondary" onClick={()=>onUpgrade("Elite")} style={{ fontSize:13 }}><ArrowUpRight size={14}/> Upgrade to Elite</button>
            </div>
            <div style={{ height:5, background:"rgba(13,148,136,.15)", borderRadius:3, marginTop:16, overflow:"hidden" }}>
              <div style={{ width:"57.5%", height:"100%", background:"var(--teal)", borderRadius:3 }}/>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
              <span style={{ fontSize:11, color:"var(--teal-dark)", fontWeight:600 }}>23 used</span>
              <span style={{ fontSize:11, color:"var(--slate-500)" }}>17 remaining</span>
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
          <button className="btn-primary" onClick={save} style={{ fontSize:14 }}>
            {saved ? <><Check size={15}/> Saved!</> : "Save Changes"}
          </button>
          <AnimatePresence>
            {saved && (
              <motion.span initial={{ opacity:0,x:-6 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0 }}
                style={{ fontSize:13, color:"var(--green)", fontWeight:600, display:"flex", alignItems:"center", gap:5 }}>
                <Check size={14}/> Changes saved successfully
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
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      style={{ position:"fixed", inset:0, background:"rgba(9,17,34,.88)", backdropFilter:"blur(16px)", zIndex:500, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:32 }}>
      {/* Persona avatar */}
      <motion.div initial={{ scale:0.7, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.5, ease:[0.16,1,0.3,1] }} style={{ textAlign:"center" }}>
        <div style={{ width:90, height:90, borderRadius:"50%", background:`linear-gradient(135deg,${persona.gradientFrom}50,${persona.gradientTo}50)`, border:`3px solid ${persona.accentColor}60`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:44, margin:"0 auto 16px", boxShadow:`0 0 48px ${persona.accentColor}40` }}>
          {persona.emoji}
        </div>
        <div className="brig" style={{ fontSize:22, fontWeight:700, color:"#fff", letterSpacing:"-0.02em" }}>{persona.title}</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,.5)", marginTop:5 }}>is ready for your interview</div>
      </motion.div>

      {/* Countdown ring */}
      <motion.div key={count} initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ position:"relative", width:110, height:110 }}>
        <svg width="110" height="110" style={{ transform:"rotate(-90deg)" }}>
          <circle cx="55" cy="55" r={RADIUS} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="5"/>
          <circle cx="55" cy="55" r={RADIUS} fill="none" stroke={count===0?"var(--teal)":persona.accentColor||"var(--teal)"}
            strokeWidth="5" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset="0"
            style={{ animation:`countdown-shrink 1s linear forwards` }}/>
        </svg>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          {count === 0
            ? <Zap size={36} color="var(--teal-mid)" strokeWidth={2}/>
            : <span className="brig" style={{ fontSize:48, fontWeight:800, color:"#fff", letterSpacing:"-0.04em", lineHeight:1 }}>{count}</span>
          }
        </div>
      </motion.div>

      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.55)", marginBottom:4 }}>
          {count === 0 ? "Starting now…" : "Get ready to answer"}
        </div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,.3)" }}>💡 Tip: Use STAR — Situation, Task, Action, Result</div>
      </div>

      <button onClick={onCancel} className="btn-ghost" style={{ color:"rgba(255,255,255,.35)", fontSize:13 }}>Cancel</button>
    </motion.div>
  );
};

/* ── Code Editor Panel ── */
const CODE_QUESTIONS = [
  {
    id:1,
    title:"Two Sum",
    difficulty:"Easy",
    diffColor:"#16A34A",
    tags:["Array","Hash Table"],
    prompt:`Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

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
    hint:"Consider using a hash map to track seen numbers for O(n) time complexity.",
  },
  {
    id:2,
    title:"Valid Parentheses",
    difficulty:"Medium",
    diffColor:"#D97706",
    tags:["String","Stack"],
    prompt:`Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

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
    hint:"Use a stack — push open brackets, pop when you see a matching close bracket.",
  },
];

const LANGS = ["Python","JavaScript","Java","C++","TypeScript"];
const LANG_COMMENT = { Python:"# ", JavaScript:"// ", Java:"// ", "C++":"// ", TypeScript:"// " };
const LANG_COLORS  = { Python:"#3B82F6", JavaScript:"#F59E0B", Java:"#DC2626", "C++":"#7C3AED", TypeScript:"#0EA5E9" };

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
      const results = codeQ.id===1
        ? "✅ Test 1 passed: [0, 1]\n✅ Test 2 passed: [1, 2]\n\n⏱ Runtime: 48ms · Memory: 14.3 MB\n🎯 Time Complexity: O(n) · Space: O(n)"
        : "✅ Test 1 passed: True\n✅ Test 2 passed: False\n\n⏱ Runtime: 32ms · Memory: 13.8 MB\n🎯 Time Complexity: O(n) · Space: O(n)";
      setOutput(results); setRunning(false);
    }, 1400);
  };
  const submitCode = () => { setRunning(true); setTimeout(() => { setSubmitted(true); setRunning(false); setOutput("🏆 All test cases passed!\n\n✅ 72/72 test cases\n⏱ Runtime beats 94% of solutions\n📦 Memory beats 87% of solutions"); }, 1800); };

  return (
    <div className="code-panel-grid">
      {/* ── Question Panel ── */}
      <div style={{ borderRight:"1px solid rgba(255,255,255,.08)", display:"flex", flexDirection:"column", overflowY:"auto", background:"rgba(0,0,0,.2)" }}>
        {/* Question selector */}
        <div style={{ padding:"12px 16px", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", gap:8 }}>
          {CODE_QUESTIONS.map((q,i) => (
            <button key={q.id} onClick={()=>{ setCodeQ(i); setCode(q.starterCode); setOutput(""); setSubmitted(false); }}
              style={{ flex:1, padding:"7px 10px", borderRadius:9, border:`1.5px solid ${codeQ===i?"var(--teal)":"rgba(255,255,255,.1)"}`, background:codeQ===i?"rgba(13,148,136,.18)":"transparent", color:codeQ===i?"var(--teal-mid)":"rgba(255,255,255,.5)", fontSize:11, fontWeight:700, cursor:"pointer", transition:"all 0.2s", fontFamily:"'DM Sans',sans-serif" }}>
              Q{q.id}: {q.title}
            </button>
          ))}
        </div>
        {/* Problem statement */}
        <div style={{ padding:"16px", flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
            <span className="brig" style={{ fontSize:15, fontWeight:700, color:"rgba(255,255,255,.9)" }}>{cq.title}</span>
            <span style={{ fontSize:10, fontWeight:700, color:cq.diffColor, background:`${cq.diffColor}22`, border:`1px solid ${cq.diffColor}44`, borderRadius:6, padding:"2px 7px" }}>{cq.difficulty}</span>
          </div>
          <div style={{ display:"flex", gap:5, marginBottom:14 }}>
            {cq.tags.map(t => <span key={t} style={{ fontSize:10, background:"rgba(255,255,255,.07)", color:"rgba(255,255,255,.5)", borderRadius:5, padding:"2px 7px" }}>{t}</span>)}
          </div>
          <pre style={{ fontSize:12, color:"rgba(255,255,255,.65)", lineHeight:1.7, whiteSpace:"pre-wrap", fontFamily:"'DM Sans',sans-serif" }}>{cq.prompt}</pre>
          {/* Hint */}
          <div style={{ marginTop:16, background:"rgba(13,148,136,.1)", border:"1px solid rgba(13,148,136,.2)", borderRadius:10, padding:"10px 12px" }}>
            <div style={{ fontSize:10, fontWeight:700, color:"var(--teal-mid)", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:5 }}>💡 Hint</div>
            <p style={{ fontSize:11.5, color:"rgba(255,255,255,.55)", lineHeight:1.6 }}>{cq.hint}</p>
          </div>
          {/* Interviewer sees this */}
          <div style={{ marginTop:16 }}>
            <button onClick={()=>setShowInterviewerView(v=>!v)}
              style={{ width:"100%", padding:"9px 12px", borderRadius:10, border:"1px solid rgba(255,255,255,.1)", background:"rgba(255,255,255,.04)", color:"rgba(255,255,255,.5)", fontSize:11, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.08)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.04)"}>
              <span>👀 Interviewer View</span>
              <span style={{ fontSize:12 }}>{showInterviewerView?"▲":"▼"}</span>
            </button>
            <AnimatePresence>
              {showInterviewerView && (
                <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.3 }}
                  style={{ overflow:"hidden" }}>
                  <div style={{ marginTop:8, background:"rgba(124,58,237,.1)", border:"1px solid rgba(124,58,237,.2)", borderRadius:10, padding:"12px 14px" }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#C4B5FD", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:8 }}>🎯 Interviewer Can See</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                      {[`Language: ${lang}`,`Lines written: ${lineCount}`,`Last edit: just now`,running?"⏳ Running code…":submitted?"✅ Submitted":"📝 In progress"].map(item => (
                        <div key={item} style={{ fontSize:11, color:"rgba(200,180,255,.75)", display:"flex", gap:6, alignItems:"center" }}>
                          <div style={{ width:4, height:4, borderRadius:"50%", background:"#A78BFA", flexShrink:0 }}/>
                          {item}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop:10, padding:"8px 10px", background:"rgba(0,0,0,.25)", borderRadius:7, fontFamily:"monospace", fontSize:10, color:"rgba(200,180,255,.6)", lineHeight:1.55, maxHeight:80, overflow:"hidden" }}>
                      {code.slice(0,180)}{code.length>180?"…":""}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Editor + Output Panel ── */}
      <div style={{ display:"flex", flexDirection:"column", minHeight:0 }}>
        {/* Editor Toolbar */}
        <div style={{ padding:"10px 16px", borderBottom:"1px solid rgba(255,255,255,.07)", display:"flex", alignItems:"center", gap:10, flexShrink:0, background:"rgba(0,0,0,.15)" }}>
          <div style={{ display:"flex", gap:5 }}>
            {LANGS.map(l => (
              <button key={l} onClick={()=>handleLangChange(l)}
                style={{ padding:"5px 10px", borderRadius:7, border:`1.5px solid ${lang===l?LANG_COLORS[l]:"rgba(255,255,255,.1)"}`, background:lang===l?`${LANG_COLORS[l]}22`:"transparent", color:lang===l?LANG_COLORS[l]:"rgba(255,255,255,.4)", fontSize:11, fontWeight:700, cursor:"pointer", transition:"all 0.2s", fontFamily:"'DM Sans',sans-serif" }}>
                {l}
              </button>
            ))}
          </div>
          <div style={{ flex:1 }}/>
          <span style={{ fontSize:10, color:"rgba(255,255,255,.25)", fontFamily:"monospace" }}>{lineCount} lines</span>
          <button onClick={runCode} disabled={running}
            style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:8, border:"none", background:running?"rgba(255,255,255,.1)":"rgba(13,148,136,.85)", color:"#fff", fontSize:12, fontWeight:700, cursor:running?"not-allowed":"pointer", transition:"all 0.2s", fontFamily:"'DM Sans',sans-serif" }}
            onMouseEnter={e=>!running&&(e.currentTarget.style.background="rgba(13,148,136,1)")}
            onMouseLeave={e=>!running&&(e.currentTarget.style.background="rgba(13,148,136,.85)")}>
            {running ? <><span className="spin"><RefreshCw size={12}/></span> Running…</> : "▶ Run Code"}
          </button>
          <button onClick={submitCode} disabled={running||submitted}
            style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:8, border:"none", background:submitted?"rgba(22,163,74,.3)":running?"rgba(255,255,255,.05)":"rgba(22,163,74,.85)", color:submitted?"#86EFAC":"#fff", fontSize:12, fontWeight:700, cursor:(running||submitted)?"not-allowed":"pointer", transition:"all 0.2s", fontFamily:"'DM Sans',sans-serif" }}>
            {submitted ? <><Check size={12}/> Submitted</> : "Submit"}
          </button>
        </div>
        {/* Code Editor */}
        <div style={{ flex:1, position:"relative", minHeight:0, overflow:"hidden" }}>
          <textarea value={code} onChange={e=>handleCodeChange(e.target.value)}
            spellCheck={false} autoComplete="off" autoCorrect="off"
            onKeyDown={e => {
              if (e.key === "Tab") {
                e.preventDefault();
                const el = e.target;
                const s = el.selectionStart, end = el.selectionEnd;
                const newVal = el.value.slice(0,s) + "  " + el.value.slice(end);
                el.value = newVal;
                el.selectionStart = el.selectionEnd = s + 2;
                handleCodeChange(newVal);
              }
              const pairs = {"(":")","{":"}","[":"]"};
              if (pairs[e.key] && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                const el = e.target;
                const s = el.selectionStart;
                const newVal = el.value.slice(0,s) + e.key + pairs[e.key] + el.value.slice(el.selectionEnd);
                el.value = newVal;
                el.selectionStart = el.selectionEnd = s + 1;
                handleCodeChange(newVal);
              }
            }}
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", background:"#0D1117", color:"#C9D1D9", fontFamily:"'JetBrains Mono','Fira Code',monospace", fontSize:13, lineHeight:1.7, padding:"20px 20px 20px 56px", border:"none", outline:"none", resize:"none", whiteSpace:"pre", overflowWrap:"normal", overflowX:"auto", boxSizing:"border-box", tabSize:2 }}/>
          {/* Line numbers */}
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:48, background:"#0D1117", borderRight:"1px solid rgba(255,255,255,.06)", padding:"20px 0", display:"flex", flexDirection:"column", alignItems:"flex-end", paddingRight:8, pointerEvents:"none", overflow:"hidden" }}>
            {Array.from({length:Math.max(lineCount,20)},(_,i) => (
              <div key={i} style={{ fontSize:11, color:"rgba(255,255,255,.2)", lineHeight:"22.1px", fontFamily:"monospace", minHeight:"22.1px" }}>{i+1}</div>
            ))}
          </div>
        </div>
        {/* Output Console */}
        <AnimatePresence>
          {(output || running) && (
            <motion.div initial={{ height:0 }} animate={{ height:140 }} exit={{ height:0 }} transition={{ duration:0.3 }}
              style={{ borderTop:"1px solid rgba(255,255,255,.08)", background:"#0A0E17", overflow:"hidden", flexShrink:0 }}>
              <div style={{ padding:"8px 16px", borderBottom:"1px solid rgba(255,255,255,.05)", display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,.3)", letterSpacing:"0.08em", textTransform:"uppercase" }}>Output Console</span>
                {submitted && <span style={{ fontSize:10, background:"rgba(22,163,74,.25)", color:"#86EFAC", borderRadius:4, padding:"1px 6px", fontWeight:700 }}>Accepted</span>}
              </div>
              <div style={{ padding:"10px 16px", fontFamily:"monospace", fontSize:12, color:submitted?"#86EFAC":"rgba(255,255,255,.7)", lineHeight:1.7, whiteSpace:"pre" }}>
                {running ? <span style={{ color:"rgba(255,255,255,.4)" }}>Running…</span> : output}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ── Interview Loading Screen ── */
const InterviewLoading = ({ persona, onReady }) => {
  const [step, setStep] = useState(0);
  const [dots, setDots] = useState(".");
  const STEPS = [
    { icon:"🎙", label:"Initialising AI interviewer…" },
    { icon:"📋", label:"Loading your interview profile…" },
    { icon:"🔒", label:"Securing the session…" },
    { icon:"✅", label:"Everything is ready!" },
  ];
  useEffect(() => {
    const dotsT = setInterval(() => setDots(d => d.length >= 3 ? "." : d + "."), 480);
    const stepT = setInterval(() => setStep(s => s < STEPS.length - 1 ? s + 1 : s), 900);
    const doneT = setTimeout(() => { clearInterval(dotsT); clearInterval(stepT); onReady(); }, 3800);
    return () => { clearInterval(dotsT); clearInterval(stepT); clearTimeout(doneT); };
  }, [onReady]);
  const p = persona || { emoji:"⚡", title:"The Stress-Tester", handle:"@rex" };
  return (
    <div style={{ position:"fixed", inset:0, background:"var(--slate)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:300, gap:0 }}>
      {/* Background gradient blobs */}
      <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
        <div style={{ position:"absolute", top:"15%", left:"20%", width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle, rgba(13,148,136,.12) 0%, transparent 70%)", filter:"blur(60px)" }}/>
        <div style={{ position:"absolute", bottom:"20%", right:"15%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(124,58,237,.1) 0%, transparent 70%)", filter:"blur(50px)" }}/>
      </div>
      {/* Logo */}
      <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
        style={{ position:"absolute", top:28, left:32 }}>
        <Logo light />
      </motion.div>
      {/* Persona avatar */}
      <motion.div initial={{ scale:0.6, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.55, type:"spring", stiffness:240, damping:18 }}
        style={{ width:96, height:96, borderRadius:"50%", background:"linear-gradient(135deg,var(--teal-dark),var(--teal-mid))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:40, marginBottom:28, boxShadow:"0 0 0 0 rgba(13,148,136,.5)", position:"relative" }}>
        {/* Pulse ring */}
        <motion.div animate={{ scale:[1,1.45,1], opacity:[0.6,0,0.6] }} transition={{ duration:2.2, repeat:Infinity, ease:"easeOut" }}
          style={{ position:"absolute", inset:-6, borderRadius:"50%", border:"2px solid rgba(13,148,136,.5)" }}/>
        <span>{p.emoji}</span>
      </motion.div>
      {/* Interviewer name */}
      <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.25 }}
        style={{ textAlign:"center", marginBottom:36 }}>
        <div className="brig" style={{ fontSize:22, fontWeight:800, color:"#fff", letterSpacing:"-0.02em", marginBottom:4 }}>
          {p.title}
        </div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,.4)", fontFamily:"'JetBrains Mono',monospace" }}>{p.handle}</div>
      </motion.div>
      {/* Step list */}
      <div style={{ display:"flex", flexDirection:"column", gap:10, width:"100%", maxWidth:320, marginBottom:40 }}>
        {STEPS.map((s,i) => (
          <motion.div key={i} initial={{ opacity:0, x:-14 }} animate={{ opacity: i <= step ? 1 : 0.22, x:0 }} transition={{ delay: i*0.12, duration:0.38 }}
            style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 18px", borderRadius:12, background: i === step ? "rgba(13,148,136,.15)" : "rgba(255,255,255,.03)", border:`1px solid ${i===step?"rgba(13,148,136,.35)":"rgba(255,255,255,.05)"}`, transition:"all 0.3s" }}>
            <span style={{ fontSize:16 }}>{s.icon}</span>
            <span style={{ fontSize:13.5, color: i < step ? "rgba(255,255,255,.5)" : i===step ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.25)", fontWeight: i===step?600:400, fontFamily:"'DM Sans',sans-serif", flex:1 }}>
              {s.label}{i===step ? dots : ""}
            </span>
            {i < step && <Check size={14} color="var(--teal-mid)" strokeWidth={3}/>}
            {i === step && <div className="spin" style={{ width:14, height:14, border:"2px solid rgba(13,148,136,.3)", borderTop:"2px solid var(--teal-mid)", borderRadius:"50%" }}/>}
          </motion.div>
        ))}
      </div>
      {/* Bottom tip */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}
        style={{ fontSize:12, color:"rgba(255,255,255,.22)", textAlign:"center", maxWidth:280 }}>
        Tip: Press <kbd style={{ background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.15)", borderRadius:4, padding:"1px 6px", fontSize:11, fontFamily:"'JetBrains Mono',monospace" }}>Space</kbd> to mute · <kbd style={{ background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.15)", borderRadius:4, padding:"1px 6px", fontSize:11, fontFamily:"'JetBrains Mono',monospace" }}>→</kbd> next question · <kbd style={{ background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.15)", borderRadius:4, padding:"1px 6px", fontSize:11, fontFamily:"'JetBrains Mono',monospace" }}>Esc</kbd> end
      </motion.div>
    </div>
  );
};

/* ── Interview Room ── */
const InterviewRoom = ({ onNav, persona }) => {
  const [muted,   setMuted]   = useState(false);
  const [vidOff,  setVidOff]  = useState(false);
  const [qIdx,    setQIdx]    = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [ending,  setEnding]  = useState(false);
  const [pipMin,  setPipMin]  = useState(false);
  const [notes,   setNotes]   = useState("");
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
      if (e.code === "Space")      { e.preventDefault(); setMuted(m=>!m); }
      if (e.code === "ArrowRight") { setQIdx(q => Math.min(q+1, QUESTIONS.length-1)); }
      if (e.code === "Escape")     { setEnding(true); }
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
      ? `${h}:${String(m).padStart(2,"0")}:${String(secs).padStart(2,"0")}`
      : `${String(m).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
  };

  const TRANSCRIPT = [
    { speaker:"Interviewer", text: QUESTIONS[0], ts:"0:12" },
    { speaker:"You",         text:"Thanks for that context. So in my previous role at a fintech startup, we faced a similar distributed systems challenge when our user base grew 8x in six months...", ts:"0:48" },
    { speaker:"Interviewer", text:"Interesting. And how did you specifically handle the latency spikes during peak load?", ts:"1:22" },
    ...(qIdx > 0 ? [{ speaker:"Interviewer", text: QUESTIONS[Math.min(qIdx, QUESTIONS.length-1)], ts:`${Math.floor(elapsed/60)}:${String(elapsed%60).padStart(2,"0")}` }] : []),
  ];

  if (roomLoading) {
    return <InterviewLoading persona={activePersona} onReady={handleRoomReady} />;
  }

  return (
    <div className="int-room">

      {/* ── TOP BAR ─────────────────────────────────────────────────── */}
      <div className="int-topbar">

        {/* Logo — hidden on phone via .int-topbar-logo */}
        <div className="int-topbar-logo">
          <Logo onClick={()=>onNav("landing")} light/>
        </div>

        {/* Persona emoji + name (always visible) */}
        <div className="int-topbar-persona-info">
          <span style={{ fontSize:18, lineHeight:1 }}>{activePersona.emoji}</span>
          <span style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,.8)", whiteSpace:"nowrap" }}
            className="int-topbar-logo">{activePersona.title}</span>
        </div>

        <div style={{ flex:1, minWidth:0 }}/>

        {/* Persona pill — hides at 1100px */}
        <div className="int-topbar-persona">
          <span style={{ fontSize:11, fontWeight:600, color:"rgba(255,255,255,.75)" }}>{activePersona.style}</span>
          <span style={{ width:1, height:12, background:"rgba(255,255,255,.15)", flexShrink:0 }}/>
          <span style={{ fontSize:11, fontWeight:700, color:activePersona.diffColor || "#FCA5A5" }}>{activePersona.difficulty}</span>
        </div>

        {/* Q progress dots — hides at 860px */}
        <div className="int-topbar-qprog">
          {QUESTIONS.map((_,i) => (
            <div key={i} onClick={()=>setQIdx(i)} style={{ width:i===qIdx?22:8, height:8, borderRadius:4, background:i===qIdx?"var(--teal)":i<qIdx?"rgba(20,184,166,.45)":"rgba(255,255,255,.15)", transition:"all 0.3s ease", cursor:"pointer", flexShrink:0 }}/>
          ))}
          <span style={{ fontSize:11, color:"rgba(255,255,255,.4)", marginLeft:4, whiteSpace:"nowrap" }}>Q{qIdx+1}/{QUESTIONS.length}</span>
        </div>

        {/* Divider */}
        <div className="int-topbar-divider"/>

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
        <div className="int-topbar-divider"/>

        {/* Enhanced timer */}
        <div className="int-topbar-timer" style={{
          display:"flex", alignItems:"center", gap:8,
          background: elapsed > 2700 ? "rgba(220,38,38,.25)" : elapsed > 1800 ? "rgba(217,119,6,.2)" : "rgba(13,148,136,.15)",
          border: `1px solid ${elapsed > 2700 ? "rgba(220,38,38,.5)" : elapsed > 1800 ? "rgba(217,119,6,.45)" : "rgba(13,148,136,.35)"}`,
          borderRadius:22, padding:"5px 14px", flexShrink:0, transition:"all 1s ease",
        }}>
          {/* Animated dot */}
          <div style={{
            width:7, height:7, borderRadius:"50%", flexShrink:0,
            background: elapsed > 2700 ? "var(--red)" : elapsed > 1800 ? "var(--amber)" : "var(--teal-mid)",
            animation: "dot-pulse 1.8s ease-in-out infinite",
          }}/>
          {/* Time display */}
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:14, fontWeight:700, color: elapsed > 2700 ? "#FCA5A5" : elapsed > 1800 ? "#FDE68A" : "rgba(255,255,255,.9)", letterSpacing:"0.04em" }}>
            {fmt(elapsed)}
          </span>
          {/* Phase label */}
          <span className="int-topbar-timer-phase" style={{ fontSize:10, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color: elapsed > 2700 ? "rgba(252,165,165,.7)" : elapsed > 1800 ? "rgba(253,230,138,.7)" : "rgba(255,255,255,.4)", marginLeft:2 }}>
            {elapsed > 2700 ? "⚠ OVERTIME" : elapsed > 1800 ? "WRAPPING UP" : elapsed > 900 ? "IN PROGRESS" : "STARTING"}
          </span>
        </div>

        {/* End button */}
        <button onClick={()=>setEnding(true)} className="btn-danger" style={{ fontSize:13, padding:"8px 16px", borderRadius:22, flexShrink:0 }}>
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
        <motion.div key="code" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration:0.3 }}
          style={{ flex:1, display:"flex", minHeight:0, overflow:"hidden" }}>
          <CodePanel activePersona={activePersona} qIdx={qIdx} elapsed={elapsed}/>
        </motion.div>
      ) : (
      <motion.div key="interview" initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:20 }} transition={{ duration:0.3 }}
        className="int-body" style={{ flex:1, minHeight:0, overflow:"hidden" }}>

        {/* ── LEFT: Main video + captions ── */}
        <div className="int-main">

          {/* Video area */}
          <div className="int-video-area" style={{ background:"#0C1628" }}>
            <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"clamp(10px,2vw,20px)", padding:"0 12px" }}>

              {/* Avatar circle — scales down on small screens */}
              <div style={{ position:"relative", flexShrink:0 }}>
                <div style={{
                  width:"clamp(80px,18vw,140px)", height:"clamp(80px,18vw,140px)",
                  borderRadius:"50%",
                  background:`linear-gradient(135deg,${activePersona.gradientFrom}40,${activePersona.gradientTo}40)`,
                  border:`3px solid ${activePersona.accentColor}60`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"clamp(36px,8vw,64px)",
                  boxShadow:`0 0 60px ${activePersona.accentColor}30`,
                }}>
                  {activePersona.emoji}
                </div>
                <div style={{ position:"absolute", inset:-8, borderRadius:"50%", border:`2px solid ${activePersona.accentColor}40`, animation:"ping 2s cubic-bezier(0,0,.2,1) infinite" }}/>
                <style>{`@keyframes ping { 75%,100% { transform:scale(1.2); opacity:0; } }`}</style>
              </div>

              {/* Name / style */}
              <div style={{ textAlign:"center" }}>
                <div className="brig" style={{ fontSize:"clamp(14px,3.5vw,18px)", fontWeight:700, color:"rgba(255,255,255,.9)", letterSpacing:"-0.01em" }}>{activePersona.title}</div>
                <div style={{ fontSize:"clamp(10px,2.5vw,12px)", color:"rgba(255,255,255,.4)", marginTop:3 }}>AI Interviewer · {activePersona.style}</div>
              </div>

              {/* Active question box */}
              <div style={{ width:"100%", maxWidth:640, background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)", borderRadius:14, padding:"clamp(12px,3vw,18px) clamp(14px,3vw,24px)", backdropFilter:"blur(12px)" }}>
                <AnimatePresence mode="wait">
                  <motion.p key={qIdx} initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-6 }} transition={{ duration:0.3 }}
                    style={{ fontSize:"clamp(12px,3vw,16px)", color:"rgba(255,255,255,.85)", lineHeight:1.65, fontStyle:"italic", textAlign:"center" }}>
                    "{QUESTIONS[qIdx]}"
                  </motion.p>
                </AnimatePresence>
                {/* Audio viz */}
                <div style={{ display:"flex", gap:3, justifyContent:"center", marginTop:12, alignItems:"flex-end", height:18 }}>
                  {[1,2,3,4,5,6,7,8,9].map(i=><div key={i} className="wave-bar" style={{ width:"clamp(2px,0.5vw,3px)", height:14, background:`${activePersona.accentColor}cc`, borderRadius:2, animationDelay:`${i*0.1}s` }}/>)}
                  <span style={{ fontSize:10, color:activePersona.accentColor||"var(--teal-mid)", fontWeight:600, marginLeft:6, lineHeight:"14px" }}>Speaking…</span>
                </div>
              </div>
            </div>

            {/* ── PiP: User webcam — auto-minimised on phone ── */}
            <motion.div initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.4, duration:0.4 }}
              style={{ position:"absolute", bottom:12, right:12, zIndex:20 }}>
              <div style={{
                width: pipMin ? 68 : "clamp(120px,25vw,180px)",
                height: pipMin ? 52 : "clamp(90px,19vw,135px)",
                borderRadius:12, overflow:"hidden", background:"#1a2540",
                border:"2px solid rgba(255,255,255,.2)", boxShadow:"0 6px 24px rgba(0,0,0,.5)",
                transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)", position:"relative",
              }}>
                {vidOff ? (
                  <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4 }}>
                    <VideoOff size={pipMin?14:18} style={{ color:"rgba(255,255,255,.3)" }}/>
                    {!pipMin && <span style={{ fontSize:9, color:"rgba(255,255,255,.3)" }}>Camera off</span>}
                  </div>
                ) : (
                  <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, background:"linear-gradient(135deg,#1a2540,#0d1929)" }}>
                    <div style={{ fontSize:pipMin?20:28 }}>🧑‍💻</div>
                    {!pipMin && <span style={{ fontSize:9, color:"rgba(255,255,255,.4)", fontWeight:500 }}>You</span>}
                  </div>
                )}
                <div style={{ position:"absolute", top:5, left:6, background:"rgba(0,0,0,.55)", borderRadius:5, padding:"1px 6px", fontSize:8, fontWeight:700, color:"rgba(255,255,255,.7)", letterSpacing:"0.04em" }}>YOU</div>
                <button onClick={()=>setPipMin(m=>!m)} style={{ position:"absolute", top:3, right:3, width:16, height:16, borderRadius:"50%", background:"rgba(0,0,0,.5)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,.6)", transition:"background 0.15s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.25)"}
                  onMouseLeave={e=>e.currentTarget.style.background="rgba(0,0,0,.5)"}>
                  <span style={{ fontSize:9, lineHeight:1 }}>{pipMin?"⤢":"⤡"}</span>
                </button>
                {!vidOff && <div style={{ position:"absolute", bottom:5, right:6, width:6, height:6, borderRadius:"50%", background:"#22C55E", boxShadow:"0 0 5px #22C55E" }}/>}
              </div>
            </motion.div>

            {/* AI Interviewer label overlay */}
            <div style={{ position:"absolute", top:12, left:12, display:"flex", alignItems:"center", gap:7, background:"rgba(0,0,0,.45)", backdropFilter:"blur(8px)", borderRadius:9, padding:"4px 10px" }}>
              <span style={{ fontSize:10, color:"rgba(255,255,255,.6)", fontWeight:600 }}>AI Interviewer</span>
            </div>
          </div>

          {/* ── Scrollable Captions ── */}
          <div className="int-captions" ref={captionsRef} style={{ background:"rgba(0,0,0,.35)", padding:"8px 16px", display:"flex", flexDirection:"column", gap:7 }}>
            <div style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,.3)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:2, flexShrink:0 }}>Live Transcript</div>
            {TRANSCRIPT.map((t,i) => (
              <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                <span style={{ fontSize:9, color:"rgba(255,255,255,.3)", flexShrink:0, paddingTop:2, minWidth:28 }}>{t.ts}</span>
                <span style={{ fontSize:10, fontWeight:700, color:t.speaker==="You"?"var(--teal-mid)":"rgba(255,255,255,.5)", flexShrink:0, minWidth:54 }}>{t.speaker}:</span>
                <span style={{ fontSize:11, color:"rgba(255,255,255,.72)", lineHeight:1.5, flex:1 }}>{t.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT SIDEBAR (desktop/tablet only) ───────────────── */}
        <div className="int-side">

          {/* ── Live Coaching metrics ── */}
          <div style={{ padding:"16px", borderBottom:"1px solid rgba(255,255,255,.07)", flexShrink:0 }}>
            <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>Live Coaching</div>
            {[
              { label:"Speaking pace",  val:72,  color:"var(--teal-mid)",  icon:"🎙️" },
              { label:"Clarity",        val:85,  color:"#86EFAC",          icon:"💡" },
              { label:"Confidence",     val:79,  color:"#93C5FD",          icon:"💪" },
              { label:"Filler words",   val:12,  color:"#FCA5A5",          icon:"⚠️", low:true },
            ].map(({ label, val, color, icon, low }) => (
              <div key={label} style={{ marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5, alignItems:"center" }}>
                  <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                    <span style={{ fontSize:12 }}>{icon}</span>
                    <span style={{ fontSize:11.5, color:"rgba(255,255,255,.6)" }}>{label}</span>
                  </div>
                  <span style={{ fontSize:12, color, fontWeight:700 }}>{low ? val+" ✓" : `${val}%`}</span>
                </div>
                <div style={{ height:4, background:"rgba(255,255,255,.07)", borderRadius:2, overflow:"hidden" }}>
                  <motion.div initial={{ width:0 }} animate={{ width:`${low?100-val:val}%` }} transition={{ duration:1.2, ease:"easeOut" }} style={{ height:"100%", background:`linear-gradient(90deg,${color}cc,${color})`, borderRadius:2 }}/>
                </div>
              </div>
            ))}
          </div>

          {/* ── Quick Notes ── */}
          <div style={{ padding:"14px 16px", borderBottom:"1px solid rgba(255,255,255,.07)", flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:9 }}>
              <Pencil size={11} style={{ color:"rgba(255,255,255,.3)" }}/>
              <span style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:"0.1em", textTransform:"uppercase" }}>Quick Notes</span>
            </div>
            <textarea
              className="int-notes"
              rows={3}
              value={notes}
              onChange={e=>setNotes(e.target.value)}
              placeholder="Jot key points, numbers, names…"
            />
            {notes.length > 0 && (
              <div style={{ fontSize:9, color:"rgba(255,255,255,.2)", marginTop:4, textAlign:"right" }}>{notes.length} chars · saved locally</div>
            )}
          </div>

          {/* ── Question Context & Tips ── */}
          <div style={{ padding:"16px", flex:1, overflowY:"auto" }}>
            <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>Question Context</div>
            <AnimatePresence mode="wait">
              <motion.div key={qIdx} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.3 }}>
                <div style={{ fontSize:12, color:"rgba(255,255,255,.55)", lineHeight:1.65, marginBottom:14, fontStyle:"italic" }}>"{QUESTIONS[qIdx]}"</div>
                <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,.3)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Coaching Tips</div>
                {[
                  "Use the STAR framework: Situation → Task → Action → Result",
                  "Quantify your impact wherever possible (%, $, time saved)",
                  "Keep answers under 3 minutes — pause and ask if they want more detail",
                ].map((tip,i) => (
                  <div key={i} style={{ display:"flex", gap:8, marginBottom:9, alignItems:"flex-start" }}>
                    <div style={{ width:5, height:5, borderRadius:"50%", background:"var(--teal)", marginTop:5, flexShrink:0 }}/>
                    <span style={{ fontSize:11.5, color:"rgba(255,255,255,.5)", lineHeight:1.55 }}>{tip}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Controls */}
          <div style={{ padding:"14px 16px", borderTop:"1px solid rgba(255,255,255,.07)", flexShrink:0, display:"flex", flexDirection:"column", gap:10 }}>
            <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
              {[
                { icon: muted  ? <MicOff size={16}/>  : <Mic size={16}/>,   active:muted,  fn:()=>setMuted(m=>!m),  label: muted?"Unmute":"Mute",  kbd:"Space" },
                { icon: vidOff ? <VideoOff size={16}/>: <Video size={16}/>, active:vidOff, fn:()=>setVidOff(v=>!v), label: vidOff?"Camera On":"Camera", kbd:null },
              ].map(({ icon, active, fn, label, kbd:kbdKey }) => (
                <div key={label} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                  <button onClick={fn} title={label}
                    style={{ width:44, height:44, borderRadius:"50%", border:"none", background:active?"var(--red)":"rgba(255,255,255,.12)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", transition:"all 0.2s", flexShrink:0 }}
                    onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"}
                    onMouseLeave={e=>e.currentTarget.style.transform=""}>
                    {icon}
                  </button>
                  {kbdKey && <span className="kbd">{kbdKey}</span>}
                </div>
              ))}
            </div>
            {qIdx < QUESTIONS.length-1 ? (
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                <button className="btn-primary" onClick={()=>setQIdx(q=>q+1)} style={{ width:"100%", justifyContent:"center", fontSize:13, padding:"11px" }}>
                  Next Question <ChevronRight size={14}/>
                </button>
                <div style={{ textAlign:"center" }}><span className="kbd">→</span><span style={{ fontSize:10, color:"rgba(255,255,255,.3)", marginLeft:4 }}>arrow key</span></div>
              </div>
            ) : (
              <button className="btn-danger" onClick={()=>setEnding(true)} style={{ width:"100%", justifyContent:"center", fontSize:13, padding:"11px", borderRadius:12 }}>
                <PhoneOff size={14}/> End & Get Report
              </button>
            )}
          </div>
        </div>
      </motion.div>
      )}
      </AnimatePresence>

      {/* ── MOBILE BOTTOM CONTROLS BAR (tablet + phone only, hidden on desktop) ── */}
      <div className="int-mob-bar">
        {/* Mute */}
        <button onClick={()=>setMuted(m=>!m)}
          style={{ flex:1, height:50, borderRadius:14, border:"none", background:muted?"var(--red)":"rgba(255,255,255,.1)", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3, color:"#fff", transition:"all 0.2s" }}>
          {muted ? <MicOff size={18}/> : <Mic size={18}/>}
          <span style={{ fontSize:9, fontWeight:600, color:"rgba(255,255,255,.55)", letterSpacing:"0.04em" }}>{muted?"UNMUTE":"MUTE"}</span>
        </button>

        {/* Camera */}
        <button onClick={()=>setVidOff(v=>!v)}
          style={{ flex:1, height:50, borderRadius:14, border:"none", background:vidOff?"var(--red)":"rgba(255,255,255,.1)", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3, color:"#fff", transition:"all 0.2s" }}>
          {vidOff ? <VideoOff size={18}/> : <Video size={18}/>}
          <span style={{ fontSize:9, fontWeight:600, color:"rgba(255,255,255,.55)", letterSpacing:"0.04em" }}>{vidOff?"CAM ON":"CAMERA"}</span>
        </button>

        {/* Next / End */}
        {qIdx < QUESTIONS.length-1 ? (
          <button onClick={()=>setQIdx(q=>q+1)}
            style={{ flex:2, height:50, borderRadius:14, border:"none", background:"var(--teal)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6, color:"#fff", fontWeight:700, fontSize:13, fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}>
            Next <ChevronRight size={16}/>
          </button>
        ) : (
          <button onClick={()=>setEnding(true)}
            style={{ flex:2, height:50, borderRadius:14, border:"none", background:"rgba(220,38,38,.18)", borderWidth:1, borderStyle:"solid", borderColor:"rgba(220,38,38,.4)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6, color:"#FC8181", fontWeight:700, fontSize:13, fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}>
            <PhoneOff size={16}/> End & Report
          </button>
        )}
      </div>

      {/* ── END INTERVIEW MODAL ─────────────────────────────── */}
      <AnimatePresence>
        {ending && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ position:"fixed", inset:0, background:"rgba(15,23,42,.75)", backdropFilter:"blur(10px)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
            <motion.div initial={{ scale:0.9,y:24 }} animate={{ scale:1,y:0 }} exit={{ scale:0.9 }} transition={{ duration:0.3,ease:[0.16,1,0.3,1] }}
              style={{ background:"var(--white)", borderRadius:24, padding:"clamp(20px,5vw,36px)", maxWidth:400, width:"100%", textAlign:"center", boxShadow:"0 40px 80px rgba(15,23,42,.45)" }}>
              <div style={{ width:64, height:64, borderRadius:"50%", background:"var(--red-light)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
                <PhoneOff size={28} style={{ color:"var(--red)" }}/>
              </div>
              <h3 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)", letterSpacing:"-0.02em", marginBottom:10 }}>End this interview?</h3>
              <p style={{ fontSize:14, color:"var(--slate-500)", marginBottom:8, lineHeight:1.65 }}>
                You've completed <strong style={{ color:"var(--slate)" }}>{qIdx+1} of {QUESTIONS.length}</strong> questions.
              </p>
              <p style={{ fontSize:13, color:"var(--slate-400)", marginBottom:28, lineHeight:1.6 }}>
                Your session will be analysed and a full scored report generated immediately.
              </p>
              <div style={{ display:"flex", gap:10 }}>
                <button className="btn-secondary" onClick={()=>setEnding(false)} style={{ flex:1, justifyContent:"center" }}>Keep Going</button>
                <button className="btn-primary" onClick={()=>onNav("report")} style={{ flex:1, justifyContent:"center", background:"var(--teal)", fontSize:13 }}>
                  <FileText size={14}/> Get My Report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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

  const handleDownload = () => { setDlMsg(true); setTimeout(()=>setDlMsg(false),3000); };
  const handleCopyLink = () => { setLinkCopied(true); setTimeout(()=>setLinkCopied(false),2500); };
  const METRICS = [
    { label:"Communication",  score:82, color:"var(--teal)" },
    { label:"Technical Depth",score:74, color:"#0369A1"     },
    { label:"Confidence",     score:79, color:"#7C3AED"     },
    { label:"Culture Fit",    score:88, color:"var(--green)" },
    { label:"STAR Method",    score:65, color:"var(--amber)" },
    { label:"Problem Solving",score:80, color:"#BE185D"      },
  ];
  const overall = Math.round(METRICS.reduce((a,m)=>a+m.score,0)/METRICS.length);
  return (
    <div style={{ minHeight:"100vh", background:"var(--slate-50)", paddingTop:64 }}>
      <div style={{ maxWidth:1000, margin:"0 auto", padding:"44px clamp(16px,4vw,44px) 80px" }}>
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.45 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28, flexWrap:"wrap", gap:12 }}>
            <div>
              <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:8, flexWrap:"wrap" }}>
                <Tag color="teal">Report Ready</Tag>
                <Tag color="slate" size="xs">Google · Software Engineer L5</Tag>
                <Tag color="slate" size="xs">Feb 21, 2026</Tag>
              </div>
              <h1 className="brig" style={{ fontSize:"clamp(22px,3vw,30px)", fontWeight:700, color:"var(--slate)", letterSpacing:"-0.03em" }}>Interview Analysis Report</h1>
            </div>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
              {/* ── Recheck AI Analysis ── */}
              <button
                onClick={handleRecheck}
                disabled={recheckState==="loading"}
                className="btn-secondary"
                style={{ fontSize:13, background: recheckState==="done" ? "var(--green-light)" : "", borderColor: recheckState==="done" ? "var(--green)" : "", color: recheckState==="done" ? "var(--green)" : "" }}>
                <span className={recheckState==="loading" ? "spin" : ""} style={{ display:"inline-flex" }}>
                  <RefreshCw size={14}/>
                </span>
                {recheckState==="loading" ? " Deep-Dive Audit…" : recheckState==="done" ? "✓ Recheck Complete" : " Recheck AI Analysis"}
              </button>
              <button className="btn-primary" onClick={()=>onNav("dashboard")} style={{ fontSize:13 }}>New Session</button>
              <button className="btn-secondary" style={{ fontSize:13 }} onClick={handleDownload}><FileText size={14}/> {dlMsg ? "✓ Downloading…" : "Download PDF"}</button>
              <button className="btn-secondary" onClick={()=>{ setShareOpen(true); }} style={{ fontSize:13 }}><ArrowUpRight size={14}/> Share</button>
            </div>
          </div>

          <div className="report-top" style={{ marginBottom:20 }}>
            {/* Score card */}
            <div style={{ background:"var(--slate)", borderRadius:20, padding:"28px 24px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", boxShadow:"var(--shadow-xl)", minHeight:200 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,.4)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10 }}>Overall Score</div>
              <div className="brig score-pop" style={{ fontSize:"clamp(64px,10vw,88px)", fontWeight:800, color:"#fff", letterSpacing:"-0.05em", lineHeight:1 }}>{displayScore}</div>
              <div className="brig" style={{ fontSize:16, color:"var(--teal-mid)", marginTop:6, fontWeight:600 }}>/100</div>
              <Tag color="amber" style={{ marginTop:14 }}>Solid Performance</Tag>
            </div>
            {/* Metrics */}
            <div className="card" style={{ padding:26 }}>
              <div className="brig" style={{ fontSize:14, fontWeight:700, color:"var(--slate)", marginBottom:18 }}>Score Breakdown</div>
              {METRICS.map((m,i) => <MetricBar key={m.label} label={m.label} value={m.score} color={m.color} delay={i*0.08}/>)}
            </div>
          </div>

          <div className="report-mid">
            <div className="card" style={{ padding:26 }}>
              <div style={{ display:"flex", gap:9, alignItems:"center", marginBottom:18 }}>
                <div style={{ width:30, height:30, borderRadius:8, background:"var(--green-light)", display:"flex", alignItems:"center", justifyContent:"center" }}><Check size={15} style={{ color:"var(--green)" }}/></div>
                <div className="brig" style={{ fontSize:14, fontWeight:700, color:"var(--slate)" }}>Strengths</div>
              </div>
              {["Strong communication clarity — responses were structured and easy to follow.","Demonstrated solid culture-fit awareness with relevant Google-specific examples.","Good use of quantified impact in behavioral answers (mentioned 3x performance gains).","Confident delivery with minimal filler words and strong eye contact simulation."].map((s,i) => (
                <div key={i} style={{ display:"flex", gap:10, marginBottom:14, alignItems:"flex-start" }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:"var(--green)", marginTop:7, flexShrink:0 }}/>
                  <span style={{ fontSize:13.5, color:"var(--slate-700)", lineHeight:1.65 }}>{s}</span>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding:26 }}>
              <div style={{ display:"flex", gap:9, alignItems:"center", marginBottom:18 }}>
                <div style={{ width:30, height:30, borderRadius:8, background:"var(--amber-light)", display:"flex", alignItems:"center", justifyContent:"center" }}><AlertCircle size={15} style={{ color:"var(--amber)" }}/></div>
                <div className="brig" style={{ fontSize:14, fontWeight:700, color:"var(--slate)" }}>Areas to Improve</div>
              </div>
              {["Technical depth needs work — the system design answer lacked discussion of trade-offs.","STAR method inconsistently applied; the 'Result' step was often missing or vague.","Pacing was slightly fast in Q3 — slow down and let key points land.","Missed an opportunity to ask a clarifying question on the ambiguous requirements prompt."].map((s,i) => (
                <div key={i} style={{ display:"flex", gap:10, marginBottom:14, alignItems:"flex-start" }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:"var(--amber)", marginTop:7, flexShrink:0 }}/>
                  <span style={{ fontSize:13.5, color:"var(--slate-700)", lineHeight:1.65 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding:26, marginTop:20 }}>
            <div className="brig" style={{ fontSize:14, fontWeight:700, color:"var(--slate)", marginBottom:16 }}>AI Coach Summary</div>
            <p style={{ fontSize:14, color:"var(--slate-600)", lineHeight:1.75, borderLeft:"3px solid var(--teal)", paddingLeft:16 }}>
              You showed strong communication and culture awareness — clear differentiators at Google. The main gap is technical depth: when asked about system design, go deeper on trade-offs (consistency vs. availability, latency vs. throughput). Aim to explicitly state "the result was X" in every behavioral question. Schedule 2–3 Technical Deep Dive sessions before your next real interview.
            </p>
          </div>

          <div className="report-actions">
            <button className="btn-primary" onClick={()=>onNav("dashboard")} style={{ fontSize:14 }}>Practice Again <ArrowUpRight size={15}/></button>
            <button className="btn-secondary" style={{ fontSize:14 }} onClick={handleDownload}><FileText size={15}/> {dlMsg ? "✓ Downloading…" : "Download PDF"}</button>
            <button className="btn-secondary" onClick={()=>setShareOpen(true)} style={{ fontSize:14 }}><ArrowUpRight size={15}/> Share Report</button>
            <button className="btn-secondary" onClick={()=>onNav("reports")} style={{ fontSize:14 }}>View All Reports</button>
          </div>
        </motion.div>
      </div>

      {/* ── Share Report Modal ── */}
      <AnimatePresence>
        {shareOpen && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ position:"fixed", inset:0, background:"rgba(15,23,42,.55)", backdropFilter:"blur(6px)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}
            onClick={e=>e.target===e.currentTarget && setShareOpen(false)}>
            <motion.div initial={{ opacity:0,scale:0.92,y:20 }} animate={{ opacity:1,scale:1,y:0 }} exit={{ opacity:0,scale:0.92 }} transition={{ duration:0.3,ease:[0.16,1,0.3,1] }}
              style={{ background:"var(--white)", borderRadius:20, padding:"28px 28px", maxWidth:420, width:"100%", boxShadow:"var(--shadow-xl)", position:"relative" }}>
              <button onClick={()=>setShareOpen(false)} style={{ position:"absolute", top:14, right:14, width:30, height:30, borderRadius:"50%", border:"1px solid var(--border)", background:"var(--slate-50)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--slate-500)" }}><X size={13}/></button>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
                <div style={{ width:42, height:42, borderRadius:12, background:"var(--teal-light)", display:"flex", alignItems:"center", justifyContent:"center" }}><ArrowUpRight size={20} style={{ color:"var(--teal)" }}/></div>
                <div>
                  <div className="brig" style={{ fontSize:17, fontWeight:700, color:"var(--slate)", letterSpacing:"-0.02em" }}>Share Report</div>
                  <div style={{ fontSize:12, color:"var(--slate-500)", marginTop:2 }}>Google · SWE L5 · Score: 78/100</div>
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {/* Copy link */}
                <div>
                  <label style={{ marginBottom:8 }}>Report Link</label>
                  <div className="share-link-box">
                    <span style={{ flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>https://placementdo.app/reports/a7f2c9...</span>
                    <button onClick={handleCopyLink} className="btn-primary" style={{ fontSize:12, padding:"6px 14px", borderRadius:8, flexShrink:0 }}>
                      {linkCopied ? <><Check size={13}/> Copied!</> : "Copy"}
                    </button>
                  </div>
                </div>
                <div style={{ height:1, background:"var(--border)" }}/>
                {/* Share targets */}
                <div style={{ display:"flex", gap:10 }}>
                  {[
                    { icon:"💼", label:"LinkedIn",  hint:"Post your score as an achievement", color:"#0A66C2", bg:"#E8F3FF" },
                    { icon:"🐦", label:"Twitter/X", hint:"Share your progress publicly",      color:"#000",    bg:"#F0F0F0" },
                    { icon:"📧", label:"Email",      hint:"Send to a recruiter or mentor",    color:"var(--teal)", bg:"var(--teal-light)" },
                  ].map(({ icon, label, hint, color, bg }) => (
                    <button key={label} onClick={()=>setShareOpen(false)}
                      style={{ flex:1, padding:"12px 8px", background:bg, border:`1.5px solid ${color}22`, borderRadius:12, cursor:"pointer", transition:"all 0.2s", display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}
                      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="var(--shadow-md)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
                      <span style={{ fontSize:22 }}>{icon}</span>
                      <span style={{ fontSize:12, fontWeight:700, color, fontFamily:"'DM Sans',sans-serif" }}>{label}</span>
                      <span style={{ fontSize:10, color:"var(--slate-500)", textAlign:"center", lineHeight:1.4 }}>{hint}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Support & Feedback Center ── */
const SupportView = () => {
  /* ── Feedback state ── */
  const [fbCategory, setFbCategory] = useState("Bug Report");
  const [fbText, setFbText]         = useState("");
  const [fbSent, setFbSent]         = useState(false);
  const [fbLoading, setFbLoading]   = useState(false);

  const handleFbSubmit = e => {
    e.preventDefault();
    if (!fbText.trim()) return;
    setFbLoading(true);
    setTimeout(() => { setFbLoading(false); setFbSent(true); setFbText(""); }, 1500);
  };

  /* ── Chat state ── */
  const WELCOME = { role:"ai", text:"Hi! I'm your PlacementDo assistant. Ask me anything about the platform or interview prep. 🚀" };
  const [messages, setMessages] = useState([WELCOME]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping]   = useState(false);
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

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, isTyping]);

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text || isTyping) return;
    setMessages(m => [...m, { role:"user", text }]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      const reply = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      setMessages(m => [...m, { role:"ai", text: reply }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 700);
  };

  const handleChatKey = e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } };

  const QUICK = [
    { icon:<HelpCircle size={15}/>, label:"Platform Guide",     hint:"Get started fast",         color:"var(--teal)"   },
    { icon:<Brain size={15}/>,      label:"Interview Playbook", hint:"STAR & case study tips",   color:"#7C3AED"       },
    { icon:<BarChart2 size={15}/>,  label:"Score Breakdown",    hint:"How AI scoring works",     color:"#0369A1"       },
    { icon:<Shield size={15}/>,     label:"Privacy & Data",     hint:"Your data, your control",  color:"var(--green)"  },
  ];

  const CAT_ICONS = { "Bug Report":"🐛", "Improvement Idea":"💡", "General Question":"💬" };

  return (
    <motion.div initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35 }}>

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
      <div style={{ marginBottom:26 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
          <div style={{ width:40, height:40, borderRadius:11, background:"var(--teal-light)", border:"1px solid rgba(13,148,136,.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <LifeBuoy size={20} style={{ color:"var(--teal)" }}/>
          </div>
          <h1 className="brig" style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:700, color:"var(--slate)", letterSpacing:"-0.03em", margin:0 }}>Help & Support</h1>
        </div>
        <p style={{ fontSize:14, color:"var(--slate-500)", maxWidth:560, lineHeight:1.6 }}>
          Got a bug or an idea? Drop us a note. Or chat live with our AI assistant for instant answers on the platform and interview prep.
        </p>
      </div>

      {/* ── Main two-column grid ── */}
      <div className="sp-grid">

        {/* ─── Col A: Feedback Form ─── */}
        <div className="card" style={{ padding:26, display:"flex", flexDirection:"column" }}>

          {/* Card header */}
          <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:20, paddingBottom:16, borderBottom:"1px solid var(--border)" }}>
            <div style={{ width:36, height:36, borderRadius:9, background:"var(--teal-light)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <MessageSquare size={16} style={{ color:"var(--teal)" }}/>
            </div>
            <div>
              <div className="brig" style={{ fontSize:15, fontWeight:700, color:"var(--slate)" }}>Send Feedback</div>
              <div style={{ fontSize:12, color:"var(--slate-500)", marginTop:1 }}>Bugs, ideas, or questions — we read everything</div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {fbSent ? (
              <motion.div key="sent"
                initial={{ opacity:0, scale:0.94, y:8 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.94 }}
                transition={{ duration:0.32, ease:[0.16,1,0.3,1] }}
                style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"28px 16px", gap:14 }}>
                <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.1, type:"spring", stiffness:260, damping:18 }}
                  style={{ width:60, height:60, borderRadius:"50%", background:"var(--green-light)", border:"2px solid rgba(22,163,74,.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Check size={28} style={{ color:"var(--green)" }}/>
                </motion.div>
                <div>
                  <div className="brig" style={{ fontSize:17, fontWeight:700, color:"var(--slate)", marginBottom:6 }}>Feedback received!</div>
                  <p style={{ fontSize:13.5, color:"var(--slate-500)", lineHeight:1.65 }}>Our team reviews every submission.<br/>We'll reach out if we need more context.</p>
                </div>
                <button className="btn-secondary" style={{ fontSize:13, marginTop:4 }} onClick={()=>setFbSent(false)}>
                  <Send size={13}/> Send another
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                onSubmit={handleFbSubmit} style={{ display:"flex", flexDirection:"column", gap:16 }}>

                {/* Category pills */}
                <div>
                  <label>Category</label>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:2 }}>
                    {["Bug Report","Improvement Idea","General Question"].map(c => (
                      <button type="button" key={c} onClick={()=>setFbCategory(c)}
                        style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 13px", borderRadius:20, fontSize:13, fontWeight:500, cursor:"pointer", transition:"all 0.18s", fontFamily:"'DM Sans',sans-serif", border:`1.5px solid ${fbCategory===c?"var(--teal)":"var(--border)"}`, background:fbCategory===c?"var(--teal-light)":"var(--white)", color:fbCategory===c?"var(--teal-dark)":"var(--slate-600)" }}>
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
                    onChange={e=>setFbText(e.target.value)}
                    rows={6}
                    placeholder={
                      fbCategory==="Bug Report"        ? "What happened? What did you expect? Steps to reproduce…" :
                      fbCategory==="Improvement Idea"  ? "What would make PlacementDo better for you?" :
                                                         "What's on your mind?"
                    }
                    style={{ resize:"vertical", minHeight:120, lineHeight:1.6, fontSize:13.5 }}
                  />
                  <div style={{ display:"flex", justifyContent:"flex-end", marginTop:5 }}>
                    <span style={{ fontSize:11, color: fbText.length>20?"var(--teal)":"var(--slate-300)", transition:"color 0.2s" }}>{fbText.length} chars</span>
                  </div>
                </div>

                <button type="submit" className="btn-primary" disabled={fbLoading || !fbText.trim()} style={{ fontSize:14, justifyContent:"center", padding:"12px" }}>
                  {fbLoading
                    ? <><span className="spin"><RefreshCw size={14}/></span> Sending…</>
                    : <><Send size={14}/> Submit Feedback</>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* ─── Col B: AI Chat ─── */}
        <div className="card sp-chat" style={{ display:"flex", flexDirection:"column", overflow:"hidden" }}>

          {/* Chat header */}
          <div style={{ padding:"14px 18px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:12, flexShrink:0, background:"var(--slate-50)", borderRadius:"16px 16px 0 0" }}>
            <div style={{ position:"relative", flexShrink:0 }}>
              <div style={{ width:40, height:40, borderRadius:11, background:"var(--slate)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Bot size={19} style={{ color:"var(--teal-mid)" }}/>
              </div>
              <div style={{ position:"absolute", bottom:1, right:1, width:10, height:10, borderRadius:"50%", background:"var(--green)", border:"2px solid var(--white)", animation:"dot-pulse 2.4s ease-in-out infinite" }}/>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div className="brig" style={{ fontSize:14, fontWeight:700, color:"var(--slate)" }}>Live AI Assistant</div>
              <div style={{ fontSize:11.5, color:"var(--slate-500)", marginTop:1 }}>Replies in seconds · Platform & interview prep</div>
            </div>
            <Tag color="green" size="xs">Online</Tag>
          </div>

          {/* Messages scroll area */}
          <div style={{ flex:1, overflowY:"auto", padding:"14px 16px", display:"flex", flexDirection:"column", gap:10, background:"var(--ivory)" }}>
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.24 }}
                style={{ display:"flex", gap:8, alignItems:"flex-end", flexDirection: msg.role==="user" ? "row-reverse" : "row" }}>
                {/* Avatar */}
                <div style={{ width:28, height:28, borderRadius:"50%", flexShrink:0,
                  background: msg.role==="ai" ? "var(--slate)" : "var(--teal-light)",
                  border: msg.role==="user" ? "1.5px solid rgba(13,148,136,.3)" : "none",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>
                  {msg.role==="ai" ? <Bot size={13} style={{ color:"var(--teal-mid)" }}/> : "🧑‍💻"}
                </div>
                {/* Bubble */}
                <div className={msg.role==="ai" ? "sp-msg-bubble-ai" : "sp-msg-bubble-usr"}
                  style={{ maxWidth:"78%", padding:"9px 13px", fontSize:13.5, lineHeight:1.65, wordBreak:"break-word" }}>
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* Typing dots */}
            <AnimatePresence>
              {isTyping && (
                <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:4 }}
                  style={{ display:"flex", gap:8, alignItems:"flex-end" }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:"var(--slate)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Bot size={13} style={{ color:"var(--teal-mid)" }}/>
                  </div>
                  <div className="sp-msg-bubble-ai" style={{ padding:"10px 15px", display:"flex", gap:4, alignItems:"center" }}>
                    {[0, 0.18, 0.36].map((d, i) => (
                      <div key={i} style={{ width:6, height:6, borderRadius:"50%", background:"var(--slate-300)", animation:`dot-pulse 1.3s ease-in-out ${d}s infinite` }}/>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={chatEndRef}/>
          </div>

          {/* Suggested prompts (only shown when just the welcome message) */}
          {messages.length === 1 && (
            <div style={{ padding:"8px 16px", background:"var(--ivory)", borderTop:"1px solid var(--border)", display:"flex", gap:7, flexWrap:"wrap" }}>
              {["How does scoring work?","Best persona to start with?","How to use STAR method?"].map(q => (
                <button key={q} onClick={()=>{ setChatInput(q); }}
                  style={{ fontSize:11.5, padding:"5px 11px", borderRadius:14, border:"1px solid var(--border)", background:"var(--white)", color:"var(--slate-600)", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.18s", whiteSpace:"nowrap" }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--teal)"; e.currentTarget.style.color="var(--teal-dark)"; e.currentTarget.style.background="var(--teal-light)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--slate-600)"; e.currentTarget.style.background="var(--white)"; }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div style={{ padding:"10px 14px", borderTop:"1px solid var(--border)", flexShrink:0, display:"flex", gap:9, alignItems:"center", background:"var(--white)", borderRadius:"0 0 16px 16px" }}>
            <input
              value={chatInput}
              onChange={e=>setChatInput(e.target.value)}
              onKeyDown={handleChatKey}
              placeholder="Ask anything…"
              style={{ flex:1, borderRadius:10, fontSize:13.5, padding:"9px 13px", height:40, border:"1.5px solid var(--border-strong)" }}
            />
            <button onClick={sendChat} disabled={!chatInput.trim() || isTyping}
              className="btn-primary" style={{ padding:"9px 14px", flexShrink:0, borderRadius:10, height:40 }}>
              <Send size={14}/>
            </button>
          </div>
        </div>
      </div>

      {/* ── Quick Resources ── */}
      <div style={{ marginTop:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
          <div className="brig" style={{ fontSize:12, fontWeight:700, color:"var(--slate-400)", letterSpacing:"0.07em", textTransform:"uppercase" }}>Quick Resources</div>
          <div style={{ flex:1, height:1, background:"var(--border)" }}/>
        </div>
        <div className="sp-qgrid">
          {QUICK.map(({ icon, label, hint, color }) => (
            <div key={label} className="sp-qcard">
              <div style={{ width:34, height:34, borderRadius:9, background:`${color}15`, border:`1px solid ${color}25`, display:"flex", alignItems:"center", justifyContent:"center", color, flexShrink:0 }}>
                {icon}
              </div>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"var(--slate)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{label}</div>
                <div style={{ fontSize:11, color:"var(--slate-400)", marginTop:1 }}>{hint}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};

/* ── Root App ── */
const DASH_VIEWS = ["dashboard","reports","progress","avatars","settings","support"];
export default function App() {
  const [view, setView]           = useState("landing");
  const [checkoutPlan, setCheckout] = useState(null);
  const [toast, setToast]         = useState(null);

  const go = v => { setView(v); window.scrollTo({ top:0, behavior:"instant" }); };
  const isDash = DASH_VIEWS.includes(view);

  const openCheckout = plan => setCheckout(plan);
  const closeCheckout = () => setCheckout(null);
  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null),4500); };

  const [selectedPersona, setSelectedPersona] = useState(PERSONAS[0]);

  const renderView = () => {
    if (view==="landing")   return <Landing onNav={go} onCheckout={openCheckout}/>;
    if (view==="signin")    return <SignIn onNav={go}/>;
    if (view==="interview") return <InterviewRoom onNav={go} persona={selectedPersona}/>;
    if (view==="report")    return <Report onNav={go}/>;
    if (isDash) {
      const inner =
        view==="dashboard" ? <NewInterview onNav={go} onUpgrade={openCheckout} onSelectPersona={setSelectedPersona} showToast={showToast}/> :
        view==="reports"   ? <MyReports onNav={go}/> :
        view==="progress"  ? <Progress/> :
        view==="avatars"   ? <AvatarsView onUpgrade={openCheckout} onNav={go} onSelectPersona={setSelectedPersona}/> :
        view==="support"   ? <SupportView/> :
                             <SettingsView onUpgrade={openCheckout}/>;
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
      <G/>
      {view !== "interview" && <Navbar view={view} onNav={go}/>}
      <AnimatePresence mode="wait">
        <motion.div key={view} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.22 }}>
          {renderView()}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {checkoutPlan && <CheckoutModal plan={checkoutPlan} onClose={closeCheckout}/>}
      </AnimatePresence>
      <AnimatePresence>
        {toast && <Toast message={toast} onDismiss={()=>setToast(null)}/>}
      </AnimatePresence>
    </>
  );
}
