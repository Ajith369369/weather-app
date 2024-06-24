const container = document.querySelector('.app-container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {

    const APIKey = '716882002bd5b01432d57d43c2a7e72c';
    const city = document.querySelector('.search-box input').value;

    if (city == "") {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
 console.log('Fetched JSON:', json);
            if (json.cod == '404') {
                cityHide.textContent = city;
                container.style.height = 'fit-content';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            // const image = document.querySelector('.weather-box img');
            const image = document.querySelector('.weather-box .info-weather img');
            console.log('Weather image element:', image);
            const city_name = document.querySelector('#city_name');
            const temperature = document.querySelector('.weather-box .info-weather .temperature');
            const description = document.querySelector('.weather-box .info-weather .description');
            const pressure = document.querySelector('.weather-details .pressure span');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

             /* Check if City Data Has Changed.
This part prevents re-fetching and updating the data if the city name hasn't changed, ensuring unnecessary updates are avoided. */
            if (cityHide.textContent === city) {
                console.log('City data is the same as previous, returning.');
                return;
            } else {
                cityHide.textContent = city;

                container.style.height = 'auto';
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');

                setTimeout(() => {
                    container.classList.remove('active');
                    console.log('Removed active class from container after timeout 2500 ms.');
                }, 2500);

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = './public/images/clear.png';
                        break;

                    case 'Rain':
                        image.src = './public/images/rain.png';
                        break;

                    case 'Snow':
                        image.src = './public/images/snow.png';
                        break;

                    case 'Clouds':
                        image.src = './public/images/cloud.png';
                        break;

                    case 'Mist':
                        image.src = './public/images/mist.png';
                        break;

                    case 'Haze':
                        image.src = './public/images/mist.png';
                        break;

                    default:
                        image.src = './public/images/cloud.png';
                }

                // Set Weather Information
                console.log('Updating UI elements with fetched data...');
                city_name.innerHTML = `${json.name}, ${json.sys.country}`;
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                pressure.innerHTML = `${json.main.pressure} hPa`;
                humidity.innerHTML = `${json.main.humidity}%`;
                console.log('Updating wind.innerHTML...');
                wind.innerHTML = `${parseInt(json.wind.speed)} m/s`;
                
                // Clone Weather Information Elements
                const infoWeather = document.querySelector('.info-weather');
                const infoPressure = document.querySelector('.info-pressure');
                const infoHumidity = document.querySelector('.info-humidity');
                const infoWind = document.querySelector('.info-wind');

                console.log('Cloning info elements...');
                const elCloneInfoWeather = infoWeather.cloneNode(true);
                const elCloneInfoPressure = infoPressure.cloneNode(true);
                const elCloneInfoHumidity = infoHumidity.cloneNode(true);
                const elCloneInfoWind = infoWind.cloneNode(true);

                // Add Unique Identifiers and Classes to Clones
                elCloneInfoWeather.id = 'clone-info-weather';
                elCloneInfoWeather.classList.add('active-clone');

                elCloneInfoPressure.id = 'clone-info-pressure';
                elCloneInfoPressure.classList.add('active-clone');

                elCloneInfoHumidity.id = 'clone-info-humidity';
                elCloneInfoHumidity.classList.add('active-clone');

                elCloneInfoWind.id = 'clone-info-wind';
                elCloneInfoWind.classList.add('active-clone');
                console.log('elCloneInfoWind.classList', elCloneInfoWind.classList);
                console.log('Info wind clone:', elCloneInfoWind);

                // Insert clones into the DOM
                console.log('Appending clones after timeout...');
                setTimeout(() => {
                    infoWeather.style.display = 'none';
                    infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                    console.log('Inserted clone:', elCloneInfoWeather);

                    infoPressure.insertAdjacentElement("afterend", elCloneInfoPressure);
                    infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                    infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
                    console.log('Clones appended after 2200 ms.');
                }, 2200);

                /* setTimeout(() => {
                    elCloneInfoWeather.style.display = 'block';
                }, 2500); */
                // Wait for 2500ms to ensure smooth transition

                // Identify Existing Clones
                const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
                console.log('cloneInfoWeather:', cloneInfoWeather);
                const totalCloneInfoWeather = cloneInfoWeather.length;
                const cloneInfoWeatherFirst = cloneInfoWeather[0];
                console.log('Total cloned weather elements:', totalCloneInfoWeather);
    
                const cloneInfoPressure = document.querySelectorAll('.info-pressure.active-clone');
                console.log('cloneInfoPressure:', cloneInfoPressure);
                const cloneInfoPressureFirst = cloneInfoPressure[0];
                console.log('cloneInfoPressureFirst:', cloneInfoPressureFirst);

                const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
                const cloneInfoHumidityFirst = cloneInfoHumidity[0];
    
                const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
                console.log('cloneInfoWind:', cloneInfoWind);
                const cloneInfoWindFirst = cloneInfoWind[0];
                console.log('cloneInfoWindFirst:', cloneInfoWindFirst);
    
                if (totalCloneInfoWeather > 0) {
                    console.log('Removing first set of active clones...');
                    cloneInfoWeatherFirst.classList.remove('active-clone');
                    cloneInfoPressureFirst.classList.remove('active-clone');
                    cloneInfoHumidityFirst.classList.remove('active-clone');
                    cloneInfoWindFirst.classList.remove('active-clone');
                    console.log('InfoWind\'s active-clone class removed.');
    
                    // Remove old clones
                    console.log('Remove old clones...');
                    setTimeout(() => {
                        cloneInfoWeatherFirst.remove();
                        cloneInfoPressureFirst.remove();
                        cloneInfoHumidityFirst.remove();                
                        cloneInfoWindFirst.remove();
                        console.log('InfoWind\'s clone removed.');
                        console.log('Old clones removed after 2200ms.');
                    }, 2200);
                }




            }

        });
});
