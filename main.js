/* main.js */
(function() {
  'use strict';

  // --- Demo bar dismiss ---
  const demoBar = document.getElementById('demoBar');
  const dismissBtn = document.getElementById('dismissDemoBar');
  if (dismissBtn && demoBar) {
    if (localStorage.getItem('ankDemoDismissed') === 'true') demoBar.style.display = 'none';
    dismissBtn.addEventListener('click', () => {
      demoBar.style.display = 'none';
      localStorage.setItem('ankDemoDismissed', 'true');
    });
  }

  // --- Hero embers (max 12) ---
  const embersContainer = document.getElementById('heroEmbers');
  if (embersContainer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (let i = 0; i < 12; i++) {
      const ember = document.createElement('span');
      ember.className = 'ember';
      ember.style.left = (Math.random() * 100) + '%';
      ember.style.animationDelay = (Math.random() * 6) + 's';
      ember.style.animationDuration = (4 + Math.random() * 4) + 's';
      embersContainer.appendChild(ember);
    }
  }

  // --- Flavour explorer data ---
  const flavours = {
    highlands: [
      { name: 'Highlands mumu', desc: 'Earth oven pork with sweet potato and greens.', heat: 2, smoke: 3, price: 45 },
      { name: 'Kaukau chips', desc: 'Crispy sweet potato, lightly salted.', heat: 1, smoke: 1, price: 12 },
      { name: 'Pitpit chicken', desc: 'Grilled chicken with highland herbs.', heat: 2, smoke: 3, price: 32 }
    ],
    momase: [
      { name: 'Lae fish grill', desc: 'Fresh fish, charred and served with lime.', heat: 2, smoke: 3, price: 38 },
      { name: 'Saksak prawns', desc: 'Sago and prawn parcels, steamed.', heat: 1, smoke: 1, price: 42 },
      { name: 'Momase greens', desc: 'Kumu with coconut and ginger.', heat: 2, smoke: 1, price: 18 }
    ],
    papua: [
      { name: 'Port Moresby platter', desc: 'Mixed grill with kumu and rice.', heat: 3, smoke: 4, price: 55 },
      { name: 'Kokoda', desc: 'Fish cured in lime and coconut cream.', heat: 2, smoke: 1, price: 30 },
      { name: 'Sago pudding', desc: 'Sweet sago with cream.', heat: 0, smoke: 0, price: 15 }
    ],
    islands: [
      { name: 'Rabaul barbecue', desc: 'Our signature smoky grilled chicken.', heat: 2, smoke: 4, price: 28 },
      { name: 'Island kumu', desc: 'Leafy greens slow-cooked in coconut.', heat: 1, smoke: 2, price: 18 },
      { name: 'Tuna steak', desc: 'Seared tuna with island spices.', heat: 2, smoke: 2, price: 40 }
    ]
  };

  const flavourCards = document.getElementById('flavourCards');
  const regionChips = document.querySelectorAll('.region-chip');

  function renderFlavours(region) {
    if (!flavourCards) return;
    flavourCards.classList.add('fading');
    setTimeout(() => {
      const items = flavours[region] || [];
      flavourCards.innerHTML = items.map(item => {
        const heatDots = Array.from({length: 5}, (_, i) => `<span class="${i < item.heat ? 'on' : ''}"></span>`).join('');
        const smokeDots = Array.from({length: 5}, (_, i) => `<span class="${i < item.smoke ? 'on' : ''}"></span>`).join('');
        return `<div class="col-md-4">
          <div class="flavour-card">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <div class="flavour-meta">
              <span>Heat <span class="meter">${heatDots}</span></span>
              <span>Smoke <span class="meter">${smokeDots}</span></span>
              <span class="price-tag">K${item.price}</span>
            </div>
          </div>
        </div>`;
      }).join('');
      flavourCards.classList.remove('fading');
    }, 200);
  }

  regionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      regionChips.forEach(c => { c.classList.remove('active'); c.setAttribute('aria-selected', 'false'); });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');
      renderFlavours(chip.dataset.region);
    });
  });
  if (flavourCards) renderFlavours('highlands');

  // --- Menu data and filters ---
  const menuItems = [
    { name: 'Grilled chicken', cat: 'abus', desc: 'Smoky, charred, family-style.', price: 28 },
    { name: 'Rabaul barbecue pork', cat: 'abus', desc: 'Slow-grilled with island spices.', price: 32 },
    { name: 'Beef skewers', cat: 'abus', desc: 'Tender beef, grilled over fire.', price: 35 },
    { name: 'Kumu greens', cat: 'kumu', desc: 'Slow-cooked with coconut and ginger.', price: 18 },
    { name: 'Sweet potato chips', cat: 'kumu', desc: 'Crispy kaukau, lightly salted.', price: 12 },
    { name: 'Island salad', cat: 'kumu', desc: 'Fresh greens with lime dressing.', price: 15 },
    { name: 'Mumu platter', cat: 'mumu', desc: 'Earth oven flavours, shared platter.', price: 65 },
    { name: 'Family mumu', cat: 'mumu', desc: 'Large shared platter for 4–6.', price: 120 },
    { name: 'Coconut water', cat: 'drinks', desc: 'Fresh young coconut.', price: 8 },
    { name: 'Tropical juice', cat: 'drinks', desc: 'Passionfruit and mango.', price: 10 },
    { name: 'Coffee', cat: 'drinks', desc: 'PNG highlands coffee.', price: 7 }
  ];

  const menuGrid = document.getElementById('menuGrid');
  const filterChips = document.querySelectorAll('.filter-chip');

  function renderMenu(filter) {
    if (!menuGrid) return;
    const filtered = filter === 'all' ? menuItems : menuItems.filter(m => m.cat === filter);
    menuGrid.innerHTML = filtered.map(item => `
      <div class="col-md-4">
        <div class="dish-card p-4 h-100">
          <h3 class="h5 text-cream">${item.name}</h3>
          <p class="text-cream-muted small mb-2">${item.desc}</p>
          <span class="price-tag">K${item.price}</span>
        </div>
      </div>
    `).join('');
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderMenu(chip.dataset.filter);
    });
  });
  if (menuGrid) renderMenu('all');

  // --- Story timeline drawing line ---
  const timelineLine = document.getElementById('timelineLine');
  const storyTimeline = document.getElementById('storyTimeline');
  if (timelineLine && storyTimeline) {
    const updateLine = () => {
      const rect = storyTimeline.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const totalH = rect.height;
      const scrolled = Math.min(Math.max(viewportH - rect.top, 0), totalH);
      const pct = (scrolled / totalH) * 100;
      timelineLine.style.height = pct + '%';
    };
    window.addEventListener('scroll', updateLine, { passive: true });
    updateLine();
  }

  // --- Catering quote form ---
  const cateringForm = document.getElementById('cateringForm');
  const guestSlider = document.getElementById('guestSlider');
  const guestCount = document.getElementById('guestCount');
  const estimateTotal = document.getElementById('estimateTotal');
  const estimateBreakdown = document.getElementById('estimateBreakdown');
  const packageBtns = document.querySelectorAll('.package-btn');
  const cateringSuccess = document.getElementById('cateringSuccess');
  const cateringWhatsapp = document.getElementById('cateringWhatsapp');
  let currentPackagePrice = 25;

  function updateEstimate() {
    const guests = parseInt(guestSlider.value, 10);
    let total = guests * currentPackagePrice;
    let breakdown = `${guests} guests × K${currentPackagePrice}/head`;
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
      const price = parseInt(cb.dataset.price, 10);
      if (cb.id === 'addSetup') {
        total += price;
        breakdown += ` + K${price} setup`;
      } else {
        total += price * guests;
        breakdown += ` + K${price}/head`;
      }
    });
    if (estimateTotal) estimateTotal.textContent = 'K' + total.toLocaleString();
    if (estimateBreakdown) estimateBreakdown.textContent = breakdown;
  }

  packageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      packageBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPackagePrice = parseInt(btn.dataset.price, 10);
      updateEstimate();
    });
  });

  if (guestSlider) {
    guestSlider.addEventListener('input', () => {
      guestCount.textContent = guestSlider.value;
      updateEstimate();
    });
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', updateEstimate);
    });
    updateEstimate();
  }

  if (cateringForm) {
    cateringForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!cateringForm.checkValidity()) {
        cateringForm.classList.add('was-validated');
        return;
      }
      const name = document.getElementById('cateringName')?.value || 'Friend';
      const email = document.getElementById('cateringEmail')?.value || '';
      const guests = guestSlider?.value || '20';
      const date = document.getElementById('cateringDate')?.value || 'TBC';
      const total = estimateTotal?.textContent || '';
      const text = `Hello Abus Na Kumu! I'd like a catering quote. Name: ${name}. Email: ${email}. Guests: ${guests}. Date: ${date}. Estimate: ${total}. (Demo)`;
      const url = `https://wa.me/67512345678?text=${encodeURIComponent(text)}`;
      if (cateringWhatsapp) cateringWhatsapp.href = url;
      cateringForm.classList.add('d-none');
      if (cateringSuccess) cateringSuccess.classList.remove('d-none');
    });
  }

  // --- Contact form ---
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  const contactWhatsapp = document.getElementById('contactWhatsapp');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }
      const name = document.getElementById('contactName')?.value || 'Friend';
      const email = document.getElementById('contactEmail')?.value || '';
      const message = document.getElementById('contactMessage')?.value || '';
      const text = `Hello Abus Na Kumu! My name is ${name}. Email: ${email}. Message: ${message} (Demo)`;
      const url = `https://wa.me/67512345678?text=${encodeURIComponent(text)}`;
      if (contactWhatsapp) contactWhatsapp.href = url;
      contactForm.classList.add('d-none');
      if (contactSuccess) contactSuccess.classList.remove('d-none');
    });
  }

})();