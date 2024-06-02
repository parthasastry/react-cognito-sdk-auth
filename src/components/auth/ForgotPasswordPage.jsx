import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import validator from 'validator';

import { forgotPassword } from './authService';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)

        if (validator.isEmpty(email)) {
            setError(true)
            setErrorMessage("Email is required")
        } else {
            setError(false)
            try {
                const result = await forgotPassword(email);
                console.log("result: ", result)
                navigate('/reset-password');
            } catch (error) {
                setError(true)
                setErrorMessage(error.message)
                console.log("Error in forgot password", error)
            }

        }
    }

    return (
        <div className='relative flex flex-col min-h-screen overflow-hidden'>
            <div className="w-full text-center p-6 mx-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <div className='font-bold uppercase text-2xl'>Login</div>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div>
                        <input
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>

                    {error && (
                        <div className='italic text-sm text-red-600'>{errorMessage}</div>
                    )}
                    <button
                        className="mt-2 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-700 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600" type='submit'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPasswordPage