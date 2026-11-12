import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json' };

const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const path = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    const relativePath = path.slice(root.length + 1).split(/[\\/]/).join('/');
    const allowed = ['index.html', 'styles.css'].includes(relativePath) || relativePath.startsWith('src/');
    if (!path.startsWith(root + sep) || !allowed) {
      response.writeHead(404).end('No encontrado');
      return;
    }
    const body = await readFile(path);
    response.writeHead(200, { 'Content-Type': `${types[extname(path)] || 'application/octet-stream'}; charset=utf-8`, 'Cache-Control': 'no-store' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    response.writeHead(error instanceof URIError ? 400 : 404).end('No encontrado');
  }
});

server.on('error', (error) => {
  console.error(error.code === 'EADDRINUSE' ? 'El puerto 5173 ya está en uso.' : error.message);
  process.exitCode = 1;
});
server.listen(5173, '127.0.0.1', () => console.log('my-tasks disponible en http://localhost:5173'));
