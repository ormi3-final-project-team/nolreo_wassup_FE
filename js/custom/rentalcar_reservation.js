const accessToken = localStorage.getItem('access');
const urlParams = new URLSearchParams(window.location.search);
const $rentalcar_id = urlParams.get('rentalcar_id');

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
    fetch(url + `traffic/rentalcar/${$rentalcar_id}/`, {
        method: 'GET',
    }).then(res => {
        res.json().then(res => {
            $rentalcar_reservation_btn = document.querySelector('.rentalcar_reservation_btn');

            document.querySelector('.rentalcar_name').textContent = res['model'];
            document.querySelector('.rentalcar_price').textContent = res['price_form'];
            document.querySelector('.rentalcar_address').textContent = res['area'];
            document.querySelector('.rentalcar_num').textContent = res['num'];

            $rentalcar_reservation_btn.addEventListener('click', (event) => {
                event.preventDefault();
                const $user = localStorage.getItem('id');
                const accessToken = localStorage.getItem('access');
                const $check_in = document.querySelector('.rentalcar_checkin_time').value;
                const $check_out = document.querySelector('.rentalcar_checkout_time').value;

                fetch(url + 'reservation/rental_car/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        'start_at': $check_in,
                        'end_at': $check_out,
                        'rental_car': $rentalcar_id,
                        'reservation_type': 'RC',
                        'user': $user,
                    }),
                }).then((res) => {
                    if (res.status === 201) {
                        alert('예약이 완료되었습니다.');
                        window.location.href = 'rental.html';
                    }
                    else {
                        alert('예약에 실패하였습니다.');
                    }
                })
            })
        })
    })
};