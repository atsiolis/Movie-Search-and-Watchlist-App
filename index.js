import { key } from './key.js'


document.addEventListener('click', function (e) {
    if (e.target.id === 'search-btn') {
        handleSearch()
    }
    if (e.target.dataset.id) {
        handleSave(e.target)
    }
})

document.getElementById('search').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
    }
})

async function handleSave(target) {
    const movieId = target.dataset.id
    try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${movieId}&plot=short`)
        
        //Check for non-200 responses (e.g., 401, 404, etc.)
        if (!res.ok) {
            throw new Error(`Failed to fetch movie details: HTTP Status ${res.status}`);
        }

        const movie = await res.json()
        const moviesArr = JSON.parse(localStorage.getItem('movies')) || []

        const movieExists = moviesArr.filter(function (movie) {
            return movie.imdbID === movieId
        })
        if (movieExists.length > 0) {
            target.textContent = 'Added!'
            target.disabled = true
            return
        }
        
        target.textContent = 'Added!'
        target.disabled = true
        moviesArr.push(movie)
        localStorage.setItem('movies', JSON.stringify(moviesArr))

    } catch (error) {
        console.error("Error saving movie:", error);
        // Provide user feedback for critical failure
        alert("Failed to add movie due to a network or API error. Please try again.");
    }
}

async function handleSearch() {
    const searchTitle = document.getElementById('search').value
    const mainElement = document.getElementById('main')
    
    // Clear the main area before searching to show activity
    mainElement.innerHTML = ''; 

    try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${searchTitle}`)
        
        // 1. Check for non-200 responses
        if (!res.ok) {
            throw new Error(`Search failed: HTTP Status ${res.status}`);
        }
        
        const movies = await res.json()
        
        if (movies.Search) {
            renderMovies(movies.Search)
        } else {
            // Handle case where API call succeeds but returns no results
            mainElement.innerHTML = `
            <p class="empty-watchlist">
                Unable to find what you're looking for. Please try another search.
            </p>
            `
        }

    } catch (error) {
        console.error("Error during search:", error);
        // 2. Handle network or critical API error
        mainElement.innerHTML = `
            <p class="empty-watchlist">
                Sorry, a critical error occurred while searching. Please check your connection or API key.
            </p>
        `
    }
}

async function renderMovies(movies) {
    const moviesArr = JSON.parse(localStorage.getItem('movies')) || []
    const mainElement = document.getElementById('main')
    
    const uniqueMovies = movies.filter(function (movie, index, array) {
        return index === array.findIndex(item => item.imdbID === movie.imdbID)
    });

    console.log(uniqueMovies);

    try {
        const movieHtmlPromises = uniqueMovies.map(async function (film) {
            const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&t=${film.Title}&plot=short`)
            
            // Handle individual movie detail fetch failure (prevents Promise.all from failing)
            if (!res.ok) {
                console.error(`Skipping movie due to fetch error: ${film.Title}`);
                return `<div class='film-card'><p class="description">Error loading details for: ${film.Title}.</p></div>`;
            }
            
            const movie = await res.json()

            let buttonText = `<button data-id='${movie.imdbID}' class="add-to-watchlist"><i class="plus fa-solid fa-circle-plus"></i> Watchlist</button>`
            if (moviesArr.filter(item => item.imdbID === movie.imdbID).length > 0) {
                buttonText = `<button data-id='${movie.imdbID}' class="add-to-watchlist" disabled>Added!</button>`
            }
            return `
            <div class='film-card'>
                <img class='movie' src="${movie.Poster}">

                <div class="film-card-info">
                    <div class="film-card-title">
                        <h2 class="title">${movie.Title}</h2>
                        <p class="rating"><i class="star fa-solid fa-star"></i> ${movie.imdbRating}</p>
                    </div>

                    <div class="film-card-duration-genre">
                        <p class="duration">${movie.Runtime}</p>
                        <p class="genre">${movie.Genre}</p>
                        ${buttonText}
                    </div>

                    <p class="description">${movie.Plot}</p>
                </div>

            </div>
            `
        })

        const movieHtmlArray = await Promise.all(movieHtmlPromises);
        const html = movieHtmlArray.join('');
        mainElement.innerHTML = html;
        
    } catch (error) {
        console.error("Error rendering movies batch:", error);
        // Final fallback for critical Promise.all failure
        mainElement.innerHTML = `
            <p class="empty-watchlist">
                An unexpected error occurred while displaying results.
            </p>
        `;
    }
}