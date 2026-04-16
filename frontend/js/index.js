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
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp', name: 'Vợt Cầu Lông VNB V200 Xanh Chính Hãng', price: '529.000 đ', link: 'vot-cau-long-vnb-v200-xanh.html' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-carbon-training-150g-5.webp', name: 'Vợt Cầu Lông VNB Carbon Training 150g Chính Hãng', price: '698.000 đ', link: 'vot-cau-long-vnb-carbon-training-150g.html' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200i-hong-3.webp', name: 'Vợt Cầu Lông VNB V200i Hồng Chính Hãng', price: '529.000 đ', link: 'vot-cau-long-vnb-v200i-hong.html' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v88-xanh-chinh-hang-1.webp', name: 'Vợt Cầu Lông VNB V88 Xanh Chính Hãng', price: '638.000 đ', link: 'vot-cau-long-vnb-v88-xanh-chinh-hang.html' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-do-2.webp', name: 'Vợt Cầu Lông VNB V200 Đỏ Chính Hãng', price: '529.000 đ', link: 'vot-cau-long-vnb-v200-do.html' }
    ],
    'Giày Cầu Lông': [
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/giay-cau-long-taro-tr024-2_1732240309.webp', name: 'Giày Cầu Lông Taro TR024-2', price: '499.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/giay-cau-long-taro-tr024-1_1732240510.webp', name: 'Giày Cầu Lông Taro TR024-1', price: '499.000 đ', link: 'giay-cau-long-taro-tr024-1.html' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/gallery/giay-cau-long-yonex-shb-03ex-trang_1733364947.webp', name: 'Giày Cầu Lông Yonex SHB 03EX - Trắng', price: '1.940.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/gallery/giay-cau-long-yonex-shb-55ex-cam_1733364434.webp', name: 'Giày Cầu Lông Yonex SHB 55EX Cam', price: '1.604.000 đ', link: 'giay-cau-long-yonex-shb-55ex-cam.html' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/giay-cau-long-lining-aytq-003-2-5.webp', name: 'Giày Cầu Lông Lining AYTQ 003-2', price: '1.350.000 đ', link: '#' }
    ],
    'Áo Cầu Lông': [
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/ao-cau-long-lining-atssb63-1-nam-chinh-hang-2.webp', name: 'Áo cầu lông Lining ATSSB63-1 nam chính hãng', price: '570.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/ao-cau-long-yonex-ac62-nam-trang-tim-1.webp', name: 'Áo Cầu Lông Yonex AC62 Nam - Trắng tím', price: '130.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/ao-cau-long-kamito-kmat210260-nu-trang-cam-chinh-hang-1.webp', name: 'Áo cầu lông Kamito KMAT210260 Nữ - Trắng Cam chính hãng', price: '149.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/ao-cau-long-victec-avt13-nam-xanh-bich-1.webp', name: 'Áo cầu lông Victec AVT13 nam - Xanh bích', price: '150.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/ao-cau-long-victec-avt13-nu-xanh-bich-1.webp', name: 'Áo cầu lông Victec AVT13 nữ - Xanh bích', price: '150.000 đ', link: '#' }
    ],
    'Váy cầu lông': [
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vay-cau-long-victec-02-den-vang-1.webp', name: 'Váy Cầu Lông Victec 02 - Đen Vàng', price: '140.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vay-cau-long-yonex-033-trang-1.webp', name: 'Váy Cầu Lông Yonex 033 - Trắng', price: '150.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vay-cau-long-lining-035-trang-1.webp', name: 'Váy Cầu Lông Lining 035 - Trắng', price: '150.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vay-cau-long-victor-9036-trang-1.webp', name: 'Váy Cầu Lông Victor 9036 - Trắng', price: '110.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vay-cau-long-victec-02-den-trang-1.webp', name: 'Váy Cầu Lông Victec 02 - Đen Trắng', price: '140.000 đ', link: '#' }
    ],
    'Quần Cầu Lông': [
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/quan-cau-long-yonex-q3-nam-trang-xanh-1.webp', name: 'Quần cầu lông Yonex Q3 Nam - Trắng Xanh', price: '110.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/quan-cau-long-yonex-q3-nu-trang-xanh-1.webp', name: 'Quần cầu lông Yonex Q3 Nữ - Trắng Xanh', price: '110.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/gallery/quan-cau-long-victec-qv003-nu-den-do-1.webp', name: 'Quần cầu lông Victec QV003 nữ - Đen đỏ', price: '130.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/gallery/quan-cau-long-victec-qv003-nu-den-trang-1.webp', name: 'Quần cầu lông Victec QV003 nữ - Đen trắng', price: '130.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/quan-cau-long-yonex-sm2419-jet-black-melange-chinh-hang-2.webp', name: 'Quần Cầu Lông Yonex SM2419 - Jet black/melange chính hãng', price: '290.000 đ', link: '#' }
    ],
    'Túi Vợt Cầu Lông': [
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/tui-cau-long-taro-tr024-bag01_1738702338.webp', name: 'Túi Cầu Lông Taro TR024-BAG01', price: '599.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/tui-don-dung-vot-vnb-1002-1.webp', name: 'Túi Đơn Đựng Vợt VNB 1002', price: '70.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/tui-cau-long-yonex-ba92331w-grayish-pearl-chinh-hang-1.webp', name: 'Túi Cầu Lông Yonex BA92331W Grayish Pearl', price: '2.090.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/tui-cau-long-kumpoo-kb-186-den-vang-chinh-hang-1.webp', name: 'Túi Cầu Lông Kumpoo KB-186 Đen Vàng Chính Hãng', price: '1.400.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/tui-cau-long-victor-br-9210-cu-chinh-hang-1.webp', name: 'Túi Cầu Lông Victor BR 9210 CU Chính Hãng', price: '1.200.000 đ', link: '#' }
    ],
    'Balo Cầu Lông': [
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/balo-cau-long-lining-absq382-1-chinh-hang-3.webp', name: 'Balo cầu lông Lining ABSQ382-4 chính hãng', price: '1.100.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/gallery/balo-cau-long-lining-absr142-6-chinh-hang.webp', name: 'Balo cầu lông Lining ABSR142-6 chính hãng', price: '800.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/gallery/balo-cau-long-lining-abss085-3-chinh-hang_1695245770.webp', name: 'Balo cầu lông Lining ABSS085-3 chính hãng', price: '1.000.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/balo-cau-long-vnb-bag2020-1.webp', name: 'Balo cầu lông VNB Bag2020', price: '498.000 đ', link: '#' },
        { img: 'https://cdn.shopvnb.com/img/300x300/uploads/gallery/balo-cau-long-lining-abss275-6-chinh-hang_1694651111.webp', name: 'Balo cầu lông Lining ABSS275-6 chính hãng', price: '800.000 đ', link: '#' }
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