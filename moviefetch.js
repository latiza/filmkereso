/*Az async kulcsszó a JavaScriptben azt jelzi, hogy egy függvény aszinkron működésű. Az aszinkron függvények lehetővé teszik a kód folytatását anélkül, hogy meg kellene várniuk a hosszabb-rövidebb időtartamú műveleteket, például egy AJAX kérés befejeződését vagy egy fájl olvasását. */
// Az űrlap beküldésének eseménykezelője
document.getElementById("searchForm").addEventListener("submit", async function(event) {
    // Az űrlap beküldésének alapértelmezett viselkedésének megakadályozása
    event.preventDefault();
    // A keresett film címének lekérése az űrlapból
    const keresettFilm = document.getElementById("search").value;
    try {
// Fetch API segítségével az OMDB API-tól adatok lekérése
/*Az await egy kulcsszó a JavaScriptben, amelyet az aszinkron függvényekben használunk. Az aszinkron függvények olyan függvények, amelyek nem blokkolják a további kódfuttatást, hanem "háttérben" futnak. Az await ezen függvényeknél használatos, hogy megvárja az aszinkron művelet (például egy hálózati kérés) befejeződését, mielőtt továbblépne a kód.

A fetch() függvény egy beépített JavaScript függvény, amelyet hálózati kérésekhez használunk. Ezzel a függvénnyel tudunk HTTP kéréseket küldeni (például GET, POST) és válaszokat fogadni a webhelyektől vagy az API-któl.

A példádban az await fetch() használata egy HTTP GET kérést indít el a megadott URL-re, amely egy filmeket kereső API-hoz tartozik (OMDb API). A fetch() függvény elindítja a hálózati kérést, majd az await kulcsszó megvárja, hogy a kérés teljesüljön, mielőtt folytatná a kód futását.  */
        const response = await fetch(`http://www.omdbapi.com/?s=${encodeURI(keresettFilm)}&apiKey=9606ae0f`);
        console.log(response);

        // HTTP válasz ellenőrzése
        if (!response.ok) {
            throw new Error(`HTTP hiba: ${response.statusText}`);
        }
        // JSON válasz feldolgozása
        const data = await response.json();
        console.log(data);
        // Ellenőrizzük, hogy a válasz tartalmazza-e a 'Search' tulajdonságot
        if (data.Search) {
            // Ha igen, meghívjuk a renderFilmek függvényt a filmek megjelenítésére
            renderFilmek(data.Search);
        } else {
            // Ha nincs találat, hibaüzenetet logolunk a konzolon
            console.error("Nincs találat.");
        }
    } catch (error) {
        // Hiba esetén hibaüzenetet logolunk a konzolon
        console.error("Fetch hiba:", error.message);
    }
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

        // Az új kártya hozzáadása a filmek konténeréhez
        filmekContainer.innerHTML += card;
    });
}
