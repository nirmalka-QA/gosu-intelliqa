// Gosu code for displaying multi-vehicle discount details in premium summary and rating worksheet

rule MultiVehicleDiscountDetailsRule {
    // Displays multi-vehicle discount details in premium summary
    function displayDiscountDetailsInPremiumSummary(policy: PersonalAutoPolicyVehicles) {
        var vehicles = policy.getVehicles();
        if (vehicles.size() >= 2) {
            var discount = "10% Multi-Vehicle Discount Applied";
            policy.addPremiumSummaryDetail(discount);
        }
    }

    // Includes multi-vehicle discount in Rating API response
    function includeDiscountInRatingAPIResponse(policy: PersonalAutoPolicyVehicles, ratingAPIResponse: RatingAPIResponse) {
        var vehicles = policy.getVehicles();
        if (vehicles.size() >= 2) {
            ratingAPIResponse.addDiscountDetail("10% Multi-Vehicle Discount Applied");
        }
    }
}