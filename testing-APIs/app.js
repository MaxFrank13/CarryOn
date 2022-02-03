const attractionDisplay = document.querySelector(".attraction-display");
const form = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const countryInput = document.getElementById("country");
const stateInput = document.getElementById("state");
const tripKey = "5ae2e3f221c38a28845f05b6e28e235ac0bcd9dc05b2c8b37c888b48";
const geoKey = "9e3d200f90a14971a704be16f41dc73c";
const testLat = 51.5;
const testLon = -0.125;


form.addEventListener("submit", function(e) {
    e.preventDefault();
    getCoords(searchInput.value, stateInput.value, countryInput.value);
});

function getCoords(city, state, country) {
    console.log(country);
    const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${geoKey}`;

    fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            const output = {
                lon: data[0].lon,
                lat: data[0].lat,
                name: data[0].name,
                country: data[0].country,
                state: data[0].state
            }
            getData(output);
        })
}

function getData(object) {
    const requestUrl = `http://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${object.lon}&lat=${object.lat}&name=${object.name}&apikey=${tripKey}`

    fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            createButton(data.features[0].properties.xid, data.features[0].properties.name);
        })
}

function createButton (xid, value) {
    const newAnchor = document.createElement("a");
    newAnchor.href = `https://opentripmap.com/en/card/${xid}`;
    newAnchor.target = "_blank";
    const newBtn = document.createElement("button");
    newBtn.classList.add("attraction");
    newBtn.textContent = value;
    newAnchor.append(newBtn);
    attractionDisplay.append(newAnchor); 
}