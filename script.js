function formatData(date) {
	let daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let dayOfWeek = daysOfWeek[date.getDay()];
	let hours = date.getHours();
	let minutes = ("0" + date.getMinutes()).slice(-2);
	let formattedDate = `${dayOfWeek} ${hours}:${minutes}`;
	return formattedDate;
}
function searchCity(city) {
	let apiKey = "fed24a4a3934t32fo5a63bbe36a70167";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayWeatherCondition);
}

function changeCity(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		document.querySelector("header").innerHTML = event.target.value;
		city = event.target.value;
		searchCity(city);
	}
}
function convertCelsiusToFahrenheit(celsium) {
	let fahrenheit = (celsium * 9) / 5 + 32;
	return Math.round(fahrenheit);
}

function convertFahrenheitToCelsius(fahrenheit) {
	let celsius = ((fahrenheit - 32) * 5) / 9;
	return Math.round(celsius);
}

function changeTemperatureToCelsius(event) {
	event.preventDefault();
	let temperature = document.querySelector(".current_temperature");
	temperature.innerHTML = convertFahrenheitToCelsius(temperature.innerHTML);
}

function changeTemperatureToFahrenheit(event) {
	event.preventDefault();
	let temperature = document.querySelector(
		".current_temperature".temperaturere
	);
	temperature.innerHTML = convertCelsiusToFahrenheit(temperature.innerHTML);
}
function displayWeatherCondition(response) {
	console.log(response);
	document.querySelector("header").innerHTML = response.data.city;
	document.querySelector(".current_temperature").innerHTML = Math.round(
		response.data.temperature.current
	);
	document.querySelector("#humidity").innerHTML =
		response.data.temperature.humidity;
	document.querySelector("#wind").innerHTML = Math.round(
		response.data.wind.speed
	);
	document.querySelector("#get-description").innerHTML =
		response.data.condition.description;
	let iconElement = document.querySelector("#current_icon");
	iconElement.setAttribute(
		"src",
		`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
	);
	iconElement.setAttribute("alt", response.data.condition.description);
}
function showPosition(position) {
	console.log(position);
	let lat = position.coords.latitude;
	let long = position.coords.longitude;
	let apiKey = "fed24a4a3934t32fo5a63bbe36a70167";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${long}&key=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayWeatherCondition);
}
function getPosition(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showPosition);
}
let getCurrentButton = document.querySelector("#get-current");
getCurrentButton.addEventListener("click", getPosition);
let placeholderData = document.querySelector("#get-date");
placeholderData.innerHTML = formatData(new Date());
let cityFromUserInput = document.querySelector("input");
cityFromUserInput.addEventListener("keypress", changeCity);
let linkCelsius = document.querySelector("#celsius");
linkCelsius.addEventListener("click", changeTemperatureToCelsius);
let linkFahrenheit = document.querySelector("#fahrenheit");
linkFahrenheit.addEventListener("click", changeTemperatureToFahrenheit);

searchCity("Amsterdam");
