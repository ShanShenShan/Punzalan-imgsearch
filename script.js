//declaration of accessKey variable
const accessKey = "0Vx01ednVqNaeCJ9lEi1GnuO8ZN9CeKywwDlSfUD2J4"

//declaration of HTML variables
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;
const resultsPerPage = 12; // Set the number of results per page


const randomizeSearchButton = document.getElementById("randomize-search-button");

// Function to generate a random keyword
function generateRandomKeyword() {
const keywords = ["nature", "technology", "architecture", "animals", "food", "travel", "music", "fitness", "science", "art", "fashion", "sports","ocean", "space", "books", "movies", "gaming", "history", "culture", "adventure", "health", "coffee", "dance", "friends","mountains", "sky", "cars", "coding", "photography", "sunset", "beauty", "education", "gardening", "cooking", "pets", "hiking"]
; // Add more keywords as needed
const randomIndex = Math.floor(Math.random() * keywords.length);
return keywords[randomIndex];
}

// Event listener for the randomize search button
randomizeSearchButton.addEventListener("click", () => {
const randomKeyword = generateRandomKeyword();
inputEl.value = randomKeyword;
page = 1;
searchImages();
});




//function for Image Search
async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&per_page=${resultsPerPage}&query=${inputData}&client_id=${accessKey}`;


    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }
    //Mapping the results from Unsplash
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    })
    //Show more pages
    page++;
    if(page > 1){
        showMore.style.display = "block";
    }
}


//function for Submit
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});
//function for the Search button
showMore.addEventListener("click", () => {
    searchImages();
});