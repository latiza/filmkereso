// Az űrlap beküldésének eseménykezelője
document.getElementById("searchForm").addEventListener("submit", function(event) {
    // Az űrlap beküldésének alapértelmezett viselkedésének megakadályozása
    event.preventDefault();

    // A keresett film címének lekérése az űrlapból
    const keresettFilm = document.getElementById("search").value;

    // XMLHttpRequest objektum létrehozása
    const xhr = new XMLHttpRequest();

    /* Az OMDB API URL összeállítása a keresett film alapján
    az encodeURI() beépített function átalakítja az URL-t kompatibilis formára
    */
    const url = `http://www.omdbapi.com/?s=${encodeURI(keresettFilm)}&apiKey=9606ae0f`;
console.log(url);
    // Az AJAX kérés beállítása
    xhr.open("GET", url, true);

    // Az AJAX kérés sikeres befejeződésekor fut le
    xhr.onload = function() {
        // Ellenőrizzük, hogy a válasz státusza 200-as (OK)
        if (xhr.status == 200) {
            console.log(xhr.responseText);
            // JSON válasz feldolgozása
            const response = JSON.parse(xhr.responseText);
            console.log(response);

            // Ellenőrizzük, hogy a válasz tartalmazza-e a 'Search' tulajdonságot
            if (response.Search) {
                // Ha igen, meghívjuk a renderFilmek függvényt a filmek megjelenítésére
                renderFilmek(response.Search);
            } else {
                // Ha nincs találat, hibaüzenetet logolunk a konzolon
                console.error("Nincs találat.");
            }
        } else {
            // Ha a státusz nem 200, hibaüzenetet logolunk a konzolon
            console.error("AJAX hiba:", xhr.statusText);
        }
    };

    // Az AJAX kérés során bekövetkező hibák kezelése
    xhr.onerror = function() {
        console.error("AJAX hiba");
    };

    // Az AJAX kérés elküldése
    xhr.send();
});

// Filmek megjelenítése a weboldalon
function renderFilmek(films) {
    // A filmek konténerének kiválasztása a DOM-ból
    const filmekContainer = document.getElementById("filmek");

    // Előző filmek törlése a filmek konténeréből
    filmekContainer.innerHTML = "";

    // Minden filmre kártya létrehozása és hozzáadása a filmek konténeréhez
    films.forEach(function(film) {
        const card = `
            <div class="col-lg-3 col-md-4 mb-3">
                <div class="card">
                    <img src="${film.Poster}" class="card-img-top" alt="Film poszter">
                    <div class="card-body">
                        <h5 class="card-title">${film.Title}</h5>
                        <p class="card-text">${film.Year}</p>
                    </div>
                </div>
            </div>
        `;

        /* Az új kártya hozzáadása a filmek konténeréhez
        fontos legyen egyenlő önmagával és a következő értékkel különben csak az utolsó elemet jeleníti meg.*/
        filmekContainer.innerHTML += card;
    });
}
