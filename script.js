/* EDIT GUIDE (script.js)
   Nothing here needs editing for content. Change the email in index.html (#email) and
   the copy button will pick it up automatically. */
(function () {
  var doc = document.documentElement;

  /* Theme toggle: remembers the choice, label shows the mode you'd switch to */
  var themeBtn = document.getElementById('theme');
  function setLabel() { themeBtn.textContent = doc.dataset.theme === 'dark' ? 'Light' : 'Dark'; }
  setLabel();
  themeBtn.addEventListener('click', function () {
    doc.dataset.theme = doc.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', doc.dataset.theme); } catch (e) {}
    setLabel();
  });

  /* Nav: hides on scroll down, returns on scroll up */
  var nav = document.getElementById('nav'), lastY = 0;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    nav.classList.toggle('hide', y > lastY && y > 120);
    lastY = y;
  }, { passive: true });

  /* Scroll reveal */
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('in'); }); }

  /* Cursor label on project cards (mouse devices only, CSS hides it on touch) */
  var cur = document.querySelector('.cur');
  document.querySelectorAll('.card').forEach(function (c) {
    c.addEventListener('mousemove', function (e) { cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; cur.classList.add('on'); });
    c.addEventListener('mouseleave', function () { cur.classList.remove('on'); });
  });

  /* Copy email */
  var copied = document.getElementById('copied');
  document.getElementById('copy').addEventListener('click', function () {
    var mail = document.getElementById('email').textContent.trim();
    var done = function () { copied.textContent = 'Copied'; setTimeout(function () { copied.textContent = ''; }, 2000); };
    if (navigator.clipboard) { navigator.clipboard.writeText(mail).then(done, function () { copied.textContent = 'Copy failed. Select the address instead.'; }); }
    else { copied.textContent = 'Select the address to copy it.'; }
  });

  /* Certificate lightbox (native <dialog>: Esc closes, focus is handled by the browser) */
  var lb = document.getElementById('lb'), lbImg = lb.querySelector('img');
  document.querySelectorAll('.certs button').forEach(function (b) {
    b.addEventListener('click', function () { lbImg.src = b.dataset.full; lbImg.alt = b.dataset.alt; lb.showModal(); });
  });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
})();
