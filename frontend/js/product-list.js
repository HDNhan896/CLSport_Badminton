const container = document.getElementById("sanPham");
const cards = Array.from(container.querySelectorAll('.card'));




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

function locTheoGia() {
    // Lấy tất cả các checkbox ĐANG ĐƯỢC CHỌN (có dấu tick)
    const checkedBoxes = document.querySelectorAll('.form-check-input:checked');
    
    // Hàm hỗ trợ lấy giá trị số từ chuỗi text của sản phẩm
    const getPriceValue = (card) => {
        const priceText = card.querySelector('.product-price span').innerText;
        return parseInt(priceText.replace(/\./g, '').replace(/[^\d]/g, ''));
    };

    // Lặp qua toàn bộ sản phẩm
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let price = getPriceValue(card);
        let isMatch = false; // Cờ kiểm tra xem sản phẩm có khớp điều kiện không

        // Nếu không có checkbox nào được chọn -> Mặc định cho hiện tất cả
        if (checkedBoxes.length === 0) {
            card.style.display = 'block';
            continue; 
        }

        // Lặp qua các checkbox đang được đánh dấu để xem giá sản phẩm có lọt vào khoảng nào không
        checkedBoxes.forEach(box => {
            // Tách value "500000-1000000" thành mảng ["500000", "1000000"]
            let range = box.value.split('-'); 
            let min = parseInt(range[0]);
            let max = range[1] === 'max' ? Infinity : parseInt(range[1]);

            // Nếu giá sản phẩm nằm trong khoảng của checkbox đang xét
            if (price >= min && price <= max) {
                isMatch = true; 
            }
        });

        // Kết quả: Khớp thì hiện, không khớp thì ẩn
        if (isMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const menuContent = document.getElementById('Loc').innerHTML;
    document.getElementById('Loc-offcanva').innerHTML = menuContent;    
});