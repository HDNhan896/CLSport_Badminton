import { PRODUCTS } from "./badmintonProducts.js";

// Product quantity
function increaseQuantity() {
    const quantityInput = document.querySelector('.select-quantity input');
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
}

function decreaseQuantity() {
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

    // 1. Render Breadcrumb (Vị trí add-info cuối cùng trong list)
    const breadcrumbActive = document.querySelector('.bread_crumb_list .text-danger');
    if (breadcrumbActive) breadcrumbActive.innerText = product.title;

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
    // Tự động lấy các field trong 'specs' để fill vào table
    const detailTable = document.querySelector('#details table');

    let specsHtml = "";

    // Phân loại render: Vợt và Giày hiển thị thông số kỹ thuật (specs)
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
    // Các sản phẩm còn lại (Áo, Quần, Túi, Phụ kiện) hiển thị theo form mẫu mới
    else {
        // Format lại giá riêng cho bảng này
        const priceFormattedTable = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
        
        specsHtml = `
            <tr>
                <th class="col-4">Thương hiệu</th>
                <td>${product.brand}</td>
            </tr>
            <tr>
                <th class="col-4">Loại sản phẩm</th>
                <td>${product.category}</td>
            </tr>
            <tr>
                <th class="col-4">Đánh giá</th>
                <td>${product.rating}/5.0 ⭐ (${product.reviews} đánh giá)</td>
            </tr>
            <tr>
                <th class="col-4">Tình trạng</th>
                <td class="text-success">√ Còn hàng</td>
            </tr>
            <tr>
                <th class="col-4">Giá</th>
                <td class="text-danger fw-bold">${priceFormattedTable}</td>
            </tr>
        `;
    }

    // Đổ dữ liệu vào giao diện
    if (detailTable) detailTable.innerHTML = specsHtml;
    if (descTable) descTable.innerHTML = specsHtml;
}

// Đảm bảo giao diện HTML tải xong thì mới bắt đầu đổ dữ liệu
document.addEventListener('DOMContentLoaded', () => {
    renderProduct();
});