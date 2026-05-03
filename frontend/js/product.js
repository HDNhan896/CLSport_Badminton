//
import { PRODUCTS } from "./badmintonProducts.js";

// Hàm tăng số lượng khi người dùng nhấn nút "+" và cập nhật lại giá tiền tương ứng
window.increaseQuantity = function() {
    // Lấy giá trị hiện tại, tăng lên 1 và cập nhật lại input
    const quantityInput = document.querySelector('.select-quantity input');
    // Nếu giá trị hiện tại không phải là số hợp lệ, đặt lại về 1
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
}

// Hàm giảm số lượng nhưng không cho phép nhỏ hơn 1 và cập nhật lại giá tiền tương ứng 
window.decreaseQuantity = function() {
    // Lấy giá trị hiện tại, giảm đi 1 nếu lớn hơn 1 và cập nhật lại input
    const quantityInput = document.querySelector('.select-quantity input');
    // Nếu giá trị hiện tại không phải là số hợp lệ, đặt lại về 1
    let currentValue = parseInt(quantityInput.value);
    // Chỉ giảm nếu giá trị hiện tại lớn hơn 1 để tránh số lượng âm hoặc bằng 0
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

// Hàm lấy ID sản phẩm từ URL
function getProductId() {
    // Sử dụng URLSearchParams để trích xuất tham số 'id' từ URL hiện tại và trả về giá trị của nó. Nếu không tìm thấy tham số 'id', hàm sẽ trả về null.
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Hàm chính để render sản phẩm
function renderProduct() {
    const id = getProductId();
    // Tìm sản phẩm trong mảng PRODUCTS dựa trên ID lấy được từ URL. Nếu không tìm thấy sản phẩm nào có ID khớp, hàm sẽ in ra lỗi và dừng lại.
    const product = PRODUCTS.find(p => p.id == id);
    // Nếu không tìm thấy sản phẩm nào có ID khớp, hàm sẽ in ra lỗi và dừng lại.
    if (!product) {
        console.error("Không tìm thấy sản phẩm");
        return;
    }

    // 1. Render Breadcrumb
    // Lấy phần tử breadcrumb đang hoạt động (có class "text-danger") và phần tử breadcrumb của danh mục sản phẩm (có id "product-category-active"). 
    const breadcrumbActive = document.querySelector('.bread_crumb_list .text-danger');
    // Nếu phần tử breadcrumbActive tồn tại, nó sẽ được cập nhật với tên sản phẩm hiện tại. 
    const breadcrumbCategoryActive = document.getElementById('product-category-active');
    // Tương tự, nếu phần tử breadcrumbCategoryActive tồn tại, nó sẽ được cập nhật với tên danh mục của sản phẩm. 
    if (breadcrumbActive) breadcrumbActive.innerText = product.title;
    // Nếu không tìm thấy phần tử nào trong DOM, các bước cập nhật sẽ được bỏ qua mà không gây lỗi. 
    // Điều này giúp đảm bảo rằng trang vẫn hoạt động bình thường ngay cả khi cấu trúc HTML không hoàn toàn khớp với mong đợi.
    if (breadcrumbCategoryActive) breadcrumbCategoryActive.innerHTML = `<span>${product.category}</span>&nbsp; &gt;`;
    
    // 2. Render Ảnh sản phẩm kèm Badge (Mới, Bán chạy, Giảm giá)
    // Lấy phần tử chứa ảnh sản phẩm dựa trên id "render-img-product". 
    const imgContainer = document.getElementById('render-img-product');
    // Nếu phần tử này tồn tại, nó sẽ được cập nhật để hiển thị ảnh sản phẩm cùng với các badge tương ứng (Mới, Bán chạy, Giảm giá).
    if (imgContainer) {
        // Xử lý hiển thị phần trăm giảm giá
        let discountBadge = '';
        // Kiểm tra nếu sản phẩm có giá gốc (originalPrice) và giá gốc lớn hơn giá hiện tại (price), thì tính toán phần trăm giảm giá và tạo badge tương ứng.
        if (product.originalPrice && product.originalPrice > product.price) {
            // Tính phần trăm giảm giá bằng cách lấy hiệu số giữa giá gốc và giá hiện tại, chia cho giá gốc, rồi nhân với 100 và làm tròn kết quả. 
            let discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            // Sau đó, tạo một badge hiển thị phần trăm giảm giá này ở góc trên bên phải của ảnh sản phẩm.
            discountBadge = `<span class="badge bg-warning text-dark position-absolute" style="top: 10px; right: 20px; z-index: 10;">-${discountPercent}%</span>`;
        }

        // Xử lý hiển thị nhãn Mới và Bán chạy
        const newBadge = product.isNew ? `<span class="badge bg-success position-absolute" style="top: 10px; left: 20px; z-index: 10;">MỚI</span>` : '';
        
        // Căn chỉnh vị trí nhãn Bán chạy sang bên cạnh nếu đã có nhãn Mới
        let bestSellerLeft = product.isNew ? "70px" : "20px";
        // Nếu sản phẩm là bán chạy, tạo một badge hiển thị "BÁN CHẠY" ở góc trên bên trái của ảnh sản phẩm, căn chỉnh vị trí dựa trên việc có nhãn Mới hay không.
        const bestSellerBadge = product.isBestSeller ? `<span class="badge bg-danger position-absolute" style="top: 10px; left: ${bestSellerLeft}; z-index: 10;">BÁN CHẠY</span>` : '';

        // Bọc thẻ img trong div có position-relative để gắn badge nổi lên trên
        // Ảnh sản phẩm với các badge được đặt trong một div có position-relative để đảm bảo chúng hiển thị đúng vị trí trên ảnh.
        // Các badge (Mới, Bán chạy, Giảm giá) sẽ được hiển thị tùy theo thuộc tính của sản phẩm. 
        // Nếu sản phẩm có thuộc tính isNew là true, sẽ hiển thị badge "MỚI". 
        // Nếu sản phẩm có thuộc tính isBestSeller là true, sẽ hiển thị badge "BÁN CHẠY". 
        // Nếu sản phẩm có giá gốc cao hơn giá hiện tại, sẽ hiển thị badge giảm giá với phần trăm giảm tương ứng.
        // Các badge được xếp chồng lên nhau bằng cách sử dụng position-absolute và z-index để đảm bảo chúng hiển thị đúng vị trí trên ảnh sản phẩm.
        // Nếu sản phẩm có giá gốc cao hơn giá hiện tại, sẽ hiển thị badge giảm giá với phần trăm giảm tương ứng.
        // Ảnh sản phẩm được hiển thị với class "w-100" để chiếm toàn bộ chiều rộng của container, cùng với các lớp "shadow" và "rounded-3" để tạo hiệu ứng bóng và bo góc cho ảnh. 
        // product.cover chứa đường dẫn đến ảnh sản phẩm, và alt được đặt bằng tên sản phẩm để cải thiện khả năng truy cập và SEO.
        imgContainer.innerHTML = `
        <div class="position-relative">
            ${newBadge}
            ${bestSellerBadge}
            ${discountBadge}
            <a class="nav-link w-100" href="">
                <img class="w-100 shadow rounded-3" src="${product.cover}" alt="${product.title}">
            </a>
        </div>
        `;
    }

    // 3. Render Thông tin cơ bản (Tên, Mã, Giá)
    // Cập nhật tên sản phẩm vào phần tử h1 trong class "product-info".
    document.querySelector('.product-info h1').innerText = product.title;
    // Cập nhật mã sản phẩm vào phần tử span có class "text-danger" trong class "product-info".
    document.querySelector('.product-info span .text-danger').innerText = product.id;

    // Định dạng giá tiền
    const priceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
    // Khởi tạo biến priceHtml với giá đã được định dạng. 
    // Nếu sản phẩm có giá gốc (originalPrice) và giá gốc lớn hơn giá hiện tại (price), sẽ thêm phần hiển thị giá gốc đã bị gạch ngang vào priceHtml.
    let priceHtml = `${priceFormatted}`;
    
    // Hiển thị thêm giá gốc gạch ngang nếu sản phẩm có giảm giá
    if (product.originalPrice && product.originalPrice > product.price) {
        // Định dạng giá gốc và thêm vào priceHtml với kiểu chữ gạch ngang và màu xám nhạt để thể hiện rằng đây là giá cũ đã bị giảm. 
        const originalPriceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice);
        // Giá gốc được hiển thị với class "text-muted" để có màu xám nhạt, "text-decoration-line-through" để gạch ngang, và "fs-6 ms-2" để điều chỉnh kích thước chữ và khoảng cách so với giá hiện tại.
        priceHtml += ` <span class="text-muted text-decoration-line-through fs-6 ms-2" style="font-weight: normal;">${originalPriceFormatted}</span>`;
    }
    
    // Đổ giá vào giao diện
    //
    const priceElement = document.querySelector('.pice-box .text-danger');
    if (priceElement) priceElement.innerHTML = priceHtml;

    // 4. Render Bảng Thông số kỹ thuật (Details) & Mô tả (Desc)
    const detailTable = document.querySelector('#details table');
    const descContainer = document.getElementById('desc'); // Lấy trực tiếp id="desc" thay vì "#desc table"

    let specsHtml = "";

    // Phân loại render Specs (Thông số kỹ thuật): Vợt và Giày
    if (product.specs && (product.category === "Vợt Cầu Lông" || product.category === "Giày Cầu Lông")) {
        specsHtml = Object.entries(product.specs).map(([key, value]) => {
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            const displayValue = Array.isArray(value) ? value.join(", ") : value;
            return `
                <tr>
                    <th class="col-4">${label}</th>
                    <td>${displayValue}</td>
                </tr>`;
        }).join('');
    } 
    // Specs cho Các sản phẩm còn lại (Áo, Quần, Túi, Phụ kiện)
    else {
        const priceFormattedTable = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
        specsHtml = `
            <tr>
                <th class="col-4">Brand</th>
                <td>${product.brand}</td>
            </tr>
            <tr>
                <th class="col-4">Category</th>
                <td>${product.category}</td>
            </tr>
            <tr>
                <th class="col-4">Rating</th>
                <td>${product.rating}/5.0 ⭐ (${product.reviews} reviews)</td>
            </tr>
            <tr>
                <th class="col-4">Status</th>
                <td class="text-success">√ In Stock</td>
            </tr>
            <tr>
                <th class="col-4">Price</th>
                <td class="text-danger fw-bold">${priceFormattedTable}</td>
            </tr>
        `;
    }

    // Đổ dữ liệu Specs vào bảng chi tiết
    if (detailTable) detailTable.innerHTML = specsHtml;

    // Đổ dữ liệu vào Tab Mô tả (Dựa theo PRODUCT_DESCRIPTIONS)
    if (descContainer) {
        const template = PRODUCT_DESCRIPTIONS[product.category];
        
        if (template) {
            // Thay thế chữ {title} và {brand} bằng dữ liệu thật của sản phẩm
            const introText = template.intro
                .replace('{title}', product.title)
                .replace('{brand}', product.brand);
                
            // Tạo danh sách ưu điểm dạng thẻ <li>
            const featuresHtml = template.features
                .map(feature => `<li><i class="fa-solid fa-check text-success me-2"></i> ${feature}</li>`)
                .join('');

            // Lắp ráp HTML cuối cùng
            descContainer.innerHTML = `
                <p class="mb-4 lh-base" style="font-size: 1.2rem;">${introText}</p>
                <h6 class="fs-4 fw-bold mb-3" style="color: #d95327;">Ưu điểm nổi bật:</h6>
                <ul class="list-unstyled ps-2 lh-lg">
                    ${featuresHtml}
                </ul>
            `;
        } else {
            descContainer.innerHTML = `<p class="text-muted">Đang cập nhật mô tả cho sản phẩm này.</p>`;
        }
    }

    // 5. Render Sản Phẩm Liên Quan
    renderRelatedProducts(product);
}

// Hàm mới: Xử lý phần Sản Phẩm Liên Quan
function renderRelatedProducts(currentProduct) {
    const container = document.getElementById('related-products-container');
    if (!container) return; 

    const relatedProducts = PRODUCTS.filter(p => 
        p.category === currentProduct.category && p.id !== currentProduct.id
    );

    const displayProducts = relatedProducts.slice(0, 4);

    let html = '';

    displayProducts.forEach((p, index) => {
        const delay = index * 0.1; 

        let discountBadge = '';
        let originalPriceHtml = '<div style="height: 19px;"></div>'; 

        if (p.originalPrice && p.originalPrice > p.price) {
            let discountPercent = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
            discountBadge = `<span class="badge position-absolute shadow-sm" style="top: 10px; right: 10px; z-index: 10; background-color: #d95327;">-${discountPercent}%</span>`;
            
            const originalPriceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.originalPrice);
            originalPriceHtml = `<div class="text-muted text-decoration-line-through small">${originalPriceFormatted}</div>`;
        }

        const priceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price);
        
        // ĐÃ SỬA: Thêm class "current-price" vào thẻ div chứa giá tiền bên dưới
        const priceHtml = `<div class="fw-bold fs-6 current-price" style="color: #d95327;">${priceFormatted}</div>`;

        const newBadge = p.isNew ? `<span class="badge bg-success position-absolute shadow-sm" style="top: 10px; left: 10px; z-index: 10;">MỚI</span>` : '';
        let bestSellerStyle = p.isNew ? "top: 10px; left: 60px;" : "top: 10px; left: 10px;";
        const bestSellerBadge = p.isBestSeller ? `<span class="badge position-absolute shadow-sm" style="${bestSellerStyle}; z-index: 10; background-color: #d95327;">BÁN CHẠY</span>` : '';

        let starsHtml = '';
        const rating = p.rating || 5;
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                starsHtml += '<i class="fa-solid fa-star text-warning small"></i>';
            } else if (i - rating > 0 && i - rating < 1) {
                 starsHtml += '<i class="fa-solid fa-star-half-stroke text-warning small"></i>';
            } else {
                starsHtml += '<i class="fa-regular fa-star text-warning small"></i>';
            }
        }

        // ĐÃ SỬA: Đảm bảo p.id được bọc trong dấu ngoặc kép (phòng trường hợp id có chứa chữ)
        html += `
            <div class="col-md-3 col-sm-6 mb-4 product-slide-enter" style="animation-delay: ${delay}s;">
                <div class="card h-100 border-0 shadow-sm product-card-hover position-relative overflow-hidden">
                    ${newBadge}
                    ${bestSellerBadge}
                    ${discountBadge}
                    
                    <a href="product.html?id=${p.id}" class="text-decoration-none text-dark d-flex flex-column h-100">
                        <div class="p-3 img-zoom-container">
                            <img src="${p.cover}" class="card-img-top" alt="${p.title}" style="object-fit: contain; height: 200px; width: 100%;">
                        </div>
                        <div class="card-body text-center d-flex flex-column justify-content-end p-2 pb-0">
                            <p class="fw-bold mb-1 small text-uppercase" style="color: #d95327;">${p.brand}</p>
                            <h6 class="card-title text-truncate mb-2" title="${p.title}" style="font-size: 0.95rem;">${p.title}</h6>
                            <div class="mb-2">
                                ${starsHtml} <span class="small text-muted">(${rating})</span>
                            </div>
                            <div class="mt-auto">
                                ${priceHtml}
                                ${originalPriceHtml}
                            </div>
                        </div>
                    </a>
                    
                    <div class="card-footer bg-transparent border-0 p-3 pt-2 text-center btn-cart-wrapper">
                        <button class="btn w-100 btn-add-cart" style="border: 1px solid #d95327; color: #d95327;" onclick="addToCart('${p.id}', event)">
                            <i class="fa-solid fa-cart-plus me-1"></i> Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Khởi chạy khi tải xong trang
document.addEventListener('DOMContentLoaded', () => {
    renderProduct();
});

// Dữ liệu mô tả chi tiết cho từng loại sản phẩm (dựa trên category)
const PRODUCT_DESCRIPTIONS = {
    "Vợt Cầu Lông": {
        intro: "<strong>{title}</strong> của <strong>{brand}</strong> là dòng vợt cầu lông cao cấp, được chế tác từ vật liệu Carbon siêu bền. Công nghệ khí động học tiên tiến giúp vung vợt nhanh, tối ưu hóa sức mạnh và độ chính xác. Thiết kế khung trợ lực mang lại những cú đập cầu đầy uy lực và cảm giác cầu cực tốt.",
        features: [
            "Khung vợt Carbon siêu nhẹ, chịu lực căng dây cao",
            "Giảm sức cản không khí, tăng tốc độ vung vợt đáng kể",
            "Điểm cân bằng tối ưu cho từng lối đánh riêng biệt",
            "Trục vợt đàn hồi tốt, hỗ trợ trợ lực tối đa cho cổ tay",
            "Hạn chế rung lắc, bảo vệ tay khỏi các chấn thương thể thao"
        ]
    },
    "Giày Cầu Lông": {
        intro: "<strong>{title}</strong> của <strong>{brand}</strong> là mẫu giày cầu lông chuyên dụng, nổi bật với khả năng bảo vệ chân toàn diện. Công nghệ đệm giảm chấn độc quyền giúp hấp thụ lực va đập tuyệt vời khi bật nhảy. Thiết kế form dáng ôm sát cùng đế cao su bám sân giúp bạn di chuyển linh hoạt và an toàn.",
        features: [
            "Đế cao su chống mài mòn, bám sân cực tốt trên mọi mặt thảm",
            "Đệm giảm chấn êm ái, bảo vệ gót và đầu gối khi tiếp đất",
            "Bề mặt vải lưới thoáng khí, thoát mồ hôi không gây hầm bí",
            "Form ôm chân vừa vặn, chống lật sơ mi cổ chân hiệu quả",
            "Trọng lượng siêu nhẹ, hỗ trợ bứt tốc nhanh chóng trên sân"
        ]
    },
    "Áo Cầu Lông": {
        intro: "<strong>{title}</strong> của <strong>{brand}</strong> là áo cầu lông hiệu suất cao, được dệt từ chất liệu polyester cao cấp. Công nghệ quick-dry độc quyền giúp thoát mồ hôi nhanh, giữ cơ thể khô ráo suốt trận đấu. Thiết kế ôm cơ thể vừa vặn giúp tối ưu hóa sự di chuyển và giảm cảm giác nóng bức.",
        features: [
            "Chất liệu polyester thoáng khí, co giãn 4 chiều",
            "Công nghệ quick-dry, thoát mồ hôi nhanh chóng",
            "Thiết kế ergonomic, không hạn chế chuyển động",
            "In ấn bền màu, không phai sau nhiều lần giặt",
            "Thoải mái cho huấn luyện và thi đấu liên tục"
        ]
    },
    "Quần Cầu Lông": {
        intro: "<strong>{title}</strong> của <strong>{brand}</strong> là mẫu quần thể thao năng động, thiết kế chuẩn form cho những pha di chuyển khó. Chất liệu vải thun co giãn đa chiều mang đến sự thoải mái tuyệt đối khi gập gối hay xoạc cầu. Công nghệ tản nhiệt thông minh giúp bạn luôn tự tin trong mọi set đấu căng thẳng.",
        features: [
            "Vải thun cao cấp mềm mịn, không gây cọ xát và kích ứng da",
            "Co giãn cực tốt, hỗ trợ tối đa mọi tư thế vận động mạnh",
            "Lưng chun ôm eo chắc chắn, tích hợp dây rút điều chỉnh tiện lợi",
            "Trọng lượng siêu nhẹ, thoát ẩm và làm khô nhanh chóng",
            "Form dáng thể thao hiện đại, dễ dàng phối đồ thi đấu"
        ]
    },
    "Túi Cầu Lông": {
        intro: "<strong>{title}</strong> của <strong>{brand}</strong> là giải pháp hoàn hảo để bảo vệ và sắp xếp bộ dụng cụ thi đấu của bạn. Chất liệu vải chống thấm nước kết hợp cùng lớp lót cách nhiệt giúp bảo quản vợt an toàn trong mọi thời tiết. Thiết kế phân ngăn khoa học mang lại sự tiện lợi và phong cách chuyên nghiệp.",
        features: [
            "Sức chứa lớn, chia ngăn thông minh và vô cùng khoa học",
            "Tích hợp ngăn đựng giày riêng biệt, có lỗ thoáng khí chống mùi",
            "Ngăn lót giấy bạc cách nhiệt, bảo vệ cước và khung vợt tối đa",
            "Chất liệu vải PU/Polyester chống thấm, chống bụi, dễ lau chùi",
            "Quai xách và đeo vai đệm mút dày êm ái, giảm mỏi khi di chuyển"
        ]
    },
    "Phụ Kiện": {
        intro: "<strong>{title}</strong> của <strong>{brand}</strong> là phụ kiện thiết yếu giúp nâng tầm trải nghiệm thi đấu của mọi lông thủ. Được sản xuất trên dây chuyền công nghệ hiện đại, sản phẩm đảm bảo độ bền bỉ và chất lượng vượt trội. Thiết kế tối ưu giúp tăng cường cảm giác cầu và bảo vệ tuổi thọ cho thiết bị của bạn.",
        features: [
            "Chất liệu cao cấp, mang lại độ bền bỉ và tuổi thọ sử dụng cao",
            "Hỗ trợ tối ưu hóa hiệu suất thi đấu trong từng pha cầu",
            "Thiết kế đạt tiêu chuẩn, dễ dàng thao tác, thay thế và sử dụng",
            "Tăng cường độ nảy, độ bám và cảm giác tay cực kỳ thoải mái",
            "Bảo vệ các thiết bị chính (vợt, giày) một cách hoàn hảo nhất"
        ]
    }
};

// Hàm showToast
function showToast(type, message) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;';
        document.body.appendChild(toastContainer);
    }

    // Cấu hình màu sắc, icon và tiêu đề dựa vào loại thông báo (type)
    let themeColor = '#24bf65'; // Mặc định là xanh lá (thành công)
    let iconClass = 'fa-solid fa-circle-check';
    let title = 'Thành công!';

    if (type === 'warning') {
        themeColor = '#ffc107'; // Màu vàng cam cho cảnh báo
        iconClass = 'fa-solid fa-triangle-exclamation';
        title = 'Chú ý!';
    }

    const toast = document.createElement('div');
    toast.className = 'custom-toast shadow'; 
    toast.innerHTML = `
        <div class="d-flex align-items-center" style="background-color: #ffffff; border-left: 5px solid ${themeColor}; padding: 15px 20px; border-radius: 6px; min-width: 280px;">
            <i class="${iconClass} fs-4 me-3" style="color: ${themeColor};"></i>
            <div>
                <div class="text-dark fw-bold" style="font-size: 0.95rem;">${title}</div>
                <div class="text-muted" style="font-size: 0.85rem;">${message}</div>
            </div>
        </div>
    `;

    toastContainer.appendChild(toast);
    
    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s';
        setTimeout(() => toast.remove(), 400); 
    }, 3000);
}

// Cập nhật lại hàm addToCartDetail
window.addToCartDetail = function(event) {
    if (event) {
        event.preventDefault();
    }

    const id = getProductId();
    const product = PRODUCTS.find(p => p.id == id);
    if (!product) return;

    const quantityInput = document.querySelector('.select-quantity input');
    let quantity = parseInt(quantityInput.value) || 0;

    // Thay thế alert() bằng showToast trạng thái 'warning'
    if (quantity <= 0) {
        showToast('warning', 'Vui lòng tăng số lượng sản phẩm trước khi thêm vào giỏ!');
        return;
    }

    let userCart = JSON.parse(localStorage.getItem('userCart')) || [];
    const existingItem = userCart.find(item => item.id == id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        userCart.push({ 
            id: product.id, 
            name: product.title, 
            price: product.price, 
            image: product.cover, 
            quantity: quantity 
        });
    }

    localStorage.setItem('userCart', JSON.stringify(userCart));

    if (typeof window.updateCartBadge === 'function') {
        window.updateCartBadge();
    }

    // Dùng showToast trạng thái 'success' kèm số lượng động
    showToast('success', `Đã thêm ${quantity} sản phẩm vào giỏ hàng.`);
    
    // Đặt lại số lượng về 1 sau khi thêm thành công
    quantityInput.value = 1;
}