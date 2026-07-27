/* ==========================================================================
   2026 Nam Jin-hyeok AI Portfolio - 관리자 인증 및 인라인 편집 (admin.js)
   비밀번호(PIN) 모달 검증, LocalStorage 연동 및 자기소개 편집 처리 모듈
   ========================================================================== */

class AdminManager {
  constructor() {
    // 기본 암호 설정 (기본값: 1234)
    this.correctPin = '1234';
    this.isAdminActive = false;
    this.storageKey = 'jin_portfolio_about_data';

    this.initElements();
    this.bindEvents();
    this.loadSavedAboutData();
  }

  /* [ 1. DOM 엘리먼트 초기화 ] */
  initElements() {
    this.modalOverlay = document.getElementById('adminModalOverlay');
    this.adminToggleBtn = document.getElementById('adminToggleBtn');
    this.modalCancelBtn = document.getElementById('modalCancelBtn');
    this.modalSubmitBtn = document.getElementById('modalSubmitBtn');
    this.pinInputs = document.querySelectorAll('.pin-digit-input');
    this.modalErrorMsg = document.getElementById('modalErrorMsg');

    // About Me 섹션 요소
    this.aboutDisplayBio = document.getElementById('aboutDisplayBio');
    this.aboutDisplayField = document.getElementById('aboutDisplayField');
    this.aboutEditForm = document.getElementById('aboutEditForm');
    this.inputBio = document.getElementById('inputBio');
    this.inputField = document.getElementById('inputField');
    this.saveAboutBtn = document.getElementById('saveAboutBtn');
    this.cancelEditBtn = document.getElementById('cancelEditBtn');
    this.adminIndicator = document.getElementById('adminIndicator');
  }

  /* [ 2. 이벤트 리스너 바인딩 ] */
  bindEvents() {
    // 관리자 편집 토글 클릭
    if (this.adminToggleBtn) {
      this.adminToggleBtn.addEventListener('click', () => {
        if (this.isAdminActive) {
          this.deactivateAdminMode();
        } else {
          this.openModal();
        }
      });
    }

    // 모달 취소 및 제출
    if (this.modalCancelBtn) {
      this.modalCancelBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.modalSubmitBtn) {
      this.modalSubmitBtn.addEventListener('click', () => this.verifyPin());
    }

    // PIN 입력 포커스 자동 이동 처리
    this.pinInputs.forEach((input, index) => {
      input.addEventListener('keyup', (e) => {
        if (e.key >= '0' && e.key <= '9') {
          if (index < this.pinInputs.length - 1) {
            this.pinInputs[index + 1].focus();
          }
        } else if (e.key === 'Backspace') {
          if (index > 0) {
            this.pinInputs[index - 1].focus();
          }
        }

        // Enter 키 입력 시 즉시 검증
        if (e.key === 'Enter') {
          this.verifyPin();
        }
      });
    });

    // 자기소개 수정폼 저장/취소 이벤트
    if (this.saveAboutBtn) {
      this.saveAboutBtn.addEventListener('click', () => this.saveAboutData());
    }
    if (this.cancelEditBtn) {
      this.cancelEditBtn.addEventListener('click', () => this.toggleEditForm(false));
    }
  }

  /* [ 3. 모달 제어 함수 ] */
  openModal() {
    this.modalOverlay.classList.add('active');
    this.modalErrorMsg.classList.remove('active');
    this.clearPinInputs();
    setTimeout(() => this.pinInputs[0].focus(), 100);
  }

  closeModal() {
    this.modalOverlay.classList.remove('active');
    this.clearPinInputs();
  }

  clearPinInputs() {
    this.pinInputs.forEach(input => input.value = '');
  }

  /* [ 4. PIN 번호 검증 로직 ] */
  verifyPin() {
    const enteredPin = Array.from(this.pinInputs).map(input => input.value).join('');

    if (enteredPin === this.correctPin) {
      this.closeModal();
      this.activateAdminMode();
    } else {
      this.modalErrorMsg.textContent = '비밀번호가 일치하지 않습니다. (기본: 1234)';
      this.modalErrorMsg.classList.add('active');
      this.clearPinInputs();
      this.pinInputs[0].focus();
    }
  }

  /* [ 5. 관리자 모드 활성화/비활성화 ] */
  activateAdminMode() {
    this.isAdminActive = true;
    this.adminToggleBtn.innerHTML = '🔓 Admin Exit';
    this.adminIndicator.style.display = 'inline-flex';
    this.toggleEditForm(true);
  }

  deactivateAdminMode() {
    this.isAdminActive = false;
    this.adminToggleBtn.innerHTML = '🔐 Admin Edit';
    this.adminIndicator.style.display = 'none';
    this.toggleEditForm(false);
  }

  toggleEditForm(showForm) {
    if (showForm) {
      this.aboutEditForm.classList.add('active');
      this.aboutDisplayBio.style.display = 'none';
      // 현재 저장된 데이터를 input 필드에 바인딩
      this.inputBio.value = this.aboutDisplayBio.textContent.trim();
      this.inputField.value = this.aboutDisplayField.textContent.trim();
    } else {
      this.aboutEditForm.classList.remove('active');
      this.aboutDisplayBio.style.display = 'block';
    }
  }

  /* [ 6. LocalStorage 데이터 저장 및 로드 ] */
  saveAboutData() {
    const newBio = this.inputBio.value.trim();
    const newField = this.inputField.value.trim();

    if (!newBio || !newField) {
      alert('모든 입력란을 채워주세요.');
      return;
    }

    const dataToSave = {
      bio: newBio,
      field: newField
    };

    // 브라우저 LocalStorage에 데이터 보관
    localStorage.setItem(this.storageKey, JSON.stringify(dataToSave));

    // UI 즉시 업데이트
    this.renderAboutData(dataToSave);
    this.toggleEditForm(false);
    alert('자기소개가 성공적으로 업데이트 되었습니다!');
  }

  loadSavedAboutData() {
    const savedData = localStorage.getItem(this.storageKey);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        this.renderAboutData(parsed);
      } catch (e) {
        console.error('LocalStorage 데이터 파싱 실패:', e);
      }
    }
  }

  renderAboutData(data) {
    if (data.bio && this.aboutDisplayBio) {
      this.aboutDisplayBio.textContent = data.bio;
    }
    if (data.field && this.aboutDisplayField) {
      this.aboutDisplayField.textContent = data.field;
    }
  }
}

// 글로벌 인스턴스 생성
window.adminManager = new AdminManager();
