import get from "./get";

export interface Color {
  color: string;
  url: string;
}
export type Colors = { [key: string]: Color };

let _colors: Colors | undefined;
export default async function getColors(): Promise<Colors> {
  if (!_colors) {
    _colors = await get<Colors>(
      "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json"
    );
  }

  return _colors;
}
