import http from 'node:http';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const routes = {
  '/api/perfumes': '../perfumes/perfumes.js',
  '/api/stats': '../perfumes/stats.js',
  '/api/upload': '../perfumes/upload.js',
  '/api/site-video': '../perfumes/site-video.js',
};

function createMockRes() {
  let statusCode = 200;
  const headers = {};
  let body = '';

  return {
    setHeader(key, value) {
      headers[key.toLowerCase()] = value;
    },
    status(code) {
      statusCode = code;
      return this;
    },
    end(data) {
      if (data) body = typeof data === 'string' ? data : String(data);
    },
    json(data) {
      headers['content-type'] = 'application/json';
      body = JSON.stringify(data);
    },
    get result() {
      return { statusCode, headers, body };
    },
  };
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  const raw = Buffer.concat(chunks).toString('utf8');
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function createReq(nodeReq, body) {
  const url = new URL(nodeReq.url, 'http://localhost');
  return {
    method: nodeReq.method,
    query: Object.fromEntries(url.searchParams),
    body,
    url: nodeReq.url,
  };
}

const server = http.createServer(async (nodeReq, nodeRes) => {
  const url = new URL(nodeReq.url, 'http://localhost');
  let routePath = url.pathname;

  if (routePath.startsWith('/api/perfumes/')) {
    routePath = '/api/perfumes';
  }

  const modulePath = routes[routePath];
  if (!modulePath) {
    nodeRes.writeHead(404, { 'Content-Type': 'application/json' });
    nodeRes.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  try {
    const body = nodeReq.method === 'GET' ? {} : await readBody(nodeReq);
    const req = createReq(nodeReq, body);
    if (url.pathname.startsWith('/api/perfumes/') && nodeReq.method !== 'GET') {
      const id = url.pathname.split('/').pop();
      req.body = { ...body, id };
    }

    const mod = await import(modulePath);
    const res = createMockRes();
    await mod.default(req, res);
    const { statusCode, headers, body: responseBody } = res.result;

    nodeRes.writeHead(statusCode, headers);
    nodeRes.end(responseBody);
  } catch (err) {
    console.error('[dev-api]', err);
    nodeRes.writeHead(500, { 'Content-Type': 'application/json' });
    nodeRes.end(JSON.stringify({ error: err.message }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`[dev-api] API local em http://localhost:${PORT}`);
});
