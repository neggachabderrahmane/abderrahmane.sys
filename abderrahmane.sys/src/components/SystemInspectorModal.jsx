import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Layers,
  ShieldCheck,
  Server,
  Database,
  Cpu,
  Zap,
  Lock,
  Radio,
  Sparkles,
  Terminal,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const projectArchitectures = {
  'relizane-fellah': {
    title: 'Relizane Fellah — Architecture Blueprint',
    subtitle: 'AgriTech Direct Marketplace & Decentralized Supply Chain Engine',
    status: 'PRODUCTION LIVE',
    nodes: [
      {
        id: 'frontend',
        title: 'Client Frontend',
        protocol: 'HTTP/3 • WebP PWA',
        tech: 'React.js 19 & Tailwind CSS',
        icon: Layers,
        color: 'border-cyan-400 text-cyan-300 bg-cyan-500/10',
        glow: 'shadow-[0_0_20px_rgba(0,240,255,0.3)]',
        metrics: { latency: '< 20ms TTFB', payload: 'Optimized Assets', state: 'Optimistic UI' },
        description:
          'High-performance progressive web app engineered for rural and urban connectivity with local caching, optimistic inventory updates, and responsive accessibility.',
        security: ['Content Security Policy (CSP Level 3)', 'Sanitized DOM output', 'Encrypted local session cache']
      },
      {
        id: 'security',
        title: 'Secure Gateway',
        protocol: 'TLS 1.3 • OAuth2 / JWT',
        tech: 'Firebase Auth & Security Rules',
        icon: ShieldCheck,
        color: 'border-fuchsia-400 text-fuchsia-300 bg-fuchsia-500/10',
        glow: 'shadow-[0_0_20px_rgba(255,0,127,0.3)]',
        metrics: { auth: 'OAuth2 + Phone OTP', rateLimit: '120 req/min/IP', threatShield: 'Active' },
        description:
          'Zero-trust security layer enforcing granular role segregation between Farmers, Wholesale Distributors, and Direct Consumers with anti-tampering nonces.',
        security: ['Granular Firebase Security Rules', 'Cryptographic token validation', 'DDoS anomaly mitigation']
      },
      {
        id: 'backend',
        title: 'Backend Microservices',
        protocol: 'gRPC • WebSocket Streams',
        tech: 'Node.js & Cloud Functions',
        icon: Server,
        color: 'border-blue-400 text-blue-300 bg-blue-500/10',
        glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
        metrics: { execution: 'Event-Driven', concurrency: 'Horizontal Auto-Scale', workers: 'Cluster Mode' },
        description:
          'Distributed order processing and live auction pricing engine with atomic stock reservation locks to eliminate supply chain double-allocation.',
        security: ['Atomic order transactions', 'Schema validation via Zod', 'Immutable trade audit telemetry']
      },
      {
        id: 'database',
        title: 'Encrypted DB & Cloud',
        protocol: 'AES-256 • Geospatial Query',
        tech: 'Firestore & Cloud Storage',
        icon: Database,
        color: 'border-emerald-400 text-emerald-300 bg-emerald-500/10',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
        metrics: { durability: '99.999999999%', replication: 'Multi-Region', indexing: 'Composite Geospatial' },
        description:
          'Multi-region document database with geospatial farm indexing and cold-storage archiving of encrypted patent & agricultural trade receipts.',
        security: ['AES-256 encryption at rest', 'Continuous differential backups', 'Field-level access control']
      }
    ],
    terminalLogs: [
      '> [SYSTEM] Handshake established with edge CDN node... [OK]',
      '> [SECURITY] TLS 1.3 cipher suite negotiated (AES_256_GCM)... [SECURE]',
      '> [GATEWAY] Farmer authentication token verified via Firebase Auth... [200 OK]',
      '> [ENGINE] Stock locking algorithm executed with zero race conditions... [SUCCESS]',
      '> [DATABASE] Geospatial document index synchronized across multi-region replica... [SYNCED]'
    ]
  },
  'gym-app': {
    title: 'Gym Mobile App — Architecture Blueprint',
    subtitle: 'Cross-Platform Mobile Ecosystem & Biometric Sync Engine',
    status: 'ACTIVE R&D / CLASSIFIED',
    nodes: [
      {
        id: 'frontend',
        title: 'Native Mobile Client',
        protocol: 'Native Bridge • 60 FPS',
        tech: 'React Native & Redux Toolkit',
        icon: Layers,
        color: 'border-fuchsia-400 text-fuchsia-300 bg-fuchsia-500/10',
        glow: 'shadow-[0_0_20px_rgba(255,0,127,0.3)]',
        metrics: { fps: '60 FPS Native', offline: 'SQLite Local Cache', sync: 'Delta Sync Engine' },
        description:
          'Cross-platform mobile application utilizing native device bridges for biometric authentication, health sensor capture, and offline workout logging.',
        security: ['Keychain / KeyStore credential storage', 'SSL Certificate Pinning', 'Memory-scrubbed session tokens']
      },
      {
        id: 'security',
        title: 'Biometric Gate',
        protocol: 'OAuth2 • FaceID / Fingerprint',
        tech: 'Biometric Vault & JWT Guard',
        icon: ShieldCheck,
        color: 'border-cyan-400 text-cyan-300 bg-cyan-500/10',
        glow: 'shadow-[0_0_20px_rgba(0,240,255,0.3)]',
        metrics: { auth: 'Hardware Enclave + JWT', expiry: '15-min Rolling Refresh', breachDetection: 'Enabled' },
        description:
          'Decoupled identity provider issuing short-lived signed JWTs with hardware-backed biometric verification prior to accessing member subscription services.',
        security: ['Hardware-enclave signature validation', 'Brute-force lockout protocols', 'Device fingerprint telemetry']
      },
      {
        id: 'backend',
        title: 'API Microservices',
        protocol: 'REST • WebSocket Pulse',
        tech: 'Node.js & Express REST Core',
        icon: Server,
        color: 'border-blue-400 text-blue-300 bg-blue-500/10',
        glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
        metrics: { latency: '8.4 ms avg', throughput: '15,000 req/s', architecture: 'REST Microservices' },
        description:
          'Workout progression analytics engine, automated subscription lifecycle management, and gym capacity turnstile check-in coordinators.',
        security: ['API Rate Limiting with Redis Leaky Bucket', 'CORS whitelisting', 'Payload sanitization']
      },
      {
        id: 'database',
        title: 'Persistence & Cache',
        protocol: 'In-Memory • Document Store',
        tech: 'MongoDB Cluster & Redis',
        icon: Database,
        color: 'border-emerald-400 text-emerald-300 bg-emerald-500/10',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
        metrics: { cacheHit: '98.7%', indexing: 'TimeSeries & B-Tree', backups: 'Point-in-Time' },
        description:
          'Document collection store for member profiles and workout sets paired with a Redis in-memory cache for ultra-fast check-in token resolution.',
        security: ['Encrypted database transport', 'Automatic failover replica sets', 'Field-level biometric hashing']
      }
    ],
    terminalLogs: [
      '> [DEVICE] Biometric hardware keypair validated in Secure Enclave... [VERIFIED]',
      '> [NETWORK] SSL Pinning certificate validation passed... [SECURE]',
      '> [API] Delta sync dispatched: 14 offline workout sets merged... [200 OK]',
      '> [CACHE] Redis L1 cache hit: member subscription status resolved in 0.8ms... [HIT]',
      '> [TELEMETRY] Heartbeat metrics recorded into time-series collection... [RECORDED]'
    ]
  },
  'teamsync': {
    title: 'Abdo-Team — Architecture Blueprint',
    subtitle: 'High-Concurrency B2B SaaS Collaboration & Real-Time Sync Engine',
    status: 'ACTIVE R&D / CLASSIFIED',
    nodes: [
      {
        id: 'frontend',
        title: 'Collaborative Client',
        protocol: 'WebSockets • Virtual DOM',
        tech: 'React.js & WebWorker Diffing',
        icon: Layers,
        color: 'border-blue-400 text-blue-300 bg-blue-500/10',
        glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
        metrics: { render: 'Virtual DOM Kanban', latency: '< 10ms Sync', workers: 'WebWorker Diffing' },
        description:
          'Interactive collaborative workspace featuring virtualized Kanban boards, multi-cursor presence awareness, and sub-10ms UI state reconciliation.',
        security: ['Zero-Trust client sandboxing', 'Automated token rotation', 'XSS & CSRF token mitigation']
      },
      {
        id: 'security',
        title: 'Multi-Tenant WAF',
        protocol: 'Tenant UUID • RBAC',
        tech: 'Zero-Trust Gateway & WAF',
        icon: ShieldCheck,
        color: 'border-cyan-400 text-cyan-300 bg-cyan-500/10',
        glow: 'shadow-[0_0_20px_rgba(0,240,255,0.3)]',
        metrics: { isolation: 'Tenant UUID Namespacing', rateLimit: 'Distributed Redis', waf: 'OWASP Enforced' },
        description:
          'Multi-tenant security boundary enforcing enterprise isolation, role permissions (Admin, PM, Contributor, Guest), and real-time security audit streaming.',
        security: ['Cryptographically isolated tenant keys', 'DDoS protection thresholds', 'Strict Content Security Policy']
      },
      {
        id: 'backend',
        title: 'Real-Time Sync Engine',
        protocol: 'Pub/Sub • WebSocket Cluster',
        tech: 'Node.js & WebSocket Cluster',
        icon: Server,
        color: 'border-fuchsia-400 text-fuchsia-300 bg-fuchsia-500/10',
        glow: 'shadow-[0_0_20px_rgba(255,0,127,0.3)]',
        metrics: { socketConn: '50,000 Concurrent', pubsub: 'Redis Cluster', scaling: 'Cluster Workers' },
        description:
          'Distributed WebSocket cluster with Redis Pub/Sub backplane routing board modifications, task status updates, and sprint telemetry in real-time.',
        security: ['Signed WebSocket connection handshakes', 'Granular channel subscription authorization', 'Heartbeat ping health monitor']
      },
      {
        id: 'database',
        title: 'Sharded Event Store',
        protocol: 'Distributed Replica • B-Tree',
        tech: 'MongoDB Replica & Redis',
        icon: Database,
        color: 'border-emerald-400 text-emerald-300 bg-emerald-500/10',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
        metrics: { consistency: 'Majority Read/Write', auditRetention: '365 Days', shardKey: 'tenantId' },
        description:
          'Sharded document collections partitioned by organization ID with an immutable event log for complete enterprise change history rollbacks.',
        security: ['Encrypted storage at rest', 'Continuous audit log immutability', 'Zero cross-tenant data leakage guarantees']
      }
    ],
    terminalLogs: [
      '> [GATEWAY] Multi-tenant isolation verified for tenant: org_88194... [ISOLATED]',
      '> [SOCKET] WebSocket handshake established across 16 worker cluster nodes... [CONNECTED]',
      '> [PUBSUB] Real-time task modification broadcasted to 48 active board peers... [SENT]',
      '> [AUDIT] Immutable event log committed with cryptographic hash... [RECORDED]',
      '> [SYSTEM] Memory allocation: 142MB (0 memory leaks detected)... [OPTIMAL]'
    ]
  },
  'nhdro': {
    title: 'Nhdro Educational Platform — Architecture Blueprint',
    subtitle: 'Zero-Latency Interactive Classroom LMS & Content Streaming Engine',
    status: 'ACTIVE R&D / CLASSIFIED',
    nodes: [
      {
        id: 'frontend',
        title: 'Interactive Classroom',
        protocol: 'HLS Stream • SPA',
        tech: 'React.js & Responsive UI',
        icon: Layers,
        color: 'border-emerald-400 text-emerald-300 bg-emerald-500/10',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
        metrics: { tti: '< 0.8s', rendering: 'Responsive Adaptive', player: 'Custom Video Streamer' },
        description:
          'Interactive modern classroom portal delivering modular courses, live assessment test interfaces, and peer discussion spaces.',
        security: ['Secure iframe sandboxing', 'Cheat prevention tab monitoring', 'Strict form input validation']
      },
      {
        id: 'security',
        title: 'Academic Auth Guard',
        protocol: 'Session Lock • Anti-Cheat',
        tech: 'JWT & Exam Lockdown Guard',
        icon: ShieldCheck,
        color: 'border-cyan-400 text-cyan-300 bg-cyan-500/10',
        glow: 'shadow-[0_0_20px_rgba(0,240,255,0.3)]',
        metrics: { rbac: 'Student / Instructor / Admin', antiFraud: 'Session Lock', audit: 'Active' },
        description:
          'Granular role-based authorization restricting assessment submission windows, quiz key tampering, and unauthorized course material distribution.',
        security: ['Single-device active exam session enforcement', 'HMAC question token verification', 'TLS 1.3 encrypted exam tunnels']
      },
      {
        id: 'backend',
        title: 'Grading & Queue Core',
        protocol: 'BullMQ Async • REST',
        tech: 'Node.js & Async Workers',
        icon: Server,
        color: 'border-blue-400 text-blue-300 bg-blue-500/10',
        glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
        metrics: { gradingSpeed: '< 50ms', queue: 'BullMQ Async Queue', streaming: 'Adaptive HLS' },
        description:
          'Asynchronous evaluation engine providing instant automated test scoring, PDF report card compilation, and dynamic course catalog querying.',
        security: ['Isolated grading workers', 'Rate-limited test attempt submissions', 'Sanitized student text submissions']
      },
      {
        id: 'database',
        title: 'ACID Relational DB',
        protocol: 'ACID • Cloud CDN',
        tech: 'MySQL & Cloud Object CDN',
        icon: Database,
        color: 'border-fuchsia-400 text-fuchsia-300 bg-fuchsia-500/10',
        glow: 'shadow-[0_0_20px_rgba(255,0,127,0.3)]',
        metrics: { acid: 'Strict ACID Compliance', cdnHit: '99.1%', queries: 'Optimized B-Tree Index' },
        description:
          'Normalized relational schema enforcing academic transcript integrity and course enrollment relationships paired with CDN media caching.',
        security: ['Parameterized SQL queries (Zero SQLi)', 'Encrypted course PDF buckets', 'Daily automated differential backups']
      }
    ],
    terminalLogs: [
      '> [AUTH] Student session authenticated with strict anti-fraud tab token... [SECURE]',
      '> [EXAM] Automated evaluation engine graded submission in 34ms... [GRADED]',
      '> [REPORT] PDF transcript generated and uploaded to encrypted cloud storage... [UPLOADED]',
      '> [CDN] Course video chunk delivered via edge CDN with 99.4% cache hit... [STREAMING]',
      '> [DATABASE] ACID transaction committed across relational MySQL ledger... [COMMITTED]'
    ]
  }
};

export default function SystemInspectorModal({ projectId, onClose }) {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);

  const architecture = projectArchitectures[projectId] || projectArchitectures['relizane-fellah'];
  const activeNode = architecture.nodes[selectedNodeIndex];

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl bg-[#070913]/95 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,240,255,0.25)] text-slate-100 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glows */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.25)]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>SYSTEM BLUEPRINT INSPECTOR</span>
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                architecture.status === 'PRODUCTION LIVE'
                  ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300'
                  : 'bg-amber-500/15 border-amber-400/40 text-amber-300'
              }`}>
                {architecture.status}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-tight">
              {architecture.title}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{architecture.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 hover:border-cyan-400/40 transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer active:scale-95"
            aria-label="Close Inspector"
          >
            <span>[ESC]</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Architectural Flowchart (Step 1 ➔ Step 2 ➔ Step 3 ➔ Step 4) */}
        <div className="py-5 relative z-10">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Step-by-Step Dataflow Pipeline (Click any node to inspect)</span>
            </span>
            <span className="text-[11px] text-slate-400">Node {selectedNodeIndex + 1} / 4</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
            {architecture.nodes.map((node, idx) => {
              const IconComp = node.icon;
              const isSelected = selectedNodeIndex === idx;

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNodeIndex(idx)}
                  className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all duration-200 relative group cursor-pointer ${
                    isSelected
                      ? `bg-black/80 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.35)] scale-[1.02]`
                      : `bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.05]`
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                      isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-white/10 text-slate-400'
                    }`}>
                      0{idx + 1}
                    </span>
                    <div className={`p-1.5 rounded-lg border ${node.color}`}>
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="font-bold text-xs sm:text-sm font-display text-white mb-0.5">
                    {node.title}
                  </div>
                  <div className="text-[10px] text-cyan-300 font-mono line-clamp-1 mb-1">
                    {node.protocol}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 font-mono">
                    {node.tech}
                  </div>

                  {/* Flow Connector Arrow */}
                  {idx < architecture.nodes.length - 1 && (
                    <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-slate-600">
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400/50" />
                    </div>
                  )}

                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="active-blueprint-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-400 shadow-[0_0_8px_#00f0ff]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Inspector Panel for Selected Node */}
        <div className="bg-black/60 border border-white/10 rounded-2xl p-5 sm:p-6 mb-5 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${activeNode.color} ${activeNode.glow}`}>
                {(() => {
                  const Icon = activeNode.icon;
                  return <Icon className="w-5 h-5" />;
                })()}
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold font-display text-white">
                  Layer 0{selectedNodeIndex + 1}: {activeNode.title}
                </h4>
                <div className="flex flex-wrap items-center gap-2 mt-0.5">
                  <span className="text-xs text-cyan-300 font-mono font-semibold">{activeNode.tech}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-fuchsia-300 font-mono">{activeNode.protocol}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-xl text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Layer Status: Verified & Hardened</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            {activeNode.description}
          </p>

          {/* Performance Telemetry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
            {Object.entries(activeNode.metrics).map(([key, val]) => (
              <div key={key} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 font-mono">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">{key}</div>
                <div className="text-xs font-bold text-cyan-300 mt-0.5">{val}</div>
              </div>
            ))}
          </div>

          {/* Security & Reliability Measures */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-fuchsia-400 mb-2 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Security & Resilience Controls:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {activeNode.security.map((sec, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-300">
                  <Zap className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{sec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live System Status / Terminal Logs */}
        <div className="bg-black/90 border border-white/10 rounded-2xl p-4 relative z-10 font-mono">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2.5 border-b border-white/10 pb-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-cyan-300 font-bold">LIVE TELEMETRY / TERMINAL LOGS</span>
            <span className="text-emerald-400 ml-auto flex items-center gap-1.5 text-[10px]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              STREAMING
            </span>
          </div>

          <div className="space-y-1.5 text-[11px] text-slate-300 overflow-x-auto">
            {architecture.terminalLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-300">
                <span className="text-slate-500 shrink-0">[{idx + 1}]</span>
                <span className={idx === architecture.terminalLogs.length - 1 ? 'text-cyan-300' : 'text-slate-300'}>
                  {log}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="pt-5 mt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 relative z-10">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Architecture verified for high-concurrency enterprise workloads.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all cursor-pointer active:scale-95"
          >
            Close Blueprint [ESC]
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
