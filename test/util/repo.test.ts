import nock from "nock";
import fc from "fast-check";
import getRepo from "../../src/util/repo";
import { buildRaw, buildRepo } from "../helper/repo";

// Mocking
import * as color from "../../src/util/colors";
jest.mock("../../src/util/colors");
const fetchColors = color.default as jest.Mock;
beforeEach(() => {
  fetchColors.mockReset();
});

afterAll(() => {
  nock.restore();
});
afterEach(() => {
  nock.cleanAll();
});

describe("getRepo()", () => {
  const slug = "thislooksfun/svelte-repo-card";

  it("should transform repo", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string(), // name
        fc.string(), // html_url
        fc.option(fc.webUrl()), // homepage
        fc.option(fc.string()), // description?
        fc.option(fc.string()), // language?
        fc.boolean(), // fork
        fc.option(
          // source?
          fc.record({
            full_name: fc.string(),
            html_url: fc.string(),
          })
        ),
        fc.integer(), // stargazers_count
        fc.integer(), // forks
        async (name, url, hp, desc, lang, frk, src, sg, frks) => {
          const hpr = hp ? hp : "";
          const raw = buildRaw(name, url, hpr, desc, lang, frk, src, sg, frks);
          const repo = buildRepo(name, url, hp, desc, lang, frk, src, sg, frks);

          if (lang != null) {
            fetchColors.mockResolvedValue({
              [lang]: { color: "the-color", url: "" },
            });
          }

          const n = nock("https://api.github.com/repos")
            .get(`/${slug}`)
            .reply(200, raw);

          await expect(getRepo(slug)).resolves.toStrictEqual(repo);

          n.done();
        }
      )
    );
  });

  it("should throw if fetch failed", async () => {
    const n = nock("https://api.github.com/repos").get(`/${slug}`).reply(404);

    await expect(getRepo(slug)).rejects.toThrow("Not Found");

    n.done();
  });
});
