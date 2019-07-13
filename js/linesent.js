var url = 'https://exceed.superposition.pknn.dev/data/eight'

async function lineNoti(url, path) {
    const res = await fetch(url + `/${path}`);
    const alert = await fetch(url + `/alertStatus`);
    const alert_status = await alert.text();
    const data = await res.text();

    if (data == 'Alert') {
        if (alert_status == 'On') {
            postline('http://localhost:8090/webhook');
            put('alertStatus', "Off");
        }
    }
    else {
        put('alertStatus', "On");
    }
}



function put(name, status) {
    fetch((url + `/${name}`), {
        method: 'PUT', // *GET, POST, PUT, DELETE, et
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "value": `${status}`
        }), // body data type must match "Content-Type" header
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error))
}



function postline(url) {
    let lineformat = {
        "events": [
            {
                type: 'message',
                replyToken: '28bed1c491384306a94432ba3c003718',
                source: { userId: 'U2c1dab49ed10e1ef9dd2ae7ab3e2096e', type: 'user' },
                timestamp: 1562974031480,
                message: { type: 'text', id: '10203097688327', text: 'Hello' }
            }
        ],
        "message": "เพื่อนของคุณมีอาการน่าเป็นห่วงกรุณารีบโทรหาในทันที ไปที่เบอร์ 081-617-1761"
    }

    postData(url, lineformat)
        .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
        .catch(error => console.error(error));

    function postData(url = '', data = {}) {
        // Default options are marked with *
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
            .then(response => response.json()); // parses JSON response into native JavaScript objects 
    }

}


setInterval(async () => {
    await lineNoti(url, 'status');
}, 7000)

