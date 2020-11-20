// we declare our JSON movie array
let movies = [{
        "title": "Guardians of the Galaxy",
        "youtube_id": "d96cjJhvlMA"
    },
    {
        "title": "Inception",
        "youtube_id": "YoHD9XEInc0"
    },
    {
        "title": "Avatar",
        "youtube_id": "6ziBFh3V1aM"
    },
    {
        "title": "Tenet",
        "youtube_id": "L3pk_TBkihU"
    },
    {
        "title": "The Avengers",
        "youtube_id": "eOrNdBpGMv8"
    },
    {
        "title": "The Hitchhiker's Guide to the Galaxy",
        "youtube_id": "eLdiWe_HJv4"
    },
    {
        "title": "Dune",
        "youtube_id": "WHh8dzxTSNw"
    },
    {
        "title": "Interstellar ",
        "youtube_id": "zSWdZVtXT7E"
    },
    {
        "title": "The Matrix ",
        "youtube_id": "vKQi3bBA1y8"
    },

    {
        "title": "Star Wars: Episode IV - A New Hope",
        "youtube_id": "vZ734NWnAHA"
    }
]

// we create an empty backtick template for the overview and the detailes
let overviewDesktop = "";
let detailDesktop = "";
// we iterate trough our JSON movie list
for (i = 0; i < movies.length; i++) {
    // we declare a variable to iterate the key:value pairs of our JSON list
    let movie = movies[i];
    // use the OMDB API to fetch the details for our movies - loop trough 10 times (the length of our list)
    fetch('https://www.omdbapi.com/?apikey=d595964e&t=' + movies[i].title)
        .then((response) => response.json())
        .then((data) => {
            // we append the empty template with each loop (append each movie)
            overviewDesktop += `
                <article>
                    <a onclick="showDetail(${data.imdbID})" ><img src="${data.Poster}" alt=""></a>
                    <h2>${data.Title}</h2>
                </article>
                `;
            detailDesktop += `
                <article id="${data.imdbID}" class="detailWindow">
            <div class="detailContent">
            <div class="poster">
                <img src="${data.Poster}" alt="">
            </div>
            <div class="info">
                <h2>${movie.title}</h2>
                <br>
                <p><b>Years since release:</b> ${yearDiff(data.Released)}</p>
                <p><b>Director:</b> ${data.Director}</p>
                <p><b>Runtime:</b> ${data.Runtime}</p>
                <p><b>Metascore:</b> ${data.Metascore}</p>
                <p><b>imdbRating:</b> ${data.imdbRating}</p>
                <br>
                <div class="plot">
                <h3>Plot</h3>
                <p>${data.Plot}</p>
            </div>
            </div>
            <div class="trailer">
                <iframe src="https://www.youtube.com/embed/${movie.youtube_id}"></iframe>
            </div>
            <a onclick="hideDetail(${data.imdbID})" class="close">&times;</a>
            </div>
            </article>
                `;
            // we apply the template to the HTML elements of the DOM
            document.querySelector("#content").innerHTML = overviewDesktop;
            document.querySelector("#detail").innerHTML = detailDesktop;
            // hiding details window
            document.querySelector(".detailWindow").style.display = "none";
        })
        .catch((error) => {
            console.log(error);
        });
}

// in the backtick template we call this function (onclick event) to show the details window of each movie
function showDetail(test) {
    test.style.display = "block";
}
// in the backtick template we call this function (onclick event) to hide the details window of each movie
function hideDetail(test) {
    test.style.display = "none";
}

function yearDiff(year) {
    // strip the last 4 characters from the Released string from the OMDB JSON - "Released":"16 Jul 2010" for example
    let strip_year = year.substring(year.length - 4);
    // convert the string to int
    let b = parseInt(strip_year, 10);
    // get the current year
    let todaysDate = new Date().getFullYear();
    // parse the current year to integer
    let c = parseInt(todaysDate, 10);
    // substract the released year from the current year 
    let result = c - b;
    return result;
}
// used for smooth scrolling on the anchor tags
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
