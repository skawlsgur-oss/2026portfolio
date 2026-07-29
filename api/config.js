/* ==========================================================================
   2026 Nam Jin-hyeok AI Portfolio - Vercel Serverless Runtime Config (api/config.js)
   서버측 process.env 환경변수를 안전하게 제공하여 브라우저 소스코드의 키 하드코딩을 제거합니다.
   ========================================================================== */

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  return res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || ''
  });
};
