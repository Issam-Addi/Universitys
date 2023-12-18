import React from 'react';
import { Link } from "react-router-dom";
import { BsClipboard2Data } from "react-icons/bs";
import { FaRegUser, FaUniversity, FaEdit } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";

function Sodebar() {

    const handleLogOut = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };


    return (
        <aside className="min-h-screen p-4 shadow-xl bg-black w-72">
            <div className="mb-2 p-4 text-blue-500">
                Admin page
            </div>
            <ui>
                <Link to='/'>
                    <li className="hover:bg-blue-500 text-white flex items-center px-4 py-2.5 rounded-lg">
                        <BsClipboard2Data className='mr-2' />
                        Static data
                    </li>
                </Link>
                <Link to='/list_users'>
                    <li className="hover:bg-blue-500 text-white flex items-center px-4 py-2.5 rounded-lg">
                        <FaRegUser className='mr-2' />
                        Users list
                    </li>
                </Link>
                <Link to='/list_universitys'>
                    <li className="hover:bg-blue-500 text-white flex items-center px-4 py-2.5 rounded-lg">
                        <FaUniversity className='mr-2' />
                        Universitys List
                    </li>
                </Link>
                <Link to='/edit_about'>
                    <li className="hover:bg-blue-500 text-white flex items-center px-4 py-2.5 rounded-lg">
                        <FaEdit className='mr-2' />
                        Edit about
                    </li>
                </Link>
                <Link to='/edit_contact'>
                    <li className="hover:bg-blue-500 text-white flex items-center px-4 py-2.5 rounded-lg">
                        <FaEdit className='mr-2' />
                        Edit contact
                    </li>
                </Link>
                <Link to='/feedback'>
                    <li className="hover:bg-blue-500 text-white flex items-center px-4 py-2.5 rounded-lg">
                        <VscFeedback className='mr-2' />
                        Feedback
                    </li>
                </Link>
                <button className='w-full'  onClick={handleLogOut}>
                    <li className="hover:bg-blue-500 text-white flex items-center px-4 py-2.5 rounded-lg">
                        <MdLogout className='mr-2' />
                        Log out
                    </li>
                </button>
            </ui>
        </aside>
    );
};

export default Sodebar;
