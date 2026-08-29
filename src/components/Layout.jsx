import React, { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard, Shield, Swords, Cpu, TrendingUp,
    Search, Bell, Lock, Globe, Terminal, Activity,
    Download, AlertTriangle, CheckCircle2, ChevronDown,
    Zap, Radio, Server, RefreshCw, X, ShieldAlert, Command,
    ChevronLeft, ChevronRight, Sparkles, FileText
} from 'lucide-react'
import SpaceBackground from './SpaceBackground'

const navItems = [
    { section: 'Operations' },
    { path: '/dashboard', label: 'Security Dashboard', icon: LayoutDashboard, badge: 'LIVE', badgeType: 'live' },
    { path: '/purple-team', label: 'Purple Team Agent', icon: Swords, badge: 'AI 2.0', badgeType: 'alert' },
    { section: 'Protection' },
    { path: '/asset-shield', label: 'Asset Shield', icon: Shield, badge: '9.6M', badgeType: 'cyan' },
    { section: 'Strategy' },
    { path: '/global-defense', label: 'Global Defense & Q&A', icon: Globe, badge: 'V2.0', badgeType: 'live' },
    { path: '/architecture', label: 'Architecture', icon: Cpu, badge: 'NIS2', badgeType: 'nis2' },
    { path: '/impact', label: 'Impact & TCO', icon: TrendingUp, badge: 'TCO v2', badgeType: 'tco' },
]

export default function Layout() {
    const location = useLocation()
    const navigate = useNavigate()

    // State for interactive header & sidebar features
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date().toUTCString().slice(17, 25) + ' UTC')
    const [defconLevel, setDefconLevel] = useState(3)
    const [selectedRegion, setSelectedRegion] = useState('DE-BAYERN-DSO (E.ON DE)')
    const [isRegionOpen, setIsRegionOpen] = useState(false)
    const [isNotifOpen, setIsNotifOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isLockdown, setIsLockdown] = useState(false)
    const [mode, setMode] = useState('AUTO') // AUTO | RED | SOC
    const [notifCount, setNotifCount] = useState(3)

    // Simulated notifications list
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'critical', title: 'MITM Attempt Blocked', target: 'Substation DE-BAY-409', time: '2m ago' },
        { id: 2, type: 'warning', title: 'Firmware Hash Mismatch', target: 'EV Charger #84920', time: '5m ago' },
        { id: 3, type: 'info', title: 'NIS2 Compliance Audit', target: 'Self-check passed 99.4%', time: '12m ago' },
    ])

    // Update real-time UTC clock
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toUTCString().slice(17, 25) + ' UTC')
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    // Keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                setIsSearchOpen(prev => !prev)
            }
            if (e.key === 'Escape') {
                setIsSearchOpen(false)
                setIsNotifOpen(false)
                setIsRegionOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Export SOC Audit Log JSON
    const handleExportLog = () => {
        const auditData = {
            system: 'GridShield AI Purple Team SOC Platform',
            timestamp: new Date().toISOString(),
            defcon: defconLevel,
            region: selectedRegion,
            operator: 'Agent #8492 — Level 4 Clearance',
            status: 'ALL_SYSTEMS_MONITORED',
            metrics: {
                totalAssets: 9600000,
                uptime: '99.97%',
                medianResponseTime: '1.83s',
                p95ResponseTime: '4.1s',
                nis2Compliance: '100%'
            },
            recentIncidents: notifications
        }
        const blob = new Blob([JSON.stringify(auditData, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `gridshield-soc-audit-${Date.now()}.json`
        a.click()
        URL.revokeObjectURL(url)
    }

    // Dismiss notification
    const dismissNotif = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
        setNotifCount(prev => Math.max(0, prev - 1))
    }

    // Get active page name for breadcrumb
    const getPageTitle = () => {
        const found = navItems.find(item => item.path === location.pathname)
        return found ? found.label.toUpperCase() : 'SECURITY OPERATIONS CENTER'
    }

    return (
        <div className="app-layout">
            <SpaceBackground />
            {/* Top Enterprise Command Bar */}
            <header className={`top-command-bar ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="top-bar-left">
                    <button
                        className="top-icon-btn"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                        style={{ marginRight: '0.5rem', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: 'var(--cyan)' }}
                    >
                        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>

                    <div className="breadcrumb-box">
                        <Terminal size={14} style={{ color: 'var(--cyan)' }} />
                        <span className="bc-root">SOC OPS</span>
                        <span className="bc-sep">//</span>
                        <span className="bc-current">{getPageTitle()}</span>
                    </div>

                    {/* Live Ticker Marquee */}
                    <div className="live-ticker-container">
                        <span className="ticker-badge"><Radio size={10} className="pulse-icon" /> LIVE FEED</span>
                        <div className="ticker-marquee">
                            <span>[09:58:12 UTC] MITM threat mitigated on Gateway DE-BAY-409 &nbsp;•&nbsp; [09:57:44 UTC] Firmware integrity verified across 2.4M EV Chargers &nbsp;•&nbsp; [09:56:10 UTC] NIS2 Technical Measure compliance at 99.4% &nbsp;•&nbsp; [09:55:01 UTC] Purple Team ML model retrained (v4.2.8)</span>
                        </div>
                    </div>
                </div>

                <div className="top-bar-right">
                    {/* Command Search Trigger */}
                    <button className="top-search-trigger" onClick={() => setIsSearchOpen(true)}>
                        <Search size={14} />
                        <span>Search Assets, CVEs...</span>
                        <kbd className="cmd-kbd"><Command size={10} />K</kbd>
                    </button>

                    {/* Region Selector */}
                    <div className="dropdown-wrapper">
                        <button className="top-pill-btn" onClick={() => setIsRegionOpen(!isRegionOpen)}>
                            <Globe size={13} style={{ color: 'var(--cyan)' }} />
                            <span>{selectedRegion.split(' ')[0]}</span>
                            <ChevronDown size={12} />
                        </button>

                        {isRegionOpen && (
                            <div className="dropdown-menu">
                                {[
                                    'DE-BAYERN-DSO (E.ON DE)',
                                    'NL-ESSENT-DSO (E.ON NL)',
                                    'SE-EON-ENERGIDISTRIBUTION (SE)',
                                    'PAN-EUROPEAN GRID (ALL DSOs)'
                                ].map((reg, idx) => (
                                    <div
                                        key={idx}
                                        className={`dropdown-item ${selectedRegion === reg ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedRegion(reg)
                                            setIsRegionOpen(false)
                                        }}
                                    >
                                        <Globe size={12} /> {reg}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* DEFCON Level Badge */}
                    <div className="defcon-badge">
                        <span className="defcon-dot"></span>
                        <span className="defcon-text">DEFCON {defconLevel}</span>
                    </div>

                    {/* Live Clock */}
                    <div className="top-clock">
                        <Activity size={12} style={{ color: 'var(--green)' }} />
                        <span>{currentTime}</span>
                    </div>

                    {/* Notifications Dropdown */}
                    <div className="dropdown-wrapper">
                        <button className="top-icon-btn" onClick={() => setIsNotifOpen(!isNotifOpen)}>
                            <Bell size={15} />
                            {notifCount > 0 && <span className="notif-badge">{notifCount}</span>}
                        </button>

                        {isNotifOpen && (
                            <div className="notif-popover">
                                <div className="notif-popover-header">
                                    <h4><ShieldAlert size={14} style={{ color: 'var(--cyan)' }} /> Live Security Alerts ({notifCount})</h4>
                                    <button onClick={() => setNotifications([])} className="clear-btn">Clear All</button>
                                </div>
                                <div className="notif-list">
                                    {notifications.length === 0 ? (
                                        <div className="notif-empty">No active security alerts</div>
                                    ) : (
                                        notifications.map(n => (
                                            <div key={n.id} className={`notif-item ${n.type}`}>
                                                <div className="notif-main">
                                                    <div className="notif-title">{n.title}</div>
                                                    <div className="notif-target">{n.target}</div>
                                                </div>
                                                <div className="notif-right">
                                                    <span className="notif-time">{n.time}</span>
                                                    <button onClick={() => dismissNotif(n.id)} className="dismiss-btn"><X size={12} /></button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Emergency Lockdown Toggle */}
                    <button
                        className={`lockdown-btn ${isLockdown ? 'active' : ''}`}
                        onClick={() => setIsLockdown(!isLockdown)}
                        title="Emergency Grid Containment Lockdown"
                    >
                        <Lock size={13} />
                        <span>{isLockdown ? 'LOCKDOWN ACTIVE' : 'LOCKDOWN'}</span>
                    </button>

                    {/* Export Audit Log */}
                    <button className="top-icon-btn" onClick={handleExportLog} title="Export SOC Audit Report JSON">
                        <Download size={14} />
                    </button>

                    {/* Download Zero to Hero PDF Report */}
                    <a
                        href="/GridShield_AI_Zero_to_Hero_Report.pdf"
                        download="GridShield_AI_Zero_to_Hero_Report.pdf"
                        className="top-icon-btn"
                        title="Download Zero to Hero Project PDF Report"
                        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <FileText size={14} style={{ color: 'var(--cyan)' }} />
                    </a>

                    {/* Operator Profile Clearance */}
                    <div className="user-profile-badge">
                        <div className="user-avatar">AG</div>
                        <div className="user-info">
                            <span className="user-name">Agent #8492</span>
                            <span className="user-role">CLEARANCE L4</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Emergency Lockdown Banner if active */}
            {isLockdown && (
                <div className="lockdown-banner">
                    <AlertTriangle size={18} />
                    <span>EMERGENCY PROTOCOL ACTIVE — ALL GRID GATEWAYS OPERATING IN AIR-GAPPED ZERO-TRUST CONTAINMENT</span>
                    <button onClick={() => setIsLockdown(false)}>DISENGAGE</button>
                </div>
            )}

            {/* Ultra-Advanced Movable/Collapsible Sidebar */}
            <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                {/* Shield Logo with Orbit Animation */}
                <NavLink to="/" className="sidebar-logo" style={{ textDecoration: 'none' }}>
                    <div className="logo-icon-wrapper" style={{ width: '48px', height: '48px' }}>
                        <div className="logo-orbit-ring"></div>
                        <div className="logo-icon-inner" style={{ background: 'transparent', padding: '0px', boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)', borderRadius: '10px', overflow: 'hidden' }}>
                            <img src="/gridshield_cyber_logo.png" alt="GridShield AI" style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover', display: 'block' }} />
                        </div>
                    </div>
                    <div className="logo-text">
                        <h1>GridShield</h1>
                        <span>PURPLE TEAM SOC v4.2</span>
                    </div>
                </NavLink>

                {/* Operating Mode Selector */}
                <div className="mode-selector">
                    <div className="mode-selector-label">DEFENSE ENGINE MODE</div>
                    <div className="mode-btn-group">
                        <button className={`mode-btn ${mode === 'AUTO' ? 'active green' : ''}`} onClick={() => setMode('AUTO')}>
                            <Shield size={11} /> AUTO
                        </button>
                        <button className={`mode-btn ${mode === 'RED' ? 'active red' : ''}`} onClick={() => setMode('RED')}>
                            <Swords size={11} /> SIMULATE
                        </button>
                        <button className={`mode-btn ${mode === 'SOC' ? 'active cyan' : ''}`} onClick={() => setMode('SOC')}>
                            <Server size={11} /> MANUAL
                        </button>
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="sidebar-nav">
                    {navItems.map((item, i) => {
                        if (item.section) {
                            return <div key={i} className="sidebar-section-label">{item.section}</div>
                        }
                        const Icon = item.icon
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            >
                                <Icon className="nav-icon" size={18} />
                                <span>{item.label}</span>
                                {item.badge && (
                                    <span className={`nav-badge ${item.badgeType || ''}`}>{item.badge}</span>
                                )}
                            </NavLink>
                        )
                    })}
                </nav>

                {/* Live Telemetry Mini Widget inside Sidebar */}
                <div className="sidebar-telemetry">
                    <div className="telemetry-header">SOC ENGINE TELEMETRY</div>
                    <div className="telemetry-row">
                        <span>CPU UTILIZATION</span>
                        <span className="mono-val">14.2%</span>
                    </div>
                    <div className="telemetry-bar"><div className="telemetry-fill cyan" style={{ width: '14.2%' }}></div></div>

                    <div className="telemetry-row" style={{ marginTop: '0.4rem' }}>
                        <span>NET STREAM</span>
                        <span className="mono-val">4.2 Gbps</span>
                    </div>
                    <div className="telemetry-bar"><div className="telemetry-fill green" style={{ width: '65%' }}></div></div>

                    <div className="telemetry-row" style={{ marginTop: '0.4rem' }}>
                        <span>SHIELD EFFECTIVENESS</span>
                        <span className="mono-val">99.7%</span>
                    </div>
                    <div className="telemetry-bar"><div className="telemetry-fill purple" style={{ width: '99.7%' }}></div></div>
                </div>

                {/* Sidebar Footer Status */}
                <div className="sidebar-footer">
                    <div className="sidebar-status">
                        <div className="status-dot"></div>
                        <div className="status-details">
                            <div className="status-main">DE-FRA-01 // AGENT ACTIVE</div>
                            <div className="status-sub">Latency: 1.83s | Uptime: 99.97%</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
                <Outlet />
            </main>

            {/* Interactive Command Palette Modal (Ctrl + K) */}
            {isSearchOpen && (
                <div className="command-palette-backdrop" onClick={() => setIsSearchOpen(false)}>
                    <div className="command-palette-modal" onClick={e => e.stopPropagation()}>
                        <div className="palette-header">
                            <Search size={18} style={{ color: 'var(--cyan)' }} />
                            <input
                                type="text"
                                placeholder="Type a command, search pages, assets, or CVEs..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            <kbd className="close-kbd">ESC</kbd>
                        </div>
                        <div className="palette-results">
                            <div className="palette-group-title">QUICK NAVIGATION</div>
                            {[
                                { title: 'Security Dashboard', path: '/dashboard', desc: 'Live SOC view & threat metrics' },
                                { title: 'Purple Team Agent', path: '/purple-team', desc: 'Red & Blue Team attack simulator' },
                                { title: 'Asset Shield', path: '/asset-shield', desc: '9.6M customer DER fleet monitor' },
                                { title: 'Solution Architecture', path: '/architecture', desc: '4-layer OT defense & compliance' },
                                { title: 'Impact & TCO Calculator', path: '/impact', desc: 'Interactive ROI & cost business case' },
                            ]
                                .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="palette-item"
                                        onClick={() => {
                                            navigate(item.path)
                                            setIsSearchOpen(false)
                                        }}
                                    >
                                        <div className="palette-item-title">{item.title}</div>
                                        <div className="palette-item-desc">{item.desc}</div>
                                    </div>
                                ))}

                            <div className="palette-group-title" style={{ marginTop: '1rem' }}>ACTIONS</div>
                            <div className="palette-item" onClick={() => { handleExportLog(); setIsSearchOpen(false) }}>
                                <Download size={14} style={{ color: 'var(--green)' }} /> Export SOC Audit Log JSON
                            </div>
                            <div className="palette-item" onClick={() => { setIsLockdown(!isLockdown); setIsSearchOpen(false) }}>
                                <AlertTriangle size={14} style={{ color: 'var(--red)' }} /> Toggle Emergency Grid Lockdown
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
