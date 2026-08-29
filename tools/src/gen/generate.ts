import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const C = (f: string): any => JSON.parse(readFileSync(path.join(ROOT, "contracts", f), "utf8"));

const types = C("types.json");
const relations = C("relations.json");
const q = (s: string) => JSON.stringify(s);
const union = (keys: string[]) => keys.map(q).join(" | ");

const entityTypes = Object.keys(types.enums.EntityType);
const relTypes = Object.keys(relations.relations);

const allTypes = Object.keys(types.types);
const reqAll = new Set(
  Object.keys(types.fields).filter((f) =>
    allTypes.every((t) => (types.types[t].applicability?.[f] ?? types.applicability_default) === "required")
  )
);

const tsTypeOf: Record<string, string> = {
  string: "string",
  "string[]": "string[]",
  integer: "number",
  date: "string",
  uri: "string",
};

const fieldLines = Object.entries(types.fields as Record<string, any>)
  .map(([name, f]) => {
    const opt = reqAll.has(name) ? "" : "?";
    let ts = tsTypeOf[f.type] ?? "unknown";
    if (name === "importance") ts = "1 | 2 | 3 | 4 | 5";
    if (name === "type") ts = "EntityType";
    if (name === "abstraction_level") ts = "AbstractionLevel";
    if (name === "status") ts = "Status";
    if (name === "origin") ts = "Origin";
    if (name === "relations") ts = "RelationEdge[]";
    return `  ${name}${opt}: ${ts};`;
  })
  .join("\n");

const out = `// 生成文件：由 tools/src/gen 从 contracts/*.json 生成，改动请走 contracts/。
export type EntityType = ${union(entityTypes)};
export const ENTITY_TYPES = [${entityTypes.map(q).join(", ")}] as const;

export type Realm = ${union(Object.keys(types.enums.Realm))};
export type AbstractionLevel = ${union(Object.keys(types.enums.AbstractionLevel))};
export const ABSTRACTION_LEVELS = [${Object.keys(types.enums.AbstractionLevel).map(q).join(", ")}] as const;
export type Status = ${union(Object.keys(types.enums.Status))};
export type Origin = ${union(Object.keys(types.enums.Origin))};

export type RelationType = ${union(relTypes)};
export const RELATION_TYPES = [${relTypes.map(q).join(", ")}] as const;

export interface RelationEdge {
  relation_type: RelationType;
  target_id: string;
  context?: string;
}

export interface TechTerm {
${fieldLines}
}

export interface OntologyNode {
  id: string;
  name: string;
  aliases: string[];
  summary: string;
  parents: string[];
  entity_type?: EntityType | EntityType[];
  importance?: number;
  last_reviewed?: string;
}

export interface EcosystemEntry {
  value: string;
  en?: string;
  zh: string;
  parents?: string[];
  blurb?: string;
  maintainers?: string[];
}
`;

const realmOf = Object.fromEntries(
  Object.entries(types.types as Record<string, any>).map(([t, v]) => [t, v.realm])
);
const outWeb = out.replace(
  "// 生成文件：由 tools/src/gen 从 contracts/*.json 生成，改动请走 contracts/。",
  `// 生成文件：由 tools/src/gen 从 contracts/*.json 生成，改动请走 contracts/。\nexport const REALM_OF: Record<string, string> = ${JSON.stringify(realmOf)};`
);
const webPath = new URL("../../../web/src/generated/contracts.gen.ts", import.meta.url);
mkdirSync(new URL(".", webPath), { recursive: true });
writeFileSync(webPath, outWeb);

writeFileSync(new URL("../contracts.gen.ts", import.meta.url), out);
console.log("已生成 tools/src/contracts.gen.ts 与 web/src/generated/contracts.gen.ts");
