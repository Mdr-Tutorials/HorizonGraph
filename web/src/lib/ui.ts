const CJK = /[一-鿿]/;

export function labelOf(
  name: string,
  abbr: string | undefined,
  aliases: string[],
  displayPrimary?: string,
  displaySecondary?: string,
  type?: string
): { primary: string; secondary: string } {
  if (displayPrimary)
    return { primary: displayPrimary, secondary: displaySecondary && displaySecondary !== displayPrimary ? displaySecondary : "" };
  const zh = (aliases ?? []).find((a) => CJK.test(a));
  if (type === "organization")
    return { primary: name, secondary: zh && zh !== name ? zh : "" };
  if (zh) return { primary: zh, secondary: name };
  if (abbr && abbr !== name) return { primary: abbr, secondary: name };
  return { primary: name, secondary: "" };
}

export const TXT: Record<string, string> = {
  technical: "text-realm-tech",
  industrial: "text-realm-industry",
  conceptual: "text-realm-concept",
};

export const TYPE_ZH: Record<string, string> = {
  meta_concept: "分类",
  concept: "概念",
  metric: "指标",
  language: "语言",
  protocol: "协议",
  framework: "框架",
  library: "库",
  tool: "工具",
  architecture: "体系结构",
  model_family: "模型族",
  product: "产品",
  organization: "组织",
  person: "人物",
};
