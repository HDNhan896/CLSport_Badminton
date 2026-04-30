
// =============================================================
// products.js — Cơ sở dữ liệu sản phẩm (static, không có backend)
//
// Chứa toàn bộ danh sách sản phẩm của shop dưới dạng mảng PRODUCTS.
// Mỗi sản phẩm có các field:
//   - id          : ID duy nhất, dùng để điều hướng đến trang chi tiết
//   - title       : Tên sản phẩm
//   - brand       : Thương hiệu
//   - price       : Giá bán hiện tại (VNĐ)
//   - originalPrice: Giá gốc — dùng để tính % giảm giá
//   - category    : Danh mục (Vợt / Giày / Áo / Quần / Túi / Phụ Kiện)
//   - cover       : URL ảnh sản phẩm
//   - rating      : Điểm đánh giá (0–5)
//   - reviews     : Số lượt đánh giá
//   - isNew       : Badge "MỚI"
//   - isBestSeller: Badge "BÁN CHẠY"
//   - sizes       : (tuỳ chọn) Các size có sẵn — áo/quần/giày
//   - specs       : (tuỳ chọn) Thông số kỹ thuật — hiển thị ở trang chi tiết
// =============================================================

export const PRODUCTS = [
  {
    id: 17,
    title: "Vợt Yonex Astrox 99",
    brand: "Yonex",
    price: 3800000,
    originalPrice: 4560000,
    category: "Vợt Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-yonex-astrox-99-play-2025-black-green-chinh-hang_1756252664.webp",
    rating: 5.0,
    reviews: 450,
    isNew: true,
    isBestSeller: false,
    specs: {
      level: "Chuyên Nghiệp",
      playType: "Cả Đơn và Đôi",
      style: "Tấn Công Mạnh Mẽ",
      stringTension: "Cứng",
      weight: "3U: 75 - 79g"
    }
  },
  {
    id: 18,
    title: "Giày Cầu Lông Kawasaki K32014 Đen Chính Hãng",
    brand: "Kawasaki",
    price: 450000,
    originalPrice: 540000,
    category: "Giày Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-kawasaki-k32014-den-chinh-hang_1767323942.webp",
    rating: 4.6,
    reviews: 320,
    isNew: false,
    isBestSeller: false,
    sizes: [35, 36, 37, 37.5, 38, 39, 39.5, 40, 40.5, 41, 42, 43, 44, 44.5, 45],
    specs: {
      material: "Mesh & Synthetic Leather",
      cushioning: "Dệt Ngoài - Lót Mềm",
      grip: "Cao Su Bền Bỉ",
      playStyle: "Toàn Diện",
      breathability: "Thoáng Khí"
    }
  },

  {
    id: 19,
    title: "Áo Cầu Lông Victor T-39014 - Xanh Chính Hãng",
    brand: "Victor",
    price: 380000,
    originalPrice: 456000,
    category: "Áo Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/ao-cau-long-victor-t-39014-xanh-chinh-hang_1741050654.webp",
    rating: 4.6,
    reviews: 280,
    isNew: true,
    isBestSeller: true,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
  },
  {
    id: 20,
    title: "Quần Cầu Lông Lining",
    brand: "Lining",
    price: 420000,
    originalPrice: 504000,
    category: "Quần Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/quan-cau-long-yonex-tsm3064-skipper-blue-chinh-hang_1763749705.webp",
    rating: 4.5,
    reviews: 210,
    isNew: false,
    isBestSeller: false,
    sizes: ["M", "L", "XL", "2XL", "3XL"]
  },
  {
    id: 21,
    title: "Túi Cầu Lông Yonex 235BA003U - Đỏ Gia Công",
    brand: "Yonex",
    price: 490000,
    originalPrice: 588000,
    category: "Túi Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/tui-cau-long-yonex-235ba003u-do-gia-cong_1704503862.webp",
    rating: 4.8,
    reviews: 350,
    isNew: true,
    isBestSeller: false
  },
  {
    id: 22,
    title: "Cuộc Cầu Lông Apacs Imperial 66 Chính Hãng",
    brand: "Apacs",
    price: 200000,
    originalPrice: 240000,
    category: "Phụ Kiện",
    cover: "https://cdn.shopvnb.com/uploads/gallery/cuoc-cau-long-apacs-imperial-66_1766083554.webp",
    rating: 4.7,
    reviews: 380,
    isNew: true,
    isBestSeller: false,
    specs: {
      brand: "Apacs",
      status: "Còn hàng",
      type: "Cuộc cầu lông",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      quality: "Chuyên Nghiệp",
      durability: "Bền Bỉ"
    }
  },
  {
    id: 23,
    title: "Vợt Lining Turbo",
    brand: "Li-Ning",
    price: 950000,
    originalPrice: 1140000,
    category: "Vợt Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-lining-turbo-charging-marshal-den-noi-dia-trung_1727143329.webp",
    rating: 4.8,
    reviews: 380,
    isNew: true,
    isBestSeller: false,
    specs: {
      level: "Chuyên Nghiệp & Nâng Cao",
      playType: "Cả Đơn và Đôi",
      style: "Công Thủ Toàn Diện",
      stringTension: "Vừa",
      weight: "4U: 80 - 84g"
    }
  },
  {
    id: 24,
    title: "Vợt Victor Photon",
    brand: "Victor",
    price: 650000,
    originalPrice: 780000,
    category: "Vợt Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-victor-auraspeed-fantome-2025-chinh-hang_1744255600.jpg",
    rating: 4.6,
    reviews: 290,
    isNew: false,
    isBestSeller: false,
    specs: {
      level: "Chuyên Nghiệp",
      playType: "Cả Đơn và Đôi",
      style: "Phòng Ngự Mạnh",
      stringTension: "Mềm",
      weight: "4U: 80 - 84g"
    }
  },
  {
    id: 25,
    title: "Giày Cầu Lông Yonex Power Cushion Comfort Z3 Wide",
    brand: "Yonex",
    price: 1900000,
    originalPrice: 2280000,
    category: "Giày Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-yonex-power-cushion-comfort-z3-wide-ofwtrd-chinh-hang_1748917412.webp",
    rating: 4.9,
    reviews: 480,
    isNew: true,
    isBestSeller: true,
    sizes: [35, 36, 37, 37.5, 38, 39, 39.5, 40, 40.5, 41, 42, 43, 44, 44.5, 45],
    specs: {
      material: "Cao Cấp",
      cushioning: "Cloud Wave Hydro Technology",
      grip: "Power Graphite Outsole",
      playStyle: "Trong Nhà - Sân Thắm",
      breathability: "Siêu Thoáng Khí - Wide Form"
    }
  },
  {
    id: 26,
    title: "Giày Cầu Lông Victor A170 II LR",
    brand: "Victor",
    price: 850000,
    originalPrice: 1020000,
    category: "Giày Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-victor-a170-ii-lr-chinh-hang_1761591244.webp",
    rating: 4.5,
    reviews: 220,
    isNew: false,
    isBestSeller: true,
    sizes: [35, 36, 37, 37.5, 38, 39, 39.5, 40, 40.5, 41, 42, 43, 44, 44.5, 45],
    specs: {
      material: "Textile & Synthetic Overlay",
      cushioning: "Dual Motion Shock Cushioning",
      grip: "Victor Rubber Compound",
      playStyle: "Kiểm Soát & Tốc Độ",
      breathability: "Thoáng Khí Tốt"
    }
  },
  {
    id: 44,
    title: "Giày Cầu Lông Victor A770 V Chính Hãng",
    brand: "Victor",
    price: 3200000,
    originalPrice: 3840000,
    category: "Giày Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-victor-a770-v-chinh-hang_1768788207.webp",
    rating: 4.7,
    reviews: 290,
    isNew: false,
    isBestSeller: true,
    sizes: [35, 36, 37, 37.5, 38, 39, 39.5, 40, 40.5, 41, 42, 43, 44, 44.5, 45],
    specs: {
      material: "Trung Cấp",
      cushioning: "Victor Cushioning System",
      grip: "Victor Rubber Outsole",
      playStyle: "Trong Nhà - Sân Thắm",
      breathability: "Thoáng Khí Tốt"
    }
  },
  {
    id: 45,
    title: "Giày Cầu Lông Victor C90 HP AC Chính Hãng",
    brand: "Victor",
    price: 3350000,
    originalPrice: 4020000,
    category: "Giày Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-victor-c90-hp-ac-chinh-hang_1758245062.webp",
    rating: 4.8,
    reviews: 310,
    isNew: false,
    isBestSeller: true,
    sizes: [35, 36, 37, 37.5, 38, 39, 39.5, 40, 40.5, 41, 42, 43, 44, 44.5, 45],
    specs: {
      material: "Trung Cấp",
      cushioning: "Victor Cushioning System Pro",
      grip: "Victor Rubber Compound",
      playStyle: "Trong Nhà - Sân Thắm",
      breathability: "Thoáng Khí Tốt - Toàn Diện"
    }
  },
  {
    id: 46,
    title: "Giày Cầu Lông Kumpoo KH-G828 GZ Chính Hãng",
    brand: "Kumpoo",
    price: 1940000,
    originalPrice: 2328000,
    category: "Giày Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-kumpoo-kh-g828-gz-chinh-hang_1773705669.webp",
    rating: 4.8,
    reviews: 340,
    isNew: true,
    isBestSeller: true,
    sizes: [35, 36, 37, 37.5, 38, 39, 39.5, 40, 40.5, 41, 42, 43, 44, 44.5, 45],
    specs: {
      material: "PU Leather & EVA cao cấp",
      cushioning: "Kumpoo Cushioning Technology",
      grip: "Kumpoo Rubber Outsole",
      playStyle: "Cao Cấp & Chuyên Nghiệp",
      breathability: "Thoáng Khí - Nhẹ Nhàng"
    }
  },
  {
    id: 47,
    title: "Giày Cầu Lông Asics Court Control FF 4 Chính Hãng",
    brand: "Asics",
    price: 3100000,
    originalPrice: 3720000,
    category: "Giày Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-asics-court-control-ff-4-trang-vang-chinh-hang-1071a125-100_1768957016.webp",
    rating: 4.8,
    reviews: 380,
    isNew: true,
    isBestSeller: true,
    sizes: [35, 36, 37, 37.5, 38, 39, 39.5, 40, 40.5, 41, 42, 43, 44, 44.5, 45],
    specs: {
      material: "Cao Cấp",
      cushioning: "FF BLAST PLUS Technology",
      grip: "Asics Rubber Compound",
      playStyle: "Trong Nhà - Sân Thắm",
      breathability: "Êm Ái & Thoáng Khí"
    }
  },
  {
    id: 48,
    title: "Giày Cầu Lông Lining AYAV001-1 Saga 3 Pro Chính Hãng",
    brand: "Lining",
    price: 3780000,
    originalPrice: 4536000,
    category: "Giày Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-lining-ayav001-1-chinh-hang_1770842252.webp",
    rating: 4.9,
    reviews: 350,
    isNew: true,
    isBestSeller: true,
    sizes: [35, 36, 37, 37.5, 38, 39, 39.5, 40, 40.5, 41, 42, 43, 44, 44.5, 45],
    specs: {
      material: "Cao Cấp",
      cushioning: "Lining Cloud Foam Technology",
      grip: "Lining Rubber Outsole",
      playStyle: "Trong Nhà - Sân Thắm",
      breathability: "Toàn Diện & Thoáng Khí"
    }
  },
  {
    id: 27,
    title: "Áo Cầu Lông Yonex TRM3104 - Bluing Chính Hãng",
    brand: "Yonex",
    price: 169000,
    originalPrice: 202800,
    category: "Áo Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/ao-cau-long-vina-authentic-mvp01-nam-xanh-bien-chinh-hang_1775251726.webp",
    rating: 4.8,
    reviews: 520,
    isNew: true,
    isBestSeller: false,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
  },
  {
    id: 28,
    title: "Áo Cầu Lông Taro TR025-A39 Nữ - Hồng Chính Hãng",
    brand: "Taro",
    price: 169000,
    originalPrice: 202000,
    category: "Áo Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/ao-cau-long-taro-tr025-a39-nu-hong-chinh-hang_1770683263.webp",
    rating: 4.6,
    reviews: 245,
    isNew: false,
    isBestSeller: true,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
  },

  {
    id: 29,
    title: "Áo Cầu Lông Victor T-41001-J Chính Hãng",
    brand: "Victor",
    price: 1200000,
    originalPrice: 1440000,
    category: "Áo Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/ao-cau-long-victor-t-40009d-do-chinh-hang_1748478143.webp",
    rating: 4.7,
    reviews: 390,
    isNew: true,
    isBestSeller: false,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
  },

  {
    id: 50,
    title: "Áo Cầu Lông Yonex TRLYW0037 - Soft Yellow Chính Hãng",
    brand: "Yonex",
    price: 750000,
    originalPrice: 900000,
    category: "Áo Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/ao-cau-long-yonex-trlyw0037-soft-yellow-chinh-hang_1773447014.webp",
    rating: 4.8,
    reviews: 310,
    isNew: true,
    isBestSeller: false,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
  },

  {
    id: 51,
    title: "Áo Cầu Lông Taro TR025-A41 Nữ - Xanh Chính Hãng",
    brand: "Taro",
    price: 1500000,
    originalPrice: 1800000,
    category: "Áo Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/ao-cau-long-taro-tr025-a41-nu-xanh-chinh-hang_1770685548.webp",
    rating: 4.7,
    reviews: 280,
    isNew: true,
    isBestSeller: true,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
  },

  {
    id: 52,
    title: "Áo Cầu Lông Yonex TRM3074 - Night Sky Chính Hãng",
    brand: "Yonex",
    price: 1800000,
    originalPrice: 2160000,
    category: "Áo Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/ao-cau-long-yonex-trm3074-night-sky-chinh-hang_1760572768.webp",
    rating: 4.8,
    reviews: 340,
    isNew: true,
    isBestSeller: false,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
  },

  {
    id: 30,
    title: "Quần Cầu Lông Victor",
    brand: "Victor",
    price: 600000,
    originalPrice: 720000,
    category: "Quần Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/quan-cau-long-victor-628-xanh-bien_1751507276.webp",
    rating: 4.6,
    reviews: 270,
    isNew: true,
    isBestSeller: true,
    sizes: ["M", "L", "XL", "2XL", "3XL"]
  },
  {
    id: 31,
    title: "Quần Cầu Lông Yonex",
    brand: "Yonex",
    price: 750000,
    originalPrice: 900000,
    category: "Quần Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/quan-cau-long-yonex-sm-2421-grape-wine-chinh-hang_1702578937.webp",
    rating: 4.8,
    reviews: 350,
    isNew: true,
    isBestSeller: true,
    sizes: ["M", "L", "XL", "2XL", "3XL"]
  },
  {
    id: 778,
    title: "Túi Cầu Lông Yonex 219BA002U - Xanh Trắng Gia Công",
    brand: "Yonex",
    price: 2550000,
    originalPrice: 3060000,
    category: "Túi Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/tui-cau-long-yonex-219ba002u-xanh-trang-gia-cong_1693765427.webp",
    rating: 4.6,
    reviews: 290,
    isNew: true,
    isBestSeller: false
  },
  {
    id: 32,
    title: "Túi Vợt Cầu Lông Yonex 62026EX - Trắng Tím Gia Công",
    brand: "Yonex",
    price: 650000,
    originalPrice: 780000,
    category: "Túi Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/tui-vot-cau-long-yonex-62026ex-trang-tim-gia-cong_1703193696.webp",
    rating: 4.5,
    reviews: 220,
    isNew: false,
    isBestSeller: true
  },
  {
    id: 33,
    title: "Dây Cước Căng Vợt Cầu Lông Kumpoo JS67 Chính Hãng",
    brand: "Kumpoo",
    price: 550000,
    originalPrice: 660000,
    category: "Phụ Kiện",
    cover: "https://cdn.shopvnb.com/uploads/gallery/day-cuoc-cang-vot-cau-long-kumpoo-js67_1763145711.webp",
    rating: 4.8,
    reviews: 420,
    isNew: true,
    isBestSeller: true,
    specs: {
      brand: "Kumpoo",
      status: "Còn hàng",
      type: "Dây cước căng vợt",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      tension: "Cao",
      elasticity: "Tốt"
    }
  },
  {
    id: 34,
    title: "Dây Cước Căng Vợt Yonex BG EXBOLT 65 Chính Hãng",
    brand: "Yonex",
    price: 850000,
    originalPrice: 1020000,
    category: "Phụ Kiện",
    cover: "https://cdn.shopvnb.com/uploads/san_pham/day-cuoc-cang-vot-yonex-bg-exbolt-65-1.webp",
    rating: 4.9,
    reviews: 560,
    isNew: true,
    isBestSeller: true,
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      type: "Dây cước căng vợt",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      tension: "Cao Cấp",
      elasticity: "Siêu Tốt"
    }
  },
  {
    id: 35,
    title: "Vợt Cầu Lông Mizuno Acrospeed 8",
    brand: "Mizuno",
    price: 950000,
    originalPrice: 1140000,
    category: "Vợt Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-mizuno-acrospeed-8-trang-vang-chinh-hang_1737139247.webp",
    rating: 4.8,
    reviews: 240,
    isNew: true,
    isBestSeller: true,
    specs: {
      level: "Chuyên Nghiệp",
      playType: "Cả Đơn và Đôi",
      style: "Tốc Độ & Tấn Công",
      stringTension: "Siêu Cứng",
      weight: "3U: 75 - 79g"
    }
  },
  {
    id: 36,
    title: "Vợt Cầu Lông Apacs Nano 900 Power",
    brand: "Apacs",
    price: 687000,
    originalPrice: 824400,
    category: "Vợt Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-nano-900-power-red_1742341322.webp",
    rating: 4.6,
    reviews: 185,
    isNew: false,
    isBestSeller: true,
    specs: {
      level: "Nâng Cao - Chuyên Nghiệp",
      playType: "Cả Đơn và Đôi",
      style: "Công Thủ Cân Bằng",
      stringTension: "Vừa",
      weight: "4U: 80 - 84g"
    }
  },
  {
    id: 37,
    title: "Vợt Cầu Lông Apacs RAPIER 110",
    brand: "Apacs",
    price: 760000,
    originalPrice: 912000,
    category: "Vợt Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-rapier-110_1747164865.webp",
    rating: 4.7,
    reviews: 210,
    isNew: true,
    isBestSeller: true,
    specs: {
      level: "Nâng Cao",
      playType: "Cả Đơn và Đôi",
      style: "Phòng Ngự & Kiểm Soát",
      stringTension: "Mềm",
      weight: "4U: 80 - 84g"
    }
  },
  {
    id: 38,
    title: "Vợt Cầu Lông Apacs FEATHER WEIGHT 100",
    brand: "Apacs",
    price: 1550000,
    originalPrice: 1860000,
    category: "Vợt Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-apacs-feather-weight-100-1.webp",
    rating: 4.6,
    reviews: 165,
    isNew: false,
    isBestSeller: true,
    specs: {
      level: "Chuyên Nghiệp",
      playType: "Cả Đơn và Đôi",
      style: "Nhẹ nhàng & Ma Tốc",
      stringTension: "Vừa",
      weight: "2U: 70 - 74g"
    }
  },
  {
    id: 39,
    title: "Vợt Cầu Lông Apacs Nano Fusion Speed 722",
    brand: "Apacs",
    price: 879000,
    originalPrice: 1097000,
    category: "Vợt Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-apacs-nano-fusion-speed-722-chinh-hang-1.webp",
    rating: 4.7,
    reviews: 180,
    isNew: false,
    isBestSeller: true,
    specs: {
      level: "Nâng Cao",
      playType: "Cả Đơn và Đôi",
      style: "Tốc Độ Và Kiểm Soát",
      stringTension: "Cứng",
      weight: "4U: 80 - 84g"
    }
  },
  {
    id: 40,
    title: "Vợt Cầu Lông Kumpoo QQ Music Chính Hãng",
    brand: "Kumpoo",
    price: 1090000,
    originalPrice: 1300000,
    category: "Vợt Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/set-vot-cau-long-kumpoo-qq-music-chinh-hang_1773704732.webp",
    rating: 4.6,
    reviews: 175,
    isNew: false,
    isBestSeller: true,
    specs: {
      level: "Nâng Cao",
      playType: "Cả Đơn và Đôi",
      style: "Cực Thể Hóa",
      stringTension: "Vừa",
      weight: "4U: 80 - 84g"
    }
  },
  {
    id: 41,
    title: "Vợt Cầu Lông Lining Bladex Assassin",
    brand: "Lining",
    price: 1300000,
    originalPrice: 1560000,
    category: "Vợt Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-lining-bladex-assassin-den-vang-chinh-hang_1774059746.webp",
    rating: 4.7,
    reviews: 168,
    isNew: false,
    isBestSeller: true,
    specs: {
      level: "Chuyên Nghiệp",
      playType: "Cả Đơn và Đôi",
      style: "Tấn Công Nhanh",
      stringTension: "Cứng",
      weight: "3U: 75 - 79g"
    }
  },
  {
    id: 42,
    title: "Vợt Cầu Lông Gosen Inferno Air +Core",
    brand: "Gosen",
    price: 4500000,
    originalPrice: 5400000,
    category: "Vợt Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-gosen-inferno-air-core-chinh-hang_1773717309.webp",
    rating: 4.8,
    reviews: 200,
    isNew: false,
    isBestSeller: true,
    specs: {
      level: "Chuyên Nghiệp Hàng Đầu",
      playType: "Cả Đơn và Đôi",
      style: "Tấn Công Mạnh Mẽ",
      stringTension: "Siêu Cứng",
      weight: "3U: 75 - 79g"
    }
  },
  {
    id: 43,
    title: "Vợt Cầu Lông VNB V200i Hồng",
    brand: "VNB",
    price: 715000,
    originalPrice: 858000,
    category: "Vợt Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200i-hong-3.webp",
    rating: 4.5,
    reviews: 145,
    isNew: false,
    isBestSeller: true,
    specs: {
      level: "Sơ Cấp - Nâng Cao",
      playType: "Cả Đơn và Đôi",
      style: "Cân Bằng & Kiểm Soát",
      stringTension: "Vừa",
      weight: "4U: 80 - 84g"
    }
  },
  {
    id: 49,
    title: "Giày Cầu Lông Yonex Subaxia GT Wide - Gray Chính Hãng",
    brand: "Yonex",
    price: 3550000,
    originalPrice: 4260000,
    category: "Giày Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-yonex-subaxia-gt-wide-gray-chinh-hang_1768944280.webp",
    rating: 4.8,
    reviews: 420,
    isNew: true,
    isBestSeller: true,
    sizes: [35, 36, 37, 37.5, 38, 39, 39.5, 40, 40.5, 41, 42, 43, 44, 44.5, 45],
    specs: {
      material: "Cao Cấp",
      cushioning: "Yonex Cloud Wave Technology",
      grip: "Yonex Rubber Compound",
      playStyle: "Trong Nhà - Sân Thắm",
      breathability: "Thoáng Khí - Wide Form"
    }
  },
  {
    id: 53,
    title: "Áo Cầu Lông Victor 6077 Nam - Trắng Phối Xanh Đỏ Chính Hãng",
    brand: "Victor",
    price: 1600000,
    originalPrice: 1920000,
    category: "Áo Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/san_pham/ao-cau-long-victor-6077-nam-trang-phoi-xanh-do-1.webp",
    rating: 4.7,
    reviews: 280,
    isNew: true,
    isBestSeller: true,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
  },
  {
    id: 54,
    title: "Áo Cầu Lông Victor AT-7100M - Xanh Chuối Chính Hãng",
    brand: "Victor",
    price: 3100000,
    originalPrice: 3720000,
    category: "Áo Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/ao-cau-long-victor-at-7100m-xanh-chuoi-chinh-hang_1775867196.webp",
    rating: 4.7,
    reviews: 280,
    isNew: true,
    isBestSeller: true,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
  },
  {
    id: 55,
    title: "Áo Cầu Lông Victor S-3502Q - Hồng Đậm Chính Hãng",
    brand: "Victor",
    price: 1900000,
    originalPrice: 2280000,
    category: "Áo Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/ao-cau-long-victor-s-3502q-hong-dam-chinh-hang_1775185055.webp",
    rating: 4.7,
    reviews: 280,
    isNew: true,
    isBestSeller: true,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
  },
  {
    id: 56,
    title: "Quần Cầu Lông Yonex TSM3064 - Poppy Seed Chính Hãng",
    brand: "Yonex",
    price: 1350000,
    originalPrice: 1620000,
    category: "Quần Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/quan-cau-long-yonex-tsm3064-poppy-seed-chinh-hang_1763750925.webp",
    rating: 4.8,
    reviews: 320,
    isNew: true,
    isBestSeller: false,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Vải thể thao cao cấp",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      playStyle: "Toàn Diện",
      breathability: "Thoáng Khí - Êm Ái"
    }
  },
  {
    id: 57,
    title: "Quần Cầu Lông Yonex TSM2844 - Hemlock Chính Hãng",
    brand: "Yonex",
    price: 750000,
    originalPrice: 900000,
    category: "Quần Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/quan-cau-long-yonex-tsm2844-hemlock-chinh-hang_1754855214.webp",
    rating: 4.8,
    reviews: 310,
    isNew: true,
    isBestSeller: false,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Vải thể thao cao cấp",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      playStyle: "Toàn Diện",
      breathability: "Thoáng Khí - Êm Ái"
    }
  },
  {
    id: 58,
    title: "Quần Cầu Lông Yonex TSM2910 - Dark Navy Chính Hãng",
    brand: "Yonex",
    price: 2000000,
    originalPrice: 2400000,
    category: "Quần Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/quan-cau-long-yonex-tsm2910-dark-navy-chinh-hang_1750184036.webp",
    rating: 4.8,
    reviews: 300,
    isNew: true,
    isBestSeller: false,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Vải thể thao cao cấp",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium"
      ],
      playStyle: "Toàn Diện",
      breathability: "Thoáng Khí - Êm Ái"
    }
  },
  {
    id: 59,
    title: "Quần Cầu Lông Yonex SM2570 Nam - Rhubarb Chính Hãng",
    brand: "Yonex",
    price: 1450000,
    originalPrice: 1740000,
    category: "Quần Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/quan-cau-long-yonex-sm2570-nam-rhubarb-chinh-hang_1745877429.webp",
    rating: 4.8,
    reviews: 330,
    isNew: true,
    isBestSeller: false,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Vải thể thao cao cấp",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      playStyle: "Toàn Diện",
      breathability: "Thoáng Khí - Êm Ái"
    }
  },
  {
    id: 60,
    title: "Quần Cầu Lông Yonex SM2570 Nam - Dark Gull Gray Chính Hãng",
    brand: "Yonex",
    price: 1650000,
    originalPrice: 1980000,
    category: "Quần Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/quan-cau-long-yonex-sm2570-nam-dark-gull-gray-chinh-hang_1745877646.webp",
    rating: 4.8,
    reviews: 325,
    isNew: true,
    isBestSeller: false,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Vải thể thao cao cấp",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      playStyle: "Toàn Diện",
      breathability: "Thoáng Khí - Êm Ái"
    }
  },
  {
    id: 61,
    title: "Quần Cầu Lông Yonex SM2551 Nam - Jet Black Chính Hãng",
    brand: "Yonex",
    price: 1750000,
    originalPrice: 2100000,
    category: "Quần Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/quan-cau-long-yonex-sm2551-nam-jet-black-chinh-hang_1746557113.webp",
    rating: 4.8,
    reviews: 340,
    isNew: true,
    isBestSeller: false,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Vải thể thao cao cấp",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      playStyle: "Toàn Diện",
      breathability: "Thoáng Khí - Êm Ái"
    }
  },
  {
    id: 62,
    title: "Quần Cầu Lông Yonex 9225 - Vàng Chính Hãng",
    brand: "Yonex",
    price: 900000,
    originalPrice: 1080000,
    category: "Quần Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/quan-cau-long-yonex-9225-vang_1721240035.webp",
    rating: 4.7,
    reviews: 290,
    isNew: true,
    isBestSeller: false,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Vải thể thao cao cấp",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      playStyle: "Toàn Diện",
      breathability: "Thoáng Khí - Êm Ái"
    }
  },
  {
    id: 63,
    title: "Quần Cầu Lông Yonex SM 2419 - Porcelain Chính Hãng",
    brand: "Yonex",
    price: 1350000,
    originalPrice: 1620000,
    category: "Quần Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/quan-cau-long-yonex-sm-2419-porcelain-chinh-hang_1694394779.webp",
    rating: 4.8,
    reviews: 315,
    isNew: true,
    isBestSeller: false,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Vải thể thao cao cấp",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      playStyle: "Toàn Diện",
      breathability: "Thoáng Khí - Êm Ái"
    }
  },
  {
    id: 64,
    title: "Quần Cầu Lông Yonex QY2301 Nữ - Trắng Chính Hãng",
    brand: "Yonex",
    price: 1100000,
    originalPrice: 1320000,
    category: "Quần Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/quan-cau-long-yonex-qy2301-nu-trang_1694397466.webp",
    rating: 4.7,
    reviews: 305,
    isNew: true,
    isBestSeller: false,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Vải thể thao cao cấp",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      playStyle: "Toàn Diện",
      breathability: "Thoáng Khí - Êm Ái"
    }
  },
  {
    id: 65,
    title: "Túi Cầu Lông Yonex BAG324B0629 - Dress Blues/Spicy Mustard Chính Hãng",
    brand: "Yonex",
    price: 1850000,
    originalPrice: 2220000,
    category: "Túi Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/tui-cau-long-yonex-bag324b0629-dress-blues-spicy-mustard_1753296942.webp",
    rating: 4.8,
    reviews: 280,
    isNew: true,
    isBestSeller: false,
    sizes: ["One Size"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Polyester bền chắc",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      capacity: "Chứa được 2-4 cái vợt",
      design: "Thiết kế hiện đại, thoải mái"
    }
  },
  {
    id: 66,
    title: "Túi Cầu Lông Yonex BAG324B0629 - Jet Black/Tradewinds Chính Hãng",
    brand: "Yonex",
    price: 1950000,
    originalPrice: 2340000,
    category: "Túi Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/tui-cau-long-yonex-bag324b0629-jet-black-tradewinds_1753296993.webp",
    rating: 4.8,
    reviews: 275,
    isNew: true,
    isBestSeller: false,
    sizes: ["One Size"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Polyester bền chắc",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      capacity: "Chứa được 2-4 cái vợt",
      design: "Thiết kế hiện đại, thoải mái"
    }
  },
  {
    id: 67,
    title: "Túi Cầu Lông Yonex BAG324B0629 - Jet Black/Chinese Red Chính Hãng",
    brand: "Yonex",
    price: 2100000,
    originalPrice: 2520000,
    category: "Túi Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/tui-cau-long-yonex-bag324b0629-jetblack-chinese-red_1753297096.webp",
    rating: 4.8,
    reviews: 270,
    isNew: true,
    isBestSeller: false,
    sizes: ["One Size"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Polyester bền chắc",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      capacity: "Chứa được 2-4 cái vợt",
      design: "Thiết kế hiện đại, thoải mái"
    }
  },
  {
    id: 68,
    title: "Túi Cầu Lông Yonex BAG324B0629 - Ocean Cavern/Super Sonic Chính Hãng",
    brand: "Yonex",
    price: 2300000,
    originalPrice: 2760000,
    category: "Túi Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/tui-cau-long-yonex-bag324b0629-ocean-cavern-super-sonic_1753297046.webp",
    rating: 4.8,
    reviews: 285,
    isNew: true,
    isBestSeller: false,
    sizes: ["One Size"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Polyester bền chắc",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      capacity: "Chứa được 2-4 cái vợt",
      design: "Thiết kế hiện đại, thoải mái"
    }
  },
  {
    id: 69,
    title: "Túi Cầu Lông Yonex BAG324B1931 - True Blue Chính Hãng",
    brand: "Yonex",
    price: 2150000,
    originalPrice: 2580000,
    category: "Túi Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/tui-cau-long-yonex-bag324b1931-true-blue_1752284248.webp",
    rating: 4.8,
    reviews: 295,
    isNew: true,
    isBestSeller: false,
    sizes: ["One Size"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Polyester bền chắc",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      capacity: "Chứa được 2-4 cái vợt",
      design: "Thiết kế hiện đại, thoải mái",
      colors: ["True Blue", "Bellwether Blue", "Jet Black", "Monument"]
    }
  },
  {
    id: 70,
    title: "Túi Cầu Lông Yonex BAG324B1726 - True Blue Chính Hãng",
    brand: "Yonex",
    price: 2800000,
    originalPrice: 3360000,
    category: "Túi Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/tui-cau-long-yonex-bag324b1726-true-blue_1752279801.webp",
    rating: 4.8,
    reviews: 290,
    isNew: true,
    isBestSeller: false,
    sizes: ["One Size"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Polyester bền chắc",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      capacity: "Chứa được 2-4 cái vợt",
      design: "Thiết kế hiện đại, thoải mái",
      colors: ["True Blue", "Bellwether Blue", "Monument", "Jet Black"]
    }
  },
  {
    id: 71,
    title: "Túi Cầu Lông Yonex BAG2326T02 - Navy/Golden Kiwi Chính Hãng",
    brand: "Yonex",
    price: 3150000,
    originalPrice: 3780000,
    category: "Túi Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/tui-cau-long-yonex-bag2326t02-navy-golden-kiwi-chinh-hang_1737598095.webp",
    rating: 4.8,
    reviews: 300,
    isNew: true,
    isBestSeller: false,
    sizes: ["One Size"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Polyester bền chắc",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đổi size",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      capacity: "Chứa được 2-4 cái vợt",
      design: "Thiết kế hiện đại, thoải mái",
      colors: ["Black/Light lime", "Navy/Golden kiwi", "Racing red/White", "Sea blue/White"]
    }
  },
  {
    id: 73,
    title: "Túi Cầu Lông Yonex BAG324B0129 - Jet Black/Lime Punch Chính Hãng",
    brand: "Yonex",
    price: 3600000,
    originalPrice: 4320000,
    category: "Túi Cầu Lông",
    cover: "https://cdn.shopvnb.com/uploads/gallery/tui-cau-long-yonex-bag324b0129-jet-black-lime-punch_1753236018.webp",
    rating: 4.8,
    reviews: 310,
    isNew: true,
    isBestSeller: false,
    sizes: ["One Size"],
    specs: {
      brand: "Yonex",
      status: "Còn hàng",
      material: "Polyester bền chắc",
      features: [
        "Thanh toán sau khi kiểm tra và nhận hàng",
        "Hỗ trợ đólassize",
        "Sơn logo mặt vợt miễn phí",
        "Bảo hành lỗi đan trong 72 giờ",
        "Thay gen vợt miễn phí trong đời",
        "Tích lũy điểm thành viên Premium",
        "Voucher giảm giá cho lần mua hàng tiếp theo"
      ],
      capacity: "Chứa được 2-4 cái vợt",
      design: "Thiết kế hiện đại, thoải mái",
      colors: ["Jet Black/Lime Punch", "Jet Black/Poinciana", "Pageant Blue/Moth", "Surf The Web/Harbor Mist"]
    }
  }
];


