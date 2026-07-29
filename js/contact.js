/* ==========================================================================
   2026 Nam Jin-hyeok AI Portfolio - 이메일 연락폼 전송 모듈 (contact.js)
   EmailJS SDK 기반 비동기 이메일 발송, 유효성 검사 및 UI 피드백 처리
   ========================================================================== */

(function () {
  // 1. EmailJS Public API Key 초기화
  const EMAILJS_PUBLIC_KEY = 'wIn4EaBHbg3kHVyRK';
  const SERVICE_ID = 'service_h3t978d';
  const TEMPLATE_ID = 'template_m3cldia';

  class ContactManager {
    constructor() {
      this.initElements();
      this.initEmailJS();
      this.bindEvents();
    }

    /* [ 1. DOM 엘리먼트 초기화 ] */
    initElements() {
      this.contactForm = document.getElementById('contactForm');
      this.inputName = document.getElementById('contactName');
      this.inputEmail = document.getElementById('contactEmail');
      this.inputMessage = document.getElementById('contactMessage');
      this.submitBtn = document.getElementById('contactSubmitBtn');
      this.statusMsg = document.getElementById('contactStatusMsg');
    }

    /* [ 2. EmailJS SDK 초기화 ] */
    initEmailJS() {
      if (window.emailjs) {
        try {
          window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
          console.log('⚡ EmailJS SDK Successfully Initialized!');
        } catch (e) {
          console.warn('EmailJS SDK init warning:', e.message);
        }
      } else {
        console.warn('⚠️ EmailJS SDK가 로드되지 않았습니다.');
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

    /* [ 6. 폼 제출 핸들러 ] */
    async handleSubmit(e) {
      e.preventDefault();
      this.hideStatus();

      const name = this.inputName ? this.inputName.value.trim() : '';
      const email = this.inputEmail ? this.inputEmail.value.trim() : '';
      const message = this.inputMessage ? this.inputMessage.value.trim() : '';

      // 유효성 검사
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

      // 버튼 로딩 상태 전환
      this.setLoadingState(true);

      try {
        if (!window.emailjs) {
          throw new Error('EmailJS 라이브러리가 로드되지 않았습니다.');
        }

        // EmailJS 이메일 전송 API 호출
        const response = await window.emailjs.send(SERVICE_ID, TEMPLATE_ID, {
          name: name,
          email: email,
          message: message
        });

        console.log('✅ EmailJS Send Success:', response.status, response.text);

        // 성공 피드백 처리
        this.showStatus('success', '🎉 이메일이 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.');
        if (this.contactForm) this.contactForm.reset();

      } catch (error) {
        console.error('❌ EmailJS Send Error:', error);
        this.showStatus('error', `❌ 이메일 전송 중 오류가 발생했습니다. (${error.text || error.message || '잠시 후 다시 시도해 주세요'})`);
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
