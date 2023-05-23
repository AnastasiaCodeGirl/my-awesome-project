function showTemperature(response) {
	let temperatureSelector = document.querySelector(".current_temperature");
	let temperatureNow = Math.round(response.data.main.temp);
	console.log(temperatureNow);
	temperatureSelector.innerHTML = temperatureNow;
}

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
		let city = event.target.value;
		header.innerHTML = city;
		let apiKey = "917b5cb46b9991bd0ab660f50601d0c6";
		let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
		axios.get(apiUrl).then(showTemperature);
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

let placeholderData = document.querySelector("#get-date");
placeholderData.innerHTML = formatData(new Date());

let cityFromUserInput = document.querySelector("input");
cityFromUserInput.addEventListener("keypress", changeCity);

let linkCelsius = document.querySelector("#celsius");
linkCelsius.addEventListener("click", changeTemperatureToCelsius);
let linkFahrenheit = document.querySelector("#fahrenheit");
linkFahrenheit.addEventListener("click", changeTemperatureToFahrenheit);
