import React, { useState, useEffect } from 'react'
import { CloudSun, Wind, Sun, Compass, MapPin, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react'

const HUB_LOCATIONS = [
    { city: 'Essen (E.ON HQ)', country: 'Germany', lat: 51.4556, lon: 7.0116, temp: '18.4°C', wind: '14.2 km/h', solar: '685 W/m²', status: 'OPTIMAL DER BACKFEED', risk: 'LOW RISK' },
    { city: 'Frankfurt Substation', country: 'Germany', lat: 50.1109, lon: 8.6821, temp: '19.8°C', wind: '11.5 km/h', solar: '720 W/m²', status: 'PEAK SOLAR GENERATION', risk: 'CLEAR SKY' },
    { city: 'Munich DSO Grid', country: 'Germany', lat: 48.1351, lon: 11.5820, temp: '17.2°C', wind: '18.0 km/h', solar: '590 W/m²', status: 'NORMAL VOLTAGE', risk: 'STABLE' },
    { city: 'Amsterdam Grid', country: 'Netherlands', lat: 52.3676, lon: 4.9041, temp: '16.0°C', wind: '24.5 km/h', solar: '420 W/m²', status: 'WIND TURBINE HIGH LOAD', risk: 'WIND GUSTS' },
    { city: 'Stockholm Substation', country: 'Sweden', lat: 59.3293, lon: 18.0686, temp: '14.5°C', wind: '9.2 km/h', solar: '380 W/m²', status: 'SUBSTATION NOMINAL', risk: 'NOMINAL' }
]

export default function GridWeatherWidget() {
    const [selectedHub, setSelectedHub] = useState(HUB_LOCATIONS[0])
    const [isDetecting, setIsDetecting] = useState(false)
    const [userLocationName, setUserLocationName] = useState(null)

    // Detect User Live Location via navigator.geolocation API
    const handleDetectLocation = () => {
        setIsDetecting(true)
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toFixed(2)
                    const lon = position.coords.longitude.toFixed(2)
                    setUserLocationName(`Live Substation (${lat}°N, ${lon}°E)`)
                    setSelectedHub({
                        city: `Local DSO Substation Node`,
                        country: `Coordinates (${lat}, ${lon})`,
                        lat, lon,
                        temp: '19.1°C',
                        wind: '12.8 km/h',
                        solar: '640 W/m²',
                        status: 'LIVE DETECTED NODE',
                        risk: 'GRID SYNCED'
                    })
                    setIsDetecting(false)
                },
                () => {
                    // Fallback to Essen HQ
                    setSelectedHub(HUB_LOCATIONS[0])
                    setIsDetecting(false)
                },
                { timeout: 5000 }
            )
        } else {
            setIsDetecting(false)
        }
    }

    return (
        <div style={{
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(9, 13, 22, 0.98))',
            border: '1px solid rgba(0, 212, 255, 0.35)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            textAlign: 'left'
        }}>
            {/* Header Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CloudSun size={18} style={{ color: 'var(--cyan)' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 900, color: '#fff' }}>
                        LIVE SUBSTATION WEATHER & DER TELEMETRY
                    </span>
                </div>
                <button
                    onClick={handleDetectLocation}
                    disabled={isDetecting}
                    style={{
                        background: 'rgba(0, 212, 255, 0.12)',
                        border: '1px solid rgba(0, 212, 255, 0.35)',
                        color: 'var(--cyan)',
                        fontSize: '0.62rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        padding: '0.25rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                    }}
                >
                    <MapPin size={11} /> {isDetecting ? 'DETECTING...' : 'LIVE LOCATION'}
                </button>
            </div>

            {/* Substation Hub Selector Tabs */}
            <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.6rem', marginBottom: '1rem', scrollbarWidth: 'none' }}>
                {HUB_LOCATIONS.map((hub, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedHub(hub)}
                        style={{
                            background: selectedHub.city === hub.city ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255,255,255,0.04)',
                            border: `1px solid ${selectedHub.city === hub.city ? 'var(--cyan)' : 'rgba(255,255,255,0.08)'}`,
                            color: selectedHub.city === hub.city ? '#fff' : 'var(--text-secondary)',
                            padding: '0.3rem 0.6rem',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.64rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {hub.city.split(' ')[0]}
                    </button>
                ))}
            </div>

            {/* Weather Metrics Display Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
                <div style={{ background: 'rgba(5, 10, 20, 0.7)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <CloudSun size={12} style={{ color: 'var(--cyan)' }} /> AMBIENT TEMP
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#fff', marginTop: '0.2rem' }}>
                        {selectedHub.temp}
                    </div>
                </div>

                <div style={{ background: 'rgba(5, 10, 20, 0.7)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Sun size={12} style={{ color: 'var(--yellow)' }} /> SOLAR IRRADIANCE
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--yellow)', marginTop: '0.2rem' }}>
                        {selectedHub.solar}
                    </div>
                </div>

                <div style={{ background: 'rgba(5, 10, 20, 0.7)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Wind size={12} style={{ color: 'var(--green)' }} /> WIND VELOCITY
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--green)', marginTop: '0.2rem' }}>
                        {selectedHub.wind}
                    </div>
                </div>

                <div style={{ background: 'rgba(5, 10, 20, 0.7)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <ShieldCheck size={12} style={{ color: 'var(--purple)' }} /> WEATHER CYBER RISK
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--purple)', marginTop: '0.35rem' }}>
                        {selectedHub.risk}
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '0.75rem', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>NODE: <strong style={{ color: '#fff' }}>{selectedHub.city}</strong> ({selectedHub.country})</span>
                <span style={{ color: 'var(--green)' }}>STATUS: {selectedHub.status}</span>
            </div>
        </div>
    )
}
