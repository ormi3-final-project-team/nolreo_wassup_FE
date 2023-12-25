const $reservation_btn = document.querySelector('.lodging-details-reservation-btn');

$reservation_btn.addEventListener('click', (event) => {
    event.preventDefault();

    const $start_at = document.querySelector('.start_at').value;
    const $end_at = document.querySelector('.end_at').value;
    const $room = document.querySelector('.room-select');
    const select_room = $room.options[$room.selectedIndex].value;
    const $user = localStorage.getItem('id');
    const accessToken = localStorage.getItem('access');

    fetch(url + 'reservation/lodging/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            'start_at' : $start_at + ':15:00:00',
            'end_at' : $end_at + ':11:00:00',
            'room' : select_room,
            'user' : $user,
            'reservation_type' : 'RO',
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
});
