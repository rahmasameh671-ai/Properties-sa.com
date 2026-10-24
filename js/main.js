/**
 * properties-sa.com - Corporate Engine
 * Strict Calm Luxury Architecture (Zero Gold Policy)
 * Independent Real Estate Consultancy & Authorized Marketing Intermediary
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountryCodes();
  initLeadForm();
  initSmoothScroll();
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
  defaultInquiryMessage: 'Hello properties-sa.com, I would like to schedule an independent real estate consultation regarding premier Egyptian investment opportunities.'
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
        source: 'properties-sa.com'
      };

      try {
        const stored = JSON.parse(localStorage.getItem('properties_sa_leads') || '[]');
        stored.push(lead);
        localStorage.setItem('properties_sa_leads', JSON.stringify(stored));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      initCountryCodes();

      // Trigger Google Analytics conversion if available
      if (typeof gtag_report_conversion === 'function') {
        gtag_report_conversion();
      } else if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          event_category: 'Consultation',
          event_label: 'Lead Form'
        });
      }

      openSuccessModal(lead.name, lead.phone);
    }, 750);
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
    const text = encodeURIComponent(`Hello properties-sa.com, my name is ${name} (${fullPhone}). I just registered my interest on properties-sa.com and would like to receive curated portfolios and an independent consultation.`);
    whatsappBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeSuccessModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Attach to window for inline onclick handlers
window.closeSuccessModal = closeSuccessModal;

/**
 * Minimalist notification banner
 */
function showNotice(message, type = 'info') {
  const existing = document.getElementById('saNotice');
  if (existing) existing.remove();

  const notice = document.createElement('div');
  notice.id = 'saNotice';
  notice.className = `fixed top-6 right-6 z-50 px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 transform translate-y-0 shadow-2xl ${
    type === 'error'
      ? 'bg-slate-900 text-white border border-slate-700'
      : 'bg-white text-slate-800 border border-slate-200'
  }`;
  notice.textContent = message;

  document.body.appendChild(notice);

  setTimeout(() => {
    notice.style.opacity = '0';
    notice.style.transform = 'translateY(-10px)';
    setTimeout(() => notice.remove(), 300);
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
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
