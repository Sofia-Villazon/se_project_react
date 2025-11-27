const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const getWeather = ({ coordinates, apiKey }) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${apiKey}`
  ).then(handleServerResponse);
};

const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  result.type =
    result.temp.F >= 86 ? "hot" : result.temp.F >= 60 ? "warm" : "cold";
  result.condition = data.weather[0].id;
  result.dayNight = isDay(data.sys);
  return result;
};

const isDay = ({ sunrise, sunset }) => {
  const now = Date.now();
  return sunrise * 1000 <= now && now < sunset * 1000;
};
export { filterWeatherData, getWeather };
