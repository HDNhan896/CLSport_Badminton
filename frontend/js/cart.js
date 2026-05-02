// ------------------------------------------
// 1. DATA (DỮ LIỆU)
// ------------------------------------------
export const userCart = [];

// (Tùy chọn) Hàm lưu giỏ hàng vào localStorage nếu bạn cần lưu trạng thái
function saveCartToStorage() {
    localStorage.setItem('userCart', JSON.stringify(userCart));
}

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
        
        // KIỂM TRA GIỎ HÀNG RỖNG VÀ ĐIỀU HƯỚNG GIAO DIỆN
        if (cartItems.length === 0) {
            toggleCartStatus(true); // Hiển thị giao diện giỏ hàng trống
            
            // Đảm bảo cập nhật icon đếm số lượng (nếu có ở Header) về 0
            const badge = document.querySelector('.cart-badge');
            if (badge) badge.innerText = 0;
            return; // Thoát hàm sớm, không cần tính toán thêm
        } else {
            toggleCartStatus(false); // Có sản phẩm -> hiển thị khối giỏ hàng
        }
        
        // Tính tổng tiền nếu có sản phẩm
        cartItems.forEach(item => {
            const priceElement = item.querySelector('.text-orange');
            if(priceElement) {
                const priceText = priceElement.innerText;
                const price = parseInt(priceText.replace(/\D/g, ''));
                const quantityInput = item.querySelector('.quantity-group input');
                const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                
                total += price * quantity;
            }
        });
        
        const formattedTotal = total.toLocaleString('vi-VN') + ' đ';
        
        // Cập nhật tổng tiền vào 2 vị trí: Tổng tiền hàng & Tổng cộng
        const totalAmountDisplay = document.querySelector('#cart-total-amount');
        if (totalAmountDisplay) totalAmountDisplay.innerText = formattedTotal;

        const grandTotalDisplay = document.querySelector('#cart-grand-total'); 
        if (grandTotalDisplay) grandTotalDisplay.innerText = formattedTotal;
        
        const badge = document.querySelector('.cart-badge');
        if (badge) badge.innerText = cartItems.length;
    }
    
    // Gắn sự kiện cho các nút tăng/giảm số lượng
    const quantityGroups = document.querySelectorAll('.quantity-group');
    quantityGroups.forEach(group => {
        const minusBtn = group.querySelector('button:first-child');
        const plusBtn = group.querySelector('button:last-child');
        const input = group.querySelector('input');
        
        if (minusBtn && plusBtn && input) {
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
        }
    });
    
    // Gắn sự kiện xóa cho các sản phẩm
    const removeButtons = document.querySelectorAll('.btn-remove-item');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
                this.closest('.cart-item').remove();
                updateCartTotal(); // Khi xóa xong, hàm sẽ kiểm tra xem mảng DOM còn phần tử nào không để cập nhật
            }
        });
    });

    // Sự kiện Nút đặt hàng
    const orderBtn = document.querySelector('.btn-danger');
    if (orderBtn) {
        orderBtn.addEventListener('click', function(e) {
            const cartItems = document.querySelectorAll('.cart-item');
            if (cartItems.length === 0) {
                e.preventDefault(); // Ngăn chuyển trang nếu giỏ rỗng
                alert('Giỏ hàng của bạn đang trống, vui lòng chọn sản phẩm!');
            }
        });
    }

    // QUAN TRỌNG: Gọi hàm kiểm tra ngay khi trang vừa load xong
    updateCartTotal();
});