const API_BASE =
    "https://api.nhtsa.gov/SafetyRatings";

/**
 * Get vehicle makes available for a model year.
 *
 * API Endpoint #1
 *
 * Example:
 * /SafetyRatings/modelyear/2024
 */
export async function getVehicleMakes(modelYear = 2024) {
    const response = await fetch(
        `${API_BASE}/modelyear/${modelYear}`
    );

    if (!response.ok) {
        throw new Error(
            "Unable to retrieve vehicle makes."
        );
    }

    const data = await response.json();

    return data.Results || [];
}


/**
 * Get vehicle models for a specific
 * make and model year.
 *
 * API Endpoint #2
 *
 * Example:
 * /SafetyRatings/modelyear/2024/make/HONDA
 */
export async function getVehicleModels(
    modelYear,
    make
) {
    const response = await fetch(
        `${API_BASE}/modelyear/${modelYear}/make/${encodeURIComponent(make)}`
    );

    if (!response.ok) {
        throw new Error(
            "Unable to retrieve vehicle models."
        );
    }

    const data = await response.json();

    return data.Results || [];
}


/**
 * Get vehicle variants for a specific
 * model year, make, and model.
 *
 * API Endpoint #3
 *
 * This endpoint is important because
 * it provides the VehicleId needed by
 * the VehicleId safety-rating endpoint.
 *
 * Example:
 * /SafetyRatings/modelyear/2023/make/FIAT/model/500X
 */
export async function getVehicleVariants(
    modelYear,
    make,
    model
) {
    const response = await fetch(
        `${API_BASE}/modelyear/${modelYear}/make/${encodeURIComponent(make)}/model/${encodeURIComponent(model)}`
    );

    if (!response.ok) {
        throw new Error(
            "Unable to retrieve vehicle variants."
        );
    }

    const data = await response.json();

    return data.Results || [];
}


/**
 * Get safety information for a specific
 * vehicle using its VehicleId.
 *
 * API Endpoint #4
 *
 * Example:
 * /SafetyRatings/VehicleId/19369
 */
export async function getVehicleDetails(
    vehicleId
) {
    if (!vehicleId) {
        throw new Error(
            "A Vehicle ID is required."
        );
    }

    const response = await fetch(
        `${API_BASE}/VehicleId/${vehicleId}`
    );

    if (!response.ok) {
        throw new Error(
            "Unable to retrieve vehicle safety information."
        );
    }

    const data = await response.json();

    return data.Results || [];
}