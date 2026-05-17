/* ═══════════════════════════════════════════════════════════════════
   MAIN.JS — Portfolio interactions
   ═══════════════════════════════════════════════════════════════════ */

/* ── 1. NAV scroll state ─────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── 2. Mobile menu ──────────────────────────────────────────────── */
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── 3. Hero orbital canvas ──────────────────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById('orbitCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const AMBER  = 'rgba(245, 166, 35,';
  const WHITE  = 'rgba(232, 234, 240,';

  // Orbital rings config
  const orbits = [
    { rx: 0.38, ry: 0.16, speed: 0.00018, phase: 0,    dotR: 3,   color: AMBER },
    { rx: 0.55, ry: 0.22, speed: 0.00012, phase: 1.2,  dotR: 2.2, color: WHITE },
    { rx: 0.70, ry: 0.28, speed: 0.00008, phase: 2.4,  dotR: 1.8, color: AMBER },
    { rx: 0.85, ry: 0.34, speed: 0.00005, phase: 3.8,  dotR: 2,   color: WHITE },
  ];

  // Static star field
  const stars = Array.from({ length: 140 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.1 + 0.2,
    a: Math.random() * 0.5 + 0.05,
  }));

  let t = 0;
  let animId;

  function draw() {
    const W = canvas.width, H = canvas.height;
    const cx = W * 0.5, cy = H * 0.52;

    ctx.clearRect(0, 0, W, H);

    // Stars
    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `${WHITE}${s.a})`;
      ctx.fill();
    });

    // Subtle radial glow from center
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.5);
    grad.addColorStop(0,   'rgba(245,166,35,0.04)');
    grad.addColorStop(0.5, 'rgba(245,166,35,0.015)');
    grad.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Draw orbits + dots
    orbits.forEach(o => {
      const rx = W * o.rx;
      const ry = H * o.ry;

      // Ellipse ring
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `${o.color}0.08)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Dot position along ellipse
      const angle = o.phase + t * o.speed * 1000;
      const dx = cx + rx * Math.cos(angle);
      const dy = cy + ry * Math.sin(angle);

      // Glow
      const glow = ctx.createRadialGradient(dx, dy, 0, dx, dy, o.dotR * 5);
      glow.addColorStop(0,   `${o.color}0.5)`);
      glow.addColorStop(0.5, `${o.color}0.1)`);
      glow.addColorStop(1,   `${o.color}0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(dx - o.dotR * 5, dy - o.dotR * 5, o.dotR * 10, o.dotR * 10);

      // Core dot
      ctx.beginPath();
      ctx.arc(dx, dy, o.dotR, 0, Math.PI * 2);
      ctx.fillStyle = `${o.color}0.9)`;
      ctx.fill();
    });

    t = performance.now();
    animId = requestAnimationFrame(draw);
  }

  // Pause when off-screen for perf
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { if (!animId) animId = requestAnimationFrame(draw); }
      else                  { cancelAnimationFrame(animId); animId = null; }
    });
  }, { threshold: 0 });
  observer.observe(canvas);

  animId = requestAnimationFrame(draw);
})();

/* ── 4. Profile photo graceful load ─────────────────────────────── */
const profilePhoto   = document.getElementById('profilePhoto');
const photoPlaceholder = document.getElementById('photoPlaceholder');

if (profilePhoto) {
  profilePhoto.addEventListener('load', () => {
    profilePhoto.style.display = 'block';
    if (photoPlaceholder) photoPlaceholder.style.display = 'none';
  });
  profilePhoto.addEventListener('error', () => {
    profilePhoto.style.display = 'none';
    if (photoPlaceholder) photoPlaceholder.style.display = 'flex';
  });
}

/* ── 5. Scroll reveal ────────────────────────────────────────────── */
function initReveal() {
  const targets = [
    ...document.querySelectorAll('.project-card'),
    ...document.querySelectorAll('.tl-item'),
    ...document.querySelectorAll('.skill-group'),
    ...document.querySelectorAll('.about-grid > *'),
  ];

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => io.observe(el));
}
initReveal();

/* ── 6. Project filtering ────────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const tags = card.dataset.tags || '';
      if (filter === 'all' || tags.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ── 7. Smooth active nav link highlight on scroll ───────────────── */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--amber)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
