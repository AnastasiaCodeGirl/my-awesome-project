let weather = [
	{
		name: "paris",
		temp: 19.7,
		humidity: 80,
	},
	{
		name: "tokyo",
		temp: 17.3,
		humidity: 50,
	},
	{
		name: "lisbon",
		temp: 30.2,
		humidity: 20,
	},
	{
		name: "san francisco",
		temp: 20.9,
		humidity: 100,
	},
	{
		name: "oslo",
		temp: -5,
		humidity: 20,
	},
];
function convertCelsiumToFahrenheits(celsium) {
	let fahrenheit = (celsium * 9) / 5 + 32;
	return Math.round(fahrenheit);
}

function roundValues() {
	for (const iterator of weather) {
		iterator.temp = Math.round(iterator.temp);
	}
}
function checkInput(input2) {
	return input2 == userCity;
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function callMessage(cityFromList, index) {
	if (cityFromList != undefined && index != -1) {
		alert(
			`It is currently ${weather[index].temp}°C (${convertCelsiumToFahrenheits(
				weather[index].temp
			)}°F) in ${capitalizeFirstLetter(userCity)} with a humidity of ${
				weather[index].humidity
			}%`
		);
	} else {
		alert(
			`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${userCity}`
		);
	}
}

// write your code here
let userCity = prompt("Enter a city?");
userCity = userCity.toLowerCase().trim();
roundValues();
const map1 = weather.map((x) => x.name);
let cityFromList = map1.find(checkInput);
let index = map1.findIndex(checkInput);
callMessage(cityFromList, index);

function displayUserName(response) {
	// console.log(response.data.address.street);
	let h1 = document.querySelector("h1");
	response.data.forEach((user) => {
		console.log(`name= ${user.name}  username= ${user.username} `);
		h1.innerHTML += `${user.name} <br />`;
	});
}
let ApiUrl = "https://jsonplaceholder.typicode.com/users/";
axios.get(ApiUrl).then(displayUserName);
