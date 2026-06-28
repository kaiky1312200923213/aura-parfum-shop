const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  });
}

export function preflightResponse() {
  return new Response('', { status: 204, headers: CORS_HEADERS });
}

export function errorResponse(err, status = 500) {
  console.error('API error:', err);
  return jsonResponse({ error: err?.message || 'Erro interno' }, status);
}
