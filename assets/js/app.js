$(function () {
    // **** Selectors ****

    const form = $(".container");
    const searchBtn = $("#search-button");
    const searchInput = $("#searchbar");
    const country = $("#country");
    const state = $("#state");
    const cultural = $("#cultural");
    const foods = $("#foods");
    const transport =$("#transport");
   

    // **** Event Listeners ****

    form.submit(handleSubmit);

    // **** Functions ****

    function handleSubmit(event) {
        event.preventDefault();
        
        const searchVal = searchInput.val();
        const countryCode = country.val();
        const stateCode = state.val();
        let queryString = `./results.html?q=${searchVal},${stateCode},${countryCode}`

        if (cultural[0].checked){ 
            const culturalBox = cultural[0].value;
           queryString +=  "&"+culturalBox;
        }
        if (foods[0].checked){ 
            const foodslBox = foods[0].value;
           queryString +=  "&"+foodslBox;
        }
        if (transport[0].checked){ 
            const transportBox = transport[0].value;
           queryString +=  "&"+transportBox;
        }
        if (!searchVal) {
            console.error("Please provide a search input");
            return;
        }
        location.assign(queryString);

    }
})
