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
    // Trên giao diện ghi "Túi Vợt Cầu Lông", nhưng trong data lưu là "Túi Cầu Lông"
    let targetCategory = categoryName;
    if (categoryName === "Túi Vợt Cầu Lông") {
        targetCategory = "Túi Cầu Lông";
    }

    // Lọc sản phẩm
    const filteredProducts = PRODUCTS.filter(product => product.category === targetCategory);

    // Nếu không có sản phẩm nào (ví dụ: Váy, Balo hiện chưa có data)
    if (filteredProducts.length === 0) {
        productWrapper.innerHTML = `
            <div class="swiper-slide" style="width: 100%;">
                <p class="text-center w-100 py-5 text-muted">Chưa có sản phẩm cho danh mục này.</p>
            </div>
        `;
    } else {
        // Render HTML sản phẩm
        const htmlRender = filteredProducts.map(product => {
            return `
            <div class="swiper-slide">
                <a href="san-pham.html?id=${product.id}" class="product-card" title="${product.title}">
                    <div class="product-img">
                        <img src="${product.cover}" alt="${product.title}">
                    </div>
                    <div class="product-name">${product.title}</div>
                    <div class="product-price">${formatPrice(product.price)}</div>
                </a>
            </div>
            `;
        }).join('');
        
        productWrapper.innerHTML = htmlRender;
    }

    // Quan trọng: Cập nhật lại Swiper sau khi chèn HTML mới
    // typeof giúp kiểm tra xem biến productSwiper đã được tạo chưa
    if (typeof productSwiper !== 'undefined') {
        productSwiper.update(); // Báo cho Swiper biết DOM vừa thay đổi
        productSwiper.slideTo(0); // Trượt về đầu danh sách
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
    tab.addEventListener('click', function(e) {
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