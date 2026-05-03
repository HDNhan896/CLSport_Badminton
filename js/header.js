//Tìm sản phẩm
const searchForm = document.querySelector('.search-wrapper');
searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form submit
    const searchInput = searchForm.querySelector('input[type="text"]');
    const query = searchInput.value.trim();
    if (query) {
        // Chuyển hướng đến trang kết quả tìm kiếm với query
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    } else {
        alert('Vui lòng nhập từ khóa tìm kiếm!');
    }
});