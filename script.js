// Add subtle mouse-following hover effect to the code showcase window
const mockupWindow = document.getElementById('mockup');

// Optional: Parallax scaling on scroll for hero title
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroTitle = document.querySelector('.hero-title');

    if (scrollY < 400 && heroTitle) {
        heroTitle.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
});

// Subtle 3D tilt on the code showcase based on mouse movement
if (mockupWindow) {
    mockupWindow.addEventListener('mousemove', (e) => {
        const rect = mockupWindow.getBoundingClientRect();

        // Calculate mouse position relative to the center of the element
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Dampen the effect
        const rotateX = -y * 0.05;
        const rotateY = x * 0.05;

        mockupWindow.style.transform = `scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        mockupWindow.style.transition = 'transform 0.1s ease-out';
    });

    mockupWindow.addEventListener('mouseleave', () => {
        mockupWindow.style.transform = `scale(1) perspective(1000px) rotateX(0) rotateY(0)`;
        mockupWindow.style.transition = 'transform 0.5s ease-in-out';
    });
}

// Localization Logic
function setLang(lang) {
    // Update active button state
    document.getElementById('btn-en').classList.remove('active');
    document.getElementById('btn-it').classList.remove('active');
    document.getElementById('btn-' + lang).classList.add('active');

    // Find all translatable elements
    const translatableElements = document.querySelectorAll('[data-en][data-it]');

    // Update text content with innerHTML to preserve markdown/HTML tags inside translations
    translatableElements.forEach(el => {
        if (el.dataset[lang]) {
            el.innerHTML = el.dataset[lang];
        }
    });
}

// Mobile Hamburger Menu Toggle
function toggleMobileMenu() {
    const nav = document.getElementById('nav-links');
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('nav-overlay');
    if (nav) nav.classList.toggle('open');
    if (hamburger) hamburger.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
}

// Close mobile menu when a link is clicked
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById('nav-links');
            const hamburger = document.getElementById('hamburger');
            const overlay = document.getElementById('nav-overlay');
            if (nav) nav.classList.remove('open');
            if (hamburger) hamburger.classList.remove('open');
            if (overlay) overlay.classList.remove('open');
        });
    });

    renderChangelog();
});

// Render Changelog
function renderChangelog() {
    const container = document.getElementById('changelog-container');
    if (!container || !window.App || !window.App.changelog) return;

    let html = '';
    App.changelog.forEach(release => {
        html += `<div class="release-card" style="margin-bottom: 24px; padding: 20px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px;">
            <h3 style="margin-top: 0; color: var(--accent); border-bottom: 1px solid var(--border); padding-bottom: 8px; margin-bottom: 16px;">
                ${release.version} <span style="float: right; font-size: 0.85em; color: var(--text-light);">${release.date}</span>
            </h3>
            <ul style="padding-left: 20px;">
                ${release.changes.map(c => `<li style="margin-bottom: 8px;">${c}</li>`).join('')}
            </ul>
        </div>`;
    });
    container.innerHTML = html;
}
