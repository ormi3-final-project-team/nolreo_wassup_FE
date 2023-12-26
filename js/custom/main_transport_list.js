const accessToken = localStorage.getItem('access');

if (accessToken === null) {
    createCard([]);
    createCard2([]);
}
else{
    fetch(url + `account/${user_id}/`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    }).then(res => {
        res.json().then(res => {
            console.log(res); 
            createCard(res['bus_pick']);
            createCard2(res['train_pick']);
        })
    })
}


function createCard(pick_list){
    fetch(url + 'traffic/bus', {
        headers: {
            'Content-Type': 'application/multipart',
        }
    }).then(res => res.json())
    .then(res => {
        console.log(res);
        res.forEach(element => {
            console.log(element);
            const $bus_id = element['id'];
            const $product_items = document.querySelector('.product_items');
            $depart_time = element['depart_time']
            $depart_time = $depart_time.split('T')
            $depart_time = $depart_time[0] + ' ' + $depart_time[1].split('.')[0]
            $arrival_time = element['arrival_time']
            $arrival_time = $arrival_time.split('T')
            $arrival_time = $arrival_time[0] + ' ' + $arrival_time[1].split('.')[0]

            card_html = ''
            card_html += `
            <div class="col-md-4 mb-5 product-item">
                <div class="product-card position-relative overflow-hidden">
                    <div class="product-detail">
                        <div class="d-flex flex-row justify-content-between mt-3 mb-3">
                            <h3 class="mt-3">
                                <a class="hotel_name" href="#">${element['depart_point']} > ${element['dest_point']}</a>
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
                        <div>
                            <p>출발 일시 : ${$depart_time} </p>
                            <p>도착 일시 : ${$arrival_time} </p>
                            <p>잔여 좌석 : ${element['rest_seat']}</p>
                        </div>

                        <div class="">
                            <table>
                                <tbody>
                                    <tr>
                                        <td class="pe-2"><strong>가격:</strong></td>
                                        <td class="price"><strong>${element['price']}</strong></td>
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
                    fetch(url + `pick/bus/${$bus_id}/`, {
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
                    fetch(url + 'pick/bus/', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            pick_type : 'BU',
                            user : user_id,
                            bus : $bus_id,
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


function createCard2(pick_list){
    fetch(url + 'traffic/train', {
        headers: {
            'Content-Type': 'application/multipart',
        }
    }).then(res => res.json())
    .then(res => {
        console.log(res);
        res.forEach(element => {
            console.log(element);
            const $train_id = element['id'];
            const $product_items = document.querySelector('.product_items');
            $depart_time = element['depart_time']
            $depart_time = $depart_time.split('T')
            $depart_time = $depart_time[0] + ' ' + $depart_time[1].split('.')[0]
            $arrival_time = element['arrival_time']
            $arrival_time = $arrival_time.split('T')
            $arrival_time = $arrival_time[0] + ' ' + $arrival_time[1].split('.')[0]

            card_html = ''
            card_html += `
            <div class="col-md-4 mb-5 product-item">
                <div class="product-card position-relative overflow-hidden">
                    <div class="product-detail">
                        <div class="d-flex flex-row justify-content-between mt-3 mb-3">
                            <h3 class="mt-3">
                                <a class="hotel_name" href="#">${element['depart_point']} > ${element['dest_point']}</a>
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
                        <div>
                            <p>출발 일시 : ${$depart_time} </p>
                            <p>도착 일시 : ${$arrival_time} </p>
                            <p>잔여 좌석 : ${element['rest_seat']}</p>
                        </div>

                        <div class="">
                            <table>
                                <tbody>
                                    <tr>
                                        <td class="pe-2"><strong>가격:</strong></td>
                                        <td class="price"><strong>${element['price']}</strong></td>
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
                    fetch(url + `pick/train/${$train_id}/`, {
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
                    fetch(url + 'pick/train/', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            pick_type : 'TR',
                            user : user_id,
                            train : $train_id,
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