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

function changeCity(event) {}

function changeCity(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		let header = document.querySelector("header");
		header.innerHTML = event.target.value;
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
