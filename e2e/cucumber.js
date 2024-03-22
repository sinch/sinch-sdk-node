const common = [
  'numbers/features/**/*.feature',
  '--require-module ts-node/register', // typescript cucumber
  '--require numbers/features/step-definitions/**/*.ts',
  '--format progress-bar',
  `--format-options '{"snippetInterface": "synchronous"}'`,
].join(' ');

module.exports = {
  default: common,
};
