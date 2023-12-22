const $signup_btn = document.querySelector('.signup-btn');

$signup_btn.addEventListener('click', (event) => {
    event.preventDefault();
    const $email = document.querySelector('.email').value
    const $password = document.querySelector('.password').value
    const $password2 = document.querySelector('.password2').value
    const $nickname = document.querySelector('.nickname').value
    const $username = document.querySelector('.username').value
    console.log($email, $password, $password2, $nickname, $username)
    fetch('http://localhost:8000/account/signup/', {
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
            window.location.href = 'index.html';
        } else {
            alert('회원가입에 실패하였습니다.');
            console.log(res.data);
        }
    })
});