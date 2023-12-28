const accessToken = localStorage.getItem('access');
const urlParams = new URLSearchParams(window.location.search);
const $room_type_id = urlParams.get('room_id');
const $check_in = urlParams.getAll('check_in');
const $check_out = urlParams.getAll('check_out');

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
        createCard();
    })
})
}

function createCard(){
    fetch(url + `lodging/roomtype/${$room_type_id}/`, {
        method: 'GET',
        }).then(res => {
            res.json().then(res => {
                $lodging_name = res['lodging_name'];
                $lodging_id = res['loding'];
                $lodging_adress = res['address'];
                $room_price = res['price'];
                $room_id = res['id'];
                $room_name = res['name'];
                $lodging_reservation_btn = document.querySelector('.lodging_reservation_btn');

                document.querySelector('.lodging_name').textContent = res['lodging_name'];
                document.querySelector('.lodging_adress').textContent = res['address'];
                document.querySelector('.lodging_room_type').textContent = res['name'];
                document.querySelector('.lodging_room_price').textContent = res['price_form'];
                document.querySelector('.lodging_checkin_time').textContent = $check_in;
                document.querySelector('.lodging_checkout_time').textContent = $check_out;

                $lodging_reservation_btn.addEventListener('click', (event) => {
                    event.preventDefault();
                    const $user = localStorage.getItem('id');
                    const accessToken = localStorage.getItem('access');
                    fetch(url + 'reservation/lodging/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify({
                            'start_at' : $check_in + ':15:00:00',
                            'end_at' : $check_out + ':11:00:00',
                            'room' : $room_id,
                            'user' : $user,
                            'reservation_type' : 'RO',
                        }),
                    }).then((res) => {
                        if (res.status === 201) {
                            alert('예약이 완료되었습니다.');
                            window.location.href = 'index.html';
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