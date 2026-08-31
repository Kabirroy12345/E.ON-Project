import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def create_script_pdf():
    pdf_filename = "GridShield_AI_Presentation_Script.pdf"
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
    CYAN = colors.HexColor('#00d4ff')
    DARK_NAVY = colors.HexColor('#060b18')
    CARD_BG = colors.HexColor('#0a1020')
    WHITE = colors.HexColor('#ffffff')
    GREEN = colors.HexColor('#00ff88')
    RED = colors.HexColor('#ff0055')
    MUTED = colors.HexColor('#94a3b8')

    # Custom Paragraph Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=CYAN,
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=WHITE,
        spaceAfter=15
    )

    scene_heading_style = ParagraphStyle(
        'SceneHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=CYAN,
        spaceBefore=10,
        spaceAfter=4
    )

    cue_style = ParagraphStyle(
        'VisualCue',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=13,
        textColor=MUTED,
        spaceAfter=6
    )

    speaker_style = ParagraphStyle(
        'SpeakerLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=GREEN,
        spaceBefore=4,
        spaceAfter=2
    )

    dialogue_style = ParagraphStyle(
        'DialogueText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=WHITE,
        spaceAfter=8
    )

    meta_style = ParagraphStyle(
        'MetaText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=MUTED
    )

    story = []

    # Title Banner
    story.append(Paragraph("GRIDSHIELD AI — 5-MINUTE PRESENTATION SCRIPT", title_style))
    story.append(Paragraph("E.ON Innovation Challenge 2026 // Winning Pitch & Video Walkthrough", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=CYAN, spaceAfter=12))

    # Metadata Table
    meta_data = [
        [Paragraph("<b>Target Duration:</b> 5:00 (300s)", meta_style), Paragraph("<b>Live Demo:</b> e-on-project.vercel.app", meta_style)],
        [Paragraph("<b>Presenters:</b> Pulkit Agrawal & Kabir Roy", meta_style), Paragraph("<b>Repository:</b> Kabirroy12345/E.ON-Project", meta_style)]
    ]
    meta_table = Table(meta_data, colWidths=[270, 270])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('PADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOX', (0,0), (-1,-1), 0.5, CYAN)
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 14))

    # Scenes Content
    scenes = [
        {
            "title": "🎬 Scene 1: Introduction & The Grid Crisis (0:00 - 0:35)",
            "cue": "Visual Cue: Open on Landing Page (/). Mouse hovers over the glowing [ GRIDSHIELD AI ] title, showing the hacker decode animation. Scroll down past the 3D Holographic Weather Radar Globe and the Mouse-Tracking F1 Cyber Speedway Circuit.",
            "speaker": "[VOICEOVER - PULKIT AGRAWAL]",
            "dialogue": "\"Welcome everyone. I'm Pulkit Agrawal, Lead AI Engineer, alongside my co-developer Kabir Roy, Cybersecurity Lead for GridShield AI.<br/><br/>Energy Distribution Networks across Europe and the globe are undergoing a massive transition. DSOs like E.ON are connecting millions of customer-owned Distributed Energy Resources — solar inverters, EV chargers, and smart batteries. But this massive edge expansion creates a critical vulnerability: millions of unmanaged IoT endpoints directly wired into high-voltage substations.<br/><br/>This is GridShield AI — the first autonomous Purple SOC Architecture built specifically to protect energy distribution grids, substations, and over 9.6 million customer DER assets.\""
        },
        {
            "title": "🎬 Scene 2: Command Security Dashboard (/dashboard) (0:35 - 1:15)",
            "cue": "Visual Cue: Click LAUNCH COMMAND SOC button. Navigate to /dashboard. Show the live telemetry counters (9.6M Active DER Assets, DEFCON Status), click on the GraphSAGE GNN Blast Radius Subgraph, and trigger node inspection.",
            "speaker": "[VOICEOVER - KABIR ROY]",
            "dialogue": "\"Let's step inside our live Command Security SOC. Traditional SIEM platforms treat grid endpoints as isolated log sources. GridShield AI models the entire grid topology as a dynamic spatial graph using PyTorch GraphSAGE.<br/><br/>When an attacker attempts a coordinated compromised backfeed across distributed solar inverters, our 2-hop neighborhood graph sampling engine evaluates threat propagation across sub-graphs in under 140 milliseconds on GPU.<br/><br/>Notice our DEFCON threat indicator and real-time MITRE ATT&CK telemetry feed. GridShield doesn't just display alerts; it predicts multi-substation blast radius cascades before physical blackouts occur.\""
        },
        {
            "title": "🎬 Scene 3: Purple Team Agent (/purple-team) (1:15 - 2:00)",
            "cue": "Visual Cue: Click /purple-team in the sidebar. Click START RED TEAM ADVERSARY SIMULATION. Show the live terminal output firing SCADA Man-In-The-Middle and OCPP EV charger firmware attacks. Watch the Blue Team automated response isolate the affected substation gateway.",
            "speaker": "[VOICEOVER - KABIR ROY]",
            "dialogue": "\"Here in the Purple Team Operations Module, we pit an autonomous Red Team AI against our defensive Blue Team engine.<br/><br/>Our simulator executes over 50 specialized OT and IoT adversary vectors mapped directly to MITRE ATT&CK for ICS — including Modbus TCP register tampering, DNP3 unauthorized command injection, and malicious OCPP EV charger firmware flashes.<br/><br/>Watch as the Red Team attempts a substation MITM compromise: within milliseconds, the Blue Team engine correlates the anomalous voltage gradient, issues an automated air-gapped zero-trust containment policy, and preserves grid frequency stability without manual operator delay.\""
        },
        {
            "title": "🎬 Scene 4: Asset Shield & Edge TinyML (/asset-shield) (2:00 - 2:45)",
            "cue": "Visual Cue: Navigate to /asset-shield. Scroll through the 9.6M DER Asset Registry. Highlight the Cortex-M4 Microcontroller Benchmark Card (1.14ms latency, <800KB footprint) and the Cluster 5 Customer Incentive Framework.",
            "speaker": "[VOICEOVER - PULKIT AGRAWAL]",
            "dialogue": "\"DSOs face a severe privacy paradox: how do you monitor millions of residential devices without violating customer GDPR privacy?<br/><br/>GridShield solves this at the silicon level. We compile lightweight C++ neural weights using TensorFlow Lite Micro and CMSIS-NN, running directly on standard ARM Cortex-M4 smart meter gateways. Inference latency target is just 1.14 milliseconds, consuming less than 800 kilobytes of memory.<br/><br/>Raw customer telemetry never leaves the device. Only high-dimensional anomalous embeddings are sent upstream.<br/><br/>To drive enrollment, our Cluster 5 Incentive Framework offers residential customers dynamic grid tariff discounts and up to 25% cyber insurance rebates, securing over 90% voluntary adoption.\""
        },
        {
            "title": "🎬 Scene 5: Global Defense Matrix (/global-defense) (2:45 - 3:30)",
            "cue": "Visual Cue: Click /global-defense. Display the Global Grid Adaptability Matrix, showcasing compliance toggles for EU NIS2, US NERC-CIP, Australian AEMO, and ASEAN Microgrids. Click an Architectural FAQ accordion item.",
            "speaker": "[VOICEOVER - PULKIT AGRAWAL]",
            "dialogue": "\"GridShield AI is engineered for global scale beyond the European grid.<br/><br/>In our Global Defense Matrix, you can see how our architectural policies automatically map to EU NIS2 Article 21 mandatory technical measures, as well as US NERC-CIP-003/005/012 and FERC Order 2222.<br/><br/>Whether deployed on high-density urban grids in Germany, rooftop solar heavy feeders in Australia, or air-gapped island microgrids across Southeast Asia, GridShield's modular adapter layer normalizes diverse OT protocols seamlessly.\""
        },
        {
            "title": "🎬 Scene 6: Architecture & Impact TCO (/architecture & /impact) (3:30 - 4:15)",
            "cue": "Visual Cue: Briefly switch to /architecture to show the end-to-end Zero-Trust OT diagram, then navigate to /impact. Highlight the Itemized TCO Baseline Comparison Chart (€0.80/device/year vs €4.50 SIEM) and move the Interactive ROI Calculator slider.",
            "speaker": "[VOICEOVER - KABIR ROY]",
            "dialogue": "\"From an economic perspective, monitoring millions of DER endpoints with traditional cloud SIEM licensing is cost-prohibitive.<br/><br/>In our Impact & TCO Module, we outline our target cost baseline: by executing 99.2% of telemetry filtering on edge microcontrollers, GridShield reduces cloud ingestion overhead to just €0.80 per device per year at 500,000 device scale.<br/><br/>For a standard DSO managing 5 million endpoints, this delivers €18.4 million in annual operational savings and a 5.6x ROI compared to legacy centralized log collectors.\""
        },
        {
            "title": "🎬 Scene 7: Live AI Assistant & Winning Finale (4:15 - 5:00)",
            "cue": "Visual Cue: Return to /. Click the floating CYBER SOC ASSISTANT chatbot at the bottom right. Click the quick prompt \"GraphSAGE GNN Blast Radius\", showing instant bot reply with direct navigation link. Scroll down to the Cybersecurity & AI Engineering Leads card showing Pulkit Agrawal & Kabir Roy with the animated neural particle background.",
            "speaker": "[VOICEOVER - PULKIT AGRAWAL & KABIR ROY]",
            "dialogue": "[Pulkit]: \"Finally, operators can interact directly with our built-in Cyber SOC AI Assistant — available globally across all pages to query node health, trigger lockdown containment, or explain GNN blast radius metrics in natural language.\"<br/><br/>[Kabir]: \"GridShield AI brings together cutting-edge Graph Neural Networks, zero-leak edge computing, and proven economic incentives to protect the future of the smart energy grid.<br/><br/>Thank you to the E.ON Innovation Challenge team and judges. Our live production preview is available now at e-on-project.vercel.app. We welcome your questions!\""
        }
    ]

    for scene in scenes:
        scene_elements = []
        scene_elements.append(Paragraph(scene["title"], scene_heading_style))
        scene_elements.append(Paragraph(scene["cue"], cue_style))
        scene_elements.append(Paragraph(scene["speaker"], speaker_style))
        scene_elements.append(Paragraph(scene["dialogue"], dialogue_style))
        scene_elements.append(Spacer(1, 8))
        story.append(KeepTogether(scene_elements))

    # Page background / Canvas callback for sleek dark theme page background
    def on_page(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(DARK_NAVY)
        canvas.rect(0, 0, doc.pagesize[0], doc.pagesize[1], fill=True, stroke=False)
        canvas.restoreState()

    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    print("PDF Generated Successfully: " + pdf_filename)

if __name__ == "__main__":
    create_script_pdf()
