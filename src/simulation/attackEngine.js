// GridShield AI — Attack Simulation Engine
// Generates realistic cybersecurity attack/defense simulation data

const ATTACK_TYPES = [
    {
        id: 'sql_injection',
        name: 'SQL Injection',
        icon: 'Syringe',
        category: 'Web Application',
        mitre: 'T1190',
        cve: 'SIM-2026-4421',
        description: 'Exploit database query vulnerabilities in SCADA web interfaces',
        severity: 'critical',
        cvss: 9.8,
        targets: ['SCADA Web Portal', 'Asset Management DB', 'Billing System'],
    },
    {
        id: 'phishing',
        name: 'Spear Phishing',
        icon: 'Fish',
        category: 'Social Engineering',
        mitre: 'T1566',
        cve: 'SIM-2026-3455',
        description: 'Targeted phishing against grid operator employees',
        severity: 'high',
        cvss: 7.5,
        targets: ['Employee Workstation', 'VPN Gateway', 'Email Server'],
    },
    {
        id: 'network_intrusion',
        name: 'Network Intrusion',
        icon: 'Unplug',
        category: 'Network',
        mitre: 'T1071',
        cve: 'SIM-2026-3876',
        description: 'Lateral movement through OT/IT network boundaries',
        severity: 'critical',
        cvss: 9.1,
        targets: ['DMZ Firewall', 'OT Network Bridge', 'RTU Controllers'],
    },
    {
        id: 'firmware_exploit',
        name: 'Firmware Exploit',
        icon: 'Cpu',
        category: 'Hardware/Firmware',
        mitre: 'T1542',
        cve: 'SIM-2026-6230',
        description: 'Compromise smart grid device firmware for persistent access',
        severity: 'critical',
        cvss: 9.4,
        targets: ['Smart Meter Gateway', 'IED Controllers', 'PLC Firmware'],
    },
    {
        id: 'ransomware',
        name: 'Ransomware',
        icon: 'Lock',
        category: 'Malware',
        mitre: 'T1486',
        cve: 'SIM-2026-2941',
        description: 'Encrypt critical grid management systems for extortion',
        severity: 'critical',
        cvss: 9.6,
        targets: ['DMS Server', 'SCADA Historian', 'Backup Systems'],
    },
    {
        id: 'mitm',
        name: 'Man-in-the-Middle',
        icon: 'ScanEye',
        category: 'Network',
        mitre: 'T1557',
        cve: 'SIM-2026-1854',
        description: 'Intercept and modify grid control communications',
        severity: 'high',
        cvss: 8.2,
        targets: ['IEC 61850 MMS', 'DNP3 Communications', 'Modbus TCP'],
    },
];

const DEFENSE_ACTIONS = [
    'Intrusion Detection System triggered alert',
    'Firewall rule updated to block suspicious IP range',
    'Network segmentation reinforced at OT/IT boundary',
    'Compromised credentials rotated and sessions invalidated',
    'Honeypot deployed to capture attacker TTPs',
    'SIEM correlation rule activated for lateral movement detection',
    'Endpoint Detection and Response quarantined affected host',
    'Certificate-based authentication enforced on critical systems',
    'Network traffic analysis identified C2 communication pattern',
    'Automated patch deployment initiated for CVE remediation',
    'Zero-trust policy enforced for SCADA access',
    'Backup integrity verification completed successfully',
];

const VULNERABILITY_DB = [
    { id: 'SIM-2026-4421', name: 'SCADA HMI Buffer Overflow', severity: 'critical', cvss: 9.8, system: 'Generic SCADA HMI Core', status: 'patched', remediation: 'Applied firmware update v3.4.2' },
    { id: 'SIM-2026-3876', name: 'RTU Authentication Bypass', severity: 'critical', cvss: 9.1, system: 'Standard RTU Gateway v5', status: 'mitigated', remediation: 'Network isolation + monitoring' },
    { id: 'SIM-2026-2941', name: 'DNP3 Protocol Stack DoS', severity: 'high', cvss: 7.8, system: 'OpenDNP3 Protocol Library', status: 'patched', remediation: 'Upgraded to OpenDNP3 v3.1.1' },
    { id: 'SIM-2026-5102', name: 'Smart Meter Key Extraction', severity: 'high', cvss: 8.4, system: 'Smart Meter Gateway Unit', status: 'investigating', remediation: 'Key rotation scheduled' },
    { id: 'SIM-2026-1854', name: 'OPC UA Session Hijack', severity: 'medium', cvss: 6.5, system: 'OPC UA Server SDK', status: 'patched', remediation: 'TLS 1.3 enforcement' },
    { id: 'SIM-2026-6230', name: 'EV Charger Firmware RCE', severity: 'critical', cvss: 9.6, system: 'OCPP EV Charging Station Hub', status: 'investigating', remediation: 'Firmware audit in progress' },
    { id: 'SIM-2026-2087', name: 'Inverter Modbus Write', severity: 'high', cvss: 7.9, system: 'Commercial Solar Inverter MCU', status: 'mitigated', remediation: 'Read-only mode enforced' },
    { id: 'SIM-2026-3455', name: 'HEMS API Token Leak', severity: 'medium', cvss: 5.9, system: 'Home Energy Controller System', status: 'patched', remediation: 'OAuth2 token rotation' },
];

function generateTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateAttackEvent(attackType) {
    const attack = ATTACK_TYPES.find(a => a.id === attackType) || randomChoice(ATTACK_TYPES);
    const target = randomChoice(attack.targets);

    return {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: generateTimestamp(),
        attack,
        target,
        phase: randomChoice(['reconnaissance', 'weaponization', 'delivery', 'exploitation', 'installation', 'command_control', 'actions']),
        status: 'active',
    };
}

function generateDefenseResponse(attackEvent) {
    const actions = [];
    const numActions = 2 + Math.floor(Math.random() * 3);
    const usedActions = new Set();

    for (let i = 0; i < numActions; i++) {
        let action;
        do {
            action = randomChoice(DEFENSE_ACTIONS);
        } while (usedActions.has(action));
        usedActions.add(action);

        actions.push({
            timestamp: generateTimestamp(),
            action,
            status: Math.random() > 0.15 ? 'success' : 'pending',
        });
    }

    return {
        attackId: attackEvent.id,
        detectionTime: (0.5 + Math.random() * 2.5).toFixed(1) + 's',
        responseTime: (1 + Math.random() * 5).toFixed(1) + 's',
        actions,
        blocked: Math.random() > 0.1,
        confidence: (85 + Math.random() * 14).toFixed(1),
    };
}

function generateLiveAttackFeed(count = 10) {
    const events = [];
    const types = ['sql_injection', 'phishing', 'network_intrusion', 'firmware_exploit', 'ransomware', 'mitm'];

    for (let i = 0; i < count; i++) {
        const type = randomChoice(types);
        const event = generateAttackEvent(type);
        event.status = randomChoice(['blocked', 'blocked', 'blocked', 'detected', 'investigating']);
        events.push(event);
    }

    return events;
}

function generateAttackFrequencyData() {
    const labels = [];
    const redData = [];
    const blueData = [];

    for (let i = 23; i >= 0; i--) {
        const h = new Date();
        h.setHours(h.getHours() - i);
        labels.push(h.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false }) + ':00');
        redData.push(Math.floor(Math.random() * 15) + 2);
        blueData.push(Math.floor(Math.random() * 12) + 5);
    }

    return { labels, redData, blueData };
}

function generateVulnerabilityCategories() {
    return {
        labels: ['Network', 'Application', 'Firmware', 'Protocol', 'Authentication', 'Configuration'],
        data: [24, 18, 15, 12, 9, 7],
    };
}

function generateThreatVectors() {
    return {
        labels: ['Phishing', 'Network Scan', 'Brute Force', 'Exploit Kit', 'Supply Chain', 'Insider'],
        data: [32, 28, 19, 15, 8, 5],
    };
}

export {
    ATTACK_TYPES,
    DEFENSE_ACTIONS,
    VULNERABILITY_DB,
    generateAttackEvent,
    generateDefenseResponse,
    generateLiveAttackFeed,
    generateAttackFrequencyData,
    generateVulnerabilityCategories,
    generateThreatVectors,
    generateTimestamp,
    randomChoice,
};
