import React, { useEffect, useState } from 'react';
import { BsSearch } from "react-icons/bs";
import axios from 'axios';
import { MdOutlineAdminPanelSettings, MdDeleteForever } from "react-icons/md";
import { FaRegUser, FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';

function ListUser() {

    const [allUsers, setAllUsers] = useState([]);
    const [filterData, setFilterData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/allUsers')
            .then((response) => {
                setAllUsers(response.data);
                setFilterData(response.data);
            })
            .catch((error) => console.log(error.message))
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filterDataByName = (search) => {
        const filtered = allUsers?.filter((item) =>
            item.user_name.toLowerCase().includes(search.toLowerCase())
        );
        setFilterData(filtered);
    }

    const handleUpdate = (user_id, user_type, user_name) => {
        let role = user_type === 'user' ? "user" : "admin"
        let text1 = ""
        let text2 = ""
        if (role === "user") {
            text1 = `Do you want to switch ${user_name} to admin?`
            text2 = ` ${user_name} is now an admin`
        } else {
            text1 = `Do you want to switch ${user_name} to user?`
            text2 = ` ${user_name} is now a user`
        }
        Swal.fire({
            title: text1,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: "blue",
            cancelButtonText: "Cancel",
            cancelButtonColor: "red",
            icon: "question",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:5000/updateUserRole/${user_id}`)
                    .then(function (response) {
                        if (response.status === 200) {
                            Swal.fire({
                                icon: "success",
                                title: text2,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }).catch(function () {
                        Swal.fire({
                            icon: "error",
                            title: "Server error",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    });
            } else
                Swal.fire({
                    icon: "error",
                    title: "Cancelled",
                    showConfirmButton: false,
                    timer: 1000
                });
        })
    }

    const handleDelete = (user_id, user_name) => {
        Swal.fire({
            title: `Do you want to remove ${user_name}?`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: "blue",
            cancelButtonText: "Cancel",
            cancelButtonColor: "red",
            icon: "question",
        }
        ).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:5000/updateUserFlag/${user_id}`)
                    .then((response) => {
                        if (response.status === 200) {
                            Swal.fire({
                                icon: "success",
                                title: `${user_name} has been removed `,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }).catch(function () {
                        Swal.fire({
                            icon: "error",
                            title: "Server error",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    });
            } else
                Swal.fire({
                    icon: "error",
                    title: "Cancelled",
                    showConfirmButton: false,
                    timer: 1000
                });
        })
    }

    return (
        <div>
            <div className="px-10 pt-16">
                <h3 className="text-blue-500 text-xl font-semibold sm:text-2xl">
                    All users & admins
                </h3>
            </div>
            <form className="relative mt-3 px-10">
                <div className="absolute flex items-center ml-2 h-full">
                    <BsSearch className="text-blue-500" />
                </div>
                <input
                    type="text"
                    placeholder="Search by user name"
                    className="w-1/2 px-8 py-2 border bg-transparent outline-none shadow-sm rounded-lg border-black text-blue-500 focus:border-blue-500"
                    onChange={(event) => { filterDataByName(event.target.value); }} />
            </form>
            <div className="mt-3 overflow-x-scroll xl:overflow-hidden px-10">
                {filterData.length === 0 ? (
                    <p>No data matching your criteria</p>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className='text-blue-500'>
                                <th className="border-b border-black pb-4 text-start">
                                    Name
                                </th>
                                <th className="border-b border-black pr-28 pb-4 text-start dark:!border-navy-700">
                                    Email
                                </th>
                                <th className="border-b border-black pb-4 text-start">
                                    Phone
                                </th>
                                <th className="border-b border-black pb-4 text-start">
                                    Role
                                </th>
                                <th className="border-b border-black pb-4 text-start">
                                    Role shift
                                </th>
                                <th className="border-b border-black pb-4 text-start">
                                    Delet
                                </th>
                            </tr>
                        </thead>
                        {filterData?.map((user) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td className="pt-5 pb-6 flex items-center">
                                            {user?.user_type === 'user' ?
                                                <div className="h-12 w-12">
                                                    <img
                                                        src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                                        className="h-full w-full rounded-full"
                                                        alt="user" />
                                                </div>
                                                :
                                                <div className="h-11 w-11">
                                                    <img
                                                        src="data:image/jpeg;base64,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"
                                                        className="h-full w-full rounded-full"
                                                        alt="admin" />
                                                </div>
                                            }
                                            <p className="text-black ml-3">
                                                {user?.user_name}
                                            </p>
                                        </td>
                                        <td className="pt-5 pb-6">
                                            <p className="text-black">
                                                {user?.user_email}
                                            </p>
                                        </td>
                                        <td className="pt-5 pb-6">
                                            <p className="text-blackS">
                                                {user?.user_phone}
                                            </p>
                                        </td>
                                        <td className="pt-5 pb-6">
                                            <p className="text-black">
                                                {user?.user_type === 'user' ?
                                                    <div className="w-10 flex flex-col justify-center items-center" >
                                                        <FaRegUser />
                                                        <span>user</span>
                                                    </div>
                                                    :
                                                    <div className="w-10 flex flex-col justify-center items-center">
                                                        <MdOutlineAdminPanelSettings />
                                                        <span>Admin</span>
                                                    </div>
                                                }
                                            </p>
                                        </td>
                                        <td className="pt-5 pb-6">
                                            <button className="ml-6"
                                                onClick={() => handleUpdate(user.user_id, user.user_type, user.user_name)}
                                            >
                                                <FaEdit className='w-6 h-6 text-blue-500 hover:text-blue-700 transition' />
                                            </button>
                                        </td>
                                        <td className="pt-5 pb-6">
                                            <button onClick={() => handleDelete(user.user_id, user.user_name)}>
                                                <MdDeleteForever className='w-7 h-7 text-red-500 hover:text-red-700 transition' />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>
                )}
            </div>
        </div>
    );
};

export default ListUser;
