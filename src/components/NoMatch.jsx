import { Link } from 'react-router-dom'

const NoMatch = () => {
    return (
        <div className='m-10'>
            <h2 className='text-red-600 font-bold text-4xl'>404: Page Not Found</h2>
            <button
                className='bg-blue-600 text-white rounded h-[50px] w-[150px] font-bold mt-6'>
                <Link to="/"> Go Home</Link>

            </button>
        </div>
    )
}

export default NoMatch