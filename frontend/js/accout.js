
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value.trim();

    let errorUser = document.getElementById("errorUser");
    let errorPass = document.getElementById("errorPass");

    let isValid = true;

    // Reset lỗi
    errorUser.innerText = "";
    errorPass.innerText = "";

    // Kiểm tra username
    if (user === "") {
        errorUser.innerText = "Vui lòng nhập email hoặc số điện thoại";
        isValid = false;
    } else {
        // Regex email
        let emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        // Regex số điện thoại 
        let phoneRegex = /^0\d{9}$/;

        if (!emailRegex.test(user) && !phoneRegex.test(user)) {
            errorUser.innerText = "Email hoặc số điện thoại không hợp lệ";
            isValid = false;
        }
    }

    // Kiểm tra mật khẩu
    if (pass === "") {
        errorPass.innerText = "Vui lòng nhập mật khẩu";
        isValid = false;
    } else if (pass.length < 6) {
        errorPass.innerText = "Mật khẩu phải có ít nhất 6 ký tự";
        isValid = false;
    }

    // Nếu hợp lệ
    if (isValid) {
        alert("Đăng nhập thành công");
    }
});

const toggleBtn = document.querySelector(".fa-eye-slash");
const passwordInput = document.getElementById("password");

toggleBtn.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleBtn.classList.remove("fa-eye-slash");
        toggleBtn.classList.add("fa-eye");
    } else {
        passwordInput.type = "password";
        toggleBtn.classList.add("fa-eye-slash");
        toggleBtn.classList.remove("fa-eye");
    }
});
