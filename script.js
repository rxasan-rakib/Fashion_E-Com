// --- Category Slider Logic ---
(function () {
    const track = document.getElementById("cat-track");
    const prev = document.getElementById("cat-prev");
    const next = document.getElementById("cat-next");
    const dotsWrap = document.getElementById("cat-dots");
    if (!track || !prev || !next || !dotsWrap) return;

    const slides = Array.from(track.children);
    let current = 0;
    let autoTimer;

        const getVisible = () => {
        const w = window.innerWidth;
        if (w < 576) return 1;    // Mobile: 1 Card
        if (w < 992) return 2;    // Tablet: 2 Cards
        if (w < 1200) return 3;   // Laptop: 3 Cards
        return 4;                 // Desktop: 4 Cards
    };

    function update() {
        if (!slides[0]) return;
        const visible = getVisible();
        const max = slides.length - visible;
        current = Math.min(Math.max(current, 0), max);

        const slideWidth = slides[0].getBoundingClientRect().width;
        let gap = 20;
        if (window.innerWidth < 576) gap = 0;
        else if (window.innerWidth < 992) gap = 10;
        
        const offset = current * (slideWidth + gap);

        track.style.transform = "translateX(-" + offset + "px)";

        if (prev) prev.disabled = (current === 0);
        if (next) next.disabled = (current >= max);

        const dots = dotsWrap.querySelectorAll(".cat-dot");
        dots.forEach((d, i) => d.classList.toggle("active", i === current));
    }

    function init() {
        const visible = getVisible();
        const max = slides.length - visible;
        dotsWrap.innerHTML = "";
        for (let i = 0; i <= max; i++) {
            const d = document.createElement("button");
            d.className = "cat-dot" + (i === current ? " active" : "");
            d.onclick = () => { current = i; update(); resetAuto(); };
            dotsWrap.appendChild(d);
        }
        update();
        startAuto();
    }

    function startAuto() {
        stopAuto();
        autoTimer = setInterval(() => {
            const visible = getVisible();
            const max = slides.length - visible;
            current = (current >= max) ? 0 : current + 1;
            update();
        }, 2500);
    }

    function stopAuto() { clearInterval(autoTimer); }
    function resetAuto() { stopAuto(); startAuto(); }

    if (prev) prev.onclick = () => { current--; update(); resetAuto(); };
    if (next) next.onclick = () => { current++; update(); resetAuto(); };

    window.addEventListener("resize", () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(init, 100);
    });

    window.addEventListener("load", init);
    init();
})();

// --- Search Popup Logic ---
document.addEventListener('DOMContentLoaded', function () {
    const searchTrigger = document.getElementById('searchTrigger');
    const searchPopup = document.getElementById('searchPopup');

    if (searchTrigger && searchPopup) {
        searchTrigger.addEventListener('click', function (e) {
            e.preventDefault();
            searchPopup.classList.toggle('active');
            if (searchPopup.classList.contains('active')) {
                const input = searchPopup.querySelector('input');
                if (input) setTimeout(() => input.focus(), 300);
            }
        });

        // Close when clicking outside
        document.addEventListener('click', function (e) {
            if (!searchTrigger.contains(e.target) && !searchPopup.contains(e.target)) {
                searchPopup.classList.remove('active');
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                searchPopup.classList.remove('active');
            }
        });
    }
});

// --- Loading Spinner Handling ---
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// --- Testimonial Swiper Initialization ---
document.addEventListener('DOMContentLoaded', function () {
    if (typeof Swiper !== 'undefined') {
        new Swiper(".testimonialSwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
        });
    }
});