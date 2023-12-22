const user_id = localStorage.getItem('id');
const secession_btn = document.querySelector('.secession-btn');

fetch(url + 'account/' + user_id + '/', {
    headers: {
        'Authorization': `Bearer ${access_token}`
    }
}).then(res => res.json())
.then(res => {
    console.log(res);
    if (res['image'] != null) {
        document.querySelector('.profile-img').src = res['image'];
    }
    document.querySelector('.username').innerHTML = res['username'];
    document.querySelector('.nickname').textContent = res['nickname'];
    document.querySelector('.email').textContent = res['email'];
});

secession_btn.addEventListener('click', () => {
    fetch(url + 'account/' + user_id + '/', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    }).then(res => {
        console.log(res);
        if (res.status === 204) {
            alert('회원탈퇴가 완료되었습니다.');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('id');
            window.location.href = 'login.html';
        }
    });
});