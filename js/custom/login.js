const $login_btn = document.querySelector('.login-btn');

$login_btn.addEventListener('click', (event) => {
    event.preventDefault();
    const $email = document.querySelector('.email');
    const $password = document.querySelector('.password');

    fetch(url + 'account/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email : $email.value,
            password : $password.value,
        }),
    }).then((res) => {
        if (res.status === 200) {
            alert('로그인 성공!');
            window.location.href = 'index.html';
        } else {
            console.log(res.data['password'])
            alert('로그인 실패!');
        }
    });
});