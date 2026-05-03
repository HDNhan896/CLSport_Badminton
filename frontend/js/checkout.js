function formatVNCurrency(value) {
  return value.toLocaleString('vi-VN') + ' đ';
}

function updateCheckoutSummary() {
  const cart = JSON.parse(localStorage.getItem('userCart')) || [];
  const checkoutItems = document.getElementById('checkout-items');
  const subtotalLabel = document.getElementById('checkout-subtotal');
  const totalLabel = document.getElementById('checkout-total');
  const submitButton = document.querySelector('button[type="submit"]');

  checkoutItems.innerHTML = '';

  if (!cart.length) {
    checkoutItems.innerHTML = `
                        <div class="text-center text-muted py-5">
                            Giỏ hàng của bạn hiện tại đang trống. Vui lòng quay lại giỏ hàng để thêm sản phẩm.
                        </div>
                    `;
    subtotalLabel.innerText = '0 đ';
    totalLabel.innerText = '0 đ';
    if (submitButton) submitButton.disabled = true;
    return;
  }

  let subtotal = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    checkoutItems.insertAdjacentHTML('beforeend', `
                        <div class="d-flex align-items-start mb-3 pb-3 border-bottom" style="gap: 10px;">
                            <input type="checkbox" class="checkout-item-checkbox mt-1" data-item-id="${item.id}" checked style="cursor: pointer; width: 18px; height: 18px;">
                            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: contain; border-radius: 4px; border: 1px solid #eee; flex-shrink: 0;">
                            <div style="flex: 1; min-width: 0;">
                                <h6 class="mb-1 fw-bold small" style="max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</h6>
                                <small class="text-muted">Giá: ${formatVNCurrency(item.price)}</small>
                                <div class="mt-2 d-flex align-items-center gap-2">
                                    <label class="small text-muted mb-0">SL mua:</label>
                                    <input type="number" class="checkout-item-quantity form-control form-control-sm" data-item-id="${item.id}" value="1" min="1" max="${item.quantity}" style="width: 60px;">
                                </div>
                            </div>
                            <span class="fw-bold small text-nowrap" style="min-width: 80px; text-align: right;">${formatVNCurrency(item.price * item.quantity)}</span>
                        </div>
                    `);
  });

  subtotalLabel.innerText = formatVNCurrency(subtotal);
  totalLabel.innerText = formatVNCurrency(subtotal);
  if (submitButton) submitButton.disabled = false;

  // Gắn event listener cho checkbox và input số lượng
  attachCheckoutEventListeners();
}

function attachCheckoutEventListeners() {
  // Dùng event delegation để checkbox luôn hoạt động ngay cả khi re-render
  const checkoutItems = document.getElementById('checkout-items');

  // Xóa event listener cũ nếu có
  checkoutItems.removeEventListener('change', handleCheckoutChange);

  // Gắn event listener mới với delegation
  checkoutItems.addEventListener('change', handleCheckoutChange);
}

function handleCheckoutChange(e) {
  // Kiểm tra xem event từ checkbox hay input
  if (e.target.classList.contains('checkout-item-checkbox')) {
    // Checkbox thay đổi - chỉ update tính toán, không render lại
    updateCheckoutTotal();
  } else if (e.target.classList.contains('checkout-item-quantity')) {
    // Input số lượng thay đổi
    const quantity = parseInt(e.target.value);
    const max = parseInt(e.target.max);

    // Giới hạn số lượng không vượt quá max
    if (quantity > max) {
      e.target.value = max;
    } else if (quantity < 1) {
      e.target.value = 1;
    }

    // Update tính toán
    updateCheckoutTotal();
  }
}

function updateCheckoutTotal() {
  const cart = JSON.parse(localStorage.getItem('userCart')) || [];
  const subtotalLabel = document.getElementById('checkout-subtotal');
  const totalLabel = document.getElementById('checkout-total');

  let subtotal = 0;

  // Chỉ tính những sản phẩm được checked
  const checkboxes = document.querySelectorAll('.checkout-item-checkbox:checked');
  checkboxes.forEach(checkbox => {
    const itemId = checkbox.getAttribute('data-item-id');
    const quantityInput = document.querySelector(`input.checkout-item-quantity[data-item-id="${itemId}"]`);
    const cartItem = cart.find(item => item.id == itemId);

    if (cartItem && quantityInput) {
      const quantity = parseInt(quantityInput.value) || 1;
      subtotal += cartItem.price * quantity;
    }
  });

  subtotalLabel.innerText = formatVNCurrency(subtotal);
  totalLabel.innerText = formatVNCurrency(subtotal);
}

document.getElementById('checkout-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Ngăn trình duyệt reload lại trang

  // Lấy các sản phẩm đã được chọn
  const checkboxes = document.querySelectorAll('.checkout-item-checkbox:checked');

  if (checkboxes.length === 0) {
    alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
    return;
  }

  let userCart = JSON.parse(localStorage.getItem('userCart')) || [];
  let selectedItems = [];

  // Thu thập thông tin sản phẩm được chọn
  checkboxes.forEach(checkbox => {
    const itemId = checkbox.getAttribute('data-item-id');
    const quantityInput = document.querySelector(`input.checkout-item-quantity[data-item-id="${itemId}"]`);
    const quantity = parseInt(quantityInput.value) || 1;

    selectedItems.push({
      id: itemId,
      quantity: quantity
    });
  });

  // Xử lý trừ sản phẩm từ userCart
  selectedItems.forEach(selectedItem => {
    const cartItemIndex = userCart.findIndex(item => item.id == selectedItem.id);

    if (cartItemIndex > -1) {
      userCart[cartItemIndex].quantity -= selectedItem.quantity;

      // Nếu số lượng về 0 hoặc âm, xóa sản phẩm khỏi giỏ
      if (userCart[cartItemIndex].quantity <= 0) {
        userCart.splice(cartItemIndex, 1);
      }
    }
  });

  // Cập nhật lại localStorage
  localStorage.setItem('userCart', JSON.stringify(userCart));

  // Hiển thị modal thành công
  const fullName = document.getElementById('fullname').value.trim();
  document.getElementById('customer-name').innerText = fullName || 'Quý khách';

  const successModal = new bootstrap.Modal(document.getElementById('successModal'));
  successModal.show();

  // Xóa giỏ hàng nếu trống, hoặc cập nhật giỏ nếu còn sản phẩm
  const cartBadge = document.querySelector('.cart-badge');
  if (cartBadge) {
    const totalItems = userCart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.innerText = totalItems;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  updateCheckoutSummary();
});