import nock from "nock";
import type { Colors } from "../../src/util/colors";

afterAll(() => {
  nock.restore();
});
afterEach(() => {
  nock.cleanAll();
  jest.resetModules();
});

describe("getColors()", () => {
  let getColors: () => Promise<Colors>;
  const colors = {
    Swift: { color: "#ffac45", url: "https://github.com/trending?l=Swift" },
  };

  beforeEach(() => {
    getColors = require("../../src/util/colors").default;
  });

  it("should pass through color values", async () => {
    const n = nock("https://raw.githubusercontent.com")
      .get("/ozh/github-colors/master/colors.json")
      .reply(200, colors);

    await expect(getColors()).resolves.toStrictEqual(colors);

    n.done();
  });

  it("should cache color values", async () => {
    const n = nock("https://raw.githubusercontent.com")
      .get("/ozh/github-colors/master/colors.json")
      .times(1)
      .reply(200, colors);

    await expect(getColors()).resolves.toStrictEqual(colors);
    n.done();
    await expect(getColors()).resolves.toStrictEqual(colors);
  });

  it("should throw if fetch failed", async () => {
    const n = nock("https://raw.githubusercontent.com")
      .get("/ozh/github-colors/master/colors.json")
      .reply(404);

    await expect(getColors()).rejects.toThrow("Not Found");

    n.done();
  });
});
