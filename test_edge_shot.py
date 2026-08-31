import sys
import os
import asyncio
from playwright.async_api import async_playwright

async def test():
    print("[*] Starting playwright...", flush=True)
    async with async_playwright() as p:
        print("[*] Launching msedge...", flush=True)
        try:
            browser = await p.chromium.launch(channel="msedge", headless=True)
            print("[+] Edge launched successfully!", flush=True)
            page = await browser.new_page(viewport={"width": 1920, "height": 1080})
            print("[*] Navigating to http://localhost:5173/...", flush=True)
            await page.goto("http://localhost:5173/", wait_until="load")
            await asyncio.sleep(2)
            out_file = os.path.join(os.getcwd(), "screenshots", "test_shot.png")
            await page.screenshot(path=out_file)
            print(f"[+] Saved test screenshot to {out_file} ({os.path.getsize(out_file)} bytes)", flush=True)
            await browser.close()
        except Exception as e:
            print(f"[-] Error: {e}", flush=True)

if __name__ == "__main__":
    asyncio.run(test())
