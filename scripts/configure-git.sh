#!/usr/bin/env bash
# configure-git.sh
#
# Sets the global Git user identity so that commits are correctly attributed
# to the repository owner and appear in the GitHub contributions graph.
#
# Usage:
#   bash scripts/configure-git.sh
#
# This script is SAFE and IDEMPOTENT:
#   - It only changes the two git config keys listed below.
#   - Running it multiple times has no side-effects.
#   - Nothing is committed or pushed by this script.
#
# NOTE: This must be run LOCALLY on your machine. Global git configuration
# cannot be set via repository code that runs on remote servers.

set -euo pipefail

GIT_USER_NAME="Sezer Yiğit"
GIT_USER_EMAIL="sezeryigit.tr@gmail.com"

echo "Configuring global Git identity..."

git config --global user.name  "$GIT_USER_NAME"
git config --global user.email "$GIT_USER_EMAIL"

echo ""
echo "Done! Global Git config has been set:"
echo "  user.name  = $(git config --global user.name)"
echo "  user.email = $(git config --global user.email)"
echo ""
echo "Your commits will now be linked to your GitHub account."
echo "Make sure '$GIT_USER_EMAIL' is a verified email in your GitHub Settings."
