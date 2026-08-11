import { vehicles } from "../data/vehicles";
import {
    VehicleCard,
    attachCartEvents
} from "../components/VehicleCard";

import {
    getVehicleMakes,
    getVehicleModels,
    getVehicleVariants,
    getVehicleDetails
} from "../services/vehicleService";


/**
 * Home Page
 */
export function Home() {
    return `
        <main>

            <!-- Featured Vehicles -->
            <section class="featured-vehicles">

                <div class="container">

                    <h2>Featured Vehicles</h2>

                    <div class="vehicle-grid">

                        ${vehicles
                            .map(vehicle => VehicleCard(vehicle))
                            .join("")}

                    </div>

                </div>

            </section>


            <!-- NHTSA API -->
            <section class="api-vehicles">

                <div class="container">

                    <h2>Explore Vehicles</h2>

                    <p>
                        Explore vehicle information
                        retrieved dynamically from the
                        NHTSA Vehicle Safety API.
                    </p>


                    <div class="api-controls">

                        <label for="vehicle-year">
                            Model Year
                        </label>

                        <select id="vehicle-year">

                            <option value="2024">
                                2024
                            </option>

                            <option value="2023">
                                2023
                            </option>

                            <option value="2022">
                                2022
                            </option>

                        </select>


                        <label for="vehicle-make">
                            Make
                        </label>

                        <select id="vehicle-make">

                            <option value="">
                                Loading makes...
                            </option>

                        </select>


                        <button
                            id="load-models"
                            type="button"
                        >
                            Load Models
                        </button>

                    </div>


                    <div id="api-results">

                        <p>
                            Select a vehicle make to
                            explore available models.
                        </p>

                    </div>


                    <div
                        id="vehicle-details"
                        class="vehicle-details"
                    ></div>

                </div>

            </section>

        </main>
    `;
}


/**
 * Initialize Vehicle API
 */
export async function initializeVehicleAPI() {
    
    attachCartEvents(vehicles);

    const yearSelect =
        document.querySelector("#vehicle-year");

    const makeSelect =
        document.querySelector("#vehicle-make");

    const loadButton =
        document.querySelector("#load-models");

    const results =
        document.querySelector("#api-results");

    const detailsContainer =
        document.querySelector("#vehicle-details");


    if (
        !yearSelect ||
        !makeSelect ||
        !loadButton ||
        !results ||
        !detailsContainer
    ) {
        console.error(
            "Vehicle API elements were not found."
        );

        return;
    }


    /**
     * Load vehicle makes.
     *
     * API Endpoint #1
     */
    async function loadMakes() {

        console.log(
            "Loading vehicle makes for:",
            yearSelect.value
        );


        makeSelect.innerHTML = `
            <option value="">
                Loading makes...
            </option>
        `;


        try {

            const makes =
                await getVehicleMakes(
                    yearSelect.value
                );


            console.log(
                "API returned makes:",
                makes
            );


            if (
                !makes ||
                makes.length === 0
            ) {

                makeSelect.innerHTML = `
                    <option value="">
                        No makes found
                    </option>
                `;

                return;
            }


            /*
             * Clear dropdown.
             */
            makeSelect.innerHTML = `
                <option value="">
                    Select a make
                </option>
            `;


            /*
             * The NHTSA API uses "Make"
             * for this endpoint.
             *
             * Some API responses may use
             * "Make_Name", so both are supported.
             */
            const makeNames = new Set();


            makes.forEach(make => {

                const makeName =
                    make.Make ||
                    make.Make_Name ||
                    make.MakeName ||
                    make.make;


                if (
                    makeName &&
                    !makeNames.has(makeName)
                ) {

                    makeNames.add(makeName);


                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        makeName;


                    option.textContent =
                        makeName;


                    makeSelect.appendChild(
                        option
                    );
                }

            });


            console.log(
                "Loaded",
                makeNames.size,
                "vehicle makes."
            );


            results.innerHTML = `
                <p>
                    Select a vehicle make to
                    explore available models.
                </p>
            `;


        } catch (error) {

            console.error(
                "Error loading vehicle makes:",
                error
            );


            makeSelect.innerHTML = `
                <option value="">
                    Unable to load makes
                </option>
            `;


            results.innerHTML = `
                <p>
                    Unable to retrieve vehicle makes.
                    Please refresh and try again.
                </p>
            `;
        }
    }


    /**
     * Load vehicle models.
     *
     * API Endpoint #2
     */
    async function loadModels() {

        const year =
            yearSelect.value;

        const make =
            makeSelect.value;


        detailsContainer.innerHTML = "";


        if (!make) {

            results.innerHTML = `
                <p>
                    Please select a vehicle make first.
                </p>
            `;

            return;
        }


        results.innerHTML = `
            <p>
                Loading ${make} models...
            </p>
        `;


        try {

            const models =
                await getVehicleModels(
                    year,
                    make
                );


            console.log(
                "API returned models:",
                models
            );


            if (
                !models ||
                models.length === 0
            ) {

                results.innerHTML = `
                    <p>
                        No models were found for
                        ${make}.
                    </p>
                `;

                return;
            }


            /*
             * The NHTSA API may return
             * Model or Model_Name.
             */
            const uniqueModels = [];

            const modelNames = new Set();


            models.forEach(model => {

                const modelName =
                    model.Model ||
                    model.Model_Name ||
                    model.ModelName ||
                    model.model;


                if (
                    modelName &&
                    !modelNames.has(modelName)
                ) {

                    modelNames.add(modelName);

                    uniqueModels.push({
                        ...model,
                        displayModel: modelName
                    });
                }

            });


            console.log(
                "Loaded",
                uniqueModels.length,
                "models for",
                make
            );


            results.innerHTML = `

                <div class="api-model-grid">

                    ${uniqueModels
                        .slice(0, 20)
                        .map(model => {

                            return `

                                <article
                                    class="api-model-card"
                                >

                                    <h3>
                                        ${make}
                                        ${model.displayModel}
                                    </h3>


                                    <p>
                                        <strong>
                                            Model Year:
                                        </strong>

                                        ${year}
                                    </p>


                                    <p>
                                        <strong>
                                            Make:
                                        </strong>

                                        ${make}
                                    </p>


                                    <p>
                                        <strong>
                                            Model:
                                        </strong>

                                        ${model.displayModel}
                                    </p>


                                    <button
                                        type="button"
                                        class="view-vehicle-data"
                                        data-year="${year}"
                                        data-make="${make}"
                                        data-model="${model.displayModel}"
                                    >
                                        View Vehicle Data
                                    </button>

                                </article>

                            `;
                        })
                        .join("")}

                </div>
            `;


        } catch (error) {

            console.error(
                "Error loading vehicle models:",
                error
            );


            results.innerHTML = `
                <p>
                    Unable to retrieve vehicle models.
                    Please try again.
                </p>
            `;
        }
    }


    /**
     * Show detailed vehicle information.
     *
     * First get the vehicle variant.
     * Then use the VehicleId.
     */
    async function showVehicleDetails(
        year,
        make,
        model
    ) {

        detailsContainer.innerHTML = `

            <div class="vehicle-detail-card">

                <h3>
                    Loading Vehicle Data...
                </h3>

                <p>
                    Retrieving information from
                    the NHTSA API.
                </p>

            </div>
        `;


        try {

            console.log(
                "Loading vehicle details:",
                {
                    year,
                    make,
                    model
                }
            );


            /*
             * Get vehicle variants.
             */
            const variants =
                await getVehicleVariants(
                    year,
                    make,
                    model
                );


            console.log(
                "Vehicle variants:",
                variants
            );


            if (
                !variants ||
                variants.length === 0
            ) {

                throw new Error(
                    "No vehicle variants were found."
                );
            }


            /*
             * Find VehicleId.
             */
            const selectedVariant =
                variants.find(
                    variant =>
                        variant.VehicleId ||
                        variant.VehicleID ||
                        variant.vehicleId
                );


            if (!selectedVariant) {

                throw new Error(
                    "The API did not return a Vehicle ID."
                );
            }


            const vehicleId =
                selectedVariant.VehicleId ||
                selectedVariant.VehicleID ||
                selectedVariant.vehicleId;


            console.log(
                "Vehicle ID:",
                vehicleId
            );


            /*
             * Get detailed vehicle data.
             */
            const details =
                await getVehicleDetails(
                    vehicleId
                );


            console.log(
                "Safety details:",
                details
            );


            if (
                !details ||
                details.length === 0
            ) {

                throw new Error(
                    "No vehicle details were returned."
                );
            }


            const vehicle =
                details[0];


            /*
             * Display JSON information.
             */
            detailsContainer.innerHTML = `

                <div class="vehicle-detail-card">

                    <h2>
                        Vehicle JSON Data
                    </h2>


                    <p>
                        Data retrieved dynamically
                        from the NHTSA API.
                    </p>


                    <hr>


                    <p>
                        <strong>Make:</strong>
                        ${
                            vehicle.Make ||
                            make ||
                            "N/A"
                        }
                    </p>


                    <p>
                        <strong>Model:</strong>
                        ${
                            vehicle.Model ||
                            model ||
                            "N/A"
                        }
                    </p>


                    <p>
                        <strong>Model Year:</strong>
                        ${
                            vehicle.ModelYear ||
                            year ||
                            "N/A"
                        }
                    </p>


                    <p>
                        <strong>Vehicle ID:</strong>
                        ${vehicleId}
                    </p>


                    <p>
                        <strong>Vehicle Type:</strong>
                        ${
                            vehicle.VehicleType ||
                            "N/A"
                        }
                    </p>


                    <p>
                        <strong>Body Class:</strong>
                        ${
                            vehicle.BodyClass ||
                            "N/A"
                        }
                    </p>


                    <p>
                        <strong>Manufacturer:</strong>
                        ${
                            vehicle.Manufacturer ||
                            "N/A"
                        }
                    </p>


                    <p>
                        <strong>Engine:</strong>
                        ${
                            vehicle.Engine ||
                            "N/A"
                        }
                    </p>


                    <p>
                        <strong>Fuel Type:</strong>
                        ${
                            vehicle.FuelType ||
                            "N/A"
                        }
                    </p>


                    <p>
                        <strong>Transmission:</strong>
                        ${
                            vehicle.Transmission ||
                            "N/A"
                        }
                    </p>


                    <p>
                        <strong>Drive Type:</strong>
                        ${
                            vehicle.DriveType ||
                            "N/A"
                        }
                    </p>


                    <p>
                        <strong>Doors:</strong>
                        ${
                            vehicle.Doors ||
                            "N/A"
                        }
                    </p>


                    <p>
                        <strong>Brake System:</strong>
                        ${
                            vehicle.BrakeSystemType ||
                            "N/A"
                        }
                    </p>


                    <p>
                        <strong>Plant City:</strong>
                        ${
                            vehicle.PlantCity ||
                            "N/A"
                        }
                    </p>


                    <p>
                        <strong>Plant Country:</strong>
                        ${
                            vehicle.PlantCountry ||
                            "N/A"
                        }
                    </p>


                    <hr>


                    <details>

                        <summary>
                            View Raw JSON
                        </summary>


                        <pre class="json-display">${JSON.stringify(
                            vehicle,
                            null,
                            2
                        )}</pre>

                    </details>

                </div>
            `;


            detailsContainer.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


        } catch (error) {

            console.error(
                "Error loading vehicle details:",
                error
            );


            detailsContainer.innerHTML = `

                <div class="vehicle-detail-card error-message">

                    <h3>
                        Unable to retrieve detailed
                        vehicle information.
                    </h3>

                    <p>
                        Please try another vehicle.
                    </p>

                </div>
            `;
        }
    }


    /**
     * EVENT #1
     *
     * Change year.
     */
    yearSelect.addEventListener(
        "change",
        async () => {

            await loadMakes();

        }
    );


    /**
     * EVENT #2
     *
     * Load models.
     */
    loadButton.addEventListener(
        "click",
        async () => {

            await loadModels();

        }
    );


    /**
     * EVENT #3
     *
     * Change make.
     */
    makeSelect.addEventListener(
        "change",
        () => {

            detailsContainer.innerHTML = "";


            if (!makeSelect.value) {

                results.innerHTML = `
                    <p>
                        Select a vehicle make to
                        explore available models.
                    </p>
                `;

                return;
            }


            results.innerHTML = `
                <p>
                    Click "Load Models" to see
                    available ${makeSelect.value}
                    models.
                </p>
            `;
        }
    );


    /**
     * EVENT #4
     *
     * View Vehicle Data.
     */
    results.addEventListener(
        "click",
        async event => {

            const button =
                event.target.closest(
                    ".view-vehicle-data"
                );


            if (!button) {
                return;
            }


            const year =
                button.dataset.year;

            const make =
                button.dataset.make;

            const model =
                button.dataset.model;


            await showVehicleDetails(
                year,
                make,
                model
            );
        }
    );


    /**
     * EVENT #5
     *
     * Enter key.
     */
    makeSelect.addEventListener(
        "keydown",
        async event => {

            if (
                event.key === "Enter"
            ) {

                await loadModels();

            }
        }
    );


    /*
     * Load makes when page starts.
     */
    await loadMakes();
}