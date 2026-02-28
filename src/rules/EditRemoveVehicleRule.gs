// Gosu code for editing or removing vehicles from a policy and recalculating premium impact

rule EditRemoveVehicleRule {
    // Edits a vehicle in the policy
    function editVehicle(policy: PersonalAutoPolicyVehicles, existingVehicle: Vehicle, updatedVehicle: Vehicle) {
        policy.editVehicle(existingVehicle, updatedVehicle);
        recalculatePremiumImpact(policy);
    }

    // Removes a vehicle from the policy
    function removeVehicle(policy: PersonalAutoPolicyVehicles, vehicle: Vehicle) {
        policy.removeVehicle(vehicle);
        recalculatePremiumImpact(policy);
    }

    // Recalculates premium impact and multi-vehicle discount
    function recalculatePremiumImpact(policy: PersonalAutoPolicyVehicles) {
        var basePremium = policy.getBasePremium();
        var vehicles = policy.getVehicles();
        var totalPremium = new MultiVehicleDiscountRule().calculateTotalPremiumWithDiscount(basePremium, vehicles);
        policy.setTotalPremium(totalPremium);
    }
}