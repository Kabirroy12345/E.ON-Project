import React, { useState, useEffect, useCallback } from 'react'
import {
    Swords, ShieldCheck, Crosshair, Brain, Target, Zap,
    ArrowRight, Play, RotateCcw, CheckCircle2, AlertTriangle, XCircle,
    Search, Wrench, ScanEye, FileText, Syringe, Fish, Unplug, Cpu, Lock, ShieldAlert
} from 'lucide-react'
import { motion } from 'framer-motion'
import {
    ATTACK_TYPES,
    VULNERABILITY_DB,
    generateAttackEvent,
    generateDefenseResponse,
    generateTimestamp,
} from '../simulation/attackEngine'

const ATTACK_ICONS = {
    Syringe: Syringe,
    Fish: Fish,
    Unplug: Unplug,
    Cpu: Cpu,
    Lock: Lock,
    ScanEye: ScanEye,
}

// Cycle step data
const CYCLE_STEPS = [
    { num: 'STEP 01', icon: Crosshair, label: 'Attack', desc: 'AI Exploit Probe', detail: 'Simulates 50+ ATT&CK Vectors', color: '#ff3366', bgColor: 'rgba(255, 51, 102, 0.15)' },
    { num: 'STEP 02', icon: ScanEye, label: 'Detect', desc: 'DPI & IDS Engine', detail: '<1.83s Median Alert Time', color: '#ff9f43', bgColor: 'rgba(255, 159, 67, 0.15)' },
    { num: 'STEP 03', icon: Search, label: 'Analyze', desc: 'Graph Neural Net', detail: 'CVSS Score & Blast Radius', color: '#00d4ff', bgColor: 'rgba(0, 212, 255, 0.15)' },
    { num: 'STEP 04', icon: Wrench, label: 'Patch', desc: 'SOAR Auto-Enforce', detail: 'Deploys Gateway Protection', color: '#00ff88', bgColor: 'rgba(0, 255, 136, 0.15)' },
    { num: 'STEP 05', icon: CheckCircle2, label: 'Verify', desc: 'Automated Rescan', detail: '100% Surface Neutralized', color: '#a855f7', bgColor: 'rgba(168, 85, 247, 0.15)' },
    { num: 'STEP 06', icon: Brain, label: 'Learn', desc: 'Model Retraining', detail: 'Continuous GNN Weight Sync', color: '#fbbf24', bgColor: 'rgba(251, 191, 36, 0.15)' },
]

export default function PurpleTeam() {
    const [selectedAttack, setSelectedAttack] = useState(null)
    const [isRunning, setIsRunning] = useState(false)
    const [progress, setProgress] = useState(0)
    const [currentPhase, setCurrentPhase] = useState('')
    const [activeCycleStep, setActiveCycleStep] = useState(-1)
    const [logs, setLogs] = useState([])
    const [defenseReport, setDefenseReport] = useState(null)
    const [simulationComplete, setSimulationComplete] = useState(false)

    const addLog = useCallback((prefix, prefixColor, message) => {
        setLogs(prev => [...prev, { timestamp: generateTimestamp(), prefix, prefixColor, message }])
    }, [])

    const delay = (ms) => new Promise(res => setTimeout(res, ms))

    const runSimulation = async () => {
        if (!selectedAttack || isRunning) return

        const attack = ATTACK_TYPES.find(a => a.id === selectedAttack)
        if (!attack) return

        setIsRunning(true)
        setProgress(0)
        setLogs([])
        setDefenseReport(null)
        setSimulationComplete(false)

        // Phase 1: Attack Selection
        setActiveCycleStep(0)
        setCurrentPhase('attack')
        addLog('[RED TEAM]', 'red', `Initiating simulated ${attack.name} against ${attack.targets[0]}`)
        await delay(600)
        setProgress(15)

        // Phase 2: Execution
        addLog('[RED TEAM]', 'red', `Exploiting vulnerability ${attack.cve} (${attack.mitre})`)
        await delay(800)
        setProgress(35)

        // Phase 3: Detection
        setActiveCycleStep(1)
        setCurrentPhase('detection')
        addLog('[BLUE]', 'blue', `[ALERT] Anomalous activity detected on ${attack.targets[0]}`)
        await delay(500)
        addLog('[BLUE]', 'blue', `IDS alert triggered — pattern match: ${attack.mitre}`)
        await delay(600)
        setProgress(55)
        addLog('[BLUE]', 'blue', `SIEM correlation: High confidence threat identified`)
        await delay(500)

        // Phase 4: Analysis
        setActiveCycleStep(2)
        setCurrentPhase('analysis')
        addLog('[AI]', 'purple', `Analyzing attack vector and lateral movement patterns...`)
        await delay(800)
        setProgress(65)
        addLog('[AI]', 'purple', `Threat classification: ${attack.severity.toUpperCase()} — CVSS ${attack.cvss}`)
        await delay(600)

        // Phase 5: Defense
        setActiveCycleStep(3)
        setCurrentPhase('patching')
        const event = generateAttackEvent(selectedAttack)
        const defense = generateDefenseResponse(event)

        for (const action of defense.actions) {
            addLog('[BLUE]', 'blue', `${action.status === 'success' ? '[OK]' : '[..]'} ${action.action}`)
            await delay(500)
            setProgress(prev => Math.min(prev + 5, 85))
        }

        // Phase 6: Verify
        setActiveCycleStep(4)
        setCurrentPhase('verification')
        addLog('[AI]', 'green', `Re-scanning ${attack.targets[0]} for residual vulnerabilities...`)
        await delay(800)
        setProgress(92)
        addLog('[AI]', 'green', `Verification complete — Attack surface reduced by ${(85 + Math.random() * 14).toFixed(0)}%`)
        await delay(500)

        // Phase 7: Learn
        setActiveCycleStep(5)
        setCurrentPhase('learning')
        addLog('[AI]', 'purple', `Updating threat intelligence database with new patterns...`)
        await delay(600)
        addLog('[AI]', 'purple', `Defense playbook updated — ${defense.actions.length} new rules deployed`)
        await delay(500)
        setProgress(100)
        addLog('[SYSTEM]', 'green', `[DONE] Simulation complete. Threat ${defense.blocked ? 'NEUTRALIZED' : 'CONTAINED'}.`)

        setDefenseReport(defense)
        setSimulationComplete(true)
        setIsRunning(false)
    }

    const reset = () => {
        setSelectedAttack(null)
        setIsRunning(false)
        setProgress(0)
        setCurrentPhase('')
        setActiveCycleStep(-1)
        setLogs([])
        setDefenseReport(null)
        setSimulationComplete(false)
    }

    return (
        <div>
            <div className="page-header">
                <h1>Purple Team <span className="accent">AI Agent</span></h1>
                <p>Unified AI-driven attack simulation & defensive hardening engine (Cluster 4) — 6 attack scenarios, real MITRE ATT&CK references</p>
            </div>

            {/* Learning Cycle — Fully Stretchable 6-Column Pipeline with Big Glowing Icons */}
            <div className="glass-card mb-3">
                <div className="card-header">
                    <h3><Brain size={16} style={{ color: 'var(--purple)' }} /> Self-Evolving Autonomous Security Loop</h3>
                    <span className="tag purple">● Continuous Pipeline Active</span>
                </div>
                <div className="card-body" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div className="cycle-container-stretch">
                        {CYCLE_STEPS.map((step, i) => {
                            const StepIcon = step.icon;
                            const isActive = activeCycleStep === i;
                            return (
                                <div key={i} className={`cycle-step-card ${isActive ? 'active' : ''}`}>
                                    <span className="step-num-badge" style={{ color: step.color, background: step.bgColor, border: `1px solid ${step.color}40` }}>
                                        {step.num}
                                    </span>
                                    <div
                                        className={`cycle-step-circle-large ${isActive ? 'active' : ''}`}
                                        style={{
                                            background: isActive ? step.bgColor : 'rgba(255,255,255,0.03)',
                                            border: `2px solid ${isActive ? step.color : 'var(--border)'}`,
                                            color: step.color,
                                        }}
                                    >
                                        <StepIcon size={26} />
                                    </div>
                                    <div className="cycle-step-title">{step.label}</div>
                                    <div className="cycle-step-sub" style={{ fontWeight: 700, color: step.color, marginBottom: '0.2rem' }}>{step.desc}</div>
                                    <div className="cycle-step-sub">{step.detail}</div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Loop Telemetry Strip */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '0.6rem 1rem', marginTop: '0.5rem', fontSize: '0.68rem', fontFamily: 'var(--font-mono)' }}>
                        <span style={{ color: 'var(--cyan)' }}>LOOP STATE: <strong>AUTONOMOUS CONTINUOUS</strong></span>
                        <span style={{ color: 'var(--purple)' }}>AI MODEL: <strong>ResNet-1D + GNN v4.2</strong></span>
                        <span style={{ color: 'var(--green)' }}>COMPLETED CYCLES: <strong>14,892 PASSES</strong></span>
                        <span style={{ color: 'var(--yellow)' }}>HARDENING STATUS: <strong>100% SYNCHRONIZED</strong></span>
                    </div>
                </div>
            </div>

            <div className="grid-2 mb-3">
                {/* Attack Selection */}
                <div className="glass-card">
                    <div className="card-header">
                        <h3><Crosshair size={16} style={{ color: 'var(--red)' }} /> Red Team — Select Attack</h3>
                    </div>
                    <div className="card-body">
                        <div className="attack-select-grid">
                            {ATTACK_TYPES.map((attack, i) => {
                                const AttackIcon = ATTACK_ICONS[attack.icon] || ShieldAlert;
                                return (
                                    <motion.div
                                        key={attack.id}
                                        className={`attack-option ${selectedAttack === attack.id ? 'selected' : ''}`}
                                        onClick={() => !isRunning && setSelectedAttack(attack.id)}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        whileHover={!isRunning ? { scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' } : {}}
                                        whileTap={!isRunning ? { scale: 0.98 } : {}}
                                    >
                                        <div className="attack-icon"><AttackIcon size={24} /></div>
                                        <h4>{attack.name}</h4>
                                        <p>{attack.category}</p>
                                        <div className="protocol-chip-group" style={{ marginTop: '0.4rem' }}>
                                            <span className="tech-logo-badge red" style={{ fontSize: '0.55rem', padding: '0.1rem 0.35rem' }}>{attack.mitre}</span>
                                            <span className="tech-logo-badge purple" style={{ fontSize: '0.55rem', padding: '0.1rem 0.35rem' }}>CVSS {attack.cvss}</span>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
                            <button
                                className="btn btn-danger"
                                onClick={runSimulation}
                                disabled={!selectedAttack || isRunning}
                                style={{ opacity: (!selectedAttack || isRunning) ? 0.5 : 1 }}
                            >
                                <Play size={14} />
                                {isRunning ? 'Simulating...' : 'Launch Attack Simulation'}
                            </button>
                            <button className="btn btn-ghost" onClick={reset}>
                                <RotateCcw size={14} />
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Defense Response */}
                <div className="glass-card">
                    <div className="card-header">
                        <h3><ShieldCheck size={16} style={{ color: 'var(--cyan)' }} /> Blue Team — Defense Response</h3>
                        {defenseReport && (
                            <span className={`tag ${defenseReport.blocked ? 'green' : 'orange'}`}>
                                {defenseReport.blocked ? '● BLOCKED' : '● CONTAINED'}
                            </span>
                        )}
                    </div>
                    <div className="card-body">
                        {/* Progress */}
                        {isRunning && (
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '0.25rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Phase: {currentPhase}</span>
                                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>{progress}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill cyan" style={{ width: `${progress}%`, transition: 'width 0.3s ease' }} />
                                </div>
                            </div>
                        )}

                        {defenseReport ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <div style={{ padding: '0.75rem', background: 'var(--cyan-dim)', borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>DETECTION TIME</div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>
                                            {defenseReport.detectionTime}
                                        </div>
                                    </div>
                                    <div style={{ padding: '0.75rem', background: 'var(--green-dim)', borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>RESPONSE TIME</div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>
                                            {defenseReport.responseTime}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Defense actions executed:</div>
                                {defenseReport.actions.map((action, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        padding: '0.4rem 0', fontSize: '0.75rem', color: 'var(--text-secondary)',
                                    }}>
                                        {action.status === 'success'
                                            ? <CheckCircle2 size={13} style={{ color: 'var(--green)', flexShrink: 0 }} />
                                            : <AlertTriangle size={13} style={{ color: 'var(--orange)', flexShrink: 0 }} />
                                        }
                                        <span>{action.action}</span>
                                    </motion.div>
                                ))}
                                <div style={{
                                    marginTop: '1rem', padding: '0.75rem',
                                    background: 'var(--purple-dim)', borderRadius: 'var(--radius-md)',
                                    fontSize: '0.75rem', color: 'var(--purple)',
                                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                                }}>
                                    <Brain size={14} /> AI confidence: {defenseReport.confidence}% — Defense playbook updated
                                </div>
                            </motion.div>
                        ) : (
                            <div style={{
                                height: 200, display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center',
                                color: 'var(--text-muted)', fontSize: '0.82rem', gap: '0.5rem',
                            }}>
                                <ShieldCheck size={32} style={{ opacity: 0.3 }} />
                                {isRunning ? 'Analyzing attack patterns...' : 'Select & launch an attack to see defense response'}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Agent Activity Log */}
            <div className="glass-card mb-3">
                <div className="card-header">
                    <h3><Zap size={16} style={{ color: 'var(--green)' }} /> AI Agent Activity Log</h3>
                    {isRunning && <span className="tag red">● RECORDING</span>}
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                    <div className="terminal">
                        <div className="terminal-header">
                            <div className="terminal-dot red"></div>
                            <div className="terminal-dot yellow"></div>
                            <div className="terminal-dot green"></div>
                            <span className="terminal-title">gridshield-ai@agent ~ $ purple_team --mode=autonomous</span>
                        </div>
                        <div className="terminal-body">
                            {logs.length === 0 ? (
                                <div className="terminal-line">
                                    <span className="prefix green">[SYSTEM]</span>
                                    <span className="message">GridShield AI Agent v2.1 initialized. Awaiting attack simulation command...</span>
                                </div>
                            ) : (
                                logs.map((log, i) => (
                                    <div key={i} className="terminal-line" style={{ animation: 'fadeIn 0.3s ease' }}>
                                        <span className="timestamp">{log.timestamp}</span>
                                        <span className={`prefix ${log.prefixColor}`}>{log.prefix}</span>
                                        <span className="message">{log.message}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Vulnerability Database */}
            <div className="glass-card">
                <div className="card-header">
                    <h3><Target size={16} style={{ color: 'var(--orange)' }} /> Vulnerability Database</h3>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {VULNERABILITY_DB.length} findings
                    </span>
                </div>
                <div className="card-body" style={{ padding: 0, overflow: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>CVE ID</th>
                                <th>Vulnerability</th>
                                <th>System</th>
                                <th>Severity</th>
                                <th>CVSS</th>
                                <th>Status</th>
                                <th>Remediation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {VULNERABILITY_DB.map(vuln => (
                                <tr key={vuln.id}>
                                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cyan)' }}>
                                        {vuln.id}
                                    </td>
                                    <td style={{ color: 'var(--text-bright)', fontWeight: 500 }}>{vuln.name}</td>
                                    <td>{vuln.system}</td>
                                    <td><span className={`severity ${vuln.severity}`}>{vuln.severity}</span></td>
                                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: vuln.cvss >= 9 ? 'var(--red)' : vuln.cvss >= 7 ? 'var(--orange)' : 'var(--yellow)' }}>
                                        {vuln.cvss}
                                    </td>
                                    <td>
                                        <span className={`tag ${vuln.status === 'patched' ? 'green' : vuln.status === 'mitigated' ? 'cyan' : 'orange'}`}>
                                            {vuln.status}
                                        </span>
                                    </td>
                                    <td style={{ fontSize: '0.72rem' }}>{vuln.remediation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Human note on simulation */}
            <div style={{
                background: 'rgba(251,191,36,0.07)',
                border: '1px solid rgba(251,191,36,0.25)',
                borderLeft: '3px solid var(--yellow)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1.25rem',
                fontSize: '0.78rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginTop: '1.5rem',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <FileText size={14} style={{ color: 'var(--yellow)' }} />
                    <span style={{ fontWeight: 700, color: 'var(--yellow)', fontSize: '0.72rem' }}>Dev Note — Kabir Roy, Security Lead</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginLeft: 'auto' }}>Aug 2026</span>
                </div>
                The attack flows shown here are <em>scripted simulations</em> for hackathon demo purposes, not live exploit code.
                In a production deployment, the Red Team agent would use real exploit frameworks (e.g., Metasploit-compatible modules for SCADA HMI probing, protocol fuzzers for DNP3/Modbus).
                The MITRE ATT&CK IDs (T1190, T1566, etc.) reference real technique classifications.
                The CVE identifiers shown are <em>synthetic placeholders</em> (prefixed SIM-) to illustrate the detection workflow — they do not represent real vulnerabilities in real vendor products.
                Detection time targets of 0.5–2.5s are architecture estimates based on our GraphSAGE subsampling design, pending validation in a real OT environment.
            </div>
        </div>
    )
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
