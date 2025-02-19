export const selectBudgetOptions = [
    { id: 1, title: "Budget-friendly", desc: "Affordable options, lower cost", icon: "💸" },
    { id: 2, title: "Moderate", desc: "Balanced cost with comfort", icon: "💰" },
    { id: 3, title: "Luxury", desc: "High-end experiences, premium service", icon: "💎" }
];

export const selectTravelGroups = [
    { id: 1, title: "Solo Traveler", desc: "Adventure alone, self-discovery", icon: "✈️", people: "1 person" },
    { id: 2, title: "Couple", desc: "Explore together, share the journey", icon: "🥂", people: "2 people" },
    { id: 3, title: "Family", desc: "Create memories with loved ones", icon: "🏡", people: "2-5 people" },
    { id: 4, title: "Friends", desc: "Thrill-seeking with your crew", icon: "⛵", people: "5-10 people" }
];


// export const propmt = `Create a detailed {numOfDays} days travel itinerary for a {travelerType} ({numOfPeople}) visiting {location} on a {budgetType} budget trip. The itinerary should include affordable options and lower-cost experiences. Provide the result in JSON format with the following details:

// Hotel Recommendations:

// Hotel Name
// Hotel Address
// Price per Night
// Hotel Image URL
// Geo Coordinates(Latitude, Longitude)
// Hotel Rating(out of 5)
// Hotel Description
// {numOfDays} - Day Itinerary:

// For each day(Day 1, Day 2, Day 3,...), list places with the following details:
// Place Name
// Place Description
// Place Image URL
// Geo Coordinates(Latitude, Longitude)
// Ticket Price(if applicable)
// Place Rating(out of 5)
// Best Time to Visit
// Time to Travel from Hotel to Place
// Ensure that all options and activities fit within a {budgetType} framework, focusing on affordable attractions, experiences, and accommodations.
// `


export const propmt = `
Create a detailed {numOfDays} days travel itinerary for a {travelerType} ({numOfPeople}) visiting {location} on a {budgetType} budget trip. The itinerary should include options and experiences that align with the selected budget type, ensuring comfort and feasibility for the traveler. Provide the result in JSON format with the following details:

Hotel Recommendations:

Hotel Name
Hotel Address
Price per Night
Hotel Image URL
Geo Coordinates (Latitude, Longitude)
Hotel Rating (out of 5)
Hotel Description

{numOfDays} - Day Itinerary:

For each day (Day 1, Day 2, Day 3,...), list places with the following details:
Place Name
Place Description
Place Image URL
Geo Coordinates (Latitude, Longitude)
Ticket Price (if applicable)
Place Rating (out of 5)
Best Time to Visit
Time to Travel from Hotel to Place

The itinerary must adhere to the selected budget type:
- For **{budgetType}**: Choose activities, accommodations, and dining that are appropriate for the selected budget, ensuring that the options are aligned with the overall comfort and experience expectations of that budget type.

Make sure the activities and accommodations are tailored to the {travelerType}'s needs, ensuring that the overall experience suits the group size and preferences.`
