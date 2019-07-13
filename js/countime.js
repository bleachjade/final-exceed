let link = 'https://exceed.superposition.pknn.dev/data/eight'



var startDate;
var startPir;


function calEnt(url, path, start) {
    fetch(url + `/${path}`)
        .then(function (response) {
            return response.text();
        })
        .then(function (myJson) {
            console.log(myJson)
            if (myJson == "In" && start == null) {
                startDate = new Date().getTime()
                console.log(startDate)
                putvalue("startEnt", startDate)
            }
            else if (myJson == "Out") {
                putvalue("startEnt", "0")
                $(`#ent-time`).replaceWith()
            }
            else {
                endDate = new Date().getTime()
                caldateEnt(url, 'startEnt', endDate)
            }
        });
}

function detection(url) {
    fetch(url + `/statEnt`)
        .then(function (response) {
            return response.text();
        })
        .then(function (Ent) {
            if (Ent == "In") {
                calPir(url, "statDetect", startPir)
            }
        })
}



function calPir(url, path, start) {
    fetch(url + `/${path}`)
        .then(function (response) {
            return response.text();
        })
        .then(function (myJson) {
            if (myJson == "nonDetect" && start == null) {
                startPir = new Date().getTime()
                console.log(startPir)
                putvalue("startDetect", startPir)
            }
            else if (myJson == "Detect") {
                putvalue("startDetect", "0")
                $(`#detect-time`).replaceWith()
            }
            else { 
                endDate = new Date().getTime()
                caldatePir(url, 'startDetect', endDate)
            }
        });
}





function calculateTime(milsec, id) {
    var sec = milsec / 1000
    var minute = sec / 60
    var hour = 0
    if (minute >= 60) {
        hour = minute / 60
        minute = minute - hour * 60
    }
    if (minute < 10 && hour < 10) {
        document.getElementById(id).innerHTML = `<div id="${id}" class = "mt-2">
        <h1>0${hour} : 0${Math.floor(minute)}</div>`
    }
    return [hour, Math.floor(minute)]
}



function caldateEnt(url, path, endTime) {
    fetch(url + `/${path}`)
        .then(function (response) {
            return response.text();
        })
        .then(function (startTime) {
            day = endTime - startTime
            alltime = calculateTime(day, "ent-time")
            if (alltime[1] >= 1) {
                fetch(url + `/alertStatus`).then(function (response) {
                    return response.text();
                })
                    .then(function (alert) {
                        if (alert == "On") {
                            putvalue("status", "Alert")
                            $('#stable').replaceWith(`<button id="alert" class="button btn ml-5 alert" onclick="reset()">Alert</button>`)
                        }
                    }
                    )
            }
        }
        )
}


function caldatePir(url, path, endTime) {
    fetch(url + `/${path}`)
        .then(function (response) {
            return response.text();
        })
        .then(function (startTime) {
            day = endTime - startTime
            alltime = calculateTime(day, "detect-time")
            if (alltime[1] >= 1) {
                fetch(url + `/alertStatus`).then(function (response) {
                    return response.text();
                })
                    .then(function (alert) {
                        if (alert == "On") {
                            putvalue("status", "Alert")
                            $('#stable').replaceWith(`<button id="alert" class="button btn ml-5 alert" onclick="reset()">Alert</button>`)
                        }
                    }
                    )
            }
        }
        )
}


function putvalue(name, status) {
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

function hitalert(url, path) {
    fetch(url + `/${path}`)
        .then(function (response) {
            return response.text();
        }).then(function (hit) {
            if (hit >= 2) {
                $('#hit').replaceWith(`<h1 id="hit">He hurt him self</h1>`)
                putvalue('status', 'Alert')
                $('#stable').replaceWith(`<button id="alert" class="button btn ml-5 alert"  onclick="reset()">Alert</button>`)
            }
        })
}

async function reset() {
    putvalue("status", "Basic")
    $('#alert').replaceWith(`<button id="stable" class="button btn ml-5">Stable</button>`)
    putvalue("startDetect", "0")
    putvalue("startEnt", "0")
    putvalue("statHit", 0)
    $('#hit').hide()

}







setInterval(() => {
    calEnt(link, "statEnt", startDate)
    detection(link)
    hitalert(link, "statHit")
}, 1000)
