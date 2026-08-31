import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
    Shield, Zap, Eye, ArrowRight, Lock, Cpu, Users, Terminal,
    Activity, Layers, Sparkles, Globe, Download, ExternalLink, ChevronRight,
    Radio, Crosshair, RefreshCw, Maximize2, Compass, Play, AlertTriangle,
    CheckCircle2, ArrowUpRight, BarChart3, Server, ShieldCheck, Flame, ChevronDown
} from 'lucide-react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import GridWeatherWidget from '../components/GridWeatherWidget'
import CyberSpeedwayCircuit from '../components/CyberSpeedwayCircuit'
import CyberParticleNetworkBackground from '../components/CyberParticleNetworkBackground'
import CyberHeroHeading from '../components/CyberHeroHeading'

// THEME CONFIGURATIONS (CYBER, WARP, STEALTH)
const THEME_CONFIGS = {
    CYBER: {
        name: 'CYBER NEON',
        primary: '#00d4ff',
        secondary: '#00ff88',
        accentGlow: 'rgba(0, 212, 255, 0.45)',
        cardBg: 'linear-gradient(145deg, rgba(11, 19, 38, 0.85), rgba(6, 11, 24, 0.95))',
        border: 'rgba(0, 212, 255, 0.25)',
        bgStart: '#081326',
        bgEnd: '#030712',
        gridSpeed: 1.6,
        particleSpeed: 1.4,
        palette: ['#00d4ff', '#00ff88', '#0088ff', '#ffffff'],
        statusText: 'DEFCON 3 // 9.6M ASSETS ONLINE',
        badgeBg: 'rgba(0, 212, 255, 0.1)',
        badgeColor: 'var(--cyan)'
    },
    WARP: {
        name: 'HYPER WARP',
        primary: '#a855f7',
        secondary: '#ec4899',
        accentGlow: 'rgba(168, 85, 247, 0.55)',
        cardBg: 'linear-gradient(145deg, rgba(28, 12, 46, 0.85), rgba(11, 4, 22, 0.95))',
        border: 'rgba(168, 85, 247, 0.35)',
        bgStart: '#1d0933',
        bgEnd: '#06020c',
        gridSpeed: 5.5,
        particleSpeed: 4.2,
        palette: ['#a855f7', '#ec4899', '#3b82f6', '#ffffff'],
        statusText: 'WARP VELOCITY // HYPER-GRID STREAM',
        badgeBg: 'rgba(168, 85, 247, 0.15)',
        badgeColor: 'var(--purple)'
    },
    STEALTH: {
        name: 'RED ALERT STEALTH',
        primary: '#ff3366',
        secondary: '#ff9f43',
        accentGlow: 'rgba(255, 51, 102, 0.55)',
        cardBg: 'linear-gradient(145deg, rgba(38, 10, 20, 0.85), rgba(14, 4, 8, 0.95))',
        border: 'rgba(255, 51, 102, 0.35)',
        bgStart: '#260710',
        bgEnd: '#080103',
        gridSpeed: 3.0,
        particleSpeed: 2.5,
        palette: ['#ff3366', '#ff9f43', '#ff6b6b', '#ffffff'],
        statusText: 'DEFCON 1 // ACTIVE ADVERSARY EMULATION',
        badgeBg: 'rgba(255, 51, 102, 0.15)',
        badgeColor: 'var(--red)'
    }
}

export default function Landing() {
    const canvasRef = useRef(null)
    const [activeMode, setActiveMode] = useState('CYBER')
    const [currentTime, setCurrentTime] = useState('')
    const activeTheme = THEME_CONFIGS[activeMode] || THEME_CONFIGS.CYBER

    // 3D Parallax Card Motion
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const rotateX = useTransform(mouseY, [-300, 300], [6, -6])
    const rotateY = useTransform(mouseX, [-300, 300], [-6, 6])

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
    }

    // Real-Time UTC Clock
    useEffect(() => {
        const updateClock = () => {
            const now = new Date()
            setCurrentTime(now.toUTCString().slice(17, 25) + ' UTC')
        }
        updateClock()
        const interval = setInterval(updateClock, 1000)
        return () => clearInterval(interval)
    }, [])

    // 60 FPS Dynamic WebGL Kinetic Engine (Particle Mesh & Horizon Perspective)
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

        const particleCount = 140
        const particles = []
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * activeTheme.particleSpeed * 0.8,
                vy: (Math.random() - 0.5) * activeTheme.particleSpeed * 0.8,
                size: Math.random() * 2.2 + 0.8,
                colorIndex: Math.floor(Math.random() * 4),
                alpha: Math.random() * 0.6 + 0.2
            })
        }

        let mouseXCanvas = width / 2
        let mouseYCanvas = height / 2
        const onMouseMove = (e) => {
            mouseXCanvas = e.clientX
            mouseYCanvas = e.clientY
        }
        window.addEventListener('mousemove', onMouseMove)

        let gridOffset = 0

        const render = () => {
            ctx.clearRect(0, 0, width, height)

            // 1. Dynamic Radial Mesh Gradient
            const bgGrad = ctx.createRadialGradient(
                width / 2, height * 0.35, 100,
                width / 2, height / 2, Math.max(width, height) * 0.9
            )
            bgGrad.addColorStop(0, activeTheme.bgStart)
            bgGrad.addColorStop(1, activeTheme.bgEnd)
            ctx.fillStyle = bgGrad
            ctx.fillRect(0, 0, width, height)

            // 2. Horizon Speed Lines
            ctx.save()
            ctx.strokeStyle = activeTheme.primary
            ctx.globalAlpha = activeMode === 'WARP' ? 0.22 : 0.1
            ctx.lineWidth = activeMode === 'WARP' ? 1.4 : 0.8

            const horizonY = height * 0.58
            gridOffset = (gridOffset + activeTheme.gridSpeed) % 40

            const vanishingX = width / 2
            const perspectiveLines = 24
            for (let i = -perspectiveLines; i <= perspectiveLines; i++) {
                const startX = vanishingX + (i * (width / perspectiveLines))
                ctx.beginPath()
                ctx.moveTo(vanishingX, horizonY)
                ctx.lineTo(startX, height)
                ctx.stroke()
            }

            for (let y = horizonY; y < height; y += (y - horizonY + 8) * 0.15) {
                const drawY = y + (gridOffset * ((y - horizonY) / (height - horizonY)))
                if (drawY < height) {
                    ctx.beginPath()
                    ctx.moveTo(0, drawY)
                    ctx.lineTo(width, drawY)
                    ctx.stroke()
                }
            }
            ctx.restore()

            // 3. Kinetic Particles & Proximity Linking
            particles.forEach((p) => {
                const dx = mouseXCanvas - p.x
                const dy = mouseYCanvas - p.y
                const dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < 220) {
                    const force = (220 - dist) / 220
                    p.vx += (dx / dist) * force * 0.5
                    p.vy += (dy / dist) * force * 0.5
                }

                p.x += p.vx
                p.y += p.vy
                p.vx *= 0.96
                p.vy *= 0.96

                if (p.x < 0) p.x = width
                if (p.x > width) p.x = 0
                if (p.y < 0) p.y = height
                if (p.y > height) p.y = 0

                const pColor = activeTheme.palette[p.colorIndex] || activeTheme.primary

                ctx.save()
                ctx.globalAlpha = p.alpha
                ctx.fillStyle = pColor
                ctx.shadowBlur = 8
                ctx.shadowColor = pColor
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()
            })

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', onMouseMove)
        }
    }, [activeTheme, activeMode])

    // Team Members
    const teamMembers = [
        {
            name: 'Pulkit Agrawal',
            role: 'Lead AI Engineer & Systems Architect',
            badge: 'LEAD ARCHITECT',
            color: 'var(--red)',
            photo: '/team/pulkit.png'
        },
        {
            name: 'Kabir Roy',
            role: 'Cybersecurity & Purple SOC Lead',
            badge: 'SECURITY LEAD',
            color: 'var(--cyan)',
            photo: '/team/kabir.jpg'
        }
    ]

    return (
        <div style={{ position: 'relative', minHeight: '100vh', background: '#030712', color: '#F0EDE8', overflowX: 'hidden' }}>
            
            {/* Background Canvas Engine */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            {/* FLOATING FROSTED GLASS PILL HEADER (DRIBBLE WEB3 STYLE) */}
            <header style={{
                position: 'fixed',
                top: '1.25rem',
                left: 0,
                right: 0,
                zIndex: 100,
                display: 'flex',
                justifyContent: 'center',
                padding: '0 1.5rem',
                pointerEvents: 'none'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '1240px',
                    padding: '0.65rem 1.4rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(8, 14, 28, 0.78)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 212, 255, 0.15)',
                    pointerEvents: 'auto'
                }}>
                    {/* Left Brand Area */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                        <div style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: `1.5px solid ${activeTheme.primary}`,
                            boxShadow: `0 0 20px ${activeTheme.primary}`,
                            flexShrink: 0,
                            background: '#040914'
                        }}>
                            <img
                                src="/gridshield_cyber_logo.png"
                                alt="GridShield Emblem"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 900, color: '#fff', letterSpacing: '0.06em' }}>
                                    GRIDSHIELD
                                </span>
                                <span style={{ fontSize: '0.55rem', fontFamily: 'var(--font-mono)', fontWeight: 800, background: activeTheme.badgeBg, color: activeTheme.primary, padding: '0.1rem 0.45rem', borderRadius: '4px', border: `1px solid ${activeTheme.border}` }}>
                                    v2.0
                                </span>
                            </div>
                            <div style={{ fontSize: '0.55rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                                E.ON CHALLENGE 2026
                            </div>
                        </div>
                    </Link>

                    {/* Center Floating Navigation Links */}
                    <nav className="sp-none" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {[
                            { path: '/dashboard', label: 'Security SOC' },
                            { path: '/purple-team', label: 'Purple Team' },
                            { path: '/asset-shield', label: 'Asset Shield' },
                            { path: '/global-defense', label: 'Global Matrix' },
                            { path: '/impact', label: 'TCO & ROI' }
                        ].map((link, idx) => (
                            <Link
                                key={idx}
                                to={link.path}
                                style={{
                                    padding: '0.45rem 0.85rem',
                                    borderRadius: 'var(--radius-full)',
                                    color: '#cbd5e1',
                                    fontSize: '0.78rem',
                                    fontFamily: 'var(--font-sans)',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#fff'
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#cbd5e1'
                                    e.currentTarget.style.background = 'transparent'
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Action & Theme Switcher */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {/* Mode Switcher */}
                        <div style={{
                            display: 'flex',
                            background: 'rgba(5, 10, 22, 0.8)',
                            padding: '0.2rem',
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
                                            padding: '0.3rem 0.7rem',
                                            borderRadius: 'var(--radius-full)',
                                            background: isActive ? modeConfig.primary : 'transparent',
                                            color: isActive ? '#000' : 'var(--text-secondary)',
                                            border: 'none',
                                            fontWeight: 800,
                                            fontSize: '0.6rem',
                                            fontFamily: 'var(--font-mono)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {mode}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Direct Launch CTA */}
                        <Link
                            to="/dashboard"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.5rem 1.15rem',
                                borderRadius: 'var(--radius-full)',
                                background: activeTheme.primary,
                                color: '#000',
                                fontWeight: 900,
                                fontSize: '0.78rem',
                                fontFamily: 'var(--font-mono)',
                                textDecoration: 'none',
                                boxShadow: `0 0 25px ${activeTheme.accentGlow}`,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <span>LAUNCH SOC</span>
                            <ArrowUpRight size={14} />
                        </Link>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT HERO & SECTIONS */}
            <main style={{ position: 'relative', zIndex: 10, paddingTop: '8rem', paddingBottom: '5rem', maxWidth: '1280px', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                
                {/* HERO SECTION (DRIBBBLE WEB3 ASYMMETRIC GRID) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.95fr)', gap: '3.5rem', alignItems: 'center', minHeight: 'calc(80vh - 6rem)', marginBottom: '4rem' }}>
                    
                    {/* Left Hero Column */}
                    <div style={{ textAlign: 'left' }}>
                        {/* Top Announcement Pill */}
                        <motion.div
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                padding: '0.35rem 0.95rem',
                                borderRadius: 'var(--radius-full)',
                                background: 'rgba(15, 23, 42, 0.75)',
                                border: `1px solid ${activeTheme.border}`,
                                marginBottom: '1.5rem',
                                boxShadow: `0 0 20px ${activeTheme.accentGlow}`
                            }}
                        >
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: activeTheme.primary, boxShadow: `0 0 10px ${activeTheme.primary}`, animation: 'pulse 1.5s infinite' }}></span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>
                                E.ON INNOVATION CHALLENGE 2026 // PURPLE SOC
                            </span>
                            <ChevronRight size={14} style={{ color: activeTheme.primary }} />
                        </motion.div>

                        {/* Interactive Cyber Hero Heading */}
                        <CyberHeroHeading text="GRIDSHIELD" activeTheme={activeTheme} />

                        {/* Main Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            style={{
                                fontSize: '1.1rem',
                                color: '#94a3b8',
                                lineHeight: 1.7,
                                marginBottom: '2.25rem',
                                maxWidth: '580px'
                            }}
                        >
                            Autonomous <strong style={{ color: '#fff' }}>Purple SOC Architecture</strong> protecting power distribution grids, high-voltage substations, and <strong style={{ color: activeTheme.primary }}>9.6M customer DER assets</strong> with GraphSAGE 2-hop GNN correlation and 1.14ms on-device TinyML edge defense.
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
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.65rem',
                                    padding: '0.9rem 2.2rem',
                                    borderRadius: 'var(--radius-full)',
                                    fontWeight: 900,
                                    fontSize: '0.88rem',
                                    fontFamily: 'var(--font-mono)',
                                    background: `linear-gradient(135deg, ${activeTheme.primary}, #00a8ff)`,
                                    color: '#000',
                                    boxShadow: `0 0 35px ${activeTheme.accentGlow}`,
                                    textDecoration: 'none',
                                    transition: 'all 0.25s ease'
                                }}
                            >
                                <Cpu size={18} />
                                <span>LAUNCH COMMAND SOC</span>
                                <ArrowUpRight size={16} />
                            </Link>

                            <Link
                                to="/global-defense"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.65rem',
                                    padding: '0.9rem 2rem',
                                    borderRadius: 'var(--radius-full)',
                                    fontWeight: 800,
                                    fontSize: '0.88rem',
                                    fontFamily: 'var(--font-mono)',
                                    background: 'rgba(15, 23, 42, 0.8)',
                                    border: `1px solid ${activeTheme.border}`,
                                    color: '#fff',
                                    textDecoration: 'none',
                                    backdropFilter: 'blur(12px)',
                                    transition: 'all 0.25s ease'
                                }}
                            >
                                <Globe size={18} style={{ color: activeTheme.primary }} />
                                <span>GLOBAL DEFENSE MATRIX</span>
                            </Link>
                        </motion.div>

                        {/* Live Trust Metrics Pill Row */}
                        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                            <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <ShieldCheck size={13} style={{ color: 'var(--green)' }} /> 9.6M+ DER Assets
                            </div>
                            <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Zap size={13} style={{ color: activeTheme.primary }} /> 1.14ms TinyML Edge
                            </div>
                            <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Lock size={13} style={{ color: 'var(--yellow)' }} /> 100% GDPR Zero-Leak
                            </div>
                        </div>
                    </div>

                    {/* Right Hero Column: 3D Holographic Web3 Provider Glassmorphic Card */}
                    <div style={{ perspective: 1000, position: 'relative' }} onMouseMove={handleMouseMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}>
                        
                        {/* Floating Glassmorphic Badge #1 (Top Right) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            style={{
                                position: 'absolute',
                                top: '-1.5rem',
                                right: '-1rem',
                                zIndex: 15,
                                background: 'rgba(8, 14, 28, 0.9)',
                                backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(0, 212, 255, 0.4)',
                                borderRadius: 'var(--radius-lg)',
                                padding: '0.6rem 1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(0, 212, 255, 0.25)'
                            }}
                        >
                            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(0, 212, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeTheme.primary }}>
                                <Cpu size={16} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.56rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>GRAPH REACTION</div>
                                <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#fff' }}>&lt;140ms GPU</div>
                            </div>
                        </motion.div>

                        {/* Floating Glassmorphic Badge #2 (Bottom Left) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            style={{
                                position: 'absolute',
                                bottom: '-1.5rem',
                                left: '-1rem',
                                zIndex: 15,
                                background: 'rgba(8, 14, 28, 0.9)',
                                backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(0, 255, 136, 0.4)',
                                borderRadius: 'var(--radius-lg)',
                                padding: '0.6rem 1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(0, 255, 136, 0.25)'
                            }}
                        >
                            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(0, 255, 136, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green)' }}>
                                <ShieldCheck size={16} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.56rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>EDGE INFERENCE</div>
                                <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#fff' }}>800+ FPS / CORTEX-M4</div>
                            </div>
                        </motion.div>

                        {/* Main 3D Card Body */}
                        <motion.div
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d',
                                background: activeTheme.cardBg,
                                border: `1px solid ${activeTheme.border}`,
                                borderRadius: 'var(--radius-2xl)',
                                padding: '2rem',
                                boxShadow: `0 30px 60px rgba(0,0,0,0.8), 0 0 45px ${activeTheme.accentGlow}`,
                                backdropFilter: 'blur(20px)',
                                position: 'relative'
                            }}
                        >
                            {/* Card Radar Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: `1px solid ${activeTheme.border}`, paddingBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <Crosshair size={18} style={{ color: activeTheme.primary, animation: 'spin 10s linear infinite' }} />
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', fontWeight: 900, color: '#fff' }}>
                                        TACTICAL GRID RADAR SCOPE
                                    </span>
                                </div>
                                <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', fontWeight: 800, background: activeTheme.badgeBg, color: activeTheme.primary, padding: '0.2rem 0.55rem', borderRadius: '4px', border: `1px solid ${activeTheme.border}` }}>
                                    SCANNING ACTIVE
                                </span>
                            </div>

                            {/* Radar Canvas Sweep Display */}
                            <div style={{ position: 'relative', width: '100%', height: '210px', background: '#020612', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: `1px solid ${activeTheme.border}`, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle, ${activeTheme.primary}20 0%, transparent 70%)` }} />
                                
                                {/* Concentric Radar Circles */}
                                <div style={{ position: 'absolute', width: '170px', height: '170px', borderRadius: '50%', border: `1px solid ${activeTheme.primary}35` }} />
                                <div style={{ position: 'absolute', width: '110px', height: '110px', borderRadius: '50%', border: `1px solid ${activeTheme.primary}25` }} />
                                <div style={{ position: 'absolute', width: '50px', height: '50px', borderRadius: '50%', border: `1px solid ${activeTheme.primary}45` }} />
                                
                                {/* Crosshair Lines */}
                                <div style={{ position: 'absolute', width: '100%', height: '1px', background: `${activeTheme.primary}25` }} />
                                <div style={{ position: 'absolute', width: '1px', height: '100%', background: `${activeTheme.primary}25` }} />

                                {/* Substation Threat Nodes */}
                                <div style={{ position: 'absolute', top: '35%', left: '42%', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 10px var(--red)' }} />
                                <div style={{ position: 'absolute', top: '65%', left: '68%', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
                                <div style={{ position: 'absolute', top: '25%', left: '75%', width: '6px', height: '6px', borderRadius: '50%', background: activeTheme.primary, boxShadow: `0 0 8px ${activeTheme.primary}` }} />

                                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: activeTheme.primary, letterSpacing: '0.1em' }}>GRAPH NEURAL NETWORK</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#fff', marginTop: '0.15rem' }}>9,600,000 ASSETS</div>
                                    <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--green)', marginTop: '0.15rem' }}>● ALL SUBSTATION NODES SECURED</div>
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

                {/* INFINITE SEAMLESS TICKER MARQUEE */}
                <div className="ticker-container" style={{
                    width: '100vw',
                    position: 'relative',
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                    marginTop: '2rem',
                    marginBottom: '4rem',
                    overflow: 'hidden',
                    background: 'rgba(5, 10, 24, 0.75)',
                    borderTop: '1px solid rgba(0, 212, 255, 0.18)',
                    borderBottom: '1px solid rgba(0, 212, 255, 0.18)',
                    padding: '0.85rem 0',
                    backdropFilter: 'blur(12px)',
                    display: 'flex',
                    whiteSpace: 'nowrap'
                }}>
                    <div className="ticker-wrapper" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        width: 'max-content',
                        alignItems: 'center'
                    }}>
                        {/* Duplicate Group 1 */}
                        <div className="ticker-group" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', gap: '2.5rem', paddingRight: '2.5rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                            <span>⚡ AUTONOMOUS RED TEAM AI</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>🛡️ GRAPHSAGE GNN BLAST RADIUS</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>⚡ 1.14ms EDGE TINYML INFERENCE</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>🔒 9.6M DER ASSET DEFENSE</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>🌐 US NERC-CIP & EU NIS2 READY</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>💚 CLUSTER 5 ADOPTION FRAMEWORK</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                        </div>
                        {/* Duplicate Group 2 for Infinite Loop */}
                        <div className="ticker-group" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', gap: '2.5rem', paddingRight: '2.5rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                            <span>⚡ AUTONOMOUS RED TEAM AI</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>🛡️ GRAPHSAGE GNN BLAST RADIUS</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>⚡ 1.14ms EDGE TINYML INFERENCE</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>🔒 9.6M DER ASSET DEFENSE</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>🌐 US NERC-CIP & EU NIS2 READY</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                            <span>💚 CLUSTER 5 ADOPTION FRAMEWORK</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                        </div>
                    </div>
                </div>

                {/* 3D HOLOGRAPHIC SUBSTATION WEATHER RADAR GLOBE */}
                <div style={{ marginBottom: '6rem' }}>
                    <GridWeatherWidget />
                </div>

                {/* DYNAMIC CYBER SPEEDWAY RACING CIRCUIT */}
                <div style={{ marginBottom: '6rem' }}>
                    <CyberSpeedwayCircuit activeTheme={activeTheme} />
                </div>

                {/* LEADERSHIP CREW (WITH ANIMATED NEURAL PARTICLE NETWORK BACKGROUND) */}
                <div style={{
                    position: 'relative',
                    textAlign: 'left',
                    marginBottom: '4rem',
                    padding: '2.5rem 2rem',
                    borderRadius: 'var(--radius-2xl)',
                    border: '1px solid rgba(0, 212, 255, 0.25)',
                    background: 'rgba(6, 10, 24, 0.6)',
                    backdropFilter: 'blur(16px)',
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
                }}>
                    <CyberParticleNetworkBackground />

                    <div style={{ position: 'relative', zIndex: 2 }}>
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
                                    background: 'rgba(10, 16, 32, 0.85)',
                                    border: `1px solid ${m.color}60`,
                                    borderRadius: 'var(--radius-lg)',
                                    padding: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.25rem',
                                    boxShadow: `0 10px 30px rgba(0,0,0,0.5), 0 0 20px ${m.color}20`,
                                    backdropFilter: 'blur(12px)',
                                    position: 'relative',
                                    zIndex: 3
                                }}>
                                    <div style={{
                                        width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden',
                                        border: `2px solid ${m.color}`, flexShrink: 0, background: 'var(--bg-tertiary)',
                                        boxShadow: `0 0 15px ${m.color}40`
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
                </div>

            </main>
        </div>
    )
}
