const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Add subtle mouse-following hover effect to the code showcase window
const mockupWindow = document.getElementById('mockup');

// Optional: light parallax on scroll for hero title
if (!prefersReducedMotion) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroTitle = document.querySelector('.hero-title');

        if (scrollY < 400 && heroTitle) {
            heroTitle.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
    });
}

// Subtle 3D tilt on the code showcase based on mouse movement
if (mockupWindow && !prefersReducedMotion) {
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

// Reveal-on-scroll: progressive enhancement only. Content is fully visible
// by default in the CSS; the "pending" (hidden) class is applied here, right
// before observing, so a page with JS disabled or reduced motion never loses
// content to a reveal that didn't fire.
function revealOnScroll(elements, { capIndex = Infinity } = {}) {
    if (prefersReducedMotion || !('IntersectionObserver' in window) || !elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach((el, i) => {
        el.style.setProperty('--i', Math.min(i, capIndex));
        el.classList.add('reveal-pending');
        observer.observe(el);
    });

    // Safety net: the observer only fires once an element's bounding box has
    // actually been through a layout pass inside the viewport. Some capture
    // tools (headless full-page screenshots, prerenderers) resize past
    // content that never gets that pass, which would otherwise strand it at
    // opacity: 0 forever. Force-reveal anything still pending after a short
    // delay so nothing ships permanently blank.
    setTimeout(() => {
        elements.forEach((el) => el.classList.add('reveal-visible'));
        observer.disconnect();
    }, 1200);
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

    revealOnScroll(document.querySelectorAll('.feature-card, .panel'));
    renderChangelog();
});

// Render Changelog
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

function renderChangelog() {
    const container = document.getElementById('changelog-container');
    if (!container || typeof App === 'undefined' || !App.changelog) return;

    // Group by year-month so a growing release history stays scannable: the
    // newest month is expanded by default, older months collapse behind a
    // single click instead of scrolling past dozens of entries.
    const groups = [];
    const groupByKey = new Map();
    App.changelog.forEach(release => {
        const key = release.date.slice(0, 7); // "YYYY-MM"
        let group = groupByKey.get(key);
        if (!group) {
            const [year, month] = key.split('-').map(Number);
            group = { label: `${MONTH_NAMES[month - 1]} ${year}`, releases: [] };
            groupByKey.set(key, group);
            groups.push(group);
        }
        group.releases.push(release);
    });

    let html = '';
    groups.forEach((group, index) => {
        const releaseWord = group.releases.length === 1 ? 'release' : 'releases';
        const cards = group.releases.map(release => `<div class="release-card">
            <h3>${release.version} <span class="release-date">${release.date}</span></h3>
            <ul>
                ${release.changes.map(c => `<li>${c}</li>`).join('')}
            </ul>
        </div>`).join('');

        html += `<details class="changelog-group expandable-item"${index === 0 ? ' open' : ''}>
            <summary>${group.label} <span class="changelog-group-count">${group.releases.length} ${releaseWord}</span></summary>
            <div class="changelog-group-body">${cards}</div>
        </details>`;
    });
    container.innerHTML = html;

    // Cap the stagger at 8 items so a 35+ release history doesn't queue a
    // multi-second reveal delay for whatever's furthest down the page.
    revealOnScroll(container.querySelectorAll('.release-card'), { capIndex: 8 });
}
