const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(command) {
  const res = await fetch(`${REDIS_URL}/${command.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  return res.json();
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { prompt, ts } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'No prompt' });

  const entry = JSON.stringify({ prompt, ts: ts || new Date().toISOString() });
  await redis(['LPUSH', 'pmx_logs', entry]);
  await redis(['LTRIM', 'pmx_logs', '0', '999']);

  return res.status(200).json({ ok: true });
};
