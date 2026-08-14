// Wait for load instead of DOMContentLoaded to ensure resources don't fight the background script
window.addEventListener('load', () => {
    // --- NAVIGATION LOGIC ---
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn');
    const pages = document.querySelectorAll('.page');

    function navigateTo(targetId) {
        // Remove active class
        pages.forEach(page => page.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

        // Add active class to page
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Add active class to header link
        const targetNavLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        if (targetNavLink) {
            targetNavLink.classList.add('active');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            navigateTo(targetId);
        });
    });

    // --- BACKGROUND PARTICLE ANIMATION ---
    const bgContainer = document.getElementById('bg-animation');
    
    function createPawParticle() {
        const paw = document.createElement('i');
        paw.classList.add('fas', 'fa-paw', 'paw-particle');
        
        const startPosX = Math.random() * window.innerWidth;
        const size = Math.random() * 1.2 + 0.8; // 0.8rem to 2rem
        const duration = Math.random() * 12 + 15; // 15s to 27s
        const swayDuration = Math.random() * 3 + 2; // 2s to 5s sway

        paw.style.left = `${startPosX}px`;
        paw.style.fontSize = `${size}rem`;
        paw.style.animationDuration = `${duration}s, ${swayDuration}s`;

        bgContainer.appendChild(paw);

        setTimeout(() => {
            if (paw.parentNode) paw.remove();
        }, duration * 1000);
    }

    // Spawn smoothly
    setInterval(createPawParticle, 2500);

    // Initial scatter
    for(let i = 0; i < 6; i++) {
        setTimeout(createPawParticle, i * 400);
    }
});
