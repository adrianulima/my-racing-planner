import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

type PackageJson = {
  version?: unknown;
};

const dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(dirname, "..");
const packageJsonPath = path.join(rootDir, "package.json");
const changelogPath = path.join(rootDir, "CHANGELOG.md");

const packageJsonRaw = await readFile(packageJsonPath, "utf8");
const pkg = JSON.parse(packageJsonRaw) as PackageJson;

if (typeof pkg.version !== "string") {
  throw new Error("package.json version must be a string");
}

const changelogRaw = await readFile(changelogPath, "utf8");
const nextHeading = `## ${pkg.version}`;
const nextEntryLine = "- [actions] Refresh iRacing data";

let updatedChangelog = changelogRaw;
if (changelogRaw.includes(`${nextHeading}\n`)) {
  const sectionStart = changelogRaw.indexOf(nextHeading);
  const sectionBodyStart = changelogRaw.indexOf("\n\n", sectionStart);
  if (sectionBodyStart !== -1) {
    const bulletStart = sectionBodyStart + 2;
    const nextSectionStart = changelogRaw.indexOf("\n## ", bulletStart);
    const sectionEnd =
      nextSectionStart === -1 ? changelogRaw.length : nextSectionStart;
    const sectionBody = changelogRaw.slice(bulletStart, sectionEnd);
    if (!sectionBody.includes(nextEntryLine)) {
      updatedChangelog =
        changelogRaw.slice(0, bulletStart) +
        `${nextEntryLine}\n` +
        changelogRaw.slice(bulletStart);
    }
  }
} else {
  const firstReleaseMatch = changelogRaw.match(/^##\s+\d+\.\d+\.\d+\s*$/m);
  const newSection = `${nextHeading}\n\n${nextEntryLine}\n\n`;

  if (firstReleaseMatch && firstReleaseMatch.index !== undefined) {
    updatedChangelog =
      changelogRaw.slice(0, firstReleaseMatch.index) +
      newSection +
      changelogRaw.slice(firstReleaseMatch.index);
  } else {
    updatedChangelog = `${changelogRaw.trimEnd()}\n\n${newSection}`;
  }
}

await writeFile(changelogPath, updatedChangelog, "utf8");

console.log(`Updated changelog for ${pkg.version}`);
