import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '<rootDir>/coverage/',
  coveragePathIgnorePatterns: ['node_modules', '<rootDir>/packages/**/tests'],
  projects: [
    {
      displayName: 'SDK-Client',
      testMatch: ['<rootDir>/packages/sdk-client/tests/**/*.test.ts'],
      coveragePathIgnorePatterns: ['node_modules', 'tests'],
    },
    {
      displayName: 'Numbers',
      testMatch: ['<rootDir>/packages/numbers/tests/**/*.test.ts'],
      coveragePathIgnorePatterns: ['node_modules', 'tests'],
    },
    {
      displayName: 'SMS',
      testMatch: ['<rootDir>/packages/sms/tests/**/*.test.ts'],
      coveragePathIgnorePatterns: ['node_modules', 'tests'],
    },
    {
      displayName: 'Verification',
      testMatch: ['<rootDir>/packages/verification/tests/**/*.test.ts'],
      coveragePathIgnorePatterns: ['node_modules', 'tests'],
    },
  ],
  moduleNameMapper: {
    '@sinch/(.+)': '<rootDir>/packages/$1/src',
  },
};

export default config;
