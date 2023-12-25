const $email = document.querySelector('.email');
const $username = document.querySelector('.username');
const $nickname = document.querySelector('.nickname');
const $profile_edit_btn = document.querySelector('.profile-edit-btn');
const $image = document.querySelector('.profile-img');

fetch(url + 'account/' + user_id + '/', {
    headers: {
        'Authorization': `Bearer ${access_token}`
    }
}).then(res => res.json())
.then(res => {
    console.log(res);
    if (res['image'] != null) {
        const fileName = res['image'];
        const file = new File([res['image']], fileName,{type:"image/jpeg", lastModified:new Date().getTime()}, 'utf-8');
        const container = new DataTransfer(); 
        container.items.add(file);
        $image.files = container.files;
    }
    $username.value = res['username'];
    $nickname.value = res['nickname'];
    $email.value = res['email'];
});

$profile_edit_btn.addEventListener('click', (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nickname', $nickname.value);
    formData.append('image', $image.files[0]);
    fetch(url + 'account/' + user_id + '/', {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${access_token}`
        },
        body: formData
    }).then(res => {
        console.log(res);
        if (res.status === 200) {
            alert('프로필 수정이 완료되었습니다.');
            window.location.href = 'profile.html';
        }else{
            alert('프로필 수정에 실패하였습니다.');
        }
    });
});