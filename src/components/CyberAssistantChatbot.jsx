import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Bot, X, Send, Sparkles, Terminal, Shield, Cpu, Globe,
    Zap, Activity, CheckCircle2, ChevronRight, HelpCircle, RefreshCw
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CyberAssistantChatbot() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [inputQuery, setInputQuery] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const chatEndRef = useRef(null)

    // Knowledge base for GridShield AI SOC Chatbot
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: 'Welcome to GridShield SOC Operations Center. I am your autonomous AI Cyber Security Assistant. How can I assist your grid evaluation today?',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestions: [
                'System Status & 9.6M Nodes',
                'GraphSAGE GNN Blast Radius',
                'Edge TinyML Privacy Guarantee',
                'Cluster 5 Incentive Model',
                'Global Market Scalability'
            ]
        }
    ])

    const quickAnswers = {
        'System Status & 9.6M Nodes': {
            text: 'GridShield AI currently monitors 9,600,000 decentralized customer DER assets (solar inverters, EV chargers, home batteries, SCADA gateways). 99.2% of raw telemetry is evaluated on-device within 1.14ms.',
            route: '/dashboard',
            routeLabel: 'Open Security Dashboard'
        },
        'GraphSAGE GNN Blast Radius': {
            text: 'Our PyTorch GraphSAGE engine executes 2-hop neighborhood graph sampling (K=2, S1=25, S2=10) on target subgraphs in <140ms on an NVIDIA T4 GPU, pinpointing multi-substation attack propagation before power outages occur.',
            route: '/dashboard',
            routeLabel: 'Inspect Blast Radius Graph'
        },
        'Edge TinyML Privacy Guarantee': {
            text: 'GridShield AI guarantees 100% GDPR zero-telemetry leak compliance. TinyML C++ neural weights execute locally on ARM Cortex-M4 microcontrollers (<800KB footprint). Only anomalous embeddings (risk score > 35) trigger upstream cloud alerts.',
            route: '/asset-shield',
            routeLabel: 'View Asset Shield'
        },
        'Cluster 5 Incentive Model': {
            text: 'The Cluster 5 Incentive Framework drives 90%+ customer enrollment via a 4-pillar model: (1) Dynamic Grid Tariff Discounts, (2) Up to 25% Cyber Insurance Rebates, (3) Free Firmware Updates, and (4) Priority DSO Grid Restoral SLAs.',
            route: '/asset-shield',
            routeLabel: 'Explore Cluster 5 Incentives'
        },
        'Global Market Scalability': {
            text: 'While optimized for EU NIS2 Article 21, GridShield AI transfers directly to non-EU markets: US NERC-CIP-003/005/012 & FERC Order 2222, Australian AEMO VPP solar backfeed, and ASEAN offline islanded microgrids.',
            route: '/global-defense',
            routeLabel: 'Open Global Defense Matrix'
        }
    }

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        if (isOpen) scrollToBottom()
    }, [messages, isOpen])

    const handleSendMessage = (textToSend) => {
        const query = textToSend || inputQuery
        if (!query.trim()) return

        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: query,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        setMessages(prev => [...prev, userMsg])
        if (!textToSend) setInputQuery('')
        setIsTyping(true)

        setTimeout(() => {
            let botReplyText = "GridShield AI SOC Assistant has logged your query. Our autonomous Purple Team engines monitor 9.6M nodes in real-time."
            let matchedRoute = null
            let matchedRouteLabel = null

            // Match query with knowledge base
            for (const [key, answer] of Object.entries(quickAnswers)) {
                if (query.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(query.toLowerCase())) {
                    botReplyText = answer.text
                    matchedRoute = answer.route
                    matchedRouteLabel = answer.routeLabel
                    break
                }
            }

            if (!matchedRoute) {
                if (query.toLowerCase().includes('attack') || query.toLowerCase().includes('red team') || query.toLowerCase().includes('simulate')) {
                    botReplyText = "Our Autonomous Red Team AI simulates 50+ MITRE ATT&CK adversary vectors against SCADA and OCPP EV gateways in real-time."
                    matchedRoute = '/purple-team'
                    matchedRouteLabel = 'Launch Red Team Simulation'
                } else if (query.toLowerCase().includes('tco') || query.toLowerCase().includes('cost') || query.toLowerCase().includes('price')) {
                    botReplyText = "GridShield AI achieves an itemized TCO baseline target of €0.80 per device per year at 500k scale, delivering a 5.6x ROI compared to legacy SIEM solutions."
                    matchedRoute = '/impact'
                    matchedRouteLabel = 'Inspect TCO Breakdown'
                }
            }

            const botMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: botReplyText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                route: matchedRoute,
                routeLabel: matchedRouteLabel,
                suggestions: [
                    'System Status & 9.6M Nodes',
                    'GraphSAGE GNN Blast Radius',
                    'Edge TinyML Privacy Guarantee'
                ]
            }

            setMessages(prev => [...prev, botMsg])
            setIsTyping(false)
        }, 650)
    }

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
            {/* Floating Chat Trigger Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    style={{
                        padding: '0.85rem 1.4rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'linear-gradient(135deg, var(--cyan), #00a8ff)',
                        color: '#000',
                        border: 'none',
                        fontWeight: 900,
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-mono)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        boxShadow: '0 0 30px rgba(0, 212, 255, 0.5), 0 10px 25px rgba(0,0,0,0.5)',
                        cursor: 'pointer'
                    }}
                >
                    <Bot size={20} />
                    <span>CYBER SOC ASSISTANT</span>
                    <span style={{
                        width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)',
                        boxShadow: '0 0 8px var(--green)', animation: 'pulse 1.5s infinite'
                    }}></span>
                </motion.button>
            )}

            {/* Interactive Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            width: '380px',
                            maxHeight: '560px',
                            height: '80vh',
                            background: 'linear-gradient(145deg, rgba(10, 16, 32, 0.96), rgba(5, 8, 16, 0.98))',
                            border: '1px solid rgba(0, 212, 255, 0.4)',
                            borderRadius: 'var(--radius-xl)',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0, 212, 255, 0.2)',
                            backdropFilter: 'blur(20px)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Header Bar */}
                        <div style={{
                            padding: '1rem 1.25rem',
                            background: 'rgba(15, 23, 42, 0.9)',
                            borderBottom: '1px solid rgba(0, 212, 255, 0.25)',
                            display: 'flex',
                            justify: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '8px',
                                    background: 'rgba(0, 212, 255, 0.15)', border: '1px solid rgba(0, 212, 255, 0.4)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)'
                                }}>
                                    <Bot size={18} />
                                </div>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 900, color: '#fff' }}>
                                        GRIDSHIELD SOC AI
                                    </div>
                                    <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }}></span>
                                        ONLINE // 9.6M ASSETS ACTIVE
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Container */}
                        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    style={{
                                        alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '85%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start'
                                    }}
                                >
                                    <div style={{
                                        background: m.sender === 'user' ? 'linear-gradient(135deg, var(--cyan), #0088ff)' : 'rgba(15, 23, 42, 0.85)',
                                        color: m.sender === 'user' ? '#000' : '#F0EDE8',
                                        border: m.sender === 'user' ? 'none' : '1px solid rgba(0, 212, 255, 0.25)',
                                        padding: '0.75rem 0.95rem',
                                        borderRadius: m.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                        fontSize: '0.78rem',
                                        lineHeight: 1.5,
                                        fontWeight: m.sender === 'user' ? 700 : 400
                                    }}>
                                        {m.text}

                                        {/* Direct Route Action Link if available */}
                                        {m.route && (
                                            <div style={{ marginTop: '0.65rem', paddingTop: '0.5rem', borderTop: '1px dashed rgba(0, 212, 255, 0.3)' }}>
                                                <button
                                                    onClick={() => {
                                                        navigate(m.route)
                                                        setIsOpen(false)
                                                    }}
                                                    style={{
                                                        background: 'rgba(0, 212, 255, 0.15)',
                                                        border: '1px solid rgba(0, 212, 255, 0.4)',
                                                        color: 'var(--cyan)',
                                                        padding: '0.35rem 0.65rem',
                                                        borderRadius: 'var(--radius-sm)',
                                                        fontSize: '0.68rem',
                                                        fontFamily: 'var(--font-mono)',
                                                        fontWeight: 800,
                                                        cursor: 'pointer',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '0.35rem'
                                                    }}
                                                >
                                                    {m.routeLabel} <ChevronRight size={12} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <span style={{ fontSize: '0.55rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '0.2rem', padding: '0 0.2rem' }}>
                                        {m.timestamp}
                                    </span>

                                    {/* Suggestion Quick Chips */}
                                    {m.suggestions && m.suggestions.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.5rem' }}>
                                            {m.suggestions.map((sug, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleSendMessage(sug)}
                                                    style={{
                                                        background: 'rgba(0, 212, 255, 0.08)',
                                                        border: '1px solid rgba(0, 212, 255, 0.25)',
                                                        color: 'var(--cyan)',
                                                        padding: '0.25rem 0.55rem',
                                                        borderRadius: 'var(--radius-full)',
                                                        fontSize: '0.64rem',
                                                        fontFamily: 'var(--font-mono)',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    {sug}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div style={{ alignSelf: 'flex-start', background: 'rgba(15, 23, 42, 0.85)', padding: '0.6rem 0.9rem', borderRadius: '16px', border: '1px solid rgba(0, 212, 255, 0.25)', fontSize: '0.72rem', color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>
                                    <span className="pulse-icon">●</span> GridShield AI thinking...
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Form */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSendMessage()
                            }}
                            style={{
                                padding: '0.75rem',
                                background: 'rgba(10, 15, 30, 0.95)',
                                borderTop: '1px solid rgba(0, 212, 255, 0.25)',
                                display: 'flex',
                                gap: '0.5rem'
                            }}
                        >
                            <input
                                type="text"
                                value={inputQuery}
                                onChange={(e) => setInputQuery(e.target.value)}
                                placeholder="Ask GridShield SOC Assistant..."
                                style={{
                                    flex: 1,
                                    background: 'rgba(5, 10, 20, 0.8)',
                                    border: '1px solid rgba(0, 212, 255, 0.3)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: '0.55rem 0.85rem',
                                    color: '#fff',
                                    fontSize: '0.78rem',
                                    fontFamily: 'var(--font-sans)',
                                    outline: 'none'
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    background: 'linear-gradient(135deg, var(--cyan), #00a8ff)',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    width: '38px',
                                    height: '38px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#000',
                                    cursor: 'pointer'
                                }}
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
