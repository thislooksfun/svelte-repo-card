import get from "./get";

export type Emoji = { [key: string]: string };

let _emoji: Emoji | undefined;
export default async function getEmoji(): Promise<Emoji> {
  if (!_emoji) {
    _emoji = await get<Emoji>("https://api.github.com/emojis");
  }

  return _emoji;
}

// TODO: Add helper to add fallback emoji
// BODY: This is non-trivial because the emoji are added as inline <img> tags,
// BODY: which therefore requires inserting HTML. Ideally this would sanatize
// BODY: the incoming description before inserting the <img>s, but that requires
// BODY: adding helper libraries (like DOMPurify), which is more library than
// BODY: some may want. It's likely that the API returns sanitized values, but I
// BODY: don't want to count on it, just in case.
//
// GitHub embeds emoji like so (as of 2021/02/05):
// <g-emoji
//   class="g-emoji"
//   alias="microbe"
//   fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f9a0.png"
//   >🦠</g-emoji
// >
//
// Reference implementation (from Tarptaeya/repo-card):
//   data.description = (data.description || "").replace(
//     /:\w+:/g,
//     function (match) {
//       const name = match.substring(1, match.length - 1);
//       const emoji = emojis[name];
//
//       if (emoji) {
//         return `<span><img src="${emoji}" style="width: 1rem; height: 1rem; vertical-align: -0.2rem;"></span>`;
//       }
//
//       return match;
//     }
//   );
