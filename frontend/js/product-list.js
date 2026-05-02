import { PRODUCTS } from './badmintonProducts.js';

const formatPrice = (price) => price.toLocaleString('vi-VN') + ' đ';

// 1. RENDER BAN ĐẦU
function renderAllProducts() {
    const container = document.getElementById("sanPham");
    if (!container) return;

    const htmlRender = PRODUCTS.map((product, index) => {
        const delay = index * 0.01; 
        
        let discountBadge = '';
        let originalPriceHtml = '<div style="height: 19px;"></div>';
        if (product.originalPrice && product.originalPrice > product.price) {
            let discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            discountBadge = `<span class="badge position-absolute shadow-sm" style="top: 10px; right: 10px; z-index: 10; background-color: #d95327;">-${discountPercent}%</span>`;
            originalPriceHtml = `<div class="text-muted text-decoration-line-through small">${formatPrice(product.originalPrice)}</div>`;
        }

        const newBadge = product.isNew ? `<span class="badge bg-success position-absolute shadow-sm" style="top: 10px; left: 10px; z-index: 10;">MỚI</span>` : '';
        let bestSellerLeft = product.isNew ? "60px" : "10px";
        const bestSellerBadge = product.isBestSeller ? `<span class="badge position-absolute shadow-sm" style="top: 10px; left: ${bestSellerLeft}; z-index: 10; background-color: #d95327;">BÁN CHẠY</span>` : '';

        const priceHtml = `
            <div class="fw-bold fs-6" style="color: #d95327;">
                ${formatPrice(product.price)}
            </div>`;

        return `
        <div id="${product.category.split(' ').join('-')}" class="col-6 col-md-4 col-lg-3 mb-3 product-col product-slide-enter" data-price="${product.price}" style="animation-delay: ${delay}s;">
            <div class="card h-100 border-0 shadow-sm product-card-hover position-relative overflow-hidden">
                ${newBadge}
                ${bestSellerBadge}
                ${discountBadge}
                
                <a href="product.html?id=${product.id}" class="text-decoration-none text-dark d-flex flex-column h-100">
                    <div class="p-3 img-zoom-container">
                        <img src="${product.cover}" class="card-img-top" alt="${product.title}" style="object-fit: contain; height: 180px; width: 100%;">
                    </div>
                    <div class="card-body text-center d-flex flex-column justify-content-end p-2 pb-0">
                        <h6 class="card-title text-truncate mb-2" title="${product.title}" style="font-size: 0.95rem;">${product.title}</h6>
                        <div class="mt-auto product-price">
                            ${priceHtml}
                            ${originalPriceHtml}
                        </div>
                    </div>
                </a>
                
                <div class="card-footer bg-transparent border-0 p-3 pt-2 text-center btn-cart-wrapper">
                    <button class="btn w-100 btn-add-cart" style="border: 1px solid #d95327; color: #d95327;" onclick="addToCart(${product.id}, event)">
                        <i class="fa-solid fa-cart-plus me-1"></i> Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');

    container.innerHTML = htmlRender;
}

// ==========================================
// HÀM TRỢ GIÚP: RESET ANIMATION CHO CÁC PHẦN TỬ ĐANG HIỂN THỊ
// ==========================================
function reAnimateVisibleProducts() {
    const productCols = document.querySelectorAll('.product-col');
    let visibleIndex = 0;

    productCols.forEach(col => {
        // Chỉ xử lý những phần tử đang được hiển thị (display không phải là 'none')
        if (col.style.display !== 'none') {
            // Xóa class animation cũ
            col.classList.remove('product-slide-enter');
            
            // Ép trình duyệt tính toán lại (Force reflow) để animation có thể chạy lại
            void col.offsetWidth;
            
            // Thêm lại class animation và tính lại delay dựa trên thứ tự hiển thị mới
            col.classList.add('product-slide-enter');
            col.style.animationDelay = `${visibleIndex * 0.02}s`; // Bạn có thể chỉnh 0.02s nhanh chậm tùy ý
            visibleIndex++;
        }
    });
}

// ==========================================
// 2. CÁC HÀM SẮP XẾP VÀ LỌC
// ==========================================

window.giaTangDan = function(event) {
    if (event) event.preventDefault();
    const container = document.getElementById("sanPham"); 
    const productCols = Array.from(container.querySelectorAll('.product-col'));

    productCols.sort((a, b) => parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price')));
    
    container.innerHTML = ''; 
    productCols.forEach(col => container.appendChild(col));
    
    reAnimateVisibleProducts(); // Gọi hàm reset animation
}

window.giaGiamDan = function(event) {
    if (event) event.preventDefault();
    const container = document.getElementById("sanPham"); 
    const productCols = Array.from(container.querySelectorAll('.product-col'));

    productCols.sort((a, b) => parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price')));

    container.innerHTML = ''; 
    productCols.forEach(col => container.appendChild(col));

    reAnimateVisibleProducts(); // Gọi hàm reset animation
}

window.hangMoiNhat = function(event) {
    if (event) event.preventDefault();
    const productCols = Array.from(document.querySelectorAll('.product-col'));
    
    productCols.forEach(col => {
        const isNew = col.querySelector('.badge.bg-success');
        col.style.display = isNew ? 'block' : 'none';
    });

    reAnimateVisibleProducts(); // Gọi hàm reset animation
}

window.locTheoGia = function() {
    const checkedBoxes = document.querySelectorAll('.form-check-input:checked');
    const productCols = document.querySelectorAll('.product-col');

    // Mảng lưu các khoảng giá (chỉ lấy những checkbox thuộc nhóm giá)
    const priceRanges = Array.from(checkedBoxes)
        .map(box => box.value)
        .filter(val => val.includes('-'));

    productCols.forEach(col => {
        let price = parseInt(col.getAttribute('data-price'));
        let isMatch = false;

        if (priceRanges.length === 0) {
            col.style.display = 'block'; // Nếu không chọn giá nào, tạm thời cho hiện hết để nhường quyền quyết định cho filter danh mục (nếu có)
        } else {
            priceRanges.forEach(range => {
                let rangeParts = range.split('-'); 
                let min = parseInt(rangeParts[0]);
                let max = rangeParts[1] === 'max' ? Infinity : parseInt(rangeParts[1]);

                if (price >= min && price <= max) isMatch = true; 
            });
            col.style.display = isMatch ? 'block' : 'none';
        }
    });

    // NOTE: Lý tưởng nhất là kết hợp cả locTheoGia và locTheoDanhMuc lại, 
    // nhưng ở đây mình sẽ gọi luôn reAnimate để animation chạy ngay lập tức.
    reAnimateVisibleProducts();
}

window.locTheoDanhMuc = function() {
    const checkedBoxes = document.querySelectorAll('.form-check-input:checked');
    const productCols = document.querySelectorAll('.product-col');
    
    // Mảng lưu các danh mục (loại bỏ các value liên quan đến giá)
    const selectedCategories = Array.from(checkedBoxes)
        .map(box => box.value)
        .filter(val => !val.includes('-0') && !val.includes('0-')); // Cách tạm thời để phân biệt checkbox danh mục và giá

    productCols.forEach(col => {
        const category = col.id;
        
        if (selectedCategories.length === 0) {
             col.style.display = 'block';
        } else {
             col.style.display = selectedCategories.includes(category) ? 'block' : 'none';
        }
    });

    reAnimateVisibleProducts(); // Gọi hàm reset animation
}

// 3. KHỞI CHẠY KHI TRANG LOAD
document.addEventListener('DOMContentLoaded', function() {
    renderAllProducts();

    const menuContent = document.getElementById('Loc').innerHTML;
    document.getElementById('Loc-offcanva').innerHTML = menuContent;    
});