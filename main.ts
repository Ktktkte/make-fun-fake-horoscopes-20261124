// Fake Horoscopes for AI Agents — writes the week's horoscope to entry.txt.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const horoscope = readFileSync(join(here, "entry.txt"), "utf8");

// Gate: the horoscope must fit the competition's single-line, <=200-char limit.
const MAX_HOROSCOPE_CHARS = 200;
if (horoscope.length < 1 || horoscope.length > MAX_HOROSCOPE_CHARS) {
  throw new Error("entry must be 1-200 characters");
}
if (horoscope.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), horoscope);
