document.addEventListener('DOMContentLoaded', () => {
 
  // ── SLIDER HERO ──
  const slides = document.querySelectorAll(".slide");
  let index = 0;
 
  function nextSlide() {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }
 
  if (slides.length) setInterval(nextSlide, 4000);
 
  // ── HEADER SCROLL ──
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 10);
  });
 
  // ── TOGGLE PLANOS ──
  window.setMode = function(mode) {
    document.getElementById('btn-mensal')?.classList.toggle('active', mode === 'mensal');
    document.getElementById('btn-anual')?.classList.toggle('active', mode === 'anual');
    document.querySelectorAll('.card-price').forEach(el => el.textContent = el.getAttribute('data-' + mode));
    document.querySelectorAll('.card-price-note').forEach(el => el.textContent = el.getAttribute('data-' + mode));
  };
 
  // ── MENU HAMBURGUER ──
  const hamburger = document.querySelector('.hamburger');
  const nav       = document.querySelector('.header nav');
  const overlay   = document.querySelector('.nav-overlay');
  const dropdown  = document.querySelector('.dropdown');
  const menuItems = document.querySelectorAll('.menu-item');
 
  function closeMenu() {
    nav?.classList.remove('open');
    hamburger?.classList.remove('open');
    overlay?.classList.remove('open');
    dropdown?.classList.remove('open');
    menuItems.forEach(i => i.classList.remove('open'));
  }
 
  hamburger?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    overlay?.classList.toggle('open', isOpen);
  });
 
  overlay?.addEventListener('click', closeMenu);
 
  nav?.querySelectorAll('a:not(.dropbtn)').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
 
  document.querySelector('.dropbtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown?.classList.toggle('open');
  });
 
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = item.classList.contains('open');
      menuItems.forEach(i => i.classList.remove('open'));
      item.classList.toggle('open', !wasOpen);
    });
  });
 
  // ── SWIPER PLANOS ──
  let swiper = null;
 
  function initPlanosSwiper() {
    if (window.innerWidth >= 1024) {
      if (swiper) { swiper.destroy(true, true); swiper = null; }
      return;
    }
    if (swiper) return;
    swiper = new Swiper('.planos-swiper', {
      slidesPerView: 'auto',
      centeredSlides: true,
      centeredSlidesBounds: true,
      spaceBetween: 16,
      speed: 600,
      grabCursor: true,
      resistanceRatio: 0,
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        768: { slidesPerView: 2, centeredSlides: false, spaceBetween: 20 },
      },
    });
  }
 
  initPlanosSwiper();
  window.addEventListener('resize', initPlanosSwiper);
 
  // ── EMAILJS ──
  emailjs.init("EONFOf95uOSMt9_vh");
 
  document.querySelector('#contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
 
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;
 
    emailjs.send("service_qvq6c0v", "template_t1q0vuj", {
      nome:     document.querySelector('#nome').value,
      email:    document.querySelector('#email').value,
      assunto:  document.querySelector('#assunto').value,
      mensagem: document.querySelector('#mensagem').value,
    })
    .then(() => {
      btn.textContent = 'Mensagem enviada! ✓';
      e.target.reset();
      setTimeout(() => {
        btn.textContent = 'Enviar mensagem';
        btn.disabled = false;
      }, 3000);
    })
    .catch(() => {
      btn.textContent = 'Erro ao enviar. Tente novamente.';
      btn.disabled = false;
    });
  });
 
});