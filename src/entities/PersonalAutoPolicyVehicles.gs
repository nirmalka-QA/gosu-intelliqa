// Gosu code for managing multiple vehicles in personal auto policies

entity PersonalAutoPolicyVehicles {
    // List of vehicles associated with the policy
    private List<Vehicle> vehicles;

    // Maximum number of vehicles allowed
    private static final int MAX_VEHICLES = 3;

    // Adds a vehicle to the policy
    function addVehicle(vehicle: Vehicle) {
        if (vehicles.size() >= MAX_VEHICLES) {
            throw new Exception("Cannot add more than " + MAX_VEHICLES + " vehicles to the policy.");
        }
        vehicles.add(vehicle);
    }

    // Removes a vehicle from the policy
    function removeVehicle(vehicle: Vehicle) {
        vehicles.remove(vehicle);
    }

    // Edits a vehicle in the policy
    function editVehicle(existingVehicle: Vehicle, updatedVehicle: Vehicle) {
        var index = vehicles.indexOf(existingVehicle);
        if (index == -1) {
            throw new Exception("Vehicle not found in the policy.");
        }
        vehicles.set(index, updatedVehicle);
    }

    // Retrieves all vehicles in the policy
    function getVehicles(): List<Vehicle> {
        return vehicles;
    }

    // Calculates the premium impact for each vehicle
    function calculatePremiumImpact(): List<PremiumImpact> {
        var impacts = new Array<PremiumImpact>();
        for (var vehicle in vehicles) {
            impacts.add(vehicle.calculatePremiumImpact());
        }
        return impacts;
    }

    // Applies multi-vehicle discount
    function applyMultiVehicleDiscount(basePremium: BigDecimal): BigDecimal {
        if (vehicles.size() >= 2) {
            return basePremium.multiply(new BigDecimal("0.90")); // 10% discount
        }
        return basePremium;
    }
}