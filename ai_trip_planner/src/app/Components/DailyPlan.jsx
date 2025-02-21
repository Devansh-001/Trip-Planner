import Link from "next/link";
import PlacesCard from "./PlacesCard";

const DailyPlan = ({ trip }) => {

    const itenary = trip?.tripData?.[`${trip.userSelection.numOfDays}_day_itinerary`];


    if (!itenary) {
        return <></>;
    }

    const sortedDays = Object.keys(itenary).sort((a, b) => {
        const dayA = parseInt(a.replace('Day ', ''));
        const dayB = parseInt(b.replace('Day ', ''));
        return dayA - dayB;
    });

    return (
        <div className='p-4 w-full flex flex-col gap-6'>

            <h2 className='font-bold text-2xl'>Places To Visit</h2>

            <div>
                {sortedDays.map((day) => {
                    return (
                        <div key={day}>
                            <h2>{day}</h2>
                            <div className="grid md:grid-cols-2 gap-4">

                                {itenary[day].map((place, index) => {

                                    const placeName = place?.place_name?.replace(/\bundefined\b/g, "") || "";
                                    const placeAddress = place?.place_address?.replace(/\bundefined\b/g, "") || "";

                                    const href = `https://www.google.com/maps/search/?api=1&query=${placeName}+${placeAddress}`;
                                    return (

                                        <Link
                                            className="rounded-2xl shadow-2xl my-4 p-2"
                                            key={index}
                                            href={href}
                                            target='_blank'
                                        >
                                            <h2 className="p-2 px-4 font-medium">Travel Info : <span className="font-medium text-sm underline">
                                                {place.time_to_travel_from_hotel}</span>
                                            </h2>
                                            <PlacesCard place={place} />
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}

            </div>
        </div >
    )
}

export default DailyPlan
