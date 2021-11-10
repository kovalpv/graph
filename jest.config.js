module.exports = {
  transform: {
    "^.+\\.tsx?$": [
      "esbuild-jest",
      {
        sourcemap: true,
        jsx: "react",
        loaders: {
          ".spec.ts": "tsx",
        },
      },
    ],
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/types/"],
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-config",
    "interfaces",
    "jestGlobalMocks.ts",
    ".module.ts",
    "<rootDir>/src/app/main.ts",
    ".mock.ts",
    "index.ts",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFiles: [],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/config/mock/styleMock.ts",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/config/mock/fileMock.ts",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/node_modules/",
    "!**/index.ts",
    "!/registerServiceWorker.ts",
    "!**/lcov-report/**",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  coverageReporters: ["json-summary", "text", "lcov", "jest-badges"],
  testEnvironment: "jest-environment-jsdom",
};
