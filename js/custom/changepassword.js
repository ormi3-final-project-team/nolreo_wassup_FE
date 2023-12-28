const $old_password = document.querySelector('.old-password');
const $password = document.querySelector('.password');
const $password2 = document.querySelector('.password2');
const $password_change_btn = document.querySelector('.password-change-btn');

$password_change_btn.addEventListener('click', (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('old_password', $old_password.value);
    formData.append('password', $password.value);
    formData.append('password2', $password2.value);
    fetch(url + `account/${user_id}/password/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${access_token}`
        },
        body: formData
    }).then(res => {
        if (res.status === 200) {
            alert('비밀번호 변경이 완료되었습니다.');
            window.location.href = 'profile.html';
        }else{
            alert('비밀번호 변경에 실패하였습니다.');
        }
    });
});