const $signup_btn = document.querySelector('.signup-btn');

$signup_btn.addEventListener('click', (event) => {
    event.preventDefault();
    fetch(url + 'account/signup/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email': document.querySelector('.email').value,
            'password': document.querySelector('.password').value,
            'password2': document.querySelector('.password2').value,
            'nickname': document.querySelector('.nickname').value,
            'username': document.querySelector('.username').value,
        }),
    }).then((res) => {
        if (res.status === 201) {
            alert('회원가입이 완료되었습니다.');
            window.location.href = 'login.html';
        } else {
            alert('회원가입에 실패하였습니다.');
        }
    })
});