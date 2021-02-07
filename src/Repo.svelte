<script lang="ts">
  import RepoIcon from "./icon/Repo.svelte";
  import StarIcon from "./icon/Star.svelte";
  import ForkIcon from "./icon/Fork.svelte";

  export let name: string;
  export let url: string;
  export let isFork: boolean;
  export let description: string | undefined = undefined;
  export let sourceUrl: string | undefined = undefined;
  export let sourceName: string | undefined = undefined;
  export let language: string | undefined = undefined;
  export let langColor: string | undefined = undefined;
  export let stars: number;
  export let forks: number;
</script>

<div class="repo">
  <div class="header">
    <div class="name icon-container">
      <RepoIcon />
      <a href={url}>{name}</a>
    </div>

    {#if isFork}
      <div class="small">
        Forked from <a href={sourceUrl}>{sourceName}</a>
      </div>
    {/if}
  </div>

  {#if description}
    <div>
      {description}
    </div>
  {/if}

  <div class="meta small">
    {#if language}
      <div class="lang">
        <span class="lang-color" style="background-color: {langColor};" />
        <span>{language}</span>
      </div>
    {/if}

    {#if stars > 0}
      <div class="icon-container">
        <StarIcon />
        &nbsp; <span>{stars}</span>
      </div>
    {/if}

    {#if forks > 0}
      <div class="icon-container">
        <ForkIcon />
        &nbsp; <span>{forks}</span>
      </div>
    {/if}
  </div>
</div>

<style lang="less">
  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }

  .repo {
    text-align: start;
    color: #586069;
    font-size: 1em;
  }

  .header {
    margin-bottom: 0.6em;
  }

  .name {
    font-weight: 600;
    color: #0366d6;

    a {
      margin-left: 0.35em;
    }
  }

  .small {
    font-size: 0.85em;
  }

  .meta {
    display: flex;
    margin-top: 0.6em;

    & > :not(:last-child) {
      margin-right: 1em;
    }

    .lang {
      position: relative;
    }

    .lang-color {
      position: relative;
      display: inline-block;
      width: 1em;
      height: 1em;
      bottom: -0.15em;
      border-radius: 100%;
    }
  }

  .icon-container {
    display: flex;
    align-items: center;

    :global(svg) {
      width: 1em;
      fill: #586069;
    }
  }
</style>
