#!/bin/bash
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
if [[ ("$VERCEL_GIT_COMMIT_REF" == "$BRANCH_MAIN" || "$VERCEL_GIT_COMMIT_REF" == "$BRANCH_STAGING") && !"$(git diff --quiet HEAD^ HEAD -- ./)" ]] ; then
  # Proceed with the build
    echo "✅ - Build can proceed"
  exit 1;
else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi