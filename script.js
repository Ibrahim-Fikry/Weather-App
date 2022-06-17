//#region variables
let currentDate = new Date();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
];

let currentday = document.getElementById('currentday')
let currentmonth = document.getElementById('currentmonth')
let thelocation = document.getElementById('thelocation')
let degnum = document.getElementById('degnum')
let degicon = document.getElementById('degicon')
let weatherstatus = document.getElementById('weatherstatus')
let rainchange = document.getElementById('rainchange')
let wind = document.getElementById('wind')
let winddir = document.getElementById('winddir')
let otherDay = document.getElementById('otherDay')

//#endregion


async function search(place = "cairo") {
    if (place != "") {
        let response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=a5a6d5b12cfd4fe8b5a70317221706&q=${place}&days=3`
        );
        let finalResponse = await response.json();
        console.log(finalResponse)
        displayCurrent(finalResponse.location, finalResponse.current, finalResponse.forecast.forecastday[0]);
        displayAnother(finalResponse.forecast.forecastday);
    }
}
search();


function displayCurrent(location, current, forcastNow) {
    currentday.innerHTML = days[currentDate.getDay()];
    currentmonth.innerHTML = currentDate.getDate() + monthNames[currentDate.getMonth()];
    thelocation.innerHTML = location.name;
    degnum.innerHTML = current.temp_c + `<sup>o</sup>C`;
    degicon.innerHTML = `<img src="https:${current.condition.icon}" >`;
    weatherstatus.innerHTML = current.condition.text;
    rainchange.innerHTML = forcastNow.day.daily_chance_of_rain + "%";
    wind.innerHTML = forcastNow.day.maxwind_kph + " km/h";
    winddir.innerHTML = forcastNow.hour[0].wind_dir;
}

function displayAnother(forCast) {
    let theotherDay = "";
    for (let i = 1; i < forCast.length; i++) {
        theotherDay += `
      <div class="col-lg-6 bg  ">
      <div class="weather-card text-center other-day ">
  
      <div class="weather-hd">
            <span>${days[new Date(forCast[i].date).getDay()]}</span>
      </div>
              <div class="weather-card-body ">
                  <div class="deg-icon">
                      <img src="https:${forCast[i].day.condition.icon}" alt="">
                  </div>
                  <div class="degree">
                      <div class="deg-num">
                          <p class=" mb-0">${
                            forCast[i].day.maxtemp_c + `<sup>o</sup>C`
                          }
                          </p>
                      </div>
                      <small>${forCast[i].day.mintemp_c + `<sup>o</sup>C`}</small>
                  </div>
                  <div class="weather-status ">
                      ${forCast[i].day.condition.text}
                  </div>
              </div>
      </div>
  </div>
  `;
    }
    otherDay.innerHTML += theotherDay;
  }