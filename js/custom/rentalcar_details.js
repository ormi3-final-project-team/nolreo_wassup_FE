const $img_container = document.querySelector('.img-container');
const $area = document.querySelector('.area');
const $model = document.querySelector('.model');
const $review_count = document.querySelector('.review_count');
const $review_score = document.querySelector('.review_score');
const $room_container = document.querySelector('.room-container');
// const $notice = document.querySelector('.notice');
const $review_container = document.querySelector('.review_container');
// const $info = document.querySelector('.info');
const urlParams = new URLSearchParams(window.location.search);
const $check_in = document.querySelector('#checkin');
const $check_out = document.querySelector('#checkout');
const $reservation_btn = document.querySelector('.reservation-btn');
const accessToken = localStorage.getItem('access');
const car_id = urlParams.get('id');
const $heart_button = document.querySelector('#heart-button');

fetch(url + `traffic/rentalcar/?rentalcar_id=${urlParams.get('id')}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    },
}).then(response => response.json())
    .then(car_datas => {
        $reservation_btn.addEventListener('click', function (event) {
            event.preventDefault();
            const checkinDate = $check_in.value;
            const checkoutDate = $check_out.value;
            window.location.href = `rentalcar_reservation.html?rentalcar_id=${car_id}&check_in=${checkinDate}&check_out=${checkoutDate}`;
        });
    })
fetch(url + `traffic/rentalcar/${urlParams.get('id')}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    },
}).then(response => response.json())
    .then(datas => {
        let car_image = datas['car_image'];
        const img_tag = `
        <div class="swiper-slide">
            <img src="${url + car_image['image'].substr(1)}" alt="product-large" class="img-fluid">
        </div>
        `
        $img_container.insertAdjacentHTML('beforeend', img_tag);
        const area = datas['area'];
        $area.textContent = `주소 - ${area}`;
        const model = datas['model'];
        $model.textContent = `${model}`;
        const review_score = datas['star_avg'];
        if (review_score != null){
            $review_score.textContent = `${review_score.toFixed(1)}`;
        }
        const review_count = datas['review_cnt'];
        $review_count.textContent = `(${review_count})`;
        // const notice = datas['notice'];
        // $notice.textContent = `${notice}`;
        // const info = datas['info'];
        // $info.textContent = `${info}`;
        fetch(url + `traffic/review/?rental_car_id=${urlParams.get('id')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
        }).then(response => response.json())
        .then(review_datas => {
            review_datas.forEach(data => {
                let container_id = data['id'];
                let reviewImageHTML = '';
                if (data['review_images'][0]) {
                    reviewImageHTML = `<img src="${url + data['review_images'][0].image.substr(1)}">`;
                }
                let profile_image = '';
                if (data['image']) {
                    profile_image = `<img src="${url + data['image'].substr(1)}" alt="default" height="50" width="50"
                    class="commentor-image img-fluid rounded-circle">`;
                } else {
                    profile_image = `
                    <svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 448 512" class="commentor-image img-fluid rounded-circle">
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                    </svg>
                    `
                }
                $review_container.insertAdjacentHTML('beforeend', `
                <div class="comment-list review_container">
                    <article class="comment-item pb-3 row">
                        <div class="col-md-1"> 
                            ${profile_image}
                        </div>
                        <div class="col-md-10">
                            <div class="author-post mb-4">
                                <div class="comment-meta mb-2 text-capitalize d-flex gap-3 text-black">
                                    <div class="author-name fs-5  ">${data['name']}</div>
                                    <span class=" ">${data['created_at'].split('T')[0]}</span>
                                    <button class="reply-btn${container_id}">
                                        <i class="icon icon-mail-reply"></i>답글
                                    </button>
                                </div>
                                ${reviewImageHTML}
                                <p>${data['content']}</p>
                                <div class="comments-container${container_id}">
                                </div>
                                <div class="comments-reply border-animation">
                                    <div class="reply-form-container${container_id}" style="display: none;">
                                        <form class="reply-form">
                                            <textarea class="reply-text${container_id} reply-content" placeholder="댓글을 입력해 주세요."></textarea>
                                            <button type="submit" class="submit-reply${container_id}">답글 작성</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                `
                );
                const $comment_container = document.querySelector(`.comments-container${container_id}`);
                data['comments'].forEach(comment => {
                    $comment_container.insertAdjacentHTML('beforeend', `
                    <div class="comment-item pb-3 row">
                        <div class="col-ml-1 ms-5">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/></svg>
                            ${comment['name']}: ${comment['content']}
                        </div>
                    </div>
                    `);
                });
                const $reply_btn = document.querySelector(`.reply-btn${container_id}`);
                $reply_btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    const $formContainer = document.querySelector(`.reply-form-container${container_id}`);
                    $formContainer.style.display = $formContainer.style.display === 'none' ? 'block' : 'none';
                });
                const $submit_reply = document.querySelector(`.submit-reply${container_id}`);
                $submit_reply.addEventListener('click', function (e) {
                    e.preventDefault();
                    const replyText = document.querySelector(`.reply-text${container_id}`);
                    fetch(url + 'traffic/review/1/reply/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${access_token}`
                        },
                        body: JSON.stringify({
                            'content': replyText.value,
                            'rental_car_review': container_id,
                            'user': user_id,
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        $comment_container.insertAdjacentHTML('beforeend', `
                        <div class="comment-item pb-3 row">
                            <div class="col-ml-1 ms-5">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/></svg>
                                ${localStorage.getItem('nickname')}: ${replyText.value}
                            </div>
                        </div>
                        `)
                    })
                });
            })
            document.querySelector('.review_btn').addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation(); 
                fetch(url + `account/${user_id}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                })
                .then(res => res.json())
                .then(data => {
                    const $star_tag = document.querySelector("input[name='rating']:checked");
                    let rating = '0';
                    if ($star_tag != null){
                        rating = $star_tag.value;
                    }
                    
                    const urlParams = new URLSearchParams(window.location.search);
                    const rental_car_id = urlParams.get('id');
                    const loggedInUserId = localStorage.getItem('id');
                    const loggedInUserName = data['nickname'];
                    fetch(url + `traffic/review/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${access_token}`
                        },
                        body: JSON.stringify({
                            'title': 123123,
                            'content': document.querySelector('.review_content').value,
                            'star_score': rating,
                            'rental_car': rental_car_id,
                            'user': loggedInUserId,
                            'name': loggedInUserName,
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        window.location.reload();
                    })
                });
            })
        fetch(url + `account/${user_id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        }).then(res => {
            res.json().then(res => {
                const urlParams = new URLSearchParams(window.location.search);
                const rental_car_id = urlParams.get('id');
                let pick_list = res['rental_car_pick'];
                if (pick_list.includes(parseInt(rental_car_id))) {
                    const $heart_button = document.querySelector('#heart-button');
                    $heart_button.style.fill = 'red';
                }
                document.getElementById('heart-button').addEventListener('click', function () {
                    manageFavoriteLodging(accessToken, user_id, rental_car_id, pick_list);
                });
            })
        });
        function manageFavoriteLodging(accessToken, user_id, rental_car_id, pick_list) {
            const heartButton = document.getElementById('heart-button');
            if (pick_list.includes(parseInt(rental_car_id))) {
                fetch(url + `pick/rental_car/${rental_car_id}/`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }).then((res) => {
                    if (res.status === 204) {
                        alert('찜 삭제를 성공했습니다.');
                        pick_list.splice(pick_list.indexOf(rental_car_id), 1);
                        heartButton.style.fill = 'currentColor';
                    } else {
                        alert('찜 삭제를 실패하였습니다.');
                    }
                });
            } else {
                fetch(url + 'pick/rental_car/', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pick_type: 'RC',
                        user: user_id,
                        rental_car: rental_car_id,
                    }),
                }).then((res) => {
                    if (res.status === 201) {
                        alert('찜을 성공했습니다.');
                        pick_list.push(parseInt(rental_car_id));
                        heartButton.style.fill = 'red';
                    } else {
                        alert('찜을 실패하였습니다.');
                    }
                });
            }
        }
    })
})
