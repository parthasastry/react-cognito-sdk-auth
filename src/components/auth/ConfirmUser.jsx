import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import validator from 'validator';

import { confirmSignUp } from './authService';

const ConfirmUser = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState(location.state?.email || '');
    const [confirmationCode, setConfirmationCode] = useState('');

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)

        if (validator.isEmpty(confirmationCode)) {
            setError(true)
            setErrorMessage("Confirmation code is required")
        } else {
            try {
                await confirmSignUp(email, confirmationCode);
                navigate('/login');
            } catch (error) {
                setError(true)
                setErrorMessage(error.message)
                console.log("Error in registering the user", error)
            }
        }



    }

    return (
        <div className='relative flex flex-col min-h-screen overflow-hidden'>
            <div className="w-full text-center p-6 mx-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <div className='font-bold uppercase text-2xl'>Confirm User</div>
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
                    <div>
                        <input
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            type="number"
                            value={confirmationCode}
                            onChange={(e) => setConfirmationCode(e.target.value)}
                            placeholder="Confirmation Code"
                        />
                    </div>


                    {error && (
                        <div className='italic text-sm text-red-600'>{errorMessage}</div>
                    )}
                    <button
                        className="mt-2 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-700 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600" type='submit'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmUser