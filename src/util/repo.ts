import get from "./get";
import getColors from "./colors";

export interface RawRepo {
  name: string;
  html_url: string;
  description?: string;
  language?: string;
  fork: boolean;
  source?: {
    full_name: string;
    html_url: string;
  };
  stargazers_count: number;
  forks: number;
}

export interface Repo {
  name: string;
  url: string;
  isFork: boolean;
  description?: string;
  sourceUrl?: string;
  sourceName?: string;
  language?: string;
  langColor?: string;
  stars: number;
  forks: number;
}

async function transform(repo: RawRepo): Promise<Repo> {
  const colors = await getColors();

  let out: Repo = {
    name: repo.name,
    url: repo.html_url,
    isFork: repo.fork,
    stars: repo.stargazers_count,
    forks: repo.forks,
  };

  if (repo.description != null) out.description = repo.description;
  if (repo.source != null) {
    out.sourceName = repo.source.full_name;
    out.sourceUrl = repo.source.html_url;
  }
  if (repo.language != null) {
    out.language = repo.language;
    out.langColor = colors[repo.language].color;
  }

  return out;
}

export default async function getRepo(slug: string): Promise<Repo> {
  const repo: RawRepo = await get(`https://api.github.com/repos/${slug}`);
  return await transform(repo);
}
