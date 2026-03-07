/* ─── PORTFOLIO PAGE LOGIC ─── */

function initProject(project) {
    // Populate header
    document.title = project.title + ' — Bluebloods HQ';
    document.getElementById('projTitle').textContent    = project.title;
    document.getElementById('projService').textContent  = project.service;
    document.getElementById('projSubtitle').textContent = project.subtitle;
  
    // Build gallery grid
    const grid = document.getElementById('galleryGrid');
    project.images.forEach((img, i) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.innerHTML = `
        <img src="${img.src}" alt="${img.caption}" loading="lazy" />
        <div class="gallery-overlay"><span>⊕</span></div>
      `;
      item.addEventListener('click', () => openLightbox(i));
      grid.appendChild(item);
    });
  
    // ── LIGHTBOX ──
    const lightbox  = document.getElementById('lightbox');
    const lbImg     = document.getElementById('lbImg');
    const lbCaption = document.getElementById('lbCaption');
    const lbCounter = document.getElementById('lbCounter');
    let current = 0;
  
    function openLightbox(idx) {
      current = idx;
      showSlide(current);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  
    function showSlide(idx) {
      const item = project.images[idx];
      lbImg.src            = item.src;
      lbImg.alt            = item.caption;
      lbCaption.textContent = item.caption;
      lbCounter.textContent = `${idx + 1} / ${project.images.length}`;
      // re-trigger animation
      lbImg.style.animation = 'none';
      lbImg.offsetHeight;   // reflow
      lbImg.style.animation = '';
    }
  
    function prev() { current = (current - 1 + project.images.length) % project.images.length; showSlide(current); }
    function next() { current = (current + 1) % project.images.length; showSlide(current); }
  
    document.getElementById('lbClose').addEventListener('click', closeLightbox);
    document.getElementById('lbPrev').addEventListener('click', prev);
    document.getElementById('lbNext').addEventListener('click', next);
  
    // Close on backdrop click
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  
    // Keyboard navigation
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     closeLightbox();
    });
  
    // Touch swipe support
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    });
  }