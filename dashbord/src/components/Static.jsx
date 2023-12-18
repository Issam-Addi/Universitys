import React, { useEffect, useState } from 'react';
import { FaRegUser, FaUniversity } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { MdAdminPanelSettings } from "react-icons/md";
import axios from 'axios';

function Static() {

    const [allUsers, setAllUsers] = useState([]);
    const [unisData, setUnisData] = useState([]);
    const [feedback, setFeedback] = useState([]);

    const admin = allUsers?.filter((admin) => admin.user_type === 'admin');
    const user = allUsers?.filter((user) => user.user_type === 'user');

    useEffect(() => {

        axios.get('http://localhost:5000/allUsers')
            .then((response) => {
                setAllUsers(response.data)
            })
            .catch((error) => console.log(error.message))

        axios.get('http://localhost:5000/unisData')
            .then((response) => {
                setUnisData(response.data);
            })
            .catch((error) => console.log(error.message))

        axios.get('http://localhost:5000/getMessages')
            .then((response) => {
                setFeedback(response.data);
            })
            .catch((error) => console.log(error.message))

    }, []);

    return (
        <div>
            <div className="px-10 pt-16">
                <h3 className="text-blue-500 text-xl font-semibold sm:text-2xl">
                    Static data
                </h3>
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 px-10 mt-3">

                <div className="flex flex-row gap-4 rounded-lg bg-black flex-grow items-center p-5">
                    <div className="rounded-full bg-white p-3 w-10 h-10 flex items-center justify-center">
                        <FaRegUser className='w-7 h-7 text-blue-500' />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="font-dm text-sm font-medium text-white">
                            Total users
                        </p>
                        <h4 className="text-xl font-bold text-blue-500">
                            {user.length}
                        </h4>
                    </div>
                </div>

                <div className="flex flex-row gap-4 rounded-lg bg-black flex-grow items-center p-5">
                    <div className="rounded-full bg-white p-3 w-10 h-10 flex items-center justify-center">
                        <MdAdminPanelSettings className='w-8 h-8 text-blue-500' />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="font-dm text-sm font-medium text-white">
                            Total admins
                        </p>
                        <h4 className="text-xl font-bold text-blue-500">
                            {admin.length}
                        </h4>
                    </div>
                </div>

                <div className="flex flex-row gap-4 rounded-lg bg-black flex-grow items-center p-5">
                    <div className="rounded-full bg-white p-3 w-10 h-10 flex items-center justify-center">
                        <FaUniversity className='w-7 h-7 text-blue-500' />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="font-dm text-sm font-medium text-white">
                            Total Universitys
                        </p>
                        <h4 className="text-xl font-bold text-blue-500">
                            {unisData?.length}
                        </h4>
                    </div>
                </div>

                <div className="flex flex-row gap-4 rounded-lg bg-black flex-grow items-center p-5">
                    <div className="rounded-full bg-white p-3 w-10 h-10 flex items-center justify-center">
                        <VscFeedback className='w-7 h-7 text-blue-500' />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="font-dm text-sm font-medium text-white">
                            Total feedback
                        </p>
                        <h4 className="text-xl font-bold text-blue-500">
                            {feedback.length}
                        </h4>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Static;
