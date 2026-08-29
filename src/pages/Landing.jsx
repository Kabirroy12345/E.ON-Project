import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
    Shield, Zap, Eye, ArrowRight, Lock, Cpu, Users, Terminal,
    Activity, Layers, Sparkles, Globe, Download, ExternalLink, ChevronRight,
    Radio, Crosshair, RefreshCw, Maximize2, Compass, Play, AlertTriangle
} from 'lucide-react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

// THEME CONFIGURATIONS (CYBER, WARP, STEALTH)
const THEME_CONFIGS = {
    CYBER: {
        name: 'CYBER NEON',
        primary: '#00d4ff',
        secondary: '#00ff88',
        accentGlow: 'rgba(0, 212, 255, 0.4)',
        cardBg: 'linear-gradient(145deg, rgba(15, 23, 42, 0.92), rgba(9, 13, 22, 0.96))',
        border: 'rgba(0, 212, 255, 0.35)',
        bgStart: '#081a2e',
        bgEnd: '#030914',
        gridSpeed: 1.8,
        particleSpeed: 1.5,
        palette: ['#00d4ff', '#00ff88', '#0088ff', '#ffffff'],
        statusText: 'DEFCON 3 // 9.6M ASSETS ONLINE',
        badgeBg: 'rgba(0, 212, 255, 0.12)',
        badgeColor: 'var(--cyan)'
    },
    WARP: {
        name: 'HYPER WARP',
        primary: '#a855f7',
        secondary: '#ec4899',
        accentGlow: 'rgba(168, 85, 247, 0.6)',
        cardBg: 'linear-gradient(145deg, rgba(30, 10, 50, 0.92), rgba(12, 4, 25, 0.96))',
        border: 'rgba(168, 85, 247, 0.5)',
        bgStart: '#200a38',
        bgEnd: '#080212',
        gridSpeed: 6.5,
        particleSpeed: 5.2,
        palette: ['#a855f7', '#ec4899', '#3b82f6', '#ffffff'],
        statusText: 'WARP VELOCITY // HYPER-GRID STREAM',
        badgeBg: 'rgba(168, 85, 247, 0.2)',
        badgeColor: 'var(--purple)'
    },
    STEALTH: {
        name: 'RED ALERT STEALTH',
        primary: '#ff3366',
        secondary: '#ff9f43',
        accentGlow: 'rgba(255, 51, 102, 0.6)',
        cardBg: 'linear-gradient(145deg, rgba(40, 10, 20, 0.92), rgba(15, 4, 8, 0.96))',
        border: 'rgba(255, 51, 102, 0.5)',
        bgStart: '#2b0812',
        bgEnd: '#0a0204',
        gridSpeed: 3.5,
        particleSpeed: 3.0,
        palette: ['#ff3366', '#ff9f43', '#ff6b6b', '#ffffff'],
        statusText: 'DEFCON 1 // ACTIVE ADVERSARY EMULATION',
        badgeBg: 'rgba(255, 51, 102, 0.2)',
        badgeColor: 'var(--red)'
    }
}

export default function Landing() {
    const canvasRef = useRef(null)
    const [activeMode, setActiveMode] = useState('CYBER') // CYBER, WARP, STEALTH
    const [currentTime, setCurrentTime] = useState('')
    const activeTheme = THEME_CONFIGS[activeMode] || THEME_CONFIGS.CYBER

    // 3D Parallax Card Motion
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const rotateX = useTransform(mouseY, [-300, 300], [8, -8])
    const rotateY = useTransform(mouseX, [-300, 300], [-8, 8])

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
    }

    // Live Clock Update
    useEffect(() => {
        const updateClock = () => {
            const now = new Date()
            setCurrentTime(now.toUTCString().slice(17, 25) + ' UTC')
        }
        updateClock()
        const interval = setInterval(updateClock, 1000)
        return () => clearInterval(interval)
    }, [])

    // 60 FPS Dynamic WebGL Kinetic Engine (Particle Physics + Horizon Speed Lines + EMP Shockwave)
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animationFrameId
        let width = (canvas.width = window.innerWidth)
        let height = (canvas.height = window.innerHeight)

        const handleResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }
        window.addEventListener('resize', handleResize)

        const particleCount = 180
        const particles = []
        const shockwaves = []

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * activeTheme.particleSpeed,
                vy: (Math.random() - 0.5) * activeTheme.particleSpeed,
                size: Math.random() * 2.8 + 1,
                colorIndex: Math.floor(Math.random() * 4),
                alpha: Math.random() * 0.7 + 0.3
            })
        }

        let mouseXCanvas = width / 2
        let mouseYCanvas = height / 2

        const onMouseMove = (e) => {
            mouseXCanvas = e.clientX
            mouseYCanvas = e.clientY
        }

        const onClick = (e) => {
            shockwaves.push({
                x: e.clientX,
                y: e.clientY,
                radius: 0,
                maxRadius: 300,
                alpha: 1,
                color: activeTheme.primary
            })
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('click', onClick)

        let gridOffset = 0

        const render = () => {
            ctx.clearRect(0, 0, width, height)

            // 1. Dynamic Radial Background Gradient
            const bgGrad = ctx.createRadialGradient(
                width / 2, height / 2, 50,
                width / 2, height / 2, Math.max(width, height)
            )
            bgGrad.addColorStop(0, activeTheme.bgStart)
            bgGrad.addColorStop(1, activeTheme.bgEnd)
            ctx.fillStyle = bgGrad
            ctx.fillRect(0, 0, width, height)

            // 2. 3D Perspective Horizon Grid (Speed Lines)
            ctx.save()
            ctx.strokeStyle = activeTheme.primary
            ctx.globalAlpha = activeMode === 'WARP' ? 0.25 : 0.12
            ctx.lineWidth = activeMode === 'WARP' ? 1.5 : 1.0

            const horizonY = height * 0.62
            gridOffset = (gridOffset + activeTheme.gridSpeed) % 40

            const vanishingX = width / 2
            const perspectiveLines = 26
            for (let i = -perspectiveLines; i <= perspectiveLines; i++) {
                const startX = vanishingX + (i * (width / perspectiveLines))
                ctx.beginPath()
                ctx.moveTo(vanishingX, horizonY)
                ctx.lineTo(startX, height)
                ctx.stroke()
            }

            // Moving Horizontal Grid Lines
            for (let y = horizonY; y < height; y += (y - horizonY + 6) * 0.14) {
                const drawY = y + (gridOffset * ((y - horizonY) / (height - horizonY)))
                if (drawY < height) {
                    ctx.beginPath()
                    ctx.moveTo(0, drawY)
                    ctx.lineTo(width, drawY)
                    ctx.stroke()
                }
            }
            ctx.restore()

            // 3. Kinetic Particles & Gravitational Mouse Attraction
            particles.forEach((p) => {
                const dx = mouseXCanvas - p.x
                const dy = mouseYCanvas - p.y
                const dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < 240) {
                    const force = (240 - dist) / 240
                    const speedMultiplier = activeMode === 'WARP' ? 1.8 : 0.6
                    p.vx += (dx / dist) * force * speedMultiplier
                    p.vy += (dy / dist) * force * speedMultiplier
                }

                p.x += p.vx
                p.y += p.vy

                // Friction
                p.vx *= 0.95
                p.vy *= 0.95

                // Screen Boundary Wrap
                if (p.x < 0) p.x = width
                if (p.x > width) p.x = 0
                if (p.y < 0) p.y = height
                if (p.y > height) p.y = 0

                const pColor = activeTheme.palette[p.colorIndex] || activeTheme.primary

                ctx.save()
                ctx.globalAlpha = p.alpha
                ctx.fillStyle = pColor
                ctx.shadowBlur = activeMode === 'WARP' ? 15 : 8
                ctx.shadowColor = pColor
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()

                // Connect nearby particles with laser grid lines
                particles.forEach((p2) => {
                    const linkDx = p.x - p2.x
                    const linkDy = p.y - p2.y
                    const linkDist = Math.sqrt(linkDx * linkDx + linkDy * linkDy)

                    if (linkDist < 90) {
                        ctx.save()
                        ctx.globalAlpha = (1 - linkDist / 90) * 0.15
                        ctx.strokeStyle = pColor
                        ctx.lineWidth = 0.8
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                        ctx.restore()
                    }
                })
            })

            // 4. Click Shockwave Energy Pulse Rings
            for (let i = shockwaves.length - 1; i >= 0; i--) {
                const sw = shockwaves[i]
                sw.radius += activeMode === 'WARP' ? 12 : 8
                sw.alpha *= 0.93

                if (sw.alpha < 0.02 || sw.radius > sw.maxRadius) {
                    shockwaves.splice(i, 1)
                    continue
                }

                ctx.save()
                ctx.globalAlpha = sw.alpha
                ctx.strokeStyle = sw.color
                ctx.lineWidth = 3
                ctx.shadowBlur = 25
                ctx.shadowColor = sw.color
                ctx.beginPath()
                ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2)
                ctx.stroke()
                ctx.restore()
            }

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('click', onClick)
            cancelAnimationFrame(animationFrameId)
        }
    }, [activeMode])

    const teamMembers = [
        {
            name: 'Pulkit Agrawal',
            role: 'Lead AI Engineer & Systems Architect',
            color: '#ff3366',
            badge: 'LEAD ARCHITECT',
            photo: '/team/pulkit.png'
        },
        {
            name: 'Kabir Roy',
            role: 'Cybersecurity & Purple SOC Lead',
            color: '#00d4ff',
            badge: 'SECURITY LEAD',
            photo: '/team/kabir.jpg'
        },
    ]

    const modules = [
        {
            num: '01',
            category: 'OFFENSIVE RED TEAM AI',
            title: 'Autonomous Attack Simulation',
            desc: 'Executes 50+ MITRE ATT&CK adversary vectors against SCADA, OCPP EV gateways, and solar inverters with automated vulnerability discovery.',
            link: '/purple-team',
            tag: '50+ VECTORS',
            accent: '#ff3366',
            icon: Zap
        },
        {
            num: '02',
            category: 'NEURAL GRAPH DEFENSE',
            title: 'GraphSAGE GNN Blast Radius',
            desc: '2-hop GraphSAGE neighborhood sampling evaluating multi-substation threat propagation across 9.6M nodes in <140ms on GPU.',
            link: '/dashboard',
            tag: 'SUB-2S LATENCY',
            accent: '#00d4ff',
            icon: Cpu
        },
        {
            num: '03',
            category: 'EDGE TINYML AGENT',
            title: 'Zero-Telemetry Edge Agent',
            desc: 'Executes on Cortex-M4 microcontrollers (<800KB footprint) with 1.14ms latency, guaranteeing 100% on-device GDPR privacy.',
            link: '/asset-shield',
            tag: '9.6M DER ASSETS',
            accent: '#00ff88',
            icon: Shield
        },
        {
            num: '04',
            category: 'CUSTOMER ADOPTION',
            title: 'Cluster 5 Incentive Framework',
            desc: '4-pillar customer incentive model offering dynamic tariff discounts & up to 25% insurance rebates for 90%+ enrollment.',
            link: '/global-defense',
            tag: 'GLOBAL READY',
            accent: '#a855f7',
            icon: Globe
        }
    ]

    return (
        <div className="landing-page-v4" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', color: '#F0EDE8' }}>
            
            {/* INLINE CSS FOR SEAMLESS INFINITE MARQUEE LOOP */}
            <style>{`
                @keyframes marqueeLoop {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .ticker-container {
                    width: 100vw;
                    position: relative;
                    left: 50%;
                    right: 50%;
                    margin-left: -50vw;
                    margin-right: -50vw;
                    overflow: hidden;
                    background: rgba(8, 14, 28, 0.85);
                    backdrop-filter: blur(12px);
                    border-top: 1px solid ${activeTheme.border};
                    border-bottom: 1px solid ${activeTheme.border};
                    padding: 0.85rem 0;
                    margin-top: 4rem;
                    margin-bottom: 5rem;
                }
                .ticker-wrapper {
                    display: flex;
                    width: max-content;
                    animation: marqueeLoop ${activeMode === 'WARP' ? '12s' : '22s'} linear infinite;
                }
                .ticker-wrapper:hover {
                    animation-play-state: paused;
                }
                .ticker-group {
                    display: flex;
                    align-items: center;
                    gap: 3rem;
                    padding-right: 3rem;
                    white-space: nowrap;
                    font-family: var(--font-mono);
                    font-size: 0.76rem;
                    font-weight: 800;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: ${activeTheme.primary};
                }
            `}</style>

            {/* Canvas WebGL Background */}
            <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, cursor: 'crosshair' }} />

            {/* HIGH-END FIXED AR HUD HEADER (ZERO OVERLAPS) */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: '0.85rem 2rem',
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                background: 'rgba(5, 10, 20, 0.88)',
                backdropFilter: 'blur(20px)',
                borderBottom: `1px solid ${activeTheme.border}`,
                boxShadow: `0 4px 20px rgba(0,0,0,0.5)`
            }}>
                {/* Left Brand Identifier */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        background: `linear-gradient(135deg, ${activeTheme.primary}, ${activeTheme.secondary})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000',
                        boxShadow: `0 0 20px ${activeTheme.primary}`
                    }}>
                        <Shield size={20} />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 900, color: '#fff', letterSpacing: '0.08em' }}>
                                GRIDSHIELD AI
                            </span>
                            <span style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', fontWeight: 800, background: activeTheme.badgeBg, color: activeTheme.primary, padding: '0.12rem 0.45rem', borderRadius: '4px', border: `1px solid ${activeTheme.border}` }}>
                                v2.0 AR
                            </span>
                        </div>
                        <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                            E.ON INNOVATION CHALLENGE 2026 // PURPLE SOC
                        </div>
                    </div>
                </div>

                {/* Right AR HUD Metadata & Dynamic Theme Switcher (Strict Layout Separation) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
                    {/* Live Clock & Defcon Status (Isolated Block) */}
                    <div className="sp-none" style={{ textAlignment: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.15rem' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 900, color: activeTheme.primary, letterSpacing: '0.05em' }}>
                            {currentTime || '16:24:51 UTC'}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                            {activeTheme.statusText}
                        </div>
                    </div>

                    {/* Mode Buttons Switcher */}
                    <div style={{
                        display: 'flex',
                        background: 'rgba(10, 15, 30, 0.9)',
                        padding: '0.25rem',
                        borderRadius: 'var(--radius-full)',
                        border: `1px solid ${activeTheme.border}`
                    }}>
                        {['CYBER', 'WARP', 'STEALTH'].map((mode) => {
                            const isActive = activeMode === mode
                            const modeConfig = THEME_CONFIGS[mode]
                            return (
                                <button
                                    key={mode}
                                    onClick={() => setActiveMode(mode)}
                                    style={{
                                        padding: '0.35rem 0.85rem',
                                        borderRadius: 'var(--radius-full)',
                                        background: isActive ? modeConfig.primary : 'transparent',
                                        color: isActive ? '#000' : 'var(--text-secondary)',
                                        border: 'none',
                                        fontWeight: 900,
                                        fontSize: '0.62rem',
                                        fontFamily: 'var(--font-mono)',
                                        cursor: 'pointer',
                                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                                        boxShadow: isActive ? `0 0 15px ${modeConfig.primary}` : 'none'
                                    }}
                                >
                                    {mode}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </header>

            {/* MAIN HERO CONTENT */}
            <main style={{ position: 'relative', zIndex: 10, paddingTop: '7.5rem', paddingBottom: '5rem', maxWidth: '1280px', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                
                {/* Hero Grid Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', alignItems: 'center', minHeight: 'calc(80vh - 7rem)' }}>
                    
                    {/* Left Hero Column */}
                    <div style={{ textAlign: 'left' }}>
                        <motion.div
                            key={activeMode}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0.9rem', borderRadius: 'var(--radius-full)', background: activeTheme.badgeBg, border: `1px solid ${activeTheme.border}`, marginBottom: '1.5rem' }}
                        >
                            {activeMode === 'STEALTH' ? (
                                <AlertTriangle size={14} style={{ color: activeTheme.primary, animation: 'pulse 1s infinite' }} />
                            ) : (
                                <Radio size={14} style={{ color: activeTheme.primary, animation: 'pulse 1.5s infinite' }} />
                            )}
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 900, color: activeTheme.primary, letterSpacing: '0.12em' }}>
                                MODE: {activeTheme.name}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            style={{
                                fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
                                fontWeight: 900,
                                lineHeight: 0.95,
                                letterSpacing: '-0.03em',
                                textTransform: 'uppercase',
                                background: `linear-gradient(135deg, #ffffff 25%, ${activeTheme.primary} 65%, ${activeTheme.secondary} 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                filter: `drop-shadow(0 0 35px ${activeTheme.accentGlow})`,
                                marginBottom: '1.25rem'
                            }}
                        >
                            GRIDSHIELD AI
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '2rem', maxWidth: '580px' }}
                        >
                            Autonomous AI-driven <strong style={{ color: '#fff' }}>Purple Team Platform</strong> protecting power distribution grids, substations, and <strong style={{ color: activeTheme.primary }}>9.6M customer DER energy assets</strong> with GraphSAGE GNN blast radius correlation and 1.14ms TinyML edge defense.
                        </motion.p>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}
                        >
                            <Link
                                to="/dashboard"
                                className="btn btn-primary"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                                    padding: '0.85rem 1.75rem', borderRadius: 'var(--radius-md)', fontWeight: 900,
                                    fontSize: '0.88rem', background: activeTheme.primary,
                                    color: '#000', boxShadow: `0 0 30px ${activeTheme.accentGlow}`, border: 'none'
                                }}
                            >
                                <Cpu size={18} />
                                LAUNCH COMMAND SOC
                                <ArrowRight size={16} />
                            </Link>

                            <Link
                                to="/global-defense"
                                className="btn btn-secondary"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                                    padding: '0.85rem 1.75rem', borderRadius: 'var(--radius-md)', fontWeight: 800,
                                    fontSize: '0.88rem', background: 'rgba(15, 20, 41, 0.85)',
                                    border: `1px solid ${activeTheme.border}`, color: '#fff'
                                }}
                            >
                                <Globe size={18} style={{ color: activeTheme.primary }} />
                                GLOBAL DEFENSE V2
                            </Link>

                            <a
                                href="/GridShield_AI_Zero_to_Hero_Report.pdf"
                                download="GridShield_AI_Zero_to_Hero_Report.pdf"
                                className="btn btn-secondary"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', fontWeight: 700,
                                    fontSize: '0.82rem', background: 'rgba(0, 255, 136, 0.08)',
                                    border: '1px solid rgba(0, 255, 136, 0.3)', color: 'var(--green)'
                                }}
                            >
                                <Download size={16} />
                                PDF REPORT
                            </a>
                        </motion.div>

                        {/* Telemetry Stat Cards */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem',
                            background: 'rgba(10, 15, 30, 0.8)', padding: '1rem',
                            borderRadius: 'var(--radius-lg)', border: `1px solid ${activeTheme.border}`
                        }}>
                            <div>
                                <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>PROTECTED ASSETS</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: activeTheme.primary }}>9.6M</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>EDGE LATENCY</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>1.14ms</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>GNN SAMPLING</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: activeTheme.secondary }}>K=2</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Hero Column: 3D Holographic Interactive HUD Card */}
                    <div style={{ perspective: 1000 }} onMouseMove={handleMouseMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}>
                        <motion.div
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d',
                                background: activeTheme.cardBg,
                                border: `1px solid ${activeTheme.border}`,
                                borderRadius: 'var(--radius-xl)',
                                padding: '2rem',
                                boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 35px ${activeTheme.accentGlow}`,
                                position: 'relative'
                            }}
                        >
                            {/* Card Radar Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: `1px solid ${activeTheme.border}`, paddingBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <Crosshair size={18} style={{ color: activeTheme.primary, animation: 'spin 10s linear infinite' }} />
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 900, color: '#fff' }}>
                                        TACTICAL GRID RADAR SCOPE
                                    </span>
                                </div>
                                <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', fontWeight: 800, background: activeTheme.badgeBg, color: activeTheme.primary, padding: '0.2rem 0.5rem', borderRadius: '4px', border: `1px solid ${activeTheme.border}` }}>
                                    SCANNING ACTIVE
                                </span>
                            </div>

                            {/* Radar Canvas Sweep Display */}
                            <div style={{ position: 'relative', width: '100%', height: '200px', background: '#030712', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: `1px solid ${activeTheme.border}`, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle, ${activeTheme.primary}20 0%, transparent 70%)` }} />
                                
                                {/* Concentric Radar Circles */}
                                <div style={{ position: 'absolute', width: '160px', height: '160px', borderRadius: '50%', border: `1px solid ${activeTheme.primary}40` }} />
                                <div style={{ position: 'absolute', width: '100px', height: '100px', borderRadius: '50%', border: `1px solid ${activeTheme.primary}30` }} />
                                <div style={{ position: 'absolute', width: '40px', height: '40px', borderRadius: '50%', border: `1px solid ${activeTheme.primary}50` }} />
                                
                                {/* Crosshair Lines */}
                                <div style={{ position: 'absolute', width: '100%', height: '1px', background: `${activeTheme.primary}30` }} />
                                <div style={{ position: 'absolute', width: '1px', height: '100%', background: `${activeTheme.primary}30` }} />

                                {/* Substation Threat Nodes */}
                                <div style={{ position: 'absolute', top: '35%', left: '42%', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 10px var(--red)' }} />
                                <div style={{ position: 'absolute', top: '65%', left: '68%', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
                                <div style={{ position: 'absolute', top: '25%', left: '75%', width: '6px', height: '6px', borderRadius: '50%', background: activeTheme.primary, boxShadow: `0 0 8px ${activeTheme.primary}` }} />

                                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: activeTheme.primary, letterSpacing: '0.1em' }}>GRAPH NEURAL NETWORK</div>
                                    <div style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#fff', marginTop: '0.15rem' }}>9,600,000 ASSETS</div>
                                    <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--green)', marginTop: '0.1rem' }}>● ALL SUBSTATION NODES SECURED</div>
                                </div>
                            </div>

                            {/* Card Footer Key Info */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '0.4rem' }}>
                                    <span>NIS2 Incident Reporting</span>
                                    <strong style={{ color: 'var(--green)' }}>Article 21 Compliant</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '0.4rem' }}>
                                    <span>Telemetry Privacy Guarantee</span>
                                    <strong style={{ color: activeTheme.primary }}>0% Leak (Edge Local)</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>TCO Baseline Target</span>
                                    <strong style={{ color: 'var(--yellow)' }}>€0.80 / device / year</strong>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>

                {/* INFINITE SEAMLESS TICKER MARQUEE (NO STATIC CUTOFFS) */}
                <div className="ticker-container">
                    <div className="ticker-wrapper">
                        {/* Duplicate Group 1 */}
                        <div className="ticker-group">
                            <span>⚡ AUTONOMOUS RED TEAM AI</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>🛡️ GRAPHSAGE GNN BLAST RADIUS</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>⚡ 1.14ms EDGE TINYML INFERENCE</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>🔒 9.6M DER ASSET DEFENSE</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>🌐 US NERC-CIP & EU NIS2 READY</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>💚 CLUSTER 5 ADOPTION FRAMEWORK</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                        </div>
                        {/* Duplicate Group 2 for Infinite Seamless Loop */}
                        <div className="ticker-group">
                            <span>⚡ AUTONOMOUS RED TEAM AI</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>🛡️ GRAPHSAGE GNN BLAST RADIUS</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>⚡ 1.14ms EDGE TINYML INFERENCE</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>🔒 9.6M DER ASSET DEFENSE</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>🌐 US NERC-CIP & EU NIS2 READY</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>💚 CLUSTER 5 ADOPTION FRAMEWORK</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                        </div>
                    </div>
                </div>

                {/* PLATFORM MODULE SUITE CARDS */}
                <div style={{ marginBottom: '6rem' }}>
                    <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: activeTheme.primary, letterSpacing: '0.2em' }}>
                            PLATFORM CAPABILITIES // MODULE SUITE
                        </span>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginTop: '0.25rem' }}>
                            Integrated Purple Team Architecture
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem' }}>
                        {modules.map((m, idx) => {
                            const IconComp = m.icon
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 25 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    style={{
                                        background: activeTheme.cardBg,
                                        border: `1px solid ${m.accent}45`,
                                        borderRadius: 'var(--radius-lg)',
                                        padding: '1.75rem',
                                        textAlign: 'left',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justify: 'space-between',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                        position: 'relative'
                                    }}
                                >
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 900, color: m.accent }}>
                                                {m.num} // {m.category}
                                            </span>
                                            <IconComp size={20} style={{ color: m.accent }} />
                                        </div>

                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '0.6rem' }}>{m.title}</h3>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>{m.desc}</p>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                        <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', background: `${m.accent}15`, color: m.accent, padding: '0.2rem 0.5rem', borderRadius: '4px', border: `1px solid ${m.accent}30` }}>
                                            {m.tag}
                                        </span>
                                        <Link
                                            to={m.link}
                                            style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                                                fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800,
                                                color: m.accent, textDecoration: 'none'
                                            }}
                                        >
                                            OPEN <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* LEADERSHIP CREW */}
                <div style={{ textAlign: 'left', marginBottom: '4rem' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: activeTheme.primary, letterSpacing: '0.2em' }}>
                            CORE DEVELOPMENT TEAM // HACKATHON BUILDERS
                        </span>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginTop: '0.25rem' }}>
                            Cybersecurity & AI Engineering Leads
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {teamMembers.map((m, idx) => (
                            <div key={idx} style={{
                                background: activeTheme.cardBg,
                                border: `1px solid ${m.color}40`,
                                borderRadius: 'var(--radius-lg)',
                                padding: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.25rem',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                            }}>
                                <div style={{
                                    width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden',
                                    border: `2px solid ${m.color}`, flexShrink: 0, background: 'var(--bg-tertiary)'
                                }}>
                                    <img src={m.photo} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: m.color, letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
                                        {m.badge}
                                    </div>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>{m.name}</h3>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{m.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    )
}
