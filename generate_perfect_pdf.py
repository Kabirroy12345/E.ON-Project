import os
import sys
from PIL import Image as PILImage
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib import colors
from reportlab.pdfgen import canvas

ARTIFACT_DIR = r"C:\Users\HP\.gemini\antigravity\brain\2f92fe83-fd22-49f8-81f2-86fb5d663253"
UPLOAD_DIR = os.path.join(ARTIFACT_DIR, ".user_uploaded")

# All 23 user screenshots
SCREENSHOTS = [
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183520253.png"),
        "title": "Module 1: Web3 Command Center & Tactical Radar Scope",
        "route": "Route: / (Hero View)",
        "cluster": "Platform Portal // Web3 Dark Cyberpunk UI",
        "desc": "Web3 hero UI with hacker decode typography ([GRIDSHIELD]), 3D radar scope, and <140ms GNN / 800+ FPS Cortex-M4 badges."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183533513.png"),
        "title": "Module 2: 3D Holographic Substation Radar & Weather Telemetry",
        "route": "Route: / (Substation Telemetry)",
        "cluster": "Real-Time Cyber-Physical Weather Radar",
        "desc": "3D Canvas holographic globe rendering satellite orbital sweeps, ambient temp, wind velocity, and solar irradiance across EU nodes."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183556755.png"),
        "title": "Module 3: Autonomous Defense Checkpoints & F1 Speedway",
        "route": "Route: / (Cyber Speedway Circuit)",
        "cluster": "Interactive Threat Mitigation Simulation",
        "desc": "60 FPS mouse-tracking speedway engine visualizing the 4 core defense checkpoints: Red AI, GNN, TinyML, and Cluster 5 Adoption."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183587664.png"),
        "title": "Module 4: Security SOC Dashboard — Live Telemetry & Grid Topology",
        "route": "Route: /dashboard (Primary View)",
        "cluster": "Cluster 4: Improvement of Protection Systems",
        "desc": "Live SOC operations view monitoring 9.6M virtual customer DER nodes with DEFCON gauges and power network topology graph."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183622184.png"),
        "title": "Module 5: Security SOC Analytics — Attack Curves & Incident Stream",
        "route": "Route: /dashboard (Incident & MITRE View)",
        "cluster": "Cluster 4: Closed-Loop AI Telemetry",
        "desc": "24h attack vs response curves, MITRE ATT&CK for ICS threat distribution, live SOC incident stream, and CVSS category breakdown."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183684244.png"),
        "title": "Module 6: Purple Team AI — 6-Stage Autonomous Hardening Loop",
        "route": "Route: /purple-team (Loop Architecture)",
        "cluster": "Cluster 4: Unified Red vs Blue AI Loop",
        "desc": "6-stage self-evolving loop (Attack -> Detect -> Analyze -> Patch -> Verify -> Learn) synchronizing continuous neural weights."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183709985.png"),
        "title": "Module 7: Purple Team AI — Red Exploit vs Blue Response Engine",
        "route": "Route: /purple-team (Attack Matrix)",
        "cluster": "Cluster 4: Automated Incident Hardening",
        "desc": "Attack emulation matrix featuring the January 2026 Berlin Cable Bridge Sabotage scenario, demonstrating 1.9s DPI detection."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183721849.png"),
        "title": "Module 8: Purple Team AI — Real-Time Terminal Log & CVE Registry",
        "route": "Route: /purple-team (Terminal & CVE)",
        "cluster": "Cluster 4: Traceable SOC Hardening Logs",
        "desc": "Live terminal audit stream detailing exploit execution, lateral movement tracing, and live CVE registry tracking CVSS scores."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183734612.png"),
        "title": "Module 9: Customer DER Asset Shield — Inventory & Risk Matrix",
        "route": "Route: /asset-shield (Asset Registry)",
        "cluster": "Cluster 5: Protection Schemes for Customer-Based Assets",
        "desc": "Decentralized protection matrix across 9.6M customer assets (EV Chargers, Heat Pumps, Solar Inverters, Batteries, HEMS)."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183749764.png"),
        "title": "Module 10: Customer DER Asset Shield — Real-Time Telemetry & Anomaly",
        "route": "Route: /asset-shield (Waveform Telemetry)",
        "cluster": "Cluster 5: 1.14ms TinyML Anomaly Detection",
        "desc": "Live 24h EV charger power behavior curve and fleet anomaly score, validating on-device zero-trust execution under load surges."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183764651.png"),
        "title": "Module 11: Customer DER Asset Shield — 4-Pillar Incentive Framework",
        "route": "Route: /asset-shield (Incentive Model)",
        "cluster": "Cluster 5: Customer Adoption & Incentives",
        "desc": "4-pillar incentive model: 4–8% dynamic tariff discount, up to 25% cyber insurance discount, 100% GDPR zero-leak guarantee."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183789111.png"),
        "title": "Module 12: Global Market Adaptability — Cross-Border Matrix",
        "route": "Route: /global-defense (Market Grid)",
        "cluster": "Global Scalability // US, Australia, ASEAN, EU",
        "desc": "Cross-border grid adaptability matrix analyzing $4.63B global TAM across US NERC-CIP, Australia AEMO, ASEAN, and EU NIS2."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183811812.png"),
        "title": "Module 13: Silicon Benchmarks & IEEE 39-Bus Accuracy Objectives",
        "route": "Route: /global-defense (Silicon Specs)",
        "cluster": "Hardware Specifications & Model Performance",
        "desc": "Silicon benchmarks on ARM Cortex-M4 (1.14ms, 118KB RAM) and Cortex-M7 with IEEE 39-bus targets (98.4% F1, 99.1% Precision)."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183826082.png"),
        "title": "Module 14: Architectural Comparison & Technical Verification Protocols",
        "route": "Route: /global-defense (Defensibility Proofs)",
        "cluster": "Judge Defensibility & Technical Verification",
        "desc": "Qualitative comparison against legacy SIEMs and mathematical proofs of GraphSAGE 2-hop sampling in <140ms on NVIDIA T4."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183843514.png"),
        "title": "Module 15: Solution Architecture — Defense in Depth (Layers 1 & 2)",
        "route": "Route: /architecture (Layers 1 & 2)",
        "cluster": "Enterprise OT/IT Zero-Trust Architecture",
        "desc": "Layer 1 Edge Silicon (<1.14ms, <800KB) and Layer 2 Gateway Layer (10K msgs/sec, Modbus/OCPP/IEC 61850 protocol normalizer)."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183851652.png"),
        "title": "Module 16: Solution Architecture — Cloud GNN & SOC SOAR (Layers 3 & 4)",
        "route": "Route: /architecture (Layers 3 & 4)",
        "cluster": "Enterprise OT/IT Zero-Trust Architecture",
        "desc": "Layer 3 Cloud Analytics (PyTorch GraphSAGE 2-hop GNN, STIX/TAXII threat intel) and Layer 4 SOC SOAR (<1.83s MTTD, 92% pass-thru)."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183858637.png"),
        "title": "Module 17: Production Tech Stack & 5-Step Data Pipeline Architecture",
        "route": "Route: /architecture (Tech Stack & Pipeline)",
        "cluster": "Production Engineering // 8 Core Engines",
        "desc": "Production stack (TinyML, Kafka 4.2 GB/s, Kubernetes, PyTorch GNN, Neo4j, TimescaleDB) and interactive data pipeline tester."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183868673.png"),
        "title": "Module 18: Prototype vs Enterprise Stack & EU Regulatory Matrix",
        "route": "Route: /architecture (Compliance Matrix)",
        "cluster": "Compliance // NIS2, GDPR, IEC 62351, IEC 62443",
        "desc": "Prototype vs enterprise roadmap comparison and full coverage matrix for EU NIS2, GDPR, IEC 62351, EN 50549, and ISO 27001."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183875685.png"),
        "title": "Module 19: 18-Month Scaling Roadmap & Architect's Technical Memo",
        "route": "Route: /architecture (Roadmap & Memo)",
        "cluster": "Program Rollout & Executive Architecture Memo",
        "desc": "3-phase deployment roadmap (Phase 1 Foundation Pilot, Phase 2 Scaled Rollout, Phase 3 Enterprise) and Lead AI Engineer memo."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183891790.png"),
        "title": "Module 20: Impact & TCO — Market Opportunity & Interactive TCO Calculator",
        "route": "Route: /impact (TCO Calculator)",
        "cluster": "Frugal Engineering // €0.80/device/year Baseline",
        "desc": "Executive market sizing (€1.1B TAM, €350M SAM, 9.6M DER fleet) and dynamic TCO slider modeling €37.8M annual savings."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183905707.png"),
        "title": "Module 21: Impact & TCO — GNN Defensibility & 5-Year ROI Projection",
        "route": "Route: /impact (ROI Projections)",
        "cluster": "Financial Validation & Sub-2s GNN Scaling",
        "desc": "Mathematical proof of sub-2s GNN scaling across 9.6M nodes, 5-year cumulative ROI projection curve, and cost breakdown donut."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183919805.png"),
        "title": "Module 22: Impact & TCO — EU Country SAM & Indian Innovation Strengths",
        "route": "Route: /impact (Global Expansion & India Strengths)",
        "cluster": "Criteria for All Challenges // Indian Innovation",
        "desc": "European country-by-country addressable market and Bangalore R&D Labs spotlight on constraint-driven engineering."
    },
    {
        "file": os.path.join(UPLOAD_DIR, "media_1788183932327.png"),
        "title": "Module 23: Impact & TCO — Frugal Mindset & Quantified Impact Metrics",
        "route": "Route: /impact (Frugal Engineering & Impact)",
        "cluster": "Quantified Impact // 450M+ EU Households",
        "desc": "Frugal innovation pillars, Lead Architect verified quote badge, and quantified impact metrics: 450M+ protected households."
    }
]

def generate_perfect_pdf(output_path):
    print(f"[*] Compiling direct canvas PDF: {output_path}", flush=True)
    c = canvas.Canvas(output_path, pagesize=landscape(letter))
    w, h = landscape(letter) # 792 x 612 points
    
    total_pages = len(SCREENSHOTS) + 1 # Cover + 23 screenshot pages
    
    def draw_chrome(c, page_num):
        # Background
        c.setFillColor(colors.HexColor('#050811'))
        c.rect(0, 0, w, h, fill=1, stroke=0)
        
        # Header line
        c.setStrokeColor(colors.HexColor('#00d4ff'))
        c.setLineWidth(1)
        c.line(36, h - 35, w - 36, h - 35)
        
        # Header text
        c.setFont("Helvetica-Bold", 8)
        c.setFillColor(colors.HexColor('#00d4ff'))
        c.drawString(36, h - 26, "GRIDSHIELD AI // AUTONOMOUS PURPLE TEAM SOC")
        c.setFont("Helvetica", 8)
        c.setFillColor(colors.HexColor('#94a3b8'))
        c.drawRightString(w - 36, h - 26, "E.ON INNOVATION CHALLENGE 2026 // PROTOTYPE EVIDENCE")
        
        # Footer line
        c.setStrokeColor(colors.HexColor('#1e293b'))
        c.line(36, 35, w - 36, 35)
        
        # Footer text
        c.setFont("Helvetica", 8)
        c.setFillColor(colors.HexColor('#64748b'))
        c.drawString(36, 22, "CONFIDENTIAL // SUBMISSION DOSSIER // AUTHORS: PULKIT AGRAWAL & KABIR ROY")
        c.drawRightString(w - 36, 22, f"Page {page_num} of {total_pages}")

    # ================= 1. COVER PAGE =================
    draw_chrome(c, 1)
    
    # Title badge
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(colors.HexColor('#00ff88'))
    c.drawString(36, h - 75, "⚡ E.ON INNOVATION CHALLENGE 2026 // OFFICIAL PROTOTYPE DOSSIER")
    
    # Main Title
    c.setFont("Helvetica-Bold", 24)
    c.setFillColor(colors.HexColor('#ffffff'))
    c.drawString(36, h - 110, "GRIDSHIELD AI — PROTOTYPE VISUAL EVIDENCE DOSSIER")
    
    # Subtitle
    c.setFont("Helvetica", 12)
    c.setFillColor(colors.HexColor('#00d4ff'))
    c.drawString(36, h - 132, "Autonomous Purple Team SOC & Decentralized Customer DER Silicon Defense Platform")
    
    # Info Box
    box_x = 36
    box_y = h - 320
    box_w = w - 72
    box_h = 165
    c.setFillColor(colors.HexColor('#0b1326'))
    c.setStrokeColor(colors.HexColor('#00d4ff'))
    c.setLineWidth(1)
    c.roundRect(box_x, box_y, box_w, box_h, 6, fill=1, stroke=1)
    
    # Text inside info box
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(colors.HexColor('#00ff88'))
    c.drawString(box_x + 16, box_y + 138, "SUBMISSION METADATA & VERIFICATION RECORD")
    
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(colors.HexColor('#94a3b8'))
    c.drawString(box_x + 16, box_y + 112, "PROJECT NAME:")
    c.drawString(box_x + 16, box_y + 88, "PROBLEM CLUSTERS:")
    c.drawString(box_x + 16, box_y + 64, "LEAD AI ENGINEER:")
    c.drawString(box_x + 16, box_y + 40, "CYBERSECURITY LEAD:")
    c.drawString(box_x + 16, box_y + 16, "LIVE PRODUCTION URL:")
    
    c.setFont("Helvetica", 9)
    c.setFillColor(colors.HexColor('#ffffff'))
    c.drawString(box_x + 160, box_y + 112, "GridShield AI")
    c.drawString(box_x + 160, box_y + 88, "Cluster 4 (Improvement of Protection Systems) & Cluster 5 (Customer Asset Defense)")
    c.drawString(box_x + 160, box_y + 64, "Pulkit Agrawal")
    c.drawString(box_x + 160, box_y + 40, "Kabir Roy")
    c.setFillColor(colors.HexColor('#00d4ff'))
    c.drawString(box_x + 160, box_y + 16, "https://e-on-project.vercel.app/  |  GitHub: https://github.com/Kabirroy12345/E.ON-Project")
    
    # Executive Summary Card
    sum_y = box_y - 120
    c.setFillColor(colors.HexColor('#0d1829'))
    c.setStrokeColor(colors.HexColor('#1e293b'))
    c.roundRect(box_x, sum_y, box_w, 105, 6, fill=1, stroke=1)
    
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(colors.HexColor('#00ff88'))
    c.drawString(box_x + 16, sum_y + 85, "EXECUTIVE DEFENSE SUMMARY:")
    
    c.setFont("Helvetica", 8.5)
    c.setFillColor(colors.HexColor('#cbd5e1'))
    c.drawString(box_x + 16, sum_y + 65, "• Cluster 4 Defense: Autonomous Purple Team SOC executing 50+ MITRE ATT&CK for ICS vectors with closed-loop AI retraining.")
    c.drawString(box_x + 16, sum_y + 48, "• Cluster 5 Defense: 1.14ms TinyML Edge on Cortex-M4 (<800KB) protecting 9.6M customer DERs with 4-pillar incentive model.")
    c.drawString(box_x + 16, sum_y + 31, "• Real-World Berlin Sabotage: Real-time simulation of January 2026 Berlin Cable Bridge arson with sub-second SOAR load balancing.")
    c.drawString(box_x + 16, sum_y + 14, "• Frugal Indian Engineering: €0.80/device/year baseline delivering €18.4M annual gross savings and 5.6x ROI for DSOs.")
    
    c.showPage()
    
    # ================= 2. SCREENSHOT PAGES (1 TO 23) =================
    for idx, item in enumerate(SCREENSHOTS):
        page_num = idx + 2
        draw_chrome(c, page_num)
        
        # Info Header Bar
        hdr_x = 36
        hdr_y = h - 90
        hdr_w = w - 72
        hdr_h = 48
        
        c.setFillColor(colors.HexColor('#0b1326'))
        c.setStrokeColor(colors.HexColor('#00d4ff'))
        c.setLineWidth(1)
        c.roundRect(hdr_x, hdr_y, hdr_w, hdr_h, 4, fill=1, stroke=1)
        
        # Title
        c.setFont("Helvetica-Bold", 11)
        c.setFillColor(colors.HexColor('#ffffff'))
        c.drawString(hdr_x + 12, hdr_y + 30, item["title"])
        
        # Cluster Badge (Right aligned)
        c.setFont("Helvetica-Bold", 8)
        c.setFillColor(colors.HexColor('#00ff88'))
        c.drawRightString(hdr_x + hdr_w - 12, hdr_y + 30, item["cluster"])
        
        # Description
        c.setFont("Helvetica", 8)
        c.setFillColor(colors.HexColor('#94a3b8'))
        c.drawString(hdr_x + 12, hdr_y + 12, item["desc"])
        
        # Route
        c.setFont("Helvetica-Bold", 8)
        c.setFillColor(colors.HexColor('#00d4ff'))
        c.drawRightString(hdr_x + hdr_w - 12, hdr_y + 12, item["route"])
        
        # Screenshot Image (Positioned below header, above footer)
        # Printable area: x from 36 to 756 (width 720), y from 42 to 516 (height 474)
        # Image area: x=36, y=42, width=720, height=470
        img_path = item["file"]
        if os.path.exists(img_path):
            img_x = 36
            img_y = 42
            img_w = 720
            img_h = 470
            
            # Border frame for screenshot
            c.setFillColor(colors.HexColor('#000000'))
            c.setStrokeColor(colors.HexColor('#1e293b'))
            c.setLineWidth(1)
            c.rect(img_x, img_y, img_w, img_h, fill=1, stroke=1)
            
            # Draw the image
            c.drawImage(img_path, img_x + 1, img_y + 1, width=img_w - 2, height=img_h - 2, preserveAspectRatio=True, anchor='c')
        else:
            print(f"[-] Image not found: {img_path}")
            
        c.showPage()
        
    c.save()
    print(f"[+] Direct Canvas PDF generated successfully: {output_path}", flush=True)

if __name__ == "__main__":
    targets = [
        os.path.join(os.getcwd(), "GridShield_AI_Prototype_Screenshots.pdf"),
        os.path.join(os.getcwd(), "public", "GridShield_AI_Prototype_Screenshots.pdf"),
        os.path.join(ARTIFACT_DIR, "GridShield_AI_Prototype_Screenshots.pdf")
    ]
    for target in targets:
        generate_perfect_pdf(target)
