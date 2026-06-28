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

// --- Lookbook Slider Logic ---
(function () {
    const track = document.getElementById("lookbook-track");
    const prev = document.getElementById("lookbook-prev");
    const next = document.getElementById("lookbook-next");
    const dotsWrap = document.getElementById("lookbook-dots");
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
        clearTimeout(window.lookbookResizeTimer);
        window.lookbookResizeTimer = setTimeout(init, 100);
    });

    window.addEventListener("load", init);
    init();
})();

// --- Search Popup Logic ---
document.addEventListener('DOMContentLoaded', function () {
    const searchTrigger = document.getElementById('searchTrigger');
    const searchPopup = document.getElementById('searchPopup');
    const searchTriggerMobile = document.getElementById('searchTriggerMobile');
    const searchPopupMobile = document.getElementById('searchPopupMobile');

    function setupSearch(trigger, popup) {
        if (trigger && popup) {
            trigger.addEventListener('click', function (e) {
                e.preventDefault();
                popup.classList.toggle('active');
                if (popup.classList.contains('active')) {
                    const input = popup.querySelector('input');
                    if (input) setTimeout(() => input.focus(), 300);
                }
            });

            // Close when clicking outside
            document.addEventListener('click', function (e) {
                if (!trigger.contains(e.target) && !popup.contains(e.target)) {
                    popup.classList.remove('active');
                }
            });

            // Close on Escape key
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                    popup.classList.remove('active');
                }
            });
        }
    }

    setupSearch(searchTrigger, searchPopup);
    setupSearch(searchTriggerMobile, searchPopupMobile);
});

// --- Loading Spinner Handling ---
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 150);
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

// --- Product Quick View / Add to Cart Modal Logic ---
document.addEventListener('DOMContentLoaded', function () {
    const quickModalEl = document.getElementById('quickViewModal');
    if (!quickModalEl) return;

    const quickModal = new bootstrap.Modal(quickModalEl);
    const modalImg = document.getElementById('modalProductImg');
    const modalTitle = document.getElementById('modalProductTitle');
    const modalPrice = document.getElementById('modalProductPrice');
    const modalOldPrice = document.getElementById('modalProductOldPrice');
    const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');

    // Use Event Delegation to capture clicks on ALL product card "Add to Cart" buttons
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.product-card a[title="Add to Cart"], .product-card a[href="cart.html"], .product-card .action-btn');
        if (!btn) return;

        // Ensure it's a cart action button
        const isCartBtn = btn.title === 'Add to Cart' || 
                           btn.getAttribute('href') === 'cart.html' || 
                           btn.querySelector('.fa-shopping-cart') || 
                           btn.classList.contains('fa-shopping-cart');

        if (isCartBtn) {
            e.preventDefault();
            e.stopPropagation();

            const card = btn.closest('.product-card');
            if (!card) return;

            // Extract details dynamically
            const title = card.querySelector('.product-title') ? card.querySelector('.product-title').innerText : '';
            const imgEl = card.querySelector('.product-img-wrapper img');
            const img = imgEl ? imgEl.src : '';
            
            const priceEl = card.querySelector('.discount-price');
            const price = priceEl ? priceEl.innerText : '';
            
            const oldPriceEl = card.querySelector('.old-price');
            const oldPrice = oldPriceEl ? oldPriceEl.innerText : '';

            // Populate Modal Fields
            if (modalImg) modalImg.src = img;
            if (modalTitle) modalTitle.innerText = title;
            if (modalPrice) modalPrice.innerText = price;
            if (modalOldPrice) {
                modalOldPrice.innerText = oldPrice;
                modalOldPrice.style.display = oldPrice ? 'inline-block' : 'none';
            }

            // Reset quantity to 1 when modal is opened
            const modalQtyInput = document.getElementById('modalQtyInput');
            if (modalQtyInput) {
                modalQtyInput.value = '1';
            }

            // Open Modal
            quickModal.show();
        }
    });

    // Ensure close/dismiss buttons inside the modal work reliably via event delegation
    document.addEventListener('click', function (event) {
        const closeBtn = event.target.closest('[data-bs-dismiss="modal"]');
        if (closeBtn) {
            event.preventDefault();
            event.stopPropagation();
            quickModal.hide();
        }
    });

    // Handle Quantity Up/Down inside Modal
    const modalQtyInput = document.getElementById('modalQtyInput');
    const modalQtyMinus = document.querySelector('.modal-qty-minus');
    const modalQtyPlus = document.querySelector('.modal-qty-plus');

    if (modalQtyMinus && modalQtyPlus && modalQtyInput) {
        modalQtyMinus.addEventListener('click', function () {
            let val = parseInt(modalQtyInput.value) || 1;
            if (val > 1) {
                val--;
                modalQtyInput.value = val;
            }
        });
        modalQtyPlus.addEventListener('click', function () {
            let val = parseInt(modalQtyInput.value) || 1;
            val++;
            modalQtyInput.value = val;
        });
    }

    // Handle Size Selection in Modal
    const sizeButtons = document.querySelectorAll('#modalSizes .btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            sizeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handle Color Selection in Modal
    const colorDivs = document.querySelectorAll('#modalColors > div');
    colorDivs.forEach(div => {
        div.addEventListener('click', function () {
            colorDivs.forEach(d => {
                d.classList.remove('active');
                d.style.borderColor = '#ddd';
            });
            this.classList.add('active');
            this.style.borderColor = '#000';
        });
    });

    // Handle Add to Cart Submit inside Modal
    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener('click', function () {
            // Get quantity from modal input
            const qtyToAdd = modalQtyInput ? (parseInt(modalQtyInput.value) || 1) : 1;

            // Update cart count badges (desktop & mobile)
            const cartCounts = document.querySelectorAll('.cart-count');
            cartCounts.forEach(badge => {
                let currentVal = parseInt(badge.textContent) || 0;
                badge.textContent = currentVal + qtyToAdd;
                // Add a brief animation to highlight the badge
                badge.style.transform = 'scale(1.3)';
                setTimeout(() => badge.style.transform = 'scale(1)', 200);
            });

            // Close modal
            quickModal.hide();

            // Premium Notification Toast
            const alertBox = document.createElement('div');
            alertBox.className = 'position-fixed bottom-0 end-0 m-4 p-3 bg-dark text-white rounded-0 shadow-lg';
            alertBox.style.zIndex = '9999';
            alertBox.style.fontSize = '14px';
            alertBox.style.letterSpacing = '0.5px';
            alertBox.innerHTML = `<i class="fa fa-check-circle text-success me-2"></i> Added ${qtyToAdd} item(s) to your shopping cart!`;
            document.body.appendChild(alertBox);
            setTimeout(() => {
                alertBox.style.opacity = '0';
                alertBox.style.transition = 'opacity 0.5s ease';
                setTimeout(() => alertBox.remove(), 500);
            }, 2500);
        });
    }
});

// --- Dynamic Shopping Cart page Logic ---
document.addEventListener('DOMContentLoaded', function () {
    const cartTable = document.querySelector('.cart-table');
    if (!cartTable) return;

    const subtotalDisplay = document.getElementById('cartSubtotalVal');
    const grandTotalDisplay = document.getElementById('cartGrandTotalVal');
    const shipDhaka = document.getElementById('shipDhaka');
    const shipOutside = document.getElementById('shipOutside');

    function updateCartTotals() {
        let subtotal = 0;
        const rows = cartTable.querySelectorAll('tbody tr');
        
        if (rows.length === 0) {
            // Show empty cart view
            const container = cartTable.closest('.col-lg-8');
            if (container) {
                container.innerHTML = `
                    <div class="text-center py-5 bg-white border">
                        <i class="fa fa-shopping-cart text-muted mb-3" style="font-size: 64px;"></i>
                        <h4 class="fw-bold">Your Cart is Empty</h4>
                        <p class="text-muted small">Looks like you haven't added any products to your cart yet.</p>
                        <a href="shop.html" class="btn btn-custom px-5 py-3 rounded-0 mt-3">RETURN TO SHOP</a>
                    </div>
                `;
            }
            if (subtotalDisplay) subtotalDisplay.textContent = '৳ 0';
            if (grandTotalDisplay) grandTotalDisplay.textContent = '৳ 0';
            return;
        }

        rows.forEach(row => {
            const priceText = row.querySelector('td[data-label="Price"]').textContent;
            const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
            const qtyInput = row.querySelector('.cart-qty-select input');
            const qty = parseInt(qtyInput.value) || 1;
            
            const rowSubtotal = price * qty;
            subtotal += rowSubtotal;

            const subtotalCell = row.querySelector('td[data-label="Subtotal"]');
            if (subtotalCell) {
                subtotalCell.textContent = '৳ ' + rowSubtotal.toLocaleString();
            }
        });

        if (subtotalDisplay) {
            subtotalDisplay.textContent = '৳ ' + subtotal.toLocaleString();
        }

        let shipping = 0;
        if (shipDhaka && shipDhaka.checked) {
            shipping = 60;
        } else if (shipOutside && shipOutside.checked) {
            shipping = 120;
        }

        const total = subtotal + shipping;
        if (grandTotalDisplay) {
            grandTotalDisplay.textContent = '৳ ' + total.toLocaleString();
        }
    }

    // Set up quantity button listeners
    cartTable.addEventListener('click', function (e) {
        const qtyBtn = e.target.closest('.qty-btn');
        if (!qtyBtn) return;

        const container = qtyBtn.closest('.cart-qty-select');
        const input = container.querySelector('input');
        let val = parseInt(input.value) || 1;

        if (qtyBtn.ariaLabel === 'Decrease quantity' || qtyBtn.querySelector('.fa-minus')) {
            if (val > 1) val--;
        } else {
            val++;
        }

        input.value = val;
        updateCartTotals();
    });

    // Set up remove button listeners
    cartTable.addEventListener('click', function (e) {
        const removeBtn = e.target.closest('.cart-remove-btn');
        if (!removeBtn) return;

        e.preventDefault();
        const row = removeBtn.closest('tr');
        if (row) {
            row.remove();
            updateCartTotals();
        }
    });

    // Shipping selection change listeners
    if (shipDhaka) shipDhaka.addEventListener('change', updateCartTotals);
    if (shipOutside) shipOutside.addEventListener('change', updateCartTotals);

    // Initial calculation
    updateCartTotals();
});

// --- Dynamic Wishlist page Logic ---
document.addEventListener('DOMContentLoaded', function () {
    const wishlistTable = document.querySelector('.wishlist-table');
    if (!wishlistTable) return;

    wishlistTable.addEventListener('click', function (e) {
        // Remove item
        const removeBtn = e.target.closest('.cart-remove-btn');
        if (removeBtn) {
            e.preventDefault();
            const row = removeBtn.closest('tr');
            if (row) {
                row.remove();
                if (wishlistTable.querySelectorAll('tbody tr').length === 0) {
                    wishlistTable.closest('.table-responsive').innerHTML = `
                        <div class="text-center py-5 bg-white border">
                            <i class="far fa-heart text-muted mb-3" style="font-size: 64px;"></i>
                            <h4 class="fw-bold">Your Wishlist is Empty</h4>
                            <p class="text-muted small">You haven't saved any items yet.</p>
                            <a href="shop.html" class="btn btn-custom px-5 py-3 rounded-0 mt-3">RETURN TO SHOP</a>
                        </div>
                    `;
                }
            }
            return;
        }

        // Add to Cart
        const addToCartBtn = e.target.closest('.btn-custom');
        if (addToCartBtn && addToCartBtn.textContent === 'ADD TO CART') {
            e.preventDefault();
            
            // Update cart badges
            const cartCounts = document.querySelectorAll('.cart-count');
            cartCounts.forEach(badge => {
                let currentVal = parseInt(badge.textContent) || 0;
                badge.textContent = currentVal + 1;
            });

            // Remove from wishlist row
            const row = addToCartBtn.closest('tr');
            if (row) row.remove();

            // Toast Notification
            const alertBox = document.createElement('div');
            alertBox.className = 'position-fixed bottom-0 end-0 m-4 p-3 bg-dark text-white rounded-0 shadow-lg';
            alertBox.style.zIndex = '9999';
            alertBox.style.fontSize = '14px';
            alertBox.style.letterSpacing = '0.5px';
            alertBox.innerHTML = `<i class="fa fa-check-circle text-success me-2"></i> Product successfully added to cart!`;
            document.body.appendChild(alertBox);
            setTimeout(() => {
                alertBox.style.opacity = '0';
                alertBox.style.transition = 'opacity 0.5s ease';
                setTimeout(() => alertBox.remove(), 500);
            }, 2500);
        }
    });
});

// --- Checkout Payments & Active Classes ---
document.addEventListener('DOMContentLoaded', function () {
    const checkoutContainer = document.querySelector('.checkout-container');
    if (!checkoutContainer) return;

    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(opt => {
        opt.addEventListener('click', function () {
            paymentOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            const radio = this.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });
});

// --- Profile Update Notification ---
document.addEventListener('DOMContentLoaded', function () {
    const profileForm = document.querySelector('.profile-edit-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Toast Notification
            const alertBox = document.createElement('div');
            alertBox.className = 'position-fixed bottom-0 end-0 m-4 p-3 bg-success text-white rounded-0 shadow-lg';
            alertBox.style.zIndex = '9999';
            alertBox.style.fontSize = '14px';
            alertBox.innerHTML = `<i class="fa fa-check-circle me-2"></i> Profile updated successfully!`;
            document.body.appendChild(alertBox);
            setTimeout(() => {
                alertBox.style.opacity = '0';
                alertBox.style.transition = 'opacity 0.5s ease';
                setTimeout(() => alertBox.remove(), 500);
            }, 2500);
        });
    }
});