import { registerTools } from "./tools.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Carregando package.json manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJsonPath = join(__dirname, "..", "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const { name, version } = packageJson;

const server = new McpServer(
  { name, version },
  {
    instructions:
      "This is a MCP server for Obsidian. It is a simple server that can be used to run commands and get responses from the client running Local REST API community plugin.",
  },
);
registerTools(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.error(`Running ${name}@${version} MCP Server on stdio`);
}

main().catch((error) => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.error("Fatal error in main():", error);
  process.exit(1);
});
