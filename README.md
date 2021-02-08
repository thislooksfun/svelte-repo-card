# svelte-repo-card

<p align="center">
  <a href="https://github.com/semantic-release/semantic-release"
    ><img
      alt="semantic release"
      src="https://flat.badgen.net/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80/semantic%20release/e10079"
    /></a
  >
  <a href="https://github.com/thislooksfun/svelte-repo-card/releases/latest"
    ><img
      alt="latest release"
      src="https://flat.badgen.net/github/release/thislooksfun/svelte-repo-card"
    /></a
  >
  <a href="https://github.com/thislooksfun/svelte-repo-card/releases"
    ><img
      alt="latest stable release"
      src="https://flat.badgen.net/github/release/thislooksfun/svelte-repo-card/stable"
    /></a
  >
  <a href="#"
    ><img
      alt="checks status"
      src="https://flat.badgen.net/github/checks/thislooksfun/svelte-repo-card"
    /></a
  >
  <a href="https://github.com/thislooksfun/svelte-repo-card/blob/master/LICENSE"
    ><img
      alt="license"
      src="https://flat.badgen.net/github/license/thislooksfun/svelte-repo-card"
    /></a
  >
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/svelte-repo-card?activeTab=versions"
    ><img
      alt="npm version"
      src="https://flat.badgen.net/npm/v/svelte-repo-card"
    /></a
  >
  <a href="https://github.com/thislooksfun/svelte-repo-card/tree/master/types"
    ><img
      alt="npm types"
      src="https://flat.badgen.net/npm/types/svelte-repo-card"
    /></a
  >
  <a href="https://www.npmjs.com/package/svelte-repo-card"
    ><img
      alt="weekly npm downloads"
      src="https://flat.badgen.net/npm/dw/svelte-repo-card"
    /></a
  >
  <a href="https://www.npmjs.com/package/svelte-repo-card?activeTab=dependents"
    ><img
      alt="npm dependents"
      src="https://flat.badgen.net/npm/dependents/svelte-repo-card"
    /></a
  >
</p>

A simple GitHub repo card component based on [Tarptaeya/repo-card](https://github.com/Tarptaeya/repo-card).

## Installation

```
npm i -D svelte-repo-card
```

## Usage

<!-- TODO: pending sveltejs/prettier-plugin-svelte#202 -->
<!-- prettier-ignore -->
```svelte
<script>
  import RepoCard from "svelte-repo-card";
</script>

<RepoCard slug="<user>/<repo>" />
```

It's that simple!

## Examples

1. `<RepoCard slug="thislooksfun/svelte-repo-card" />`: ![example screenshot](./docs/images/example-svelte-repo-card.png)
1. `<RepoCard slug="thislooksfun/SwiftlySearch" />`: ![example screenshot](./docs/images/example-swiftlysearch.png)
