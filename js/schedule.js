/**
 * FORGE FITNESS STUDIO - CLASS SCHEDULE & BOOKING SYSTEM
 * Interactive weekly schedule, category filters, day selector, real-time search,
 * and direct class booking modal with pass generation.
 */

const CLASSES_DATA = [
  // --- MONDAY ---
  {
    id: 'c1',
    name: 'Iron Forge: Powerlifting & Hypertrophy',
    category: 'strength',
    day: 'monday',
    time: '06:30 AM - 07:30 AM',
    duration: '60 Min',
    difficulty: 'Advanced',
    intensity: 5,
    coach: 'Kabir Sharma',
    coachImg: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=150&q=80',
    room: 'Main Iron Pit (Zone A)',
    spotsLeft: 4,
    description: 'Master compound lifts—barbell squat, bench press, deadlift—with technical coaching on bar velocity and hypertrophy sets.'
  },
  {
    id: 'c2',
    name: 'Vinyasa Flow & Dynamic Pranayama',
    category: 'yoga',
    day: 'monday',
    time: '07:45 AM - 08:45 AM',
    duration: '60 Min',
    difficulty: 'All Levels',
    intensity: 3,
    coach: 'Ananya Roy',
    coachImg: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=150&q=80',
    room: 'Prana Sanctuary (Studio 2)',
    spotsLeft: 6,
    description: 'Awaken your body with synchronized breath and fluid sun salutations, warrior sequences, and hip-opening releases.'
  },
  {
    id: 'c3',
    name: 'Metabolic Inferno HIIT',
    category: 'hiit',
    day: 'monday',
    time: '06:00 PM - 06:45 PM',
    duration: '45 Min',
    difficulty: 'Intermediate',
    intensity: 5,
    coach: 'Vikram Malhotra',
    coachImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    room: 'Athletic Turf (Zone B)',
    spotsLeft: 2,
    description: 'Tabata intervals, assault bikes, kettlebells, and sled pushes designed to torch maximum calories and spike EPOC.'
  },
  {
    id: 'c4',
    name: 'Classical Mat Pilates & Core Reform',
    category: 'pilates',
    day: 'monday',
    time: '07:15 PM - 08:00 PM',
    duration: '45 Min',
    difficulty: 'Beginner - Int',
    intensity: 3,
    coach: 'Natasha D\'Souza',
    coachImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    room: 'Zen Movement Studio',
    spotsLeft: 5,
    description: 'Target deep transverse abdominals, pelvic floor alignment, and spinal posture through disciplined low-impact resistance.'
  },

  // --- TUESDAY ---
  {
    id: 'c5',
    name: 'Kettlebell & Functional Combat',
    category: 'strength',
    day: 'tuesday',
    time: '06:30 AM - 07:15 AM',
    duration: '45 Min',
    difficulty: 'Intermediate',
    intensity: 4,
    coach: 'Aryan Khan',
    coachImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    room: 'Turf & Rig Zone',
    spotsLeft: 5,
    description: 'Explosive Turkish get-ups, clean & jerks, and rotational core drills to build indestructible functional armor.'
  },
  {
    id: 'c6',
    name: 'Ashtanga Primary Series Yoga',
    category: 'yoga',
    day: 'tuesday',
    time: '08:00 AM - 09:15 AM',
    duration: '75 Min',
    difficulty: 'Intermediate - Adv',
    intensity: 4,
    coach: 'Ananya Roy',
    coachImg: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=150&q=80',
    room: 'Prana Sanctuary',
    spotsLeft: 3,
    description: 'Traditional Mysore-style sequenced asanas focusing on internal heat (tapas), bandhas, and drishti gaze.'
  },
  {
    id: 'c7',
    name: 'Latin Pulse Zumba Fitness',
    category: 'zumba',
    day: 'tuesday',
    time: '06:30 PM - 07:30 PM',
    duration: '60 Min',
    difficulty: 'All Levels',
    intensity: 4,
    coach: 'Rhea Sen',
    coachImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    room: 'Pulse Dance Hall',
    spotsLeft: 8,
    description: 'High-octane Latin beats, salsa, reggaeton, and EDM dance intervals for an exhilarating, sweat-soaked cardio party.'
  },
  {
    id: 'c8',
    name: '1-on-1 Personalized Athletic Assessment',
    category: 'personal',
    day: 'tuesday',
    time: '07:30 PM - 08:30 PM',
    duration: '60 Min',
    difficulty: 'Customized',
    intensity: 4,
    coach: 'Kabir Sharma',
    coachImg: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=150&q=80',
    room: 'Private Coaching Lab',
    spotsLeft: 1,
    description: 'InBody body composition scan, biomechanical movement screen, and tailored Olympic lifting or rehabilitation plan.'
  },

  // --- WEDNESDAY ---
  {
    id: 'c9',
    name: 'Upper Body Hypertrophy & Arms',
    category: 'strength',
    day: 'wednesday',
    time: '07:00 AM - 08:00 AM',
    duration: '60 Min',
    difficulty: 'All Levels',
    intensity: 4,
    coach: 'Kabir Sharma',
    coachImg: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=150&q=80',
    room: 'Iron Pit (Zone A)',
    spotsLeft: 3,
    description: 'Heavy overhead presses, weighted pull-ups, chest fly variations, and direct arm hypertrophy supersets.'
  },
  {
    id: 'c10',
    name: 'Yin Yoga & Deep Fascial Release',
    category: 'yoga',
    day: 'wednesday',
    time: '08:30 AM - 09:30 AM',
    duration: '60 Min',
    difficulty: 'Beginner Friendly',
    intensity: 2,
    coach: 'Rhea Sen',
    coachImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    room: 'Prana Sanctuary',
    spotsLeft: 7,
    description: 'Passive floor poses held for 3–5 minutes with bolsters, releasing connective tissues, sciatic nerve, and lower back tension.'
  },
  {
    id: 'c11',
    name: 'Sprint & Plyometric Conditioning',
    category: 'hiit',
    day: 'wednesday',
    time: '06:00 PM - 06:45 PM',
    duration: '45 Min',
    difficulty: 'Advanced',
    intensity: 5,
    coach: 'Vikram Malhotra',
    coachImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    room: 'Athletic Turf',
    spotsLeft: 4,
    description: 'Box jumps, lateral bounds, curved treadmill sprints, and agility ladder drills for explosive power and agility.'
  },
  {
    id: 'c12',
    name: 'Reformer & Core Stability Clinic',
    category: 'pilates',
    day: 'wednesday',
    time: '07:00 PM - 08:00 PM',
    duration: '60 Min',
    difficulty: 'Intermediate',
    intensity: 3,
    coach: 'Natasha D\'Souza',
    coachImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    room: 'Zen Movement Studio',
    spotsLeft: 4,
    description: 'Precision spring resistance work focusing on scapular stability, posture correction, and spinal elongation.'
  },

  // --- THURSDAY ---
  {
    id: 'c13',
    name: 'Olympic Weightlifting Fundamentals',
    category: 'strength',
    day: 'thursday',
    time: '06:30 AM - 07:30 AM',
    duration: '60 Min',
    difficulty: 'Intermediate - Adv',
    intensity: 5,
    coach: 'Aryan Khan',
    coachImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    room: 'Platform Zone',
    spotsLeft: 3,
    description: 'Snatch and Clean & Jerk progressions with dedicated wooden platforms, bumper plates, and slow-motion video analysis.'
  },
  {
    id: 'c14',
    name: 'Hatha Yoga for Flexibility & Alignment',
    category: 'yoga',
    day: 'thursday',
    time: '08:00 AM - 09:00 AM',
    duration: '60 Min',
    difficulty: 'All Levels',
    intensity: 3,
    coach: 'Ananya Roy',
    coachImg: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=150&q=80',
    room: 'Prana Sanctuary',
    spotsLeft: 9,
    description: 'Classic standing, balancing, and seated postures with meticulous anatomical cues and prop support.'
  },
  {
    id: 'c15',
    name: 'Zumba High Voltage Cardio',
    category: 'zumba',
    day: 'thursday',
    time: '06:30 PM - 07:30 PM',
    duration: '60 Min',
    difficulty: 'All Levels',
    intensity: 4,
    coach: 'Rhea Sen',
    coachImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    room: 'Pulse Dance Hall',
    spotsLeft: 6,
    description: 'Upbeat international rhythms and choreo guaranteed to elevate mood, burn 600+ kcal, and boost endurance.'
  },
  {
    id: 'c16',
    name: '1-on-1 Functional Mobility & Stretch',
    category: 'personal',
    day: 'thursday',
    time: '07:30 PM - 08:30 PM',
    duration: '60 Min',
    difficulty: 'Customized',
    intensity: 2,
    coach: 'Natasha D\'Souza',
    coachImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    room: 'Recovery Suite',
    spotsLeft: 2,
    description: 'PNF stretching, percussion therapy (Hypervolt), and joint articulation to unlock stiff hips, shoulders, and spine.'
  },

  // --- FRIDAY ---
  {
    id: 'c17',
    name: 'Leg Day Annihilation & Deadlifts',
    category: 'strength',
    day: 'friday',
    time: '06:30 AM - 07:30 AM',
    duration: '60 Min',
    difficulty: 'Advanced',
    intensity: 5,
    coach: 'Kabir Sharma',
    coachImg: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=150&q=80',
    room: 'Main Iron Pit',
    spotsLeft: 2,
    description: 'Squat racks, Bulgarian split squats, Romanian deadlifts, and hip thrusts for unbreakable lower-body power.'
  },
  {
    id: 'c18',
    name: 'Chakra Awakening & Sound Bath Yoga',
    category: 'yoga',
    day: 'friday',
    time: '08:00 AM - 09:15 AM',
    duration: '75 Min',
    difficulty: 'All Levels',
    intensity: 2,
    coach: 'Ananya Roy',
    coachImg: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=150&q=80',
    room: 'Prana Sanctuary',
    spotsLeft: 5,
    description: 'Gentle flow followed by Tibetan singing bowl vibrations, binaural frequencies, and deep meditative surrender.'
  },
  {
    id: 'c19',
    name: 'Friday Fight Club Boxing & Conditioning',
    category: 'hiit',
    day: 'friday',
    time: '06:00 PM - 07:00 PM',
    duration: '60 Min',
    difficulty: 'All Levels',
    intensity: 5,
    coach: 'Vikram Malhotra',
    coachImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    room: 'Combat Boxing Ring',
    spotsLeft: 4,
    description: 'Heavy bag rounds, partner mitt drills, footwork agility, and high-intensity bodyweight combos.'
  },

  // --- SATURDAY ---
  {
    id: 'c20',
    name: 'Weekend Warrior Hero WOD',
    category: 'hiit',
    day: 'saturday',
    time: '08:00 AM - 09:00 AM',
    duration: '60 Min',
    difficulty: 'Intermediate - Adv',
    intensity: 5,
    coach: 'Vikram & Kabir',
    coachImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    room: 'Full Studio Turf',
    spotsLeft: 3,
    description: 'Our signature team workout: partner barbell relays, sled pushes, ski ergs, and rowing sprints.'
  },
  {
    id: 'c21',
    name: 'Power Yoga & Arm Balance Workshop',
    category: 'yoga',
    day: 'saturday',
    time: '09:30 AM - 10:45 AM',
    duration: '75 Min',
    difficulty: 'Intermediate',
    intensity: 4,
    coach: 'Ananya Roy',
    coachImg: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=150&q=80',
    room: 'Prana Sanctuary',
    spotsLeft: 6,
    description: 'Build confidence in Bakasana (Crow), Pincha Mayurasana (Forearm Stand), and Handstand prep with step-by-step progressions.'
  },
  {
    id: 'c22',
    name: 'Mat & Reformer Fusion Blast',
    category: 'pilates',
    day: 'saturday',
    time: '11:00 AM - 12:00 PM',
    duration: '60 Min',
    difficulty: 'All Levels',
    intensity: 3,
    coach: 'Natasha D\'Souza',
    coachImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    room: 'Zen Movement Studio',
    spotsLeft: 4,
    description: 'Dynamic fusion of classical mat exercises and resistance bands to shape lean musculature.'
  },

  // --- SUNDAY ---
  {
    id: 'c23',
    name: 'Sunday Zen: Restorative Yoga & Meditation',
    category: 'yoga',
    day: 'sunday',
    time: '08:30 AM - 09:45 AM',
    duration: '75 Min',
    difficulty: 'All Levels',
    intensity: 1,
    coach: 'Rhea Sen',
    coachImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    room: 'Prana Sanctuary',
    spotsLeft: 8,
    description: 'Deep rest, guided Yoga Nidra, and nervous system reset before stepping into the upcoming week refreshed.'
  },
  {
    id: 'c24',
    name: 'Full Body Deload & Mobility Session',
    category: 'strength',
    day: 'sunday',
    time: '10:00 AM - 11:00 AM',
    duration: '60 Min',
    difficulty: 'All Levels',
    intensity: 2,
    coach: 'Aryan Khan',
    coachImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    room: 'Athletic Turf',
    spotsLeft: 7,
    description: 'Active recovery, light kettlebell flow, CARs (Controlled Articular Rotations), and myofascial foam rolling.'
  }
];

let currentDayFilter = 'all';
let currentCategoryFilter = 'all';
let currentSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  initScheduleUI();
  initBookingModalHandlers();
});

function initScheduleUI() {
  const container = document.getElementById('schedule-cards-container');
  if (!container) return;

  // Day Tabs
  const dayTabs = document.querySelectorAll('.day-tab-btn');
  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dayTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentDayFilter = tab.getAttribute('data-day') || 'all';
      renderFilteredSchedule();
    });
  });

  // Category Pills
  const catPills = document.querySelectorAll('.filter-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategoryFilter = pill.getAttribute('data-category') || 'all';
      renderFilteredSchedule();
    });
  });

  // Search Input
  const searchInput = document.getElementById('schedule-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      renderFilteredSchedule();
    });
  }

  // Initial Render
  renderFilteredSchedule();
}

function renderFilteredSchedule() {
  const container = document.getElementById('schedule-cards-container');
  const countBadge = document.getElementById('schedule-count-badge');
  if (!container) return;

  const filtered = CLASSES_DATA.filter(item => {
    // Day check
    const matchesDay = (currentDayFilter === 'all' || item.day === currentDayFilter);
    // Category check
    const matchesCat = (currentCategoryFilter === 'all' || item.category === currentCategoryFilter);
    // Search check
    const matchesSearch = (
      !currentSearchQuery ||
      item.name.toLowerCase().includes(currentSearchQuery) ||
      item.coach.toLowerCase().includes(currentSearchQuery) ||
      item.room.toLowerCase().includes(currentSearchQuery) ||
      item.category.toLowerCase().includes(currentSearchQuery)
    );

    return matchesDay && matchesCat && matchesSearch;
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} Classes Available`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding: 60px 20px; background: #141414; border-radius: 14px; border: 1px dashed rgba(255,255,255,0.15);">
        <h3 style="font-family: var(--font-heading); color: #fff; margin-bottom: 8px;">No matching classes found</h3>
        <p style="color: var(--text-muted); margin-bottom: 20px;">Try switching days, clearing your search query, or selecting "All Categories".</p>
        <button class="btn btn-outline btn-sm" onclick="resetScheduleFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isYoga = item.category === 'yoga';
    const tagClass = isYoga ? 'badge-cyan' : (item.category === 'strength' ? 'badge' : 'badge-subtle');
    
    // Intensity indicator dots
    let intensityDots = '';
    for (let i = 1; i <= 5; i++) {
      const activeCls = i <= item.intensity ? (isYoga ? 'intensity-bar active-cyan' : 'intensity-bar active') : 'intensity-bar';
      intensityDots += `<span class="${activeCls}"></span>`;
    }

    const dayName = item.day.charAt(0).toUpperCase() + item.day.slice(1);

    return `
      <div class="schedule-item-card category-${item.category}" data-id="${item.id}">
        <div class="schedule-header-row">
          <span class="badge ${tagClass}">${item.category.toUpperCase()}</span>
          <span class="schedule-duration-pill">${item.duration} • ${dayName}</span>
        </div>

        <h3 class="schedule-class-name">${item.name}</h3>
        
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:14px;">
          ${item.description}
        </p>

        <div class="schedule-trainer-row">
          <img src="${item.coachImg}" alt="${item.coach}" class="schedule-trainer-img" loading="lazy">
          <div>
            <div style="font-weight:700; color:#fff;">Coach ${item.coach}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${item.room}</div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; font-size:0.78rem;">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="color:var(--text-muted);">Intensity:</span>
            <div class="intensity-bars">${intensityDots}</div>
          </div>
          <span class="spots-remaining-tag">🔥 ${item.spotsLeft} spots left</span>
        </div>

        <div class="schedule-footer-row">
          <div class="schedule-time-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            ${item.time}
          </div>
          <button class="btn btn-lime btn-sm" onclick="openClassBookingModal('${item.id}')">
            Book Class
          </button>
        </div>
      </div>
    `;
  }).join('');
}

window.resetScheduleFilters = function() {
  currentDayFilter = 'all';
  currentCategoryFilter = 'all';
  currentSearchQuery = '';

  document.querySelectorAll('.day-tab-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === 0);
  });
  document.querySelectorAll('.filter-pill').forEach((pill, idx) => {
    pill.classList.toggle('active', idx === 0);
  });
  const searchInput = document.getElementById('schedule-search-input');
  if (searchInput) searchInput.value = '';

  renderFilteredSchedule();
};

/* --- BOOKING MODAL LOGIC --- */
window.openClassBookingModal = function(classId) {
  const item = CLASSES_DATA.find(c => c.id === classId);
  if (!item) return;

  const titleEl = document.getElementById('booking-modal-class-title');
  const coachEl = document.getElementById('booking-modal-coach');
  const timeEl = document.getElementById('booking-modal-time');
  const classIdInput = document.getElementById('booking-class-id-input');

  if (titleEl) titleEl.textContent = item.name;
  if (coachEl) coachEl.textContent = `Coach: ${item.coach} • ${item.room}`;
  if (timeEl) timeEl.textContent = `${item.time} (${item.day.toUpperCase()})`;
  if (classIdInput) classIdInput.value = item.id;

  openModal('class-booking-modal');
};

function initBookingModalHandlers() {
  const form = document.getElementById('class-booking-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('book-name');
    const phoneInput = document.getElementById('book-phone');
    const emailInput = document.getElementById('book-email');
    const classIdInput = document.getElementById('booking-class-id-input');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const classId = classIdInput ? classIdInput.value : '';

    if (!name || name.length < 2) {
      showToast('Please enter your full name', 'error');
      nameInput.focus();
      return;
    }

    if (!phone || phone.length < 8) {
      showToast('Please enter a valid phone number', 'error');
      phoneInput.focus();
      return;
    }

    const matchedClass = CLASSES_DATA.find(c => c.id === classId) || {
      name: 'Forge Studio Workout Session',
      coach: 'Forge Elite Trainer',
      time: 'Confirmed Slot',
      day: 'Upcoming'
    };

    const passCode = 'PASS-' + Math.floor(1000 + Math.random() * 9000);

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('forge_bookings') || '[]');
    existing.unshift({
      passCode,
      name,
      phone,
      email,
      className: matchedClass.name,
      coach: matchedClass.coach,
      time: matchedClass.time,
      day: matchedClass.day,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('forge_bookings', JSON.stringify(existing));

    // Close booking modal
    closeModal('class-booking-modal');
    form.reset();

    // Populate success voucher modal
    const passCodeDisplay = document.getElementById('voucher-pass-code');
    const passClassDisplay = document.getElementById('voucher-class-name');
    const passUserDisplay = document.getElementById('voucher-user-name');
    const passTimeDisplay = document.getElementById('voucher-slot-time');
    const waConfirmBtn = document.getElementById('voucher-wa-confirm-btn');

    if (passCodeDisplay) passCodeDisplay.textContent = passCode;
    if (passClassDisplay) passClassDisplay.textContent = matchedClass.name;
    if (passUserDisplay) passUserDisplay.textContent = name;
    if (passTimeDisplay) passTimeDisplay.textContent = `${matchedClass.time} (${matchedClass.day.toUpperCase()})`;

    if (waConfirmBtn) {
      const waMsg = encodeURIComponent(
        `Hi Forge Fitness Studio! I just booked a spot for *${matchedClass.name}* (${matchedClass.time}) with Pass Code *${passCode}*. My name is ${name}. Please confirm my entry!`
      );
      waConfirmBtn.href = `https://wa.me/919876543211?text=${waMsg}`;
    }

    openModal('booking-success-modal');
    showToast(`🎉 Spot reserved for ${matchedClass.name}! Pass Code: ${passCode}`);
  });
}
