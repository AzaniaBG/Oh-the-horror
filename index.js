'use strict'

//store API keys in global variables to access for API calls
const omdbKey = "cb95d063"
//const tmdbKey = "b81d09aa5f188c95ba4dc2e4336459b4"
//const YouTubeKey = "AIzaSyD9L4wcH4JuIUXlNkavwNEQl-kH2_MsIOg"

//save API base URLs to modify according to search
const omdbImgURL = "http://img.omdbapi.com/?"
const omdbSearchURL = "http://www.omdbapi.com/?"
//const tmdbURL = "https://api.themoviedb.org/3/"
//config for ID: https://api.themoviedb.org/3/configuration?api_key=b81d09aa5f188c95ba4dc2e4336459b4
//const YouTubeURL = "https://www.googleapis.com/youtube/v3/"
//https://www.googleapis.com/youtube/v3/videos?&part=snippet&fields=items(snippet)&key=AIzaSyD9L4wcH4JuIUXlNkavwNEQl-kH2_MsIOg
//test variables


//format query parameters
    function formatOmdbQueryParams(params) {
    //return an array of keys in the `params` object and, from that array, create a string from each property: key=value, and join the key/value properties with &
        const imageQueryItems = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`);
console.log(`imageQueryItems is ${imageQueryItems}`)
        return imageQueryItems.join("&");

    }

    function getMovieInfo(query) {
        const params = {
            apikey: omdbKey,
            type: "movie",
            s: query,
            page: 1,
        }

        const queryString = formatOmdbQueryParams(params);
        //const imageURL = omdbImgURL + queryString;
        const searchURL = omdbSearchURL + queryString;
//console.log(`imageURL is ${imageURL}`);
console.log(`searchURL is ${searchURL}`)
        fetch(searchURL).then(response => response.json()).then(responseJson => console.log(responseJson));
    }

    
//find similar movies and list results according to maxResults specified
//     function getSimilarMovies(query, maxResults) {
        

//         // const params = {
//         //     q: query,
//         //     maxNum: maxResults,
//         //     part: "snippet",
//         //     type: "video", 
//         //     fields: fieldsParams,
//         //     key: YouTubeKey
//         // }
//     }
// //GET movie images
//     function getMovieId(query) {

//         const params = {
//             query: query,
//             language: "en-US",
//             api_key: tmdbKey,
//             page: 1,
//             include_adult: false,
//             //external_source: "imdb_id",
//             //append_to_response: "images",
//         }
//         //let multiRequest = "&append_to_response=images"
//         const queryString = formatQueryParams(params);
//         const idURL = tmdbURL + `search/movie?`+ queryString;
//         //GET movie ID with fetch
//         fetch(idURL).then(response => response.json()).then(responseJson => getMovieImages(responseJson));      
//     }


// //display information related to search results for one movie
//     function displayMovieInfo(responseJson) {
// console.log(responseJson)
// //         responseJson.items.map(item => {
// //             let vidIds = item.id["videoId"];
// //             getVideos(vidIds);
// //             let titles = item.snippet["title"];
            
// //             let images = item.snippet.thumbnails;
// //             displayMovieInfo(titles, images);       
// // //console.log(`titles is ${titles}`)
// //             });
//     //display movie name and year
// console.log(`<h3>${titles}</h3>`)    
//     //display rating

//     //display additional information (e.g., articles/reviews)   
//     }

//watch the form and get user input
    function watchForm() {   
    //when a user searches for one movie, get the value, include that value in GET request
        $("form").on("submit", event => {
            event.preventDefault();
            let searchTerm = $("#js-one-movie-search").val();
    //capture the values of the user's input and pass those values to the GET function
        getMoviePoster(searchTerm);
            //getMovieSnippets(searchTerm);
//console.log(`searchTerm is ${searchTerm}`)
            }
    //when a user searches for similar movies and max Results, get the value, include those values in GET request

    //capture user's input values and pass them to the GET function: getSimilarMovies(query, maxResults)

        )

    

    }
    
//ACTIVATE APP--call j$ and pass in a callback function to run when the page loads
$(watchForm)