import nock from "nock";
import type { Emoji } from "../../src/util/emoji";

afterAll(() => {
  nock.restore();
});
afterEach(() => {
  nock.cleanAll();
  jest.resetModules();
});

describe("getEmoji()", () => {
  let getEmoji: () => Promise<Emoji>;
  const emoji = {
    x: "https://github.githubassets.com/images/icons/emoji/unicode/274c.png?v8",
  };

  beforeEach(() => {
    getEmoji = require("../../src/util/emoji").default;
  });

  it("should pass through emoji", async () => {
    const n = nock("https://api.github.com").get("/emojis").reply(200, emoji);

    await expect(getEmoji()).resolves.toStrictEqual(emoji);

    n.done();
  });

  it("should cache emoji", async () => {
    const n = nock("https://api.github.com")
      .get("/emojis")
      .times(1)
      .reply(200, emoji);

    await expect(getEmoji()).resolves.toStrictEqual(emoji);
    n.done();
    await expect(getEmoji()).resolves.toStrictEqual(emoji);
  });

  it("should throw if fetch failed", async () => {
    const n = nock("https://api.github.com").get("/emojis").reply(404);

    await expect(getEmoji()).rejects.toThrow("Not Found");

    n.done();
  });
});
