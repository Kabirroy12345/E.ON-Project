import os
import sys
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image as RLImage, Table, TableStyle, PageBreak
)
from reportlab.pdfgen import canvas

ARTIFACT_DIR = r"C:\Users\HP\.gemini\antigravity\brain\2f92fe83-fd22-49f8-81f2-86fb5d663253"
UPLOAD_DIR = os.path.join(ARTIFACT_DIR, ".user_uploaded")

# Complete ordered sequence of all 23 uploaded prototype screenshots
USER_SCREENSHOTS = [
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183520253.png"),
        "title": "Module 1: Web3 Command Center & Tactical Radar Scope",
        "route": "Route: / (Hero View)",
        "cluster": "Platform Portal // Web3 Dark Cyberpunk UI",
        "description": "Interactive Web3 hero interface featuring hacker decode typography ([GRIDSHIELD]), 3D mouse-tracking parallax radar HUD, live DEFCON status, and key performance badges (<140ms GNN, 800+ FPS Cortex-M4)."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183533513.png"),
        "title": "Module 2: 3D Holographic Substation Radar & Weather Telemetry",
        "route": "Route: / (Substation Telemetry)",
        "cluster": "Real-Time Cyber-Physical Weather Radar",
        "description": "Interactive 3D HTML5 Canvas holographic globe rendering real-time satellite orbital sweeps, ambient temperature, wind velocity, and solar irradiance across German, Dutch, and Swedish substation nodes."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183556755.png"),
        "title": "Module 3: Autonomous Defense Checkpoints & F1 Speedway",
        "route": "Route: / (Cyber Speedway Circuit)",
        "cluster": "Interactive Threat Mitigation Simulation",
        "description": "60 FPS cursor-tracking cyber speedway engine visualizing the 4 core defense checkpoints: Offensive Red Team AI, GraphSAGE GNN Blast Radius, Zero-Telemetry Edge TinyML, and Cluster 5 Adoption."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183587664.png"),
        "title": "Module 4: Security SOC Dashboard — Live Telemetry & Grid Topology",
        "route": "Route: /dashboard (Primary View)",
        "cluster": "Cluster 4: Improvement of Protection Systems",
        "description": "Live SOC operations view monitoring 9.6M virtual customer DER nodes with automated DEFCON threat gauges, real-time power network topology graph, and automated SOAR enforcement status."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183622184.png"),
        "title": "Module 5: Security SOC Analytics — Attack Curves & Incident Stream",
        "route": "Route: /dashboard (Incident & MITRE View)",
        "cluster": "Cluster 4: Closed-Loop AI Telemetry",
        "description": "Real-time attack frequency vs response curve, MITRE ATT&CK for ICS threat vector distribution, live SOC incident stream with automated containment badges, and CVSS category breakdown."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183684244.png"),
        "title": "Module 6: Purple Team AI — 6-Stage Autonomous Hardening Loop",
        "route": "Route: /purple-team (Loop Architecture)",
        "cluster": "Cluster 4: Unified Red vs Blue AI Loop",
        "description": "Unified 6-stage self-evolving loop (Attack -> Detect -> Analyze -> Patch -> Verify -> Learn) synchronizing continuous neural weight updates across 14,892+ executed simulation passes."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183709985.png"),
        "title": "Module 7: Purple Team AI — Red Exploit vs Blue Response Engine",
        "route": "Route: /purple-team (Attack Matrix)",
        "cluster": "Cluster 4: Automated Incident Hardening",
        "description": "Interactive attack emulation matrix featuring the January 2026 Berlin Cable Bridge Sabotage scenario, demonstrating 1.9s DPI detection and automated firewall rule deployment with 91.6% AI confidence."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183721849.png"),
        "title": "Module 8: Purple Team AI — Real-Time Terminal Log & CVE Registry",
        "route": "Route: /purple-team (Terminal & CVE)",
        "cluster": "Cluster 4: Traceable SOC Hardening Logs",
        "description": "Live terminal audit stream detailing step-by-step exploit execution, lateral movement tracing, and live vulnerability registry tracking CVSS severity scores and mitigation statuses."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183734612.png"),
        "title": "Module 9: Customer DER Asset Shield — Inventory & Risk Matrix",
        "route": "Route: /asset-shield (Asset Registry)",
        "cluster": "Cluster 5: Protection Schemes for Customer-Based Assets",
        "description": "Decentralized protection matrix across 9.6M customer assets (EV Chargers, Heat Pumps, Solar Inverters, Home Batteries, HEMS) with real-time risk scores and protocol vulnerability audits."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183749764.png"),
        "title": "Module 10: Customer DER Asset Shield — Real-Time Telemetry & Anomaly",
        "route": "Route: /asset-shield (Waveform Telemetry)",
        "cluster": "Cluster 5: 1.14ms TinyML Anomaly Detection",
        "description": "Live 24-hour EV charger power behavior curve and fleet anomaly scoring gauge, validating on-device zero-trust execution under coordinated demand surge simulations."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183764651.png"),
        "title": "Module 11: Customer DER Asset Shield — 4-Pillar Incentive Framework",
        "route": "Route: /asset-shield (Incentive Model)",
        "cluster": "Cluster 5: Customer Adoption & Incentives",
        "description": "DSO integration response architecture and 4-pillar incentive model: 4–8% dynamic grid tariff discount, up to 25% cyber insurance discount, 100% GDPR zero-leak guarantee, and hardware warranty."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183789111.png"),
        "title": "Module 12: Global Market Adaptability — Cross-Border Matrix",
        "route": "Route: /global-defense (Market Grid)",
        "cluster": "Global Scalability // US, Australia, ASEAN, EU",
        "description": "Cross-border grid adaptability matrix analyzing $4.63B global TAM across US NERC-CIP, Australia AEMO NEM, ASEAN Microgrids, and EU NIS2 Article 21 with live region filters."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183811812.png"),
        "title": "Module 13: Silicon Benchmarks & IEEE 39-Bus Accuracy Objectives",
        "route": "Route: /global-defense (Silicon Specs)",
        "cluster": "Hardware Specifications & Model Performance",
        "description": "Silicon benchmark specifications on ARM Cortex-M4 (1.14ms, 118KB RAM, 1.8mW) and Cortex-M7 with interactive benchmark runner, paired with IEEE 39-bus accuracy targets (98.4% F1-Score, 99.1% Precision)."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183826082.png"),
        "title": "Module 14: Architectural Comparison & Technical Verification Protocols",
        "route": "Route: /global-defense (Defensibility Proofs)",
        "cluster": "Judge Defensibility & Technical Verification",
        "description": "Qualitative comparison matrix against legacy SIEMs and cloud taps, alongside expandable mathematical proofs detailing GraphSAGE 2-hop sampling (K=2, S1=25, S2=10) in <140ms."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183843514.png"),
        "title": "Module 15: Solution Architecture — Defense in Depth (Layers 1 & 2)",
        "route": "Route: /architecture (Layers 1 & 2)",
        "cluster": "Enterprise OT/IT Zero-Trust Architecture",
        "description": "Layer 1 Edge Silicon (<1.14ms, <800KB footprint) and Layer 2 Gateway Layer (10K msgs/sec, Modbus/OCPP/IEC 61850 protocol normalizer) with 72-hour store-and-forward caching."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183851652.png"),
        "title": "Module 16: Solution Architecture — Cloud GNN & SOC SOAR (Layers 3 & 4)",
        "route": "Route: /architecture (Layers 3 & 4)",
        "cluster": "Enterprise OT/IT Zero-Trust Architecture",
        "description": "Layer 3 Cloud Analytics (PyTorch GraphSAGE 2-hop GNN, STIX/TAXII threat intel fusion) and Layer 4 SOC Operations (<1.83s MTTD, 92% automated SOAR pass-thru)."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183858637.png"),
        "title": "Module 17: Production Tech Stack & 5-Step Data Pipeline Architecture",
        "route": "Route: /architecture (Tech Stack & Pipeline)",
        "cluster": "Production Engineering // 8 Core Engines",
        "description": "Production stack (TinyML, Kafka 4.2 GB/s, Kubernetes k8s-v1.29, PyTorch GNN, Neo4j, TimescaleDB, OpenCTI, React D3.js) and interactive 5-step data pipeline simulator."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183868673.png"),
        "title": "Module 18: Prototype vs Enterprise Stack & EU Regulatory Matrix",
        "route": "Route: /architecture (Compliance Matrix)",
        "cluster": "Compliance // NIS2, GDPR, IEC 62351, IEC 62443",
        "description": "Direct comparison between hackathon prototype capabilities and enterprise production roadmap, paired with full coverage matrix for EU NIS2, GDPR, IEC 62351, EN 50549, and ISO 27001."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183875685.png"),
        "title": "Module 19: 18-Month Scaling Roadmap & Architect's Technical Memo",
        "route": "Route: /architecture (Roadmap & Memo)",
        "cluster": "Program Rollout & Executive Architecture Memo",
        "description": "3-phase deployment roadmap (Phase 1 Foundation Pilot, Phase 2 Scaled Rollout, Phase 3 Enterprise Maturity) with Lead AI Engineer technical rationale on edge-first architecture."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183891790.png"),
        "title": "Module 20: Impact & TCO — Market Opportunity & Interactive TCO Calculator",
        "route": "Route: /impact (TCO Calculator)",
        "cluster": "Frugal Engineering // €0.80/device/year Baseline",
        "description": "Executive market overview (€1.1B TAM, €350M SAM, 9.6M DER fleet) paired with dynamic TCO slider modeling €37.8M annual savings and 4567% ROI at production scale."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183905707.png"),
        "title": "Module 21: Impact & TCO — GNN Defensibility & 5-Year ROI Projection",
        "route": "Route: /impact (ROI Projections)",
        "cluster": "Financial Validation & Sub-2s GNN Scaling",
        "description": "Detailed mathematical proof of sub-2s GNN scaling across 9.6M nodes, 5-year cumulative ROI projection curve, and itemized cost breakdown donut visualization."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183919805.png"),
        "title": "Module 22: Impact & TCO — EU Country SAM & Indian Innovation Strengths",
        "route": "Route: /impact (Global Expansion & India Strengths)",
        "cluster": "Criteria for All Challenges // Indian Innovation",
        "description": "Country-by-country European addressable market distribution alongside Bangalore R&D Labs spotlight on constraint-driven engineering and legacy hardware retrofits."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183932327.png"),
        "title": "Module 23: Impact & TCO — Frugal Mindset & Quantified Impact Metrics",
        "route": "Route: /impact (Frugal Engineering & Impact)",
        "cluster": "Quantified Impact // 450M+ EU Households",
        "description": "Frugal innovation pillars, Lead Architect verified benchmark quote with official badge, and quantified impact metrics: 450M+ protected households, 87% faster triage, and €12.6M annual savings."
    }
]

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        w, h = self._pagesize
        
        # Dark Cyber background
        self.setFillColor(colors.HexColor('#050811'))
        self.rect(0, 0, w, h, fill=1, stroke=0)

        # Header bar
        self.setStrokeColor(colors.HexColor('#00d4ff'))
        self.setLineWidth(1)
        self.line(36, h - 35, w - 36, h - 35)

        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor('#00d4ff'))
        self.drawString(36, h - 28, "GRIDSHIELD AI // PROTOTYPE EVIDENCE DOSSIER")
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor('#94a3b8'))
        self.drawRightString(w - 36, h - 28, "E.ON INNOVATION CHALLENGE 2026 // VISUAL PROOFS")

        # Footer bar
        self.setStrokeColor(colors.HexColor('#1e293b'))
        self.line(36, 35, w - 36, 35)
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor('#64748b'))
        self.drawString(36, 22, "CONFIDENTIAL // VERIFIED PROTOTYPE SCREENSHOTS // PULKIT AGRAWAL & KABIR ROY")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(w - 36, 22, page_str)
        self.restoreState()

def build_pdf(output_paths):
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor('#ffffff')
    )
    
    subtitle_style = ParagraphStyle(
        'CoverSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#00d4ff')
    )

    page_title_style = ParagraphStyle(
        'PageTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor('#ffffff')
    )

    badge_style = ParagraphStyle(
        'BadgeStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor('#00ff88'),
        alignment=2
    )

    desc_style = ParagraphStyle(
        'DescStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#cbd5e1')
    )

    story = []

    # ================= COVER PAGE =================
    story.append(Spacer(1, 35))
    story.append(Paragraph("<font color='#00ff88'>⚡ E.ON INNOVATION CHALLENGE 2026 // PROTOTYPE EVIDENCE DOSSIER</font>", ParagraphStyle('CoverBadge', fontName='Helvetica-Bold', fontSize=9, textColor=colors.HexColor('#00ff88'))))
    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>GRIDSHIELD AI — COMPLETE PROTOTYPE VISUAL EVIDENCE DOSSIER</b>", title_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Autonomous Purple Team SOC & Decentralized Customer DER Silicon Defense Platform", subtitle_style))
    story.append(Spacer(1, 16))

    meta_data = [
        [
            Paragraph("<b>PROJECT NAME:</b> GridShield AI", desc_style),
            Paragraph("<b>PROBLEM CLUSTERS:</b> Cluster 4 (Purple SOC) & Cluster 5 (DER Defense)", desc_style),
        ],
        [
            Paragraph("<b>LEAD AI ENGINEER:</b> Pulkit Agrawal", desc_style),
            Paragraph("<b>CYBERSECURITY LEAD:</b> Kabir Roy", desc_style),
        ],
        [
            Paragraph("<b>LIVE PRODUCTION URL:</b> <font color='#00d4ff'>https://e-on-project.vercel.app/</font>", desc_style),
            Paragraph("<b>GITHUB REPOSITORY:</b> <font color='#00d4ff'>https://github.com/Kabirroy12345/E.ON-Project</font>", desc_style),
        ]
    ]

    t = Table(meta_data, colWidths=[360, 360])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#0b1326')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#00d4ff')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#1e293b')),
        ('PADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t)
    story.append(Spacer(1, 18))

    overview_text = (
        "<b>Executive Verification Overview:</b><br/>"
        "This dossier contains direct high-resolution prototype captures of the live GridShield AI web application and SOC architecture across all 7 operational modules. "
        "Each page visualizes a core operational capability: <b>Autonomous Red vs Blue AI Simulation</b> (Cluster 4), "
        "<b>Decentralized 1.14ms TinyML Edge Defense</b> (Cluster 5), real-time <b>3D Holographic Weather Radar</b>, "
        "<b>Continuous Substation Blast Radius Prediction</b> in response to the January 2026 Berlin Cable Bridge Arson incident, and "
        "<b>Frugal Engineering & TCO Optimization</b> (€0.80/device/year baseline)."
    )
    story.append(Paragraph(overview_text, desc_style))
    story.append(PageBreak())

    # ================= 1 IMAGE PER PAGE =================
    for idx, item in enumerate(USER_SCREENSHOTS):
        if not os.path.exists(item["file"]):
            print(f"[-] File not found: {item['file']}")
            continue

        header_table = [
            [
                Paragraph(f"<b>{item['title']}</b>", page_title_style),
                Paragraph(f"<b>{item['cluster']}</b>", badge_style)
            ],
            [
                Paragraph(item['description'], desc_style),
                Paragraph(f"<font color='#00d4ff'><b>{item['route']}</b></font>", ParagraphStyle('RStyle', fontName='Helvetica-Bold', fontSize=8, textColor=colors.HexColor('#00d4ff'), alignment=2))
            ]
        ]
        ht = Table(header_table, colWidths=[530, 190])
        ht.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#0b1326')),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#00d4ff')),
            ('PADDING', (0,0), (-1,-1), 6),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ]))
        story.append(ht)
        story.append(Spacer(1, 8))

        # Full-width landscape image (720pt wide x 385pt high)
        img = RLImage(item["file"], width=720, height=385)
        story.append(img)

        if idx < len(USER_SCREENSHOTS) - 1:
            story.append(PageBreak())

    for path in output_paths:
        doc = SimpleDocTemplate(
            path,
            pagesize=landscape(letter),
            leftMargin=36,
            rightMargin=36,
            topMargin=45,
            bottomMargin=45
        )
        doc.build(story, canvasmaker=NumberedCanvas)
        print(f"[+] Compiled: {path}")

if __name__ == "__main__":
    targets = [
        os.path.join(os.getcwd(), "GridShield_AI_Prototype_Screenshots.pdf"),
        os.path.join(os.getcwd(), "public", "GridShield_AI_Prototype_Screenshots.pdf"),
        os.path.join(ARTIFACT_DIR, "GridShield_AI_Prototype_Screenshots.pdf")
    ]
    build_pdf(targets)
