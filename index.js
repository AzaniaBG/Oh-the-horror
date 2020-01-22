'use strict'

//store API keys in global variables to access for API calls
const omdbKey = "cb95d063"
const tmdbKey = "b81d09aa5f188c95ba4dc2e4336459b4"

//save API base URLs to modify according to search
const omdbSearchURL = "http://www.omdbapi.com/?"//use to get movie ID
const tmdbSearchURL = "https://api.themoviedb.org/3/movie/"//use for ratings, etc.
//config for ID: https://api.themoviedb.org/3/configuration?api_key=b81d09aa5f188c95ba4dc2e4336459b4
const YouTubeURL = "https://www.googleapis.com/youtube/v3/"

//format query parameters
    function formatOmdbQueryParams(params) {
    //return an array of keys in the `params` object and, from that array, create a string from each property: key=value, and join the key/value properties with &
        const imageQueryItems = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`);

        return imageQueryItems.join("&");
    }
    function formatTmdbQueryParams(params) {
        const videoQueryItems = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`);
        return videoQueryItems.join("&");
    }

    function getOmdbMovieInfo(query, num) {
        
        const params = {
            apikey: omdbKey,
            t: query,
            type: "movie",            
            page: num,
        }
        const queryString = formatOmdbQueryParams(params);
        const searchURL = omdbSearchURL + queryString;

        fetch(searchURL)
           .then(response => {
               if(response.ok) {
                return response.json();
               }
               throw new Error(response.statusText);
            })
           .then(responseJson => {
                parseMovieInfo(responseJson, query);
                
            }).catch(err => console.log("Oh the HORROR! Something went wrong :(", err));
    }

    function  getDetailsWithId(id) {
        const params = {
            apikey: omdbKey,
            i: id,
        }
        let queryIdString = formatOmdbQueryParams(params);
        let omdbIdSearchURL = `http://www.omdbapi.com/?` + queryIdString;
        fetch(omdbIdSearchURL).then(response => {
            if(response.ok) {
                return response.json();
            } throw new Error("Oh the HORROR! Something went wrong :(")
            }).then(responseJson => {
        }).catch(err => {
            $("#error-messages").html(err)
        })

    }
    function getYtId(imdbID) {
                const params = {
                api_key: tmdbKey,
                language: "en-US",
                append_to_response: "videos",
            }
            const queryString = formatTmdbQueryParams(params);
            const videoURL = tmdbSearchURL + `${imdbID}/videos?` + queryString;
            fetch(videoURL).then(response => response.json()).then(responseJson => {
                let videos = responseJson.results;
                let ytMatch = videos.filter(video => video["site"] === "YouTube");
                let ytID = ytMatch[0]["key"]
                displayVideoTrailer(ytID);
            })
    }

//find similar movies and list results according to maxResults specified
    function getSimilarMovies(searchInput, maxResults) {

        const parameters = {
            api_key: tmdbKey,
            language: "en-US",
            query: searchInput,
            page: 1,
        }
        const queryString = formatTmdbQueryParams(parameters);
        const tmdbSearchURL = "https://api.themoviedb.org/3/search/movie/?"
        const similarURL = tmdbSearchURL + queryString;
        fetch(similarURL).then(response => response.json()).then(responseJson => {
            let results = responseJson.results;
            let titles = results.map(item => item["title"]);
            //for each result, display the title per the displaySimilarMovies function them in a list item
            displaySimilarMovies(titles, maxResults)            
        })
    }
    function parseMovieInfo(responseJson, query) {

        let movieTitle = responseJson["Title"];
        let movieYear = responseJson["Year"];
        let moviePlot = responseJson["Plot"];
        let imdbRating = responseJson["imdbRating"];
        let imdbID = responseJson["imdbID"];
        displayMovieInfo(movieTitle, movieYear, moviePlot, imdbRating);
        getYtId(imdbID);
        getDetailsWithId(imdbID);       
}

//display information related to search results for one movie
    function displayMovieInfo(title, year, plot, rating) {
        let movieInfoString = `<h3>${title} (${year})</h3><p> IMDB Rating: ${rating}</p>
        <aside>${plot}</aside>`;
        $("#one-movie-description").html(movieInfoString);
    }

    function displayVideoTrailer(ytID) {

        let trailer = `https://www.youtube.com/embed/${ytID}?enablejsapi=1&origin=https://m.media-amazon.com/images/M/MV5BMTUyNzkwMzAxOF5BMl5BanBnXkFtZTgwMzc1OTk1NjE@._V1_SX300.jpg`
        let iFrameElement = `<iFrame id="iFrame-player" type="text/html" width="200" height="200"src="${trailer}"></iFrame>`
        $("#iFrame-player").html(iFrameElement);    
    }

    function displaySimilarMovies(movies, maxResults) {
        $("li").detach();
        for(let i = 0; i < maxResults; i++) {
            let movie = `<li>${movies[i]}</li>`;
            $("ul").append(movie);         
        }
    }

    function handleOneSearchButton() {
        $("#js-search-one").on("click", event => {
            event.preventDefault();
            
            $("#js-search-one").hide();
            $("#one-movie-search").show();
            //$("#js-multiSearch-button").toggleClass("hidden");
        });
    }
    function handleMultiSearchButton() {
        $("#js-multi-search-button").on("click", event => {
            event.preventDefault();
            
            $("#js-multi-search-button").hide();
            $("#js-search-one").hide();
            $("#similar-movies-search").show();
        });
    }
    function handleOneSubmitButton() {
        $("#js-one-movie-search-button").on("click", event => {
            event.preventDefault();
            let searchTerm = $("#js-one-movie-search").val();
            //empty search results in order to permit new search 
            $("#js-one-movie-search").val("");
            getOmdbMovieInfo(searchTerm, 10);
            $("#one-movie-search").show();
            $("#js-one-movie-results").show();
            $("#js-new-search-one-movie-screen").show(); 
            $("#js-new-search-similars-screen").show();
        });
    }
    function handleNewSearchForOne() {
        $("#js-one-movie-search-button").on("click", event => {
            event.preventDefault();
            let searchTerm = $("#js-one-movie-search").val();
            //empty search results in order to permit new search 
            $("#js-one-movie-search").val("");
            getOmdbMovieInfo(searchTerm, 10);
            $("#js-new-search-one-movie-screen").hide(); 
            $("#js-new-search-similars-screen").hide();
            $("#similar-movies-search").hide();
        });
    }

    function handleNewSearchForMany() {
        

    }

    function handleMultiSubmitButton() {
        $("#js-multi-search-button").on("click", event => {
            event.preventDefault();
            let multiSearchTerm = $("#js-similar-movies").val();
            let maxResults = $("#js-max-results").val();
            $("#js-similar-movies").val("");
            
            getSimilarMovies(multiSearchTerm, maxResults);
            $("#js-new-search-one-movie-screen").hide(); 
            $("#js-new-search-similars-screen").hide();
            $("#one-movie-search").hide();
            $("#js-one-movie-results").hide();     
            $("#js-similar-movie-results").show();
            $("#js-new-search-one-movie-screen").show(); 
            $("#js-new-search-similars-screen").show();
        })
    }
    

    function initApp() {
        handleOneSearchButton();
        handleOneSubmitButton();
        handleMultiSearchButton();
        handleMultiSubmitButton();

    }
    
//ACTIVATE APP--call j$ and pass in a callback function to run when the page loads
$(initApp)