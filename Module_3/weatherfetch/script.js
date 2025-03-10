const apiKey = {
    key: "10eb6c9d9e2cc5d4fc63fbb6754f6b74",
    base: "https://api.openweathermap.org/data/2.5/weather?"
}
const searchbtn = document.getElementById("btn1");
const searchinp = document.getElementById("city");

searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city = searchinp.value;
    getWeather(city);
});
function getWeather(city) {
    fetch(`${apiKey.base}q=${city}&units=metric&appid=${apiKey.key}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        showWeather(data);
    });
}


function showWeather(data) {
    console.log(data);
    const temp = document.getElementById('temp');
    const scity = document.getElementById('c1');
    const winds = document.getElementById('wind');
    const humid = document.getElementById('humidity');
    scity.textContent = searchinp.value;
    temp.innerHTML = `Temperature: ${data.main.temp}°C`;
    winds.innerHTML = `Wind Speed : ${data.wind.speed}Km/hr`;
    humid.innerHTML = `Humidity : ${data.main.humidity}%`;

    const body = document.body;
    if (data.main.humidity >= 70){
        body.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2015/12/25/13/03/sky-1107579_1280.jpg')";
    } else if (data.main.temp > 25) {
        body.style.backgroundImage = "url('https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')";
    } else {
        body.style.backgroundImage = "url('https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=600')";
    }
}
// function clouds(data) {
    // const body = document.getElementById('b');
    // if (data.main.humidity >= 70){
        // body.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2015/12/25/13/03/sky-1107579_1280.jpg')";
    // } else if (data.main.temp > 25) {
        // body.style.backgroundImage = "url('https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')";
    // } else {
        // body.style.backgroundImage = "url('https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=600')";
    // }
// }