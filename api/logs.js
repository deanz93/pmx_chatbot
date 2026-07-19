const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const ADMIN_KEY   = process.env.ADMIN_KEY || 'pmx-admin-2024';

async function redis(command) {
  const res = await fetch(`${REDIS_URL}/${command.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  return res.json();
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const key = req.headers['x-admin-key'] || req.query.key;
  if (key !== ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'DELETE') {
    await redis(['DEL', 'pmx_logs']);
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'GET') return res.status(405).end();

  const [rangeResult, lenResult] = await Promise.all([
    redis(['LRANGE', 'pmx_logs', '0', '199']),
    redis(['LLEN', 'pmx_logs']),
  ]);

  const raw = rangeResult.result || [];
  const total = lenResult.result || 0;

  const logs = raw.map(l => {
    try { return typeof l === 'string' ? JSON.parse(l) : l; }
    catch { return { prompt: String(l), ts: '' }; }
  });

  return res.status(200).json({ logs, total });
};
