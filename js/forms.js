/**
 * FORGE FITNESS STUDIO - FORMS & INTERACTIVITY ENGINE
 * Handles:
 * 1. Free Trial Form (3 Days, 100% Free, instant confirmation)
 * 2. Paid Membership Joining Modal (Basic ₹1,499, Pro ₹2,499, Elite ₹3,999)
 * 3. Contact Form Submission
 * 4. Testimonials Slider
 * 5. FAQ Accordion
 */

document.addEventListener('DOMContentLoaded', () => {
  initFreeTrialForm();
  initPaidMembershipActions();
  initContactForm();
  initTestimonialsSlider();
  initFaqAccordion();
});

/* ==========================================================================
   1. FREE TRIAL FORM (VERY IMPORTANT)
   ========================================================================== */
function initFreeTrialForm() {
  const trialForm = document.getElementById('free-trial-form');
  if (!trialForm) return;

  // Set min start date to today
  const dateInput = document.getElementById('trial-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    if (!dateInput.value) {
      dateInput.value = today;
    }
  }

  trialForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('trial-name');
    const phoneInput = document.getElementById('trial-phone');
    const emailInput = document.getElementById('trial-email');
    const submitBtn = trialForm.querySelector('button[type="submit"]');

    let isValid = true;

    // Name Validation
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      showFieldError(nameInput, 'Please enter your full name');
      isValid = false;
    } else {
      clearFieldError(nameInput);
    }

    // Phone Validation
    const phoneClean = phoneInput.value.replace(/[^0-9]/g, '');
    if (phoneClean.length < 10) {
      showFieldError(phoneInput, 'Please enter a valid 10-digit mobile number');
      isValid = false;
    } else {
      clearFieldError(phoneInput);
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showFieldError(emailInput, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearFieldError(emailInput);
    }

    if (!isValid) return;

    // Loading State
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Processing Request...
    `;
    submitBtn.disabled = true;

    setTimeout(() => {
      const trialPassCode = 'TRIAL-' + Math.floor(100000 + Math.random() * 900000);

      // Save to localStorage
      const existingLeads = JSON.parse(localStorage.getItem('forge_leads') || '[]');
      existingLeads.unshift({
        id: trialPassCode,
        type: '100% Free 3-Day Trial',
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: emailInput.value.trim(),
        date: dateInput ? dateInput.value : 'Immediate',
        timestamp: new Date().toLocaleString()
      });
      localStorage.setItem('forge_leads', JSON.stringify(existingLeads));

      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      trialForm.reset();

      // Show inline required success message
      const successBox = document.getElementById('free-trial-success-box');
      if (successBox) {
        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      showToast('Your free trial request has been received! We will contact you shortly.', 'success');
    }, 600);
  });
}

/* ==========================================================================
   2. PAID MEMBERSHIP ACTIONS (JOIN BASIC, PRO, ELITE)
   ========================================================================== */
function initPaidMembershipActions() {
  const joinModal = document.getElementById('paid-join-modal');
  const joinForm = document.getElementById('paid-join-form');

  window.openPaidPlanModal = function(planName, priceText) {
    const titleEl = document.getElementById('join-modal-plan-title');
    const priceEl = document.getElementById('join-modal-price');
    const planInput = document.getElementById('join-hidden-plan');

    if (titleEl) titleEl.textContent = `${planName} Plan`;
    if (priceEl) priceEl.textContent = `${priceText} / month`;
    if (planInput) planInput.value = `${planName} (${priceText})`;

    openModal('paid-join-modal');
  };

  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('join-name').value.trim();
      const phone = document.getElementById('join-phone').value.trim();
      const email = document.getElementById('join-email').value.trim();
      const plan = document.getElementById('join-hidden-plan').value;

      if (!name || !phone || !email) {
        showToast('Please fill all fields', 'error');
        return;
      }

      const membershipId = 'MEM-' + Math.floor(1000 + Math.random() * 9000);

      // Save to localStorage
      const existingLeads = JSON.parse(localStorage.getItem('forge_leads') || '[]');
      existingLeads.unshift({
        id: membershipId,
        type: 'Paid Membership Application',
        name,
        phone,
        email,
        plan,
        timestamp: new Date().toLocaleString()
      });
      localStorage.setItem('forge_leads', JSON.stringify(existingLeads));

      closeModal('paid-join-modal');
      joinForm.reset();

      showToast(`🎉 Application received for ${plan}! Our team will call you to finalize enrollment.`);
    });
  }
}

/* ==========================================================================
   3. CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    let isValid = true;

    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      showFieldError(nameInput, 'Please enter your name');
      isValid = false;
    } else {
      clearFieldError(nameInput);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showFieldError(emailInput, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearFieldError(emailInput);
    }

    if (!phoneInput.value.trim()) {
      showFieldError(phoneInput, 'Please enter your phone number');
      isValid = false;
    } else {
      clearFieldError(phoneInput);
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 4) {
      showFieldError(messageInput, 'Please enter your message');
      isValid = false;
    } else {
      clearFieldError(messageInput);
    }

    if (!isValid) return;

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `Sending...`;
    submitBtn.disabled = true;

    setTimeout(() => {
      // Save contact inquiry
      const existingInquiries = JSON.parse(localStorage.getItem('forge_inquiries') || '[]');
      existingInquiries.unshift({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        message: messageInput.value.trim(),
        timestamp: new Date().toLocaleString()
      });
      localStorage.setItem('forge_inquiries', JSON.stringify(existingInquiries));

      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      contactForm.reset();

      const successBox = document.getElementById('contact-form-success');
      if (successBox) {
        successBox.style.display = 'block';
        setTimeout(() => {
          successBox.style.display = 'none';
        }, 8000);
      }

      showToast('⚡ Message sent! Our team in Andheri will reach out within 2 hours.');
    }, 600);
  });
}

function showFieldError(input, message) {
  const group = input.closest('.form-group');
  if (group) {
    group.classList.add('has-error');
    let feedback = group.querySelector('.form-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'form-feedback';
      feedback.style.color = '#ff4d4f';
      feedback.style.fontSize = '0.75rem';
      feedback.style.marginTop = '4px';
      group.appendChild(feedback);
    }
    feedback.textContent = message;
    feedback.style.display = 'block';
  }
}

function clearFieldError(input) {
  const group = input.closest('.form-group');
  if (group) {
    group.classList.remove('has-error');
    const feedback = group.querySelector('.form-feedback');
    if (feedback) {
      feedback.style.display = 'none';
    }
  }
}

/* ==========================================================================
   4. TESTIMONIALS SLIDER
   ========================================================================== */
function initTestimonialsSlider() {
  const slides = document.querySelectorAll('.testimonial-slide-item');
  const prevBtn = document.getElementById('prev-testimonial-btn');
  const nextBtn = document.getElementById('next-testimonial-btn');
  const dotsContainer = document.getElementById('testimonial-dots');

  if (!slides.length) return;

  let currentIdx = 0;
  let autoplayTimer = null;

  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        goToSlide(idx);
        restartAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(idx) {
    slides.forEach((slide, i) => {
      slide.style.display = i === idx ? 'block' : 'none';
    });

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });

    currentIdx = idx;
  }

  function nextSlide() {
    let next = (currentIdx + 1) % slides.length;
    goToSlide(next);
  }

  function prevSlide() {
    let prev = (currentIdx - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });
  }

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 6000);
  }

  function restartAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    startAutoplay();
  }

  goToSlide(0);
  startAutoplay();
}

/* ==========================================================================
   5. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
