const tripKey = "5ae2e3f221c38a28845f05b6e28e235ac0bcd9dc05b2c8b37c888b48";
const geoKey = "9e3d200f90a14971a704be16f41dc73c";
const kindsInput = "foods";
getCoords("London", "", "");


function getCoords(city, state, country) {
    console.log(country);
    const requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${geoKey}`;

    fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            const output = [];

            // getData(output);
        })
}

function getData(object) {
    const requestUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${object.lon}&lat=${object.lat}&kinds=${kindsInput}&name=${object.name}&apikey=${tripKey}`

    fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            createButton(data.features[0].properties.xid, data.features[0].properties.name);
        })
}

