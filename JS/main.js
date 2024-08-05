// Elements
const Search = document.getElementById("search");
const btn = document.getElementById("btn");

UserLocation();

Search.addEventListener("input", function () {
  getWeather();
});

btn.addEventListener("click", function () {
  getWeather();
});

async function UserLocation() {
  let result = await fetch("http://ip-api.com/json", {
    method: "GET",
  });
  if (result.ok) {
    let response = await result.json();
    getWeather(response.city);
  }
}

async function getWeather(UserLocation) {
  let result = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=70922293e0264ef0ac2211409241506&q=${
      UserLocation || Search.value
    }&days=3`
  );
  if (result.ok) {
    let response = await result.json();
    displayNow(response);
    displayAnotherDays(response);
  }
}

function displayNow(NowData) {
  let content = `
    
        <div class="nowheader main-header-color mb-5 d-flex py-2 px-2 align-items-center justify-content-between">
            <h4 class="m-0 fs-5 p-0 ">${new Date(
              NowData.location.localtime
            ).toLocaleDateString("en-US", { weekday: "long" })}</h4>
            <p class="m-0 p-0">${new Date(
              NowData.location.localtime
            ).toLocaleDateString("en-US")}</p>
        </div>
        <div class="content ms-3">
            <div class="location mb-5 ">${NowData.location.name}</div>
            <div class="degree d-flex align-items-center my-5">
                <div class="mainnum fw-bold">${NowData.current.temp_c}°C</div>
                <div class="icon"><img src="${
                  NowData.current.condition.icon
                }" alt="${NowData.current.condition.text}"></div>
            </div>
            <div class="status text-primary mb-3">${
              NowData.current.condition.text
            }</div>
            <div class="wind">
                <span class="text-white-50"><i class="fa-solid fa-droplet me-2 text-white-50"></i>${
                  NowData.current.humidity
                }%</span>
                <span class="text-white-50"><i class="fa-solid fa-wind ms-2 me-2 text-white-50"></i>${
                  NowData.current.wind_kph
                } km/h</span>
                <span class="text-white-50"><i class="fa-solid fa-compass ms-2 me-2 text-white-50"></i>${
                  NowData.current.wind_dir
                }</span>
            </div>
        </div>
    `;
  document.getElementById("nowdata").innerHTML = content;
}

function displayAnotherDays(DaysData) {
  let contentDay1 = `
        <div class="header other-header-color mb-5 d-flex py-2 px-2 align-items-center justify-content-center">
            <h4 class="m-0 fs-5 p-0">${new Date(
              DaysData.forecast.forecastday[1].date
            ).toLocaleDateString("en-US", { weekday: "long" })}</h4>
        </div>
        <div class="content ms-3">
            <div class="degree d-flex align-items-center flex-column my-5">
                <div class="icon"><img src="${
                  DaysData.forecast.forecastday[1].day.condition.icon
                }" alt="${
    DaysData.forecast.forecastday[1].day.condition.text
  }"></div>
                <div class="mainnum fw-bold">${
                  DaysData.forecast.forecastday[1].day.maxtemp_c
                }°C</div>
                <div class="mainnum fs-6 fw-bold">${
                  DaysData.forecast.forecastday[1].day.mintemp_c
                }°C</div>
            </div>
            <div class="status text-center text-primary mb-3">${
              DaysData.forecast.forecastday[1].day.condition.text
            }</div>
        </div>
    `;

  document.getElementById("dataday1").innerHTML = contentDay1;

  let contentDay2 = `
        <div class="header mb-5 main-header-color d-flex py-2 px-2 align-items-center justify-content-center">
            <h4 class="m-0 fs-5 p-0">${new Date(
              DaysData.forecast.forecastday[2].date
            ).toLocaleDateString("en-US", { weekday: "long" })}</h4>
        </div>
        <div class="content ms-3">
            <div class="degree d-flex align-items-center flex-column my-5">
                <div class="icon"><img src="${
                  DaysData.forecast.forecastday[2].day.condition.icon
                }" alt="${
    DaysData.forecast.forecastday[2].day.condition.text
  }"></div>
                <div class="mainnum fw-bold">${
                  DaysData.forecast.forecastday[2].day.maxtemp_c
                }°C</div>
                <div class="mainnum fs-6 fw-bold">${
                  DaysData.forecast.forecastday[2].day.mintemp_c
                }°C</div>
            </div>
            <div class="status text-center text-primary mb-3">${
              DaysData.forecast.forecastday[2].day.condition.text
            }</div>
        </div>
    `;
  document.getElementById("dataday2").innerHTML = contentDay2;
}
