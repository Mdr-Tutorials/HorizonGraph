import { existsSync, readFileSync } from "node:fs";

const R = (p: string) => new URL(`../../../${p}`, import.meta.url);

export const json = (p: string): any => JSON.parse(readFileSync(R(p), "utf8"));
export const has = (p: string) => existsSync(R(p));
