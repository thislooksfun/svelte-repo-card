import type { Repo, RawRepo } from "../../src/util/repo";
import fc from "fast-check";

export function buildRaw(
  name: string,
  html_url: string,
  homepage: string,
  desc: string | null,
  lang: string | null,
  fork: boolean,
  src: { full_name: string; html_url: string } | null,
  stargazers_count: number,
  forks: number
): RawRepo {
  let raw: RawRepo = {
    name,
    html_url,
    homepage,
    fork,
    stargazers_count,
    forks,
  };
  if (desc != null) raw.description = desc;
  if (lang != null) raw.language = lang;
  if (src != null) raw.source = src;

  return raw;
}

export function buildRepo(
  name: string,
  url: string,
  homepage: string | null,
  desc: string | null,
  lang: string | null,
  isFork: boolean,
  src: { full_name: string; html_url: string } | null,
  stars: number,
  forks: number
): Repo {
  let repo: Repo = { name, url, isFork, stars, forks };
  if (homepage != null) repo.homepage = homepage;
  if (desc != null) repo.description = desc;
  if (lang != null) {
    repo.language = lang;
    repo.langColor = "the-color";
  }
  if (src != null) {
    repo.sourceUrl = src.html_url;
    repo.sourceName = src.full_name;
  }

  return repo;
}

function _randRepoOwn(): fc.Arbitrary<Repo> {
  return fc.record(
    {
      name: fc.string(),
      url: fc.webUrl(),
      homepage: fc.webUrl(),
      description: fc.string(),
      language: fc.string(),
      isFork: fc.constant(false),
      stars: fc.integer(),
      forks: fc.integer(),
    },
    { requiredKeys: ["name", "url", "isFork", "stars", "forks"] }
  );
}

function _randRepoFork(): fc.Arbitrary<Repo> {
  return fc.record(
    {
      name: fc.string(),
      url: fc.webUrl(),
      homepage: fc.webUrl(),
      description: fc.string(),
      language: fc.string(),
      isFork: fc.constant(true),
      sourceName: fc.string(),
      sourceUrl: fc.webUrl(),
      stars: fc.integer(),
      forks: fc.integer(),
    },
    {
      requiredKeys: [
        "name",
        "url",
        "isFork",
        "sourceName",
        "sourceUrl",
        "stars",
        "forks",
      ],
    }
  );
}

export function randomRepo(): fc.Arbitrary<Repo> {
  return fc.oneof(_randRepoOwn(), _randRepoFork());
}
