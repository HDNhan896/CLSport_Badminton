// ------------------------------------------
// 2. CÁC HÀM XỬ LÝ (ACTIONS)
// ------------------------------------------
export function addToCart(productId, event) {
    // Ngăn chặn sự kiện click lan ra thẻ <a> bên ngoài
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // Logic thêm vào mảng: Kiểm tra xem sản phẩm đã có trong giỏ chưa
    const existingItem = userCart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1; // Nếu có rồi thì tăng số lượng
    } else {
        userCart.push({ id: productId, quantity: 1 }); // Nếu chưa thì thêm mới
    }

    // Lưu lại vào trình duyệt
    saveCartToStorage();
    
    // Test xem mảng chạy đúng chưa
    console.log("Giỏ hàng hiện tại:", userCart);

    // Gọi hàm hiển thị thông báo
    showToast();
}

// Bắt buộc: Gắn hàm vào window để các nút <button onclick="addToCart(...)"> trong HTML có thể gọi được
window.addToCart = addToCart;

// Hàm phụ trợ: Hiển thị thông báo (Tách ra cho code sạch)
function showToast() {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'custom-toast shadow'; 
    toast.innerHTML = `
        <div class="d-flex align-items-center" style="background-color: #ffffff; border-left: 5px solid #d95327; padding: 15px 20px; border-radius: 6px; min-width: 280px;">
            <i class="fa-solid fa-circle-check fs-4 me-3" style="color: #d95327;"></i>
            <div>
                <div class="text-dark fw-bold" style="font-size: 0.95rem;">Thành công!</div>
                <div class="text-muted" style="font-size: 0.85rem;">Đã thêm sản phẩm vào giỏ hàng</div>
            </div>
        </div>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('hide-toast');
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

document.addEventListener('DOMContentLoaded', function() {
    function updateCartTotal() {
        let total = 0;
        const cartItems = document.querySelectorAll('.cart-item'); 
        
        cartItems.forEach(item => {
            const priceText = item.querySelector('.text-orange').innerText;
            const price = parseInt(priceText.replace(/\D/g, ''));
            const quantity = parseInt(item.querySelector('.quantity-group input').value);
            
            total += price * quantity;
        });
        
        const formattedTotal = total.toLocaleString('vi-VN') + ' đ';
        
        const totalDisplay = document.querySelector('.fs-4.text-orange');
        if (totalDisplay) totalDisplay.innerText = formattedTotal;
        
        const badge = document.querySelector('.cart-badge');
        if (badge) badge.innerText = cartItems.length;
        
        if (cartItems.length === 0) {
            toggleCartStatus(true);
        }
    }
    
    const quantityGroups = document.querySelectorAll('.quantity-group');
    quantityGroups.forEach(group => {
        const minusBtn = group.querySelector('button:first-child');
        const plusBtn = group.querySelector('button:last-child');
        const input = group.querySelector('input');
        
        minusBtn.addEventListener('click', () => {
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
                updateCartTotal();
            }
        });
        
        plusBtn.addEventListener('click', () => {
            input.value = parseInt(input.value) + 1;
            updateCartTotal();
        });
        
        input.addEventListener('change', () => {
            if (isNaN(input.value) || input.value < 1) input.value = 1;
            updateCartTotal();
        });
    });
    
    const removeButtons = document.querySelectorAll('.btn-remove-item');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
                this.closest('.cart-item').remove();
                updateCartTotal();
            }
        });
    });

    const orderBtn = document.querySelector('.btn-orange-vnb');
    if (orderBtn) {
        orderBtn.addEventListener('click', function(e) {
            const cartItems = document.querySelectorAll('.cart-item');
            if (cartItems.length > 0) {
                window.location.href = 'checkout.html';
            } else {
                alert('Giỏ hàng của bạn đang trống, vui lòng chọn sản phẩm!');
            }
        });
    }
});

export const userCart = []