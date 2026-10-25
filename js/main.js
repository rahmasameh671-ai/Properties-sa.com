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
  initAnalytics();
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

// Helper to determine active portfolio context
function getPortfolioContext() {
  const isHydePark = window.location.pathname.includes('hyde-park') || 
                     document.querySelector('[data-portfolio="hyde-park"]') !== null ||
                     document.title.toLowerCase().includes('hyde park');

  return {
    isHydePark: isHydePark,
    developerName: isHydePark ? 'Hyde Park Developments' : 'SODIC Developments',
    portfolioLabel: isHydePark ? 'Hyde Park Portfolio' : 'SODIC Developments Portfolio',
    eventLabel: isHydePark ? 'Hyde Park Interest Form' : 'SODIC Interest Form',
    storageKey: isHydePark ? 'properties_sa_hydepark_leads' : 'properties_sa_sodic_leads',
    defaultInquiryMessage: isHydePark
      ? 'Hello properties-sa.com, I am inquiring about Hyde Park projects.'
      : 'Hello properties-sa.com, I would like to inquire about the SODIC Developments portfolio.'
  };
}

// Configuration
const CONFIG = {
  whatsappNumber: '201033373331',
  zapierWebhookUrl: 'https://hooks.zapier.com/hooks/catch/25429357/uclzmpn/'
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
 * Lead capture form handling (Zapier Webhook Integration)
 */
function initLeadForm() {
  const form = document.getElementById('leadCaptureForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const context = getPortfolioContext();
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

    // Format full phone number with country dial code
    const fullPhoneNumber = countryCode ? `${countryCode} ${phoneNumber}`.trim() : phoneNumber;

    // Button loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      SUBMITTING...
    `;

    // Grabbing form data PLUS background data
    const data = {
      fullName: fullName,
      phoneNumber: fullPhoneNumber,
      portfolio: context.portfolioLabel,
      landingPageUrl: window.location.href,       // Captures the full page URL
      submissionDate: new Date().toISOString()    // Captures the exact date and time
    };

    try {
      // POST to Zapier Webhook
      await fetch(CONFIG.zapierWebhookUrl, {
        method: "POST",
        body: JSON.stringify(data)
      });

      // Local storage backup
      try {
        const stored = JSON.parse(localStorage.getItem(context.storageKey) || '[]');
        stored.push({
          ...data,
          source: `properties-sa.com — ${context.portfolioLabel}`
        });
        localStorage.setItem(context.storageKey, JSON.stringify(stored));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

      form.reset();
      initCountryCodes();

      // Google Ads & Analytics Conversion Event (AW-17103245801)
      if (typeof window.gtag === 'function') {
        try {
          window.gtag('event', 'generate_lead', {
            event_category: 'Lead',
            event_label: context.eventLabel,
            value: 1.0,
            currency: 'EGP',
            send_to: 'AW-17103245801'
          });
        } catch (gtagErr) {
          console.warn('Google Tag tracking error:', gtagErr);
        }
      }

      // Show inline thank you notice
      showNotice('Thank You! Your details have been received. We will be in touch shortly.', 'success');

      // Open luxury confirmation modal with instant WhatsApp action
      openSuccessModal(data.fullName, data.phoneNumber, context);
    } catch (error) {
      console.error("Error submitting to Zapier:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

/**
 * Success modal with instant WhatsApp confirmation
 */
function openSuccessModal(name, fullPhone, context = null) {
  const ctx = context || getPortfolioContext();
  const modal = document.getElementById('successModal');
  const modalName = document.getElementById('modalLeadName');
  const whatsappBtn = document.getElementById('modalWhatsAppBtn');

  if (modalName) modalName.textContent = name;

  if (whatsappBtn) {
    const text = encodeURIComponent(`Hello properties-sa.com, my name is ${name} (${fullPhone}). I just registered my interest on properties-sa.com and would like to receive floor plans, updated availability, and payment breakdowns for ${ctx.developerName}.`);
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
  } else if (type === 'success') {
    notice.className = 'mt-3 p-4 text-xs font-semibold rounded-lg text-center bg-emerald-50 text-emerald-800 border border-emerald-200';
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

/**
 * Google Ads & Analytics Tracking (AW-17103245801)
 */
function initAnalytics() {
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        try {
          window.gtag('event', 'contact', {
            event_category: 'WhatsApp',
            event_label: link.getAttribute('href') || 'WhatsApp Consultation',
            send_to: 'AW-17103245801'
          });
        } catch (err) {
          console.warn('Google Tag WhatsApp tracking error:', err);
        }
      }
    });
  });
}
