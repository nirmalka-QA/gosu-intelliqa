// Gosu code for applying state-specific rate adjustments based on effective dates and new factor table

rule StateSpecificRateAdjustmentsRule {
    // Applies state-specific rate adjustments
    function applyStateSpecificRateAdjustments(policy: PersonalAutoPolicyVehicles, state: String, effectiveDate: Date) {
        if ((state == "CA" || state == "NY") && (effectiveDate >= Date.parse("2026-01-01") || effectiveDate >= Date.parse("2026-01-15"))) {
            var basePremium = policy.getBasePremium();
            var adjustedPremium = basePremium.multiply(getStateSpecificAdjustmentFactor(state));
            policy.setBasePremium(adjustedPremium);
            applyNewFactorTableForDriverAge(policy);
        }
    }

    // Retrieves state-specific adjustment factor
    function getStateSpecificAdjustmentFactor(state: String): BigDecimal {
        switch (state) {
            case "CA":
                return new BigDecimal("1.05"); // Example adjustment factor for California
            case "NY":
                return new BigDecimal("1.07"); // Example adjustment factor for New York
            default:
                return new BigDecimal("1.00");
        }
    }

    // Applies new factor table for driver age
    function applyNewFactorTableForDriverAge(policy: PersonalAutoPolicyVehicles) {
        var vehicles = policy.getVehicles();
        for (var vehicle in vehicles) {
            vehicle.applyDriverAgeFactorTable("2026");
        }
    }
}