module.exports = {
  default: [
    'tests/e2e/features/**/*.feature',
    '--require-module ts-node/register',
    '--require tests/rest/v1/**/*.steps.ts',
    `--format-options '{"snippetInterface": "synchronous"}'`,
  ].join(' '),
};
