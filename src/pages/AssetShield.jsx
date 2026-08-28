import React, { useState, useMemo, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, PointElement, LineElement,
    Title, Tooltip, Legend, Filler
} from 'chart.js'
import {
    Shield, AlertTriangle, Zap, Battery, Home, Sun,
    Thermometer, Plug, TrendingUp, Award, Heart, Lock,
    Radio, Link as LinkIcon, Building2, Coins, BarChart3
} from 'lucide-react'
import {
    ASSET_TYPES,
    generateNormalBehavior,
    generateAnomalousBehavior,
    generateFleetAnomalyScore,
    generateTimeLabels,
} from '../simulation/assetMonitor'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } } },
        tooltip: {
            backgroundColor: '#0f1429',
            borderColor: 'rgba(0,212,255,0.3)',
            borderWidth: 1,
            titleColor: '#e2e8f0',
            bodyColor: '#94a3b8',
        },
    },
    scales: {
        x: { ticks: { color: '#64748b', font: { size: 9 }, maxTicksLimit: 12 }, grid: { color: 'rgba(100,116,139,0.1)' } },
        y: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { color: 'rgba(100,116,139,0.1)' } },
    },
}

const ASSET_ICONS = {
    ev_charger: <Plug size={28} />,
    heat_pump: <Thermometer size={28} />,
    solar_inverter: <Sun size={28} />,
    home_battery: <Battery size={28} />,
    hems: <Home size={28} />,
}

const INCENTIVES = [
    {
        icon: <Coins size={24} />,
        title: '4–8% Dynamic Grid Tariff Discount',
        description: 'DSOs offer direct monthly bill credits for enrolling DER assets (EV chargers, heat pumps) in the GridShield edge telemetry network.',
        badge: 'DIRECT BILL REBATE',
        color: 'var(--green)'
    },
    {
        icon: <Award size={24} />,
        title: 'Up to 25% Cyber Insurance Discount',
        description: 'Partner underwriters (Allianz, AXA) grant certified premium discounts for assets running verified GridShield zero-trust firmware.',
        badge: 'UNDERWRITER CERTIFIED',
        color: 'var(--cyan)'
    },
    {
        icon: <Lock size={24} />,
        title: '100% Zero-Privacy Exposure Guarantee',
        description: 'Federated TinyML runs locally on device MCUs — household usage data never leaves the home, satisfying strict GDPR privacy demands.',
        badge: 'GDPR PRIVACY SAFE',
        color: 'var(--purple)'
    },
    {
        icon: <Shield size={24} />,
        title: 'Hardware Exploitation Warranty',
        description: 'DSOs provide full zero-cost replacement coverage for any DER device damaged by grid frequency surges or rogue firmware exploits.',
        badge: 'ASSET GUARANTEE',
        color: 'var(--orange)'
    },
]

export default function AssetShield() {
    const [selectedAsset, setSelectedAsset] = useState('ev_charger')
    const [showAttack, setShowAttack] = useState(false)
    const [anomalyScore, setAnomalyScore] = useState(12)

    const timeLabels = useMemo(() => generateTimeLabels(), [])
    const normalData = useMemo(() => generateNormalBehavior(selectedAsset), [selectedAsset])
    const anomalousData = useMemo(() => generateAnomalousBehavior(normalData), [normalData])
    const anomalyScores = useMemo(() => generateFleetAnomalyScore(), [])

    useEffect(() => {
        if (showAttack) {
            const interval = setInterval(() => {
                setAnomalyScore(prev => {
                    const target = 72 + Math.random() * 20
                    return prev + (target - prev) * 0.1
                })
            }, 1000)
            return () => clearInterval(interval)
        } else {
            setAnomalyScore(12)
        }
    }, [showAttack])

    const behaviorChart = {
        labels: timeLabels,
        datasets: [
            {
                label: 'Normal Behavior',
                data: normalData,
                borderColor: '#00ff88',
                backgroundColor: 'rgba(0,255,136,0.05)',
                fill: true,
                tension: 0.3,
                pointRadius: 0,
                borderWidth: 1.5,
            },
            ...(showAttack ? [{
                label: 'Under Attack',
                data: anomalousData,
                borderColor: '#ff3366',
                backgroundColor: 'rgba(255,51,102,0.1)',
                fill: true,
                tension: 0.3,
                pointRadius: 0,
                borderWidth: 2,
                borderDash: [5, 3],
            }] : []),
        ],
    }

    const anomalyChart = {
        labels: timeLabels,
        datasets: [{
            label: 'Fleet Anomaly Score',
            data: showAttack ? anomalyScores : anomalyScores.map(() => 5 + Math.random() * 8),
            borderColor: showAttack ? '#ff3366' : '#00d4ff',
            backgroundColor: showAttack ? 'rgba(255,51,102,0.1)' : 'rgba(0,212,255,0.05)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2,
        }],
    }

    const selectedType = ASSET_TYPES.find(a => a.id === selectedAsset)

    return (
        <div>
            <div className="page-header">
                <h1>Asset <span className="accent">Shield</span></h1>
                <p>Protection framework for customer-based energy assets against coordinated attacks (Cluster 5)</p>
            </div>

            {/* Asset Inventory */}
            <div className="glass-card mb-3">
                <div className="card-header">
                    <h3><Shield size={16} style={{ color: 'var(--cyan)' }} /> Customer Asset Inventory — Risk Assessment</h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {ASSET_TYPES.reduce((sum, a) => sum + a.count, 0).toLocaleString()} total devices
                    </span>
                </div>
                <div className="card-body">
                    <div className="asset-grid">
                        {ASSET_TYPES.map(asset => (
                            <div
                                key={asset.id}
                                className={`asset-card ${selectedAsset === asset.id ? 'selected' : ''}`}
                                onClick={() => setSelectedAsset(asset.id)}
                                style={{
                                    cursor: 'pointer',
                                    borderColor: selectedAsset === asset.id ? asset.color : 'var(--glass-border)',
                                    boxShadow: selectedAsset === asset.id ? `0 0 20px ${asset.color}22` : 'none',
                                }}
                            >
                                <div className="asset-icon" style={{ color: asset.color }}>
                                    {ASSET_ICONS[asset.id]}
                                </div>
                                <h4>{asset.name}</h4>
                                <div className="asset-count">{(asset.count).toLocaleString()} units · {asset.ratedPower}</div>

                                {/* Protocol Tech Badges */}
                                <div className="protocol-chip-group" style={{ marginTop: '0.5rem', marginBottom: '0.6rem' }}>
                                    {asset.protocols.slice(0, 2).map((p, idx) => (
                                        <span key={idx} className="tech-logo-badge cyan" style={{ fontSize: '0.58rem', padding: '0.15rem 0.4rem' }}>
                                            {p}
                                        </span>
                                    ))}
                                </div>

                                <div className="risk-indicator">
                                    <span style={{ color: asset.riskScore > 70 ? 'var(--red)' : asset.riskScore > 50 ? 'var(--orange)' : 'var(--green)', fontFamily: 'var(--font-mono)' }}>
                                        {asset.riskScore}
                                    </span>
                                    <div className="risk-bar">
                                        <div className="risk-fill" style={{
                                            width: `${asset.riskScore}%`,
                                            background: asset.riskScore > 70 ? 'var(--red)' : asset.riskScore > 50 ? 'var(--orange)' : 'var(--green)',
                                        }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Selected Asset Details + Attack Sim */}
            <div className="grid-2 mb-3">
                <div className="glass-card">
                    <div className="card-header">
                        <h3><AlertTriangle size={16} style={{ color: selectedType?.color }} /> {selectedType?.name} — Vulnerabilities</h3>
                    </div>
                    <div className="card-body">
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>COMMUNICATION PROTOCOLS</div>
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                {selectedType?.protocols.map(p => (
                                    <span key={p} className="arch-comp">{p}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>KNOWN VULNERABILITIES</div>
                            {selectedType?.vulnerabilities.map((v, i) => (
                                <div key={i} style={{
                                    padding: '0.5rem 0.75rem',
                                    borderLeft: '3px solid var(--red)',
                                    marginBottom: '0.5rem',
                                    background: 'var(--red-dim)',
                                    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                                    fontSize: '0.78rem',
                                    color: 'var(--text-secondary)',
                                }}>
                                    {v}
                                </div>
                            ))}
                        </div>
                        <button
                            className={`btn ${showAttack ? 'btn-secondary' : 'btn-danger'}`}
                            onClick={() => setShowAttack(!showAttack)}
                            style={{ marginTop: '1rem' }}
                        >
                            <Zap size={14} />
                            {showAttack ? 'Stop Attack Simulation' : 'Simulate Coordinated Attack'}
                        </button>
                    </div>
                </div>

                <div className="glass-card">
                    <div className="card-header">
                        <h3><TrendingUp size={16} style={{ color: showAttack ? 'var(--red)' : 'var(--green)' }} /> Fleet Anomaly Score</h3>
                        {showAttack && <span className="tag red" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><AlertTriangle size={12} /> ATTACK DETECTED</span>}
                    </div>
                    <div className="card-body">
                        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                            <div style={{
                                fontSize: '3rem', fontWeight: 900, fontFamily: 'var(--font-mono)',
                                color: anomalyScore > 50 ? 'var(--red)' : anomalyScore > 25 ? 'var(--orange)' : 'var(--green)',
                                transition: 'color 0.5s',
                            }}>
                                {Math.round(anomalyScore)}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                {anomalyScore > 50 ? 'CRITICAL — Coordinated attack in progress' : anomalyScore > 25 ? 'ELEVATED — Monitoring' : 'NOMINAL — Normal operations'}
                            </div>
                        </div>
                        <div style={{ height: 150 }}>
                            <Line data={anomalyChart} options={{
                                ...chartOptions,
                                plugins: { ...chartOptions.plugins, legend: { display: false } },
                            }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Behavior Chart */}
            <div className="glass-card mb-3">
                <div className="card-header">
                    <h3><Zap size={16} style={{ color: 'var(--green)' }} /> {selectedType?.name} — Power Behavior Pattern (24h)</h3>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.72rem' }}>
                        <span style={{ color: 'var(--green)' }}>● Normal</span>
                        {showAttack && <span style={{ color: 'var(--red)' }}>● Under Attack</span>}
                    </div>
                </div>
                <div className="card-body">
                    <div style={{ height: 250 }}>
                        <Line data={behaviorChart} options={chartOptions} />
                    </div>
                    {showAttack && (
                        <div style={{
                            marginTop: '1rem', padding: '0.75rem 1rem',
                            background: 'var(--red-dim)',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            fontSize: '0.78rem', color: 'var(--red)',
                            border: '1px solid rgba(255,51,102,0.3)',
                        }}>
                            <AlertTriangle size={16} />
                            <span>
                                <strong>DDoS-style grid attack detected:</strong> {(selectedType?.count * 0.03).toLocaleString()} compromised {selectedType?.name}s
                                simultaneously changing load pattern. Estimated grid impact: {((selectedType?.ratedPowerKw * selectedType?.count * 0.03) / 1000).toFixed(0)} MW swing.
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* DSO Integration */}
            <div className="glass-card mb-3">
                <div className="card-header">
                    <h3><Lock size={16} style={{ color: 'var(--purple)' }} /> DSO Integration — Response Architecture</h3>
                </div>
                <div className="card-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
                        {[
                            { label: 'Edge Agent', desc: 'On-device anomaly detection', color: 'var(--green)', icon: <Radio size={24} /> },
                            { label: 'Aggregator Gateway', desc: 'Fleet behavior correlation', color: 'var(--cyan)', icon: <LinkIcon size={24} /> },
                            { label: 'GridShield SOC', desc: 'Central threat analysis', color: 'var(--purple)', icon: <Building2 size={24} /> },
                            { label: 'DSO Control Center', desc: 'Grid protection actions', color: 'var(--red)', icon: <Zap size={24} /> },
                        ].map((layer, i) => (
                            <div key={i}>
                                <div className="icon-container" style={{
                                    width: 56, height: 56, borderRadius: 'var(--radius-lg)',
                                    background: `${layer.color}15`, border: `1px solid ${layer.color}33`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: layer.color, margin: '0 auto 0.75rem',
                                }}>
                                    {layer.icon}
                                </div>
                                <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-bright)', marginBottom: '0.2rem' }}>
                                    {layer.label}
                                </h4>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{layer.desc}</p>
                                {i < 3 && (
                                    <div style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '1rem' }}>→</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Customer Incentives & Adoption Framework — Cluster 5 Scored Criterion */}
            <div className="glass-card mb-3" style={{ border: '1px solid rgba(0, 255, 136, 0.4)', boxShadow: '0 0 30px rgba(0, 255, 136, 0.08)' }}>
                <div className="card-header">
                    <h3><Award size={16} style={{ color: 'var(--green)' }} /> Cluster 5 — Customer Adoption & Incentive Framework</h3>
                    <span className="tag green">E.ON Key Requirement</span>
                </div>
                <div className="card-body">
                    {/* Visual Banner */}
                    <div style={{
                        width: '100%',
                        height: '190px',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        marginBottom: '1.25rem',
                        border: '1px solid rgba(0, 255, 136, 0.3)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
                        position: 'relative'
                    }}>
                        <img
                            src="/frameworks/customer_incentives.png"
                            alt="Customer Adoption Incentives"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to right, rgba(9, 13, 22, 0.92) 35%, transparent 90%)',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 2rem'
                        }}>
                            <div>
                                <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--green)', letterSpacing: '0.12em' }}>
                                    CUSTOMER ADOPTION STRATEGY // CLUSTER 5
                                </span>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem', marginBottom: '0.4rem' }}>
                                    How DSOs Convince Asset Owners to Enroll
                                </h3>
                                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.5 }}>
                                    A win-win techno-economic model pairing direct tariff rebates, cyber insurance discounts, and zero-privacy federated edge AI to drive 90%+ customer opt-in rates.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="incentive-grid">
                        {INCENTIVES.map((incentive, i) => (
                            <div key={i} className="incentive-card" style={{
                                background: 'linear-gradient(145deg, rgba(15, 20, 41, 0.95), rgba(10, 14, 26, 0.9))',
                                border: `1px solid ${incentive.color}30`,
                                borderRadius: 'var(--radius-lg)',
                                padding: '1.25rem',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                        <div className="incentive-icon" style={{ color: incentive.color, background: `${incentive.color}15`, padding: '0.4rem', borderRadius: '8px' }}>
                                            {incentive.icon}
                                        </div>
                                        <span style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: incentive.color, background: `${incentive.color}15`, padding: '0.15rem 0.45rem', borderRadius: '4px', border: `1px solid ${incentive.color}30` }}>
                                            {incentive.badge}
                                        </span>
                                    </div>
                                    <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-bright)', marginBottom: '0.35rem' }}>{incentive.title}</h4>
                                    <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{incentive.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
