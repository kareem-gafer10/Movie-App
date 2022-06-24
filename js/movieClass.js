export class Movie {
    constructor() {
        this.moviesArray = [];
    }

    async #getRequest(url = '') {
        try {
            let response = await fetch(url);
            let responseData = await response.json();
            return responseData.results;
        } catch (error) {
            console.log(error.message);
        }
    }


    async getMoviesByCategory(category) {
        let ApiUrl;
        if (category == "trending") {
            ApiUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`;
        } else {
            ApiUrl = `https://api.themoviedb.org/3/movie/${category}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`;
        }
        let movies = await this.#getRequest(ApiUrl);
        this.moviesArray = movies;
        this.displayMovies(this.moviesArray)
    }

    displayMovies(array) {
        let movies = "";
        array.forEach(element => {
            movies += `    <div class="movie_card col-md-4 col-sm-12 position-relative">
            <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" alt="" srcset="">
            <div class="movie-info h-100 flex-column-center position-absolute">
                <h4>${element.title}</h4>
                <p class="overview"> ${element.overview}</p>
                <span class="my-1">rate : ${element.vote_average} </span>
                <div >${element.release_date}</div>
            </div>
        </div>`;
        });
        $("#moviesRow").html(movies);
    }

 
    searchMovies(searchKey, searchOption) {
    
        let validSearchPattern = /([a-zA-Z0-9])$/;
        if (validSearchPattern.test(searchKey)) {
            let searchedMovies = [];
            let searchLowerCasing = searchKey.toLowerCase();
  
            if (searchOption == "byWord") {
                //  first movie in array has title that equals search value   
                let searchedMovie = this.moviesArray.find(movie => movie.title.toLowerCase() == searchLowerCasing);
                let movieInarray = [searchedMovie];
                this.displayMovies(movieInarray);
            } else {
                // check if any letter of input value eqauls any letter of movie title 
                searchedMovies = this.moviesArray.filter(movie => movie.title.toLowerCase().includes(searchLowerCasing) == true)
                this.displayMovies(searchedMovies);
            }
        } else {
            this.displayMovies(this.moviesArray);
        }
    }

}