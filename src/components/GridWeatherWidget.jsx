import React, { useState, useEffect, useRef } from 'react'
import { CloudSun, Wind, Sun, MapPin, ShieldCheck, Zap, Radio, Globe, Navigation, Compass } from 'lucide-react'
import { motion } from 'framer-motion'

const SUBSTATION_NODES = [
    { id: 'essen', city: 'Essen (E.ON HQ)', country: 'Germany', lat: 51.45, lon: 7.01, temp: 18.4, wind: 14.2, solar: 685, status: 'OPTIMAL SOLAR BACKFEED', risk: 'CLEAR SKY', color: '#00ff88' },
    { id: 'frankfurt', city: 'Frankfurt Substation', country: 'Germany', lat: 50.11, lon: 8.68, temp: 19.8, wind: 11.5, solar: 720, status: 'PEAK IRRADIANCE LOAD', risk: 'HIGH SOLAR', color: '#00d4ff' },
    { id: 'munich', city: 'Munich DSO Grid', country: 'Germany', lat: 48.13, lon: 11.58, temp: 17.2, wind: 18.0, solar: 590, status: 'GRID VOLTAGE STABLE', risk: 'NOMINAL', color: '#3b82f6' },
    { id: 'amsterdam', city: 'Amsterdam Wind DSO', country: 'Netherlands', lat: 52.36, lon: 4.90, temp: 16.0, wind: 28.5, solar: 420, status: 'WIND TURBINE SURGE', risk: 'WIND GUSTS', color: '#a855f7' },
    { id: 'stockholm', city: 'Stockholm North Node', country: 'Sweden', lat: 59.32, lon: 18.06, temp: 14.5, wind: 9.2, solar: 380, status: 'SUBSTATION NOMINAL', risk: 'STABLE', color: '#ff9f43' }
]

export default function GridWeatherWidget() {
    const canvasRef = useRef(null)
    const [selectedNode, setSelectedNode] = useState(SUBSTATION_NODES[0])
    const [isDetecting, setIsDetecting] = useState(false)
    const [liveLocationName, setLiveLocationName] = useState(null)
    const [globeRotation, setGlobeRotation] = useState(0)

    // Geolocation Detection
    const handleDetectLocation = () => {
        setIsDetecting(true)
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const lat = pos.coords.latitude
                    const lon = pos.coords.longitude
                    const customNode = {
                        id: 'live',
                        city: `Live Substation Node`,
                        country: `GPS (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`,
                        lat, lon,
                        temp: 19.2,
                        wind: 13.4,
                        solar: 660,
                        status: 'LIVE DETECTED NODE',
                        risk: 'GRID SYNCED',
                        color: '#00ff88'
                    }
                    setSelectedNode(customNode)
                    setLiveLocationName(`Coordinates (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`)
                    setIsDetecting(false)
                },
                () => {
                    setSelectedNode(SUBSTATION_NODES[0])
                    setIsDetecting(false)
                },
                { timeout: 5000 }
            )
        } else {
            setIsDetecting(false)
        }
    }

    // 60 FPS HTML5 Canvas 3D Holographic Weather Radar Globe Engine
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animationFrameId
        let width = (canvas.width = canvas.parentElement.clientWidth || 600)
        let height = (canvas.height = 240)

        let rotY = 0
        let sweepAngle = 0

        // Weather particles
        const windParticles = []
        for (let i = 0; i < 40; i++) {
            windParticles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                speed: Math.random() * 2 + 1,
                size: Math.random() * 2 + 1,
                alpha: Math.random() * 0.6 + 0.2
            })
        }

        const render = () => {
            ctx.clearRect(0, 0, width, height)
            rotY += 0.008
            sweepAngle = (sweepAngle + 0.04) % (Math.PI * 2)

            const centerX = width * 0.28
            const centerY = height * 0.5
            const radius = 80

            // 1. Background Glow & Holographic Grid Ring
            const radGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius * 1.5)
            radGrad.addColorStop(0, `${selectedNode.color}25`)
            radGrad.addColorStop(1, 'transparent')
            ctx.fillStyle = radGrad
            ctx.fillRect(0, 0, width, height)

            // Outer Orbit Ring
            ctx.save()
            ctx.strokeStyle = `${selectedNode.color}50`
            ctx.lineWidth = 1.5
            ctx.setLineDash([4, 4])
            ctx.beginPath()
            ctx.arc(centerX, centerY, radius + 15, 0, Math.PI * 2)
            ctx.stroke()
            ctx.restore()

            // 2. 3D Rotating Globe Latitude/Longitude Wireframe Lines
            const latLines = 8
            const lonLines = 12

            ctx.save()
            ctx.strokeStyle = `${selectedNode.color}40`
            ctx.lineWidth = 1

            // Latitude rings
            for (let i = -latLines / 2; i <= latLines / 2; i++) {
                const y = centerY + (i * (radius / (latLines / 2))) * 0.85
                const ringR = Math.sqrt(Math.max(0, radius * radius - Math.pow(y - centerY, 2)))
                if (ringR > 0) {
                    ctx.beginPath()
                    ctx.ellipse(centerX, y, ringR, ringR * 0.3, 0, 0, Math.PI * 2)
                    ctx.stroke()
                }
            }

            // Longitude 3D meridian arcs
            for (let i = 0; i < lonLines; i++) {
                const angle = (i * (Math.PI / lonLines)) + rotY
                const rx = radius * Math.cos(angle)
                ctx.beginPath()
                ctx.ellipse(centerX, centerY, Math.abs(rx), radius, 0, 0, Math.PI * 2)
                ctx.stroke()
            }
            ctx.restore()

            // 3. Doppler Radar Radar Sweep Line
            ctx.save()
            ctx.strokeStyle = selectedNode.color
            ctx.lineWidth = 2
            ctx.shadowBlur = 15
            ctx.shadowColor = selectedNode.color
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.lineTo(
                centerX + Math.cos(sweepAngle) * (radius + 15),
                centerY + Math.sin(sweepAngle) * (radius + 15)
            )
            ctx.stroke()

            // Radar sweep sector fill
            ctx.fillStyle = `${selectedNode.color}15`
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.arc(centerX, centerY, radius + 15, sweepAngle - 0.4, sweepAngle)
            ctx.closePath()
            ctx.fill()
            ctx.restore()

            // 4. Kinetic Atmospheric Wind Particles Stream
            windParticles.forEach(p => {
                p.x += p.speed * (selectedNode.wind / 10)
                if (p.x > width) p.x = 0

                ctx.save()
                ctx.globalAlpha = p.alpha
                ctx.fillStyle = selectedNode.color
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()
            })

            // 5. Pulsing Active Substation Node Targets
            SUBSTATION_NODES.forEach((node, idx) => {
                const angle = (idx * (Math.PI * 2 / SUBSTATION_NODES.length)) + rotY
                const nx = centerX + Math.cos(angle) * (radius * 0.75)
                const ny = centerY + Math.sin(angle) * (radius * 0.45)
                const isSelected = selectedNode.city === node.city

                ctx.save()
                ctx.fillStyle = node.color
                ctx.shadowBlur = isSelected ? 20 : 8
                ctx.shadowColor = node.color

                ctx.beginPath()
                ctx.arc(nx, ny, isSelected ? 6 : 3.5, 0, Math.PI * 2)
                ctx.fill()

                if (isSelected) {
                    ctx.strokeStyle = '#ffffff'
                    ctx.lineWidth = 1.5
                    ctx.beginPath()
                    ctx.arc(nx, ny, 10, 0, Math.PI * 2)
                    ctx.stroke()
                }
                ctx.restore()
            })

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [selectedNode])

    return (
        <div style={{
            position: 'relative',
            background: 'linear-gradient(145deg, rgba(10, 16, 32, 0.95), rgba(5, 8, 16, 0.98))',
            border: `1px solid ${selectedNode.color}50`,
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: `0 15px 40px rgba(0,0,0,0.6), 0 0 30px ${selectedNode.color}20`,
            backdropFilter: 'blur(20px)',
            overflow: 'hidden'
        }}>
            {/* Header Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: `1px solid ${selectedNode.color}30`, paddingBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${selectedNode.color}20`, border: `1px solid ${selectedNode.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: selectedNode.color }}>
                        <Globe size={18} style={{ animation: 'spin 12s linear infinite' }} />
                    </div>
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 900, color: '#fff', letterSpacing: '0.08em' }}>
                            HOLOGRAPHIC SUBSTATION RADAR & WEATHER TELEMETRY
                        </div>
                        <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                            REAL-TIME SATELLITE DER MONITORING // E.ON DSO NETWORK
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleDetectLocation}
                    disabled={isDetecting}
                    style={{
                        background: isDetecting ? 'rgba(255,255,255,0.05)' : `${selectedNode.color}20`,
                        border: `1px solid ${selectedNode.color}60`,
                        color: selectedNode.color,
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 900,
                        padding: '0.35rem 0.85rem',
                        borderRadius: 'var(--radius-full)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        boxShadow: `0 0 15px ${selectedNode.color}30`,
                        transition: 'all 0.25s ease'
                    }}
                >
                    <Navigation size={12} /> {isDetecting ? 'SCANNING GPS...' : 'LIVE LOCATION GPS'}
                </button>
            </div>

            {/* Substation Nodes Interactive Hologram Switcher */}
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1.25rem', scrollbarWidth: 'none' }}>
                {SUBSTATION_NODES.map((node) => {
                    const isSelected = selectedNode.city === node.city
                    return (
                        <button
                            key={node.id}
                            onClick={() => setSelectedNode(node)}
                            style={{
                                background: isSelected ? `${node.color}25` : 'rgba(15, 23, 42, 0.7)',
                                border: `1px solid ${isSelected ? node.color : 'rgba(255,255,255,0.1)'}`,
                                color: isSelected ? '#fff' : 'var(--text-secondary)',
                                padding: '0.4rem 0.85rem',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.68rem',
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 800,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.25s ease',
                                boxShadow: isSelected ? `0 0 15px ${node.color}30` : 'none'
                            }}
                        >
                            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: node.color, marginRight: '0.4rem' }}></span>
                            {node.city.split(' ')[0]}
                        </button>
                    )
                })}
            </div>

            {/* 3D Holographic Canvas + Holographic Weather HUD Display */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 1fr) 1.4fr', gap: '1.5rem', alignItems: 'center' }}>
                
                {/* 3D Radar Globe Canvas Container */}
                <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: `1px solid ${selectedNode.color}30`, background: '#020612' }}>
                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
                    <div style={{ position: 'absolute', bottom: '0.5rem', left: '0.75rem', fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: selectedNode.color, fontWeight: 800 }}>
                        ● 3D SATELLITE RADAR ORBIT
                    </div>
                </div>

                {/* Dynamic Telemetry HUD Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    
                    <motion.div
                        key={selectedNode.city + 'temp'}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                            background: 'rgba(5, 10, 20, 0.85)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            border: `1px solid ${selectedNode.color}40`,
                            position: 'relative'
                        }}
                    >
                        <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <CloudSun size={14} style={{ color: selectedNode.color }} /> AMBIENT TEMP
                        </div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#fff', marginTop: '0.3rem' }}>
                            {selectedNode.temp}°C
                        </div>
                        <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                            THERMAL NOMINAL
                        </div>
                    </motion.div>

                    <motion.div
                        key={selectedNode.city + 'solar'}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                            background: 'rgba(5, 10, 20, 0.85)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid rgba(255, 209, 102, 0.4)',
                            position: 'relative'
                        }}
                    >
                        <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Sun size={14} style={{ color: 'var(--yellow)' }} /> SOLAR IRRADIANCE
                        </div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--yellow)', marginTop: '0.3rem' }}>
                            {selectedNode.solar} <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>W/m²</span>
                        </div>
                        <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--green)', marginTop: '0.2rem' }}>
                            DER HIGH BACKFEED
                        </div>
                    </motion.div>

                    <motion.div
                        key={selectedNode.city + 'wind'}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                            background: 'rgba(5, 10, 20, 0.85)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid rgba(0, 255, 136, 0.4)',
                            position: 'relative'
                        }}
                    >
                        <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Wind size={14} style={{ color: 'var(--green)' }} /> WIND VELOCITY
                        </div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--green)', marginTop: '0.3rem' }}>
                            {selectedNode.wind} <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>km/h</span>
                        </div>
                        <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                            WIND VECTOR NOMINAL
                        </div>
                    </motion.div>

                    <motion.div
                        key={selectedNode.city + 'risk'}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                            background: 'rgba(5, 10, 20, 0.85)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            border: `1px solid ${selectedNode.color}40`,
                            position: 'relative'
                        }}
                    >
                        <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <ShieldCheck size={14} style={{ color: selectedNode.color }} /> CYBER WEATHER IMPACT
                        </div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: selectedNode.color, marginTop: '0.35rem' }}>
                            {selectedNode.risk}
                        </div>
                        <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--green)', marginTop: '0.2rem' }}>
                            NO VOLTAGE SPIKE
                        </div>
                    </motion.div>

                </div>

            </div>

            {/* Substation Footer Info */}
            <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: `1px solid ${selectedNode.color}25`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                <span>SELECTED NODE: <strong style={{ color: '#fff' }}>{selectedNode.city}</strong></span>
                <span style={{ color: selectedNode.color, fontWeight: 800 }}>GRID STATUS: {selectedNode.status}</span>
            </div>
        </div>
    )
}
