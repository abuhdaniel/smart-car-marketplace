const FAVORITES_KEY = "smartCarFavorites";

/**
 * Get all favorite vehicles from LocalStorage.
 */
export function getFavorites() {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);

    if (!storedFavorites) {
        return [];
    }

    try {
        return JSON.parse(storedFavorites);
    } catch (error) {
        console.error("Unable to read favorites:", error);
        return [];
    }
}

/**
 * Save a vehicle to favorites.
 *
 * We store several properties:
 * id, brand, model, year, and price.
 */
export function addFavorite(vehicle) {
    const favorites = getFavorites();

    const alreadyFavorite = favorites.some(
        favorite => favorite.id === vehicle.id
    );

    if (alreadyFavorite) {
        alert(`${vehicle.brand} ${vehicle.model} is already in your favorites.`);
        return;
    }

    const favoriteVehicle = {
        id: vehicle.id,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price
    };

    favorites.push(favoriteVehicle);

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );

    alert(`${vehicle.brand} ${vehicle.model} added to favorites!`);
}

/**
 * Remove a vehicle from favorites.
 */
export function removeFavorite(vehicleId) {
    const favorites = getFavorites();

    const updatedFavorites = favorites.filter(
        favorite => favorite.id !== Number(vehicleId)
    );

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
    );
}

/**
 * Check whether a vehicle is already a favorite.
 */
export function isFavorite(vehicleId) {
    const favorites = getFavorites();

    return favorites.some(
        favorite => favorite.id === Number(vehicleId)
    );
}

/**
 * Clear all favorites.
 */
export function clearFavorites() {
    localStorage.removeItem(FAVORITES_KEY);
}