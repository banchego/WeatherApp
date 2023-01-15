const api = {
   endpoint: "https://api.openweathermap.org/data/2.5/",
   key: "1d950891249b64598dd117ca99982603",
};

// date
function getDate() {
   const today = new Date();
   const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
   ];
   const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];
   let day = days[today.getDay()];
   let date = today.getDate();
   let month = months[today.getMonth()];
   let year = today.getFullYear();
   let todayDate = document.querySelector("#date");
   todayDate.textContent = `${day}, ${date} ${month} ${year}`;
}
getDate();

// search
const input = document.querySelector("#search");
input.addEventListener("keydown", enter);

function enter(e) {
   if (e.keyCode === 13) {
      getInfo(input.value);
   }
}
async function getInfo(data) {
   const result = await fetch(
      `${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`
   );
   const endResult = await result.json();
   displayResult(endResult);
}
function displayResult(endResult) {
   let city = document.querySelector("#city");
   city.innerHTML = `<i class="fa-solid fa-location-dot fa-sm"></i> ${endResult.name}, ${endResult.sys.country}`;

   let temp = document.querySelector("#temperature");
   temp.innerHTML = `${Math.round(endResult.main.temp)}°`;

   let feelsLike = document.querySelector("#feelsLike");
   feelsLike.innerHTML = `Feels ${Math.round(endResult.main.feels_like)}°`;

   let tempVariation = document.querySelector("#variation");
   tempVariation.innerHTML = `Min ${Math.round(
      endResult.main.temp_min
   )}° | Max ${Math.round(endResult.main.temp_max)}°`;
}
getInfo("Montreal");