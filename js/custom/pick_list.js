const $lodging_pick_container = document.querySelector('.lodging-pick-container');
const $rentalcar_pick_container = document.querySelector('.rentalcar-pick-container');
const $bus_pick_container = document.querySelector('.bus-pick-container');
const $train_pick_container = document.querySelector('.train-pick-container');

fetch(url + 'pick/lodging/',{
    headers: {
        'Authorization': `Bearer ${access_token}`
    }
}).then(res => res.json())
.then(datas => {
    datas.forEach(data => {
        createLodgingCard(data);
    });
});

fetch(url + 'pick/rental_car/',{
    headers: {
        'Authorization': `Bearer ${access_token}`
    }
}).then(res => res.json())
.then(datas => {
    datas.forEach(data => {
        createRentalcarCard(data);
    });
});

fetch(url + 'pick/bus/',{
    headers: {
        'Authorization': `Bearer ${access_token}`
    }
}).then(res => res.json())
.then(datas => {
    datas.forEach(data => {
        createBusCard(data);
    });
});

fetch(url + 'pick/train/',{
    headers: {
        'Authorization': `Bearer ${access_token}`
    }
}).then(res => res.json())
.then(datas => {
    datas.forEach(data => {
        console.log('train_data', data);
        createTrainCard(data);
    });
});

function createLodgingCard(data){
    const lodging_id = data['lodging'];
    const pick_id = data['id'];

    fetch(url + 'lodging/' + lodging_id + '/', {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
        }
    }).then(res => res.json())
    .then(res => {
        $lodging_pick_container.innerHTML += `
        <div class="col-md-12">
            <div class="d-flex d-row justify-content-between mt-5">
                <div class="col-md-5">
                    <div class="swiper-slide">
                        <img src="${url + res['lodging_image']['image'].substr(1)}" alt="image" class="thumb-image img-fluid" style="height: 100%;">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="d-flex flex-row justify-content-between">
                        <h3 class="fw-bold">${res['name']}</h3>
                        <div>
                            <a class="pick-${pick_id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <p>숙소 주소 : ${res['address']}</p>
                    <div class="d-flex flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" fill="orange"
                            class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        &nbsp;
                        <p class="mb-4">${res['star_avg']}</p>
                        &nbsp;                                      
                        <p>(${res['review_cnt']})</p>
                    </div>
                    <div class="d-flex flex-row justify-content-end">
                        <button class="btn btn-primary btn-lg btn-block" type="submit"><a href="#">예약 하러가기</a></button>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        `
        const $rentalcar_pick = document.querySelector(`.pick-${pick_id}`);
        $rentalcar_pick.addEventListener('click', () => {
            fetch(url + 'pick/lodging/' + pick_id + '/', {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                }
            }).then(res => {
                if (res.status === 204) {
                    alert('삭제되었습니다.');
                    window.location.href = 'pick_list.html';
                }else{
                    alert('삭제에 실패했습니다.');
                }
            })
        });
    })
};

function createRentalcarCard(data){
    const rentalcar_id = data['rental_car'];
    const pick_id = data['id'];

    fetch(url + 'traffic/rentalcar/' + rentalcar_id + '/', {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
        }
    }).then(res => res.json())
    .then(res => {
        $rentalcar_pick_container.innerHTML += `
        <div class="col-md-12 mt-4">
            <div class="d-flex d-row justify-content-between">
                <div class="col-md-5">
                    <div class="swiper-slide">
                        <img src="${url + res['car_image']['image'].substr(1)}" alt="image" class="thumb-image img-fluid" style="height: 100%;">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="">
                        <div class="d-flex flex-row justify-content-between">
                            <h3 class="fw-bold">${res['model']}</h3>
                            <div>
                            <a class="pick-${pick_id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                </svg>
                            </a>
                            </div>
                        </div>
                    </div>
                    <p>대여 주소 : ${res['area']}</p>
                    <div class="d-flex flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" fill="orange"
                            class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        &nbsp;
                        <p class="mb-4">${res['star_avg']}</p>
                        &nbsp;                                      
                        <p>(${res['review_cnt']})</p>
                    </div>
                    <div class="d-flex flex-row justify-content-between">
                        <p class="d-flex fw-bold fs-2">${res['price']}원</p>
                        <button class="btn btn-primary btn-lg btn-block" type="submit"><a href="#">예약 하러가기</a></button>
                    </div>
                </div>
                
            </div>
        </div>
        <hr>
        `
        const $lodging_pick = document.querySelector(`.pick-${pick_id}`);
        $lodging_pick.addEventListener('click', () => {
            fetch(url + 'pick/rental_car/' + pick_id + '/', {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                }
            }).then(res => {
                if (res.status === 204) {
                    alert('삭제되었습니다.');
                    window.location.href = 'pick_list.html';
                }else{
                    console.log(res.json());
                    alert('삭제에 실패했습니다.');
                }
            })
        });
    })
}

function createBusCard(data){
    const bus_id = data['bus'];
    const pick_id = data['id'];

    fetch(url + 'traffic/bus/' + bus_id + '/', {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
        }
    }).then(res => res.json())
    .then(res => {
        $bus_pick_container.innerHTML += `
        <div class="col-md-12 mt-4">
            <div class="d-flex d-row justify-content-between">
                <div class="col-md-5">
                    <div class="swiper-slide">
                        <img src="images/bus1.jpg" alt="image" class="thumb-image img-fluid">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="d-flex flex-row justify-content-between">
                        <h3 class="fw-bold">버스</h3>
                        <div>
                            <a class="pick-${pick_id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <p>출발 일시 : ${res['depart_time'].replace('T', ' ')}</p>
                    <p>도착 일시 : ${res['arrival_time'].replace('T', ' ')}</p>
                    <p>출발지 : ${res['depart_point']}</p>
                    <p>도착지 : ${res['dest_point']}</p>
                    <p style="color: red;">잔여 좌석 : ${res['rest_seat']}</p>
                    <div class="d-flex flex-row justify-content-between">
                        <p class="d-flex fw-bold fs-2">${res['price']}원</p>
                        <button class="btn btn-primary btn-lg btn-block" type="submit"><a href="#">예약 하러가기</a></button>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        `

        const $bus_pick = document.querySelector(`.pick-${pick_id}`);
        $bus_pick.addEventListener('click', () => {
            fetch(url + 'pick/bus/' + pick_id + '/', {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                }
            }).then(res => {
                if (res.status === 204) {
                    alert('삭제되었습니다.');
                    window.location.href = 'pick_list.html';
                }else{
                    console.log(res.json());
                    alert('삭제에 실패했습니다.');
                }
            })
        });
    })
}

function createTrainCard(data){
    const train_id = data['train'];
    const pick_id = data['id'];

    fetch(url + 'traffic/train/' + train_id + '/', {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
        }
    }).then(res => res.json())
    .then(res => {
        console.log(res);
        $train_pick_container.innerHTML += `
        <div class="col-md-12 mt-4">
            <div class="d-flex d-row justify-content-between">
                <div class="col-md-5">
                    <div class="swiper-slide">
                        <img src="images/train.jpg" alt="image" class="thumb-image img-fluid">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="d-flex flex-row justify-content-between">
                        <h3 class="fw-bold">버스</h3>
                        <div>
                            <a class="pick-${pick_id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <p>출발 일시 : ${res['depart_time'].replace('T', ' ')}</p>
                    <p>도착 일시 : ${res['arrival_time'].replace('T', ' ')}</p>
                    <p>출발지 : ${res['depart_point']}</p>
                    <p>도착지 : ${res['dest_point']}</p>
                    <p style="color: red;">잔여 좌석 : ${res['rest_seat']}</p>
                    <div class="d-flex flex-row justify-content-between">
                        <p class="d-flex fw-bold fs-2">${res['price']}원</p>
                        <button class="btn btn-primary btn-lg btn-block" type="submit"><a href="#">예약 하러가기</a></button>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        `

        const $train_pick = document.querySelector(`.pick-${pick_id}`);
        $train_pick.addEventListener('click', () => {
            fetch(url + 'pick/train/' + pick_id + '/', {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                }
            }).then(res => {
                if (res.status === 204) {
                    alert('삭제되었습니다.');
                    window.location.href = 'pick_list.html';
                }else{
                    console.log(res.json());
                    alert('삭제에 실패했습니다.');
                }
            })
        });
    })
}