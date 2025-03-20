// Elemente auswählen
const buttonLinks = document.querySelectorAll('.button a'); // Alle <a> in .button
const iconContainers = document.querySelectorAll('.icon-container');
const image = document.querySelector('.hero-img');
const body = document.querySelector('body'); // Für Cursor-Steuerung hinzugefügt

// Variablen für die Animation
const speed = 0.1; // Geschwindigkeit der Animation
const maxDistance = 15; // Maximale Verschiebung in Pixeln

// Funktion für die Animation erstellen
function createAnimation(element) {
    let animationFrame;
    let currentX = 0;
    let currentY = 0;

    // Mouse Enter und Mousemove
    element.addEventListener('mouseenter', () => {
        body.style.cursor = 'none'; // Cursor ausblenden
        element.addEventListener('mousemove', moveElement);
    });

    // Mouse Leave
    element.addEventListener('mouseleave', resetElement);

    function moveElement(e) {
        const rect = element.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        const targetX = Math.max(-maxDistance, Math.min(maxDistance, mouseX * 0.1));
        const targetY = Math.max(-maxDistance, Math.min(maxDistance, mouseY * 0.1));

        cancelAnimationFrame(animationFrame);
        function animate() {
            currentX += (targetX - currentX) * speed;
            currentY += (targetY - currentY) * speed;

            element.style.transform = `translate(${currentX}px, ${currentY}px)`;

            if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
                animationFrame = requestAnimationFrame(animate);
            }
        }
        animationFrame = requestAnimationFrame(animate);
    }

    function resetElement() {
        element.removeEventListener('mousemove', moveElement);
        cancelAnimationFrame(animationFrame);
        body.style.cursor = 'auto'; // Cursor wieder anzeigen

        function animateReset() {
            currentX += (0 - currentX) * speed;
            currentY += (0 - currentY) * speed;

            element.style.transform = `translate(${currentX}px, ${currentY}px)`;

            if (Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
                animationFrame = requestAnimationFrame(animateReset);
            } else {
                element.style.transform = 'translate(0px, 0px)';
            }
        }
        animationFrame = requestAnimationFrame(animateReset);
    }
}

// Animation auf alle .button a-Elemente anwenden
buttonLinks.forEach(link => createAnimation(link));

// Animation auf alle Icon-Container anwenden
iconContainers.forEach(container => createAnimation(container));

// Animation auf das Hero-Image anwenden
createAnimation(image);