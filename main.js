// document.getElementById("").innerHTML =
// const axios = require("axios");

let current_time = new Date();
let dd = String(current_time.getDate());
let mm = String(current_time.getMonth() + 1);
let yy = String(current_time.getFullYear());
let hh = String(current_time.getHours()).padStart(2, "0");
let min = String(current_time.getMinutes()).padStart(2, "0");
let loc = "Sydney";

console.log(`Date: ${mm}/${dd}/${yy}`);
console.log(`The time is ${hh}:${min}`);

async function DisplayWeatherData() {
  let weather_data = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${WEATHER_API_KEY}`
  );
  let weather_forecast = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=${WEATHER_API_KEY}`
  );
  // console.log(weather_data);
  // let sunrise = 0;
  // let sunset = 0;
  // sunrise = weather_data.data.sys.sunrise;
  // sunset = weather_data.data.sys.sunset;
  // console.log(new Date(sunrise));
  // console.log(new Date(sunset));
  console.log(
    `Currently it is ${
      weather_data.data.weather[0].description
    }. The current tempreture in ${weather_data.data.name} is ${(
      weather_data.data.main.temp - 273
    ).toFixed(2)}C`
  );
  console.log(`The five day forcast per day is as follow:`);
  let fiveday_forcast_temp = [];
  let fiveday_forcast_condition = [];
  for (let i = 0; i < 40; i += 8) {
    fiveday_forcast_temp.push(
      (weather_forecast.data.list[i].main.temp - 273).toFixed(2)
    );
    fiveday_forcast_condition.push(
      weather_forecast.data.list[i].weather[0].description
    );
  }

  console.log(fiveday_forcast_condition);
  console.log(fiveday_forcast_temp);
}

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
