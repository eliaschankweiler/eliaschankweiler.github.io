document.addEventListener('DOMContentLoaded', () => {
    const navWrapper = document.querySelector('.nav-wrapper');
    const navLinks = document.querySelectorAll('.nav-list a');
    const navImg = document.querySelector('.nav-img');

    // Debounce function to prevent flickering
    function debounce(func, wait = 15) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function checkOverlap() {
        const navRect = navWrapper.getBoundingClientRect();
        const blueElements = document.querySelectorAll('.blue-bg');
        const beigeElements = document.querySelectorAll('.beige-bg');
        
        let isOverBlue = false;
        let isOverBeige = false;

        // Check blue backgrounds first (higher priority)
        blueElements.forEach(blueEl => {
            const blueRect = blueEl.getBoundingClientRect();
            const isOverlapping = !(
                navRect.bottom <= blueRect.top ||
                navRect.top >= blueRect.bottom ||
                navRect.right <= blueRect.left ||
                navRect.left >= blueRect.right
            );
            if (isOverlapping && blueEl !== navWrapper) { // Exclude nav itself
                isOverBlue = true;
            }
        });

        // Only check beige if not over blue
        if (!isOverBlue) {
            beigeElements.forEach(beigeEl => {
                const beigeRect = beigeEl.getBoundingClientRect();
                const isOverlapping = !(
                    navRect.bottom <= beigeRect.top ||
                    navRect.top >= beigeRect.bottom ||
                    navRect.right <= beigeRect.left ||
                    navRect.left >= beigeRect.right
                );
                if (isOverlapping && beigeEl !== navWrapper) { // Exclude nav itself
                    isOverBeige = true;
                }
            });
        }

        // Apply styles based on overlap
        if (isOverBlue) {
            // Over blue background
            navWrapper.classList.add('beige-bg');
            navWrapper.classList.remove('blue-bg');
            navLinks.forEach(link => {
                link.classList.add('blue');
                link.classList.remove('beige');
            });
            navImg.style.filter = 'invert(36%) sepia(94%) saturate(6542%) hue-rotate(216deg) brightness(103%) contrast(106%)';
        } else if (isOverBeige) {
            // Over beige background
            navWrapper.classList.add('blue-bg');
            navWrapper.classList.remove('beige-bg');
            navLinks.forEach(link => {
                link.classList.add('beige');
                link.classList.remove('blue');
            });
            navImg.style.filter = 'invert(90%) sepia(21%) saturate(291%) hue-rotate(323deg) brightness(107%) contrast(92%)';
        } else {
            // Default state: blue nav when unclear
            navWrapper.classList.add('blue-bg');
            navWrapper.classList.remove('beige-bg');
            navLinks.forEach(link => {
                link.classList.add('beige');
                link.classList.remove('blue');
            });
            navImg.style.filter = 'none';
        }
    }

    // Debounced scroll event listener
    const debouncedCheck = debounce(checkOverlap);
    window.addEventListener('scroll', debouncedCheck);
    
    // Run initially
    checkOverlap();
});
document.addEventListener('DOMContentLoaded', () => {
    const navWrapper = document.querySelector('.nav-wrapper');
    const navLinks = document.querySelectorAll('.nav-list a');
    const navImg = document.querySelector('.nav-img');

    // Debounce function to prevent flickering
    function debounce(func, wait = 15) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function checkOverlap() {
        if (!navWrapper || !navImg || !navLinks.length) {
            console.log('Error: Essential elements not found');
            return;
        }

        const navRect = navWrapper.getBoundingClientRect();
        const blueElements = document.querySelectorAll('.blue-bg');
        const beigeElements = document.querySelectorAll('.beige-bg');
        
        let isOverBlue = false;
        let isOverBeige = false;

        // Check blue backgrounds
        blueElements.forEach(blueEl => {
            if (blueEl !== navWrapper) { // Exclude nav itself
                const blueRect = blueEl.getBoundingClientRect();
                const isOverlapping = !(
                    navRect.bottom <= blueRect.top ||
                    navRect.top >= blueRect.bottom ||
                    navRect.right <= blueRect.left ||
                    navRect.left >= blueRect.right
                );
                if (isOverlapping) {
                    isOverBlue = true;
                    console.log('Over blue:', blueEl);
                }
            }
        });

        // Only check beige if not over blue
        if (!isOverBlue) {
            beigeElements.forEach(beigeEl => {
                if (beigeEl !== navWrapper) { // Exclude nav itself
                    const beigeRect = beigeEl.getBoundingClientRect();
                    const isOverlapping = !(
                        navRect.bottom <= beigeRect.top ||
                        navRect.top >= beigeRect.bottom ||
                        navRect.right <= beigeRect.left ||
                        navRect.left >= beigeRect.right
                    );
                    if (isOverlapping) {
                        isOverBeige = true;
                        console.log('Over beige:', beigeEl);
                    }
                }
            });
        }

        console.log('State:', { isOverBlue, isOverBeige });

        // Apply styles based on overlap
        if (isOverBlue) {
            navWrapper.classList.add('beige-bg');
            navWrapper.classList.remove('blue-bg');
            navLinks.forEach(link => {
                link.classList.add('blue');
                link.classList.remove('beige');
            });
            navImg.style.filter = 'invert(36%) sepia(94%) saturate(6542%) hue-rotate(216deg) brightness(103%) contrast(106%)';
        } else if (isOverBeige) {
            navWrapper.classList.add('blue-bg');
            navWrapper.classList.remove('beige-bg');
            navLinks.forEach(link => {
                link.classList.add('beige');
                link.classList.remove('blue');
            });
            navImg.style.filter = 'invert(90%) sepia(21%) saturate(291%) hue-rotate(323deg) brightness(107%) contrast(92%)';
        } else {
            navWrapper.classList.add('blue-bg');
            navWrapper.classList.remove('beige-bg');
            navLinks.forEach(link => {
                link.classList.add('beige');
                link.classList.remove('blue');
            });
            navImg.style.filter = 'none';
        }
    }

    // Debounced scroll event listener
    const debouncedCheck = debounce(checkOverlap);
    window.addEventListener('scroll', debouncedCheck);
    
    // Run initially
    checkOverlap();
});