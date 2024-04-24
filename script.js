document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const charactersContainer = document.getElementById("charactersContainer");
    const loader = document.getElementById("loader");

    searchInput.addEventListener("input", function() {
        showLoader();
        searchCharacters();
    });

    function showLoader() {
        loader.style.display = "block";
    }

    function hideLoader() {
        loader.style.display = "none";
    }

    function searchCharacters() {
        const searchTerm = searchInput.value.toLowerCase();
        const url = `https://api.disneyapi.dev/character?name=${encodeURIComponent(searchTerm)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const characters = data.data;
                displayCharacters(characters);
                hideLoader();
            })
            .catch(error => {
                console.error("Error al buscar personajes:", error);
                hideLoader();
            });
    }

    function displayCharacters(characters) {
        charactersContainer.innerHTML = "";
        characters.forEach(character => {
            const card = document.createElement("div");
            card.classList.add("card");
            let cardContent = `<img src="${character.imageUrl}" alt="${character.name}">`;
            cardContent += `<div class="card-info"><h2>${character.name}</h2>`;

            if (character.films.length > 0) {
                cardContent += `<h3>Films:</h3><p>${character.films.join(", ")}</p>`;
            }
            if (character.shortFilms.length > 0) {
                cardContent += `<h3>Short Films:</h3><p>${character.shortFilms.join(", ")}</p>`;
            }
            if (character.tvShows.length > 0) {
                cardContent += `<h3>TV Shows:</h3><p>${character.tvShows.join(", ")}</p>`;
            }
            if (character.videoGames.length > 0) {
                cardContent += `<h3>Video Games:</h3><p>${character.videoGames.join(", ")}</p>`;
            }
            cardContent += `</div>`;
            card.innerHTML = cardContent;
            charactersContainer.appendChild(card);
        });
    }

    searchCharacters(); // Cargar los personajes al abrir la página
});
