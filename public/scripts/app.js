const container = document.querySelector(".app-container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");
const dateDiv = document.querySelector("#formatted-date");
const timeDiv = document.querySelector(".time");

search.addEventListener("click", () => {
  const APIKey = "716882002bd5b01432d57d43c2a7e72c";
  const city = document.querySelector(".search-box input").value;

  if (city == "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log("Fetched JSON:", json);
      if (json.cod == "404") {
        document.body.style.backgroundImage =
          'url("./public/images/background.jpg")';
        cityHide.textContent = city;
        container.style.height = "500px";
        // container.style.marginBottom = "0px"
        // container.style.overflowY = "auto";
        // document.querySelector(".not-found.active .box").style.overflowY = "auto";
        weatherBox.classList.remove("active");
        weatherBox.style.display = "none";
        // weatherBox.style.transform = 'translateY(-100%)';
        dateDiv.classList.remove("active");
        timeDiv.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        // dateDiv.style.visibility = "hidden";
        // timeDiv.style.visibility = "hidden";
        return;
      }

      // const image = document.querySelector('.weather-box img');
      const image = document.querySelector(".weather-box .info-weather img");
      console.log("Weather image element:", image);
      const city_name = document.querySelector("#city_name");
      const temperature = document.querySelector(
        ".weather-box .info-weather .temperature"
      );
      const description = document.querySelector(
        ".weather-box .info-weather .description"
      );
      const pressure = document.querySelector(
        ".weather-details .pressure span"
      );
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      /* Check if City Data Has Changed.
This part prevents re-fetching and updating the data if the city name hasn't changed, ensuring unnecessary updates are avoided. */
      if (cityHide.textContent === city) {
        console.log("City data is the same as previous, returning.");
        return;
      } else {
        cityHide.textContent = city;
        container.style.height = "auto";
        container.classList.add("active");
        weatherBox.style.display = "block";
        weatherBox.classList.add("active");
        dateDiv.classList.add("active");
        timeDiv.classList.add("active");
        weatherDetails.classList.add("active");
        error404.classList.remove("active");

        setTimeout(() => {
          container.classList.remove("active");
          console.log(
            "Removed active class from container after timeout 2500 ms."
          );
        }, 2500);

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "./public/images/clear.png";
            document.body.style.backgroundImage =
              'url("./public/images/clear.gif")';
            break;

          case "Rain":
            image.src = "./public/images/rain.png";
            document.body.style.backgroundImage =
              'url("./public/images/rain.gif")';
            break;

          case "Snow":
            image.src = "./public/images/snow.png";
            document.body.style.backgroundImage =
              'url("./public/images/snow.gif")';
            break;

          case "Clouds":
            image.src = "./public/images/cloud.png";
            document.body.style.backgroundImage =
              'url("./public/images/cloud.gif")';
            break;

          case "Mist":
            image.src = "./public/images/mist.png";
            document.body.style.backgroundImage =
              'url("./public/images/mist.gif")';
            break;

          case "Haze":
            image.src = "./public/images/haze.png";
            document.body.style.backgroundImage =
              'url("./public/images/haze.gif")';
            break;

            case "Drizzle":
            image.src = "./public/images/rain.png";
            document.body.style.backgroundImage =
              'url("./public/images/drizzle.webp")';
            break;

            case "Thunderstorm":
            image.src = "./public/images/thunderstorm.png";
            document.body.style.backgroundImage =
              'url("./public/images/thunderstorm.gif")';
            break;

          default:
            image.src = "./public/images/cloud.png";
            document.body.style.backgroundImage =
              'url("./public/images/cloud.gif")';
        }

        // Set Weather Information
        console.log("Updating UI elements with fetched data...");
        city_name.innerHTML = `${json.name}, ${json.sys.country}`;
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;

        const weatherConditions = {
          Clear:
            "Clear skies today! It's a great day for outdoor activities. Clear skies at night are great for stargazing; find a dark spot away from city lights. If it's hot, make sure to drink plenty of water. Don't forget your sunscreen and sunglasses!",
          Rain: "Expect rain today. Keep your umbrella handy and drive safely. Stay updated on local weather alerts for possible flooding. Great day for indoor activities!",
          Snow: "Snowy day ahead! Dress warmly and drive carefully. Roads might be icy; ensure your vehicle is equipped for snow. Make sure your home heating system is working well. Perfect weather for some snow fun!",
          Clouds:
            "Cloudy skies today. Enjoy a walk or some light activities. Cloudy skies can create dramatic and beautiful photo opportunities. Clouds can turn to rain; keep an eye on the weather updates!",
          Mist: "Misty conditions today. Drive carefully and wear a water-resistant jacket. Sidewalks and paths might be slippery. Perfect for some mystical photography!",
          Haze: "Hazy conditions today. Limit outdoor activities and check the air quality. Keep indoor air clean with air purifiers. Stay updated on local air quality reports. Stay hydrated and safe!",
          Thunderstorm:
            "Thunderstorms expected today. Stay indoors and unplug electronics. If caught outside, avoid tall objects like trees or poles. Keep an emergency kit ready in case of power outages. Stay safe!",
          Drizzle:
            "Light drizzle today. A small umbrella should do. Roads can be slick; drive slower than usual. Light drizzle is usually fine for most outdoor activities. Drizzle can make the air feel damp; keep your skin moisturized. Enjoy the fresh feel of light rain!",
        };

        // Weather condition
        const currentWeather = json.weather[0].main;

        // Display the suggestion
        const suggestionBox = document.getElementById("suggestion");
        suggestionBox.textContent = weatherConditions[currentWeather];

        pressure.innerHTML = `${json.main.pressure} hPa`;
        humidity.innerHTML = `${json.main.humidity}%`;
        console.log("Updating wind.innerHTML...");
        wind.innerHTML = `${parseInt(json.wind.speed)} m/s`;

        // Clone Weather Information Elements
        const infoWeather = document.querySelector(".info-weather");
        const infoPressure = document.querySelector(".info-pressure");
        const infoHumidity = document.querySelector(".info-humidity");
        const infoWind = document.querySelector(".info-wind");

        console.log("Cloning info elements...");
        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoPressure = infoPressure.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        // Add Unique Identifiers and Classes to Clones
        elCloneInfoWeather.id = "clone-info-weather";
        elCloneInfoWeather.classList.add("active-clone");

        elCloneInfoPressure.id = "clone-info-pressure";
        elCloneInfoPressure.classList.add("active-clone");

        elCloneInfoHumidity.id = "clone-info-humidity";
        elCloneInfoHumidity.classList.add("active-clone");

        elCloneInfoWind.id = "clone-info-wind";
        elCloneInfoWind.classList.add("active-clone");
        console.log("elCloneInfoWind.classList", elCloneInfoWind.classList);
        console.log("Info wind clone:", elCloneInfoWind);

        // Insert clones into the DOM
        console.log("Appending clones after timeout...");
        setTimeout(() => {
          infoWeather.style.display = "none";
          infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
          console.log("Inserted clone:", elCloneInfoWeather);

          infoPressure.insertAdjacentElement("afterend", elCloneInfoPressure);
          infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
          infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
          console.log("Clones appended after 2200 ms.");
        }, 2200);

        /* setTimeout(() => {
                    elCloneInfoWeather.style.display = 'block';
                }, 2500); */
        // Wait for 2500ms to ensure smooth transition

        // Identify Existing Clones
        const cloneInfoWeather = document.querySelectorAll(
          ".info-weather.active-clone"
        );
        console.log("cloneInfoWeather:", cloneInfoWeather);
        const totalCloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];
        console.log("Total cloned weather elements:", totalCloneInfoWeather);

        const cloneInfoPressure = document.querySelectorAll(
          ".info-pressure.active-clone"
        );
        console.log("cloneInfoPressure:", cloneInfoPressure);
        const cloneInfoPressureFirst = cloneInfoPressure[0];
        console.log("cloneInfoPressureFirst:", cloneInfoPressureFirst);

        const cloneInfoHumidity = document.querySelectorAll(
          ".info-humidity.active-clone"
        );
        const cloneInfoHumidityFirst = cloneInfoHumidity[0];

        const cloneInfoWind = document.querySelectorAll(
          ".info-wind.active-clone"
        );
        console.log("cloneInfoWind:", cloneInfoWind);
        const cloneInfoWindFirst = cloneInfoWind[0];
        console.log("cloneInfoWindFirst:", cloneInfoWindFirst);

        if (totalCloneInfoWeather > 0) {
          console.log("Removing first set of active clones...");
          cloneInfoWeatherFirst.classList.remove("active-clone");
          cloneInfoPressureFirst.classList.remove("active-clone");
          cloneInfoHumidityFirst.classList.remove("active-clone");
          cloneInfoWindFirst.classList.remove("active-clone");
          console.log("InfoWind's active-clone class removed.");

          // Remove old clones
          console.log("Remove old clones...");
          setTimeout(() => {
            cloneInfoWeatherFirst.remove();
            cloneInfoPressureFirst.remove();
            cloneInfoHumidityFirst.remove();
            cloneInfoWindFirst.remove();
            console.log("InfoWind's clone removed.");
            console.log("Old clones removed after 2200ms.");
          }, 2200);
        }
      }
    });
});

// Time
function getTime() {
  const time = new Date();
  const hour = time.getHours();
  const min = time.getMinutes();
  const second = time.getSeconds();

  clock.innerHTML = `${hour} : ${min} : ${second} ${hour > 12 ? "PM" : "AM"}`;

  setTimeout(() => {
    getTime();
  }, 1000);
}
getTime();

// Day
function get_day() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  let day = days[d.getDay()];
  today.innerHTML = `${day}, `;
}
get_day();

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

// Date
function get_date() {
  // Get the current date
  const now = new Date();

  // Custom format: DD-MM-YYYY
  const year = now.getFullYear();

  // To convert a numeric month into a string with leading zeros
  // .padStart(2, '0') pads the string with leading zeros if necessary to ensure it is at least 2 characters long.
  // const month = String(now.getMonth() + 1).padStart(2, '0');

  // To convert a numeric day into a string with leading zeros
  // .padStart(2, '0') pads the string with leading zeros if necessary to ensure it is at least 2 characters long.
  // const day = String(now.getDate()).padStart(2, '0');

  // const formattedDate = `${day}/${month}/${year}`;
  // 8/05/1993

  const monthNames = [
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
  // Get the month name
  const month = monthNames[now.getMonth()];

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // Get the day name
  // const day = dayNames[now.getDay()];
  const day = now.getDate(); // Get the day of the month
  const daySuffix = getDaySuffix(day); // Get the appropriate suffix
  const formattedDate = `${day}<sup>${daySuffix}</sup> ${month}, ${year}`; // 8/05/1993

  // Display the formatted date
  // document.getElementById("formatted-date").innerText = formattedDate;
  document.getElementById("formatted-date").innerHTML = formattedDate;
}
get_date();
