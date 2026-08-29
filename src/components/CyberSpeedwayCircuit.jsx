import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Swords, Shield, Cpu, Globe, ChevronRight, Zap, Flame, Gauge,
    CheckCircle2, Radio, Activity, AlertTriangle, Trophy, Flag
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function CyberSpeedwayCircuit({ activeTheme }) {
    const [boostMode, setBoostMode] = useState('TELEMETRY') // TELEMETRY | NITRO | PITSTOP
    const [hoveredCard, setHoveredCard] = useState(null)
    const [tachometerRpm, setTachometerRpm] = useState(8400)

    // Rev tachometer RPM dynamically
    useEffect(() => {
        const interval = setInterval(() => {
            setTachometerRpm(prev => 8400 + Math.floor(Math.random() * 800 - 400))
        }, 300)
        return () => clearInterval(interval)
    }, [])

    const checkpoints = [
        {
            num: 'CHECKPOINT 01',
            title: 'Autonomous Attack Simulation',
            subtitle: 'OFFENSIVE RED TEAM AI',
            desc: 'Executes 50+ MITRE ATT&CK adversary vectors against SCADA, OCPP EV gateways, and solar inverters with automated vulnerability discovery.',
            icon: Swords,
            accent: 'var(--red)',
            glow: 'rgba(255, 0, 85, 0.4)',
            rpm: '12,400 RPM',
            metricLabel: 'ATTACK VELOCITY',
            metricVal: '50+ VECTORS',
            flag: 'FASTEST LAP',
            link: '/purple-team'
        },
        {
            num: 'CHECKPOINT 02',
            title: 'GraphSAGE GNN Blast Radius',
            subtitle: 'NEURAL GRAPH DEFENSE',
            desc: '2-hop GraphSAGE neighborhood sampling evaluating multi-substation threat propagation across 9.6M nodes in <140ms on GPU.',
            icon: Cpu,
            accent: 'var(--cyan)',
            glow: 'rgba(0, 212, 255, 0.4)',
            rpm: '14,200 RPM',
            metricLabel: 'GRAPH LATENCY',
            metricVal: '<140ms GPU',
            flag: 'SUB-2S REACTION',
            link: '/dashboard'
        },
        {
            num: 'CHECKPOINT 03',
            title: 'Zero-Telemetry Edge Agent',
            subtitle: 'EDGE TINYML AGENT',
            desc: 'Executes on Cortex-M4 microcontrollers (<800KB footprint) with 1.14ms latency, guaranteeing 100% on-device GDPR privacy.',
            icon: Shield,
            accent: 'var(--green)',
            glow: 'rgba(0, 255, 136, 0.4)',
            rpm: '16,800 RPM',
            metricLabel: 'EDGE SPEED',
            metricVal: '1.14ms / 800 FPS',
            flag: '100% AIR-GAPPED',
            link: '/asset-shield'
        },
        {
            num: 'CHECKPOINT 04',
            title: 'Cluster 5 Incentive Framework',
            subtitle: 'CUSTOMER ADOPTION',
            desc: '4-pillar customer incentive model offering dynamic tariff discounts & up to 25% insurance rebates for 90%+ enrollment.',
            icon: Globe,
            accent: 'var(--purple)',
            glow: 'rgba(168, 85, 247, 0.4)',
            rpm: '11,900 RPM',
            metricLabel: 'ADOPTION RATE',
            metricVal: '90%+ TARGET',
            flag: 'GLOBAL SCALE',
            link: '/impact'
        }
    ]

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            {/* Header & Racing Mode Switcher */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
                        <span style={{
                            width: '10px', height: '10px', borderRadius: '50%', background: 'var(--red)',
                            boxShadow: '0 0 10px var(--red)', animation: 'pulse 1s infinite'
                        }}></span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: activeTheme.primary, letterSpacing: '0.2em', fontWeight: 900 }}>
                            CYBER SPEEDWAY // INTEGRATED PURPLE TEAM CIRCUIT
                        </span>
                    </div>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                        Autonomous Defense Checkpoints
                    </h2>
                </div>

                {/* Speedway Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(15, 23, 42, 0.85)', padding: '0.35rem 0.5rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(0,212,255,0.3)' }}>
                    <button
                        onClick={() => setBoostMode('TELEMETRY')}
                        style={{
                            background: boostMode === 'TELEMETRY' ? activeTheme.primary : 'transparent',
                            color: boostMode === 'TELEMETRY' ? '#000' : 'var(--text-secondary)',
                            border: 'none',
                            padding: '0.35rem 0.85rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.66rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 900,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                        }}
                    >
                        <Gauge size={12} /> RACE TELEMETRY
                    </button>

                    <button
                        onClick={() => setBoostMode('NITRO')}
                        style={{
                            background: boostMode === 'NITRO' ? 'var(--red)' : 'transparent',
                            color: boostMode === 'NITRO' ? '#fff' : 'var(--text-secondary)',
                            border: 'none',
                            padding: '0.35rem 0.85rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.66rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 900,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                        }}
                    >
                        <Flame size={12} /> NITRO BOOST
                    </button>
                </div>
            </div>

            {/* F1 Cyber Speedway Grid Track Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.75rem', position: 'relative' }}>
                {checkpoints.map((cp, idx) => {
                    const IconComponent = cp.icon
                    const isHovered = hoveredCard === idx

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.12 }}
                            onMouseEnter={() => setHoveredCard(idx)}
                            onMouseLeave={() => setHoveredCard(null)}
                            style={{
                                background: boostMode === 'NITRO' ? 'linear-gradient(145deg, rgba(20, 5, 10, 0.95), rgba(10, 2, 5, 0.98))' : 'linear-gradient(145deg, rgba(12, 18, 36, 0.95), rgba(6, 10, 20, 0.98))',
                                border: `2px solid ${isHovered ? cp.accent : 'rgba(255,255,255,0.1)'}`,
                                borderRadius: 'var(--radius-xl)',
                                padding: '1.75rem',
                                textAlign: 'left',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: isHovered ? `0 20px 50px rgba(0,0,0,0.8), 0 0 35px ${cp.glow}` : '0 10px 30px rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(20px)',
                                position: 'relative',
                                overflow: 'hidden',
                                transform: isHovered ? 'translateY(-6px)' : 'none',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        >
                            {/* Animated Speedway Corner Hazard Flashing Light */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                background: cp.accent,
                                color: '#000',
                                padding: '0.25rem 0.75rem',
                                borderBottomLeftRadius: '12px',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.58rem',
                                fontWeight: 900,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                boxShadow: `0 0 15px ${cp.accent}`
                            }}>
                                <Flag size={10} /> {cp.flag}
                            </div>

                            {/* Main Content Body */}
                            <div>
                                {/* Checkpoint Indicator */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '36px', height: '36px', borderRadius: '10px',
                                        background: `${cp.accent}20`, border: `1px solid ${cp.accent}50`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: cp.accent, boxShadow: `0 0 15px ${cp.glow}`
                                    }}>
                                        <IconComponent size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 900, color: cp.accent, letterSpacing: '0.08em' }}>
                                            {cp.num}
                                        </div>
                                        <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                                            {cp.subtitle}
                                        </div>
                                    </div>
                                </div>

                                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', marginBottom: '0.65rem', lineHeight: 1.25 }}>
                                    {cp.title}
                                </h3>

                                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                    {cp.desc}
                                </p>
                            </div>

                            {/* Digital Speedway Placard Telemetry Bar */}
                            <div>
                                <div style={{
                                    background: 'rgba(3, 7, 18, 0.8)',
                                    border: `1px solid ${cp.accent}30`,
                                    borderRadius: 'var(--radius-md)',
                                    padding: '0.65rem 0.85rem',
                                    marginBottom: '1.25rem',
                                    display: 'flex',
                                    justify: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '0.55rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                                            {cp.metricLabel}
                                        </div>
                                        <div style={{ fontSize: '0.92rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: cp.accent, marginTop: '0.1rem' }}>
                                            {cp.metricVal}
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.55rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                                            ENGINE TACHOMETER
                                        </div>
                                        <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#fff', marginTop: '0.1rem' }}>
                                            {isHovered ? `${tachometerRpm + idx * 800} RPM` : cp.rpm}
                                        </div>
                                    </div>
                                </div>

                                {/* Link CTA Button */}
                                <Link
                                    to={cp.link}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justify: 'space-between',
                                        background: isHovered ? cp.accent : 'rgba(255,255,255,0.05)',
                                        color: isHovered ? '#000' : '#fff',
                                        border: `1px solid ${isHovered ? cp.accent : 'rgba(255,255,255,0.1)'}`,
                                        padding: '0.65rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.78rem',
                                        fontWeight: 900,
                                        textDecoration: 'none',
                                        transition: 'all 0.25s ease'
                                    }}
                                >
                                    <span>INSPECT CHECKPOINT</span>
                                    <ChevronRight size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
