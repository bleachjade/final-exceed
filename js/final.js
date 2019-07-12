const url =  "https://exceed.superposition.pknn.dev/data/eight"

setInterval(
  get()
  ,3000
)



$('#light-switch').ready(function(){
  $('input[type="checkbox"]').click(function(){
      if($(this).prop("checked") == true){
        put('LED','on')
      }
      else if($(this).prop("checked") == false){
        put('LED','off')
      }
  });
});

$('#door').ready(function(){
  $('input[type="checkbox"]').click(function(){
      if($(this).prop("checked") == true){
        put('door','open')
      }
      else if($(this).prop("checked") == false){
        put('door','close')
      }
  });
});

$('#buzzer').ready(function(){
  $('input[type="checkbox"]').click(function(){
      if($(this).prop("checked") == true){
        put('buzzer','on')
      }
      else if($(this).prop("checked") == false){
        put('buzzer','off')
      }
  });
});


function checkStatus(myJson) {
  for (value in myJson) {
    if (myJson[value] == "on") {
      $(`#${value}`).attr("checked");
    }else {
      $(`#${value}`).removeAttr('checked')
    }
  }
}



function  get() {
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    checkStatus(myJson);
  });
}

// function post(value,status) {
//   let data =  {"data" : 
//         {
          
//         }}
//   postData(`${url}`,data)
//   .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
//   .catch(error => console.error(error));

//   function postData(url = '', data = {}) {
//     // Default options are marked with *
//       return fetch(url, {
//           method: 'POST', // *GET, POST, PUT, DELETE, et
//           body: JSON.stringify(data), // body data type must match "Content-Type" header
//   })
//       .then(response => response.json()); // parses JSON response into native JavaScript objects 
//   }
//   }



function put(name,status) {
  fetch((url+ `/${name}`), {
    method: 'PUT', // *GET, POST, PUT, DELETE, et
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "value" : `${status}`
    }), // body data type must match "Content-Type" header
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error))
}

let button = document.querySelector('.button');

button.onclick = function () {
 let red = Math.floor(Math.random() * 256);
 let green = Math.floor(Math.random() * 256);

 this.style.backgroundColor = "rgb(" + red + "," + green + ",)";
};
$('body').scrollspy({ target: '#navbar-example' })




<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>