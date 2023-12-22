document.addEventListener('DOMContentLoaded', function () {
    const tabLinks = document.querySelectorAll('.nav-tabs .nav-link');
    const formContainers = document.querySelectorAll('.tab-content .tab-pane');

    tabLinks.forEach((tabLink) => {
        tabLink.addEventListener('click', (event) => {
            event.preventDefault();

            tabLinks.forEach((link) => link.classList.remove('active'));
            formContainers.forEach((container) => container.classList.remove('active'));

            const selectedTab = event.target.getAttribute('href');
            event.target.classList.add('active');
            document.querySelector(selectedTab).classList.add('active');
        });
    });
});
