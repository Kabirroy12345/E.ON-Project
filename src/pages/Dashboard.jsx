import React, { useState, useEffect } from 'react'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement,
    Title, Tooltip, Legend, Filler
} from 'chart.js'
import {
    ShieldCheck, ShieldAlert, Clock, Activity, AlertTriangle,
    Radar, Cpu, ArrowUpRight, ArrowDownRight, Zap, Radio, CheckCircle2,
    FileText, Lock, Filter, Server, Eye, Crosshair
} from 'lucide-react'
import { motion } from 'framer-motion'
import {
    generateLiveAttackFeed,
    generateAttackFrequencyData,
    generateVulnerabilityCategories,
    generateThreatVectors,
    ATTACK_TYPES,
} from '../simulation/attackEngine'

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement,
    Title, Tooltip, Legend, Filler
)

const ATTACK_ICONS = {
    Syringe: ShieldAlert,
    Fish: AlertTriangle,
    Unplug: Zap,
    Cpu: Cpu,
    Lock: Lock,
    ScanEye: Radar,
}

// Chart Defaults
const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } },
        },
        tooltip: {
            backgroundColor: '#0f1429',
            borderColor: 'rgba(0,212,255,0.3)',
            borderWidth: 1,
            titleColor: '#e2e8f0',
            bodyColor: '#94a3b8',
        },
    },
    scales: {
        x: {
            ticks: { color: '#64748b', font: { size: 10 } },
            grid: { color: 'rgba(100, 116, 139, 0.1)' },
        },
        y: {
            ticks: { color: '#64748b', font: { size: 10 } },
            grid: { color: 'rgba(100, 116, 139, 0.1)' },
        },
    },
}

// Animated Counter Component
function AnimatedCounter({ value, duration = 1000, isFloat = false }) {
    const [displayVal, setDisplayVal] = useState(0)

    useEffect(() => {
        let startTimestamp = null
        const startValue = displayVal
        const endValue = value

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / duration, 1)
            const current = startValue + progress * (endValue - startValue)
            setDisplayVal(isFloat ? +current.toFixed(2) : Math.floor(current))

            if (progress < 1) {
                window.requestAnimationFrame(step)
            }
        }

        window.requestAnimationFrame(step)
    }, [value, duration, isFloat])

    return <span>{displayVal.toLocaleString()}</span>
}

// Grid Topology SVG component
function GridTopology() {
    const nodes = [
        { id: 'hv', label: 'HV Substation A', type: 'hv', status: 'online', x: 100, y: 70 },
        { id: 'mv1', label: 'MV Substation B', type: 'mv', status: 'online', x: 260, y: 40 },
        { id: 'mv2', label: 'MV Substation C', type: 'mv', status: 'alert', x: 260, y: 110 },
        { id: 'der1', label: 'Solar Farm (15MW)', type: 'der', status: 'online', x: 420, y: 30 },
        { id: 'der2', label: 'EV Hub (250 Units)', type: 'der', status: 'alert', x: 420, y: 80 },
        { id: 'der3', label: 'Heat Pump Fleet', type: 'der', status: 'online', x: 420, y: 130 },
        { id: 'hems1', label: 'HEMS Feeder #1', type: 'hems', status: 'online', x: 560, y: 40 },
        { id: 'hems2', label: 'HEMS Feeder #2', type: 'hems', status: 'online', x: 560, y: 90 },
        { id: 'hems3', label: 'HEMS Feeder #3', type: 'hems', status: 'investigating', x: 560, y: 140 },
    ]

    const links = [
        { from: 'hv', to: 'mv1' },
        { from: 'hv', to: 'mv2' },
        { from: 'mv1', to: 'der1' },
        { from: 'mv1', to: 'der2' },
        { from: 'mv2', to: 'der3' },
        { from: 'der1', to: 'hems1' },
        { from: 'der2', to: 'hems2' },
        { from: 'der3', to: 'hems3' },
    ]

    const statusColors = {
        online: '#00ff88',
        alert: '#ff3366',
        investigating: '#fbbf24',
    }

    const nodeRadius = { hv: 18, mv: 14, der: 11, hems: 8 }

    return (
        <div className="grid-topology" style={{ position: 'relative' }}>
            <div className="chart-glow-bg"></div>
            <svg viewBox="0 0 660 170" style={{ width: '100%', height: '100%' }}>
                {/* Links */}
                {links.map((link, i) => {
                    const n1 = nodes.find(n => n.id === link.from)
                    const n2 = nodes.find(n => n.id === link.to)
                    const isAlert = n1.status === 'alert' || n2.status === 'alert'
                    return (
                        <line
                            key={i}
                            x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y}
                            stroke={isAlert ? '#ff3366' : 'rgba(0,212,255,0.4)'}
                            strokeWidth={isAlert ? 2.5 : 1.5}
                            strokeDasharray="4 4"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from="24"
                                to="0"
                                dur={isAlert ? "0.5s" : "2s"}
                                repeatCount="indefinite"
                            />
                        </line>
                    )
                })}

                {/* Nodes */}
                {nodes.map(node => (
                    <g key={node.id} className="topo-node">
                        {node.status !== 'online' && (
                            <circle
                                cx={node.x} cy={node.y}
                                r={nodeRadius[node.type] + 6}
                                fill="none"
                                stroke={statusColors[node.status]}
                                strokeWidth={1.5}
                                opacity={0.4}
                            >
                                <animate attributeName="r" values={`${nodeRadius[node.type] + 4};${nodeRadius[node.type] + 10};${nodeRadius[node.type] + 4}`} dur="2s" repeatCount="indefinite" />
                            </circle>
                        )}
                        <circle
                            cx={node.x} cy={node.y}
                            r={nodeRadius[node.type]}
                            fill={node.type === 'hv' ? '#0f1429' : '#0a0e1a'}
                            stroke={statusColors[node.status]}
                            strokeWidth={2}
                        />
                        <text
                            x={node.x} y={node.y + nodeRadius[node.type] + 13}
                            textAnchor="middle"
                            fill="#94a3b8"
                            fontSize="8.5"
                            fontFamily="Inter"
                            fontWeight="600"
                        >
                            {node.label}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    )
}

// Threat gauge component
function ThreatGauge({ value = 35 }) {
    const radius = 68
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (value / 100) * circumference
    const color = value > 70 ? '#ff3366' : value > 40 ? '#fbbf24' : '#00ff88'
    const label = value > 70 ? 'CRITICAL' : value > 40 ? 'ELEVATED' : 'NOMINAL'

    const ticks = Array.from({ length: 36 }).map((_, i) => {
        const angle = (i / 36) * 360;
        const tickLength = i % 3 === 0 ? 7 : 4;
        return (
            <line
                key={i}
                x1="75" y1={75 - radius - 12}
                x2="75" y2={75 - radius - 12 + tickLength}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={i % 3 === 0 ? 2 : 1}
                transform={`rotate(${angle} 75 75)`}
            />
        )
    });

    return (
        <div className="threat-gauge" style={{ width: 170, height: 170, position: 'relative' }}>
            <svg viewBox="-15 -15 180 180" style={{ overflow: 'visible' }}>
                {ticks}
                <circle cx="75" cy="75" r={radius + 20} fill="none" stroke="rgba(0, 212, 255, 0.15)" strokeWidth="1" strokeDasharray="3 6">
                    <animateTransform attributeName="transform" type="rotate" from="0 75 75" to="360 75 75" dur="25s" repeatCount="indefinite" />
                </circle>
                <circle cx="75" cy="75" r={radius} className="gauge-bg" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
                <circle
                    cx="75" cy="75" r={radius}
                    className="gauge-fill"
                    stroke={color}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: 'stroke-dashoffset 1s ease-out' }}
                />
            </svg>
            <div className="gauge-text" style={{ textShadow: `0 0 12px ${color}` }}>
                <div className="gauge-value" style={{ color, fontSize: '1.8rem' }}><AnimatedCounter value={value} duration={1000} /></div>
                <div className="gauge-label" style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: '#94a3b8' }}>{label}</div>
            </div>
        </div>
    )
}

export default function Dashboard() {
    const [attackFeed, setAttackFeed] = useState(() => generateLiveAttackFeed(8))
    const [threatLevel, setThreatLevel] = useState(35)
    const [metrics, setMetrics] = useState({
        vulnsFound: 847,
        attacksBlocked: 12463,
        avgResponse: 1.83,
        uptime: 99.97,
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setAttackFeed(prev => {
                const newEvent = generateLiveAttackFeed(1)[0]
                return [newEvent, ...prev.slice(0, 7)]
            })
            setThreatLevel(prev => Math.max(15, Math.min(85, prev + (Math.random() - 0.52) * 8)))
            setMetrics(prev => ({
                ...prev,
                attacksBlocked: prev.attacksBlocked + Math.floor(Math.random() * 3),
                avgResponse: +(1 + Math.random() * 2.5).toFixed(1),
            }))
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    const freqData = generateAttackFrequencyData()
    const vulnCats = generateVulnerabilityCategories()
    const threatVecs = generateThreatVectors()

    const lineChartData = {
        labels: freqData.labels,
        datasets: [
            {
                label: 'Attacks Simulated (Red Team)',
                data: freqData.redData,
                borderColor: '#ff3366',
                backgroundColor: 'rgba(255, 51, 102, 0.12)',
                fill: true,
                tension: 0.4,
                pointRadius: 2,
                pointHoverRadius: 6,
            },
            {
                label: 'Threats Neutralized (Blue Team)',
                data: freqData.blueData,
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.12)',
                fill: true,
                tension: 0.4,
                pointRadius: 2,
                pointHoverRadius: 6,
            },
        ],
    }

    const doughnutData = {
        labels: vulnCats.labels,
        datasets: [{
            data: vulnCats.data,
            backgroundColor: ['#ff3366', '#ff9f43', '#fbbf24', '#00d4ff', '#a855f7', '#00ff88'],
            borderWidth: 0,
        }],
    }

    // Threat Vectors Detailed Data List for High-Tech Progress Matrix
    const threatVectorMatrix = [
        { mitre: 'T1566', name: 'Spearphishing Social Eng.', count: 3420, pct: 88, color: '#ff3366', trend: '+14%' },
        { mitre: 'T1190', name: 'Exploit Public-Facing App', count: 2890, pct: 74, color: '#ff9f43', trend: '+8%' },
        { mitre: 'T1110', name: 'Brute Force Credential Bomb', count: 2150, pct: 55, color: '#fbbf24', trend: '-2%' },
        { mitre: 'T1071', name: 'Application Layer C2 Protocol', count: 1840, pct: 47, color: '#00d4ff', trend: '+5%' },
        { mitre: 'T1195', name: 'Supply Chain Firmware Tamper', count: 1210, pct: 31, color: '#a855f7', trend: '+1%' },
        { mitre: 'T1078', name: 'Valid Account Misuse (OCPP)', count: 940, pct: 24, color: '#00ff88', trend: '-6%' },
    ]

    const statusIcons = {
        blocked: <ShieldCheck size={14} style={{ color: 'var(--green)' }} />,
        detected: <AlertTriangle size={14} style={{ color: 'var(--orange)' }} />,
        investigating: <Radar size={14} style={{ color: 'var(--cyan)' }} />,
    }

    return (
        <div>
            <div className="page-header">
                <h1>Security <span className="accent">Dashboard</span></h1>
                <p>Live SOC view — data simulated at 4-second intervals · Last synced: {new Date().toLocaleTimeString()}</p>
            </div>

            {/* Metrics */}
            <div className="metrics-grid">
                {[
                    { key: 'vulnsFound', label: 'Vulnerabilities Found', color: 'red', icon: ShieldAlert, prefix: '+12 this week', isFloat: false, pct: '18%' },
                    { key: 'attacksBlocked', label: 'Attacks Neutralized', color: 'green', icon: ShieldCheck, prefix: '99.7% block rate', isFloat: false, pct: '99.7%' },
                    { key: 'avgResponse', label: 'Avg Response Time', color: 'cyan', icon: Clock, prefix: '-0.4s improvement', suffix: 's', isFloat: true, pct: '88%' },
                    { key: 'uptime', label: 'System Uptime', color: 'orange', icon: Activity, prefix: '30-day rolling SLA', suffix: '%', isFloat: true, pct: '99.9%' }
                ].map((m, i) => (
                    <motion.div
                        key={m.key}
                        className={`metric-card-pro ${m.color}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="metric-header-row">
                            <span className="metric-tag-label">{m.label}</span>
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: `var(--${m.color})`, boxShadow: `0 0 8px var(--${m.color})` }}></span>
                        </div>
                        <div className="metric-value-pro">
                            <AnimatedCounter value={metrics[m.key]} isFloat={m.isFloat} />{m.suffix}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
                            <div className={`metric-change ${m.color === 'red' ? 'negative' : 'positive'}`} style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.3rem', color: `var(--${m.color})` }}>
                                <m.icon size={12} /> {m.prefix}
                            </div>
                            <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 700 }}>{m.pct}</span>
                        </div>
                        <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginTop: '0.5rem', overflow: 'hidden' }}>
                            <div style={{ width: m.pct, height: '100%', background: `var(--${m.color})`, borderRadius: '2px', boxShadow: `0 0 8px var(--${m.color})` }}></div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Grid Topology & Threat Matrix (No Empty Space!) */}
            <div className="grid-2 mb-3">
                <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <div className="card-header">
                        <h3><Radar size={16} style={{ color: 'var(--cyan)' }} /> Grid Topology — Live Telemetry Map</h3>
                        <span className="tag green">● 9 Substation Nodes Live</span>
                    </div>
                    <div className="card-body">
                        <GridTopology />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                                <span style={{ color: 'var(--green)', fontWeight: 700 }}>● HV Substation</span>: 100% Nominal
                            </div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                                <span style={{ color: 'var(--red)', fontWeight: 700 }}>● MV Substation C</span>: Mitigating Attack
                            </div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                                <span style={{ color: 'var(--orange)', fontWeight: 700 }}>● HEMS Feeder #3</span>: Inspection Active
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Threat Level Matrix Panel — Fully filled 2-column layout */}
                <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <div className="card-header">
                        <h3><ShieldAlert size={16} style={{ color: 'var(--orange)' }} /> Threat Security Matrix</h3>
                        <span className="tag cyan">Auto-updating 4s</span>
                    </div>
                    <div className="card-body" style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: '1.25rem', alignItems: 'center' }}>
                        {/* Gauge Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ThreatGauge value={Math.round(threatLevel)} />
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.35rem' }}>
                                Grid Threat Level: <strong style={{ color: threatLevel > 70 ? 'var(--red)' : threatLevel > 40 ? 'var(--orange)' : 'var(--green)' }}>{Math.round(threatLevel)} / 100</strong>
                            </div>
                        </div>

                        {/* Status & Active Indicators Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><ShieldAlert size={12} style={{ color: 'var(--red)' }} /> Active Critical Threats</span>
                                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--red)', fontWeight: 700 }}>3 Critical</span>
                                </div>
                                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                                    <div style={{ width: '75%', height: '100%', background: 'var(--red)', borderRadius: '2px' }}></div>
                                </div>
                            </div>

                            <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Radar size={12} style={{ color: 'var(--orange)' }} /> Under Investigation</span>
                                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--orange)', fontWeight: 700 }}>7 Events</span>
                                </div>
                                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                                    <div style={{ width: '45%', height: '100%', background: 'var(--orange)', borderRadius: '2px' }}></div>
                                </div>
                            </div>

                            <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CheckCircle2 size={12} style={{ color: 'var(--green)' }} /> Neutralized Today</span>
                                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700 }}>42 Events</span>
                                </div>
                                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                                    <div style={{ width: '92%', height: '100%', background: 'var(--green)', borderRadius: '2px' }}></div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.65rem', color: 'var(--cyan)', background: 'rgba(0,212,255,0.06)', padding: '0.4rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,212,255,0.2)' }}>
                                <span>SOAR Defense Mode: <strong>AUTOMATED ENFORCEMENT</strong></span>
                                <span style={{ fontFamily: 'var(--font-mono)' }}>99.7% BLOCK</span>
                            </div>

                            {/* Active Tech Stack Protocol Logos */}
                            <div className="protocol-chip-group" style={{ marginTop: '0.2rem' }}>
                                <span className="tech-logo-badge cyan">SCADA Modbus/TCP</span>
                                <span className="tech-logo-badge green">OCPP 2.0 EV</span>
                                <span className="tech-logo-badge purple">GNN-AI Engine</span>
                                <span className="tech-logo-badge red">MITRE ATT&CK</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Charts Row — Hyper-Advanced Visuals */}
            <div className="charts-grid mb-3">
                {/* 24h Attack Frequency Line Chart */}
                <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    <div className="card-header">
                        <h3><Activity size={16} style={{ color: 'var(--red)' }} /> Attack Frequency & Response Curve (24h)</h3>
                        <span className="tag red">Red vs Blue AI</span>
                    </div>
                    <div className="card-body">
                        <div style={{ height: 260 }}>
                            <Line data={lineChartData} options={{ ...chartDefaults }} />
                        </div>
                    </div>
                </motion.div>

                {/* Advanced Cyber Vector Radar Progress Matrix (Replaces Basic Bar Chart!) */}
                <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                    <div className="card-header">
                        <h3><Crosshair size={16} style={{ color: 'var(--purple)' }} /> Top MITRE ATT&CK Threat Vectors</h3>
                        <span className="tag purple">MITRE ICS Matrix</span>
                    </div>
                    <div className="card-body">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                            {threatVectorMatrix.map((vec, idx) => (
                                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', marginBottom: '0.35rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: vec.color, background: 'rgba(0,0,0,0.4)', padding: '0.1rem 0.4rem', borderRadius: '3px', border: `1px solid ${vec.color}40` }}>
                                                {vec.mitre}
                                            </span>
                                            <span style={{ fontWeight: 600, color: 'var(--text-bright)' }}>{vec.name}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'var(--font-mono)' }}>
                                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{vec.count.toLocaleString()} evts</span>
                                            <span style={{ fontSize: '0.62rem', color: vec.trend.startsWith('+') ? 'var(--red)' : 'var(--green)' }}>{vec.trend}</span>
                                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: vec.color }}>{vec.pct}%</span>
                                        </div>
                                    </div>
                                    <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ width: `${vec.pct}%`, height: '100%', background: `linear-gradient(90deg, ${vec.color}, var(--cyan))`, borderRadius: '3px', boxShadow: `0 0 8px ${vec.color}` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Live Feed & Vuln Categories */}
            <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
                <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                    <div className="card-header">
                        <h3><Activity size={16} style={{ color: 'var(--green)' }} /> Real-Time SOC Incident Stream</h3>
                        <span className="tag red">● LIVE AUDIT STREAM</span>
                    </div>
                    <div className="card-body" style={{ padding: 0, maxHeight: 320, overflowY: 'auto' }}>
                        {attackFeed.map((event, i) => {
                            const AttackIcon = ATTACK_ICONS[event.attack.icon] || ShieldAlert
                            return (
                                <div key={event.id + i} style={{
                                    padding: '0.65rem 1.5rem',
                                    borderBottom: '1px solid var(--border)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    fontSize: '0.78rem',
                                    animation: i === 0 ? 'fadeIn 0.5s ease' : 'none',
                                }}>
                                    <div className="icon-container red" style={{ width: 32, height: 32 }}>
                                        <AttackIcon size={16} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ color: 'var(--text-bright)', fontWeight: 600, fontSize: '0.78rem' }}>
                                            {event.attack.name}
                                        </div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>
                                            {event.target} — {event.timestamp}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                        {statusIcons[event.status]}
                                        <span className={`severity ${event.status === 'blocked' ? 'low' : event.status === 'detected' ? 'high' : 'medium'}`}>
                                            {event.status}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>

                <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                    <div className="card-header">
                        <h3><ShieldAlert size={16} style={{ color: 'var(--cyan)' }} /> Vulnerability Category Breakdown</h3>
                        <span className="tag cyan">CVE Registry</span>
                    </div>
                    <div className="card-body" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: 240, height: 240 }}>
                            <Doughnut data={doughnutData} options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                cutout: '65%',
                                plugins: {
                                    legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 10 }, padding: 12 } },
                                    tooltip: {
                                        backgroundColor: '#0f1429',
                                        borderColor: 'rgba(0,212,255,0.3)',
                                        borderWidth: 1,
                                        titleColor: '#e2e8f0',
                                        bodyColor: '#94a3b8',
                                    },
                                },
                            }} />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Analyst note */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{
                background: 'rgba(251,191,36,0.07)',
                border: '1px solid rgba(251,191,36,0.25)',
                borderLeft: '3px solid var(--yellow)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1.25rem',
                fontSize: '0.78rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--yellow)' }}><FileText size={14} /></span>
                    <span style={{ fontWeight: 700, color: 'var(--yellow)', fontSize: '0.72rem' }}>Demo Note — Pulkit Agrawal, Lead Engineer</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginLeft: 'auto' }}>Aug 2026</span>
                </div>
                Dashboard feed is simulated at 4-second intervals for this hackathon demo. In the proposed production architecture, the attack feed would connect to a SIEM via Kafka topic{' '}
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)', fontSize: '0.72rem' }}>gridshield.threats.live</span>.
                The 99.97% uptime figure is our <em>design target</em> for production deployment, not a measured metric from a live system.
                The 1.83s response time is an estimate based on our GraphSAGE subsampling architecture — actual production latency would need validation in a real DSO environment.
            </motion.div>
        </div>
    )
}
