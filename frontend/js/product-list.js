import { PRODUCTS } from './badmintonProducts.js';


// Hàm định dạng giá tiền
const formatPrice = (price) => price.toLocaleString('vi-VN') + ' đ';

// ==========================================
// 1. HÀM RENDER SẢN PHẨM VÀO GIAO DIỆN
// ==========================================
function renderAllProducts() {
    const container = document.getElementById("sanPham");
    if (!container) return;

    const htmlRender = PRODUCTS.map((product, index) => {
        // Tốc độ hiện (delay) giảm xuống 0.05s để load danh sách dài mượt hơn
        const delay = index * 0.01; 
        
        // --- Logic Badge & Giá (Giống y hệt main.js) ---
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

        // Lưu giá trị số vào thuộc tính data-price để lát nữa lọc/sắp xếp cho dễ
        const priceHtml = `
            <div class="fw-bold fs-6" style="color: #d95327;">
                ${formatPrice(product.price)}
            </div>`;

        // TRẢ VỀ HTML: Bọc thêm cột (col-6 col-md-4 col-lg-3) của Bootstrap
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
// 2. CÁC HÀM SẮP XẾP VÀ LỌC (ĐÃ FIX LẠI LỖI)
// ==========================================

// Sắp xếp giá tăng dần
window.giaTangDan = function(event) {
    if (event) event.preventDefault();
    const container = document.getElementById("sanPham"); 
    // Lấy nguyên cái cột (class product-col) thay vì chỉ lấy card
    const productCols = Array.from(container.querySelectorAll('.product-col'));

    productCols.sort((a, b) => {
        // Lấy giá trị từ thuộc tính data-price mình đã gài sẵn ở trên
        return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
    });

    container.innerHTML = ''; 
    productCols.forEach(col => container.appendChild(col));
}

// Sắp xếp giá giảm dần
window.giaGiamDan = function(event) {
    if (event) event.preventDefault();
    const container = document.getElementById("sanPham"); 
    const productCols = Array.from(container.querySelectorAll('.product-col'));

    productCols.sort((a, b) => {
        return parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));
    });

    container.innerHTML = ''; 
    productCols.forEach(col => container.appendChild(col));
}

//Filter hàng mới nhất lọc các sản phẩm mới (Dựa vào thuộc tính isNew)
window.hangMoiNhat = function(event) {
    if (event) event.preventDefault();
    const container = document.getElementById("sanPham"); 
    const productCols = Array.from(container.querySelectorAll('.product-col'));
    productCols.forEach(col => {
        const isNew = col.querySelector('.badge.bg-success');
        if (isNew) {
            col.style.display = 'block';
        } else {
            col.style.display = 'none';
        }
    });
}



// Lọc theo giá
window.locTheoGia = function() {
    const checkedBoxes = document.querySelectorAll('.form-check-input:checked');
    const productCols = document.querySelectorAll('.product-col'); // Lấy tất cả cột sản phẩm

    productCols.forEach(col => {
        // Lấy giá thực tế của sản phẩm
        let price = parseInt(col.getAttribute('data-price'));
        let isMatch = false;

        // Nếu không có checkbox nào được tick -> Hiện tất cả
        if (checkedBoxes.length === 0) {
            col.style.display = 'block';
            return; 
        }

        checkedBoxes.forEach(box => {
            let range = box.value.split('-'); 
            let min = parseInt(range[0]);
            let max = range[1] === 'max' ? Infinity : parseInt(range[1]);

            if (price >= min && price <= max) {
                isMatch = true; 
            }
        });

        // Ẩn/hiện nguyên cái cột
        if (isMatch) {
            col.style.display = 'block';
        } else {
            col.style.display = 'none';
        }
    });
}

// Lọc theo danh mục
window.locTheoDanhMuc = function() {
    const checkedBoxes = document.querySelectorAll('.form-check-input:checked');
    const productCols = document.querySelectorAll('.product-col');
    productCols.forEach(col => {
        const category = col.id;
        let isMatch = false;

        if (checkedBoxes.length === 0) {
            col.style.display = 'block';
            return; 
        }
        checkedBoxes.forEach(box => {
            if (box.value === category) {
                isMatch = true;
            }
        });

        if (isMatch) {
            col.style.display = 'block';
        } else {
            col.style.display = 'none';
        }
    });
}

// ==========================================
// 3. KHỞI CHẠY KHI TRANG LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Render sản phẩm ra UI
    renderAllProducts();

    // Setup offcanvas menu
    const menuContent = document.getElementById('Loc').innerHTML;
    document.getElementById('Loc-offcanva').innerHTML = menuContent;    
});