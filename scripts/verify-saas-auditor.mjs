import fs from 'node:fs';

const file = 'src/pages/SaasMetricAuditor.tsx';
const source = fs.readFileSync(file, 'utf8');

const checks = [
  ['const metricInputs', /const\s+metricInputs\b/g, 1],
  ['const ui = isHebrew', /const\s+ui\s*=\s*isHebrew\b/g, 1],
  ['const checklistBonus', /const\s+checklistBonus\b/g, 1],
  ['const readinessScore', /const\s+readinessScore\b/g, 1],
];

const failures = [];
for (const [label, pattern, expected] of checks) {
  const count = (source.match(pattern) || []).length;
  if (count !== expected) failures.push(`${label}: expected ${expected}, found ${count}`);
}

if (failures.length) {
  console.error('[verify-saas-auditor] Duplicate/broken declarations detected:');
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}

console.log('[verify-saas-auditor] OK');
