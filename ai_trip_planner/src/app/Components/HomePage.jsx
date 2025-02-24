import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

const HomePage = () => {
    const router = useRouter()

    return (
        <div className='w-full flex flex-col items-center md:justify-center md:items-start md:flex-row h-full p-4'>
            <div className='w-[290px] h-[270px] md:flex md:items-start md:w-[600px] md:h-[400px]'>
                <DotLottieReact
                    src="https://lottie.host/7f9416ab-767e-4b05-861e-4cedb3d68fe9/UO9DZzyXGz.lottie"
                    loop
                    autoplay
                    className='h-full w-full'
                />
            </div>

            <div className='text-center md:text-left flex flex-col gap-5 md:px-20 md:w-[550px] md:mt-10'>
                <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-[#2e3a59]'>
                    Create Your Dream Trip in Minutes
                </h1>
                <p className='text-[#4b4b4b] font-medium mt-4'>
                    Plan personalized itineraries with ease—discover destinations, activities, and accommodations that match your style and preferences!
                </p>
                <Button
                    type="button"
                    variant="contained"
                    color="success"
                    sx={{
                        backgroundColor: '#2d9cdb',
                        '&:hover': { backgroundColor: '#1a7bb9' },
                        borderRadius: '16px',
                        fontWeight: 600,
                        padding: '10px 24px',
                        fontSize: ['14px', '16px', '18px'],
                    }}
                    aria-label="Find Your Trip"
                    onClick={() => router.push('/create-trip')}
                >
                    Find Your Trip
                </Button>
            </div>
        </div>
    )
}

export default HomePage
