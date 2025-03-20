// cursorColor.js

document.addEventListener('DOMContentLoaded', () => {
  // Get CSS variables from :root
  const rootStyles = getComputedStyle(document.documentElement);
  const blueColor = rootStyles.getPropertyValue('--color-1').trim(); // #005EFF
  const beigeColor = rootStyles.getPropertyValue('--color-2').trim(); // #F5EDE1

  // Function to create regular cursor SVG (arrow) with dynamic color
  const createRegularCursorSVG = (color) => {
      return `data:image/svg+xml;utf8,<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-2 -2 34 34"><defs><style>.cls-1 {fill: ${encodeURIComponent(color)};</style></defs><g><g id="Ebene_1"><path class="cls-1" d="M20.9,20.3L3.7,1.7c-.3-.3-.7-.3-1,0-.1.1-.2.3-.2.5v26.3c0,.7.7,1,1.2.5l6.7-7.3c.1-.1.3-.2.5-.2h9.5c.4,0,.7-.3.7-.8,0-.2,0-.4-.2-.5h0Z"/><path class="cls-1" d="M3.2,30.7c-.3,0-.5,0-.8-.2-.8-.3-1.3-1.2-1.3-2.1V2.2c0-.6.2-1.2.6-1.6.4-.4.9-.7,1.5-.7.5,0,1.1.2,1.5.6l17.2,18.6c.4.4.6,1,.6,1.5,0,.6-.2,1.2-.6,1.6-.4.4-.9.7-1.5.7h-9.2l-6.5,7c-.4.4-.9.7-1.5.7h0ZM2.7,28s0,0,0,0h0ZM3.9,4v22.6l5.5-6c.4-.4.9-.7,1.4-.7h7.9L3.9,4ZM11.4,22.8h0s0,0,0,0Z"/></g></g></svg>`;
  };

  // Function to create hover cursor SVG (filled circle) with dynamic color
  const createHoverCursorSVG = (color) => {
      return `data:image/svg+xml;utf8,<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><circle cx="16" cy="16" r="9" fill="${encodeURIComponent(color)}"/></svg>`;
  };

  // Function to determine if a color is light or dark
  const isColorLight = (color) => {
      let r, g, b;
      if (color.startsWith('#')) {
          const hex = color.replace('#', '');
          r = parseInt(hex.substr(0, 2), 16);
          g = parseInt(hex.substr(2, 2), 16);
          b = parseInt(hex.substr(4, 2), 16);
      } else {
          const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (rgbMatch) {
              r = parseInt(rgbMatch[1]);
              g = parseInt(rgbMatch[2]);
              b = parseInt(rgbMatch[3]);
          } else {
              return true; // Default to light if color can't be parsed
          }
      }
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.5; // Returns true if light, false if dark
  };

  // Function to check if background matches blueColor (#005EFF)
  const isBlueBackground = (bgColor) => {
      return bgColor.toLowerCase() === blueColor.toLowerCase() || 
             bgColor === `rgb(0, 94, 255)`; // Converted #005EFF to RGB
  };

  // Apply regular cursor
  const setRegularCursor = (bgColor) => {
      const isBgLight = isColorLight(bgColor);
      const cursorColor = isBgLight ? blueColor : beigeColor;
      document.body.style.cursor = `url('${createRegularCursorSVG(cursorColor)}') 2 2, auto`;
  };

  // Apply hover cursor with special case for blue background
  const setHoverCursor = (bgColor) => {
      let cursorColor;
      if (isBlueBackground(bgColor)) {
          cursorColor = beigeColor; // Force beige on blue background
      } else {
          const isBgLight = isColorLight(bgColor);
          cursorColor = isBgLight ? blueColor : beigeColor; // Otherwise follow luminance
      }
      document.body.style.cursor = `url('${createHoverCursorSVG(cursorColor)}') 16 16, auto`;
  };

  // Mouse move event listener
  document.addEventListener('mousemove', (e) => {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (!element) return;

      // Get the computed background color of the element
      const bgColor = window.getComputedStyle(element).backgroundColor;
      let finalBgColor = bgColor;
      if (bgColor.startsWith('rgba')) {
          if (bgColor === 'rgba(0, 0, 0, 0)') {
              // Check parent elements for background color if transparent
              let parent = element.parentElement;
              while (parent && window.getComputedStyle(parent).backgroundColor === 'rgba(0, 0, 0, 0)') {
                  parent = parent.parentElement;
              }
              finalBgColor = parent ? window.getComputedStyle(parent).backgroundColor : window.getComputedStyle(document.body).backgroundColor;
          }
      }

      // Check if the element or its closest parent is a link
      const isLink = element.tagName.toLowerCase() === 'a' || element.closest('a');

      if (isLink) {
          setHoverCursor(finalBgColor);
      } else {
          setRegularCursor(finalBgColor);
      }
  });
});