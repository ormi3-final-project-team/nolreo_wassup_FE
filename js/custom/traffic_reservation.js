const accessToken = localStorage.getItem('access');
const urlParams = new URLSearchParams(window.location.search);
const $bus_id = urlParams.get('bus_id');
const $train_id = urlParams.get('train_id');

if (accessToken === null) {
    createCard_bus([]);
}
else{
fetch(url + `account/${user_id}/`, {
    headers: {
        'Authorization': `Bearer ${accessToken}`,
    },
}).then(res => {
    res.json().then(res => {
        if(urlParams.has("bus_id")){
        createCard_bus();
        }
        if(urlParams.has("train_id")){
        createCard_train();
        }
    })
})
}

function createCard_bus(){
    fetch(url + `traffic/bus/${urlParams.get('bus_id')}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    }).then(res => {
        res.json().then(res => {
            $traffic_num = res['num'];
            $traffic_depart_point = res['depart_point'];
            $traffic_dest_point = res['dest_point'];
            $traffic_depart_time = res['depart_time'];
            $traffic_arrival_time = res['arrival_time'];
            $traffic_reservation_btn = document.querySelector('.traffic_reservation_btn');
            console.log(res);

            document.querySelector('.traffic_num').textContent = res['num'];
            document.querySelector('.traffic_depart_point').textContent = res['depart_point'];
            document.querySelector('.traffic_dest_point').textContent = res['dest_point'];
            console.log(res['num']);
            document.querySelector('.traffic_depart_time').textContent = res['depart_time'];
            document.querySelector('.traffic_arrival_time').textContent = res['arrival_time'];
            document.querySelector('.traffic_rest_seat').textContent = res['rest_seat'];
            document.querySelector('.traffic_price').textContent = res['price_form'];
            
            $traffic_reservation_btn.addEventListener('click', (event) => {
                event.preventDefault();
                const $user = localStorage.getItem('id');
                const accessToken = localStorage.getItem('access');
                fetch(url + 'reservation/bus/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        'bus' : $bus_id,
                        'user' : $user,
                        'seat' : 1,
                        'reservation_type' : 'BU',
                    }),
                }).then((res) => {
                    if (res.status === 201) {
                        alert('예약이 완료되었습니다.');
                        window.location.href = 'transport.html';
                    } else {
                        res.json().then((json) => {
                            alert(json);
                        });
                        alert('예약을 실패하였습니다.');
                    }
                });
            })

        })
    })
};

function createCard_train(){
    fetch(url + `traffic/train/${urlParams.get('train_id')}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    }).then(res => {
        res.json().then(res => {
            $traffic_num = res['num'];
            $traffic_depart_point = res['depart_point'];
            $traffic_dest_point = res['dest_point'];
            $traffic_depart_time = res['depart_time'];
            $traffic_arrival_time = res['arrival_time'];
            $traffic_reservation_btn = document.querySelector('.traffic_reservation_btn');
            console.log(res);

            document.querySelector('.traffic_num').textContent = res['num'];
            document.querySelector('.traffic_depart_point').textContent = res['depart_point'];
            document.querySelector('.traffic_dest_point').textContent = res['dest_point'];
            console.log(res['num']);
            document.querySelector('.traffic_depart_time').textContent = res['depart_time'];
            document.querySelector('.traffic_arrival_time').textContent = res['arrival_time'];
            document.querySelector('.traffic_rest_seat').textContent = res['rest_seat'];
            document.querySelector('.traffic_price').textContent = res['price_form'];
            
            $traffic_reservation_btn.addEventListener('click', (event) => {
                event.preventDefault();
                const $user = localStorage.getItem('id');
                const accessToken = localStorage.getItem('access');
                fetch(url + 'reservation/train/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        'train' : $train_id,
                        'user' : $user,
                        'seat' : 1,
                        'reservation_type' : 'TR',
                    }),
                }).then((res) => {
                    if (res.status === 201) {
                        alert('예약이 완료되었습니다.');
                    } else {
                        res.json().then((json) => {
                            alert(json);
                        });
                        alert('예약을 실패하였습니다.');
                    }
                });
            })

        })
    })
};
