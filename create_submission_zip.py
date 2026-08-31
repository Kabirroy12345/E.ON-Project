import os
import zipfile
import sys

def create_project_zip():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    zip_name = "GridShield_AI_EON_Hackathon_Submission.zip"
    output_zip_path = os.path.join(base_dir, zip_name)
    
    # Directories and patterns to ignore
    EXCLUDE_DIRS = {
        'node_modules', '.git', '.vscode', '.idea', '__pycache__', 
        'dist', '.venv', 'venv', '.system_generated', '.user_uploaded'
    }
    EXCLUDE_EXTS = {'.pyc', '.tmp', '.log'}
    EXCLUDE_FILES = {zip_name}

    print(f"[*] Packaging GridShield AI project from: {base_dir}", flush=True)
    print(f"[*] Target Archive: {output_zip_path}", flush=True)
    
    total_files = 0
    total_bytes = 0

    with zipfile.ZipFile(output_zip_path, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as zipf:
        for root, dirs, files in os.walk(base_dir):
            # Modify dirs in-place to skip excluded directories
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith('.')]
            
            for file in files:
                if file in EXCLUDE_FILES or any(file.endswith(ext) for ext in EXCLUDE_EXTS):
                    continue
                
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, base_dir)
                
                zipf.write(file_path, arcname=os.path.join("GridShield_AI", rel_path))
                total_files += 1
                total_bytes += os.path.getsize(file_path)

    zip_size_mb = os.path.getsize(output_zip_path) / (1024 * 1024)
    print(f"[+] Successfully created verified submission archive!", flush=True)
    print(f"    - Total Files Packaged: {total_files}", flush=True)
    print(f"    - Uncompressed Data: {total_bytes / (1024 * 1024):.2f} MB", flush=True)
    print(f"    - Compressed ZIP Size: {zip_size_mb:.2f} MB", flush=True)
    print(f"    - Output Path: {output_zip_path}", flush=True)

    # Also copy to artifact directory
    artifact_dir = r"C:\Users\HP\.gemini\antigravity\brain\2f92fe83-fd22-49f8-81f2-86fb5d663253"
    artifact_zip = os.path.join(artifact_dir, zip_name)
    with open(output_zip_path, 'rb') as src, open(artifact_zip, 'wb') as dst:
        dst.write(src.read())
    print(f"[+] Synced to Artifact Directory: {artifact_zip}", flush=True)

    # Also copy to public/ directory for web download
    public_zip = os.path.join(base_dir, "public", zip_name)
    with open(output_zip_path, 'rb') as src, open(public_zip, 'wb') as dst:
        dst.write(src.read())
    print(f"[+] Synced to Public Web Directory: {public_zip}", flush=True)

if __name__ == "__main__":
    create_project_zip()
