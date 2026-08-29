import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
    Swords, Shield, Cpu, Globe, ChevronRight, Zap, Flame, Gauge,
    CheckCircle2, Radio, Activity, AlertTriangle, Trophy, Flag
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function CyberSpeedwayCircuit({ activeTheme }) {
    const carCanvasRef = useRef(null)
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

    // 60 FPS Mouse-Tracking F1 Race Car Physics Engine
    useEffect(() => {
        const canvas = carCanvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId

        let width = (canvas.width = canvas.parentElement.clientWidth || 800)
        let height = (canvas.height = 200)

        // Mouse tracking state
        let mouseX = width / 2
        let carX = width / 2
        let prevCarX = width / 2
        let velocityX = 0
        let bobbingTime = 0
        let bgOffset = 0

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouseX = e.clientX - rect.left
        }

        const handleResize = () => {
            if (!canvas.parentElement) return
            width = canvas.width = canvas.parentElement.clientWidth || 800
            height = canvas.height = 200
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('resize', handleResize)

        const render = () => {
            ctx.clearRect(0, 0, width, height)

            // LERP interpolation (0.1 factor for heavy, realistic physics feel)
            carX += (mouseX - carX) * 0.1
            velocityX = carX - prevCarX
            prevCarX = carX

            // Physics parameters
            const tilt = Math.max(-0.15, Math.min(0.15, velocityX * 0.015)) // Banking angle
            const steerAngle = Math.max(-0.35, Math.min(0.35, velocityX * 0.04)) // Front wheel steer
            const absSpeed = Math.abs(velocityX)
            bobbingTime += 0.15
            const bobbingY = Math.sin(bobbingTime) * 1.5 // Chassis flex / suspension

            bgOffset = (bgOffset - velocityX * 0.8) % 100

            // 1. Parallax Blurred Grandstand / Track Grid Background
            ctx.save()
            const bgGrad = ctx.createLinearGradient(0, 0, 0, height)
            bgGrad.addColorStop(0, '#060b18')
            bgGrad.addColorStop(0.6, '#0f172a')
            bgGrad.addColorStop(1, '#020612')
            ctx.fillStyle = bgGrad
            ctx.fillRect(0, 0, width, height)

            // Track Grid Lines (Scroller)
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)'
            ctx.lineWidth = 1
            ctx.beginPath()
            for (let x = (bgOffset % 40) - 40; x < width + 40; x += 40) {
                ctx.moveTo(x, height * 0.6)
                ctx.lineTo(x - (x - width / 2) * 0.4, height)
            }
            ctx.stroke()
            ctx.restore()

            // 2. Speedway Track Asphalt & Red/White Kerbs
            const kerbY = height * 0.65
            ctx.fillStyle = '#0a0f1d'
            ctx.fillRect(0, kerbY, width, height - kerbY)

            // Red/White F1 Kerb Strip
            ctx.save()
            const kerbStep = 30
            for (let x = (bgOffset % (kerbStep * 2)) - kerbStep * 2; x < width + kerbStep; x += kerbStep) {
                ctx.fillStyle = Math.floor((x - bgOffset) / kerbStep) % 2 === 0 ? '#ef4444' : '#ffffff'
                ctx.fillRect(x, kerbY, kerbStep, 6)
            }
            ctx.restore()

            // 3. Motion Blur Speed-Line Streaks
            if (absSpeed > 1.2) {
                ctx.save()
                ctx.strokeStyle = velocityX > 0 ? 'rgba(0, 212, 255, 0.4)' : 'rgba(239, 68, 68, 0.4)'
                ctx.lineWidth = Math.min(4, absSpeed)
                ctx.shadowBlur = 10
                ctx.shadowColor = 'var(--cyan)'
                ctx.beginPath()
                for (let i = 0; i < 5; i++) {
                    const streakY = kerbY + 15 + (i * 12)
                    const streakLen = absSpeed * 15
                    const startX = carX - (velocityX > 0 ? streakLen : -streakLen)
                    ctx.moveTo(startX, streakY)
                    ctx.lineTo(startX + (velocityX > 0 ? streakLen * 1.5 : -streakLen * 1.5), streakY)
                }
                ctx.stroke()
                ctx.restore()
            }

            // 4. Ground Shadow (Skews & Stretches with Tilt)
            const carY = height * 0.72 + bobbingY
            ctx.save()
            ctx.translate(carX, carY + 18)
            ctx.scale(1 + Math.abs(tilt), 0.3)
            ctx.rotate(tilt * 0.5)
            const shadowGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 80)
            shadowGrad.addColorStop(0, 'rgba(0,0,0,0.85)')
            shadowGrad.addColorStop(1, 'transparent')
            ctx.fillStyle = shadowGrad
            ctx.beginPath()
            ctx.ellipse(0, 0, 90, 30, 0, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()

            // 5. High-Detail Crisp F1 Race Car (SVG Path / Canvas Drawing)
            ctx.save()
            ctx.translate(carX, carY)
            ctx.rotate(tilt)

            // Rear Wing
            ctx.fillStyle = '#00d4ff'
            ctx.fillRect(-70, -22, 18, 16)
            ctx.fillStyle = '#0284c7'
            ctx.fillRect(-75, -28, 28, 6)

            // Chassis & Body Nose
            ctx.fillStyle = '#0f172a'
            ctx.beginPath()
            ctx.moveTo(-60, 0)
            ctx.lineTo(-40, -14)
            ctx.lineTo(20, -12)
            ctx.lineTo(65, 4) // Nose tip
            ctx.lineTo(60, 10)
            ctx.lineTo(-60, 10)
            ctx.closePath()
            ctx.fill()

            // Livery Sidepod Accent Gradient
            const bodyGrad = ctx.createLinearGradient(-40, 0, 60, 0)
            bodyGrad.addColorStop(0, '#00d4ff')
            bodyGrad.addColorStop(0.5, '#00ff88')
            bodyGrad.addColorStop(1, '#3b82f6')
            ctx.fillStyle = bodyGrad
            ctx.fillRect(-35, -8, 55, 8)

            // Halo & Cockpit
            ctx.fillStyle = '#020617'
            ctx.beginPath()
            ctx.ellipse(-5, -14, 14, 7, 0, 0, Math.PI * 2)
            ctx.fill()
            ctx.strokeStyle = '#38bdf8'
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.arc(-5, -14, 12, Math.PI, Math.PI * 2)
            ctx.stroke()

            // Front Wing
            ctx.fillStyle = '#00ff88'
            ctx.fillRect(55, 4, 25, 6)

            // Wheels & Steering Engine (Exposed Tires)
            const drawWheel = (wx, wy, isFront) => {
                ctx.save()
                ctx.translate(wx, wy)
                if (isFront) ctx.rotate(steerAngle)
                ctx.fillStyle = '#1e293b'
                ctx.beginPath()
                ctx.ellipse(0, 0, 12, 14, 0, 0, Math.PI * 2)
                ctx.fill()
                // Yellow Pirelli Rim Accent
                ctx.strokeStyle = '#facc15'
                ctx.lineWidth = 2
                ctx.beginPath()
                ctx.arc(0, 0, 6, 0, Math.PI * 2)
                ctx.stroke()
                ctx.restore()
            }

            drawWheel(-42, 8, false) // Rear wheel
            drawWheel(42, 8, true)   // Steered Front wheel

            ctx.restore()

            animId = requestAnimationFrame(render)
        }

        render()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
        }
    }, [boostMode])

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

            {/* CINEMATIC VINTAGE COASTAL HIGHWAY CAR TRACKING BANNER (60 FPS CANVAS ANIMATION) */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '180px',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid rgba(0, 212, 255, 0.35)',
                marginBottom: '2rem',
                boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
                background: '#040814'
            }}>
                {/* 60 FPS HTML5 Moving Canvas */}
                <canvas
                    ref={carCanvasRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        filter: boostMode === 'NITRO' ? 'hue-rotate(-20deg) saturate(1.4)' : 'brightness(0.9) contrast(1.15)',
                        transition: 'filter 0.5s ease'
                    }}
                />
                
                {/* Overlay Gradient for Cyber Hud Integration */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, rgba(6, 10, 24, 0.85) 0%, rgba(6, 10, 24, 0.2) 50%, rgba(6, 10, 24, 0.85) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    padding: '1.25rem'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                            fontSize: '0.64rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 900,
                            color: 'var(--cyan)',
                            background: 'rgba(0,0,0,0.7)',
                            padding: '0.25rem 0.65rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid rgba(0, 212, 255, 0.5)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                        }}>
                            <Gauge size={12} style={{ animation: 'pulse 1s infinite' }} /> F1 MOUSE-TRACKING PHYSICS ENGINE // MOVE CURSOR HORIZONTALLY
                        </span>

                        <span style={{
                            fontSize: '0.6rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 800,
                            color: '#fff',
                            background: 'rgba(0, 255, 136, 0.25)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            border: '1px solid rgba(0, 255, 136, 0.5)'
                        }}>
                            60 FPS LERP (0.1) PHYSICS
                        </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                                VEHICLE TELEMETRY
                            </div>
                            <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#fff' }}>
                                HIGH-PRECISION F1 TELEMETRY CAR
                            </div>
                        </div>

                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, color: 'var(--green)' }}>
                            ● DER TELEMETRY SYNCED
                        </div>
                    </div>
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
