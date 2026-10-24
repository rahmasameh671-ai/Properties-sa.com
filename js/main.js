/**
 * SODIC Developments Portfolio Landing Page
 * Operated by properties-sa.com — Strategic Marketing Partner
 * Strict Calm Luxury Architecture (Zero Gold Policy)
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountryCodes();
  initLeadForm();
  initSmoothScroll();
  initModalListeners();
});

// Supported international country dialing codes with properly encoded UTF-8 flags
const countryCodes = [
  { code: '+20', name: 'Egypt', flag: '🇪🇬', default: true },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: '+974', name: 'Qatar', flag: '🇶🇦' },
  { code: '+968', name: 'Oman', flag: '🇴🇲' },
  { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
  { code: '+962', name: 'Jordan', flag: '🇯🇴' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+1', name: 'USA / Canada', flag: '🇺🇸' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: '+90', name: 'Turkey', flag: '🇹🇷' }
];

// Configuration
const CONFIG = {
  whatsappNumber: '201033373331',
  defaultInquiryMessage: 'Hello properties-sa.com, I would like to inquire about the SODIC Developments portfolio.'
};

/**
 * Initialize country codes dropdown
 */
function initCountryCodes() {
  const select = document.getElementById('countryCodeSelect');
  if (!select) return;

  select.innerHTML = '';
  countryCodes.forEach(item => {
    const option = document.createElement('option');
    option.value = item.code;
    option.textContent = `${item.flag} ${item.code} (${item.name})`;
    if (item.default) {
      option.selected = true;
    }
    select.appendChild(option);
  });
}

/**
 * Lead capture form handling
 */
function initLeadForm() {
  const form = document.getElementById('leadCaptureForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phoneNumber');
    const countrySelect = document.getElementById('countryCodeSelect');
    const submitBtn = form.querySelector('button[type="submit"]');

    const fullName = nameInput ? nameInput.value.trim() : '';
    const phoneNumber = phoneInput ? phoneInput.value.trim() : '';
    const countryCode = countrySelect ? countrySelect.value : '+20';

    // Form Validation
    if (!fullName) {
      showNotice('Please enter your full name.', 'error');
      if (nameInput) nameInput.focus();
      return;
    }

    if (!phoneNumber || phoneNumber.length < 6) {
      showNotice('Please enter a valid phone number.', 'error');
      if (phoneInput) phoneInput.focus();
      return;
    }

    // Button loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      PROCESSING...
    `;

    setTimeout(() => {
      // Store lead data locally
      const lead = {
        name: fullName,
        phone: `${countryCode} ${phoneNumber}`,
        timestamp: new Date().toISOString(),
        source: 'properties-sa.com — SODIC Portfolio'
      };

      try {
        const stored = JSON.parse(localStorage.getItem('properties_sa_sodic_leads') || '[]');
        stored.push(lead);
        localStorage.setItem('properties_sa_sodic_leads', JSON.stringify(stored));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      initCountryCodes();

      openSuccessModal(lead.name, lead.phone);
    }, 600);
  });
}

/**
 * Success modal with instant WhatsApp confirmation
 */
function openSuccessModal(name, fullPhone) {
  const modal = document.getElementById('successModal');
  const modalName = document.getElementById('modalLeadName');
  const whatsappBtn = document.getElementById('modalWhatsAppBtn');

  if (modalName) modalName.textContent = name;

  if (whatsappBtn) {
    const text = encodeURIComponent(`Hello properties-sa.com, my name is ${name} (${fullPhone}). I just registered my interest on properties-sa.com and would like to receive floor plans, updated availability, and payment breakdowns for SODIC Developments.`);
    whatsappBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close modal
 */
function closeModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

function initModalListeners() {
  const closeBtn = document.getElementById('closeModalBtn');
  const modal = document.getElementById('successModal');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

/**
 * Notice banner
 */
function showNotice(message, type = 'info') {
  let notice = document.getElementById('formNotice');
  if (!notice) {
    notice = document.createElement('div');
    notice.id = 'formNotice';
    notice.className = 'mt-3 p-3 text-xs font-semibold rounded-lg text-center transition-all duration-300';
    const form = document.getElementById('leadCaptureForm');
    if (form) form.appendChild(notice);
  }

  if (type === 'error') {
    notice.className = 'mt-3 p-3 text-xs font-semibold rounded-lg text-center bg-rose-50 text-rose-700 border border-rose-200';
  } else {
    notice.className = 'mt-3 p-3 text-xs font-semibold rounded-lg text-center bg-slate-100 text-slate-800 border border-slate-300';
  }

  notice.textContent = message;
  notice.classList.remove('hidden');

  setTimeout(() => {
    if (notice) notice.classList.add('hidden');
  }, 4000);
}

/**
 * Smooth scrolling
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
