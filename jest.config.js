module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
    "^.+\\.svelte$": ["svelte-jester", { preprocess: true }],
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["js", "mjs", "ts"],
  transformIgnorePatterns: [],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "./test/polyfill-fetch",
  ],
};
