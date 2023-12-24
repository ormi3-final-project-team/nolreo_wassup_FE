const login_navbar = `
<div class="offcanvas-body text-hover light-border">
    <ul id="navbar"
        class="navbar-nav text-uppercase justify-content-lg-center justify-content-md-end align-items-center flex-grow-1 pe-3">
        <li class="nav-item pe-4">
            <a class="nav-link light text-uppercase logout" href="#">Logout</a>
        </li>
        <li class="nav-item pe-4">
            <a class="nav-link light text-uppercase profile_btn" href="profile.html">Profile</a>
        </li>
        <li class="nav-item pe-4">
            <a class="nav-link light text-uppercase" href="pick_list.html">Pick</a>
        </li>
    </ul>
</div>
`

const logout_navbar = `
<div class="offcanvas-body text-hover light-border">
    <ul id="navbar"
        class="navbar-nav text-uppercase justify-content-lg-center justify-content-md-end align-items-center flex-grow-1 pe-3">
        <li class="nav-item pe-4">
            <a class="nav-link light text-uppercase active" href="login.html">Login</a>
        </li>
        <li class="nav-item pe-4">
            <a class="nav-link light text-uppercase" href="signup.html">Signup</a>
        </li>
    </ul>
</div>
`

const url = 'http://127.0.0.1:8000/';
const access_token = localStorage.getItem('access');
const $navbar = document.querySelector('.custom-navbar');
const $profile_btn = document.querySelector('#profile-btn');
const user_id = localStorage.getItem('id');
const $footer = document.querySelector('.footer');

if (access_token) {
    $navbar.innerHTML += login_navbar;
    const $logout = document.querySelector('.logout');
    
    $logout.addEventListener('click', (event) => {
        event.preventDefault();
    
        localStorage.clear('access');
        localStorage.clear('refresh');
        window.location.href = 'index.html';
        alert('로그아웃 되었습니다.');
    });
} else {
    $navbar.innerHTML += logout_navbar;
}


$footer.innerHTML += `
<div class="container">
    <div class="row d-flex flex-wrap justify-content-between">
        <div class="col-lg-3 col-md-6 col-sm-6 pb-3">
            <div class="footer-menu">
                <h5 class="widget-title pb-2 fw-semibold fs-2">About us</h5>
                <p>저희는 오르미 3기 파이널 프로젝트 놀러 wassup 팀입니다.</p>
            </div>
        </div>
        <div class="col-lg-2 col-md-6 col-sm-6 pb-3">
            <div class="footer-menu">
                <h5 class="widget-title pb-2 fw-semibold fs-2">Quick Links</h5>
                <ul class="menu-list list-unstyled">
                    <li class="pb-2">
                        <a href="index.html">Main</a>
                    </li>
                    <li class="pb-2">
                        <a href="login.html">Login</a>
                    </li>
                    <li class="pb-2">
                        <a href="signup.html">SignUp</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6 pb-3">
            <div class="footer-menu">
                <h5 class="widget-title pb-2 fw-semibold fs-2">Git Repo</h5>
                <p>아래 Git 로고를 클릭해서 코드를 확인해보세요.</p>
                <ul class="social-links list-unstyled d-flex mt-3">
                    <li class="border d-flex justify-content-center align-items-center mx-auto">
                        <a href="https://github.com/orgs/ormi3-final-project-team/repositories">
                        <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 496 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="d-flex flex-wrap justify-content-between border-top pt-3">
        <div class="col-lg-4">
            <p>© 2023. All rights reserved.</p>
        </div>
    </div>
</div>
`