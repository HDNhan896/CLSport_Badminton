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


const productsData = {
    'Vợt Cầu Lông': [

    ],
    'Giày Cầu Lông': [

    ],
    'Áo Cầu Lông': [

    ],
    'Váy cầu lông': [

    ],
    'Quần Cầu Lông': [

    ],
    'Túi Vợt Cầu Lông': [

    ],
    'Balo Cầu Lông': [

    ]
};

document.addEventListener("DOMContentLoaded", function () {
    const tabLinks = document.querySelectorAll(".product-tabs-wrapper .tab-link");

    tabLinks.forEach(function (tab) {
        tab.addEventListener("click", function (e) {
            e.preventDefault();

            tabLinks.forEach(t => t.classList.remove("active"));

            this.classList.add("active");

            const tabName = this.innerText.trim();
            const data = productsData[tabName] || productsData['Vợt Cầu Lông'];

            if (typeof productSwiper !== 'undefined') {
                productSwiper.removeAllSlides();

                const slidesHTML = data.map(item => `
                    <div class="swiper-slide">
                        <a href="${item.link}" class="product-card" title="${item.name}">
                            <div class="product-img">
                                <img src="${item.img}" alt="${item.name}">
                            </div>
                            <div class="product-name">${item.name}</div>
                            <div class="product-price">${item.price}</div>
                        </a>
                    </div>
                `);

                productSwiper.appendSlide(slidesHTML);
                productSwiper.slideTo(0);
            }
        });
    });
});