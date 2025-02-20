import HotelCard from './HotelCard'

const RecommendedHotels = ({ trip }) => {
    return (
        <div className='p-4 w-full flex flex-col gap-6'>
            <h2 className='font-bold text-2xl'>Hotels Recommendation</h2>

            <div className='flex flex-wrap justify-normal gap-4'>
                {
                    trip?.tripData?.hotel_recommendations.map((hotel, index) => {
                        return (
                            <HotelCard key={index} hotel={hotel} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RecommendedHotels
