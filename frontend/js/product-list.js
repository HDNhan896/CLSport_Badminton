import { PRODUCTS } from './badmintonProducts.js';

const formatPrice = (price) => price.toLocaleString('vi-VN') + ' đ';
// ==========================================
// 1. RENDER BAN ĐẦU
// ==========================================
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

        // BƯỚC ĐÃ SỬA: Thêm class "current-price" vào thẻ chứa giá
        const priceHtml = `
            <div class="fw-bold fs-6 current-price" style="color: #d95327;">
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


// HÀM TRỢ GIÚP: RESET ANIMATION CHO CÁC PHẦN TỬ ĐANG HIỂN THỊ
// ==========================================
function reAnimateVisibleProducts() {
    const productCols = document.querySelectorAll('.product-col');
    let visibleIndex = 0;

    productCols.forEach(col => {
        // Chỉ xử lý những phần tử đang được hiển thị
        if (col.style.display !== 'none') {
            col.classList.remove('product-slide-enter');
            void col.offsetWidth; // Force reflow
            col.classList.add('product-slide-enter');
            col.style.animationDelay = `${visibleIndex * 0.02}s`;
            visibleIndex++;
        }
    });
}

// ==========================================
// 2. CÁC HÀM SẮP XẾP VÀ LỌC
// ==========================================
// Hàm phụ trợ đổi tên nút
function updateDropdownTitle(text) {
    const btn = document.querySelector('.dropdown-toggle');
    if (btn) btn.innerText = text;
}

// -----------------------------------------------------------
// HÀM LỌC TỔNG HỢP: Kiểm tra CÙNG LÚC Danh mục, Giá và Hàng mới
// -----------------------------------------------------------
function apDungCacBoLoc() {
    const productCols = document.querySelectorAll('.product-col');
    
    // Lấy danh sách các checkbox đang được đánh dấu
    const checkedCategories = Array.from(document.querySelectorAll('input[id^="category"]:checked')).map(box => box.value);
    const checkedPrices = Array.from(document.querySelectorAll('input[id^="price"]:checked')).map(box => box.value);

    // Kiểm tra xem nút Dropdown có đang ở chế độ "Hàng mới nhất" không
    const sortBtn = document.querySelector('.dropdown-toggle'); // Bắt bằng class thay vì ID
    const isShowingNewestOnly = sortBtn && sortBtn.innerText.includes("Hàng mới nhất");

    productCols.forEach(col => {
        let price = parseInt(col.getAttribute('data-price'));
        let category = col.id;
        
        // 1. Kiểm tra sản phẩm có thuộc danh mục đang chọn không
        let matchCategory = checkedCategories.length === 0 || checkedCategories.includes(category);
        
        // 2. Kiểm tra sản phẩm có nằm trong mức giá đang chọn không
        let matchPrice = checkedPrices.length === 0;
        if (!matchPrice) {
            checkedPrices.forEach(range => {
                let parts = range.split('-'); 
                let min = parseInt(parts[0]);
                let max = parts[1] === 'max' ? Infinity : parseInt(parts[1]);
                if (price >= min && price <= max) matchPrice = true; 
            });
        }

        // 3. Kiểm tra sản phẩm có phải là hàng mới không (Nếu đang chọn chế độ "Hàng mới nhất")
        let matchNewest = true;
        if (isShowingNewestOnly) {
            const isNew = col.querySelector('.badge.bg-success'); 
            if (!isNew) matchNewest = false; // Nếu không có badge bg-success thì đánh dấu là false
        }

        // 4. Quyết định hiển thị: Khớp TẤT CẢ điều kiện đang được áp dụng thì mới hiện
        if (matchCategory && matchPrice && matchNewest) {
            col.style.display = 'block';
        } else {
            col.style.display = 'none';
        }
    });

    reAnimateVisibleProducts();
}

// -----------------------------------------------------------
// CÁC HÀM SẮP XẾP VÀ LỌC KHI KÍCH HOẠT
// -----------------------------------------------------------
window.giaTangDan = function(event) {
    if (event) event.preventDefault();
    updateDropdownTitle("Giá tăng dần");

    const container = document.getElementById("sanPham"); 
    const productCols = Array.from(container.querySelectorAll('.product-col'));

    // Sắp xếp thứ tự trong DOM
    productCols.sort((a, b) => parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price')));
    container.innerHTML = ''; 
    productCols.forEach(col => container.appendChild(col));
    // Gọi lọc để ẩn đi những sản phẩm không đúng checkbox
    apDungCacBoLoc(); 
}

window.giaGiamDan = function(event) {
    if (event) event.preventDefault();
    updateDropdownTitle("Giá giảm dần"); 

    const container = document.getElementById("sanPham"); 
    const productCols = Array.from(container.querySelectorAll('.product-col'));

    // Sắp xếp thứ tự trong DOM
    productCols.sort((a, b) => parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price')));
    container.innerHTML = ''; 
    productCols.forEach(col => container.appendChild(col));
    // Gọi lọc để ẩn đi những sản phẩm không đúng checkbox
    apDungCacBoLoc(); 
}

window.hangMoiNhat = function(event) {
    if (event) event.preventDefault();
    updateDropdownTitle("Hàng mới nhất"); 
    // Khi chọn Hàng mới nhất, chỉ cần gọi hàm tổng hợp là nó tự quét và lọc
    apDungCacBoLoc(); 
}

window.locTheoGia = function() {
    // Không đổi lại tên nút "Sắp xếp" nữa để giữ nguyên trạng thái nếu người dùng đang coi "Hàng mới nhất"
    apDungCacBoLoc();
}

window.locTheoDanhMuc = function() {
    // Không đổi lại tên nút "Sắp xếp" nữa
    apDungCacBoLoc();
}

// ==========================================
// 3. KHỞI CHẠY KHI TRANG LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // 1. Render tất cả sản phẩm ra UI trước
    renderAllProducts();

    // 2. Setup offcanvas menu (Giữ nguyên của bạn)
    const menuContent = document.getElementById('Loc').innerHTML;
    document.getElementById('Loc-offcanva').innerHTML = menuContent;    

    // 3. TỰ ĐỘNG CHỌN CHECKBOX TỪ URL (CHỨC NĂNG MỚI)
    // Lấy tham số 'category' từ thanh địa chỉ trình duyệt
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromURL = urlParams.get('category');

    if (categoryFromURL) {
        // Tìm ô checkbox có value trùng với category truyền qua
        // Tìm trong cả menu trên PC (id="Loc") và Mobile (id="Loc-offcanva")
        const targetCheckboxes = document.querySelectorAll(`input[value="${categoryFromURL}"]`);
        
        if (targetCheckboxes.length > 0) {
            targetCheckboxes.forEach(checkbox => {
                checkbox.checked = true; // Đánh dấu tick vào ô đó
            });
            
            // Tự động gọi hàm lọc danh mục để ẩn các sản phẩm không liên quan
            if (typeof window.locTheoDanhMuc === "function") {
                window.locTheoDanhMuc(); 
            }
        }
    }
});