<script lang="ts">
  import getRepo from "./util/repo";

  import Card from "./Card.svelte";
  import Repo from "./Repo.svelte";

  export let slug: string;
  $: url = `https://github.com/${slug}`;
  $: promise = getRepo(slug);
</script>

<Card>
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
