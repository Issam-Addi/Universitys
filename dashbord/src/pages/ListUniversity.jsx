import React, { useEffect, useState } from 'react';
import { BsSearch } from "react-icons/bs";
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function ListUniversity() {

    const [allUnuis, setAllUnis] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [university_name, setUniversity_name] = useState([]);
    const [university_description, setUniversity_description] = useState([]);
    const [university_email, setUniversity_email] = useState([]);
    const [university_location, setUniversity_location] = useState([]);
    const [number_of_majors, setNumber_of_majors] = useState([]);
    const [university_phone, setUniversity_phone] = useState([]);
    const [university_image, setUniversity_image] = useState(null);
    const [university_image1, setUniversity_image1] = useState(null);
    const [add, setAdd] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/unisData')
            .then((response) => {
                setAllUnis(response.data);
                setFilterData(response.data);
            })
            .catch((error) => console.log(error.message))
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filterDataByName = (search) => {
        const filtered = allUnuis?.filter((item) =>
            item.university_name.toLowerCase().includes(search.toLowerCase())
        );
        setFilterData(filtered);
    }

    // image one
    const onLoadOne = fileString => {
        setUniversity_image(fileString);
    };

    const getBase64ForOne = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoadOne(reader.result);
        };
    };

    const handleImageOne = (event) => {
        const file = event.target.files[0];
        getBase64ForOne(file);
    };

    const removeImageOne = () => {
        setUniversity_image(null);
    };

    // image two
    const onLoadTwo = fileString => {
        setUniversity_image1(fileString);
    };

    const getBase64ForTwo = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoadTwo(reader.result);
        };
    };

    const handleImageTwo = (event) => {
        const file = event.target.files[0];
        getBase64ForTwo(file);
    };

    const removeImageTwo = () => {
        setUniversity_image1(null);
    };

    function handleSubmit(event) {
        event.preventDefault()
        Swal.fire({
            title: "Are you sure you want to add a new University?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: "blue",
            cancelButtonText: "Cancel",
            cancelButtonColor: "red",
            icon: 'question'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post(`http://localhost:5000/addUniData`, {
                        university_name: university_name,
                        university_description: university_description,
                        university_email: university_email,
                        university_location: university_location,
                        number_of_majors: number_of_majors,
                        university_phone: university_phone,
                        university_image: university_image,
                        university_image1: university_image1,
                    })
                        .then(function (response) {
                            if (response.status === 200) {
                                event.target.reset();
                                Swal.fire({
                                    icon: "success",
                                    title: "The University data has been added successfully",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })
                        .catch(function () {
                            Swal.fire({
                                icon: "error",
                                title: "Server error",
                                showConfirmButton: false,
                                timer: 2000
                            });
                        });
                    setAdd(!add);
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
                    All Uunversitys
                </h3>
            </div>
            <div className='grid gap-4 grid-cols-2 items-center mb-3'>
                <form className="relative mt-3 px-10">
                    <div className="absolute flex items-center ml-2 h-full">
                        <BsSearch className="text-blue-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by University name"
                        className="w-full px-8 py-2 border bg-transparent outline-none shadow-sm rounded-lg border-black text-blue-500 focus:border-blue-500"
                        onChange={(event) => { filterDataByName(event.target.value); }} />
                </form>
                <button
                    onClick={() => { setAdd(!add) }}
                    className="rounded-lg w-1/4 border mt-2 py-2.5 border-current md:text-sm font-normal border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500">
                    Add new University
                </button>
            </div>
            {add && (
                <div className='block pb-16'>
                    <div className="px-10">
                        <h3 className="text-blue-500 text-xl font-semibold sm:text-2xl">
                            Add new University
                        </h3>
                    </div>
                    <div className="flex justify-start w-full mt-3 px-10">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-8 w-full">
                            <div className="mb-6 grid gap-6 grid-cols-2">
                                <div>
                                    <label htmlFor='name'>
                                        University name <span className='text-red-700 text-xl'>*</span>
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Name . . ."
                                        className="w-full py-3 px-[14px] mt-2 rounded-lg text-blue-500 border border-black focus:border-blue-500 focus:ring-0 outline-none"
                                        onChange={(event) => setUniversity_name(event.target.value)}
                                        required />
                                </div>
                                <div>
                                    <label htmlFor='description'>
                                        University description <span className='text-red-700 text-xl'>*</span>
                                    </label>
                                    <textarea
                                        rows={6}
                                        id="description"
                                        type="text"
                                        placeholder="Description . . ."
                                        className="w-full py-3 px-[14px] mt-2 rounded-lg text-blue-500 border border-black focus:border-blue-500 focus:ring-0 outline-none"
                                        onChange={(event) => setUniversity_description(event.target.value)}
                                        required />
                                </div>
                            </div>
                            <div className="mb-6 grid gap-6 grid-cols-4">
                                <div>
                                    <label htmlFor='email'>
                                        University email <span className='text-red-700 text-xl'>*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Email . . ."
                                        className="w-full py-3 px-[14px] mt-2 rounded-lg text-blue-500 border border-black focus:border-blue-500 focus:ring-0 outline-none"
                                        onChange={(event) => setUniversity_email(event.target.value)}
                                        required />
                                </div>
                                <div>
                                    <label htmlFor='majors'>
                                        Number of majors <span className='text-red-700 text-xl'>*</span>
                                    </label>
                                    <input
                                        id="majors"
                                        type="text"
                                        placeholder="majors . . ."
                                        className="w-full py-3 px-[14px] mt-2 rounded-lg text-blue-500 border border-black focus:border-blue-500 focus:ring-0 outline-none"
                                        onChange={(event) => setNumber_of_majors(event.target.value)}
                                        required />
                                </div>
                                <div>
                                    <label htmlFor='location'>
                                        University location <span className='text-red-700 text-xl'>*</span>
                                    </label>
                                    <input
                                        id="location"
                                        type="text"
                                        placeholder="location . . ."
                                        className="w-full py-3 px-[14px] mt-2 rounded-lg text-blue-500 border border-black focus:border-blue-500 focus:ring-0 outline-none"
                                        onChange={(event) => setUniversity_location(event.target.value)}
                                        required />
                                </div>
                                <div>
                                    <label htmlFor='phone'>
                                        University phone <span className='text-red-700 text-xl'>*</span>
                                    </label>
                                    <input
                                        id="phone"
                                        type="text"
                                        placeholder="phone . . ."
                                        className="w-full py-3 px-[14px] mt-2 rounded-lg text-blue-500 border border-black focus:border-blue-500 focus:ring-0 outline-none"
                                        onChange={(event) => setUniversity_phone(event.target.value)}
                                        required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 items-center justify-center w-full gap-6 !m-0">
                                <div>
                                    <p className='m-0 mt-10 -mb-7'>
                                        Hero image <span className='text-red-700 text-xl'>*</span>
                                    </p>
                                    <label
                                        htmlFor="Hero"
                                        className="flex flex-col items-center justify-center mt-10 w-full h-40 border-2 border-black border-dashed rounded-lg cursor-pointer bg-transparent hover:bg-blue-100">
                                        {university_image ? (
                                            <>
                                                <img
                                                    src={university_image}
                                                    alt="Hero"
                                                    className="w-28 h-28 mb-2 rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    className="text-sm text-red-500 font-semibold"
                                                    onClick={removeImageOne}>
                                                    Remove
                                                </button>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center">
                                                <svg
                                                    className="w-8 h-8 mb-4 text-blue-500"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16">
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-black font-semibold">
                                                    Click to upload hero image
                                                </p>
                                                <p className="text-xs text-black">
                                                    SVG, PNG or JPG
                                                </p>
                                            </div>
                                        )}
                                        <input
                                            id="Hero"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(event) => handleImageOne(event)}
                                            required
                                        />
                                    </label>
                                </div>
                                <div>
                                    <p className='m-0 mt-10 -mb-7'>
                                        Card and details image
                                        <span className='text-red-700 text-xl'>*</span></p>
                                    <label
                                        htmlFor="Card"
                                        className="flex flex-col items-center justify-center mt-10 w-full h-40 border-2 border-black border-dashed rounded-lg cursor-pointer bg-transparent hover:bg-blue-100">
                                        {university_image1 ? (
                                            <>
                                                <img
                                                    src={university_image1}
                                                    alt="Card"
                                                    className="w-28 h-28 mb-2 rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    className="text-sm text-red-500 font-semibold"
                                                    onClick={removeImageTwo}>
                                                    Remove
                                                </button>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center">
                                                <svg
                                                    className="w-8 h-8 mb-4 text-blue-500"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16">
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-black font-semibold">
                                                    Click to upload Card image
                                                </p>
                                                <p className="text-xs text-black">
                                                    SVG, PNG or JPG
                                                </p>
                                            </div>
                                        )}
                                        <input
                                            id="Card"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(event) => handleImageTwo(event)}
                                            required
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <button type='submit'
                                    className="rounded-lg border border-current px-6 py-2 md:text-sm font-normal border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="mt-3 overflow-x-scroll xl:overflow-hidden px-10">
                {filterData.length === 0 ? (
                    <p>No data matching your criteria</p>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className='text-blue-500'>
                                <th className="border-b border-black pb-4 text-start">
                                    Image
                                </th>
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
                                    Edit data
                                </th>
                            </tr>
                        </thead>
                        {filterData?.map((uni) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td className="pt-5 pb-6 flex items-center">
                                            <div className="h-12 w-12">
                                                <img
                                                    src={uni?.university_image1}
                                                    className="h-full w-full rounded-full"
                                                    alt={uni?.university_name} />
                                            </div>
                                        </td>
                                        <td className="pt-5 pb-6">
                                            <p className="text-black">
                                                {uni?.university_name}
                                            </p>
                                        </td>
                                        <td className="pt-5 pb-6">
                                            <p className="text-black">
                                                {uni?.university_email}
                                            </p>
                                        </td>
                                        <td className="pt-5 pb-6">
                                            <p className="text-blackS">
                                                {uni?.university_phone}
                                            </p>
                                        </td>
                                        <td className="pt-5 pb-6">
                                            <Link to={`/list_universitys/${uni?.university_id}`} className="ml-6">
                                                <FaEdit className='w-6 h-6 text-blue-500 hover:text-blue-700 transition' />
                                            </Link>
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

export default ListUniversity;