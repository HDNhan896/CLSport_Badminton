document.addEventListener("DOMContentLoaded", () => {
    const headerPlaceholder = document.getElementById('header');
    fetch('./components/header.html')
        .then(response => response.text())
        .then(data => {
            headerPlaceholder.innerHTML = data;
            initSearchForm();
        });
});

document.addEventListener("DOMContentLoaded", () => {
    const footerPlaceholder = document.getElementById('footer');
    fetch('./components/footer.html')
        .then(response => response.text())
        .then(data => {
            footerPlaceholder.innerHTML = data;
        });
});

function initSearchForm() {
    const searchForm = document.querySelector('.search-wrapper');
    if (!searchForm) return;

    const searchInput = searchForm.querySelector('input[type="text"]');
    if (!searchInput) return;

    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q');
    if (initialQuery) {
        searchInput.value = initialQuery;
    }

    window.searchProducts = function(event) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        const query = searchInput.value.trim();
        if (!query) {
            alert('Vui lòng nhập từ khóa tìm kiếm!');
            searchInput.focus();
            return;
        }

        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    };

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        window.searchProducts();
    });
}




