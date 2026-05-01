// Product page scripts
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

// Add event listeners to the buttons
document.querySelector('.select-quantity .fa-circle-plus').addEventListener('click', increaseQuantity);
document.querySelector('.select-quantity .fa-circle-minus').addEventListener('click', decreaseQuantity);

