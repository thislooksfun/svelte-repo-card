import type { MatcherFunction } from "@testing-library/svelte";

// Match based on the node's textContent, rather than the default content str.
export function mtc(str: string): MatcherFunction {
  const hasText = (node: Element) => node.textContent === str;
  return (_, node) => {
    if (!node) return false;
    return hasText(node) && !Array.from(node.children).some(hasText);
  };
}

export function resetDOM() {
  document.body.innerHTML = "";
}
