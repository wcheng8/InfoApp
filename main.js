// document.getElementById("").innerHTML =
// const axios = require("axios");

// API KEYS

// Calculate Time

let current_time = new Date();
let dd = String(current_time.getDate());
let mm = String(current_time.getMonth() + 1);
let yy = String(current_time.getFullYear());
let hh = String(current_time.getHours()).padStart(2, "0");
let min = String(current_time.getMinutes()).padStart(2, "0");
let loc = "Sydney";

console.log(`Date: ${mm}/${dd}/${yy}`);
console.log(`The time is ${hh}:${min}`);

document.querySelector("#time").innerText = `${hh}:${min}`;

// Get Weather Data

async function DisplayWeatherData() {
  let weather_data = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${WEATHER_API_KEY}`
  );
  let weather_forecast = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=${WEATHER_API_KEY}`
  );
  let sunrise = new Date(weather_data.data.sys.sunrise * 1000);
  let sunset = new Date(weather_data.data.sys.sunset * 1000);

  console.log(`The five day forcast per day is as follow:`);
  console.log(weather_forecast);
  let fiveday_forcast_temp = [];
  let fiveday_forcast_condition = [];
  let fiveday_forcast_icon = [];
  let fiveday_forcast_minmax = [];
  for (let i = 0; i < 40; i += 8) {
    fiveday_forcast_temp.push(
      (weather_forecast.data.list[i].main.temp - 273).toFixed(1)
    );
    fiveday_forcast_condition.push(
      weather_forecast.data.list[i].weather[0].description
    );
    fiveday_forcast_icon.push(
      weather_forecast.data.list[i].weather[0].icon
    )
    fiveday_forcast_minmax.push(
      [`${(weather_forecast.data.list[i].main.temp_min - 273).toFixed(1)}C | ${(weather_forecast.data.list[i].main.temp_max - 273).toFixed(1)}C`]
    )
  }
  document.querySelector("#sunrise").innerText = sunrise.toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  document.querySelector("#sunset").innerText = sunset.toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  let weathertab = document.querySelector("#weathertab")
  
  document.querySelector("#weather0main").innerText = `${(
    weather_data.data.main.temp - 273
  ).toFixed(1)}C`;
  document.querySelector("#weather0txt").innerText = `${(
    weather_data.data.main.temp_min - 273
  ).toFixed(1)}C|${(weather_data.data.main.temp_max - 273).toFixed(1)}C`;
  let weathericon = `http://openweathermap.org/img/w/${weather_data.data.weather[0].icon}.png`;
  document.querySelector(
    "#weather0img"
  ).style.backgroundImage = `url(${weathericon})`;
  for(let i = 0;i<5;i++){
    let weather = document.createElement("div")
    let weathericon = `http://openweathermap.org/img/w/${fiveday_forcast_icon[i]}.png`;
    let weatherimg = document.createElement("div")
      weatherimg.style.backgroundImage = `url(${weathericon})`
    let weathermain = document.createElement("div")
      weathermain.innerText = fiveday_forcast_temp[i]
    let weathertxt = document.createElement("div")
      weathertxt.innerText = `${fiveday_forcast_minmax[i]}` 
    weather.appendChild(weatherimg)
    weather.appendChild(weathermain)
    weather.appendChild(weathertxt)
    weatherimg.classList.add("weatherimg", "pt-5", "pb-4", "w-100" ,"h-70")
    weathermain.classList.add("d-flex", "justify-content-center")
    weathertxt.classList.add("d-flex","justify-content-center")
    weather.classList.add("weather1", "align-self-center", "offset-1", "col-1")
    weathertab.appendChild(weather)
  }


  console.log(fiveday_forcast_condition);
  console.log(fiveday_forcast_temp);
  console.log(fiveday_forcast_icon)
  console.log(fiveday_forcast_minmax)
}

// Calculate ToDo randomize data

// Generate random array object

let tasksobj = {
  important: [
    { id: "AA" },
    { id: "AB" },
    { id: "AC" },
    { id: "AD" },
    { id: "AE" },
  ],
  medium: [{ id: "BA" }, { id: "BB" }, { id: "BC" }, { id: "BD" }],
  low: [
    { id: "CA" },
    { id: "CB" },
    { id: "CC" },
    { id: "CD" },
    { id: "CE" },
    { id: "CF" },
  ],
};

//Extract to arrays
let tsk1 = tasksobj.important.map((e) => {
  return e.id;
});

let tsk2 = tasksobj.medium.map((e) => {
  return e.id;
});

let tsk3 = tasksobj.low.map((e) => {
  return e.id;
});

// Shuffle Array
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

tsk1 = shuffle(tsk1);
tsk2 = shuffle(tsk2);
tsk3 = shuffle(tsk3);

console.log({ tsk1, tsk2, tsk3 });
console.log(tsk1.length + tsk2.length + tsk3.length);

const important = document.querySelector("#Important");
const medium = document.querySelector("#Medium");
const low = document.querySelector("#Low");

tsk1.forEach((e, i) => {
  let element = document.createElement("div");
  element.classList.add("btn", "btn-primary", "col-2", "mx-auto");
  element.id = `togglei-btn-${i}`;
  let newContent = document.createTextNode(e);
  element.appendChild(newContent);
  important.appendChild(element);
});

tsk2.forEach((e, i) => {
  let element = document.createElement("div");
  element.classList.add("btn", "btn-primary", "col-2", "mx-auto");
  element.id = `togglem-btn-${i}`;
  let newContent = document.createTextNode(e);
  element.appendChild(newContent);
  medium.appendChild(element);
});
tsk3.forEach((e, i) => {
  let element = document.createElement("div");
  element.classList.add("btn", "btn-primary", "col-2", "mx-auto");
  element.id = `togglel-btn-${i}`;
  let newContent = document.createTextNode(e);
  element.appendChild(newContent);
  low.appendChild(element);
});

const variablearri = [];
const variablearrm = [];
const variablearrl = [];

for (let i = 0; i < 5; i++) {
  variablearri.push(document.querySelector(`#togglei-btn-${i}`));
}

for (let i = 0; i < 4; i++) {
  variablearrm.push(document.querySelector(`#togglem-btn-${i}`));
}

for (let i = 0; i < 6; i++) {
  variablearrl.push(document.querySelector(`#togglel-btn-${i}`));
}

const variablearr = [...variablearri, ...variablearrl, ...variablearrm];
variablearr.forEach((e) => {
  e.addEventListener("click", () => {
    e.classList.toggle("btn-success");
  });
});

// Get Stock Data

async function DisplayUSStockData() {
  let stocks_interest = ["TSLA", "AAPL"];
  const stock_promise = [];
  stocks_interest.forEach(async (stock) => {
    let temp = axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${stock}&token=${STOCK_API_KEY}`
    );
    stock_promise.push(temp);
  });

  const stocks_data = await Promise.all(stock_promise);
  stocks_data.forEach((stock) => {
    console.log(stock.data);
  });
}
DisplayWeatherData();
DisplayUSStockData();

// Get Inspiring quote

async function DisplayQuote() {
  const quote = await axios.get("http://quotes.rest/qod.json?category=inspire");
  console.log(quote);
  document.querySelector("#quote").innerText =
    quote.data.contents.quotes[0].quote;
}

DisplayQuote();

// Get Jokes

async function DisplayJoke() {
  const quote = await axios.get("https://api.jokes.one/jod/categories");
  console.log(quote);
  // document.querySelector("#quote").innerText =
  //   quote.data.contents.quotes[0].quote;
}

DisplayJoke();
