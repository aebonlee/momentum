//var
const weather = document.querySelector('.js-weather');

const COORDS = 'coords';
const API_KEY = 'f02144ed9e0bddc0db6b19cd78999e1a';
//https://openweathermap.org/current  --- By geographic coordinates
//개인 회원가입해서 사용하는 API! 2차 사용 불허!

//function
function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function (response) {
        //then - 데이터가 완전히 넘어온 다음 함수호출
        return response.json();
    }).then(function (json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `@${place} ${temperature}℃ `;
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude; //위도
    const longitude = position.coords.longitude; //경도
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('Cant access geo location');
}

function askForCoords() {
    //위치정보 읽기
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        //getWeather
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();