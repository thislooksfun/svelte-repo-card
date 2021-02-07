import nock from "nock";

afterAll(() => {
  nock.restore();
});
afterEach(() => {
  nock.cleanAll();
  jest.resetModules();
});

describe("get()", () => {
  let get: <T>(url: string) => Promise<T>;

  beforeEach(() => {
    get = require("../../src/util/get").default;
  });

  it("should pass data as json", async () => {
    const data = { hello: "world" };

    const n = nock("https://thislooks.fun").get("/hello").reply(200, data);

    const res: Promise<typeof data> = get("https://thislooks.fun/hello");
    await expect(res).resolves.toStrictEqual(data);

    n.done();
  });

  it("should throw if fetch failed", async () => {
    const n = nock("https://thislooks.fun").get("/hello").reply(404);

    const res: Promise<void> = get("https://thislooks.fun/hello");
    await expect(res).rejects.toThrow("Not Found");

    n.done();
  });
});
