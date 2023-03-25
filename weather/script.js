
var d = new Date();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let request_mumbai = new XMLHttpRequest();
request_mumbai.open("GET","https://api.weatherapi.com/v1/current.json?key=d91515a77be54a1b84d70638232403&q=mumbai");
request_mumbai.send();
request_mumbai.onload = () => {
  if(request_mumbai.status === 200){
    console.log("success")
    console.log(JSON.parse(request_mumbai.response));
  } else {
    console.log(`error ${request_mumbai.status} ${request_mumbai.statsText}`);
  }

  let info = JSON.parse(request_mumbai.response);
  document.getElementById("cloudy").innerText = info.current.cloud + "%";
  document.getElementById("humidity").innerText = info.current.humidity + "%";
  document.getElementById("wind").innerText = info.current.wind_kph + " Km/h";
  document.getElementById("temperature").innerText = info.current.temp_c + "\u00B0";
  document.getElementById("time").innerText = d.getHours() + ":" +  d.getMinutes();
  document.getElementById("day").innerText = weekday[d.getDay()];
  document.getElementById("date").innerText = d.getDate() +"/" + d.getMonth() + "/" + d.getFullYear();

}
let cities = ["","Jaipur","Mumbai","Chennai"]

for (let i = 1; i < 4; i++) {
  let request = new XMLHttpRequest();
  let city = "https://api.weatherapi.com/v1/current.json?key=d91515a77be54a1b84d70638232403&q=" + cities[i];
  request.open("GET",city);
  request.send();
  request.onload = () => {
    if(request.status === 200){
      console.log("success")
      console.log(JSON.parse(request.response));
    } else {
      console.log(`error ${request.status} ${request.statsText}`);
    }

    let info = JSON.parse(request.response);
    console.log(info.current.temp_c)
    document.getElementById("city" + i+ "-temp").innerText = info.current.temp_c + "\u00B0";
    document.getElementById("city" + i+ "-name").innerText = info.location.name;
    document.getElementById("city" + i+ "-date").innerText = d.getDate() +"/" + d.getMonth() + "/" + d.getFullYear();
  }
}

function reveal() {
  var reveals = document.querySelectorAll("section");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);
