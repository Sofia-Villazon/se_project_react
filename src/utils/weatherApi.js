const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const getWeather = ({ cordinates, APIkey }) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${cordinates.latitude}&lon=${cordinates.longitude}&units=imperial&appid=${APIkey}`
  ).then(handleServerResponse);
};

const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  result.type = result.temp >= 86 ? "hot" : result.temp >= 60 ? "warm" : "cold";
  result.condition = data.weather[0].id;
  result.dayNight = isDay(data.sys);
  return result;
};

const isDay = ({ sunrise, sunset }) => {
  const now = Date.now();
  return sunrise * 1000 > now && now < sunset * 1000;
};
export { filterWeatherData, getWeather };
