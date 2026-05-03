
document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let pass = document.getElementById("password").value.trim();
    let repass = document.getElementById("repassword").value.trim();

    let isValid = true;

    // reset lỗi
    document.querySelectorAll(".text-danger").forEach(e => e.innerText = "");

    // regex
    let nameRegex = /^([A-Z][a-z]*)(\s[A-Z][a-z]*)*$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    let phoneRegex = /^0\d{9}$/;
    let passRegex = /^[\x00-\x7F]{6,15}$/;

   // TÊN
    if (name === "") {
        document.getElementById("errorName").innerText = "Vui lòng nhập tên";
        isValid = false;
    } else if (!nameRegex.test(name)) {
        document.getElementById("errorName").innerText =
            "Mỗi từ phải viết hoa chữ cái đầu và không dấu (VD: Nguyen Van A)";
        isValid = false;
    }

    // EMAIL
    if (email === "") {
        document.getElementById("errorEmail").innerText = "Vui lòng nhập email";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById("errorEmail").innerText = "Email phải có đuôi @gmail.com";
        isValid = false;
    }

    // PHONE
    if (phone !== "" && !phoneRegex.test(phone)) {
        document.getElementById("errorPhone").innerText = "SĐT phải 10 số và bắt đầu bằng 0";
        isValid = false;
    }

    // PASSWORD
    if (pass === "") {
        document.getElementById("errorPass").innerText = "Vui lòng nhập mật khẩu";
        isValid = false;
    } else if (!passRegex.test(pass)) {
        document.getElementById("errorPass").innerText = "Mật khẩu 6-15 ký tự, không dấu";
        isValid = false;
    }

    // NHẬP LẠI PASSWORD
    if (repass === "") {
        document.getElementById("errorRePass").innerText = "Vui lòng nhập lại mật khẩu";
        isValid = false;
    } else if (repass !== pass) {
        document.getElementById("errorRePass").innerText = "Mật khẩu không khớp";
        isValid = false;
    }

   //
    if (isValid) {
        const successModal = new bootstrap.Modal(document.getElementById('successSignupModal'));
        successModal.show();
        
        // Reset form
        document.getElementById("signupForm").reset();
    }
});
