import type { Theme } from "../../types";
import fc from "fast-check";

function _randColor(): fc.Arbitrary<string> {
  return fc.hexaString({ minLength: 6, maxLength: 6 }).map(s => `#${s}`);
}

export function randomTheme(): fc.Arbitrary<Theme> {
  return fc.record({
    text: _randColor(),
    link: _randColor(),
    background: _randColor(),
    border: _randColor(),
  });
}
