import { test } from "node:test";
import assert from "node:assert/strict";
import { renderMarkdown } from "../src/lib/markdown";

test("renders Markdown prose, references and GFM structures", () => {
  const html = renderMarkdown([
    "## 参考",
    "",
    "带有 **重点** 和 `代码` 的段落。",
    "",
    "- [官方文档](https://example.com/docs)",
    "- 第二项",
    "",
    "| 名称 | 值 |",
    "| --- | --- |",
    "| 甲 | 1 |",
    "",
    "```js",
    "const n = 1 < 2;",
    "```",
  ].join("\n"));

  assert.match(html, /<h2>参考<\/h2>/);
  assert.match(html, /<strong>重点<\/strong>/);
  assert.match(html, /<code>代码<\/code>/);
  assert.match(html, /<ul>\s*<li><a href="https:\/\/example\.com\/docs">官方文档<\/a><\/li>/);
  assert.match(html, /<table>[\s\S]*<th>名称<\/th>[\s\S]*<td>甲<\/td>/);
  assert.match(html, /<pre><code class="language-js">const n = 1 &lt; 2;/);
});

test("treats raw HTML as text and blocks dangerous link and image protocols", () => {
  const html = renderMarkdown([
    '<img src=x onerror="alert(1)">',
    "",
    "[bad](javascript:alert%281%29)",
    "",
    "![bad](javascript:alert%281%29)",
  ].join("\n"));

  assert.match(html, /&lt;img src=x onerror=/);
  assert.doesNotMatch(html, /<img src=x onerror=/);
  assert.doesNotMatch(html, /(?:href|src)="javascript:/i);
});
