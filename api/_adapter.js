function requestBody(req, headers) {
  if (req.method === 'GET' || req.method === 'HEAD' || req.body == null) return undefined;
  if (typeof req.body === 'string' || Buffer.isBuffer(req.body) || req.body instanceof Uint8Array) return req.body;
  if (!headers.has('content-type')) headers.set('content-type', 'application/json');
  return JSON.stringify(req.body);
}

export function adapt(fetchHandler) {
  return async function vercelHandler(req, res) {
    try {
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers || {})) {
        if (Array.isArray(value)) value.forEach(item => headers.append(key, item));
        else if (value != null) headers.set(key, String(value));
      }

      const protocol = headers.get('x-forwarded-proto') || 'https';
      const host = headers.get('x-forwarded-host') || headers.get('host') || 'localhost';
      const request = new Request(new URL(req.url || '/', `${protocol}://${host}`), {
        method: req.method || 'GET',
        headers,
        body: requestBody(req, headers),
      });
      const response = await fetchHandler(request);

      res.statusCode = response.status;
      response.headers.forEach((value, key) => res.setHeader(key, value));
      res.end(Buffer.from(await response.arrayBuffer()));
    } catch (error) {
      console.error('Vercel function adapter error', error);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      res.end(JSON.stringify({ error: 'Server function failed' }));
    }
  };
}
