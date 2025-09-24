// Load header and footer partials then init interactivity
document.addEventListener('DOMContentLoaded', async () => {
  const headerHolder = document.getElementById('header-placeholder');
  const footerHolder = document.getElementById('footer-placeholder');
  if (headerHolder) {
    const res = await fetch('partials/header.html'); headerHolder.innerHTML = await res.text();
    initNav();
  }
  if (footerHolder) {
    const res = await fetch('partials/footer.html'); footerHolder.innerHTML = await res.text();
  }

  // Newsletter (client-side stub)
  const newsletter = document.querySelector('.newsletter-form');
  if (newsletter) {
    newsletter.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletter.querySelector('input[type="email"]').value.trim();
      if (!email) return;
      alert('Thanks! You are subscribed.');
      newsletter.reset();
    });
  }

  // Contact form AJAX
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = document.getElementById('contact-status');
      status.textContent = 'Sending...';
      const formData = new FormData(contactForm);
      try {
        const res = await fetch('server/contact.php', { method: 'POST', body: formData });
        const data = await res.json();
        status.textContent = data.message || 'Thank you! We will be in touch.';
        if (data.success) contactForm.reset();
      } catch (err) {
        status.textContent = 'Sorry, something went wrong. Please email info@womeninsafety.co.za';
      }
    });
  }

  initCookieBar();
});

function initNav() {
  const btn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.nav-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

// Cookie consent
function initCookieBar(){
  const key = 'wisc_cookie_consent';
  if (localStorage.getItem(key)) return;
  const bar = document.createElement('div');
  bar.className = 'cookiebar';
  bar.innerHTML = `
    <div>
      We use necessary cookies to improve your experience. See our <a href="privacy.html">Privacy Policy</a>.
      <div class="actions">
        <button class="btn btn-secondary" id="cookie-decline">Decline</button>
        <button class="btn btn-primary" id="cookie-accept">Accept</button>
      </div>
    </div>`;
  document.body.appendChild(bar);
  bar.style.display = 'block';
  document.getElementById('cookie-accept').onclick = () => { localStorage.setItem(key, 'accepted'); bar.remove(); };
  document.getElementById('cookie-decline').onclick = () => { localStorage.setItem(key, 'declined'); bar.remove(); };
}
