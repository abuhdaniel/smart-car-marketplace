import "./assets/css/main.css";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";

import {
    Home,
    initializeVehicleAPI
} from "./pages/Home";

import {
    Compare,
    initializeCompare
} from "./pages/Compare";

import {
    Favorites,
    initializeFavorites
} from "./pages/Favorites";

/**
 * Render the application based on the URL hash.
 */
function renderApp() {

    const app = document.querySelector("#app");

    if (!app) {
        console.error(
            "Application container #app was not found."
        );

        return;
    }


    /*
     * Get the current page.
     *
     * Example:
     * #home
     * #favorites
     * #compare
     */
    const page =
        window.location.hash.replace("#", "") || "home";


    /*
     * FAVORITES PAGE
     */
    if (page === "favorites") {

        app.innerHTML = `
            ${Navbar()}

            ${Favorites()}

            ${Footer()}
        `;

        initializeFavorites();

        return;
    }


    /*
     * HOME PAGE
     */
    if (
        page === "home" ||
        page === "vehicles" ||
        page === ""
    ) {

        app.innerHTML = `
            ${Navbar()}

            ${Hero()}

            ${Home()}

            ${Footer()}
        `;

        initializeVehicleAPI();

        return;
    }


    /*
     * COMPARE PAGE
     */
    if (page === "compare") {

    app.innerHTML = `
        ${Navbar()}

        ${Compare()}

        ${Footer()}
    `;

    initializeCompare();

    return;
}

    /*
     * CART PAGE
     */
    if (page === "cart") {

        app.innerHTML = `
            ${Navbar()}

            <main>
                <section class="container">
                    <h1>Shopping Cart</h1>

                    <p>
                        Your selected vehicles
                        will appear here.
                    </p>
                </section>
            </main>

            ${Footer()}
        `;

        return;
    }


    /*
     * ABOUT PAGE
     */
    if (page === "about") {

        app.innerHTML = `
            ${Navbar()}

            <main>
                <section class="container">
                    <h1>About Smart Car Marketplace</h1>

                    <p>
                        Smart Car Marketplace helps users
                        explore vehicles, compare models,
                        save favorites, and discover
                        vehicle information using the
                        NHTSA Vehicle Safety API.
                    </p>
                </section>
            </main>

            ${Footer()}
        `;

        return;
    }


    /*
     * Unknown page.
     * Return to Home.
     */
    window.location.hash = "#home";
}


/**
 * Listen for navigation changes.
 */
window.addEventListener(
    "hashchange",
    renderApp
);


/**
 * Render the application initially.
 */
renderApp();