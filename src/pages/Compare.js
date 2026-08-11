import { vehicles } from "../data/vehicles";

const COMPARE_KEY = "smartCarCompare";


function getCompareVehicles() {
    try {
        return JSON.parse(
            localStorage.getItem(COMPARE_KEY)
        ) || [];
    } catch (error) {
        console.error(
            "Error reading comparison data:",
            error
        );

        return [];
    }
}


function saveCompareVehicles(compareVehicles) {
    localStorage.setItem(
        COMPARE_KEY,
        JSON.stringify(compareVehicles)
    );
}


export function Compare() {

    const compareVehicles =
        getCompareVehicles();

    return `
        <main>

            <section class="compare-page">

                <div class="container">

                    <h1>Compare Vehicles</h1>

                    <p>
                        Select vehicles below to compare
                        them side by side.
                    </p>

                    <div class="compare-selector">

                        <label for="compare-vehicle">
                            Select a vehicle
                        </label>

                        <select id="compare-vehicle">

                            <option value="">
                                Select a vehicle
                            </option>

                            ${vehicles.map(vehicle => `
                                <option value="${vehicle.id}">
                                    ${vehicle.brand}
                                    ${vehicle.model}
                                    (${vehicle.year})
                                </option>
                            `).join("")}

                        </select>

                        <button
                            id="add-compare"
                            type="button">
                            Add to Compare
                        </button>

                    </div>

                    <div id="compare-results">

                        ${
                            compareVehicles.length === 0
                                ? `
                                    <div class="empty-compare">

                                        <h2>
                                            No Vehicles Selected
                                        </h2>

                                        <p>
                                            Select vehicles above
                                            to begin comparing.
                                        </p>

                                    </div>
                                `
                                : renderComparison(
                                    compareVehicles
                                )
                        }

                    </div>

                </div>

            </section>

        </main>
    `;
}


function renderComparison(compareVehicles) {

    return `
        <div class="comparison-header">

            <h2>Vehicle Comparison</h2>

            <button
                id="clear-compare"
                type="button">
                Clear All
            </button>

        </div>

        <div class="comparison-grid">

            ${compareVehicles.map(vehicle => `

                <article
                    class="comparison-card">

                    <img
                        src="${vehicle.image}"
                        alt="${vehicle.brand} ${vehicle.model}"
                    >

                    <h3>
                        ${vehicle.brand}
                        ${vehicle.model}
                    </h3>

                    <p>
                        <strong>Year:</strong>
                        ${vehicle.year}
                    </p>

                    <p>
                        <strong>Category:</strong>
                        ${vehicle.category}
                    </p>

                    <p>
                        <strong>Price:</strong>
                        $${Number(
                            vehicle.price
                        ).toLocaleString()}
                    </p>

                    <button
                        class="remove-compare"
                        data-id="${vehicle.id}"
                        type="button">
                        Remove
                    </button>

                </article>

            `).join("")}

        </div>
    `;
}


export function initializeCompare() {

    const select =
        document.querySelector(
            "#compare-vehicle"
        );

    const addButton =
        document.querySelector(
            "#add-compare"
        );

    const results =
        document.querySelector(
            "#compare-results"
        );


    if (
        !select ||
        !addButton ||
        !results
    ) {
        console.warn(
            "Compare page elements were not found."
        );

        return;
    }


    addButton.addEventListener(
        "click",
        () => {

            const vehicleId =
                Number(select.value);


            if (!vehicleId) {

                alert(
                    "Please select a vehicle first."
                );

                return;
            }


            const vehicle =
                vehicles.find(
                    item =>
                        item.id === vehicleId
                );


            if (!vehicle) {

                alert(
                    "Vehicle could not be found."
                );

                return;
            }


            let compareVehicles =
                getCompareVehicles();


            if (
                compareVehicles.some(
                    item =>
                        item.id === vehicle.id
                )
            ) {

                alert(
                    "This vehicle is already in the comparison."
                );

                return;
            }


            if (compareVehicles.length >= 4) {

                alert(
                    "You can compare up to four vehicles."
                );

                return;
            }


            compareVehicles.push(vehicle);

            saveCompareVehicles(
                compareVehicles
            );


            results.innerHTML =
                renderComparison(
                    compareVehicles
                );


            select.value = "";

            attachComparisonEvents();
        }
    );


    attachComparisonEvents();
}


function attachComparisonEvents() {

    const removeButtons =
        document.querySelectorAll(
            ".remove-compare"
        );


    removeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    Number(
                        button.dataset.id
                    );


                let compareVehicles =
                    getCompareVehicles();


                compareVehicles =
                    compareVehicles.filter(
                        vehicle =>
                            vehicle.id !== id
                    );


                saveCompareVehicles(
                    compareVehicles
                );


                const results =
                    document.querySelector(
                        "#compare-results"
                    );


                if (!results) {
                    return;
                }


                if (
                    compareVehicles.length === 0
                ) {

                    results.innerHTML = `
                        <div class="empty-compare">

                            <h2>
                                No Vehicles Selected
                            </h2>

                            <p>
                                Select vehicles above
                                to begin comparing.
                            </p>

                        </div>
                    `;

                    return;
                }


                results.innerHTML =
                    renderComparison(
                        compareVehicles
                    );


                attachComparisonEvents();
            }
        );

    });


    const clearButton =
        document.querySelector(
            "#clear-compare"
        );


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    COMPARE_KEY
                );


                const results =
                    document.querySelector(
                        "#compare-results"
                    );


                if (!results) {
                    return;
                }


                results.innerHTML = `
                    <div class="empty-compare">

                        <h2>
                            No Vehicles Selected
                        </h2>

                        <p>
                            Select vehicles above
                            to begin comparing.
                        </p>

                    </div>
                `;
            }
        );

    }
}