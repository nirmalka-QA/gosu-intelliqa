// Gosu code for calculating premium impact and applying multi-vehicle discount

rule MultiVehicleDiscountRule {
    // Calculates premium impact for each vehicle
    function calculatePremiumImpactForVehicle(vehicle: Vehicle): PremiumImpact {
        // Logic to calculate premium impact based on vehicle attributes
        var impact = new PremiumImpact();
        impact.setImpactAmount(vehicle.getBasePremium().multiply(vehicle.getRiskFactor()));
        return impact;
    }

    // Applies multi-vehicle discount to the base premium
    function applyMultiVehicleDiscount(basePremium: BigDecimal, vehicleCount: int): BigDecimal {
        if (vehicleCount >= 2) {
            return basePremium.multiply(new BigDecimal("0.90")); // 10% discount
        }
        return basePremium;
    }

    // Calculates total premium with multi-vehicle discount
    function calculateTotalPremiumWithDiscount(basePremium: BigDecimal, vehicles: List<Vehicle>): BigDecimal {
        var totalPremium = basePremium;
        for (var vehicle in vehicles) {
            totalPremium = totalPremium.add(calculatePremiumImpactForVehicle(vehicle).getImpactAmount());
        }
        return applyMultiVehicleDiscount(totalPremium, vehicles.size());
    }
}