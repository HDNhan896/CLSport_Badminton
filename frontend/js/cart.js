// ------------------------------------------
// 1. DATA (DỮ LIỆU) - Đồng bộ với localStorage
// ------------------------------------------
// Khởi tạo giỏ hàng từ localStorage để không bị mất khi chuyển trang
export let userCart = JSON.parse(localStorage.getItem('userCart')) || [];

function saveCartToStorage() {
    localStorage.setItem('userCart', JSON.stringify(userCart));
}

// ------------------------------------------
// 2. CÁC HÀM XỬ LÝ KHI CLICK "THÊM VÀO GIỎ"
// ------------------------------------------
export function addToCart(productId, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // BƯỚC 1: LẤY THÔNG TIN SẢN PHẨM TỪ GIAO DIỆN (DOM)
    const button = event.currentTarget; 
    const card = button.closest('.card'); // Tìm khung card chứa nút vừa bấm
    
    let productName = "Sản phẩm";
    let productPrice = 0;
    let productImg = "";

    // Trích xuất dữ liệu từ thẻ HTML
    if (card) {
        productName = card.querySelector('.card-title').innerText;
        // Bắt đúng class current-price để không bị dính giá gạch ngang
        const priceText = card.querySelector('.current-price').innerText; 
        productPrice = parseInt(priceText.replace(/\D/g, '')) || 0; 
        productImg = card.querySelector('img.card-img-top').src;
    }

    // BƯỚC 2: CẬP NHẬT VÀO MẢNG GIỎ HÀNG
    const existingItem = userCart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        userCart.push({ 
            id: productId, 
            name: productName, 
            price: productPrice, 
            image: productImg, 
            quantity: 1 
        });
    }

    // Lưu lại và thông báo
    saveCartToStorage();
    showToast('success', 'Đã thêm sản phẩm vào giỏ hàng!');
    updateCartBadge();
}
// Đảm bảo hàm addToCart có thể được gọi từ HTML
window.addToCart = addToCart;

// Hàm đếm số lượng để hiển thị icon
window.updateCartBadge = function() {
    const badge = document.querySelector('.cart-badge');
    
    if (badge) {
        // Lấy dữ liệu mới nhất từ localStorage để đảm bảo tính đồng bộ
        let currentCart = JSON.parse(localStorage.getItem('userCart')) || [];
        const totalItems = currentCart.reduce((sum, item) => sum + item.quantity, 0);
        badge.innerText = totalItems;
    } else {
        // Nếu chưa tìm thấy thẻ .cart-badge (do layout.js chưa load xong header), 
        // chờ 100ms rồi thực hiện kiểm tra lại.
        setTimeout(window.updateCartBadge, 100);
    }
}

// Hàm hiển thị thông báo góc màn hình
function showToast(type = 'success', message = 'Thành công!') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;';
        document.body.appendChild(toastContainer);
    }

    // Cấu hình màu sắc, icon và tiêu đề
    let themeColor = '#24bf65'; 
    let iconClass = 'fa-solid fa-circle-check';
    let title = 'Thành công!';

    if (type === 'warning') {
        themeColor = '#ffc107'; 
        iconClass = 'fa-solid fa-triangle-exclamation';
        title = 'Chú ý!';
    } else if (type === 'danger') {
        themeColor = '#dc3545'; // Màu đỏ cho hành động xóa
        iconClass = 'fa-solid fa-trash-can';
        title = 'Đã xóa!';
    }

    const toast = document.createElement('div');
    toast.className = 'custom-toast shadow'; 
    toast.innerHTML = `
        <div class="d-flex align-items-center" style="background-color: #ffffff; border-left: 5px solid ${themeColor}; padding: 15px 20px; border-radius: 6px; min-width: 280px;">
            <i class="${iconClass} fs-4 me-3" style="color: ${themeColor};"></i>
            <div>
                <div class="text-dark fw-bold" style="font-size: 0.95rem;">${title}</div>
                <div class="text-muted" style="font-size: 0.85rem;">${message}</div>
            </div>
        </div>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s';
        setTimeout(() => toast.remove(), 400); 
    }, 3000);
}


// ------------------------------------------
// 3. XỬ LÝ GIAO DIỆN TẠI TRANG GIỎ HÀNG (UI)
// ------------------------------------------
function toggleCartStatus(isEmpty) {
    const fullCart = document.getElementById('cart-full');
    const emptyCart = document.getElementById('cart-empty');
    if (fullCart && emptyCart) {
        if (isEmpty) {
            fullCart.classList.add('d-none');
            emptyCart.classList.remove('d-none');
        } else {
            fullCart.classList.remove('d-none');
            emptyCart.classList.add('d-none');
        }
    }
}

// 1. Cập nhật lại hàm renderCartItems
function renderCartItems() {
    const cartContainer = document.querySelector('.cart-items');
    if (!cartContainer) return;

    cartContainer.innerHTML = ''; 

    if (userCart.length === 0) {
        toggleCartStatus(true); 
        updateCartBadge();
        return;
    }

    toggleCartStatus(false);
    let totalAmount = 0;

    userCart.forEach(item => {
        totalAmount += item.price * item.quantity;
        const priceFormatted = item.price.toLocaleString('vi-VN') + ' đ';
        
        // CHÚ Ý: Đã thêm dấu nháy đơn vào quanh biến id: '${item.id}'
        const itemHTML = `
            <div class="cart-item d-flex align-items-center mb-3 pb-3 border-bottom">
                <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: contain;" class="me-3 border rounded bg-white p-1">
                <div class="flex-grow-1">
                    <h6 class="mb-1 fw-bold text-dark">${item.name}</h6>
                    <div class="text-orange fw-bold">${priceFormatted}</div>
                </div>
                
                <div class="quantity-group d-flex align-items-center border rounded me-3" style="min-width: 90px;">
                    <button class="btn btn-sm text-secondary px-2 border-0" onclick="changeQuantity('${item.id}', -1)">-</button>
                    <input type="text" class="form-control form-control-sm text-center border-0 p-0" style="width: 35px;" value="${item.quantity}" readonly>
                    <button class="btn btn-sm text-secondary px-2 border-0" onclick="changeQuantity('${item.id}', 1)">+</button>
                </div>
                
                <button class="btn btn-remove-item text-danger border-0 bg-transparent" onclick="removeItem('${item.id}')">
                    <i class="fa-solid fa-trash fs-5"></i>
                </button>
            </div>
        `;
        cartContainer.insertAdjacentHTML('beforeend', itemHTML);
    });

    const formattedTotal = totalAmount.toLocaleString('vi-VN') + ' đ';
    const totalAmountDisplay = document.querySelector('#cart-total-amount');
    const grandTotalDisplay = document.querySelector('#cart-grand-total'); 
    
    if (totalAmountDisplay) totalAmountDisplay.innerText = formattedTotal;
    if (grandTotalDisplay) grandTotalDisplay.innerText = formattedTotal;

    updateCartBadge();
}

// 2. Cập nhật lại hàm changeQuantity
window.changeQuantity = function(id, changeAmount) {
    // Đã đổi === thành ==
    const item = userCart.find(p => p.id == id);
    if (item) {
        item.quantity += changeAmount;
        if (item.quantity < 1) item.quantity = 1; 
        saveCartToStorage();
        renderCartItems(); 
    }
}

// 3. Hàm removeItem
window.removeItem = function(id) {
    // Đã đổi === thành ==
    const index = userCart.findIndex(p => p.id == id);
    if (index > -1) {
        userCart.splice(index, 1);
        saveCartToStorage();
        renderCartItems(); 
        showToast('danger', 'Đã xóa sản phẩm khỏi giỏ hàng!');
        
        if (typeof window.updateCartBadge === 'function') {
            window.updateCartBadge();
        }
    }
}

//Xóa tất cả sản phẩm trong giỏ hàng
window.executeClearCart = function() {
    userCart.length = 0; // Làm rỗng mảng
    saveCartToStorage(); // Lưu vào localStorage
    renderCartItems();   // Cập nhật lại giao diện
    
    // Cập nhật số lượng trên icon giỏ hàng
    if (typeof window.updateCartBadge === 'function') {
        window.updateCartBadge();
    }

    // Hiển thị thông báo Toast góc màn hình cho đẹp (nếu bạn có sẵn hàm showToast)
    if (typeof showToast === 'function') {
        showToast('danger', 'Đã xóa tất cả sản phẩm trong giỏ hàng!');
    }
}

// Khi tải xong trang web thì tự động in giỏ hàng
document.addEventListener('DOMContentLoaded', function() {
    renderCartItems();
    updateCartBadge();
});