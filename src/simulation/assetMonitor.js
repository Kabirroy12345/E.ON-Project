// GridShield AI — Customer Asset Monitor Simulation
// Simulates behavior of customer-based energy assets and coordinated attack detection

const ASSET_TYPES = [
    {
        id: 'ev_charger',
        name: 'EV Charger',
        icon: 'Plug',
        ratedPower: '11-22 kW',
        ratedPowerKw: 22,
        count: 2400000,
        riskScore: 78,
        riskLevel: 'high',
        protocols: ['OCPP 1.6/2.0', 'ISO 15118'],
        vulnerabilities: ['Firmware update over HTTP', 'Default credentials', 'No mutual TLS'],
        color: '#ff3366',
    },
    {
        id: 'heat_pump',
        name: 'Heat Pump',
        icon: 'Thermometer',
        ratedPower: '3-12 kW',
        ratedPowerKw: 12,
        count: 1800000,
        riskScore: 65,
        riskLevel: 'medium',
        protocols: ['SG Ready', 'EEBUS', 'Modbus TCP'],
        vulnerabilities: ['Unencrypted control signals', 'No authentication on Modbus'],
        color: '#ff9f43',
    },
    {
        id: 'solar_inverter',
        name: 'Solar Inverter',
        icon: 'Sun',
        ratedPower: '3-15 kW',
        ratedPowerKw: 15,
        count: 3200000,
        riskScore: 72,
        riskLevel: 'high',
        protocols: ['SunSpec Modbus', 'IEEE 2030.5'],
        vulnerabilities: ['Remote shutdown via unauth API', 'Weak key storage', 'Legacy firmware'],
        color: '#fbbf24',
    },
    {
        id: 'home_battery',
        name: 'Home Battery',
        icon: 'Battery',
        ratedPower: '3-10 kW',
        ratedPowerKw: 10,
        count: 1000000,
        riskScore: 58,
        riskLevel: 'medium',
        protocols: ['CAN Bus', 'REST API', 'MQTT'],
        vulnerabilities: ['Insecure MQTT broker', 'BMS bypass vulnerability'],
        color: '#a855f7',
    },
    {
        id: 'hems',
        name: 'HEMS',
        icon: 'Home',
        ratedPower: 'Controller',
        ratedPowerKw: 0,
        count: 1200000,
        riskScore: 82,
        riskLevel: 'high',
        protocols: ['EEBUS', 'OpenADR', 'MQTT'],
        vulnerabilities: ['Cloud API token exposure', 'No OTA signing', 'XSS in dashboard'],
        color: '#00d4ff',
    },
];

function generateNormalBehavior(assetType, points = 48) {
    const data = [];
    const baseLoad = {
        ev_charger: 3,
        heat_pump: 4,
        solar_inverter: 0,
        home_battery: 1,
        hems: 0.5,
    };

    const base = baseLoad[assetType] || 2;

    for (let i = 0; i < points; i++) {
        const hour = (i * 0.5) % 24;
        let value = base;

        if (assetType === 'solar_inverter') {
            // Solar curve
            if (hour >= 6 && hour <= 20) {
                value = Math.sin((hour - 6) / 14 * Math.PI) * 12 + Math.random() * 2;
            } else {
                value = Math.random() * 0.5;
            }
        } else if (assetType === 'ev_charger') {
            // EV charging peaks
            if ((hour >= 17 && hour <= 22) || (hour >= 0 && hour <= 5)) {
                value = base + Math.random() * 18;
            } else {
                value = Math.random() * 2;
            }
        } else if (assetType === 'heat_pump') {
            // Heat pump follows temperature
            value = base + Math.sin((hour - 3) / 24 * Math.PI * 2) * 4 + Math.random() * 2;
        } else {
            value = base + Math.random() * 3;
        }

        data.push(Math.max(0, value));
    }

    return data;
}

function generateAnomalousBehavior(normalData) {
    return normalData.map((val, i) => {
        // Inject coordinated spike at certain points
        if (i >= 28 && i <= 34) {
            return val * (2.5 + Math.random() * 1.5); // Synchronized spike
        }
        if (i >= 36 && i <= 38) {
            return 0; // Synchronized disconnect
        }
        return val + (Math.random() - 0.5) * 0.5;
    });
}

function generateFleetAnomalyScore(points = 48) {
    const scores = [];
    for (let i = 0; i < points; i++) {
        let score = 5 + Math.random() * 10; // Normal baseline 5-15
        if (i >= 28 && i <= 34) {
            score = 60 + Math.random() * 30; // Anomaly spike
        }
        if (i >= 36 && i <= 38) {
            score = 45 + Math.random() * 20;
        }
        scores.push(Math.min(100, score));
    }
    return scores;
}

function calculateGridImpact(compromisedAssets) {
    let totalPowerMw = 0;
    compromisedAssets.forEach(asset => {
        const type = ASSET_TYPES.find(a => a.id === asset.type);
        if (type) {
            totalPowerMw += (type.ratedPowerKw * asset.count) / 1000;
        }
    });
    return {
        totalPowerMw,
        affectedHouseholds: Math.floor(totalPowerMw / 0.004), // ~4kW per household
        gridStabilityRisk: totalPowerMw > 500 ? 'critical' : totalPowerMw > 100 ? 'high' : 'moderate',
        cascadeRisk: totalPowerMw > 1000,
    };
}

function generateTimeLabels(points = 48) {
    const labels = [];
    for (let i = 0; i < points; i++) {
        const hour = Math.floor((i * 0.5) % 24);
        const min = (i % 2) * 30;
        labels.push(`${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`);
    }
    return labels;
}

export {
    ASSET_TYPES,
    generateNormalBehavior,
    generateAnomalousBehavior,
    generateFleetAnomalyScore,
    calculateGridImpact,
    generateTimeLabels,
};
