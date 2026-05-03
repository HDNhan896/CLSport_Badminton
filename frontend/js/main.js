import { PRODUCTS } from './badmintonProducts.js';

// Hàm format giá tiền
const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' đ';
};

// Hàm render sản phẩm dựa theo danh mục
function renderProductsByCategory(categoryName) {
    const productWrapper = document.querySelector('.productSwiper .swiper-wrapper');
    if (!productWrapper) return;

    // --- Xử lý đồng bộ tên danh mục ---
    let targetCategory = categoryName;
    if (categoryName === "Túi Vợt Cầu Lông") {
        targetCategory = "Túi Cầu Lông";
    }

    // Lọc sản phẩm
    const filteredProducts = PRODUCTS.filter(product => product.category === targetCategory);

    // Nếu không có sản phẩm nào
    if (filteredProducts.length === 0) {
        productWrapper.innerHTML = `
            <div class="swiper-slide" style="width: 100%;">
                <p class="text-center w-100 py-5 text-muted">Chưa có sản phẩm cho danh mục này.</p>
            </div>
        `;
    } else {
        // Render HTML sản phẩm
        const htmlRender = filteredProducts.map(product => {

            // Xử lý hiển thị phần trăm giảm giá
            let discountBadge = '';
            let originalPriceHtml = '<div style="height: 19px;"></div>'; // Giữ khoảng trống nếu không có giá gốc để các card đều nhau
            if (product.originalPrice && product.originalPrice > product.price) {
                let discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                discountBadge = `<span class="badge bg-warning text-dark position-absolute shadow-sm" style="top: 10px; right: 10px; z-index: 10;">-${discountPercent}%</span>`;

                originalPriceHtml = `<div class="text-muted text-decoration-line-through small">${formatPrice(product.originalPrice)}</div>`;
            }

            // Xử lý hiển thị nhãn Mới và Bán chạy
            const newBadge = product.isNew ? `<span class="badge bg-success position-absolute shadow-sm" style="top: 10px; left: 10px; z-index: 10;">MỚI</span>` : '';

            let bestSellerLeft = product.isNew ? "60px" : "10px";
            const bestSellerBadge = product.isBestSeller ? `<span class="badge bg-danger position-absolute shadow-sm" style="top: 10px; left: ${bestSellerLeft}; z-index: 10;">BÁN CHẠY</span>` : '';

            // Định dạng giá bán
            const priceHtml = `<div class="current-price text-danger fw-bold fs-6">${formatPrice(product.price)}</div>`;

            return `
            <div class="swiper-slide">
                <div class="card h-100 border-0 shadow-sm product-card-hover position-relative">
                    ${newBadge}
                    ${bestSellerBadge}
                    ${discountBadge}
                    
                    <!-- Phần link sang trang chi tiết -->
                    <a href="product.html?id=${product.id}" class="text-decoration-none text-dark d-flex flex-column h-100">
                        <div class="p-3 img-zoom-container">
                            <img src="${product.cover}" class="card-img-top" alt="${product.title}" style="object-fit: contain; height: 180px; width: 100%;">
                        </div>
                        <div class="card-body text-center d-flex flex-column justify-content-end p-2 pb-0">
                            <h6 class="card-title text-truncate mb-2" title="${product.title}" style="font-size: 0.95rem;">${product.title}</h6>
                            <div class="mt-auto">
                                ${priceHtml}
                                ${originalPriceHtml}
                            </div>
                        </div>
                    </a>
                    
                    <!-- Phần nút Thêm vào giỏ hàng -->
                    <div class="card-footer bg-transparent border-0 p-3 pt-2 text-center btn-cart-wrapper">
                        <button class="btn btn-outline-danger w-100 btn-add-cart" onclick="addToCart(${product.id}, event)">
                            <i class="fa-solid fa-cart-plus me-1"></i> Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
            `;
        }).join('');

        productWrapper.innerHTML = htmlRender;
    }

    if (typeof productSwiper !== 'undefined') {
        productSwiper.update();
        productSwiper.slideTo(0);
    }
}



// ==========================================
// THỰC THI LOGIC KHI TRANG LOAD XONG
// ==========================================

// 1. Render tab "Vợt Cầu Lông" mặc định lúc mới vào trang
renderProductsByCategory("Vợt Cầu Lông");

// 2. Khởi tạo Banner Swiper
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

// 3. Khởi tạo Product Swiper (Lưu vào biến let/var để hàm phía trên gọi được update)
var productSwiper = new Swiper(".productSwiper", {
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: {
        nextEl: ".product-btn-next",
        prevEl: ".product-btn-prev",
    },
    breakpoints: {
        576: { slidesPerView: 3, spaceBetween: 15 },
        768: { slidesPerView: 4, spaceBetween: 15 },
        1024: { slidesPerView: 5, spaceBetween: 20 },
    },
});

// 4. Xử lý sự kiện click chuyển Tab
const tabLinks = document.querySelectorAll('.product-tabs-wrapper .tab-link');

tabLinks.forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault(); // Chống nhảy trang nếu thẻ a có href

        // Xóa class 'active' ở tab cũ
        const currentActive = document.querySelector('.product-tabs-wrapper .tab-link.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }

        // Thêm class 'active' vào tab vừa click
        this.classList.add('active');

        // Lấy tên tab (Giày Cầu Lông, Áo Cầu Lông...) và gọi hàm render
        const categoryName = this.innerText.trim();
        renderProductsByCategory(categoryName);
    });
});