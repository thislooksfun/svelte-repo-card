/// <reference types="svelte2tsx/svelte-shims" />

export interface Theme {
  text: string;
  link: string;
  background: string;
  border: string;
}

export type ThemeType = "light" | "dark" | Theme;

export default class RepoCard extends Svelte2TsxComponent<{
  slug: string;
  theme?: ThemeType;
}> {}
