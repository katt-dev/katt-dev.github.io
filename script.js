document.addEventListener('DOMContentLoaded', () => {
    // --- NAVIGATION LOGIC ---
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn');
    const pages = document.querySelectorAll('.page');

    function navigateTo(targetId) {
        // Remove active class from all pages and nav links
        pages.forEach(page => page.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

        // Add active class to target page
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Add active class to corresponding nav link in the header
        const targetNavLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        if (targetNavLink) {
            targetNavLink.classList.add('active');
        }

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Attach click events to all navigation elements
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            navigateTo(targetId);
        });
    });

    // --- BACKGROUND PARTICLE ANIMATION ---
    // Creates a very subtle falling/floating paw print effect
    const bgContainer = document.getElementById('bg-animation');
    
    function createPawParticle() {
        const paw = document.createElement('i');
        paw.classList.add('fas', 'fa-paw', 'paw-particle');
        
        // Randomize starting position, size, and animation duration
        const startPosX = Math.random() * window.innerWidth;
        const size = Math.random() * 1.5 + 0.5; // Between 0.5rem and 2rem
        const duration = Math.random() * 10 + 15; // Between 15s and 25s

        paw.style.left = `${startPosX}px`;
        paw.style.fontSize = `${size}rem`;
        paw.style.animationDuration = `${duration}s`;

        bgContainer.appendChild(paw);

        // Remove the element after animation completes to keep DOM clean
        setTimeout(() => {
            paw.remove();
        }, duration * 1000);
    }

    // Spawn a new particle every 3 seconds
    setInterval(createPawParticle, 3000);

    // Initial spawn
    for(let i = 0; i < 5; i++) {
        setTimeout(createPawParticle, i * 500);
    }
});
