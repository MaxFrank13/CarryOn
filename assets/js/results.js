$(function () {
    // **** API keys ****
    const imageKey = "Eaf6kScI2v8YQdUzjFbCdG3luvlmSVPCkR-ST2jKkIs";
    // Open Trip API
    const tripKey = "5ae2e3f221c38a28845f05b6e28e235ac0bcd9dc05b2c8b37c888b48";
    // GeoCode API from Open Weather
    const geoKey = "9e3d200f90a14971a704be16f41dc73c";

    // **** Selectors ****

    const form = $(".input-container");
    const title = $(".title");
    const searchBtn = $("#search-button");
    const searchInput = $("#searchbar");
    const state = $("#state")
    const country = $("#country")
    const cultural = $("#cultural")
    const foods = $("#foods")
    const natureSports = $("#nature-sports");
    const bg = document.querySelector("body");

    const getStorage = JSON.parse(localStorage.getItem("TravelApp")) || [];

    // split string at the '?' and access the value at index 1 (i.e. q=Portland,ME,US&foods) then split again at '&'
    const queryInput = document.location.search.split("?")[1].split("&");

    const cityName = document.location.search.split("?")[1].split("=")[1].split(",")[0];

    if (getStorage.filter(obj => obj.query === document.location.search).length === 0) {
        getStorage.push({
            name: cityName.replaceAll("%20", " "),
            query: document.location.search
        })
    }
    localStorage.setItem("TravelApp", JSON.stringify(getStorage));

    // cut the array into query and its parameters
    const params = queryInput.splice(1);

    // join parameters to use in fetch
    if (params) {
        const newString = params.join(',');
        if (newString) {
            // run the API calls using the query and its parameters
            getCoords(queryInput, newString);
        } else {
            // set default to "kinds=interesting_places"
            getCoords(queryInput, "interesting_places");
        }
    }

    // **** Event Listeners ***

    form.submit(handleSubmit);

    getImage()

    title.click(function () {
        location.assign("./index.html")
    })

    // **** API Request functions ****

    function getCoords(query, params) {
        console.log(country);
        const requestUrl = `https://api.openweathermap.org/geo/1.0/direct?${query}&limit=5&appid=${geoKey}`;

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

                getData(output, params);
            })
    }

    function getData(dataObject, paramString) {
        const requestUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${dataObject.lon}&lat=${dataObject.lat}&kinds=${paramString}&rate=3&apikey=${tripKey}`

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                // initialize an empty array to push feature names to
                const featuresArray = [];
                // for loop to run for as long as features array length is less than 4
                for (let i = 0; featuresArray.length < 5; i++) {

                    if (i === data.features.length) {
                        // end the function if there are less than four features
                        return;
                    }
                    // check array of feature names to see if the current feature is a duplicate
                    if (!featuresArray.includes(data.features[i].properties.name)) {
                        // if it's not duplicate, add the name to the array and then call the XID function
                        featuresArray.push(data.features[i].properties.name);
                        useXID(data.features[i].properties.xid);
                    }
                }
            })
    }

    function useXID(xid) {
        const requestUrl = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${tripKey}`

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                infoCards(data);
            })

    }
    // **** Api request ****
    function getImage() {
        const requestUrl = `https://api.unsplash.com/search/photos/?query=travel&client_id=${imageKey}`;
        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data.results);
                bg.style.backgroundImage = `url(${data.results[Math.floor(Math.random() * 10)].urls.regular}`;
            })
    }


    // **** Rendering Functions ****

    // dynamically created info cards
    function infoCards(data) {
        var newCards = document.getElementById("infocards");
        newCards.classList.add("columns");

        var newCard = document.createElement("div");
        newCard.classList.add("column");
        newCard.classList.add("results");

        // set image to placeholder if there isn't one provided
        var imgSource = '';
        // var imgSource = data.preview.source || "assets/dev-docs/placeholder.jpg";

        if (data.preview) {
            imgSource = data.preview.source;
        } else {
            imgSource = "assets/dev-docs/placeholder.jpg";
            // artist: Dariusz Sankowski
        }

        newCard.innerHTML = `<h4>__________</h4>
        <img class="cards-image" src=${imgSource} alt=${data.name} />
        <p class="cards-name">${data.name}</p>
        <a class="cards-link" href = ${data.otm} target="_blank">Explore more info here!</a>
        <p class="cards-description">${data.wikipedia_extracts.text}</p>`
        newCards.appendChild(newCard);
    }



    function handleSubmit(event) {
        event.preventDefault();

        const searchVal = searchInput.val();
        const countryCode = country.val();
        const stateCode = state.val();
        let queryString = `./results.html?q=${searchVal},${stateCode},${countryCode}`

        if (cultural[0].checked) {
            const culturalBox = cultural[0].value;
            queryString += "&" + culturalBox;
        }
        if (foods[0].checked) {
            const foodslBox = foods[0].value;
            queryString += "&" + foodslBox;
        }
        if (natureSports[0].checked) {
            const natureSportsBox = natureSports[0].value;
            queryString += "&" + natureSportsBox;
        }
        if (!searchVal) {
            console.error("Please provide a search input");
            return;
        }

        location.assign(queryString);

    }
})
