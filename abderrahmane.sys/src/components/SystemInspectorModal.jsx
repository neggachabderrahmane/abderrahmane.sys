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
  Sparkles
} from 'lucide-react';

const projectArchitectures = {
  'relizane-fellah': {
    title: 'Relizane Fellah — Architecture Map',
    subtitle: 'AgriTech Direct Marketplace & Patent Concept Architecture',
    nodes: [
      {
        id: 'frontend',
        title: 'Frontend Edge',
        tech: 'React.js 19 & Tailwind PWA',
        icon: Layers,
        color: 'border-cyan-400 text-cyan-300 bg-cyan-500/10',
        glow: 'shadow-[0_0_20px_rgba(0,240,255,0.3)]',
        metrics: { latency: '< 25ms TTFB', payload: 'Compressed WebP', state: 'Optimistic UI' },
        description:
          'Responsive agricultural marketplace client with offline capabilities, localized multi-language state, and zero-flicker frame rendering for mobile field use.',
        security: ['Content Security Policy (CSP Level 3)', 'Sanitized DOM rendering', 'Local token encryption in secure storage']
      },
      {
        id: 'security',
        title: 'Security Gateway',
        tech: 'Firebase Auth & Token Guard',
        icon: ShieldCheck,
        color: 'border-fuchsia-400 text-fuchsia-300 bg-fuchsia-500/10',
        glow: 'shadow-[0_0_20px_rgba(255,0,127,0.3)]',
        metrics: { auth: 'OAuth2 / JWT', rateLimit: '120 req/min/IP', threatShield: 'Active' },
        description:
          'Strict role-based access control segregating Farmers, Commercial Buyers, and Regulators with cryptographic token signing and anti-replay nonce validation.',
        security: ['Granular Firebase Security Rules', 'Encrypted TLS 1.3 transport', 'Zero plaintext credential storage']
      },
      {
        id: 'backend',
        title: 'Core Engine',
        tech: 'Node.js & Cloud Functions',
        icon: Server,
        color: 'border-blue-400 text-blue-300 bg-blue-500/10',
        glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
        metrics: { execution: 'Event-Driven', concurrency: 'Horizontal Auto-Scale', workers: 'Cluster Mode' },
        description:
          'Automated stock reservation algorithms with concurrency lock handling to prevent double-booking during high-volume wholesale harvest auctions.',
        security: ['Atomic order transactions', 'Input schema validation via Zod', 'Audit trails for all financial exchanges']
      },
      {
        id: 'database',
        title: 'Data & Storage',
        tech: 'Firestore & Cloud Storage',
        icon: Database,
        color: 'border-emerald-400 text-emerald-300 bg-emerald-500/10',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
        metrics: { durability: '99.999999999%', replication: 'Multi-Region', indexing: 'Composite Geospatial' },
        description:
          'Real-time document database with geospatial indexing for nearby farm discovery and cold-storage archiving of encrypted patent & agricultural trade receipts.',
        security: ['AES-256 at-rest encryption', 'Continuous automated backups', 'Role-restricted database collections']
      }
    ]
  },
  'gym-app': {
    title: 'Gym Mobile App — Architecture Map',
    subtitle: 'Cross-Platform Mobile Ecosystem & Biometric Sync Engine',
    nodes: [
      {
        id: 'frontend',
        title: 'Mobile Client',
        tech: 'React Native & Redux Toolkit',
        icon: Layers,
        color: 'border-fuchsia-400 text-fuchsia-300 bg-fuchsia-500/10',
        glow: 'shadow-[0_0_20px_rgba(255,0,127,0.3)]',
        metrics: { fps: '60 FPS Native', offline: 'SQLite Cache', sync: 'Delta Sync Engine' },
        description:
          'High-performance cross-platform mobile application utilizing native device bridges for biometric authentication and accelerometer sensor capture.',
        security: ['Keychain / KeyStore credential storage', 'SSL Pinning', 'Memory-scrubbed session cache']
      },
      {
        id: 'security',
        title: 'Auth & Biometric Gate',
        tech: 'OAuth2 & Biometric Key Vault',
        icon: ShieldCheck,
        color: 'border-cyan-400 text-cyan-300 bg-cyan-500/10',
        glow: 'shadow-[0_0_20px_rgba(0,240,255,0.3)]',
        metrics: { auth: 'Fingerprint/FaceID + JWT', expiry: '15-min Rolling Refresh', breachDetection: 'Enabled' },
        description:
          'Decoupled identity provider issuing short-lived signed JWTs with hardware-backed biometric verification prior to accessing member subscription services.',
        security: ['Hardware-enclave signature validation', 'Brute-force lockout protocols', 'Device fingerprint telemetry']
      },
      {
        id: 'backend',
        title: 'API Microservices',
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
        title: 'Persistence Layer',
        tech: 'MongoDB Cluster & Redis',
        icon: Database,
        color: 'border-emerald-400 text-emerald-300 bg-emerald-500/10',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
        metrics: { cacheHit: '98.7%', indexing: 'TimeSeries & B-Tree', backups: 'Point-in-Time' },
        description:
          'Document collection store for member profiles and workout sets paired with a Redis in-memory cache for ultra-fast check-in token resolution.',
        security: ['Encrypted database transport', 'Automatic failover replica sets', 'Field-level biometric hashing']
      }
    ]
  },
  'teamsync': {
    title: 'TeamSync / Abdo-Team — Architecture Map',
    subtitle: 'High-Concurrency B2B SaaS Collaboration & Real-Time Sync Engine',
    nodes: [
      {
        id: 'frontend',
        title: 'Interactive Web Client',
        tech: 'React.js & WebSocket Client',
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
        title: 'Zero-Trust Gateway',
        tech: 'Multi-Tenant RBAC & WAF',
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
        title: 'Database & Event Store',
        tech: 'MongoDB Replica & Redis',
        icon: Database,
        color: 'border-emerald-400 text-emerald-300 bg-emerald-500/10',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
        metrics: { consistency: 'Majority Read/Write', auditRetention: '365 Days', shardKey: 'tenantId' },
        description:
          'Sharded document collections partitioned by organization ID with an immutable event log for complete enterprise change history rollbacks.',
        security: ['Encrypted storage at rest', 'Continuous audit log immutability', 'Zero cross-tenant data leakage guarantees']
      }
    ]
  },
  'nhdro': {
    title: 'Nhdro Educational Platform — Architecture Map',
    subtitle: 'Zero-Latency Interactive Classroom LMS & Content Streaming Engine',
    nodes: [
      {
        id: 'frontend',
        title: 'Student & Teacher Portal',
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
        title: 'Academic Auth & Access',
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
        title: 'LMS Core & Grading Queue',
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
        title: 'Relational Database & CDN',
        tech: 'MySQL & Cloud Object CDN',
        icon: Database,
        color: 'border-fuchsia-400 text-fuchsia-300 bg-fuchsia-500/10',
        glow: 'shadow-[0_0_20px_rgba(255,0,127,0.3)]',
        metrics: { acid: 'Strict ACID Compliance', cdnHit: '99.1%', queries: 'Optimized B-Tree Index' },
        description:
          'Normalized relational schema enforcing academic transcript integrity and course enrollment relationships paired with CDN media caching.',
        security: ['Parameterized SQL queries (Zero SQLi)', 'Encrypted course PDF buckets', 'Daily automated differential backups']
      }
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
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl bg-[#090b14]/95 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,240,255,0.25)] text-slate-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 mb-2 shadow-[0_0_12px_rgba(0,240,255,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>X-RAY SYSTEM INSPECTOR</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-tight">
              {architecture.title}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{architecture.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer"
            aria-label="Close Inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Architectural Node Graph (Step 1 -> Step 2 -> Step 3 -> Step 4) */}
        <div className="py-6 relative z-10">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400/80 mb-3 flex items-center justify-between">
            <span>Interactive Dataflow Pipeline (Click any node to inspect layer)</span>
            <span className="text-[11px] text-slate-400">Node {selectedNodeIndex + 1} of 4</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
            {architecture.nodes.map((node, idx) => {
              const IconComp = node.icon;
              const isSelected = selectedNodeIndex === idx;

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeIndex(idx)}
                  className={`p-4 rounded-2xl text-left border transition-all relative group cursor-pointer ${
                    isSelected
                      ? `bg-black/80 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.35)] scale-[1.02]`
                      : `bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.05]`
                  }`}
                >
                  {/* Step Sequence Badge */}
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
                  <div className="text-[11px] text-slate-400 line-clamp-1 font-mono">
                    {node.tech}
                  </div>

                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="active-node-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-400 shadow-[0_0_8px_#00f0ff]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Inspector Panel for Selected Node */}
        <div className="bg-black/60 border border-white/10 rounded-2xl p-5 sm:p-6 relative z-10">
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
                <p className="text-xs text-cyan-300 font-mono">{activeNode.tech}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-xl text-slate-300">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Layer Status: Optimal</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
            {activeNode.description}
          </p>

          {/* Performance Telemetry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {Object.entries(activeNode.metrics).map(([key, val]) => (
              <div key={key} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 font-mono">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">{key}</div>
                <div className="text-xs font-bold text-cyan-300 mt-0.5">{val}</div>
              </div>
            ))}
          </div>

          {/* Security & Reliability Measures */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-fuchsia-400 mb-2 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Security & Reliability Controls:</span>
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

        {/* Modal Bottom Actions */}
        <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 relative z-10">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Architecture verified for high-concurrency enterprise workloads.</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
