import { mkdirSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const RUST_VERSION = "1.96.1";
const BINDGEN_VERSION = "0.2.126";
const CRATE = path.join(ROOT, "crates", "graph-core");
const OUT = path.join(ROOT, "web", "src", "generated", "wasm");

function version(command: string, args: string[]): string {
  const result = spawnSync(command, args, { cwd: ROOT, encoding: "utf8" });
  if (result.error || result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed: ${result.error?.message ?? result.stderr}`);
  }
  return result.stdout.trim();
}

function run(command: string, args: string[]) {
  const result = spawnSync(command, args, { cwd: ROOT, stdio: "inherit" });
  if (result.error || result.status !== 0) {
    throw new Error(`${command} failed (${result.status ?? result.error?.message}).`);
  }
}

const rustVersion = version("rustc", ["--version"]);
if (!rustVersion.startsWith(`rustc ${RUST_VERSION} `)) {
  throw new Error(`Expected Rust ${RUST_VERSION}, received ${rustVersion}; use the repository rust-toolchain.toml.`);
}
const userBindgen = path.join(homedir(), ".cargo", "bin", process.platform === "win32" ? "wasm-bindgen.exe" : "wasm-bindgen");
const bindgen = process.env.WASM_BINDGEN || (existsSync(userBindgen) ? userBindgen : "wasm-bindgen");
const bindgenVersion = version(bindgen, ["--version"]);
if (bindgenVersion !== `wasm-bindgen ${BINDGEN_VERSION}`) {
  throw new Error(
    `Expected wasm-bindgen ${BINDGEN_VERSION}, received ${bindgenVersion}. ` +
      `Install it with cargo install wasm-bindgen-cli --version ${BINDGEN_VERSION} --locked.`,
  );
}

// Use an explicit target directory so ambient CARGO_TARGET_DIR cannot change the artifact path.
const target = path.join(CRATE, "target");
run("cargo", [
  "build", "--manifest-path", path.join(CRATE, "Cargo.toml"), "--locked", "--release",
  "--target", "wasm32-unknown-unknown", "--target-dir", target,
]);
mkdirSync(OUT, { recursive: true });
run(bindgen, [
  path.join(target, "wasm32-unknown-unknown", "release", "horizon_graph_core.wasm"),
  "--target", "web", "--out-dir", OUT, "--out-name", "graph_core",
]);
console.log(`WASM built with Rust ${RUST_VERSION} / wasm-bindgen ${BINDGEN_VERSION}: ${OUT}`);
