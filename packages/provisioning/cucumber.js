module.exports = {
    default: [
      'tests/e2e/features/**/*.feature',
      '--require tests/rest/v1/**/*.steps.ts',
    ].join(' '),
  };
  