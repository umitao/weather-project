const apiKey = "83e8b55d60e04f909b496e837fe8b54c";

let latitude;
let longitude;
let imgCode;
let imgLink = `https://www.weatherbit.io/static/img/icons/${imgCode}.png`;

function getLocation() {
  navigator.geolocation.getCurrentPosition(success, error);
}

const success = (position) => {
  const {
    coords: { latitude, longitude },
  } = position;
  console.log(position.coords);
  const URL = `https://api.weatherbit.io/v2.0/current?&lat=${latitude}&lon=${longitude}&key=${apiKey}`;

  //console.log(URL);

  fetch(URL)
    .then((response) => response.json())
    .then((weatherData) => onReady(weatherData));
};

const error = (error) => {
  const { message } = error;
  console.warn(message);
};

getLocation();

const onReady = (weather) => {
  console.log(weather.data[0]);
  //   console.log(typeof weather.data[0]);
  const list = document.createElement("section");
  Object.keys(weather.data[0]).forEach((element) => {
    const li = document.createElement("p");
    li.textContent = `${element}: ${weather.data[0][element]}`;
    list.appendChild(li);
  });
  Object.keys(weather.data[0].weather).forEach((obj) => {
    const li = document.createElement("p");
    li.textContent = `${obj}: ${weather.data[0].weather[obj]}`;
    list.appendChild(li);
  });
  const app = document.querySelector("#app");
  app.appendChild(list);
  const img = document.createElement("img");
  img.src = imgLink;
  console.log(imgLink);
  app.appendChild(img);
};
