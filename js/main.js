/**
 * FORGE FITNESS STUDIO - MAIN APPLICATION JS
 * Handles navigation, mobile menu drawer, sticky header, toasts, modals,
 * live studio hours tracker, and portfolio demo lead inspector.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initMobileMenu();
  initBackToTop();
  initStudioStatus();
  initModals();
  initToast();
  initDemoLeadsViewer();
  updateCopyrightYear();
});

/* --- STICKY NAVBAR ON SCROLL --- */
function initStickyNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --- MOBILE DRAWER NAVIGATION --- */
function initMobileMenu() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-footer a');

  if (!hamburgerBtn || !drawer || !overlay) return;

  const toggleDrawer = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
    hamburgerBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', toggleDrawer);
  overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --- BACK TO TOP BUTTON --- */
function initBackToTop() {
  const backBtn = document.querySelector('.back-to-top-btn');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --- LIVE STUDIO HOURS TRACKER (MUMBAI IST) --- */
function initStudioStatus() {
  const statusPills = document.querySelectorAll('.studio-status-pill, #studio-status-indicator');
  if (!statusPills.length) return;

  function checkStatus() {
    // Current IST Time
    const now = new Date();
    // Offset for UTC+5:30
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istDate = new Date(utc + (3600000 * 5.5));
    const day = istDate.getDay(); // 0 is Sunday
    const hour = istDate.getHours();
    const minute = istDate.getMinutes();
    const currentMins = hour * 60 + minute;

    let isOpen = false;
    let closingTime = '10:00 PM';

    if (day === 0) {
      // Sunday: 7:00 AM (420) - 8:00 PM (1200)
      isOpen = (currentMins >= 420 && currentMins < 1200);
      closingTime = '8:00 PM';
    } else {
      // Mon - Sat: 6:00 AM (360) - 10:00 PM (1320)
      isOpen = (currentMins >= 360 && currentMins < 1320);
      closingTime = '10:00 PM';
    }

    statusPills.forEach(pill => {
      if (isOpen) {
        pill.innerHTML = `<span class="pulse-dot"></span><span>Studio Open • Closes ${closingTime}</span>`;
      } else {
        pill.innerHTML = `<span class="pulse-dot" style="background:#ff4d4f; box-shadow:0 0 10px #ff4d4f;"></span><span>Studio Closed • Opens 6:00 AM</span>`;
      }
    });
  }

  checkStatus();
  setInterval(checkStatus, 60000);
}

/* --- MODAL ENGINE --- */
function initModals() {
  // Global close modal buttons
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal.id);
    });
  });

  // Click outside modal card to close
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });

  // Global ESC key listener for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal-overlay.open');
      if (openModal) {
        closeModal(openModal.id);
      }
    }
  });
}

window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
};

/* --- TOAST NOTIFICATION ENGINE --- */
function initToast() {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

window.showToast = function(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-item';

  let icon = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="toast-icon">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  `;

  if (type === 'error') {
    icon = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4d4f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="toast-icon">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    `;
    toast.style.borderColor = 'rgba(255, 77, 79, 0.4)';
  }

  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 4s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4000);
};

/* --- PORTFOLIO DEMO: SAVED LEADS VIEWER MODAL --- */
function initDemoLeadsViewer() {
  // Seed sample realistic leads if empty
  if (!localStorage.getItem('forge_leads')) {
    const mockLeads = [
      {
        id: 'L-9401',
        name: 'Rohan Deshmukh',
        phone: '+91 98201 12345',
        email: 'rohan.d@gmail.com',
        plan: 'Pro Tier (Gym + Yoga)',
        date: 'Tomorrow, 7:00 AM',
        timestamp: new Date(Date.now() - 3600000 * 2).toLocaleTimeString()
      },
      {
        id: 'L-9402',
        name: 'Priyanka Sharma',
        phone: '+91 98199 87654',
        email: 'priyanka.sharma@yahoo.com',
        plan: 'Yoga & Pilates VIP Pass',
        date: 'Next Monday, 6:30 PM',
        timestamp: new Date(Date.now() - 3600000 * 5).toLocaleTimeString()
      }
    ];
    localStorage.setItem('forge_leads', JSON.stringify(mockLeads));
  }

  // Keyboard shortcut Ctrl+Shift+L to view leads
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
      e.preventDefault();
      openLeadsViewer();
    }
  });

  const demoBtn = document.getElementById('demo-leads-btn');
  if (demoBtn) {
    demoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openLeadsViewer();
    });
  }
}

window.openLeadsViewer = function() {
  let modal = document.getElementById('leads-viewer-modal');
  if (!modal) return;

  const leadsList = JSON.parse(localStorage.getItem('forge_leads') || '[]');
  const bookingsList = JSON.parse(localStorage.getItem('forge_bookings') || '[]');
  const container = document.getElementById('leads-list-container');

  if (container) {
    if (leadsList.length === 0 && bookingsList.length === 0) {
      container.innerHTML = `<p class="text-muted" style="text-align:center; padding: 20px;">No leads stored yet. Fill the Free Trial or Class Booking form to see live entries here!</p>`;
    } else {
      let html = `<div style="display:flex; flex-direction:column; gap:14px; max-height:400px; overflow-y:auto;">`;
      
      leadsList.forEach(lead => {
        html += `
          <div style="background:#111; border:1px solid #333; border-left:3px solid #B8FF00; padding:12px 16px; border-radius:6px; font-size:0.85rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <strong style="color:#FFF;">${lead.name}</strong>
              <span style="color:#B8FF00; font-weight:700;">${lead.id || 'FREE TRIAL'}</span>
            </div>
            <div style="color:#aaa;">📞 ${lead.phone} | ✉️ ${lead.email}</div>
            <div style="color:#888; font-size:0.78rem; margin-top:4px;">Plan: <span style="color:#eee;">${lead.plan || 'Trial'}</span> • Start: ${lead.date || 'Immediate'}</div>
          </div>
        `;
      });

      bookingsList.forEach(b => {
        html += `
          <div style="background:#111; border:1px solid #333; border-left:3px solid #00F0FF; padding:12px 16px; border-radius:6px; font-size:0.85rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <strong style="color:#FFF;">${b.name} (Class Booking)</strong>
              <span style="color:#00F0FF; font-weight:700;">${b.passCode}</span>
            </div>
            <div style="color:#aaa;">Class: <strong style="color:#FFF;">${b.className}</strong> | Coach: ${b.coach}</div>
            <div style="color:#888; font-size:0.78rem; margin-top:4px;">Date/Time: ${b.time} • 📞 ${b.phone}</div>
          </div>
        `;
      });

      html += `</div>`;
      container.innerHTML = html;
    }
  }

  openModal('leads-viewer-modal');
};

/* --- COPYRIGHT YEAR --- */
function updateCopyrightYear() {
  const yr = document.getElementById('current-year');
  if (yr) {
    yr.textContent = new Date().getFullYear();
  }
}
