let button = document.querySelector('.button');

button.onclick = function () {
 let red = Math.floor(Math.random() * 256);
 let green = Math.floor(Math.random() * 256);

 this.style.backgroundColor = "rgb(" + red + "," + green + ",)";
};
$('body').scrollspy({ target: '#navbar-example' })
