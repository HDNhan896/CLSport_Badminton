// Hàm để chuyển đổi trạng thái giỏ hàng (Chỉ để bạn test)
function toggleCartStatus(isEmpty) {
    const fullCart = document.getElementById('cart-full');
    const emptyCart = document.getElementById('cart-empty');
    
    if (isEmpty) {
        fullCart.classList.add('d-none');
        emptyCart.classList.remove('d-none');
    } else {
        fullCart.classList.remove('d-none');
        emptyCart.classList.add('d-none');
    }
}

// Thử gọi hàm này để xem trạng thái trống:
//toggleCartStatus(true);

//-------------------------
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
            document.getElementById('cart-full').classList.add('d-none');
            document.getElementById('cart-empty').classList.remove('d-none');
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
});
//------

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