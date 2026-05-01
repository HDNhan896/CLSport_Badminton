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

//Render product
function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function renderProduct() {

}
