const { execFileSync } = require("child_process");
const path = require("path");

let data = "";
process.stdin.on("data", (chunk) => (data += chunk));
process.stdin.on("end", () => {
  let filePath;
  try {
    filePath = JSON.parse(data).tool_input?.file_path;
  } catch {
    return;
  }
  if (!filePath || !filePath.endsWith(".ts")) return;

  const cwd = path.join(__dirname, "..", "..");

  try {
    const prettierBin = require.resolve("prettier/bin/prettier.cjs", {
      paths: [cwd],
    });
    execFileSync(process.execPath, [prettierBin, "--write", filePath], {
      cwd,
      stdio: "ignore",
    });
  } catch {
    // formatting failures shouldn't block the tool call
  }
});
