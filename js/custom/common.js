const url = 'http://127.0.0.1:8000/';

const login_navbar = `
<div class="offcanvas-body text-hover light-border">
    <ul id="navbar"
        class="navbar-nav text-uppercase justify-content-lg-center justify-content-md-end align-items-center flex-grow-1 pe-3">
        <li class="nav-item pe-4">
            <a class="nav-link light text-uppercase" href="#">Logout</a>
        </li>
        <li class="nav-item pe-4">
            <a class="nav-link light text-uppercase" href="profile.html">Profile</a>
        </li>
        <li class="nav-item pe-4">
            <a class="nav-link light text-uppercase" href="like_list.html">Pick</a>
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

const access_token = localStorage.getItem('access');
const $navbar = document.querySelector('.custom-navbar');
if (access_token) {
    $navbar.innerHTML += login_navbar;
} else {
    $navbar.innerHTML += logout_navbar;
}