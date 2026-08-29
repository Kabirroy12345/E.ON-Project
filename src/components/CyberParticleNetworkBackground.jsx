import React, { useEffect, useRef } from 'react'

export default function CyberParticleNetworkBackground() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId

        let width = (canvas.width = canvas.parentElement.clientWidth || 800)
        let height = (canvas.height = canvas.parentElement.clientHeight || 400)

        let mouseX = -1000
        let mouseY = -1000

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouseX = e.clientX - rect.left
            mouseY = e.clientY - rect.top
        }

        const handleMouseLeave = () => {
            mouseX = -1000
            mouseY = -1000
        }

        const handleResize = () => {
            if (!canvas.parentElement) return
            width = canvas.width = canvas.parentElement.clientWidth || 800
            height = canvas.height = canvas.parentElement.clientHeight || 400
            initParticles()
        }

        window.addEventListener('resize', handleResize)
        const parentElem = canvas.parentElement
        if (parentElem) {
            parentElem.addEventListener('mousemove', handleMouseMove)
            parentElem.addEventListener('mouseleave', handleMouseLeave)
        }

        // Particle configuration
        let particles = []
        let pulses = []
        const particleCount = Math.min(110, Math.max(50, Math.floor(width / 10)))

        function initParticles() {
            particles = []
            for (let i = 0; i < particleCount; i++) {
                // Bias Y position towards lower half (denser near bottom edge)
                const biasY = Math.pow(Math.random(), 0.7) * height
                particles.push({
                    x: Math.random() * width,
                    y: biasY,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 2.2 + 1.2,
                    color: Math.random() > 0.35 ? '#00d4ff' : (Math.random() > 0.5 ? '#ff0055' : '#a855f7'),
                    pulseRate: Math.random() * 0.05 + 0.01,
                    alpha: Math.random() * 0.6 + 0.3
                })
            }
        }

        initParticles()

        // Spawn periodic data pulses moving along connections
        let pulseTimer = 0

        const render = () => {
            ctx.clearRect(0, 0, width, height)

            // 1. Perspective Grid Lines (Converging toward horizon point)
            ctx.save()
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.08)'
            ctx.lineWidth = 1
            const horizonY = height * 0.2
            const vanishingX = width / 2

            // Perspective perspective lines
            for (let x = -width; x <= width * 2; x += 60) {
                ctx.beginPath()
                ctx.moveTo(vanishingX, horizonY)
                ctx.lineTo(x, height)
                ctx.stroke()
            }

            // Horizontal grid lines
            for (let y = horizonY; y <= height; y += (y - horizonY) * 0.2 + 8) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(width, y)
                ctx.stroke()
            }
            ctx.restore()

            // 2. Mouse Glow Radius
            if (mouseX > 0 && mouseY > 0) {
                ctx.save()
                const mGlow = ctx.createRadialGradient(mouseX, mouseY, 5, mouseX, mouseY, 140)
                mGlow.addColorStop(0, 'rgba(0, 212, 255, 0.15)')
                mGlow.addColorStop(0.6, 'rgba(255, 0, 85, 0.05)')
                mGlow.addColorStop(1, 'transparent')
                ctx.fillStyle = mGlow
                ctx.beginPath()
                ctx.arc(mouseX, mouseY, 140, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()
            }

            // 3. Update & Draw Particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]

                p.x += p.vx
                p.y += p.vy

                // Bounce off canvas boundaries
                if (p.x < 0 || p.x > width) p.vx *= -1
                if (p.y < height * 0.1 || p.y > height) p.vy *= -1

                // Mouse interaction force (push away or pull)
                if (mouseX > 0 && mouseY > 0) {
                    const dx = mouseX - p.x
                    const dy = mouseY - p.y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 120) {
                        const force = (120 - dist) / 120
                        p.x -= (dx / dist) * force * 1.5
                        p.y -= (dy / dist) * force * 1.5
                    }
                }

                // Draw Particle Node
                ctx.save()
                ctx.fillStyle = p.color
                ctx.shadowBlur = 10
                ctx.shadowColor = p.color
                ctx.globalAlpha = p.alpha
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()

                // Draw Neural Connection Lines
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < 110) {
                        const opacity = (1 - dist / 110) * 0.35
                        ctx.save()
                        ctx.strokeStyle = p.color === '#ff0055' || p2.color === '#ff0055' ? '#ff0055' : '#00d4ff'
                        ctx.globalAlpha = opacity
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                        ctx.restore()

                        // Randomly spawn data pulse
                        if (Math.random() < 0.0008 && pulses.length < 15) {
                            pulses.push({
                                x1: p.x, y1: p.y,
                                x2: p2.x, y2: p2.y,
                                progress: 0,
                                speed: 0.03,
                                color: p.color
                            })
                        }
                    }
                }
            }

            // 4. Update & Draw Data Pulses
            for (let k = pulses.length - 1; k >= 0; k--) {
                const pulse = pulses[k]
                pulse.progress += pulse.speed

                if (pulse.progress >= 1) {
                    pulses.splice(k, 1)
                    continue
                }

                const px = pulse.x1 + (pulse.x2 - pulse.x1) * pulse.progress
                const py = pulse.y1 + (pulse.y2 - pulse.y1) * pulse.progress

                ctx.save()
                ctx.fillStyle = '#ffffff'
                ctx.shadowBlur = 12
                ctx.shadowColor = pulse.color
                ctx.beginPath()
                ctx.arc(px, py, 2.5, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()
            }

            animId = requestAnimationFrame(render)
        }

        render()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', handleResize)
            if (parentElem) {
                parentElem.removeEventListener('mousemove', handleMouseMove)
                parentElem.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                borderRadius: 'var(--radius-xl)'
            }}
        />
    )
}
