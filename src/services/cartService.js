const CART_KEY = "smartCarCart";
const CART_COUNT_KEY = "smartCarCartCount";
const CART_TOTAL_KEY = "smartCarCartTotal";
const CART_UPDATED_KEY = "smartCarCartUpdated";
const CURRENCY_KEY = "smartCarCurrency";

let cart = loadCart();

/**
 * Load the cart from LocalStorage.
 */
function loadCart() {
    try {
        const savedCart = localStorage.getItem(CART_KEY);

        if (!savedCart) {
            return [];
        }

        return JSON.parse(savedCart);
    } catch (error) {
        console.error("Unable to load cart from LocalStorage:", error);
        return [];
    }
}

/**
 * Save cart information to LocalStorage.
 *
 * Five properties are stored:
 * 1. Cart items
 * 2. Cart count
 * 3. Cart total
 * 4. Last updated time
 * 5. Currency
 */
function saveCart() {
    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    localStorage.setItem(
        CART_COUNT_KEY,
        String(cart.length)
    );

    localStorage.setItem(
        CART_TOTAL_KEY,
        String(getTotal())
    );

    localStorage.setItem(
        CART_UPDATED_KEY,
        new Date().toISOString()
    );

    if (!localStorage.getItem(CURRENCY_KEY)) {
        localStorage.setItem(
            CURRENCY_KEY,
            "USD"
        );
    }
}

/**
 * Add a vehicle to the cart.
 */
export function addToCart(vehicle) {
    cart.push(vehicle);

    saveCart();
    updateCartCounter();

    alert(
        `${vehicle.brand} ${vehicle.model} added to cart!`
    );
}

/**
 * Remove a vehicle from the cart.
 */
export function removeFromCart(index) {
    if (
        index >= 0 &&
        index < cart.length
    ) {
        cart.splice(index, 1);

        saveCart();
        updateCartCounter();
    }
}

/**
 * Return all vehicles currently in the cart.
 */
export function getCart() {
    return cart;
}

/**
 * Calculate the total cart price.
 */
export function getTotal() {
    return cart.reduce(
        (total, vehicle) => {
            return total + Number(vehicle.price || 0);
        },
        0
    );
}

/**
 * Clear the entire cart.
 */
export function clearCart() {
    cart = [];

    saveCart();
    updateCartCounter();
}

/**
 * Update the cart counter in the navigation.
 */
function updateCartCounter() {
    const counter = document.getElementById(
        "cart-count"
    );

    if (counter) {
        counter.textContent = `(${cart.length})`;
    }
}

/**
 * Initialize the cart counter when the application loads.
 */
export function initializeCart() {
    updateCartCounter();
}

/**
 * Retrieve saved cart information.
 */
export function getSavedCartInformation() {
    return {
        cart: JSON.parse(
            localStorage.getItem(CART_KEY) || "[]"
        ),

        count: Number(
            localStorage.getItem(CART_COUNT_KEY) || 0
        ),

        total: Number(
            localStorage.getItem(CART_TOTAL_KEY) || 0
        ),

        lastUpdated:
            localStorage.getItem(CART_UPDATED_KEY),

        currency:
            localStorage.getItem(CURRENCY_KEY) || "USD"
    };
}