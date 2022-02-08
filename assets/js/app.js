$(function () {
    // **** Selectors ****

    const form = $("#card");
    const searchBtn = $("#search-button");
    const searchInput = $("#searchbar");
    const country = $("#country");
    const state = $("#state");
    const cultural = $("#cultural");
    const foods = $("#foods");
    const transport = $("#transport");
    const bg = document.querySelector("body");
    const imageKey = "Eaf6kScI2v8YQdUzjFbCdG3luvlmSVPCkR-ST2jKkIs";

    // **** Event Listeners ****

    searchBtn.click(handleSubmit);

    getImage()

    // **** Functions ****

    function handleSubmit(event) {
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
        if (transport[0].checked) {
            const transportBox = transport[0].value;
            queryString += "&" + transportBox;
        }
        location.assign(queryString);
        if (!searchVal) {
            console.error("Please provide a search input");
            return;
        }

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

