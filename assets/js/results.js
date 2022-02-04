$(function () {

    // get query string from URL (i.e. ?q=Portland,ME,US)
    console.log(document.location.search);
    // split string into array at the '?' and access the value at index 1 (i.e. q=Portland,ME,US) to use in API call
    const queryInput = document.location.search.split("?")[1];

    // function works for cities but doesn't account for checkboxes yet

    // **** API keys ****

    // Open Trip API
    const tripKey = "5ae2e3f221c38a28845f05b6e28e235ac0bcd9dc05b2c8b37c888b48";
    // GeoCode API from Open Weather
    const geoKey = "9e3d200f90a14971a704be16f41dc73c";

    // **** Selectors ****

    const searchBtn = $("#search-button");
    const searchInput = $("#searchbar");
    const state = $("#state")
    const country = $("#country")
    const cultural = $("#cultural")
    const foods = $("#foods")
    const transport = $("#transport")

    const kindsFoods = true; // value grabbed when form is submitted
    const kindsCulture = false; // value grabbed when form is submitted
    const kindsTransportation = false; // value grabbed when form is submitted

    // **** Event Listeners ****

    searchBtn.click(function () {
        const requestQuery = `q=${searchInput.val()},${state.val()},${country.val()}`
        console.log(searchInput.val())
        console.log(country.val())
        console.log(cultural.val())
        console.log(foods.val())
        console.log(transport.val())
        getCoords(requestQuery);
    })

    getCoords(queryInput);

    // **** API Request functions ****

    function getCoords(input) {
        console.log(country);
        const requestUrl = `https://api.openweathermap.org/geo/1.0/direct?${input}&limit=5&appid=${geoKey}`;

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                const output = {
                    lon: data[0].lon,
                    lat: data[0].lat,
                    name: data[0].name,
                    country: data[0].country,
                    state: data[0].state
                };

                getData(output);
            })
    }

    function getData(object) {
        const requestUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${object.lon}&lat=${object.lat}&kinds=cultural,foods&name=${object.name}&apikey=${tripKey}`

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                // createButton(data.features[0].properties.xid, data.features[0].properties.name);
            })
    }
})