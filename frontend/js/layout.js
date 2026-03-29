document.addEventListener("DOMContentLoaded", () => {
    const headerPlaceholder = document.getElementById('header');
        fetch('/frontend/components/header.html')
           .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
            })
});

document.addEventListener("DOMContentLoaded", () => {
    const footerPlaceholder = document.getElementById('footer');
        fetch('/frontend/components/footer.html')
           .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
});

