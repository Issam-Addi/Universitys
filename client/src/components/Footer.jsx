import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/image/Logo.png";

function Footer() {

    return (
        <footer className="bg-black px-4 py-5 max-w-screen mx-auto md:px-8">
            <div className="max-w-lg sm:mx-auto sm:text-center">
                <img
                    src={Logo}
                    width={100}
                    className="sm:mx-auto" alt="Logo" />
            </div>
            <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
                <li
                    className="text-white hover:text-blue-500 transition">
                    <Link to="/" className="block">
                        Home
                    </Link>
                </li>
                <li
                    className="text-white hover:text-blue-500 transition">
                    <Link to="/all_university" className="block">
                        Buses
                    </Link>
                </li>
                <li
                    className="text-white hover:text-blue-500 transition">
                    <Link to="/aboutUs" className="block">
                        How we are
                    </Link>
                </li>
                <li
                    className="text-white hover:text-blue-500 transition">
                    <Link to="/contactUs" className="block">
                        Get in touch
                    </Link>
                </li>
            </ul>
            <div className="mt-8 text-white items-center justify-center sm:flex">
                <div className="mt-4 sm:mt-0">
                    &copy; 2023 By Naqilati team
                </div>
            </div>
        </footer>
    )
}

export default Footer;
