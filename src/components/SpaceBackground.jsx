import React, { useEffect, useRef } from 'react'

export default function SpaceBackground() {
    const canvasRef = useRef(null)

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

        // Create 150 cosmic space stars
        const stars = Array.from({ length: 150 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.6 + 0.4,
            alpha: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.02 + 0.005,
            color: ['#00d4ff', '#a855f7', '#00ff88', '#ffffff', '#ff9f43'][Math.floor(Math.random() * 5)],
        }))

        // Create 3 shooting stars
        const shootingStars = Array.from({ length: 3 }, () => ({
            x: Math.random() * width,
            y: Math.random() * (height * 0.5),
            length: Math.random() * 80 + 40,
            speed: Math.random() * 6 + 4,
            opacity: 0,
            delay: Math.random() * 300,
        }))

        let tick = 0

        const render = () => {
            tick++
            ctx.clearRect(0, 0, width, height)

            // Ambient cosmic space nebula gradient glow
            const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 0, width * 0.2, height * 0.3, width * 0.5)
            grad1.addColorStop(0, 'rgba(0, 212, 255, 0.06)')
            grad1.addColorStop(1, 'transparent')
            ctx.fillStyle = grad1
            ctx.fillRect(0, 0, width, height)

            const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 0, width * 0.8, height * 0.7, width * 0.5)
            grad2.addColorStop(0, 'rgba(168, 85, 247, 0.05)')
            grad2.addColorStop(1, 'transparent')
            ctx.fillStyle = grad2
            ctx.fillRect(0, 0, width, height)

            // Draw & pulse space stars
            stars.forEach(s => {
                s.alpha += Math.sin(tick * s.speed) * 0.01
                const clampedAlpha = Math.max(0.1, Math.min(0.9, s.alpha))

                ctx.beginPath()
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
                ctx.fillStyle = s.color
                ctx.globalAlpha = clampedAlpha
                ctx.shadowBlur = 8
                ctx.shadowColor = s.color
                ctx.fill()
            })
            ctx.globalAlpha = 1.0
            ctx.shadowBlur = 0

            // Draw shooting stars
            shootingStars.forEach(ss => {
                if (tick > ss.delay) {
                    ctx.beginPath()
                    const tailX = ss.x - ss.length
                    const tailY = ss.y - (ss.length * 0.5)
                    const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY)
                    grad.addColorStop(0, '#00d4ff')
                    grad.addColorStop(1, 'transparent')

                    ctx.strokeStyle = grad
                    ctx.lineWidth = 1.8
                    ctx.moveTo(ss.x, ss.y)
                    ctx.lineTo(tailX, tailY)
                    ctx.stroke()

                    ss.x += ss.speed
                    ss.y += ss.speed * 0.5

                    if (ss.x > width + 100 || ss.y > height + 100) {
                        ss.x = Math.random() * width * 0.5
                        ss.y = 0
                        ss.delay = tick + Math.random() * 200 + 100
                    }
                }
            })

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener('resize', handleResize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    )
}
