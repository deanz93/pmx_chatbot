const GPU_URL = 'https://gpu.plisca.my/api/v1/llm/process?sync=true';
const API_KEY = process.env.GPU_API_KEY;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const upstream = await fetch(GPU_URL, {
    method: 'POST',
    headers: { 'X-API-Key': API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  });

  const data = await upstream.json();
  return res.status(upstream.status).json(data);
};
