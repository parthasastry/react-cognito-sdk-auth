import { useState, useEffect } from 'react'
import { parseJwt } from "../utils/Helper"
import { signInToken } from './auth/authService'


const Home = () => {
    const [idT, setIdT] = useState()
    const [accessT, setAccessT] = useState()

    useEffect(() => {
        setIdT(parseJwt(sessionStorage.idToken.toString()))
        setAccessT(parseJwt(sessionStorage.accessToken.toString()))
    }, [])

    const handleRefreshToken = async () => {
        // console.log("refresh token: ", sessionStorage.refreshToken)
        // console.log("email: ", idT.email)

        try {
            const result = await signInToken(idT.email, sessionStorage.refreshToken)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <h2>Home View</h2>
            {idT && (
                <div>
                    <div>IdToken</div>
                    <p>{idT.name}</p>
                    <p>Expires on {new Date(idT.exp * 1000).toLocaleString()}</p>
                </div>
            )}

            <button className="mt-2 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-700 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600" onClick={handleRefreshToken} type="submit">Get new Token</button>

        </div>
    )
}

export default Home