import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const MATRIX_GLYPHS = '01#$%&<>[]{}/*+=?!#@ABCDEFGHJKLMNOPQRSTUVWXYZ'

export default function CyberHeroHeading({ text = "GRIDSHIELD", activeTheme }) {
    const containerRef = useRef(null)
    const [displayText, setDisplayText] = useState([])
    const [isDecoded, setIsDecoded] = useState(false)
    const [glitchActive, setGlitchActive] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 1. Hacker Decode-In Entrance Animation (< 1.2s)
    useEffect(() => {
        if (prefersReducedMotion) {
            setDisplayText(text.split(''))
            setIsDecoded(true)
            return
        }

        const targetChars = text.split('')
        let iterations = 0
        const maxIterations = targetChars.length * 3

        const interval = setInterval(() => {
            setDisplayText(
                targetChars.map((char, index) => {
                    if (char === ' ') return ' '
                    if (index < Math.floor(iterations / 3)) return char
                    return MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)]
                })
            )

            iterations++
            if (iterations >= maxIterations) {
                clearInterval(interval)
                setDisplayText(targetChars)
                setIsDecoded(true)
            }
        }, 35)

        return () => clearInterval(interval)
    }, [text, prefersReducedMotion])

    // 2. Continuous Chromatic Aberration Flicker Every 3.5 Seconds
    useEffect(() => {
        if (!isDecoded || prefersReducedMotion) return

        const glitchInterval = setInterval(() => {
            setGlitchActive(true)
            setTimeout(() => setGlitchActive(false), 120)
        }, 3500)

        return () => clearInterval(glitchInterval)
    }, [isDecoded, prefersReducedMotion])

    // 3. Mouse Tracking for Radial Spotlight & 3D Parallax Tilt
    const handleMouseMove = (e) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
    }

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            style={{
                position: 'relative',
                display: 'inline-block',
                maxWidth: '100%',
                marginBottom: '1.25rem',
                cursor: 'crosshair',
                userSelect: 'none'
            }}
        >
            {/* Soft Radial Spotlight Behind Text */}
            <div style={{
                position: 'absolute',
                top: mousePos.y - 100,
                left: mousePos.x - 100,
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${activeTheme.primary}45 0%, rgba(255, 0, 85, 0.15) 50%, transparent 80%)`,
                pointerEvents: 'none',
                filter: 'blur(20px)',
                transition: 'top 0.1s ease-out, left 0.1s ease-out',
                zIndex: 0
            }} />

            {/* CRT Scanline Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
                backgroundSize: '100% 4px',
                pointerEvents: 'none',
                zIndex: 2,
                opacity: 0.35
            }} />

            {/* Main Animated Headline Container */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'flex-start',
                position: 'relative',
                zIndex: 1,
                perspective: '1000px',
                maxWidth: '100%',
                flexWrap: 'nowrap'
            }}>
                {/* Left Bracket Accent */}
                <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
                    fontWeight: 900,
                    color: activeTheme.primary,
                    marginRight: '0.2rem',
                    textShadow: `0 0 20px ${activeTheme.primary}`,
                    opacity: 0.85
                }}>
                    [
                </span>

                {/* Glitch & Characters Container */}
                <h1
                    style={{
                        margin: 0,
                        fontSize: 'clamp(2.0rem, 4.2vw, 3.8rem)',
                        fontWeight: 900,
                        lineHeight: 0.95,
                        letterSpacing: '-0.03em',
                        textTransform: 'uppercase',
                        color: '#ffffff',
                        fontFamily: 'var(--font-mono)',
                        textShadow: glitchActive
                            ? `-3px 0 #ff0055, 3px 0 #00d4ff, 0 0 35px ${activeTheme.primary}`
                            : `0 0 30px ${activeTheme.primary}, 0 0 10px rgba(255,255,255,0.8)`,
                        display: 'flex',
                        gap: '0.02em',
                        transition: 'text-shadow 0.1s ease',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {displayText.map((char, i) => (
                        <motion.span
                            key={i}
                            whileHover={{ scale: 1.12, y: -3 }}
                            style={{
                                display: 'inline-block',
                                transformStyle: 'preserve-3d',
                                textShadow: char === ' ' ? 'none' : `0 0 25px ${activeTheme.primary}`
                            }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </h1>

                {/* Right Bracket Accent */}
                <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
                    fontWeight: 900,
                    color: activeTheme.primary,
                    marginLeft: '0.2rem',
                    textShadow: `0 0 20px ${activeTheme.primary}`,
                    opacity: 0.85
                }}>
                    ]
                </span>
            </div>

            {/* Pulsing Gradient Underline Bar */}
            <div style={{
                height: '3px',
                width: '100%',
                marginTop: '0.5rem',
                background: `linear-gradient(90deg, transparent 0%, ${activeTheme.primary} 30%, #ff0055 70%, transparent 100%)`,
                borderRadius: '2px',
                boxShadow: `0 0 15px ${activeTheme.primary}`,
                animation: 'pulse 2s infinite ease-in-out'
            }} />
        </div>
    )
}
