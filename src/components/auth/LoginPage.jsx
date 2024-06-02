import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import validator from 'validator';

import { signIn } from './authService';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)

        if (validator.isEmpty(email) || validator.isEmpty(password)) {
            setError(true)
            setErrorMessage("All fields are required")
        } else {
            setError(false)
            try {
                const session = await signIn(email, password);

                if (session && typeof session.AccessToken !== 'undefined') {
                    sessionStorage.setItem('accessToken', session.AccessToken)
                    sessionStorage.setItem('idToken', session.IdToken)
                    sessionStorage.setItem('refreshToken', session.RefreshToken)
                    if (sessionStorage.getItem('accessToken')) {
                        navigate("/")
                    } else {
                        setError(true)
                        setErrorMessage("Session token was not set peoperly, contact administrator")
                    }
                } else {
                    setError(true)
                    setErrorMessage("SignIn session or AccessToken is undefined")
                }
            } catch (error) {
                setError(true)
                setErrorMessage(error.message)
                console.log("Error in logging in the user", error)
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

                    <div>
                        <input
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>

                    <div className='text-left'>
                        <Link
                            to="/forgot-password"
                            className="text-sm italic text-indigo-500"
                        >
                            Forgot Password
                        </Link>
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

export default LoginPage