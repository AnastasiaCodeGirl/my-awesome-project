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

function changeCity(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		let header = document.querySelector("header");
		header.innerHTML = event.target.value;
		city = event.target.value;
		apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
		axios.get(apiUrl).then(logCurrentTemperature);
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
	let temperature = document.querySelector(".current_temperature");
	temperature.innerHTML = convertCelsiusToFahrenheit(temperature.innerHTML);
}
function logCurrentTemperature(response) {
	// console.log(response);
	let header = document.querySelector("header");
	header.innerHTML = response.data.name;
	let temperature = Math.round(response.data.main.temp);
	city = response.data.name;
	let temperatureLabel = document.querySelector(".current_temperature");
	temperatureLabel.innerHTML = temperature;
	let description = response.data.weather[0].description;
	// let icon = response.data.weather[0].icon;
	// console.log(icon);
	let windSpeed = response.data.wind.speed;
	let humidity = response.data.main.humidity;
	let descriptionLabel = document.querySelector("#get-description");
	let humidityLabel = document.querySelector("#humidity");
	let windLabel = document.querySelector("#wind");
	descriptionLabel.innerHTML = description;
	humidityLabel.innerHTML = `Humidity: ${humidity}%`;
	windLabel.innerHTML = `Wind: ${windSpeed} MPS`;
}
function showPosition(position) {
	let lat = position.coords.latitude;
	let long = position.coords.longitude;
	let apiKey = "917b5cb46b9991bd0ab660f50601d0c6";
	let units = "metric";
	console.log(lat);
	console.log(long);
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
	axios.get(apiUrl).then(logCurrentTemperature);
}
function getPosition(event) {
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

let apiKey = "917b5cb46b9991bd0ab660f50601d0c6";
let header = document.querySelector("header");
let city = header.innerHTML;
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(logCurrentTemperature);
