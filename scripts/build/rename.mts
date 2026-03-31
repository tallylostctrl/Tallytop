import fsp from "fs/promises";

import pkg from "../../package.json" with { type: "json" };

const version = pkg.version;

console.log(`Built version ${version}`);

const buildFiles = await fsp.readdir("./dist");

for (const file of buildFiles) {
    if (!file.includes(version)) continue;

    await fsp
        .copyFile(`./dist/${file}`, `./dist/${file.replace(RegExp(`-?${version}`, "g"), "")}`)
        .catch(() => {
            console.warn(`failed to copy ${file}`);
        })
        .then(() => {
            console.log(`copied ${file}`);
        });
}
