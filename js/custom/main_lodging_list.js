const accessToken = localStorage.getItem('access');

if (accessToken === null) {
    createCard([]);
}
else{
    fetch(url + `account/${user_id}/`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    }).then(res => {
        res.json().then(res => {
            console.log(res); 
            createCard(res['lodging_pick']);
        })
    })
}

function createCard(pick_list){
    fetch(url + 'lodging/', {
        headers: {
            'Content-Type': 'application/multipart',
        }
    }).then(res => res.json())
    .then(res => {
        console.log(res);
        res.forEach(element => {
            console.log(element);
            const $lodging_id = element['id'];
            const $product_items = document.querySelector('.product_items');
            const $product_image = element['lodging_image'];
            document.querySelector('.profile-img').src = res['image'];
            console.log($product_image);
            card_html = ''
            card_html += `
            <div class="col-md-4 mb-5 product-item">
                <div class="product-card position-relative overflow-hidden">
                    <div class="image-holder lodging_image">
                        <a href="room-details.html"> <img src="${element['image']}" alt="image"
                                class="img-fluid overflow-hidden"> </a>
                    </div>
                    <div class="product-detail">
                        <div class="lodging_id" value="${element['id']}" hidden></div>

                        <div class="d-flex flex-row justify-content-between mt-3 mb-3">
                            <h3 class="mt-3">
                                <a class="hotel_name" href="#">${element['name']}</a>
                            </h3>
                            <div class="like_svg">
            `
            if (pick_list.includes(element['id'])){
                card_html += `
                                <a class="btn pick-btn-${element['id']}"><i class="fa-solid fa-heart fs-2"></i></a>
                `
            } else {
                card_html += `
                                <a class="btn pick-btn-${element['id']}"><i class="fa-regular fa-heart fs-2"></i></a>
                `
            }
            card_html += `
                            </div>
                        </div>

                        <div class="">
                            <table>
                                <tbody>
                                    <tr>
                                        <td class="pe-2"><strong>가격:</strong></td>
                                        <td class="price"><strong>500,000₩</strong> /1박</td>
                                    </tr>
                                    <tr>
                                        <td class="pe-2"><i class="fa-solid fa-star"
                                                style="color: #eef202;"></i>별점</td>
                                        <td>(1111)</td>
                                    </tr>
                                </tbody>
                            </table>
                            <a href="#" class="btn btn-small btn-black btn-pill mt-3">More Details</a>
                        </div>
                    </div>
                </div>
            </div>
            `
            $product_items.insertAdjacentHTML('beforeend', card_html);
            
            if (pick_list.includes(element['id'])){
                const $pick_btn = document.querySelector(`.pick-btn-${element['id']}`);
                $pick_btn.addEventListener('click', (event) => {
                    console.log($pick_btn);
                    fetch(url + `pick/lodging/${$lodging_id}/`, {
                        method: 'DELETE',   
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }).then((res) => {
                        console.log(res.json())
                        $pick_btn.innerHTML = '<i class="fa-regular fa-heart fs-2"></i></button>'
                        pick_list.splice(pick_list.indexOf(element['id']), 1);
                        window.location.reload();
                    });
                })
            }else{
                const $pick_btn = document.querySelector(`.pick-btn-${element['id']}`);
                $pick_btn.addEventListener('click', (event) => {
                    fetch(url + 'pick/lodging/', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            pick_type : 'LG',
                            user : user_id,
                            lodging : $lodging_id,
                        }),
                    }).then((res) => {
                        if (res.status === 201) {
                            $pick_btn.innerHTML = '<i class="fa-solid fa-heart fs-2"></i></button>'
                            window.location.reload();
                        }else{
                            alert('찜을 실패하였습니다.');
                        }
                    });
                })
                pick_list.push(element['id']);
            }
        });
    })
}


