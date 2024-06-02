import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { isAuthenticated, parseJwt } from "../../utils/Helper"

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation()
    let pathname = location.pathname

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <nav className="flex justify-around">
            <div className="mt-2 text-blue-600 font-bold uppercase text-2xl">
                <Link className={`${pathname === "/" ? 'bg-black text-white' : ''}  hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`} to="/">
                    Home
                </Link>
                <Link className={`${pathname === "/posts" ? 'bg-black text-white' : ''}  hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`} to="/posts">
                    Posts
                </Link>
                <Link className={`${pathname === "/about" ? 'bg-black text-white' : ''}  hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`} to="/about">
                    About
                </Link>
            </div>

            {isAuthenticated() ? (
                <div>
                    <button
                        className="mt-2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                        onClick={handleLogout}>
                        Logout
                    </button>
                    <div className="text-sm">
                        Logged in as <span className="italic font-bold">{parseJwt(sessionStorage.idToken.toString()).name}</span>
                    </div>


                </div>) : (
                <div className="mt-2 grid grid-cols-2 gap-4">
                    <div
                        className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-700 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600">
                        <Link to="/login">Login</Link>
                    </div>
                    <div
                        className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                        <Link to="/signup">Register</Link>
                    </div>
                </div>
            )}

        </nav>
    )
}

export default Navbar