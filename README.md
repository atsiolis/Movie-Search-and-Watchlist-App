# 🎬 Noteboxd: Movie Search & Watchlist App

## Project Overview

**Noteboxd** is a two-page, client-side web application designed to help users search for movies and manage a personal watchlist. Built with plain JavaScript, the application uses the **OMDB API** for data and **Local Storage** for persistent watchlist management. It showcases robust asynchronous logic, strong state persistence, and a modern dark-mode user interface.

The application is split into two primary pages:

1.  **Search Page** (`index.html`): For looking up movies.
2.  **Watchlist Page** (`watchlist.html`): For viewing and managing saved movies.

-----

## ✨ Key Features

  * **Dynamic Search:** Search for any movie title and instantly fetch results from the OMDB API.
  * **Persistent Watchlist:** Movies are saved using **Browser Local Storage** and persist across sessions.
  * **Immediate UX Feedback:** The "Watchlist" button instantly updates to **"Added\!"** and is disabled upon click, providing clear confirmation.
  * **Persistent State:** Search results correctly render the **"Added\!"** status for movies already in the watchlist.
  * **Robust Error Handling:** API calls are wrapped in `try...catch` blocks to gracefully handle network failures or bad API responses.
  * **Input Handling:** Supports both button click and the **`Enter` key** for submitting searches.
  * **Clean Design:** Modern **Dark Mode** aesthetic utilizing Flexbox for responsive layout.

-----

## 💻 Technology Stack

  * **HTML5**
  * **CSS3** (Custom Styling & Flexbox)
  * **JavaScript (ES6+):** Asynchronous programming (`fetch`, `async`/`await`, `Promise.all`)
  * **OMDB API**
  * **Local Storage** (Client-side persistence)
  * **Font Awesome** (Iconography)

-----

## ⚙️ Setup and Installation

1.  **Obtain an OMDB API Key:**

      * Register for a free API key at the [OMDB API website](https://www.omdbapi.com/apikey.aspx).

2.  **Configure API Key:**

      * In the project's root directory, create a new file named `key.js`.
      * Add the following JavaScript code to `key.js`, replacing the placeholder with your actual key:
        ```
        export const key = "YOUR_OMDB_API_KEY_HERE" 
        ```

3.  **Run the Application:**

      * Open `index.html` in your web browser. (Using a live server extension, such as in VS Code, is recommended for local development.)

-----

## 📖 Usage

### Search Page (`index.html`)

1.  Enter a movie title in the search bar.
2.  Press **`Enter`** or click the **Search** button.
3.  Click the **"Watchlist"** button to save a movie. The button will immediately disable and show **"Added\!"**.

### Watchlist Page (`watchlist.html`)

1.  Click **"My Watchlist"** in the header.
2.  View all your saved movies.
3.  Click the **"Remove"** button on any movie card to instantly delete it from your persistent list.
