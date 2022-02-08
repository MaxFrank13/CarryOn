$(function () {
    // **** Selectors ****

    const form = $(".container");
    const searchBtn = $("#search-button");
    const searchInput = $("#searchbar");
    const country = $("#country");
    const state = $("#state");
    const cultural = $("#cultural");
    const foods = $("#foods");
    const natureSports = $("#nature-sports");
    const bg = document.querySelector("body");
    const imageKey = "Eaf6kScI2v8YQdUzjFbCdG3luvlmSVPCkR-ST2jKkIs";

    // **** Event Listeners ****

    form.submit(handleSubmit);

    getImage()

    // **** Functions ****

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
    // **** Api request ****
    function getImage() {
        const requestUrl = `https://api.unsplash.com/search/photos/?query=travel&client_id=${imageKey}`;
        fetch(requestUrl)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data.results);
                bg.style.backgroundImage = `url(${data.results[Math.floor(Math.random() * 10)].urls.regular}`;
            })
    }
})

