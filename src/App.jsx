import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import InterviewAI from "./InterviewAI_v5.jsx";

export default function App() {
  return (
    <>
      <InterviewAI />
      <SpeedInsights />
      <Analytics />
    </>
  );
}