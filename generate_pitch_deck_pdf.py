import os
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def create_pitch_deck_pdf():
    pdf_filename = "GridShield_AI_Pitch_Deck.pdf"
    # Landscape Letter format for presentation slides (11 x 8.5 inches)
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=landscape(letter),
        leftMargin=36,
        rightMargin=36,
        topMargin=30,
        bottomMargin=30
    )

    CYAN = colors.HexColor('#00d4ff')
    DARK_NAVY = colors.HexColor('#060b18')
    CARD_BG = colors.HexColor('#0d1527')
    WHITE = colors.HexColor('#ffffff')
    GREEN = colors.HexColor('#00ff88')
    RED = colors.HexColor('#ff0055')
    MUTED = colors.HexColor('#94a3b8')
    YELLOW = colors.HexColor('#ffd166')

    styles = getSampleStyleSheet()

    slide_title_style = ParagraphStyle(
        'SlideTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=CYAN,
        spaceAfter=10
    )

    slide_subtitle_style = ParagraphStyle(
        'SlideSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=WHITE,
        spaceAfter=12
    )

    body_style = ParagraphStyle(
        'SlideBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10.5,
        leading=15,
        textColor=WHITE,
        spaceAfter=8
    )

    bullet_style = ParagraphStyle(
        'SlideBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=WHITE,
        leftIndent=15,
        spaceAfter=6
    )

    meta_style = ParagraphStyle(
        'SlideMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=GREEN
    )

    slides = [
        # Slide 1: Title
        {
            "title": "GRIDSHIELD AI — AUTONOMOUS PURPLE SOC ARCHITECTURE",
            "subtitle": "E.ON Innovation Challenge 2026 // Distributed Energy Resource (DER) Grid Security",
            "content": [
                Paragraph("<b>Presenters:</b> Pulkit Agrawal (Lead AI Engineer) & Kabir Roy (Cybersecurity Lead)", meta_style),
                Spacer(1, 10),
                Paragraph("<b>Core Mission:</b> Protecting 9.6M Customer DER Assets & High-Voltage Substations using GraphSAGE GNN Blast Radius Correlation and 1.14ms Edge TinyML Defense.", body_style),
                Spacer(1, 15),
                Paragraph("• <b>Live Application Demo:</b> https://e-on-project.vercel.app/", bullet_style),
                Paragraph("• <b>GitHub Repository:</b> https://github.com/Kabirroy12345/E.ON-Project (Branch: v2-global-edition)", bullet_style)
            ]
        },
        # Slide 2: Problem
        {
            "title": "THE PROBLEM: THE UNMANAGED DER GRID THREAT",
            "subtitle": "Massive Edge Expansion Creates Critical Vulnerabilities for DSOs",
            "content": [
                Paragraph("• <b>Explosive Edge Growth:</b> Millions of residential solar inverters, EV chargers, and battery storages connecting directly to DSO distribution grids.", bullet_style),
                Paragraph("• <b>High-Voltage Cascades:</b> Unmanaged IoT endpoints create unmonitored backfeed pathways capable of compromising substation transformers.", bullet_style),
                Paragraph("• <b>Privacy & SIEM Cost Bottleneck:</b> Centralized cloud log collection violates residential GDPR privacy and costs over €4.50/device/year.", bullet_style)
            ]
        },
        # Slide 3: Solution
        {
            "title": "THE SOLUTION: DUAL-ENGINE PURPLE TEAM ARCHITECTURE",
            "subtitle": "Autonomous Offensive Simulation & Real-Time Graph Neural Network Defense",
            "content": [
                Paragraph("• <b>Offensive Red Team Engine:</b> Autonomous AI executing 50+ MITRE ATT&CK adversary vectors against SCADA, Modbus, and OCPP protocols.", bullet_style),
                Paragraph("• <b>Defensive Blue Team Engine:</b> Real-time PyTorch GraphSAGE 2-hop neighborhood sampling evaluating threat propagation across subgraphs in <b>&lt;140ms on GPU</b>.", bullet_style),
                Paragraph("• <b>Automated Isolation:</b> Air-gapped zero-trust containment policy isolating infected gateways within milliseconds.", bullet_style)
            ]
        },
        # Slide 4: TinyML Edge
        {
            "title": "SILICON-LEVEL PRIVACY: 1.14ms EDGE TINYML AGENT",
            "subtitle": "Zero Telemetry Leakage on ARM Cortex-M4 Microcontrollers",
            "content": [
                Paragraph("• <b>On-Device Inference:</b> Compiled C++ neural weights with TFLite Micro & CMSIS-NN executing on standard smart meter gateways.", bullet_style),
                Paragraph("• <b>Ultra-Low Overhead:</b> 1.14ms target inference latency with <b>&lt;800KB RAM footprint</b> allowing 800+ evaluations/sec.", bullet_style),
                Paragraph("• <b>100% GDPR Compliant:</b> Raw customer usage data never leaves the device — only anomalous risk embeddings trigger cloud alerts.", bullet_style)
            ]
        },
        # Slide 5: Customer Incentives
        {
            "title": "CLUSTER 5 CUSTOMER ADOPTION FRAMEWORK",
            "subtitle": "Securing 90%+ Voluntary Customer Enrollment",
            "content": [
                Paragraph("• <b>1. Dynamic Grid Tariff Discounts:</b> Reduced electricity rates for enrolled smart solar & battery assets.", bullet_style),
                Paragraph("• <b>2. Up to 25% Insurance Rebates:</b> Partnered cyber & grid risk insurance premium reductions.", bullet_style),
                Paragraph("• <b>3. Free Automated Firmware Updates:</b> Over-the-air Zero-Day vulnerability patching.", bullet_style),
                Paragraph("• <b>4. Priority Restoral SLAs:</b> Guaranteed top-tier grid restoral priority during outages.", bullet_style)
            ]
        },
        # Slide 6: Global Scalability
        {
            "title": "GLOBAL MARKET SCALABILITY & COMPLIANCE",
            "subtitle": "Extending Beyond EU NIS2 to Global Energy Grids",
            "content": [
                Paragraph("• <b>EU NIS2:</b> Full alignment with Article 21 mandatory technical measures and incident reporting.", bullet_style),
                Paragraph("• <b>US NERC-CIP & FERC 2222:</b> Compliant with NERC-CIP-003/005/012 cyber security standards.", bullet_style),
                Paragraph("• <b>Australia AEMO & ASEAN:</b> Optimized for rooftop solar heavy feeders and air-gapped island microgrids.", bullet_style)
            ]
        },
        # Slide 7: Business Impact
        {
            "title": "BUSINESS IMPACT & ITEMIZED TCO BASELINE",
            "subtitle": "€18.4M Annual Savings & 5.6x ROI for a 5M Asset DSO",
            "content": [
                Paragraph("• <b>Cost Baseline:</b> Ingestion overhead reduced from €4.50 to <b>€0.80 / device / year</b> at scale.", bullet_style),
                Paragraph("• <b>99.2% Edge Filtering:</b> Local microcontroller telemetry processing eliminates 99.2% of raw log storage costs.", bullet_style),
                Paragraph("• <b>Financial ROI:</b> 5.6x return on investment with payback period under 8 months.", bullet_style)
            ]
        }
    ]

    story = []

    for i, slide in enumerate(slides):
        story.append(Paragraph(slide["title"], slide_title_style))
        story.append(Paragraph(slide["subtitle"], slide_subtitle_style))
        story.append(HRFlowable(width="100%", thickness=1, color=CYAN, spaceAfter=12))

        for content_item in slide["content"]:
            story.append(content_item)

        if i < len(slides) - 1:
            story.append(PageBreak())

    def on_page(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(DARK_NAVY)
        canvas.rect(0, 0, doc.pagesize[0], doc.pagesize[1], fill=True, stroke=False)
        canvas.restoreState()

    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    print("Pitch Deck PDF Generated: " + pdf_filename)

if __name__ == "__main__":
    create_pitch_deck_pdf()
