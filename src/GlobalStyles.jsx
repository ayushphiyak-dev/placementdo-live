/**
 * GlobalStyles — injects the PlacementDo design-system tokens, fonts, and
 * utility classes into the document.
 *
 * This component must be rendered at the App level so that every standalone
 * page (blog listing, blog post, admin dashboard, etc.) has access to the CSS
 * variables, font stack, and helper classes that are otherwise only present
 * when InterviewAI_v5 renders its own <G /> component.
 *
 * Note: InterviewAI_v5 still renders <G /> which contains identical CSS —
 * that is harmless; the last declaration wins but the values are the same.
 */
const GlobalStyles = () => (
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
      --ease-premium: cubic-bezier(0.22,1,0.36,1);
    }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--ivory); }
    ::-webkit-scrollbar-thumb { background: var(--slate-300); border-radius: 3px; }
    .brig { font-family: 'Bricolage Grotesque', sans-serif; }

    /* Cards */
    .card { background: var(--white); border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--shadow-sm); }
    .card-lift { transition: box-shadow 0.3s var(--ease-premium), transform 0.3s var(--ease-premium); }
    .card-lift:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
    .card-interactive { transition: box-shadow 0.28s var(--ease-premium), transform 0.28s var(--ease-premium), background 0.28s var(--ease-premium); cursor: pointer; }
    .card-interactive:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
    .card-interactive:active { transform: scale(0.99); }

    /* Buttons */
    .btn-primary { background: var(--teal); color: #fff; font-family: 'DM Sans',sans-serif; font-weight: 600; font-size: 14px; padding: 11px 24px; border-radius: 12px; border: none; cursor: pointer; transition: background 0.24s var(--ease-premium), box-shadow 0.24s var(--ease-premium), transform 0.18s var(--ease-premium), opacity 0.2s; letter-spacing: -0.01em; display: inline-flex; align-items: center; gap: 7px; white-space: nowrap; user-select: none; text-decoration: none; }
    .btn-primary:hover:not(:disabled) { background: var(--teal-dark); box-shadow: var(--shadow-teal); transform: translateY(-2px); }
    .btn-primary:active:not(:disabled) { transform: scale(0.97); box-shadow: none; }
    .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-secondary { background: var(--white); color: var(--slate); font-family: 'DM Sans',sans-serif; font-weight: 500; font-size: 14px; padding: 10px 22px; border-radius: 12px; border: 1.5px solid var(--border-strong); cursor: pointer; transition: border-color 0.22s var(--ease-premium), color 0.22s var(--ease-premium), background 0.22s var(--ease-premium), box-shadow 0.22s var(--ease-premium), transform 0.18s var(--ease-premium); display: inline-flex; align-items: center; gap: 7px; user-select: none; }
    .btn-secondary:hover { border-color: var(--teal); color: var(--teal); background: var(--teal-light); box-shadow: var(--shadow-sm); transform: translateY(-2px); }
    .btn-secondary:active { transform: scale(0.97); }
    .btn-ghost { background: transparent; color: var(--slate-500); font-family: 'DM Sans',sans-serif; font-weight: 500; font-size: 14px; padding: 9px 16px; border-radius: 10px; border: none; cursor: pointer; transition: color 0.18s, background 0.18s, transform 0.15s; display: inline-flex; align-items: center; gap: 6px; user-select: none; text-decoration: none; }
    .btn-ghost:hover { color: var(--slate); background: var(--slate-100); }
    .btn-ghost:active { transform: scale(0.97); }
    .btn-danger { display: flex; align-items: center; gap: 8px; padding: 10px 22px; background: rgba(220,38,38,.08); border: 1.5px solid rgba(220,38,38,.3); border-radius: 26px; cursor: pointer; color: #DC2626; font-family: 'DM Sans',sans-serif; font-weight: 600; font-size: 14px; transition: all 0.2s; user-select: none; }
    .btn-danger:hover { background: #DC2626; color: #fff; border-color: #DC2626; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(220,38,38,.3); }

    /* Inputs */
    input, select, textarea { background: var(--white); border: 1.5px solid var(--border-strong); color: var(--slate); border-radius: 10px; padding: 10px 14px; width: 100%; font-family: 'DM Sans',sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.2s; box-shadow: var(--shadow-sm); }
    input::placeholder { color: var(--slate-400); }
    input:focus, select:focus, textarea:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(13,148,136,.12), var(--shadow-sm); }
    input:disabled { background: var(--slate-50); color: var(--slate-400); cursor: not-allowed; }
    select { appearance: none; cursor: pointer; }
    label { font-size: 11.5px; font-weight: 700; color: var(--slate-600); margin-bottom: 6px; display: block; letter-spacing: 0.05em; text-transform: uppercase; }

    /* Nav */
    .nav-link { font-size: 14px; font-weight: 500; color: var(--slate-500); padding: 6px 13px; border-radius: 8px; cursor: pointer; border: none; background: transparent; transition: color 0.2s var(--ease-premium), background 0.2s var(--ease-premium), transform 0.18s var(--ease-premium); white-space: nowrap; font-family: 'DM Sans',sans-serif; user-select: none; text-decoration: none; display: inline-flex; align-items: center; }
    .nav-link:hover { color: var(--slate); background: var(--slate-100); transform: translateY(-1px); }

    /* Sidebar */
    .sidebar-item { display: flex; align-items: center; gap: 10px; padding: 9px 13px; border-radius: 10px; font-size: 14px; font-weight: 500; color: var(--slate-500); cursor: pointer; transition: all 0.18s; border: none; background: transparent; width: 100%; font-family: 'DM Sans',sans-serif; text-align: left; }
    .sidebar-item:hover { background: var(--slate-100); color: var(--slate); transform: translateX(2px); }
    .sidebar-item.active { background: var(--teal-light); color: var(--teal-dark); font-weight: 600; }
    .sidebar-item.active:hover { transform: none; }

    /* Feature cards */
    .feature-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(min(290px,100%),1fr)); gap: 20px; align-items: stretch; }
    .feature-card { padding: 28px; border-radius: 16px; border: 1.5px solid var(--border); background: var(--ivory); transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s, background 0.25s; display: flex; flex-direction: column; height: 100%; }
    .feature-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); background: var(--white); border-color: var(--teal-border-hover); }

    /* Pricing */
    .pricing-card { border-radius: 20px; padding: 32px 28px; position: relative; transition: transform 0.25s, box-shadow 0.25s; display: flex; flex-direction: column; }
    .pricing-card:hover { transform: translateY(-5px); }
    .pricing-card.hi:hover { box-shadow: 0 32px 72px rgba(15,23,42,.28); }
    .pricing-card:not(.hi):hover { box-shadow: var(--shadow-xl); }

    /* Misc utilities */
    .spin { animation: spin-anim 0.9s linear infinite; display: inline-block; }
    @keyframes spin-anim { to { transform: rotate(360deg); } }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
    .bounce-in { animation: bounceIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) both; }
    @keyframes bounceIn { 0% { transform: scale(0.6); opacity: 0; } 70% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }

    /* Animations */
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

    /* Stagger children fade-in */
    .stagger > *:nth-child(1) { animation: fade-in-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
    .stagger > *:nth-child(2) { animation: fade-in-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
    .stagger > *:nth-child(3) { animation: fade-in-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.19s both; }
    .stagger > *:nth-child(4) { animation: fade-in-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.26s both; }
    .stagger > *:nth-child(5) { animation: fade-in-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.33s both; }
    .stagger > *:nth-child(6) { animation: fade-in-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.40s both; }

    @keyframes border-glow { 0%,100%{box-shadow:0 0 0 0 rgba(13,148,136,0);} 50%{box-shadow:0 0 0 4px rgba(13,148,136,0.28), var(--shadow-lg);} }
    .border-glow-active { animation: border-glow 2.5s ease-in-out infinite; }

    .magnetic-btn { transform: translate3d(var(--mx, 0px), var(--my, 0px), 0); transition: transform 0.22s var(--ease-premium); }

    /* Layout utilities */
    .hero-pad { padding: clamp(64px,10vh,96px) clamp(20px,5vw,60px) clamp(40px,6vh,64px); }
    .sec-pad { padding: clamp(56px,8vh,96px) clamp(20px,5vw,60px); }
    .dash-main { padding: clamp(72px,10vh,88px) clamp(16px,3vw,40px) clamp(32px,5vh,48px); min-height: 100vh; box-sizing: border-box; }
    .card-constrain { max-width: 900px; margin-left: auto; margin-right: auto; width: 100%; }

    @media(max-width:768px){
      .report-top { grid-template-columns: 1fr !important; }
    }

    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      *, *::before, *::after {
        animation-duration: 0ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0ms !important;
        scroll-behavior: auto !important;
      }
      .magnetic-btn { transform: none !important; }
    }
  `}</style>
);

export default GlobalStyles;
