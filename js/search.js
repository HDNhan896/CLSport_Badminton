import { PRODUCTS } from './badmintonProducts.js';

const formatPrice = (price) => price.toLocaleString('vi-VN') + ' đ';

function createProductCard(product) {
    const discountBadge = product.originalPrice && product.originalPrice > product.price
        ? `<span class="badge position-absolute shadow-sm" style="top: 10px; right: 10px; z-index: 10; background-color: #d95327;">-${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>`
        : '';

    const newBadge = product.isNew ? `<span class="badge bg-success position-absolute shadow-sm" style="top: 10px; left: 10px; z-index: 10;">MỚI</span>` : '';
    const bestSellerLeft = product.isNew ? '60px' : '10px';
    const bestSellerBadge = product.isBestSeller ? `<span class="badge position-absolute shadow-sm" style="top: 10px; left: ${bestSellerLeft}; z-index: 10; background-color: #d95327;">BÁN CHẠY</span>` : '';

    const originalPriceHtml = product.originalPrice && product.originalPrice > product.price
        ? `<div class="text-muted text-decoration-line-through small">${formatPrice(product.originalPrice)}</div>`
        : '<div style="height: 19px;"></div>';

    return `
        <div class="col-6 col-md-4 col-lg-3 mb-3">
            <div class="card h-100 border-0 shadow-sm product-card-hover position-relative overflow-hidden">
                ${discountBadge}
                ${newBadge}
                ${bestSellerBadge}
                <a href="product.html?id=${product.id}" class="text-decoration-none text-dark d-flex flex-column h-100">
                    <div class="p-3 img-zoom-container">
                        <img src="${product.cover}" class="card-img-top" alt="${product.title}" style="object-fit: contain; height: 180px; width: 100%;">
                    </div>
                    <div class="card-body text-center d-flex flex-column justify-content-end p-2 pb-0">
                        <h6 class="card-title text-truncate mb-2" title="${product.title}" style="font-size: 0.95rem;">${product.title}</h6>
                        <div class="mt-auto product-price">
                            <div class="fw-bold fs-6 current-price" style="color: #d95327;">${formatPrice(product.price)}</div>
                            ${originalPriceHtml}
                        </div>
                    </div>
                </a>
                <div class="card-footer bg-transparent border-0 p-3 pt-2 text-center btn-cart-wrapper">
                    <a href="product.html?id=${product.id}" class="btn w-100 btn-add-cart" style="border: 1px solid #d95327; color: #d95327;">Xem chi tiết</a>
                </div>
            </div>
        </div>
    `;
}

function matchProduct(product, query) {
    const normalizedQuery = query.toLowerCase();
    const title = product.title.toLowerCase();
    const brand = (product.brand || '').toLowerCase();
    const category = (product.category || '').toLowerCase();

    return title.includes(normalizedQuery)
        || brand.includes(normalizedQuery)
        || category.includes(normalizedQuery);
}

function renderSearchResults(query) {
    const feedback = document.getElementById('search-feedback');
    const resultsContainer = document.getElementById('search-results');
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
        feedback.innerHTML = `<p class="text-muted">Vui lòng nhập từ khóa tìm kiếm.</p>`;
        resultsContainer.innerHTML = '';
        return;
    }

    const matchedProducts = PRODUCTS.filter(product => matchProduct(product, normalizedQuery));
    const resultCount = matchedProducts.length;

    feedback.innerHTML = `
        <div class="mb-4">
            <h4>Kết quả tìm kiếm cho: <span class="text-danger">${normalizedQuery}</span></h4>
            <p class="text-muted">${resultCount} sản phẩm được tìm thấy.</p>
        </div>
    `;

    if (resultCount === 0) {
        resultsContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning" role="alert">
                    Không tìm thấy sản phẩm phù hợp. Vui lòng thử lại với từ khóa khác.
                </div>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = matchedProducts.map(createProductCard).join('');
}

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name) || '';
}

function initPageSearch() {
    const query = getQueryParam('q');
    renderSearchResults(query);
}

window.addEventListener('DOMContentLoaded', initPageSearch);
