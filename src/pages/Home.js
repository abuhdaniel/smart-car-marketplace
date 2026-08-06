import { vehicles } from "../data/vehicles";
import { VehicleCard, attachCartEvents } from "../components/VehicleCard";

export function Home() {

  const html = `
    <section class="featured">

      <div class="container">

        <h2>Featured Vehicles</h2>

        <div class="vehicle-grid">

          ${vehicles.map(vehicle => VehicleCard(vehicle)).join("")}

        </div>

      </div>

    </section>
  `;

  setTimeout(() => {

    attachCartEvents(vehicles);

  },0);

  return html;

}