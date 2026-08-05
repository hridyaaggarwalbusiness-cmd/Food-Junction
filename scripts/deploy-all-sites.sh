#!/usr/bin/env bash
# Builds every restaurant site and deploys all of them to Firebase Hosting
# in one `firebase deploy` call.
#
# Requires: `firebase` CLI installed and authenticated (`firebase login`,
# or FIREBASE_TOKEN set for a CI token from `firebase login:ci`).
#
# Usage: FIREBASE_PROJECT=food-junction-hgh ./scripts/deploy-all-sites.sh

set -euo pipefail
cd "$(dirname "$0")/.."

PROJECT="${FIREBASE_PROJECT:-food-junction-hgh}"

if ! command -v firebase >/dev/null 2>&1; then
  echo "firebase CLI not found. Install it first: npm install -g firebase-tools" >&2
  exit 1
fi

echo "== 1/4: Generating firebase.json + site IDs from sites/index.json =="
node scripts/gen-firebase-config.mjs

echo
echo "== 2/4: Building all restaurant sites =="
node scripts/build-all-sites.mjs

echo
echo "== 3/4: Creating Firebase Hosting sites under project '$PROJECT' =="
echo "(Firebase's default quota is ~36 hosting sites per project — if you"
echo " have more restaurants than that, expect create calls to start"
echo " failing partway through; those will need a second Firebase project.)"
echo

FAILED_CREATES=()
while IFS= read -r site_id; do
  echo "  hosting:sites:create $site_id"
  if ! firebase hosting:sites:create "$site_id" --project "$PROJECT" >/tmp/hosting-create.log 2>&1; then
    if grep -qi "already exists" /tmp/hosting-create.log; then
      echo "    already exists, continuing"
    else
      echo "    FAILED — see /tmp/hosting-create.log"
      FAILED_CREATES+=("$site_id")
    fi
  fi
done < <(jq -r '.[]' sites/firebase-site-ids.json)

if [ "${#FAILED_CREATES[@]}" -gt 0 ]; then
  echo
  echo "WARNING: ${#FAILED_CREATES[@]} site(s) could not be created (likely quota):"
  printf '  - %s\n' "${FAILED_CREATES[@]}"
  echo "These will be skipped by the deploy step below."
fi

echo
echo "== 4/4: Deploying all hosting targets in one go =="
firebase deploy --only hosting --project "$PROJECT"

echo
echo "Done. Each site is live at https://<site-id>.web.app/"
