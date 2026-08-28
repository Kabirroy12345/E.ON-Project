import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Zap, Eye, ArrowRight, Lock, Cpu, Users, Terminal, Activity, Layers, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Landing() {
    const teamMembers = [
        {
            name: 'Pulkit Agrawal',
            role: 'Lead AI Engineer & Red Team Architect',
            color: '#ff3366',
            initials: 'PA',
            badge: 'LEAD ARCHITECT',
            photo: '/team/pulkit.png'
        },
        {
            name: 'Kabir Roy',
            role: 'Cybersecurity & Purple SOC Lead',
            color: '#00d4ff',
            initials: 'KR',
            badge: 'SECURITY LEAD',
            photo: '/team/kabir.jpg'
        },
    ]

    return (
        <div className="landing-page" style={{ position: 'relative', overflow: 'hidden' }}>

            <div className="landing-hero" style={{ position: 'relative', zIndex: 1 }}>
                <div className="hero-badge" style={{ backdropFilter: 'blur(10px)', background: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
                    <Lock size={14} style={{ color: 'var(--cyan)' }} />
                    E.ON Innovation Challenge 2026 — IT Security Track
                </div>

                <h1 style={{ background: 'linear-gradient(135deg, #ffffff 30%, #00d4ff 70%, #00ff88 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 35px rgba(0, 212, 255, 0.35))' }}>
                    GridShield AI
                </h1>

                <p className="subtitle">
                    An autonomous AI-driven Purple Team security orchestration platform built to safeguard
                    critical power distribution grids, substations, and millions of customer DER assets across Europe.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/dashboard" className="btn btn-primary btn-lg" style={{ boxShadow: '0 0 30px var(--cyan-glow)' }}>
                        <Cpu size={18} />
                        Launch Command SOC
                        <ArrowRight size={16} />
                    </Link>
                    <Link to="/architecture" className="btn btn-secondary btn-lg">
                        View OT Architecture
                    </Link>
                </div>
            </div>

            {/* Advanced Holographic Cyber Modules */}
            <div className="landing-features" style={{ position: 'relative', zIndex: 1, gap: '1.5rem', maxWidth: '1100px', width: '100%' }}>
                <motion.div
                    className="landing-feature-card"
                    style={{
                        background: 'linear-gradient(145deg, rgba(255, 51, 102, 0.06), rgba(15, 20, 41, 0.95))',
                        border: '1px solid rgba(255, 51, 102, 0.3)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.75rem',
                        position: 'relative',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--red)', background: 'rgba(255, 51, 102, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(255, 51, 102, 0.3)' }}>
                            MODULE #01 // RED TEAM
                        </span>
                        <Zap size={22} style={{ color: 'var(--red)' }} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-bright)', marginBottom: '0.6rem' }}>Simulate & Attack</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                        Autonomous Red Team AI executes targeted adversary emulation against grid SCADA, OCPP EV gateways, and DER inverters using MITRE ATT&CK techniques.
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--red)', background: 'rgba(255, 51, 102, 0.1)', padding: '0.15rem 0.4rem', borderRadius: '3px' }}>50+ MITRE Vectors</span>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.05)', padding: '0.15rem 0.4rem', borderRadius: '3px' }}>Auto-Exploit Engine</span>
                    </div>
                </motion.div>

                <motion.div
                    className="landing-feature-card"
                    style={{
                        background: 'linear-gradient(145deg, rgba(0, 212, 255, 0.06), rgba(15, 20, 41, 0.95))',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.75rem',
                        position: 'relative',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--cyan)', background: 'rgba(0, 212, 255, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
                            MODULE #02 // BLUE TEAM
                        </span>
                        <Eye size={22} style={{ color: 'var(--cyan)' }} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-bright)', marginBottom: '0.6rem' }}>Detect & Defend</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                        Real-time Deep Packet Inspection & anomaly engine flags coordinated grid disruption attempts from compromised assets in under 1.83 seconds.
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--cyan)', background: 'rgba(0, 212, 255, 0.1)', padding: '0.15rem 0.4rem', borderRadius: '3px' }}>&lt;1.83s Latency</span>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.05)', padding: '0.15rem 0.4rem', borderRadius: '3px' }}>SOAR Auto-Isolation</span>
                    </div>
                </motion.div>

                <motion.div
                    className="landing-feature-card"
                    style={{
                        background: 'linear-gradient(145deg, rgba(168, 85, 247, 0.06), rgba(15, 20, 41, 0.95))',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.75rem',
                        position: 'relative',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--purple)', background: 'rgba(168, 85, 247, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                            MODULE #03 // PURPLE GNN
                        </span>
                        <Shield size={22} style={{ color: 'var(--purple)' }} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-bright)', marginBottom: '0.6rem' }}>Learn & Evolve</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                        Self-evolving Graph Neural Network learns from every Red Team attack run, automatically deploying zero-trust gateway rules before exploits spread.
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--purple)', background: 'rgba(168, 85, 247, 0.1)', padding: '0.15rem 0.4rem', borderRadius: '3px' }}>Graph Neural Net</span>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.05)', padding: '0.15rem 0.4rem', borderRadius: '3px' }}>99.7% Block Rate</span>
                    </div>
                </motion.div>
            </div>

            {/* Key Metrics Row */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '2rem',
                maxWidth: '850px',
                width: '100%',
                marginTop: '1.5rem',
                position: 'relative',
                zIndex: 1,
            }}>
                {[
                    { value: '10M+', label: 'km Grid Protected' },
                    { value: '9.6M', label: 'Customer Assets' },
                    { value: '<2s', label: 'Detection Time' },
                    { value: '99.7%', label: 'Attack Block Rate' },
                ].map((stat, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{
                            fontSize: '1.8rem',
                            fontWeight: 900,
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--cyan)',
                            textShadow: '0 0 15px var(--cyan-glow)'
                        }}>
                            {stat.value}
                        </div>
                        <div style={{
                            fontSize: '0.72rem',
                            color: 'var(--text-muted)',
                            marginTop: '0.25rem',
                            fontFamily: 'var(--font-mono)'
                        }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* High-Tech Team Section — Pulkit Agrawal & Kabir Roy Only */}
            <div style={{
                marginTop: '3.5rem',
                maxWidth: '650px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                position: 'relative',
                zIndex: 1,
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.78rem',
                    color: 'var(--cyan)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)'
                }}>
                    <Users size={16} /> Built by Team GridShield
                </div>

                {/* Centered 2-Card Grid for Pulkit & Kabir */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(240px, 290px))',
                    justifyContent: 'center',
                    gap: '1.75rem',
                    width: '100%',
                }}>
                    {teamMembers.map((m, i) => (
                        <div
                            key={i}
                            style={{
                                background: 'linear-gradient(145deg, rgba(15, 20, 41, 0.95), rgba(10, 14, 26, 0.9))',
                                border: `1.5px solid ${m.color}50`,
                                borderRadius: 'var(--radius-lg)',
                                padding: '1.5rem 1.25rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px ${m.color}10`,
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Photo Container */}
                            <div style={{
                                width: 96,
                                height: 96,
                                borderRadius: '50%',
                                padding: '3.5px',
                                background: `linear-gradient(135deg, ${m.color}, transparent)`,
                                boxShadow: `0 0 25px ${m.color}60`,
                                marginBottom: '1rem',
                                position: 'relative'
                            }}>
                                <img
                                    src={m.photo}
                                    alt={m.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        display: 'block'
                                    }}
                                />
                                <span style={{
                                    position: 'absolute',
                                    bottom: 2,
                                    right: 2,
                                    width: 14,
                                    height: 14,
                                    borderRadius: '50%',
                                    background: m.color,
                                    border: '2px solid var(--bg-primary)',
                                    boxShadow: `0 0 10px ${m.color}`
                                }}></span>
                            </div>

                            <div style={{ fontSize: '1.05rem', color: 'var(--text-bright)', fontWeight: 800, marginBottom: '0.35rem' }}>
                                {m.name}
                            </div>

                            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '0.85rem' }}>
                                {m.role}
                            </div>

                            <span style={{
                                fontSize: '0.62rem',
                                fontWeight: 800,
                                fontFamily: 'var(--font-mono)',
                                color: m.color,
                                background: `${m.color}18`,
                                padding: '0.25rem 0.65rem',
                                borderRadius: '4px',
                                border: `1px solid ${m.color}40`,
                                letterSpacing: '0.06em'
                            }}>
                                {m.badge}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
