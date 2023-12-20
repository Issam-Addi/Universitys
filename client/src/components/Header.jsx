import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../assets/image/Logo.png";

function Header({ isLoggedIn }) {

    const navigate = useNavigate();
    const [state, setState] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    };

    return (
        <nav className={`md:text-sm bg-white`}>
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between py-5 md:block">
                    <Link to="/">
                        <img
                            src={Logo}
                            width={100}
                            height={50}
                            alt="logo"
                            onClick={() => setState(false)} />
                    </Link>
                    <div className="md:hidden">
                        <button
                            className="text-black hover:text-blue-500 transition"
                            onClick={() => setState(!state)}>
                            {state ?
                                (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )}
                        </button>
                    </div>
                </div>
                <div
                    className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'
                        } `}>
                    <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        <li
                            className="text-black hover:text-blue-500 transition"
                            onClick={() => setState(false)}>
                            <Link to="/" className="block">
                                Home
                            </Link>
                        </li>
                        <li
                            className="text-black hover:text-blue-500 transition"
                            onClick={() => setState(false)}>
                            <Link to="/all_university" className="block">
                                Universitys
                            </Link>
                        </li>
                        <li
                            className="text-black hover:text-blue-500 transition"
                            onClick={() => setState(false)}>
                            <Link to="/aboutUs" className="block">
                                How we are
                            </Link>
                        </li>
                        <li
                            className="text-black hover:text-blue-500 transition"
                            onClick={() => setState(false)}>
                            <Link to="/contactUs" className="block">
                                Get in touch
                            </Link>
                        </li>

                    </ul>
                    <div className="flex-1 gap-x-6 items-center pb-6 md:pb-0 justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                        {isLoggedIn ?
                            (
                                <button
                                    className="flex items-center justify-center md:inline-flex rounded-lg border border-current px-6 py-2 md:text-sm font-normal border-blue-500 hover:border-blue-500 text-blue-500 transition hover:-rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500"
                                    onClick={handleLogout}>
                                    Log out
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5">
                                        <path
                                            fillRule="evenodd"
                                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                            ) : (
                                <button>
                                    <Link
                                        to="SignIn"
                                        className="flex items-center justify-center md:inline-flex rounded-lg border border-current px-6 py-2 md:text-sm font-normal border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500"
                                        onClick={() => setState(false)}>
                                        Sign in
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5">
                                            <path
                                                fillRule="evenodd"
                                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </button>
                            )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;






