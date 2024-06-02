import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../auth/authService'
import validator from 'validator';

const SignUpPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    const handleSubmit = async (e) => {

        e.preventDefault()
        setError(false)

        if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(phoneNumber) || validator.isEmpty(confirmPassword)) {
            setError(true)
            setErrorMessage("All fields are required")
        } else if (!validator.isEmail(email)) {
            setError(true)
            setErrorMessage("Please enter a valid email")
        } else if (password !== confirmPassword) {
            setError(true)
            setErrorMessage("Passwords do not match")
        } else {
            setError(false)

            try {
                await signUp(email, password, name, phoneNumber)
                navigate("/confirm-signup")
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
                <div className='font-bold uppercase text-2xl'>Register</div>
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
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                    </div>
                    <div>
                        <input
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Phone Number"
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
                    <div>
                        <input
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
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

export default SignUpPage