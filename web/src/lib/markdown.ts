import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";

const options = { extensions: [gfm()], htmlExtensions: [gfmHtml()] };

// micromark escapes raw HTML and filters unsafe URL protocols by default.
export function renderMarkdown(source: string): string {
  return micromark(source, options);
}
