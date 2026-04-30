function giaTangDan(event) {
    // 1. Ngăn trang web load lại khi nhấn thẻ <a>
    if (event) event.preventDefault();

    // 2. Xác định container chứa các thẻ card (hãy đổi '.row' thành ID cụ thể nếu cần)
    const container = document.getElementById("sanPham"); 
    const cards = Array.from(container.querySelectorAll('.card'));

    // 3. Hàm lấy giá trị số từ chuỗi định dạng (ví dụ: "1.369.000 ₫")
    const getPriceValue = (card) => {
        const priceText = card.querySelector('.product-price span').innerText;
        // Loại bỏ dấu chấm, khoảng trắng và chữ đ, sau đó chuyển sang số
        return parseInt(priceText.replace(/\./g, '').replace(/[^\d]/g, ''));
    };

    // 4. Sắp xếp mảng
    cards.sort((a, b) => getPriceValue(a) - getPriceValue(b));

    // 5. Cập nhật lại giao diện
    container.innerHTML = ''; // Xóa danh sách cũ
    cards.forEach(card => container.appendChild(card));
}

function giaGiamDan(event) {
    // 1. Ngăn trang web load lại khi nhấn thẻ <a>
    if (event) event.preventDefault();

    // 2. Xác định container chứa các thẻ card (hãy đổi '.row' thành ID cụ thể nếu cần)
    const container = document.getElementById("sanPham"); 
    const cards = Array.from(container.querySelectorAll('.card'));

    // 3. Hàm lấy giá trị số từ chuỗi định dạng (ví dụ: "1.369.000 ₫")
    const getPriceValue = (card) => {
        const priceText = card.querySelector('.product-price span').innerText;
        // Loại bỏ dấu chấm, khoảng trắng và chữ đ, sau đó chuyển sang số
        return parseInt(priceText.replace(/\./g, '').replace(/[^\d]/g, ''));
    };

    // 4. Sắp xếp mảng
    cards.sort((a, b) => getPriceValue(b) - getPriceValue(a));

    // 5. Cập nhật lại giao diện
    container.innerHTML = ''; // Xóa danh sách cũ
    cards.forEach(card => container.appendChild(card));
}
const container = document.getElementById("sanPham");
const cards = Array.from(container.querySelectorAll('.card'));
function locTheoGia() {
    const price2 = document.getElementById("price2")
    let cardsLoc = [];

    const getPriceValue = (card) => {
        const priceText = card.querySelector('.product-price span').innerText;
        // Loại bỏ dấu chấm, khoảng trắng và chữ đ, sau đó chuyển sang số
        return parseInt(priceText.replace(/\./g, '').replace(/[^\d]/g, ''));
    };

    for (let i=0; i<cards.length; i++) {
        if (getPriceValue(cards[i]) < 1000000) {
            cardsLoc.push(cards[i])
        }
    }

    if (price2.checked) {
        container.innerHTML = ''; // Xóa danh sách cũ
        cardsLoc.forEach(card => container.appendChild(card));
    }
    else {
        container.innerHTML = ''; // Xóa danh sách cũ
        cards.forEach(card => container.appendChild(card));
    }   
}

document.addEventListener('DOMContentLoaded', function() {
    const menuContent = document.getElementById('Loc').innerHTML;
    document.getElementById('Loc-offcanva').innerHTML = menuContent;    
});