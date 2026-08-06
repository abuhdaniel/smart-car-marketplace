import { getCart, getTotal } from "../services/cartService";

export function CartSummary() {

    const cart = getCart();

    if (cart.length === 0) {
        return `
            <section class="cart-summary">
                <div class="container">
                    <h2>Shopping Cart</h2>
                    <p>Your cart is empty.</p>
                </div>
            </section>
        `;
    }

    return `
        <section class="cart-summary">

            <div class="container">

                <h2>Shopping Cart</h2>

                <div class="cart-items">

                    ${cart.map(vehicle => `
                        <div class="cart-item">

                            <h3>${vehicle.brand} ${vehicle.model}</h3>

                            <p>$${vehicle.price.toLocaleString()}</p>

                        </div>
                    `).join("")}

                </div>

                <h2>Total: $${getTotal().toLocaleString()}</h2>

            </div>

        </section>
    `;
}