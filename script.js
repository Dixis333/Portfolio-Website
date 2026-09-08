// ===========================================================
// Mobiles Menü öffnen/schließen
// ===========================================================
const navToggle = document.getElementById('navToggle');
const mainNav = document.querySelector('.main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Menü schließen, wenn ein Link angeklickt wird (mobile)
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===========================================================
// Projekt-Vorschau: Bild folgt dem Mauszeiger beim Hover
// (nur auf Geräten mit Maus – auf Touch-Geräten deaktiviert)
// ===========================================================
const isTouchDevice = window.matchMedia('(hover: none)').matches;

if (!isTouchDevice) {
  const projectLinks = document.querySelectorAll('.project-link');
  const previewLayer = document.getElementById('previewLayer');

  projectLinks.forEach(link => {
    const previewId = link.dataset.preview;
    const previewEl = document.getElementById(previewId);

    link.addEventListener('mouseenter', () => {
      previewEl.classList.add('active');
    });

    link.addEventListener('mouseleave', () => {
      previewEl.classList.remove('active');
    });

    link.addEventListener('mousemove', (e) => {
      previewEl.style.left = `${e.clientX + 24}px`;
      previewEl.style.top = `${e.clientY - 80}px`;
    });
  });
}
