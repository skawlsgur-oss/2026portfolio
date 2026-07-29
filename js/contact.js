/* ==========================================================================
   2026 Nam Jin-hyeok AI Portfolio - 이메일 연락폼 전송 모듈 (contact.js)
   서버리스 엔드포인트(/api/send-email) 호출 기반 이메일 발송 & 3중 스팸 방지
   ========================================================================== */

(function () {
  class ContactManager {
    constructor() {
      this.lastSentKey = 'jin_portfolio_last_email_sent';
      this.cooldownSeconds = 60; // 60초 연속 발송 제한
      this.captchaAnswer = null;

      this.initElements();
      this.generateCaptcha();
      this.bindEvents();
    }

    /* [ 1. DOM 엘리먼트 초기화 ] */
    initElements() {
      this.contactForm = document.getElementById('contactForm');
      this.inputName = document.getElementById('contactName');
      this.inputEmail = document.getElementById('contactEmail');
      this.inputMessage = document.getElementById('contactMessage');
      this.inputWebsite = document.getElementById('contactWebsite'); // 1단계: 허니팟 봇 트랩
      this.captchaQuestionEl = document.getElementById('contactCaptchaQuestion'); // 2단계: 캡차 퀴즈 질문
      this.inputCaptcha = document.getElementById('contactCaptcha'); // 2단계: 캡차 퀴즈 답 입력
      this.submitBtn = document.getElementById('contactSubmitBtn');
      this.statusMsg = document.getElementById('contactStatusMsg');
    }

    /* [ 2. 동적 산수 캡차 퀴즈 생성 (Layer 2) ] */
    generateCaptcha() {
      const num1 = Math.floor(Math.random() * 9) + 1; // 1~9 무작위 숫자
      const num2 = Math.floor(Math.random() * 9) + 1;
      this.captchaAnswer = num1 + num2;

      if (this.captchaQuestionEl) {
        this.captchaQuestionEl.textContent = `${num1} + ${num2} = ?`;
      }
      if (this.inputCaptcha) {
        this.inputCaptcha.value = '';
      }
    }

    /* [ 3. 이벤트 바인딩 ] */
    bindEvents() {
      if (this.contactForm) {
        this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
      }
    }

    /* [ 4. 이메일 유효성 검사 헬퍼 ] */
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    /* [ 5. 상태 메시지 렌더링 ] */
    showStatus(type, message) {
      if (!this.statusMsg) return;
      this.statusMsg.className = `contact-status-msg active ${type}`;
      this.statusMsg.textContent = message;
    }

    hideStatus() {
      if (!this.statusMsg) return;
      this.statusMsg.className = 'contact-status-msg';
      this.statusMsg.textContent = '';
    }

    /* [ 6. 폼 제출 핸들러 (서버 API 호출 & 3중 스팸 방어 검증) ] */
    async handleSubmit(e) {
      e.preventDefault();
      this.hideStatus();

      // 🛡️ 1단계 검증: 허니팟 봇 트랩 (Honeypot Check)
      if (this.inputWebsite && this.inputWebsite.value.trim() !== '') {
        console.warn('🚫 Spam Bot detected via Honeypot trap!');
        this.showStatus('error', '⚠️ 자동화 스팸 방지 시스템에 의해 전송이 차단되었습니다.');
        return;
      }

      // 🛡️ 3단계 검증: 60초 쿨다운 연속 발송 제한 (Rate Limiting Check)
      const lastSent = localStorage.getItem(this.lastSentKey);
      if (lastSent) {
        const elapsed = Math.floor((Date.now() - parseInt(lastSent, 10)) / 1000);
        if (elapsed < this.cooldownSeconds) {
          const remaining = this.cooldownSeconds - elapsed;
          this.showStatus('error', `⚠️ 스팸 방지를 위해 연속 발송이 제한됩니다. ${remaining}초 후에 다시 시도해 주세요.`);
          return;
        }
      }

      const name = this.inputName ? this.inputName.value.trim() : '';
      const email = this.inputEmail ? this.inputEmail.value.trim() : '';
      const message = this.inputMessage ? this.inputMessage.value.trim() : '';
      const captchaVal = this.inputCaptcha ? parseInt(this.inputCaptcha.value.trim(), 10) : NaN;

      // 기본 입력란 유효성 검사
      if (!name) {
        this.showStatus('error', '⚠️ 성함을 입력해 주세요.');
        if (this.inputName) this.inputName.focus();
        return;
      }

      if (!email || !this.isValidEmail(email)) {
        this.showStatus('error', '⚠️ 올바른 이메일 주소(예: name@example.com)를 입력해 주세요.');
        if (this.inputEmail) this.inputEmail.focus();
        return;
      }

      if (!message) {
        this.showStatus('error', '⚠️ 메시지 내용을 입력해 주세요.');
        if (this.inputMessage) this.inputMessage.focus();
        return;
      }

      // 🛡️ 2단계 검증: 산수 퀴즈 캡차 검증 (Math Captcha Check)
      if (isNaN(captchaVal) || captchaVal !== this.captchaAnswer) {
        this.showStatus('error', '⚠️ 스팸 방지 퀴즈 정답이 올바르지 않습니다. 다시 계산해 주세요.');
        this.generateCaptcha();
        if (this.inputCaptcha) this.inputCaptcha.focus();
        return;
      }

      // 버튼 로딩 상태 전환
      this.setLoadingState(true);

      try {
        // Vercel Serverless Function 엔드포인트 (/api/send-email) 호출
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message
          })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || '서버 응답 오류가 발생했습니다.');
        }

        console.log('✅ Serverless Email API Success:', data);

        // 성공 시 쿨다운 타임스탬프 기록
        localStorage.setItem(this.lastSentKey, Date.now().toString());

        // 성공 피드백 처리 및 폼 초기화
        this.showStatus('success', '🎉 이메일이 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.');
        if (this.contactForm) this.contactForm.reset();
        this.generateCaptcha();

      } catch (error) {
        console.error('❌ Contact Form Send Error:', error);
        this.showStatus('error', `❌ 이메일 전송 중 오류가 발생했습니다. (${error.message || '잠시 후 다시 시도해 주세요'})`);
      } finally {
        this.setLoadingState(false);
      }
    }

    /* [ 7. 버튼 로딩 상태 제어 ] */
    setLoadingState(isLoading) {
      if (!this.submitBtn) return;

      if (isLoading) {
        this.submitBtn.disabled = true;
        this.submitBtn.innerHTML = `
          <span class="btn-spinner"></span>
          <span>이메일 발송 중...</span>
        `;
      } else {
        this.submitBtn.disabled = false;
        this.submitBtn.innerHTML = `
          <span>🚀 이메일 보내기</span>
        `;
      }
    }
  }

  // DOM 로드 완료 후 인스턴스 생성
  document.addEventListener('DOMContentLoaded', () => {
    window.contactManager = new ContactManager();
  });
})();
