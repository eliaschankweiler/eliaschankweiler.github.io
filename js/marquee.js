// Konfiguration: Hier deine Programme eintragen
const programs = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe InDesign",
  "Adobe Lightroom",
  "Figma",
  "Wordpress",
  "UI/UX-Design",
  "Corporate Design"
];

const marqueeContainer = document.getElementById('tech-marquee');

// Wir erstellen einen "Track", der sich bewegt
const track = document.createElement('div');
track.classList.add('marquee-track');

// Inhalt erstellen: Wir wiederholen die Liste oft genug, damit sie auch auf großen Bildschirmen breit genug ist
// und verdoppeln sie dann für den nahtlosen Loop-Effekt.
const programString = programs.map(item => `<span class="marquee-item">${item}</span>`).join('');

// 10x wiederholen, damit der Content sicher breiter ist als jeder Bildschirm
const content = programString.repeat(10); 

// In den Container einfügen
track.innerHTML = content;
marqueeContainer.appendChild(track);