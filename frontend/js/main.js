import { PRODUCTS } from "./badmintonProducts.js";

console.log("DATA:", PRODUCTS);

var swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

var productSwiper = new Swiper(".productSwiper", {
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: {
        nextEl: ".product-btn-next",
        prevEl: ".product-btn-prev",
    },
    breakpoints: {
        576: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 15,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 20,
        },
    },
});



document.addEventListener("DOMContentLoaded", function () {

    const tabLinks = document.querySelectorAll(".product-tabs-wrapper .tab-link");

    // hàm render
    function render(data) {
        if (productSwiper && productSwiper.removeAllSlides) {
            productSwiper.removeAllSlides();

            const slidesHTML = data.slice(0, 10).map(item => `
                <div class="swiper-slide">
                    <a href="product-detail.html?id=${item.id}" class="product-card">
                        <div class="product-img">
                            <img src="${item.cover}" alt="${item.title}">
                        </div>
                        <div class="product-name">${item.title}</div>
                        <div class="product-price">${item.price.toLocaleString()} đ</div>
                    </a>
                </div>
            `);

            productSwiper.appendSlide(slidesHTML.join(""));
            productSwiper.slideTo(0);
        }
    }

    // 👉 load mặc định
    const defaultData = PRODUCTS.filter(p => p.category === "Vợt Cầu Lông");
    render(defaultData);

    // 👉 click tab
    tabLinks.forEach(function (tab) {
        tab.addEventListener("click", function (e) {
            e.preventDefault();

            tabLinks.forEach(t => t.classList.remove("active"));
            this.classList.add("active");

            const tabName = this.dataset.cat;
            
            const data = PRODUCTS.filter(p => p.category === tabName);

            render(data);
        });
    });
});
