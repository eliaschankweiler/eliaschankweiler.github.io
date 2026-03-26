const cursor = document.getElementById('custom-cursor');
const cursorLabel = cursor.querySelector('.cursor-label');

// Cursor Position folgen lassen
window.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Interaktive Elemente für den Label-Effekt
document.querySelectorAll('.btn-primary, .project-item, header nav a, .btn-editorial').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
    
    // Text-Logik
    if (el.classList.contains('project-item')) {
      // Nimm die Headline aus der Karte
      const title = el.querySelector('.card-portfolio__title').innerText;
      cursorLabel.innerText = title;
    } else {
      // Nimm den Text des Buttons/Links
      cursorLabel.innerText = el.innerText;
    }
  });

  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });
});

// Spotlight Effekt beibehalten
document.querySelectorAll('.card-portfolio, .btn-primary').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});