// Polyfill fetch when testing so that util/get.ts works.
global.fetch = global.fetch || require("node-fetch");
