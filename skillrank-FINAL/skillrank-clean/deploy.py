import subprocess
import sys
import os

def run(cmd):
    print(f">>> {cmd}")
    result = subprocess.run(cmd, shell=True)
    if result.returncode != 0:
        print(f"ERROR running: {cmd}")
        sys.exit(1)

print("\n=============================")
print("  SkillRank — Auto Deployer  ")
print("=============================\n")

# Check git is installed
result = subprocess.run("git --version", shell=True, capture_output=True)
if result.returncode != 0:
    print("Git is not installed.")
    print("Download it from: https://git-scm.com/downloads")
    print("Install it, then run this script again.")
    sys.exit(1)

print("Git found ✓\n")

# Get GitHub details
print("Enter your GitHub username (e.g. johnsmith):")
username = input("> ").strip()

print("\nEnter your repo name (e.g. skillrank-website):")
repo = input("> ").strip()

print("\nEnter your GitHub Personal Access Token:")
print("(Get one from: github.com/settings/tokens → Generate new token → tick 'repo' → Generate)")
token = input("> ").strip()

repo_url = f"https://{username}:{token}@github.com/{username}/{repo}.git"

print("\nSetting up git...")
run("git init")
run("git checkout -b main")
run('git config user.email "deploy@skillrank.in"')
run('git config user.name "SkillRank Deploy"')

print("\nAdding all files...")
run("git add -A")
run('git commit -m "SkillRank full site deploy"')

print(f"\nPushing to github.com/{username}/{repo}...")
run(f"git remote remove origin 2>nul || true")
run(f"git remote add origin {repo_url}")
run("git push -u origin main --force")

print("\n=============================")
print("  SUCCESS! Code is on GitHub ")
print("=============================")
print(f"\nGo to vercel.com → Add New Project → Import {repo} → Deploy")
print("Your site will be live in 60 seconds!\n")
