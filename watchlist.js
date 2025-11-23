

document.addEventListener('click', function (e) {
    if (e.target.dataset.id) {
        handleDelete(e.target.dataset.id)
    }
})

function handleDelete(movieId) {
    const movies = JSON.parse(localStorage.getItem('movies'))
    const moviesToKeep = movies.filter(movie => movie.imdbID !== movieId)
    localStorage.setItem('movies', JSON.stringify(moviesToKeep))
    renderMovies()

}

function renderMovies() {
    const movies = JSON.parse(localStorage.getItem('movies'))
    if (movies && movies.length > 0) {
        let html = ''
        movies.forEach(function (movie) {
            html += `
            <div class='film-card'>
                <img src="${movie.Poster}">

                <div class="film-card-info">
                    <div class="film-card-title">
                        <h2 class="title">${movie.Title}</h2>
                        <p class="rating"><i class="star fa-solid fa-star"></i> ${movie.imdbRating}</p>
                    </div>

                    <div class="film-card-duration-genre">
                        <p class="duration">${movie.Runtime}</p>
                        <p class="genre">${movie.Genre}</p>
                        <button data-id='${movie.imdbID}' class="add-to-watchlist"><i class="minus fa-solid fa-circle-minus"></i>  Remove</button>
                    </div>

                    <p class="description">${movie.Plot}</p>
                </div>

            </div>
            `
        })

        document.getElementById('main').innerHTML = html
    } else {
        document.getElementById('main').innerHTML = `
            <p class="empty-watchlist">Your watchlist is looking a little empty...</p>
            <a href="index.html" class="back-to-search"><i class="fa-solid fa-circle-plus"></i> Let's add some movies!</a>
         `
    }


}

renderMovies()
