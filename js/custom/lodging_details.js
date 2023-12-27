// const $reservation_container = document.querySelector('.reservation-container');
const $img_container = document.querySelector('.img-container');
const $thum_container = document.querySelector('.thum-container');
const $hotel_location = document.querySelector('.hotel_location');
const $hotel_name = document.querySelector('.hotel_name');
const $review_count = document.querySelector('.review_count');
const $review_score = document.querySelector('.review_score');
const $room_container = document.querySelector('.room-container');
const $notice = document.querySelector('.notice');
const $review_container = document.querySelector('.review_container');
const $intro = document.querySelector('.intro');
const $amenity_container = document.querySelector('.amenity_container');
const urlParams = new URLSearchParams(window.location.search);
const $check_in = document.querySelector('.check-in');
const $check_out = document.querySelector('.check-out');
const $reservation_btn = document.querySelector('.reservation-btn');
const $room_type = document.querySelector('.choose-room');


fetch(url + `lodging/roomtype/?lodging_id=${urlParams.get('id')}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
    },
}).then(response => response.json())
.then(room_datas => {
    let options = "";
    room_datas.forEach(data => {
        options += `<option value="${data['id']}">${data['name']}</option>`;
    });
    $room_type.innerHTML = options;
    $reservation_btn.addEventListener('click', function(event) {
        event.preventDefault();
        const selectedRoomId = document.getElementById('room-type').value;
        const checkinDate = $check_in.value;
        const checkoutDate = $check_out.value;
        console.log(selectedRoomId, checkinDate, checkoutDate);
        window.location.href = `lodging_reservation.html?room_id=${selectedRoomId}&check_in=${checkinDate}&check_out=${checkoutDate}`;
    });
})
fetch(url + `lodging/${urlParams.get('id')}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
    },
}).then(response => response.json())
.then(datas => {
    datas['lodging_images'].forEach(image => { 
        if (image['is_main'] === true) {
            const img_tag = `
            <div class="swiper-slide">
                <img src="${url + image['image']}" alt="product-large" class="thumb-image img-fluid">
            </div>
            `
            $img_container.insertAdjacentHTML('beforeend', img_tag);
        }else{
            const img_tag = `
            <div class="swiper-slide">
                <img src="${url + image['image']}" alt="product-large" class="img-fluid">
            </div>
            `
            $img_container.insertAdjacentHTML('beforeend', img_tag);
        }
        const thum_tag = `
        <div class="swiper-slide">
            <img src="${url + image['image']}" alt="image" class="thumb-image img-fluid">
        </div>
        `
        $thum_container.insertAdjacentHTML('beforeend', thum_tag);
    })
    const address = datas['address'];
    $hotel_location.textContent = `호텔 - ${address}`;
    const name = datas['name'];
    $hotel_name.textContent = `${name}`;
    const review_score = datas['star_avg'];
    $review_score.textContent = `${review_score}`;
    const review_count = datas['review_cnt'];
    $review_count.textContent = `(${review_count})`;
    const notice = datas['notice'];
    $notice.textContent = `${notice}`;
    const intro = datas['intro'];
    $intro.textContent = `${intro}`;
    const amenities = datas['amenities'];
    amenities.forEach(amenity => {
        const amenity_tag = `
        <li>${name}</li>
        `
        $amenity_container.insertAdjacentHTML('beforeend', amenity_tag);
    })

    fetch(url + `lodging/roomtype/?lodging_id=${urlParams.get('id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
    }).then(response => response.json())
    .then(room_datas => {
        room_datas.forEach(data => {
            $room_container.insertAdjacentHTML('beforeend', `
            <div class="d-flex d-row justify-content-between">
                <div class="col-md-5">
                    <div class="swiper-slide room_thumb">
                        <img src="${url + data['room_image']['image']}" alt="image" class="thumb-image img-fluid">
                    </div>
                </div>
                <div class="col-md-6">
                    <p class="fw-bold">숙박</p>
                    <p>체크인 15:00 ~ 체크아웃 11:00</p>
                    <p>${data['name']}</p>
                    <p>기준 ${data['capacity'] - 1}인/ 최대 ${data['capacity']}인</p>
                    <p>싱글 침대 2개</p>
                    <p class="d-flex justify-content-end fw-bold fs-2">${data['price']}원</p>
                    <button class="btn btn-primary btn-lg btn-block" type="submit">예약하기</button>
                </div>
            </div>
            `);
        })
    })
    
    fetch(url + `lodging/review/?lodging_id=${urlParams.get('id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
    }).then(response => response.json())
    .then(review_datas => {
        console.log('review_datas', review_datas);
        review_datas.forEach(data => {
            let container_id = data['id'];
            let reviewImageHTML = '';
            if (data['review_images'][0]) {
                reviewImageHTML = `<img src="${url + data['review_images']}">`;
            }
            let profile_image = '';
            if (data['image']) {
                profile_image = `<img src="${url + data['image']}" alt="default" heigth="50" width="50"
                class="commentor-image img-fluid rounded-circle">`;
            }else{
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
                                <buttonu class="reply-btn${container_id}">
                                    <i class="icon icon-mail-reply"></i>답글
                                </buttonu>
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
            $reply_btn.addEventListener('click', function(e){
                e.preventDefault(); 
                console.log('reply_btn');
                const $formContainer = document.querySelector(`.reply-form-container${container_id}`);
                $formContainer.style.display = $formContainer.style.display === 'none' ? 'block' : 'none';
            });

            const $submit_reply = document.querySelector(`.submit-reply${container_id}`);
            $submit_reply.addEventListener('click', function(e){
                e.preventDefault();
                const replyText = document.querySelector(`.reply-text${container_id}`);
                console.log('replyText.value', replyText.value);
                console.log('$comment_container', $comment_container);
                
                fetch(url + 'lodging/review/1/comment/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    },
                    body: JSON.stringify({
                        'content': replyText.value,
                        'lodging_review': container_id,
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
                .catch(error => {
                    console.error('Error:', error);
                });
            });

            document.querySelector('.review_btn').addEventListener('click', function(e){
                e.preventDefault();
                fetch(url + `account/${localStorage.getItem('id')}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    },
                })
                .then(response => response.json())
                .then(data => {
                    let rating = document.querySelector("input[name='rating']:checked").value;
                    let urlParams = new URLSearchParams(window.location.search);
                    let lodgingId = urlParams.get('id');
                    let loggedInUserId = localStorage.getItem('id');
                    let loggedInUserName = data['nickname'];
                    fetch(url + `lodging/review/?lodging_id=${urlParams.get('id')}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${access_token}`
                        },
                        body: JSON.stringify({
                            'title': 123123,
                            'content': document.querySelector('.review_content').value,
                            'star_score': rating,
                            'lodging': lodgingId,
                            'user': loggedInUserId,
                            'name': loggedInUserName,
                        })
                    })
                    .then(data => {
                        window.location.reload();
                    })
                })
            });
            
        })
    })
})
