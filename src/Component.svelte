<script lang="ts">
  import type { Theme, ThemeType } from "../types";

  import getRepo from "./util/repo";

  import Card from "./Card.svelte";
  import Repo from "./Repo.svelte";

  export let slug: string;
  $: url = `https://github.com/${slug}`;
  $: promise = getRepo(slug);

  const lightTheme: Theme = {
    text: "#586069",
    link: "#0366d6",
    background: "#ffffff",
    border: "#e1e4e8",
  };

  const darkTheme: Theme = {
    text: "#a09f9d",
    link: "#0366d6",
    background: "#000000",
    border: "#1e1b17",
  };

  export let theme: ThemeType | undefined = undefined;
  $: _theme = (() => {
    switch (theme) {
      case "light":
        return lightTheme;
      case "dark":
        return darkTheme;
      default:
        return theme;
    }
  })();
</script>

<Card theme={_theme}>
  {#await promise}
    <span data-testid="loading">
      Loading card for <a href={url}>{slug}</a>...
    </span>
  {:then repo}
    <Repo {...repo} />
  {:catch e}
    <span data-testid="failed">
      Failed to load card for <a href={url}>{slug}</a>.
    </span>
    {#if e && e.message}
      <span data-testid="errmsg">{e.message}</span>
    {/if}
  {/await}
</Card>
