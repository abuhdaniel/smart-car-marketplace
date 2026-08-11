import { addToCart } from "../services/cartService";
import {
    addFavorite,
    isFavorite
} from "../services/favoriteService";


export function VehicleCard(vehicle) {

    const favorite = isFavorite(vehicle.id);

    return `
        <article class="vehicle-card">

            <img
                src="${vehicle.image}"
                alt="${vehicle.brand} ${vehicle.model}"
            >

            <div class="vehicle-info">

                <h3>
                    ${vehicle.brand} ${vehicle.model}
                </h3>

                <p>
                    <strong>Year:</strong>
                    ${vehicle.year}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${vehicle.category}
                </p>

                <h2>
                    $${vehicle.price.toLocaleString()}
                </h2>

                <div class="card-buttons">

                    <button
                        type="button"
                        class="cart-btn"
                        data-id="${vehicle.id}"
                    >
                        🛒 Add to Cart
                    </button>

                    <button
                        type="button"
                        class="favorite-btn"
                        data-id="${vehicle.id}"
                    >
                        ${favorite ? "❤️ Favorited" : "♡ Add to Favorites"}
                    </button>

                    <button
                        type="button"
                        class="details-btn"
                        data-id="${vehicle.id}"
                    >
                        View Details
                    </button>

                </div>

            </div>

        </article>
    `;
}


/**
 * Attach cart and favorite events.
 */
export function attachCartEvents(vehicles) {

    /*
     * ADD TO CART
     */
    const cartButtons =
        document.querySelectorAll(".cart-btn");

    cartButtons.forEach(button => {

        button.addEventListener("click", () => {

            const id =
                Number(button.dataset.id);

            const vehicle =
                vehicles.find(
                    vehicle => vehicle.id === id
                );

            if (vehicle) {
                addToCart(vehicle);
            }

        });

    });


    /*
     * ADD TO FAVORITES
     */
    const favoriteButtons =
        document.querySelectorAll(".favorite-btn");

    favoriteButtons.forEach(button => {

        button.addEventListener("click", () => {

            const id =
                Number(button.dataset.id);

            const vehicle =
                vehicles.find(
                    vehicle => vehicle.id === id
                );

            if (vehicle) {

                addFavorite(vehicle);

                button.textContent =
                    "❤️ Favorited";

            }

        });

    });

}