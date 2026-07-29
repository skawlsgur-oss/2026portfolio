/* ==========================================================================
   2026 Nam Jin-hyeok AI Portfolio - Vercel Serverless Email Sender (api/send-email.js)
   서버측에서 process.env 키를 읽어 EmailJS REST API로 이메일을 안전하게 발송합니다.
   ========================================================================== */

module.exports = async function handler(req, res) {
  // CORS & Method 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: '필수 입력 항목(이름, 이메일, 메시지)이 누락되었습니다.' });
    }

    // 서버측 Vercel 환경변수에서 Key 읽기
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('❌ Server Environment Variable Missing: EmailJS keys not configured in Vercel.');
      return res.status(500).json({
        success: false,
        error: '서버 환경변수(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY)가 설정되지 않았습니다.'
      });
    }

    // EmailJS 공식 REST API (https://api.emailjs.com/api/v1.0/email/send) 호출
    const emailJsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          name: name,
          email: email,
          message: message
        }
      })
    });

    const responseText = await emailJsResponse.text();

    if (!emailJsResponse.ok) {
      console.error('❌ EmailJS REST API Error:', emailJsResponse.status, responseText);
      return res.status(emailJsResponse.status).json({
        success: false,
        error: `EmailJS 전송 에러 (${emailJsResponse.status}): ${responseText}`
      });
    }

    console.log('✅ EmailJS REST API Send Success:', responseText);
    return res.status(200).json({
      success: true,
      message: '이메일이 성공적으로 발송되었습니다.'
    });

  } catch (error) {
    console.error('❌ Serverless API Error:', error);
    return res.status(500).json({
      success: false,
      error: `서버 내부 오류: ${error.message}`
    });
  }
};
