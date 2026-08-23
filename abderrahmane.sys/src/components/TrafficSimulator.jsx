import { useState } from 'react';
import {
  Activity,
  Zap,
  Cpu,
  Server,
  ShieldCheck,
  CheckCircle2,
  Gauge,
  Sliders,
  Radio,
  Flame
} from 'lucide-react';
import TiltCard from './TiltCard';

export default function TrafficSimulator() {
  const [requestsPerSec, setRequestsPerSec] = useState(25000);

  // Dynamic system metric calculations under load
  const loadFraction = requestsPerSec / 100000;
  const latencyMs = (3.2 + loadFraction * 7.8).toFixed(1);
  const cpuUsage = Math.min(94, Math.round(14 + loadFraction * 62));
  const memoryMb = Math.round(128 + loadFraction * 320);
  const cacheHit = (99.9 - loadFraction * 0.8).toFixed(1);
  const workerThreads = Math.min(16, Math.max(2, Math.round(loadFraction * 14) + 2));

  const presets = [
    { label: 'Baseline', value: 1000 },
    { label: 'Standard Peak', value: 25000 },
    { label: 'Flash Sale (50k)', value: 50000 },
    { label: 'Stress Load (100k)', value: 100000 }
  ];

  return (
    <TiltCard
      maxTilt={5}
      glareOpacity={0.15}
      className="backdrop-blur-xl bg-black/70 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group w-full"
    >
      {/* Ambient Neon Glows */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/25 transition-all duration-700" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-fuchsia-500/25 transition-all duration-700" />

      {/* Widget Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-lg sm:text-xl font-bold font-display text-white">
                Live Traffic & Load Simulator
              </h4>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_#10b981]"></span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Interactive stress test simulator demonstrating resilience under concurrent load
            </p>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>ZERO PACKET LOSS (0.00%)</span>
        </div>
      </div>

      {/* Slider & Presets Controls */}
      <div className="bg-black/50 border border-white/10 rounded-2xl p-5 sm:p-6 mb-6 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <label htmlFor="traffic-slider" className="text-xs font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulated Throughput:</span>
          </label>
          <div className="text-xl sm:text-2xl font-black font-display text-white tracking-tight text-glow-cyan">
            {requestsPerSec.toLocaleString()} <span className="text-xs font-mono text-cyan-400 font-normal">Req/Sec</span>
          </div>
        </div>

        {/* Interactive Range Slider */}
        <input
          id="traffic-slider"
          type="range"
          min="100"
          max="100000"
          step="100"
          value={requestsPerSec}
          onChange={(e) => setRequestsPerSec(Number(e.target.value))}
          className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300 transition-all shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]"
        />

        {/* Quick Presets */}
        <div className="flex flex-wrap gap-2 mt-4">
          {presets.map((p) => {
            const isActive = requestsPerSec === p.value;
            return (
              <button
                key={p.label}
                onClick={() => setRequestsPerSec(p.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border-white/10 hover:border-white/20'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reactive Telemetry Metrics Display (4-Metric Grid) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 relative z-10 font-mono">
        {/* Latency */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-400/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Response Latency</span>
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-display text-white">
            {latencyMs} <span className="text-xs font-mono text-cyan-300">ms</span>
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Sub-15ms Target</span>
          </div>
        </div>

        {/* CPU Load */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-fuchsia-400/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Core CPU Load</span>
            <Cpu className="w-3.5 h-3.5 text-fuchsia-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-display text-white">
            {cpuUsage}%
          </div>
          {/* Micro Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-200 ${
                cpuUsage > 80 ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 'bg-fuchsia-500 shadow-[0_0_8px_#d946ef]'
              }`}
              style={{ width: `${cpuUsage}%` }}
            />
          </div>
        </div>

        {/* Memory Footprint */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-400/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Memory Footprint</span>
            <Server className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-display text-white">
            {memoryMb} <span className="text-xs font-mono text-blue-300">MB</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Zero Memory Leak Profile
          </div>
        </div>

        {/* Cache Hit Ratio */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-400/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Edge Cache Hit</span>
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-display text-emerald-300">
            {cacheHit}%
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Redis L1/L2 Active</span>
          </div>
        </div>
      </div>

      {/* Reactive Status Indicators & Worker Scale Pool */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-white/10 text-xs font-mono relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
            ⚡ {workerThreads} Cluster Workers
          </span>
          <span className="px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-400/30 text-fuchsia-300">
            🛡️ DDoS Shield Active
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300">
            🔄 Load Balanced
          </span>
        </div>

        <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Non-blocking Event Loop Architecture</span>
        </div>
      </div>
    </TiltCard>
  );
}
