import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import PurpleTeam from './pages/PurpleTeam'
import AssetShield from './pages/AssetShield'
import GlobalDefense from './pages/GlobalDefense'
import Architecture from './pages/Architecture'
import Impact from './pages/Impact'
import CyberAssistantChatbot from './components/CyberAssistantChatbot'

function App() {
    return (
        <Router>
            <CyberAssistantChatbot />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/purple-team" element={<PurpleTeam />} />
                    <Route path="/asset-shield" element={<AssetShield />} />
                    <Route path="/global-defense" element={<GlobalDefense />} />
                    <Route path="/architecture" element={<Architecture />} />
                    <Route path="/impact" element={<Impact />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    )
}

export default App
