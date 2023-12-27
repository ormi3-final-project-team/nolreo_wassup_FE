const accessToken = localStorage.getItem('access');
const $rentcar_search_btn = document.querySelector('.rentcar_search_btn');

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
            $rentcar_search_btn.addEventListener('click', (event) => {
                event.preventDefault();
                createCard(res['rental_car_pick']);
            })
            createCard(res['rental_car_pick']);
        })
    })
}

function createCard(pick_list){
    const $rentcar_checkin_date = document.querySelector('.rentcar_checkin_date').value;
    const $rentcar_checkout_date = document.querySelector('.rentcar_checkout_date').value;
    fetch(url + `traffic/rentalcar/?start_at=${$rentcar_checkin_date}&end_at=${$rentcar_checkout_date}`, {
        headers: {
            'Content-Type': 'application/multipart',
        }
    }).then(res => res.json())
    .then(res => {
        const $product_items = document.querySelector('.product_items');
        $product_items.innerHTML = '';
        res.forEach(element => {
            const $rentalcar_id = element['id'];
            const $product_image = element['car_image'];
            card_html = ''
            card_html += `
            <div class="col-md-4 mb-5 product-item">
                <div class="product-card position-relative overflow-hidden">
                    <div class="image-holder lodging_image">
                        <a href="rentalcar-details.html?id=${$rentalcar_id}"> <img src="${url+$product_image.image}" alt="image"
                                class="img-fluid overflow-hidden lodging_images"> </a>
                    </div>
                    <div class="product-detail">
                        <div class="rentalcar_id" value="${element['id']}" hidden></div>

                        <div class="d-flex flex-row justify-content-between mt-3 mb-3">
                            <h3 class="mt-3">
                                <a class="hotel_name" href="#">${element['model']}</a>
                            </h3>
                            <div class="like_svg">
            `
            
            if (pick_list.includes(element['id'])){
                card_html += `
                                <a class="btn pick-btn-${element['id']}"><i class="fa-solid fa-heart fs-2 "></i></a>
                `
            } else {
                card_html += `
                                <a class="btn pick-btn-${element['id']}"><i class="fa-regular fa-heart fs-2 "></i></a>
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
                                        <td class="price"><strong>${element['price_form']}</strong> / 24시간</td>
                                    </tr>
                                    <tr>
                                        <td class="pe-2"><i class="fa-solid fa-star"
                                                style="color: #eef202;"></i>별점</td>
                                        <td>(${element['star_avg']})</td>
                                    </tr>
                                </tbody>
                            </table>
                            <a href="rentalcar-details.html?id=${$rentalcar_id}" class="btn btn-small btn-black btn-pill mt-3">More Details</a>
                        </div>
                    </div>
                </div>
            </div>
            `
            
            $product_items.insertAdjacentHTML('beforeend', card_html);
            
            if (pick_list.includes(element['id'])){
                const $pick_btn = document.querySelector(`.pick-btn-${element['id']}`);
                $pick_btn.addEventListener('click', (event) => {
                    fetch(url + `pick/rental_car/${$rentalcar_id}/`, {
                        method: 'DELETE',   
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }).then((res) => {
                        $pick_btn.innerHTML = '<i class="fa-regular fa-heart fs-2"></i></button>'
                        pick_list.splice(pick_list.indexOf(element['id']), 1);
                        window.location.reload();
                    });
                })
            }else{
                const $pick_btn = document.querySelector(`.pick-btn-${element['id']}`);
                $pick_btn.addEventListener('click', (event) => {
                    fetch(url + 'pick/rental_car/', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            pick_type : 'RC',
                            user : user_id,
                            rental_car : $rentalcar_id,
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


