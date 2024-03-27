module.exports = {
  default: [
    'tests-e2e/features/**/*.feature',
    '--require-module ts-node/register',
    '--require tests-e2e/features/step-definitions/**/*.ts',
    `--format-options '{"snippetInterface": "synchronous"}'`,
  ].join(' '),
};
