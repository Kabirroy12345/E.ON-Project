import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
    Shield, Zap, Eye, ArrowRight, Lock, Cpu, Users, Terminal,
    Activity, Layers, Sparkles, Globe, Download, ExternalLink, ChevronRight,
    Radio, Crosshair, RefreshCw, Maximize2, Compass, Play
} from 'lucide-react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function Landing() {
    // Canvas WebGL Cyber-Particle & 3D Horizon Grid Engine
    const canvasRef = useRef(null)
    const [activeMode, setActiveMode] = useState('CYBER') // CYBER, WARP, STEALTH
    const [currentTime, setCurrentTime] = useState('')
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [statsCount, setStatsCount] = useState(9600000)

    // 3D Card Hover Tilt Motion
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
    const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
        setMousePos({ x: e.clientX, y: e.clientY })
    }

    // Live clock update
    useEffect(() => {
        const updateClock = () => {
            const now = new Date()
            setCurrentTime(now.toUTCString().slice(17, 25) + ' UTC')
        }
        updateClock()
        const interval = setInterval(updateClock, 1000)
        return () => clearInterval(interval)
    }, [])

    // 60 FPS HTML5 Canvas Kinetic Particle & 3D Horizon Racing Grid Engine
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

        // Particle System
        const particleCount = 160
        const particles = []
        const shockwaves = []

        const colorPalettes = {
            CYBER: ['#00d4ff', '#00ff88', '#0088ff', '#ffffff'],
            WARP: ['#a855f7', '#00d4ff', '#3b82f6', '#ec4899'],
            STEALTH: ['#ff3366', '#ff9f43', '#ff6b6b', '#ffd166']
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * 1000 + 1,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                size: Math.random() * 2.5 + 1,
                baseColor: Math.floor(Math.random() * 4),
                alpha: Math.random() * 0.7 + 0.3
            })
        }

        let mouseXCanvas = width / 2
        let mouseYCanvas = height / 2

        const onCanvasMouseMove = (e) => {
            mouseXCanvas = e.clientX
            mouseYCanvas = e.clientY
        }

        const onCanvasClick = (e) => {
            shockwaves.push({
                x: e.clientX,
                y: e.clientY,
                radius: 0,
                maxRadius: 280,
                alpha: 1,
                color: activeMode === 'STEALTH' ? '#ff3366' : activeMode === 'WARP' ? '#a855f7' : '#00d4ff'
            })
        }

        window.addEventListener('mousemove', onCanvasMouseMove)
        window.addEventListener('click', onCanvasClick)

        let horizonOffset = 0

        const render = () => {
            ctx.clearRect(0, 0, width, height)

            // Background Deep Space Gradient
            const bgGrad = ctx.createRadialGradient(
                width / 2, height / 2, 50,
                width / 2, height / 2, Math.max(width, height)
            )

            if (activeMode === 'STEALTH') {
                bgGrad.addColorStop(0, '#15060a')
                bgGrad.addColorStop(1, '#050204')
            } else if (activeMode === 'WARP') {
                bgGrad.addColorStop(0, '#10061e')
                bgGrad.addColorStop(1, '#04020a')
            } else {
                bgGrad.addColorStop(0, '#061324')
                bgGrad.addColorStop(1, '#030812')
            }
            ctx.fillStyle = bgGrad
            ctx.fillRect(0, 0, width, height)

            // 3D Perspective Cyber-Grid Horizon (Racing AR Grid effect)
            ctx.save()
            const palette = colorPalettes[activeMode] || colorPalettes.CYBER
            const mainColor = palette[0]
            ctx.strokeStyle = mainColor
            ctx.globalAlpha = 0.12
            ctx.lineWidth = 1

            const horizonY = height * 0.65
            horizonOffset = (horizonOffset + (activeMode === 'WARP' ? 4 : 1.5)) % 40

            // Perspective Grid Lines emanating from horizon vanishing point
            const vanishingX = width / 2
            const perspectiveLines = 24
            for (let i = -perspectiveLines; i <= perspectiveLines; i++) {
                const startX = vanishingX + (i * (width / perspectiveLines))
                ctx.beginPath()
                ctx.moveTo(vanishingX, horizonY)
                ctx.lineTo(startX, height)
                ctx.stroke()
            }

            // Horizontal moving speed lines
            for (let y = horizonY; y < height; y += (y - horizonY + 5) * 0.15) {
                const drawY = y + (horizonOffset * ((y - horizonY) / (height - horizonY)))
                if (drawY < height) {
                    ctx.beginPath()
                    ctx.moveTo(0, drawY)
                    ctx.lineTo(width, drawY)
                    ctx.stroke()
                }
            }
            ctx.restore()

            // Draw & Update Particles
            particles.forEach((p) => {
                // Interactive Mouse Gravity / Attraction
                const dx = mouseXCanvas - p.x
                const dy = mouseYCanvas - p.y
                const dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < 220) {
                    const force = (220 - dist) / 220
                    p.vx += (dx / dist) * force * 0.4
                    p.vy += (dy / dist) * force * 0.4
                }

                p.x += p.vx
                p.y += p.vy
                p.vx *= 0.96
                p.vy *= 0.96

                // Boundary bounce
                if (p.x < 0 || p.x > width) p.vx *= -1
                if (p.y < 0 || p.y > height) p.vy *= -1

                const pColor = palette[p.baseColor] || palette[0]

                ctx.save()
                ctx.globalAlpha = p.alpha
                ctx.fillStyle = pColor
                ctx.shadowBlur = 12
                ctx.shadowColor = pColor
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()

                // Connect nearby particles with laser links
                particles.forEach((p2) => {
                    const linkDx = p.x - p2.x
                    const linkDy = p.y - p2.y
                    const linkDist = Math.sqrt(linkDx * linkDx + linkDy * linkDy)

                    if (linkDist < 95) {
                        ctx.save()
                        ctx.globalAlpha = (1 - linkDist / 95) * 0.18
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

            // Render Shockwave Energy Rings (Click Ripple)
            for (let i = shockwaves.length - 1; i >= 0; i--) {
                const sw = shockwaves[i]
                sw.radius += 8
                sw.alpha *= 0.94

                if (sw.alpha < 0.02 || sw.radius > sw.maxRadius) {
                    shockwaves.splice(i, 1)
                    continue
                }

                ctx.save()
                ctx.globalAlpha = sw.alpha
                ctx.strokeStyle = sw.color
                ctx.lineWidth = 3
                ctx.shadowBlur = 20
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
            window.removeEventListener('mousemove', onCanvasMouseMove)
            window.removeEventListener('click', onCanvasClick)
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
        <div className="landing-page-v3" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', color: '#F0EDE8' }}>
            {/* HTML5 Canvas Background Engine */}
            <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'auto', cursor: 'crosshair' }} />

            {/* TOP AR HUD STATUS BAR */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                padding: '1rem 2rem',
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                background: 'rgba(5, 10, 20, 0.65)',
                backdropFilter: 'blur(15px)',
                borderBottom: '1px solid rgba(0, 212, 255, 0.2)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: 'linear-gradient(135deg, var(--cyan), var(--green))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000'
                    }}>
                        <Shield size={18} />
                    </div>
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 900, color: '#fff', letterSpacing: '0.08em' }}>
                            GRIDSHIELD AI <span style={{ fontSize: '0.6rem', color: 'var(--cyan)', background: 'rgba(0,212,255,0.15)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>v2.0 AR</span>
                        </div>
                        <div style={{ fontSize: '0.55rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                            E.ON INNOVATION CHALLENGE 2026 // PURPLE SOC
                        </div>
                    </div>
                </div>

                {/* HUD Live Clock & Mode Selectors */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div className="sp-none" style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.62rem' }}>
                        <div style={{ color: 'var(--cyan)', fontWeight: 800 }}>{currentTime || '08:42:00 UTC'}</div>
                        <div style={{ color: 'var(--text-muted)' }}>DEFCON 3 // 9.6M ASSETS</div>
                    </div>

                    <div style={{ display: 'flex', background: 'rgba(15, 20, 41, 0.8)', padding: '0.2rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {['CYBER', 'WARP', 'STEALTH'].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setActiveMode(mode)}
                                style={{
                                    padding: '0.3rem 0.75rem',
                                    borderRadius: 'var(--radius-full)',
                                    background: activeMode === mode ? (mode === 'STEALTH' ? 'var(--red)' : mode === 'WARP' ? 'var(--purple)' : 'var(--cyan)') : 'transparent',
                                    color: activeMode === mode ? '#000' : 'var(--text-secondary)',
                                    border: 'none',
                                    fontWeight: 800,
                                    fontSize: '0.6rem',
                                    fontFamily: 'var(--font-mono)',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease'
                                }}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* MAIN HERO SECTION */}
            <main style={{ position: 'relative', zIndex: 10, paddingTop: '7rem', paddingBottom: '5rem', maxWidth: '1280px', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', alignItems: 'center', minHeight: 'calc(85vh - 7rem)' }}>
                    
                    {/* Left Column: Kinetic Text & Action Hub */}
                    <div style={{ textAlign: 'left' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0.9rem', borderRadius: 'var(--radius-full)', background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)', marginBottom: '1.5rem' }}
                        >
                            <Radio size={14} style={{ color: 'var(--cyan)', animation: 'pulse 1.5s infinite' }} />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 800, color: 'var(--cyan)', letterSpacing: '0.12em' }}>
                                AUTONOMOUS PURPLE SOC ORCHESTRATION
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            style={{
                                fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
                                fontWeight: 900,
                                lineHeight: 0.95,
                                letterSpacing: '-0.03em',
                                textTransform: 'uppercase',
                                background: activeMode === 'STEALTH'
                                    ? 'linear-gradient(135deg, #ffffff 30%, #ff9f43 70%, #ff3366 100%)'
                                    : activeMode === 'WARP'
                                    ? 'linear-gradient(135deg, #ffffff 30%, #a855f7 70%, #00d4ff 100%)'
                                    : 'linear-gradient(135deg, #ffffff 30%, #00d4ff 70%, #00ff88 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                filter: 'drop-shadow(0 0 35px rgba(0, 212, 255, 0.35))',
                                marginBottom: '1.25rem'
                            }}
                        >
                            GRIDSHIELD AI
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '580px' }}
                        >
                            Autonomous AI-driven <strong style={{ color: '#fff' }}>Purple Team Platform</strong> protecting power distribution grids, substations, and <strong style={{ color: 'var(--cyan)' }}>9.6M customer DER energy assets</strong> with GraphSAGE GNN blast radius correlation and 1.14ms TinyML edge defense.
                        </motion.p>

                        {/* Interactive Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}
                        >
                            <Link
                                to="/dashboard"
                                className="btn btn-primary"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                                    padding: '0.85rem 1.75rem', borderRadius: 'var(--radius-md)', fontWeight: 800,
                                    fontSize: '0.88rem', background: activeMode === 'STEALTH' ? 'var(--red)' : activeMode === 'WARP' ? 'var(--purple)' : 'var(--cyan)',
                                    color: '#000', boxShadow: '0 0 30px rgba(0,212,255,0.4)', border: 'none'
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
                                    border: '1px solid rgba(0, 212, 255, 0.4)', color: '#fff'
                                }}
                            >
                                <Globe size={18} style={{ color: 'var(--cyan)' }} />
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

                        {/* Live Telemetry Counter Badges */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', background: 'rgba(15, 20, 41, 0.75)', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <div>
                                <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>PROTECTED ASSETS</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>9.6M</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>EDGE LATENCY</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>1.14ms</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>GNN SAMPLING</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--purple)' }}>K=2</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: 3D Holographic Interactive HUD Card (Parallax Tilt on Mouse Move) */}
                    <div style={{ perspective: 1000 }} onMouseMove={handleMouseMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}>
                        <motion.div
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d',
                                background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(9, 13, 22, 0.95))',
                                border: '1px solid rgba(0, 212, 255, 0.4)',
                                borderRadius: 'var(--radius-xl)',
                                padding: '2rem',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(0,212,255,0.15)',
                                position: 'relative'
                            }}
                        >
                            {/* Card Top AR Scanner Sweep Bar */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <Crosshair size={18} style={{ color: 'var(--cyan)', animation: 'spin 10s linear infinite' }} />
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, color: '#fff' }}>
                                        REAL-TIME TACTICAL GRID SCANNER
                                    </span>
                                </div>
                                <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', background: 'rgba(0, 255, 136, 0.15)', color: 'var(--green)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(0, 255, 136, 0.3)' }}>
                                    ACTIVE RADAR
                                </span>
                            </div>

                            {/* Simulated Tactical Radar Canvas Display */}
                            <div style={{ position: 'relative', width: '100%', height: '200px', background: '#040814', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid rgba(0, 212, 255, 0.2)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)' }} />
                                
                                {/* Radar concentric circles */}
                                <div style={{ position: 'absolute', width: '160px', height: '160px', borderRadius: '50%', border: '1px solid rgba(0, 212, 255, 0.25)' }} />
                                <div style={{ position: 'absolute', width: '100px', height: '100px', borderRadius: '50%', border: '1px solid rgba(0, 212, 255, 0.2)' }} />
                                <div style={{ position: 'absolute', width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(0, 212, 255, 0.3)' }} />
                                
                                {/* Crosshair lines */}
                                <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'rgba(0, 212, 255, 0.15)' }} />
                                <div style={{ position: 'absolute', width: '1px', height: '100%', background: 'rgba(0, 212, 255, 0.15)' }} />

                                {/* Substation threat dots */}
                                <div style={{ position: 'absolute', top: '35%', left: '42%', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 10px var(--red)' }} />
                                <div style={{ position: 'absolute', top: '65%', left: '68%', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
                                <div style={{ position: 'absolute', top: '25%', left: '75%', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }} />

                                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--cyan)', letterSpacing: '0.1em' }}>GRIDSHIELD GRAPH NODE SCAN</div>
                                    <div style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#fff', marginTop: '0.2rem' }}>9,600,000 ASSETS</div>
                                    <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>● ALL DER SUBSTATIONS MONITORED</div>
                                </div>
                            </div>

                            {/* Card Footer Features List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '0.4rem' }}>
                                    <span>NIS2 Incident Reporting</span>
                                    <strong style={{ color: 'var(--green)' }}>Article 21 Compliant</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '0.4rem' }}>
                                    <span>Privacy Leak Risk</span>
                                    <strong style={{ color: 'var(--cyan)' }}>0% (Zero Telemetry Ingestion)</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>TCO Baseline Target</span>
                                    <strong style={{ color: 'var(--yellow)' }}>€0.80 / device / year</strong>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>

                {/* KINETIC TICKER MARQUEE */}
                <div style={{
                    width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden',
                    background: 'rgba(15, 20, 41, 0.7)', borderTop: '1px solid rgba(0, 212, 255, 0.2)',
                    borderBottom: '1px solid rgba(0, 212, 255, 0.2)', padding: '0.85rem 0',
                    margin: '4rem 0 6rem', whiteSpace: 'nowrap'
                }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '3rem',
                        fontFamily: 'var(--font-mono)', fontSize: '0.76rem', fontWeight: 800,
                        letterSpacing: '0.2em', color: 'var(--cyan)', textTransform: 'uppercase'
                    }}>
                        <span>⚡ AUTONOMOUS RED TEAM AI</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                        <span>🛡️ GRAPHSAGE GNN BLAST RADIUS</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                        <span>⚡ 1.14ms EDGE TINYML INFERENCE</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                        <span>🔒 9.6M DER ASSET DEFENSE</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                        <span>🌐 US NERC-CIP & EU NIS2 READY</span> <span style={{ color: 'rgba(255,255,255,0.2)' }}>★</span>
                        <span>⚡ AUTONOMOUS RED TEAM AI</span>
                    </div>
                </div>

                {/* ADVANCED MODULE CARDS (01 - 04) */}
                <div style={{ marginBottom: '6rem' }}>
                    <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--cyan)', letterSpacing: '0.2em' }}>
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
                                        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.92), rgba(9, 13, 22, 0.96))',
                                        border: `1px solid ${m.accent}40`,
                                        borderRadius: 'var(--radius-lg)',
                                        padding: '1.75rem',
                                        textAlign: 'left',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
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

                {/* EXECUTIVE LEADERSHIP CREW */}
                <div style={{ textAlign: 'left', marginBottom: '4rem' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--cyan)', letterSpacing: '0.2em' }}>
                            CORE DEVELOPMENT TEAM // HACKATHON BUILDERS
                        </span>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginTop: '0.25rem' }}>
                            Cybersecurity & AI Engineering Leads
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {teamMembers.map((m, idx) => (
                            <div key={idx} style={{
                                background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.92), rgba(9, 13, 22, 0.96))',
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
