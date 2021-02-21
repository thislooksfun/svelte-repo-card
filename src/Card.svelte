<script lang="ts">
  import type { Theme } from "../types";

  export let theme: Theme | undefined = undefined;
  $: style =
    theme &&
    [
      `--svc-text-primary: ${theme.text}`,
      `--svc-text-link: ${theme.link}`,
      `--svc-background: ${theme.background}`,
      `--svc-border-color: ${theme.border}`,
    ].join("; ");
</script>

<div class="card" {style}>
  <slot />
</div>

<style lang="less">
  .card {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif, Apple Color Emoji, Segoe UI Emoji;
    border: 1px solid var(--svc-border-color, #e1e4e8);
    border-radius: 6px;
    background: var(--svc-background, #fff);
    padding: 1.25em;
    line-height: 1.5;
    color: var(--svc-text-primary, #586069);
  }
</style>
