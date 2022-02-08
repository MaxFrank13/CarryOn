$(function () {
    // **** Selectors ****

    const form = $(".container");
    const searchBtn = $("#search-button");
    const searchInput = $("#searchbar");
    const historyHeader = $(".history-header")
    const historyList = $(".search-list")
    const country = $("#country");
    const state = $("#state");
    const cultural = $("#cultural");
    const foods = $("#foods");
    const natureSports = $("#nature-sports");
    const bg = document.querySelector("body");
    const imageKey = "Eaf6kScI2v8YQdUzjFbCdG3luvlmSVPCkR-ST2jKkIs";

    // **** Event Listeners ****

    const getStorage = JSON.parse(localStorage.getItem("TravelApp"));

    getImage();
    
    if (getStorage) displayHistory(getStorage);
    
    form.submit(handleSubmit);

    historyHeader.click(dropDownHistory);

    historyList.click(handleHistoryClick)

    

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

    function displayHistory(array) {
        array.forEach(obj => {
            const newListItem = document.createElement("li");
            newListItem.dataset.query = obj.query;
            newListItem.classList.add("list-item")

            const searchParams = obj.query.split("&");
            let infoText = obj.name;
            searchParams.forEach((param, index) => {
                if (index > 0) {
                    infoText += " - " + param;
                }
            })
            
            newListItem.textContent = infoText;
            historyList.append(newListItem);
        })
    }

    function dropDownHistory() {
        historyList.toggle("hide-history");
    }

    function handleHistoryClick(event) {
        if (event.target.classList.contains("list-item")){
            location.assign(`./results.html${event.target.dataset.query}`)
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
                bg.style.background = `linear-gradient(rgba(226, 180, 154, 0.205), rgba(17, 42, 153, 0.233)), url(${data.results[Math.floor(Math.random() * 10)].urls.regular}) center/cover`;
            })
    }
})

