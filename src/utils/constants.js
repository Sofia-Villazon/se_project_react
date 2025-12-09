import avatar from "../assets/avatar.jpg";
import cloudyD from "../assets/day/cloudy.svg";
import sunnyD from "../assets/day/sunny.svg";
import rainD from "../assets/day/rain.svg";
import snowD from "../assets/day/snow.svg";
import fogD from "../assets/day/fog.svg";
import stormD from "../assets/day/storm.svg";
import cloudyN from "../assets/night/cloudy.svg";
import sunnyN from "../assets/night/sunny.svg";
import rainN from "../assets/night/rain.svg";
import snowN from "../assets/night/snow.svg";
import fogN from "../assets/night/fog.svg";
import stormN from "../assets/night/storm.svg";

const user = {
  name: "Sofia Villazon",
  avatar,
};

const defaultValues = { name: "", imageUrl: "", weather: "" };
const defaultInputCheck = {
  hot: false,
  warm: false,
  cold: false,
};
const coordinates = { latitude: 45.551011, longitude: -73.445352 };

const apiKey = "469e7a9ae948d74c69476a9bb8594742";

const weatherCard = {
  day: { cloudyD, rainD, snowD, sunnyD, fogD, stormD },
  night: { cloudyN, rainN, snowN, sunnyN, fogN, stormN },
};

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export {
  weatherCard,
  apiKey,
  coordinates,
  user,
  settings,
  handleServerResponse,
  defaultValues,
  defaultInputCheck,
};
