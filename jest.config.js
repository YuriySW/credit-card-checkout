module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': ['babel-jest', {configFile: './.babelrc.test.js'}],
  },
  transformIgnorePatterns: ['node_modules/(?!(redom)/)'],
  collectCoverageFrom: [
    'script/modules/validation.js',
    '!**/node_modules/**',
    '!**/.parcel-cache/**',
    '!**/dist/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: ['**/script/modules/**/*.test.js'],
};
