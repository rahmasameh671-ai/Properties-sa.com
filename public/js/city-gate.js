/**
 * CITY GATE NEW CAIRO — BY PROPERTIES-S.COM
 * JavaScript Logic & Routing (Cleaned Up & Streamlined)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Form Lead Routing & Submission to Zapier Webhook
  const leadForm = document.getElementById('leadCaptureForm');
  const submitBtn = document.getElementById('submitBtn');
  const formHeader = document.querySelector('.form-header');
  const formSuccessState = document.getElementById('formSuccessState');
  const successModal = document.getElementById('successModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalLeadName = document.getElementById('modalLeadName');

  if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const fullName = (formData.get('fullName') || document.getElementById('fullName')?.value || '').trim();
      const rawPhone = (formData.get('phoneNumber') || document.getElementById('phoneNumber')?.value || '').trim();
      const countryCode = formData.get('countryCode') || document.getElementById('countryCode')?.value || '+20';

      if (!fullName) {
        alert('Please enter your full name.');
        return;
      }
      if (!rawPhone) {
        alert('Please enter your phone number.');
        return;
      }

      const fullPhoneNumber = countryCode ? `${countryCode} ${rawPhone}` : rawPhone;

      // Disable button and show sending state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting...';

      // Grabbing form data PLUS background data
      const data = {
        fullName: fullName,
        phoneNumber: fullPhoneNumber,
        landingPageUrl: window.location.href,       // Captures the full page URL
        submissionDate: new Date().toISOString(),   // Captures the exact date and time
        project: 'City Gate New Cairo',
        agency: 'properties-s.com',
        campaignCategory: 'Google Ads Real Estate',
        complianceStatus: 'Verified Strategic Partner'
      };

      try {
        await fetch('https://hooks.zapier.com/hooks/catch/25429357/uclzmpn/', {
          method: 'POST',
          body: JSON.stringify(data),
        });

        // Store backup copy locally
        const storedLeads = JSON.parse(localStorage.getItem('properties_s_citygate_leads') || '[]');
        storedLeads.push(data);
        localStorage.setItem('properties_s_citygate_leads', JSON.stringify(storedLeads));

        // Switch to inline success state matching React LeadForm
        if (leadForm) {
          leadForm.style.display = 'none';
        }
        if (formHeader) {
          formHeader.style.display = 'none';
        }
        if (formSuccessState) {
          formSuccessState.style.display = 'block';
        }

        if (modalLeadName) {
          modalLeadName.textContent = fullName;
        }

        // Trigger Google Analytics Lead Conversion Event
        if (typeof gtag === 'function') {
          gtag('event', 'generate_lead', {
            event_category: 'lead_form',
            event_label: 'City Gate Inquiry',
            value: 1
          });

        // Google Ads Conversion Tracking (properties-s conv)
        if (typeof gtag_report_conversion === 'function') {
          gtag_report_conversion();
        } else if (typeof gtag === 'function') {
          gtag('event', 'conversion', {
            'send_to': 'AW-10964877445/novGCO2LpqIdEIWBu-wo',
            'value': 1.0,
            'currency': 'EGP'
          });
        }
        }

        // Also trigger Success Modal
        successModal?.classList.add('active');
        e.target.reset();

      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  // Close Modal
  if (modalCloseBtn && successModal) {
    modalCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }

  // 3. Delegate WhatsApp Clicks to Google Ads Conversion Tracking
  document.addEventListener('click', (e) => {
    const waLink = e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');
    if (waLink) {
      if (!waLink.hasAttribute('onclick') || !waLink.getAttribute('onclick').includes('gtag_report_conversion')) {
        if (typeof gtag_report_conversion === 'function') {
          gtag_report_conversion(waLink.href);
        }
      }
    }
  });
});
