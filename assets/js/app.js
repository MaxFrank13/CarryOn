$(function () {
    // **** Selectors ****

    const form = $("#card");
    const searchBtn = $("#search-button");
    const searchInput = $("#searchbar");
    const country = $("#country")
    const state = $("#state")
    const kindsFoods = true; // value grabbed when form is submitted
    const kindsCulture = false; // value grabbed when form is submitted
    const kindsTransportation = false; // value grabbed when form is submitted

    // **** Event Listeners ****

    searchBtn.click(handleSubmit);

    // **** Functions ****

    function handleSubmit(event) {
        const searchVal = searchInput.val();
        const countryCode = country.val();
        const stateCode = state.val();

        if (!searchVal) {
            console.error("Please provide a search input");
            return;
        }
        const queryString = `./results.html?q=${searchVal},${stateCode},${countryCode}`
        location.assign(queryString);
    }
})
