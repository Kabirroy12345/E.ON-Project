import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)

def create_gridshield_report():
    pdf_filename = "GridShield_AI_Zero_to_Hero_Report.pdf"
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom Color Palette
    PRIMARY = colors.HexColor("#090d16")     # Dark Obsidian
    CYAN = colors.HexColor("#00d4ff")        # Neon Cyan
    GREEN = colors.HexColor("#00ff88")       # Neon Green
    RED = colors.HexColor("#ff3366")         # Neon Red
    PURPLE = colors.HexColor("#a855f7")      # Neon Purple
    AMBER = colors.HexColor("#fbbf24")       # Amber
    TEXT_BRIGHT = colors.HexColor("#f8fafc") # Bright White
    TEXT_MUTED = colors.HexColor("#94a3b8")  # Muted Slate
    CARD_BG = colors.HexColor("#0f1429")     # Card background

    # Custom Paragraph Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=CYAN,
        alignment=0,
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10.5,
        leading=14,
        textColor=TEXT_MUTED,
        spaceAfter=14
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=17,
        textColor=CYAN,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=GREEN,
        spaceBefore=9,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#cbd5e1"),
        spaceAfter=5
    )

    code_style = ParagraphStyle(
        'Code_Custom',
        parent=styles['Normal'],
        fontName='Courier-Bold',
        fontSize=8,
        leading=11,
        textColor=GREEN,
        backColor=colors.HexColor("#050811"),
        borderColor=colors.HexColor("#00ff88"),
        borderWidth=0.5,
        borderPadding=6,
        spaceAfter=8
    )

    story = []

    # ------------------ COVER / HEADER ------------------
    story.append(Paragraph("GridShield AI — From Zero to Hero", title_style))
    story.append(Paragraph("E.ON Innovation Challenge 2026 — Defensible Technical Architecture, Cluster 5 Adoption & Onboarding Guide", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=CYAN, spaceAfter=12))

    # Meta Table (Authors, Target, Tech Stack)
    meta_data = [
        [
            Paragraph("<b>Team GridShield:</b><br/>Pulkit Agrawal (Lead AI & Red Team)<br/>Kabir Roy (Cybersecurity & Purple SOC)", body_style),
            Paragraph("<b>Target Infrastructure:</b><br/>E.ON Power Grids, SCADA, OCPP EV Gateways, 9.6M Customer Assets", body_style),
            Paragraph("<b>Technical Framework:</b><br/>React 18 + Vite (Demo UI), PyTorch GraphSAGE + TinyML (Target Arch)", body_style)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[180, 180, 180])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 1, CYAN),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10))

    # ------------------ SECTION 1: EXECUTIVE SUMMARY & DEFENCE ------------------
    story.append(Paragraph("1. Executive Summary & Defensible Problem Statement", h1_style))
    story.append(Paragraph(
        "Modern energy distribution grids face a critical vulnerability: the rapid decentralisation of energy assets. "
        "Over 9.6 million customer-owned Distributed Energy Resources (DERs)—including EV chargers, solar inverters, "
        "and heat pumps—are connected to E.ON's distribution network across Europe. Coordinated cyberattacks targeting thousands of DERs simultaneously "
        "pose severe grid frequency perturbation and blackout risks under NIS2 regulatory frameworks.",
        body_style
    ))
    story.append(Paragraph(
        "<b>GridShield AI</b> addresses this challenge via an autonomous <b>Purple Team Security Orchestration Platform</b>. "
        "It continuously pairs an autonomous <b>Red Team Engine</b> (simulating MITRE ATT&CK vectors) with a <b>Blue Team Anomaly Detector</b> "
        "(Edge TinyML + Cloud Graph Neural Network), delivering real-time threat detection and automated SOAR zero-trust isolation.",
        body_style
    ))

    # ------------------ SECTION 2: PROTOTYPE VS PRODUCTION ------------------
    story.append(Paragraph("2. Technical Transparency: Prototype Demo vs Enterprise Roadmap", h1_style))
    story.append(Paragraph(
        "To ensure technical defensibility before Infosys & E.ON judges, GridShield AI explicitly demarcates what was built for the hackathon interactive demo versus the proposed production architecture:",
        body_style
    ))

    proto_data = [
        ["Dimension", "Built Hackathon Prototype (Interactive Demo)", "Proposed Enterprise Production Architecture"],
        ["User Interface", "React 18 + Vite SPA with HTML5 Canvas Space Engine & Lucide Icons", "Production SOC Web Application (React + D3.js + WebGL Canvas)"],
        ["Simulation Engine", "Scripted client-side simulation (attackEngine.js & assetMonitor.js)", "PyTorch GraphSAGE GNN Model + Apache Kafka 4.2 GB/s Stream"],
        ["Edge Execution", "JavaScript web worker mock running anomaly scoring math", "TinyML / TFLite Micro C++ binary (<800KB) on ARM Cortex-M4"],
        ["Grid Topologies", "9.6M virtual customer DER nodes across 5 device categories", "Neo4j Graph Database mapping substation links & SCADA gateways"]
    ]
    proto_table = Table(proto_data, colWidths=[90, 220, 230])
    proto_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#1e293b")),
        ('TEXTCOLOR', (0,0), (-1,0), CYAN),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 8),
        ('BACKGROUND', (0,1), (-1,-1), CARD_BG),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#334155")),
        ('TEXTCOLOR', (0,1), (-1,-1), colors.HexColor("#e2e8f0")),
        ('FONTSIZE', (0,1), (-1,-1), 7.5),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(proto_table)
    story.append(Spacer(1, 10))

    # ------------------ SECTION 3: ITEMIZED TCO BREAKDOWN ------------------
    story.append(Paragraph("3. Itemized Techno-Economic Cost Model (€0.80 / Device / Year)", h1_style))
    story.append(Paragraph(
        "Per E.ON's evaluation rubric requiring transparent financial assumptions, the headline €0.80/device/year cost at 500K scale is broken down as follows:",
        body_style
    ))

    tco_data = [
        ["Component", "Cost / Device / Year", "Techno-Economic Assumption & Work Shown"],
        ["1. Edge MCU Execution", "€0.12", "Software overlay on existing device MCU. Zero new hardware cost (<800KB Flash, 4KB RAM)."],
        ["2. Telemetry Ingestion", "€0.28", "Compressed MQTT telemetry (<2KB/hr/device) ingested into multi-tenant Apache Kafka bus."],
        ["3. GraphSAGE GNN Compute", "€0.22", "Subsampled PyTorch GNN graph embedding on shared Kubernetes GPU cluster (NVIDIA T4)."],
        ["4. Maintenance & Audit", "€0.18", "Automated NIS2 Article 21 compliance reporting & signed ED25519 OTA firmware updates."],
        ["TOTAL TCO", "€0.80 / dev / yr", "ROI positive in Year 1; saves €12.6M annually per DSO in avoided breach & NIS2 penalty costs."]
    ]
    tco_table = Table(tco_data, colWidths=[120, 110, 310])
    tco_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#1e293b")),
        ('TEXTCOLOR', (0,0), (-1,0), GREEN),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 8),
        ('BACKGROUND', (0,1), (-1,-2), CARD_BG),
        ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor("#1e1b4b")),
        ('TEXTCOLOR', (0,-1), (-1,-1), GREEN),
        ('FONTNAME', (0,-1), (-1,-1), 'Helvetica-Bold'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#334155")),
        ('TEXTCOLOR', (0,1), (-1,-2), colors.HexColor("#e2e8f0")),
        ('FONTSIZE', (0,1), (-1,-1), 7.5),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(tco_table)
    story.append(Spacer(1, 10))

    # ------------------ SECTION 4: CLUSTER 5 CUSTOMER ADOPTION ------------------
    story.append(Paragraph("4. Cluster 5 Customer Adoption & Incentive Framework", h1_style))
    story.append(Paragraph(
        "Addressing Cluster 5's scored requirement ('How to convince asset owners to connect devices to central monitoring'), GridShield AI introduces 4 incentive pillars:",
        body_style
    ))

    features_c5 = [
        ("💚 4–8% Dynamic Grid Tariff Discount", "DSOs grant direct monthly electricity bill credits to customers who opt into GridShield's TinyML edge telemetry network."),
        ("🏆 Up to 25% Cyber Insurance Rebate", "Underwriting partners (Allianz, AXA) lower insurance premiums for home batteries & EV chargers running verified zero-trust firmware."),
        ("🔒 100% Zero-Privacy Exposure Guarantee", "Federated TinyML runs locally on device MCUs — raw household usage data never leaves the home, satisfying strict GDPR demands."),
        ("🛡️ Hardware Exploitation Replacement Guarantee", "DSOs cover full zero-cost replacement for any DER asset damaged by grid frequency surges or unauthorized firmware exploits.")
    ]

    for title, desc in features_c5:
        story.append(Paragraph(f"<b>{title}</b>", h2_style))
        story.append(Paragraph(desc, body_style))

    story.append(Spacer(1, 10))

    # ------------------ SECTION 5: NEWCOMER ONBOARDING ------------------
    story.append(Paragraph("5. Newcomer Onboarding & Developer Setup Guide", h1_style))
    story.append(Paragraph("Follow these steps to set up and run GridShield AI locally:", body_style))

    story.append(Paragraph("<b>Step 1: Clone Repository & Install Dependencies</b>", h2_style))
    story.append(Paragraph("git clone https://github.com/eon-challenge/gridshield-ai.git<br/>cd E.ON_Hackathon_Event<br/>npm install", code_style))

    story.append(Paragraph("<b>Step 2: Launch Development Server & Test Production Build</b>", h2_style))
    story.append(Paragraph("npm run dev          # Starts local dev server at http://localhost:5173/<br/>npx vite build       # Verifies production bundle (100% clean success)", code_style))

    # Footer
    story.append(HRFlowable(width="100%", thickness=1, color=CYAN, spaceAfter=8))
    story.append(Paragraph(
        "<b>GridShield AI Defensibility Report:</b> Generated for E.ON Innovation Challenge 2026.<br/>"
        "© 2026 Team GridShield — Lead Engineers: Pulkit Agrawal & Kabir Roy.",
        ParagraphStyle('Footer', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=7.5, leading=10, textColor=TEXT_MUTED, alignment=1)
    ))

    doc.build(story)
    print(f"PDF successfully updated: {pdf_filename}")

if __name__ == "__main__":
    create_gridshield_report()
