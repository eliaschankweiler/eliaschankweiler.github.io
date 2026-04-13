const cursor = document.getElementById('custom-cursor');
const cursorLabel = cursor.querySelector('.cursor-label');
const header = document.querySelector('.side-nav');
let lastScrollY = window.scrollY;

// Header Hide/Show Logik
window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    // Scroll nach unten -> Verstecken (nach links)
    header.classList.add('header--hidden');
  } else {
    // Scroll nach oben -> Zeigen
    header.classList.remove('header--hidden');
  }
  lastScrollY = window.scrollY;
});

// Deaktivieren auf Touch-Geräten
if (window.matchMedia("(pointer: coarse)").matches) {
  if (cursor) cursor.style.display = 'none';
} else {

// Cursor Position folgen lassen
window.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Interaktive Elemente für den Label-Effekt
document.querySelectorAll('.btn-primary, .project-item, .nav-link, .btn-editorial').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
    
    // Text-Logik
    if (el.classList.contains('project-item')) {
      const title = el.querySelector('.card-portfolio__title').innerText;
      cursorLabel.innerText = title;
    } else if (el.hasAttribute('data-label')) {
      cursorLabel.innerText = el.getAttribute('data-label');
    } else {
      cursorLabel.innerText = el.innerText;
    }
  });

  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });
});
}

// Spotlight Effekt beibehalten
document.querySelectorAll('.card-portfolio, .btn-primary, .side-nav').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});