const $signup_btn = document.querySelector('.signup-btn');

$signup_btn.addEventListener('click', (event) => {
    event.preventDefault();
    const $image = document.querySelector('.profile-image').files[0];
    const fetch_url = url + 'account/signup/';
    const formData = new FormData();
    formData.append('email', document.querySelector('.email').value);
    formData.append('password', document.querySelector('.password').value);
    formData.append('password2', document.querySelector('.password2').value);
    formData.append('nickname', document.querySelector('.nickname').value);
    formData.append('username', document.querySelector('.username').value);
    formData.append('image', $image);

    fetch(fetch_url, {
        method: 'POST',
        body: formData,
    }).then((res) => {
        if (res.status === 201) {
            alert('회원가입이 완료되었습니다.');
            window.location.href = 'login.html';
        } else {
            alert('회원가입에 실패하였습니다.');
        }
    })
});
