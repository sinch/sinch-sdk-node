#!/bin/bash

# Although generated as JSON, the audit file put all vulnerabilities at the top level
# The following lines will put all the vulnerabilities in a array
echo '{"vulnerabilities": [' > audit-report.json
awk 'NR > 1 {print ","} {print}' audit-report.txt >> audit-report.json
echo ']}' >> audit-report.json

# Filter JSON array to remove jest and lerna's transitive dependencies as these dependencies are not used at runtime
jq '.vulnerabilities |= map(select(.data.resolution.path | type == "string" and (startswith("lerna") or startswith("jest") or startswith("@types/jest") or startswith("babel-jest")) | not))' audit-report.json > audit-report-filtered.json

# Fail the build if filtered JSON array contains audit advisories
if [ "$(jq '.vulnerabilities[] | select(.type == "auditAdvisory") | .type' audit-report-filtered.json | wc -l)" -gt 0 ]; then
  echo "Audit advisories found. Printing details:"
  jq '.vulnerabilities[] | select(.type == "auditAdvisory")' audit-report-filtered.json
  echo "Failing the build."
  exit 1
else
  echo "No audit advisories found."
fi
