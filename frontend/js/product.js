import { PRODUCTS } from "./badmintonProducts.js";

// Product quantity
window.increaseQuantity = function() {
    const quantityInput = document.querySelector('.select-quantity input');
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
}

window.decreaseQuantity = function() {
    const quantityInput = document.querySelector('.select-quantity input');
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function renderProduct() {
    const id = getProductId();
    const product = PRODUCTS.find(p => p.id == id);
    if (!product) {
        console.error("Không tìm thấy sản phẩm");
        return;
    }

    // 1. Render Breadcrumb
    const breadcrumbActive = document.querySelector('.bread_crumb_list .text-danger');
    const breadcrumbCategoryActive = document.getElementById('product-category-active');
    if (breadcrumbActive) breadcrumbActive.innerText = product.title;
    if (breadcrumbCategoryActive) breadcrumbCategoryActive.innerHTML = `<span>${product.category}</span>&nbsp; &gt;`;
    
    // 2. Render Ảnh sản phẩm
    const imgContainer = document.getElementById('render-img-product');
    if (imgContainer) {
        imgContainer.innerHTML = `
        <a class="nav-link w-100" href="">
            <img class="w-100 shadow rounded-3" src="${product.cover}" alt="${product.title}">
        </a>
        `;
    }

    // 3. Render Thông tin cơ bản (Tên, Mã, Giá)
    document.querySelector('.product-info h1').innerText = product.title;
    document.querySelector('.product-info span .text-danger').innerText = product.id;

    const priceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
    document.querySelector('.pice-box .text-danger').innerText = priceFormatted;

    // 4. Render Bảng Thông số kỹ thuật (Details & Desc)
    const detailTable = document.querySelector('#details table');
    const descTable = document.querySelector('#desc table'); // Đã thêm khai báo biến này

    let specsHtml = "";

    // Phân loại render: Vợt và Giày
    if (product.specs && (product.category === "Vợt Cầu Lông" || product.category === "Giày Cầu Lông")) {
        specsHtml = Object.entries(product.specs).map(([key, value]) => {
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            const displayValue = Array.isArray(value) ? value.join(", ") : value;
            return `
                <tr>
                    <th class="col-4">${label}</th>
                    <td>${displayValue}</td>
                </tr>`;
        }).join('');
    } 
    // Các sản phẩm còn lại (Áo, Quần, Túi, Phụ kiện)
    // ... (Phần if ở trên giữ nguyên) ...

    // Các sản phẩm còn lại (Áo, Quần, Túi, Phụ kiện) hiển thị theo form chung (Tiếng Anh)
    else {
        const priceFormattedTable = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
        
        specsHtml = `
            <tr>
                <th class="col-4">Brand</th>
                <td>${product.brand}</td>
            </tr>
            <tr>
                <th class="col-4">Category</th>
                <td>${product.category}</td>
            </tr>
            <tr>
                <th class="col-4">Rating</th>
                <td>${product.rating}/5.0 ⭐ (${product.reviews} reviews)</td>
            </tr>
            <tr>
                <th class="col-4">Status</th>
                <td class="text-success">√ In Stock</td>
            </tr>
            <tr>
                <th class="col-4">Price</th>
                <td class="text-danger fw-bold">${priceFormattedTable}</td>
            </tr>
        `;
    }

    // Đổ dữ liệu vào giao diện
    if (detailTable) detailTable.innerHTML = specsHtml;
    if (descTable) descTable.innerHTML = specsHtml;

    // 5. GỌI HÀM RENDER SẢN PHẨM LIÊN QUAN TẠI ĐÂY
    renderRelatedProducts(product);
}

// Hàm mới: Xử lý phần Sản Phẩm Liên Quan
function renderRelatedProducts(currentProduct) {
    const container = document.getElementById('related-products-container');
    if (!container) return; // Nếu trong HTML chưa thêm div này thì bỏ qua

    // Lọc sản phẩm cùng Category nhưng khác ID hiện tại
    const relatedProducts = PRODUCTS.filter(p => 
        p.category === currentProduct.category && p.id !== currentProduct.id
    );

    // Lấy 4 sản phẩm đầu tiên tìm được
    const displayProducts = relatedProducts.slice(0, 4);

    let html = '';

    displayProducts.forEach(p => {
        let discountBadge = '';
        let originalPriceHtml = '';

        if (p.originalPrice && p.originalPrice > p.price) {
            let discountPercent = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
            discountBadge = `<span class="badge bg-warning text-dark position-absolute" style="top: 10px; right: 10px;">-${discountPercent}%</span>`;
            
            const originalPriceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.originalPrice);
            originalPriceHtml = `<div class="text-muted text-decoration-line-through small">${originalPriceFormatted}</div>`;
        }

        const priceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price);

        const newBadge = p.isNew ? `<span class="badge bg-success position-absolute" style="top: 10px; left: 10px;">MỚI</span>` : '';
        let bestSellerStyle = p.isNew ? "top: 10px; left: 60px;" : "top: 10px; left: 10px;";
        const bestSellerBadge = p.isBestSeller ? `<span class="badge bg-danger position-absolute" style="${bestSellerStyle}">BÁN CHẠY</span>` : '';

        // Render sao đánh giá
        let starsHtml = '';
        const rating = p.rating || 5;
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                starsHtml += '<i class="fa-solid fa-star text-warning small"></i>';
            } else if (i - rating > 0 && i - rating < 1) {
                 starsHtml += '<i class="fa-solid fa-star-half-stroke text-warning small"></i>';
            } else {
                starsHtml += '<i class="fa-regular fa-star text-warning small"></i>';
            }
        }

        html += `
            <div class="col-md-3 col-sm-6 mb-4">
                <div class="card h-100 border-0 shadow position-relative">
                    ${newBadge}
                    ${bestSellerBadge}
                    ${discountBadge}
                    
                    <a href="product.html?id=${p.id}" class="text-decoration-none text-dark">
                        <img src="${p.cover}" class="card-img-top p-3" alt="${p.title}" style="object-fit: contain; height: 250px;">
                        <div class="card-body text-center">
                            <p class="text-danger fw-bold mb-1 small text-uppercase">${p.brand}</p>
                            <h6 class="card-title text-truncate" title="${p.title}">${p.title}</h6>
                            <div class="mb-2">
                                ${starsHtml} <span class="small text-muted">(${rating})</span>
                            </div>
                            <div class="text-danger fw-bold fs-6">${priceFormatted}</div>
                            ${originalPriceHtml}
                        </div>
                    </a>
                    <div class="card-footer bg-white border-0 text-center pb-3">
                        <button class="btn btn-danger w-100"><i class="fa-solid fa-cart-shopping me-2"></i>Thêm vào giỏ</button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Khởi chạy khi tải xong trang
document.addEventListener('DOMContentLoaded', () => {
    renderProduct();
});