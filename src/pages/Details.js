import { getVehicleDetails } from "../services/vehicleService";

/**
 * Display vehicle details.
 */
export function Details() {
    return `
        <section class="vehicle-details">
            <div class="container">

                <h2>Vehicle JSON Data</h2>

                <p>
                    Detailed vehicle and safety information
                    retrieved dynamically from the NHTSA API.
                </p>

                <div id="vehicle-details">
                    <p>Loading vehicle information...</p>
                </div>

            </div>
        </section>
    `;
}

/**
 * Initialize the vehicle details page.
 */
export async function initializeDetails(
    modelYear,
    make,
    model
) {
    const container =
        document.querySelector("#vehicle-details");

    if (!container) {
        return;
    }

    try {
        container.innerHTML = `
            <p>Loading ${make} ${model} information...</p>
        `;

        const data = await getVehicleDetails(
            modelYear,
            make,
            model
        );

        const vehicle = data.vehicle;
        const ratings = data.ratings;

        const rating = ratings[0] || {};

        console.log("Vehicle JSON:", vehicle);
        console.log("Safety Ratings JSON:", rating);

        container.innerHTML = `
            <div class="details-card">

                <h3>
                    ${make} ${model}
                </h3>

                <p>
                    <strong>Model Year:</strong>
                    ${modelYear}
                </p>

                <p>
                    <strong>Make:</strong>
                    ${make}
                </p>

                <p>
                    <strong>Model:</strong>
                    ${model}
                </p>

                <p>
                    <strong>Vehicle ID:</strong>
                    ${vehicle.VehicleId ?? "N/A"}
                </p>

                <p>
                    <strong>Vehicle Description:</strong>
                    ${vehicle.VehicleDescription ?? "N/A"}
                </p>

                <hr>

                <h3>Safety Ratings</h3>

                <div class="rating-grid">

                    <div class="rating-item">
                        <strong>Overall Rating</strong>
                        <span>
                            ${rating.OverallRating ?? "N/A"}
                        </span>
                    </div>

                    <div class="rating-item">
                        <strong>Overall Front Crash</strong>
                        <span>
                            ${rating.OverallFrontCrashRating ?? "N/A"}
                        </span>
                    </div>

                    <div class="rating-item">
                        <strong>Front Crash Driver</strong>
                        <span>
                            ${rating.FrontCrashDriversideRating ?? "N/A"}
                        </span>
                    </div>

                    <div class="rating-item">
                        <strong>Front Crash Passenger</strong>
                        <span>
                            ${rating.FrontCrashPassengerRating ?? "N/A"}
                        </span>
                    </div>

                    <div class="rating-item">
                        <strong>Side Crash</strong>
                        <span>
                            ${rating.SideCrashRating ?? "N/A"}
                        </span>
                    </div>

                    <div class="rating-item">
                        <strong>Side Crash Driver</strong>
                        <span>
                            ${rating.SideCrashDriversideRating ?? "N/A"}
                        </span>
                    </div>

                    <div class="rating-item">
                        <strong>Side Crash Passenger</strong>
                        <span>
                            ${rating.SideCrashPassengerRating ?? "N/A"}
                        </span>
                    </div>

                    <div class="rating-item">
                        <strong>Rollover Rating</strong>
                        <span>
                            ${rating.RolloverRating ?? "N/A"}
                        </span>
                    </div>

                    <div class="rating-item">
                        <strong>Rollover Possibility</strong>
                        <span>
                            ${rating.RolloverPossibility ?? "N/A"}
                        </span>
                    </div>

                    <div class="rating-item">
                        <strong>Electronic Stability Control</strong>
                        <span>
                            ${rating.NHTSAElectronicStabilityControl ?? "N/A"}
                        </span>
                    </div>

                    <div class="rating-item">
                        <strong>Dynamic Tip Result</strong>
                        <span>
                            ${rating.DynamicTipResult ?? "N/A"}
                        </span>
                    </div>

                </div>

            </div>
        `;

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="error-message">

                <h3>
                    Unable to retrieve vehicle information.
                </h3>

                <p>
                    Please try selecting another vehicle.
                </p>

            </div>
        `;
    }
}