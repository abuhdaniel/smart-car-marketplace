import { addToCart } from "../services/cartService";

export function VehicleCard(vehicle) {
  return `
    <div class="vehicle-card">

      <img
        src="${vehicle.image}"
        alt="${vehicle.brand} ${vehicle.model}"
      >

      <div class="vehicle-info">

        <h3>${vehicle.brand} ${vehicle.model}</h3>

        <p><strong>Year:</strong> ${vehicle.year}</p>

        <p><strong>Category:</strong> ${vehicle.category}</p>

        <h2>$${vehicle.price.toLocaleString()}</h2>

        <div class="card-buttons">
          <button
            class="cart-btn"
            data-id="${vehicle.id}">
            🛒 Add to Cart
          </button>

          <button class="details-btn">
            View Details
          </button>
        </div>

      </div>

    </div>
  `;
}

export function attachCartEvents(vehicles) {

  const buttons = document.querySelectorAll(".cart-btn");

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      const id = Number(button.dataset.id);

      const vehicle = vehicles.find(v => v.id === id);

      addToCart(vehicle);

    });

  });

}