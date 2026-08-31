import React from 'react'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('GridShield UI Error Boundary caught an error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh',
                    background: '#050811',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <div style={{
                        maxWidth: '560px',
                        background: 'rgba(15, 23, 42, 0.95)',
                        border: '1px solid rgba(0, 212, 255, 0.4)',
                        borderRadius: '16px',
                        padding: '2.5rem',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 40px rgba(0,212,255,0.15)'
                    }}>
                        <div style={{
                            fontSize: '2rem',
                            marginBottom: '1rem',
                            color: '#00d4ff'
                        }}>⚡</div>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                            GridShield AI Recovery Mode
                        </h2>
                        <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                            The application encountered a client-side render event. Click below to reload and initialize the zero-trust SOC engine.
                        </p>
                        <button
                            onClick={() => {
                                this.setState({ hasError: false })
                                window.location.href = '/'
                            }}
                            style={{
                                background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                                color: '#000',
                                border: 'none',
                                padding: '0.75rem 1.75rem',
                                borderRadius: '9999px',
                                fontWeight: 800,
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                letterSpacing: '0.05em'
                            }}
                        >
                            RELOAD GRIDSHIELD SOC ↗
                        </button>
                    </div>
                </div>
            )
        }
        return this.props.children
    }
}
