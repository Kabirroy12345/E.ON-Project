import os
import zipfile
import shutil

def package_cluster_zip():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    zip_name = "Cluster_4_and_5_IT_Security_GridShield_AI.zip"
    output_zip_path = os.path.join(base_dir, zip_name)
    
    print(f"[*] Creating Cluster-Structured Submission ZIP: {output_zip_path}", flush=True)

    # Core source documents
    pitch_deck = os.path.join(base_dir, "GridShield_AI_Pitch_Deck.pdf")
    screenshots_dossier = os.path.join(base_dir, "GridShield_AI_Prototype_Screenshots.pdf")
    pres_script = os.path.join(base_dir, "GridShield_AI_Presentation_Script.pdf")
    whitepaper = os.path.join(base_dir, "public", "GridShield_AI_Zero_to_Hero_Report.pdf")

    # Temp structure to zip
    temp_dir = os.path.join(base_dir, "temp_cluster_submission")
    if os.path.exists(temp_dir):
        shutil.rmtree(temp_dir)
    os.makedirs(temp_dir, exist_ok=True)

    # Create Cluster 4 folder
    c4_dir = os.path.join(temp_dir, "Cluster_4_IT_Security_Protection_Systems")
    os.makedirs(c4_dir, exist_ok=True)
    shutil.copy2(pitch_deck, os.path.join(c4_dir, "Cluster_4_Pitch_Deck_Purple_Team_SOC_GridShield_AI.pdf"))
    shutil.copy2(screenshots_dossier, os.path.join(c4_dir, "Cluster_4_Prototype_Screenshots_Purple_SOC_and_GNN.pdf"))
    if os.path.exists(whitepaper):
        shutil.copy2(whitepaper, os.path.join(c4_dir, "Cluster_4_Technical_Whitepaper_and_NIS2_Architecture.pdf"))

    # Create Cluster 5 folder
    c5_dir = os.path.join(temp_dir, "Cluster_5_IT_Security_Customer_Asset_Protection")
    os.makedirs(c5_dir, exist_ok=True)
    shutil.copy2(pitch_deck, os.path.join(c5_dir, "Cluster_5_Pitch_Deck_Customer_DER_TinyML_GridShield_AI.pdf"))
    shutil.copy2(screenshots_dossier, os.path.join(c5_dir, "Cluster_5_Prototype_Screenshots_DER_Shield_and_Incentives.pdf"))
    if os.path.exists(whitepaper):
        shutil.copy2(whitepaper, os.path.join(c5_dir, "Cluster_5_Technical_Specification_1.14ms_TinyML_and_GDPR.pdf"))

    # Global Deliverables folder
    global_dir = os.path.join(temp_dir, "Master_Deliverables_and_Verification")
    os.makedirs(global_dir, exist_ok=True)
    shutil.copy2(pitch_deck, os.path.join(global_dir, "GridShield_AI_Pitch_Deck_12_Slides.pdf"))
    shutil.copy2(screenshots_dossier, os.path.join(global_dir, "GridShield_AI_Prototype_Visual_Evidence_24_Pages.pdf"))
    shutil.copy2(pres_script, os.path.join(global_dir, "GridShield_AI_5_Minute_Video_Pitch_Script.pdf"))

    # Submission Manifest
    readme_path = os.path.join(temp_dir, "README_Submission_Manifest.txt")
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write("===============================================================================\n")
        f.write("E.ON INNOVATION CHALLENGE 2026 // PROBLEM STATEMENT 2: IT SECURITY\n")
        f.write("SUBMISSION PACKAGE FOR CLUSTER 4 & CLUSTER 5\n")
        f.write("===============================================================================\n\n")
        f.write("PROJECT NAME: GridShield AI\n")
        f.write("AUTHORS: Pulkit Agrawal (Lead AI Engineer) & Kabir Roy (Cybersecurity Lead)\n")
        f.write("LIVE PRODUCTION URL: https://e-on-project.vercel.app/\n")
        f.write("GITHUB REPOSITORY: https://github.com/Kabirroy12345/E.ON-Project (Branch: v2-global-edition)\n\n")
        f.write("SELECTED CLUSTERS:\n")
        f.write("1. Cluster 4: IT Security - Improvement of protection systems\n")
        f.write("   - Folder: Cluster_4_IT_Security_Protection_Systems/\n")
        f.write("   - Focus: Autonomous Purple Team SOC, Red vs Blue AI Loop, GraphSAGE 2-hop GNN (<140ms),\n")
        f.write("            January 2026 Berlin Cable Bridge Sabotage mitigation in <1.83s.\n\n")
        f.write("2. Cluster 5: IT Security - Protection schemes for customer-based assets\n")
        f.write("   - Folder: Cluster_5_IT_Security_Customer_Asset_Protection/\n")
        f.write("   - Focus: Decentralized 1.14ms TinyML on Cortex-M4 (<800KB flash, 118KB RAM), 100% GDPR\n")
        f.write("            zero-leakage, 4-pillar customer incentive model (4-8% tariff rebate, 25% insurance).\n\n")
        f.write("3. Master Deliverables:\n")
        f.write("   - Folder: Master_Deliverables_and_Verification/\n")
        f.write("   - Contains Complete 12-slide Pitch Deck, 24-page Visual Evidence Dossier, and 5-min Script.\n")
        f.write("===============================================================================\n")

    # Zip the temp directory
    with zipfile.ZipFile(output_zip_path, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as zipf:
        for root, dirs, files in os.walk(temp_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, temp_dir)
                zipf.write(file_path, arcname=arcname)

    # Clean up temp
    shutil.rmtree(temp_dir)

    zip_size_mb = os.path.getsize(output_zip_path) / (1024 * 1024)
    print(f"[+] Successfully created cluster submission ZIP!", flush=True)
    print(f"    - Archive Name: {zip_name}", flush=True)
    print(f"    - Size: {zip_size_mb:.2f} MB", flush=True)
    print(f"    - Location: {output_zip_path}", flush=True)

    # Copy to artifact and public
    artifact_dir = r"C:\Users\HP\.gemini\antigravity\brain\2f92fe83-fd22-49f8-81f2-86fb5d663253"
    artifact_zip = os.path.join(artifact_dir, zip_name)
    shutil.copy2(output_zip_path, artifact_zip)

    public_zip = os.path.join(base_dir, "public", zip_name)
    shutil.copy2(output_zip_path, public_zip)

    # Also duplicate to a generic cluster-named file in case of exact matching
    alt_name = "Cluster4_Cluster5_IT_Security_Submission.zip"
    shutil.copy2(output_zip_path, os.path.join(base_dir, alt_name))
    shutil.copy2(output_zip_path, os.path.join(artifact_dir, alt_name))
    shutil.copy2(output_zip_path, os.path.join(base_dir, "public", alt_name))
    print(f"[+] Also created alias: {alt_name}", flush=True)

if __name__ == "__main__":
    package_cluster_zip()
