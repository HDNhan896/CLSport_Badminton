# 🏸 Badminton Shop

## Website Bán Vợt Cầu Lông

---

## 📌 Giới thiệu dự án

**Badminton Shop** là một website bán vợt cầu lông được xây dựng nhằm phục vụ **bài tập nhóm môn Web Development**.

Website mô phỏng một hệ thống thương mại điện tử cơ bản, cho phép người dùng xem và lựa chọn các sản phẩm cầu lông. Dự án được phát triển để thực hành xây dựng một hệ thống web hoàn chỉnh bao gồm **Frontend, Backend và Database**.

Người dùng có thể:

* Xem danh sách sản phẩm vợt cầu lông
* Xem thông tin chi tiết sản phẩm
* Thêm sản phẩm vào giỏ hàng
* Đăng ký và đăng nhập tài khoản
* Lấy dữ liệu sản phẩm thông qua API backend

---

## 🎯 Mục tiêu dự án

* Áp dụng kiến thức về **HTML, CSS, JavaScript**
* Xây dựng **Backend bằng Node.js và Express**
* Thiết kế và quản lý **Database (postgreSQL)**
* Sử dụng **Bootstrap để xây dựng giao diện responsive**
* Thực hành **làm việc nhóm bằng Git và GitHub**
* Hoàn thành một **website bán hàng cơ bản**

Mục tiêu của dự án là xây dựng một hệ thống **hoạt động ổn định, có cấu trúc rõ ràng và dễ phát triển**.

---

## 🛠 Công nghệ sử dụng

### 🎨 Frontend

* **HTML** – xây dựng cấu trúc trang web
* **CSS** – thiết kế giao diện
* **JavaScript** – xử lý logic phía client
* **Bootstrap** – framework hỗ trợ thiết kế giao diện responsive

### ⚙️ Backend

* **Node.js** – môi trường chạy JavaScript phía server
* **Express.js** – framework xây dựng API

### 🗄 Database

* **mySQL** – quản lý dữ liệu sản phẩm và người dùng

### 🔧 Công cụ phát triển

* **Git** – quản lý phiên bản source code
* **GitHub** – hỗ trợ lưu trữ và làm việc nhóm
* **VS Code** – môi trường lập trình

---

## ⚙️ Chức năng chính

### 🏠 Trang chủ

Hiển thị danh sách các sản phẩm vợt cầu lông đang được bán trên website.

### 🛍 Trang sản phẩm

Hiển thị thông tin chi tiết của từng sản phẩm:

* Tên sản phẩm
* Giá sản phẩm
* Hình ảnh
* Mô tả

### 🛒 Giỏ hàng

Cho phép người dùng:

* Thêm sản phẩm vào giỏ hàng
* Xem các sản phẩm đã chọn

### 👤 Tài khoản người dùng

* Đăng ký tài khoản mới
* Đăng nhập hệ thống
* Quản lý thông tin người dùng

### 🔗 API Backend

Backend cung cấp các API để:

* Lấy danh sách sản phẩm
* Lấy chi tiết sản phẩm theo ID
* Quản lý tài khoản người dùng

---

## 📂 Cấu trúc thư mục dự án

```id="0b6r1h"
badminton-shop/

frontend/
│
├── about.html
├── account.html
├── checkout.html
├── forgot-password.html
├── index.html
├── signup.html
│
├── pages/
│   ├── cart.html
│   └── product.html
│
├── components/
│   ├── footer.html
│   └── header.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── api.js
│   ├── card.js
│   ├── layout.js
│   ├── main.js
│   └── product.js
│
└── assets/
    └── images/

backend/
│
├── server.js
│
├── routes/
│   ├── productRoutes.js
│   └── userRoutes.js
│
├── controllers/
│   ├── productController.js
│   └── userController.js
│
└── models/
    ├── productModel.js
    └── userModel.js

database/
└── schema.sql

package.json
README.md
```

---

## 🚀 Hướng dẫn chạy dự án

### 1️⃣ Clone repository

```id="rj7t0a"
git clone <repository-link>
```

### 2️⃣ Cài đặt thư viện
cd vào backend
```
cd backend
```
sau đó
```
npm install
```

### 3️⃣ Chạy server

```
node backend/server.js
```

### 4️⃣ Mở website

Truy cập trình duyệt tại địa chỉ:

```
http://localhost:3000
```

---

## 📜 License

Dự án được xây dựng với mục đích **học tập và nghiên cứu**.
