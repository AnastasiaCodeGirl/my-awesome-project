function formatDate(timeStamp) {
	let date = new Date(timeStamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];
	return `${day} ${hours}:${minutes}`;
}
function displayTemperature(response) {
	console.log(response.data);
	let temperatureElement = document.querySelector("#temperature");
	let cityElement = document.querySelector("#city");
	let descriptionElement = document.querySelector("#description");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let dateElement = document.querySelector("#date");
	let iconElement = document.querySelector("#icon");
	celsiusTemperature = response.data.temperature.current;
	temperatureElement.innerHTML = Math.round(response.data.temperature.current);
	cityElement.innerHTML = response.data.city;
	descriptionElement.innerHTML = response.data.condition.description;
	humidityElement.innerHTML = response.data.temperature.humidity;
	windElement.innerHTML = Math.round(response.data.wind.speed);
	dateElement.innerHTML = formatDate(response.data.time * 1000);
	iconElement.setAttribute("src", response.data.condition.icon_url);
	iconElement.setAttribute("alt", response.data.condition.description);
}
function search(city) {
	let apiKey = "fed24a4a3934t32fo5a63bbe36a70167";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
	console.log(apiUrl);
	axios.get(apiUrl).then(displayTemperature);
}
function displayFahrenheitTemperature(event) {
	event.preventDefault();
	//add the active link to the celsius link
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function showPosition(position) {
	console.log(position);
	let lat = position.coords.latitude;
	let long = position.coords.longitude;
	let apiKey = "fed24a4a3934t32fo5a63bbe36a70167";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${long}&key=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayTemperature);
}
function getPosition(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showPosition);
}
function displayCelsiusTemperature(event) {
	event.preventDefault();
	//remove the active link from celsius link
	fahrenheitLink.classList.remove("active");
	celsiusLink.classList.add("active");
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#city-input");
	console.log(cityInputElement.value);
	let city = cityInputElement.value;
	search(city);
}
let getCurrentButton = document.querySelector("#get-current");
getCurrentButton.addEventListener("click", getPosition);
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
let celsiusTemperature = null;
let fahrenheitTemperature = null;
search("Amsterdam");
