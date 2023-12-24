const $lodging_reservation_container = document.querySelector('.lodging-reservation-container');
const $rentalcar_reservation_container = document.querySelector('.rentalcar-reservation-container');

fetch(url + 'reservation/lodging/', {
    headers: {
        'Authorization': `Bearer ${access_token}`,
    },
}).then((response) => response.json())
.then((datas) => {
    datas.forEach(data => {
        createLodgingCard(data);
    });
})

fetch(url + 'reservation/rental_car/', {
    headers: {
        'Authorization': `Bearer ${access_token}`,
    },
}).then((response) => response.json())
.then((datas) => {
    datas.forEach(data => {
        console.log(data);
        createRentalcarCard(data);
    });
})

function createLodgingCard(data) {
    const room_id = data['room'];
    
    fetch(url + 'lodging/roomtype/' + room_id + '/', {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    }).then((response) => response.json())
    .then((room_data) => {
        $lodging_reservation_container.innerHTML += `
        <div class="col-md-12">
            <div class="d-flex d-row justify-content-between mt-5">
                <div class="col-md-5">
                    <div class="swiper-slide">
                        <img src="${url + room_data['room_image']['image'].substr(1)}" alt="image" class="thumb-image img-fluid" style="height: 100%;">
                    </div>
                </div>
                <div class="col-md-6">
                    <h3 class="fw-bold">${room_data['lodging_name']}</h3>
                    <p>체크인 : ${data['start_at'].split('T')[0]} 15:00</p>
                    <p>체크아웃 : ${data['end_at'].split('T')[0]} 11:00</p>
                    <p>숙소 주소 : ${room_data['address']}</p>
                    <div class="d-flex flex-row">
                        <iconify-icon icon="fluent:person-16-regular"
                        class="property-icon"></iconify-icon>
                        <p>${room_data['name']}</p>
                    </div>
                    <div class="d-flex flex-row">
                        <iconify-icon icon="fluent:person-16-regular"
                        class="property-icon"></iconify-icon>
                        <p>기준 ${room_data['capacity'] - 1}인/ 최대 ${room_data['capacity']}인</p>
                    </div>
                    <div class="d-flex flex-row justify-content-between">
                        <p class="d-flex fw-bold fs-3">300,000원</p>
                        <button class="btn btn-primary btn-lg btn-block" type="submit">예약변경</button>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        `
    })
}

function createRentalcarCard(data){
    const car_id = data['rental_car'];
    fetch(url + 'traffic/rentalcar/' + car_id + '/', {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    }).then((response) => response.json())
    .then((car_data) => {
        console.log(car_data);
        $rentalcar_reservation_container.innerHTML += `
        <div class="col-md-12">
            <div class="d-flex d-row justify-content-between mt-5">
                <div class="col-md-5">
                    <div class="swiper-slide">
                        <img src="${url + car_data['car_image']['image'].substr(1)}" alt="image" class="thumb-image img-fluid" style="height: 100%;">
                    </div>
                </div>
                <div class="col-md-6">
                    <h3 class="fw-bold">${car_data['model']}</h3>
                    <p>대여일 : ${data['start_at'].replace('T', ' ')}</p>
                    <p>반납일 : ${data['end_at'].replace('T', ' ')}</p>
                    <p>대여 주소 : ${car_data['area']}</p>
                    <div class="d-flex flex-row justify-content-between">
                        <p class="d-flex fw-bold fs-3">${car_data['price']}원</p>
                        <button class="btn btn-primary btn-lg btn-block" type="submit">예약변경</button>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        `
    })
}