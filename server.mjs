import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(new URL(".", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);
  const requested = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  let filePath = resolve(join(root, requested === "/" || requested === "\\" ? "index.html" : requested));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  response.writeHead(200, { "Content-Type": types[extname(filePath)] || "application/octet-stream" });
  createReadStream(filePath).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`PulseOps dashboard running at http://127.0.0.1:${port}`);
});
