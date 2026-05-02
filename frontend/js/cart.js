import { PRODUCTS } from './badmintonProducts.js';

// Khởi tạo giỏ hàng
let userCart = [];

// 1. Tải giỏ hàng từ LocalStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('userCart');
    if (savedCart) {
        userCart = JSON.parse(savedCart);
    }
}

// 2. Lưu giỏ hàng vào LocalStorage
function saveCartToLocalStorage() {
    localStorage.setItem('userCart', JSON.stringify(userCart));
}

// 3. Cập nhật hiển thị (Quan trọng nhất)
function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartFull = document.getElementById('cart-full');
    const cartEmpty = document.getElementById('cart-empty');

    if (!cartFull || !cartEmpty) return;

    // Kiểm tra thực tế giỏ hàng có phần tử nào không
    const hasItems = userCart && userCart.length > 0;

    if (!hasItems) {
        // 1. Ẩn khối giỏ hàng đầy (bao gồm cả tóm tắt và nút đặt hàng)
        cartFull.classList.add('d-none');
        cartFull.style.display = 'none';

        // 2. Hiện khối giỏ hàng trống
        cartEmpty.classList.remove('d-none');
        cartEmpty.style.display = 'block';
        
        // Cập nhật badge trên header về 0 (nếu có thẻ nào class là cart-badge)
        const badge = document.querySelector('.cart-badge');
        if (badge) badge.innerText = 0;
        return; 
    }

    // NẾU CÓ HÀNG:
    cartFull.classList.remove('d-none');
    cartFull.style.display = 'block'; 
    cartEmpty.classList.add('d-none');
    cartEmpty.style.display = 'none';

    // Render danh sách sản phẩm
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        userCart.forEach(item => {
            const itemHtml = `
                <div class="cart-item row align-items-center py-3 border-bottom" data-product-id="${item.id}">
                    <div class="col-2 col-md-1">
                        <img src="${item.cover}" alt="${item.title}" class="img-fluid border rounded">
                    </div>
                    <div class="col-10 col-md-5">
                        <h6 class="mb-1 fw-bold">${item.title}</h6>
                    </div>
                    <div class="col-6 col-md-3 mt-3 mt-md-0">
                        <div class="input-group quantity-group mx-auto" style="max-width: 120px;">
                            <button class="btn btn-outline-secondary btn-sm" onclick="changeQty(${item.id}, -1)">-</button>
                            <input type="text" class="form-control form-control-sm text-center" value="${item.quantity}" readonly>
                            <button class="btn btn-outline-secondary btn-sm" onclick="changeQty(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <div class="col-6 col-md-3 mt-3 mt-md-0 text-end">
                        <span class="fw-bold text-orange me-3">${(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
                        <button class="btn-remove-item border-0 bg-transparent text-muted" onclick="removeItem(${item.id})">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>`;
            cartItemsContainer.insertAdjacentHTML('beforeend', itemHtml);
        });
    }

    // Gọi đúng tên hàm tính tổng
    calculateTotal();
}

// 4. Tính toán tổng tiền
function calculateTotal() {
    const total = userCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const formatted = total.toLocaleString('vi-VN') + ' đ';
    
    if(document.getElementById('cart-total-amount')) document.getElementById('cart-total-amount').innerText = formatted;
    if(document.getElementById('cart-grand-total')) document.getElementById('cart-grand-total').innerText = formatted;
    
    updateBadge(userCart.reduce((sum, item) => sum + item.quantity, 0));
}

// 5. Các hàm bổ trợ (Gắn vào window để gọi được từ HTML onclick)
window.removeItem = (productId) => {
    userCart = userCart.filter(item => item.id !== productId);
    saveCartToLocalStorage();
    updateCartDisplay();
};

window.changeQty = (productId, delta) => {
    const item = userCart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity < 1) {
            window.removeItem(productId);
        } else {
            saveCartToLocalStorage();
            updateCartDisplay();
        }
    }
};

function updateBadge(count) {
    const badge = document.querySelector('.cart-badge');
    if (badge) badge.innerText = count;
}

// Chạy khi load trang
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    updateCartDisplay();
});