import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Shield, Zap, Eye, ArrowRight, Lock, Cpu, Users, Terminal,
    Activity, Layers, Sparkles, Globe, Download, ExternalLink, ChevronRight
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function Landing() {
    // Interactive lights mode state (Yuta Abe SHIFT / LIGHTSOUT inspired)
    const [isStealthMode, setIsStealthMode] = useState(false)
    const [currentTime, setCurrentTime] = useState('')

    useEffect(() => {
        const updateClock = () => {
            const now = new Date()
            setCurrentTime(now.toUTCString().slice(17, 25) + ' UTC')
        }
        updateClock()
        const interval = setInterval(updateClock, 1000)
        return () => clearInterval(interval)
    }, [])

    const teamMembers = [
        {
            name: 'Pulkit Agrawal',
            role: 'Lead AI Engineer & Systems Architect',
            color: '#ff3366',
            badge: 'LEAD ARCHITECT',
            photo: '/team/pulkit.png',
            github: 'https://github.com/Kabirroy12345/E.ON-Project'
        },
        {
            name: 'Kabir Roy',
            role: 'Cybersecurity & Purple SOC Lead',
            color: '#00d4ff',
            badge: 'SECURITY LEAD',
            photo: '/team/kabir.jpg',
            github: 'https://github.com/Kabirroy12345/E.ON-Project'
        },
    ]

    const modules = [
        {
            num: '01',
            category: 'OFFENSIVE ENGINE',
            title: 'Autonomous Red Team AI',
            desc: 'Simulates 50+ MITRE ATT&CK adversary vectors against SCADA, OCPP EV gateways, and solar inverter protocols in real time.',
            link: '/purple-team',
            tag: '50+ MITRE VECTORS',
            accent: 'var(--red)'
        },
        {
            num: '02',
            category: 'DEFENSIVE NEURAL GRAPH',
            title: 'GraphSAGE GNN Blast Radius',
            desc: '2-hop neighborhood graph sampling over 9.6M nodes evaluating subgraph threat propagation in <140ms on GPU.',
            link: '/dashboard',
            tag: 'SUB-2S DETECTION',
            accent: 'var(--cyan)'
        },
        {
            num: '03',
            category: 'EDGE TELEMETRY PROTOCOL',
            title: 'TinyML Micro-Agent (<800KB)',
            desc: 'Runs on ARM Cortex-M4 smart meter gateways with 1.14ms execution time and 100% GDPR zero-privacy leak guarantee.',
            link: '/asset-shield',
            tag: '9.6M DER ASSETS',
            accent: 'var(--green)'
        },
        {
            num: '04',
            category: 'CUSTOMER ADOPTION',
            title: 'Cluster 5 Incentive Framework',
            desc: '4-pillar customer model driving 90%+ enrollment via dynamic grid tariff discounts & up to 25% cyber insurance rebates.',
            link: '/global-defense',
            tag: 'CLUSTER 5 READY',
            accent: 'var(--purple)'
        }
    ]

    return (
        <div className={`landing-page ${isStealthMode ? 'stealth-active' : ''}`} style={{
            position: 'relative',
            minHeight: '100vh',
            background: isStealthMode ? '#05070e' : '#0a0e1a',
            color: '#F0EDE8',
            fontFamily: 'var(--font-sans)',
            transition: 'background 0.5s ease'
        }}>

            {/* YUTA ABE HUD OVERLAY: LEFT TEMPO CLOCK */}
            <div style={{
                position: 'fixed',
                left: '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 40,
                opacity: 0.75,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.15em',
                color: isStealthMode ? 'var(--orange)' : 'var(--cyan)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                pointerEvents: 'none'
            }} className="sp-none">
                <div>{currentTime || '08:42:00 UTC'}</div>
                <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>ESSEN / FRANKFURT</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.3rem' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: isStealthMode ? 'var(--orange)' : 'var(--green)', animation: 'pulse 1.5s infinite' }}></span>
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.55rem' }}>GRIDSHIELD.ONLINE</span>
                </div>
            </div>

            {/* YUTA ABE HUD OVERLAY: RIGHT TELEMETRY STATUS */}
            <div style={{
                position: 'fixed',
                right: '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 40,
                opacity: 0.75,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.15em',
                textAlign: 'right',
                color: isStealthMode ? 'var(--red)' : 'var(--green)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                pointerEvents: 'none'
            }} className="sp-none">
                <div>9,600,000 NODES</div>
                <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>DEFCON 3 // PURPLE SOC</div>
                <div style={{ color: 'var(--cyan)', fontSize: '0.55rem', marginTop: '0.3rem' }}>NIS2 ARTICLE 21 READY</div>
            </div>

            {/* MAIN HERO CONTENT */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '4rem 2rem 6rem',
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}>

                {/* Top Badge Tag */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.4rem 1rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(0, 212, 255, 0.08)',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                        backdropFilter: 'blur(12px)',
                        marginBottom: '1.75rem'
                    }}
                >
                    <Lock size={13} style={{ color: 'var(--cyan)' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--cyan)' }}>
                        E.ON INNOVATION CHALLENGE 2026 // CYBERSECURITY
                    </span>
                </motion.div>

                {/* Giant Impact Title (Yuta Abe Mango Grotesque / Syne Style) */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    style={{
                        fontSize: 'clamp(3rem, 9vw, 6.5rem)',
                        fontWeight: 900,
                        lineHeight: 0.92,
                        letterSpacing: '-0.03em',
                        textTransform: 'uppercase',
                        background: isStealthMode
                            ? 'linear-gradient(135deg, #ffffff 30%, #ff9f43 70%, #ff3366 100%)'
                            : 'linear-gradient(135deg, #ffffff 25%, #00d4ff 65%, #00ff88 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: isStealthMode
                            ? 'drop-shadow(0 0 45px rgba(255, 159, 67, 0.4))'
                            : 'drop-shadow(0 0 45px rgba(0, 212, 255, 0.4))',
                        marginBottom: '1.25rem'
                    }}
                >
                    GRIDSHIELD AI
                </motion.h1>

                {/* Subtitle Paragraph */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
                        color: 'var(--text-secondary)',
                        maxWidth: '780px',
                        lineHeight: 1.6,
                        marginBottom: '2.5rem'
                    }}
                >
                    An autonomous AI-driven <strong style={{ color: '#fff' }}>Purple Team Security Orchestration Platform</strong> safeguarding critical power distribution grids, substations, and <strong style={{ color: 'var(--cyan)' }}>9.6 million customer energy assets</strong> across Europe and global markets.
                </motion.p>

                {/* Main Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4rem' }}
                >
                    <Link
                        to="/dashboard"
                        className="btn btn-primary btn-lg"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.85rem 1.8rem',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 800,
                            fontSize: '0.88rem',
                            background: isStealthMode
                                ? 'linear-gradient(135deg, var(--orange), var(--red))'
                                : 'linear-gradient(135deg, var(--cyan), #00a8ff)',
                            color: '#000',
                            boxShadow: isStealthMode ? '0 0 35px rgba(255,159,67,0.5)' : '0 0 35px var(--cyan-glow)',
                            border: 'none'
                        }}
                    >
                        <Cpu size={18} />
                        LAUNCH COMMAND SOC
                        <ArrowRight size={16} />
                    </Link>

                    <Link
                        to="/global-defense"
                        className="btn btn-secondary btn-lg"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.85rem 1.8rem',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 800,
                            fontSize: '0.88rem',
                            background: 'rgba(15, 20, 41, 0.8)',
                            border: '1px solid var(--border-glow)',
                            color: '#fff'
                        }}
                    >
                        <Globe size={18} style={{ color: 'var(--cyan)' }} />
                        GLOBAL SCALABILITY (V2.0)
                    </Link>

                    <a
                        href="/GridShield_AI_Zero_to_Hero_Report.pdf"
                        download="GridShield_AI_Zero_to_Hero_Report.pdf"
                        className="btn btn-secondary btn-lg"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.85rem 1.4rem',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            background: 'rgba(0, 255, 136, 0.08)',
                            border: '1px solid rgba(0, 255, 136, 0.3)',
                            color: 'var(--green)'
                        }}
                    >
                        <Download size={16} />
                        PDF REPORT
                    </a>
                </motion.div>

                {/* YUTA ABE INSPIRED KINETIC SCROLLING TICKER MARQUEE */}
                <div style={{
                    width: '100vw',
                    marginLeft: 'calc(-50vw + 50%)',
                    overflow: 'hidden',
                    background: 'rgba(15, 20, 41, 0.6)',
                    borderTop: '1px solid var(--border)',
                    borderBottom: '1px solid var(--border)',
                    padding: '0.75rem 0',
                    marginBottom: '5rem',
                    whiteSpace: 'nowrap'
                }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '2.5rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.22em',
                        color: 'var(--cyan)',
                        textTransform: 'uppercase'
                    }}>
                        <span>⚡ AUTONOMOUS RED TEAM AI</span>
                        <span style={{ color: 'var(--text-muted)' }}>★</span>
                        <span>🛡️ GRAPHSAGE GNN BLAST RADIUS</span>
                        <span style={{ color: 'var(--text-muted)' }}>★</span>
                        <span>⚡ SUB-2S MEDIAN DETECTION</span>
                        <span style={{ color: 'var(--text-muted)' }}>★</span>
                        <span>🔒 9.6M CUSTOMER DER ASSETS</span>
                        <span style={{ color: 'var(--text-muted)' }}>★</span>
                        <span>🌐 US NERC-CIP & EU NIS2 READY</span>
                        <span style={{ color: 'var(--text-muted)' }}>★</span>
                        <span>💚 CLUSTER 5 ADOPTION FRAMEWORK</span>
                        <span style={{ color: 'var(--text-muted)' }}>★</span>
                        <span>⚡ AUTONOMOUS RED TEAM AI</span>
                    </div>
                </div>

                {/* YUTA ABE INSPIRED FEATURE MODULES GRID */}
                <div style={{ width: '100%', marginBottom: '6rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', textAlign: 'left' }}>
                        <div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--cyan)', letterSpacing: '0.2em' }}>
                                ARCHITECTURAL MODULES // 01 – 04
                            </span>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem' }}>
                                System Capabilities & Platform Features
                            </h2>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                        {modules.map((m, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                style={{
                                    background: 'linear-gradient(145deg, rgba(15, 20, 41, 0.95), rgba(10, 14, 26, 0.9))',
                                    border: `1px solid ${m.accent}35`,
                                    borderRadius: 'var(--radius-lg)',
                                    padding: '1.5rem',
                                    textAlign: 'left',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justify: 'space-between',
                                    position: 'relative',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                                    transition: 'transform 0.25s ease, border-color 0.25s ease'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: m.accent }}>
                                            {m.num} // {m.category}
                                        </span>
                                        <span style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', background: `${m.accent}15`, color: m.accent, padding: '0.15rem 0.45rem', borderRadius: '4px', border: `1px solid ${m.accent}30` }}>
                                            {m.tag}
                                        </span>
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>{m.title}</h3>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>{m.desc}</p>
                                </div>

                                <Link
                                    to={m.link}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.72rem',
                                        fontWeight: 700,
                                        color: m.accent,
                                        textDecoration: 'none'
                                    }}
                                >
                                    INSPECT MODULE <ChevronRight size={14} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* EXECUTIVE TEAM CREDENTIALS (YUTA ABE STYLE) */}
                <div style={{ width: '100%', marginBottom: '4rem', textAlign: 'left' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--cyan)', letterSpacing: '0.2em' }}>
                            TEAM GRIDSHIELD // LEAD ENGINEERS
                        </span>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem' }}>
                            Built by Cybersecurity & AI Engineers
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {teamMembers.map((m, idx) => (
                            <div key={idx} style={{
                                background: 'linear-gradient(145deg, rgba(15, 20, 41, 0.95), rgba(10, 14, 26, 0.9))',
                                border: `1px solid ${m.color}35`,
                                borderRadius: 'var(--radius-lg)',
                                padding: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.25rem',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
                            }}>
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    border: `2px solid ${m.color}`,
                                    flexShrink: 0,
                                    background: 'var(--bg-tertiary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 900,
                                    color: m.color
                                }}>
                                    {m.photo ? (
                                        <img src={m.photo} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        m.initials
                                    )}
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: m.color, letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
                                        {m.badge}
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{m.name}</h3>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{m.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* YUTA ABE INSPIRED LIGHTS OUT / MODE TOGGLE SWITCH (SHIFT) */}
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem 1.5rem',
                    background: 'rgba(15, 20, 41, 0.8)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-full)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
                        THEME MODE: <strong style={{ color: isStealthMode ? 'var(--orange)' : 'var(--cyan)' }}>{isStealthMode ? 'STEALTH RED ALERT' : 'CYBER NEON'}</strong>
                    </span>
                    <button
                        onClick={() => setIsStealthMode(!isStealthMode)}
                        style={{
                            padding: '0.35rem 0.85rem',
                            borderRadius: 'var(--radius-full)',
                            background: isStealthMode ? 'var(--orange)' : 'var(--cyan)',
                            color: '#000',
                            border: 'none',
                            fontWeight: 800,
                            fontSize: '0.68rem',
                            fontFamily: 'var(--font-mono)',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease'
                        }}
                    >
                        TOGGLE SHIFT
                    </button>
                </div>

            </div>
        </div>
    )
}
