import {
    getFavorites,
    removeFavorite,
    clearFavorites
} from "../services/favoriteService";

/**
 * Favorites page.
 *
 * Displays vehicles saved in localStorage.
 */
export function Favorites() {
    return `
        <section class="favorites-page">
            <div class="container">

                <h2>Favorite Vehicles</h2>

                <p>
                    Your favorite vehicles are saved in your browser
                    using localStorage.
                </p>

                <div id="favorites-results">
                    <p>Loading your favorite vehicles...</p>
                </div>

            </div>
        </section>
    `;
}

/**
 * Display favorite vehicles retrieved from localStorage.
 */
export function initializeFavorites() {
    const favoritesContainer =
        document.querySelector("#favorites-results");

    if (!favoritesContainer) {
        return;
    }

    renderFavorites(favoritesContainer);
}

/**
 * Render the favorites list.
 *
 * @param {HTMLElement} container
 */
function renderFavorites(container) {
    const favorites = getFavorites();

    if (favorites.length === 0) {
        container.innerHTML = `
            <div class="empty-favorites">
                <h3>No Favorite Vehicles Yet</h3>

                <p>
                    You have not added any vehicles to your favorites.
                </p>

                <a href="#home" class="btn">
                    Browse Vehicles
                </a>
            </div>
        `;

        return;
    }

    container.innerHTML = `
        <div class="favorites-header">

            <h3>
                Saved Vehicles (${favorites.length})
            </h3>

            <button
                id="clear-favorites"
                class="danger-btn"
                type="button">
                Clear All Favorites
            </button>

        </div>

        <div class="favorite-grid">

            ${favorites.map(vehicle => `
                <article
                    class="favorite-card"
                    data-vehicle-id="${vehicle.vehicleId}">

                    <h3>
                        ${vehicle.make || "Unknown Make"}
                        ${vehicle.model || "Unknown Model"}
                    </h3>

                    <p>
                        <strong>Vehicle ID:</strong>
                        ${vehicle.vehicleId || "N/A"}
                    </p>

                    <p>
                        <strong>Make:</strong>
                        ${vehicle.make || "N/A"}
                    </p>

                    <p>
                        <strong>Model:</strong>
                        ${vehicle.model || "N/A"}
                    </p>

                    <p>
                        <strong>Model Year:</strong>
                        ${vehicle.modelYear || "N/A"}
                    </p>

                    <p>
                        <strong>Price:</strong>
                        ${formatPrice(vehicle.price)}
                    </p>

                    <button
                        class="remove-favorite"
                        data-id="${vehicle.vehicleId}"
                        type="button">
                        Remove Favorite
                    </button>

                </article>
            `).join("")}

        </div>
    `;

    setupFavoriteEvents(container);
}

/**
 * Format vehicle price.
 *
 * @param {number|string} price
 * @returns {string}
 */
function formatPrice(price) {
    if (
        price === undefined ||
        price === null ||
        price === ""
    ) {
        return "N/A";
    }

    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice)) {
        return price;
    }

    return `$${numericPrice.toLocaleString()}`;
}

/**
 * Add event listeners to the favorites page.
 *
 * Events include:
 * - Remove favorite
 * - Clear all favorites
 * - Browse vehicles
 */
function setupFavoriteEvents(container) {

    const removeButtons =
        container.querySelectorAll(".remove-favorite");

    removeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const vehicleId =
                button.dataset.id;

            removeFavorite(vehicleId);

            renderFavorites(container);

        });

    });

    const clearButton =
        container.querySelector("#clear-favorites");

    if (clearButton) {

        clearButton.addEventListener("click", () => {

            const confirmed =
                confirm(
                    "Are you sure you want to remove all favorite vehicles?"
                );

            if (!confirmed) {
                return;
            }

            clearFavorites();

            renderFavorites(container);

        });

    }
}