import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import { MdEmail, MdDescription } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { IoLocation } from "react-icons/io5";
import { FaEdit, FaBusAlt } from "react-icons/fa";
import Swal from 'sweetalert2';

function UniDetails() {

    const { university_id } = useParams();
    const [uni, setUni] = useState([]);
    const [street, setStreet] = useState([]);
    const [university_name, setUniversity_name] = useState([]);
    const [university_description, setUniversity_description] = useState([]);
    const [university_email, setUniversity_email] = useState([]);
    const [university_location, setUniversity_location] = useState([]);
    const [number_of_majors, setNumber_of_majors] = useState([]);
    const [university_phone, setUniversity_phone] = useState([]);
    const [university_image, setUniversity_image] = useState([]);
    const [university_image1, setUniversity_image1] = useState([]);
    const [starting_place, setStarting_place] = useState([]);
    const [editStarting_place, setEditStarting_place] = useState([]);
    const [departure_time, setDeparture_time] = useState([]);
    const [editDeparture_time, setEditDeparture_time] = useState([]);
    const [edit, setEdit] = useState(false);
    const [addStreet, setAddStreet] = useState(false);
    const [editStreet, setEditStreet] = useState(false);
    const [street_id, setStreet_id] = useState("");

    useEffect(() => {
        const unisData = async () => {
            try {
                const uniData = await axios.get(`http://localhost:5000/uniData/${university_id}`);
                setUni(uniData.data);
                setUniversity_name(uniData.data[0]?.university_name);
                setUniversity_description(uniData.data[0]?.university_description);
                setUniversity_email(uniData.data[0]?.university_email);
                setUniversity_location(uniData.data[0]?.university_location);
                setNumber_of_majors(uniData.data[0]?.number_of_majors);
                setUniversity_phone(uniData.data[0]?.university_phone);
                setUniversity_image(uniData.data[0]?.university_image);
                setUniversity_image1(uniData.data[0]?.university_image1);
                const streetData = await axios.get(`http://localhost:5000/uniStreetData/${university_id}`);
                setStreet(streetData.data);
                setEditStarting_place(streetData.data[0].starting_place);
                setEditDeparture_time(streetData.data[0].departure_time);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        unisData();
    }, [university_id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const formatDepartureTime = (departureTime) => {
        const parsedTime = new Date(`1970-01-01T${departureTime}`);
        const hours = parsedTime.getHours();
        const minutes = parsedTime.getMinutes();
        const formattedTime = hours > 12 ?
            `${hours - 12}:${minutes.toString().padStart(2, '0')} PM`
            : `${hours}:${minutes.toString().padStart(2, '0')} AM`;
        return formattedTime;
    };

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
            title: "Are you sure you want to edit University data?",
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
                    axios.put(`http://localhost:5000/updataUniData/${uni[0]?.university_id}`, {
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
                                Swal.fire({
                                    icon: "success",
                                    title: "The University data has been updated successfully",
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
                    setEdit(!edit)
                } else
                    Swal.fire({
                        icon: "error",
                        title: "Cancelled",
                        showConfirmButton: false,
                        timer: 1000
                    });
            })
    }

    function handleCreateStreet(event) {
        event.preventDefault()
        Swal.fire({
            title: "Are you sure you want to add new street?",
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
                    axios.post(`http://localhost:5000/addStreetData`, {
                        university_id: uni[0]?.university_id,
                        starting_place: starting_place,
                        departure_time: departure_time
                    })
                        .then(function (response) {
                            if (response.status === 200) {
                                Swal.fire({
                                    icon: "success",
                                    title: "The street University data has been added successfully",
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
                    setAddStreet(false)
                } else
                    Swal.fire({
                        icon: "error",
                        title: "Cancelled",
                        showConfirmButton: false,
                        timer: 1000
                    });
            })
    }

    function handleEditStreet(event) {
        event.preventDefault()
        Swal.fire({
            title: "Are you sure you want to edit street data?",
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
                    axios.put(`http://localhost:5000/editStreetData/${street_id}`, {
                        university_id: uni[0]?.university_id,
                        starting_place: editStarting_place,
                        departure_time: editDeparture_time
                    })
                        .then(function (response) {
                            if (response.status === 200) {
                                Swal.fire({
                                    icon: "success",
                                    title: "The street data has been update successfully",
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
                    setEditStreet(false)
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
            <section className="relative flex flex-col items-center justify-center text-center text-white h-[39.2rem]">
                <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
                    <img
                        className="min-w-full min-h-full absolute object-cover"
                        src={uni[0]?.university_image}
                        alt={uni[0]?.university_name} />
                </div>
                <div className="space-y-2 z-10 bg-black p-4 rounded-lg bg-opacity-50">
                    <h1 className="font-bold text-2xl">Welcome to</h1>
                    <h3 className="font-bold text-2xl">
                        <span className='text-blue-500 text-5xl'>{uni[0]?.university_name} </span>university</h3>
                </div>
            </section>
            <section className="flex flex-col justify-center py-28 h-[35rem]">
                <div className="max-w-screen-xl mx-auto p-4 md:px-8 w-full h-full">
                    <article className="mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
                        <div className="relative block group">
                            <div
                                className="absolute inset-0 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none"
                                aria-hidden="true" />
                            <figure className="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
                                <img className="absolute inset-0 w-full h-full rounded-lg object-cover transform hover:scale-105 transition duration-700 ease-out"
                                    src={uni[0]?.university_image1}
                                    width={540}
                                    height={303}
                                    alt={uni[0]?.university_name} />
                            </figure>
                        </div>
                        <div>
                            <header>
                                <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-3">
                                    <p className="duration-150 ease-in-out text-blue-500">
                                        A brief overview of {uni[0]?.university_name} University:
                                    </p>
                                </h3>
                            </header>
                            <MdDescription className='text-blue-500 inline-block h-7 w-7 mr-2' />
                            <p className="text-lg text-black flex-grow overflow-y-scroll h-28 sm:h-20 lg:h-28 mb-3">
                                {uni[0]?.university_description}
                            </p>
                            <p className="text-lg text-black flex-grow mb-3">
                                <ImBooks className='text-blue-500 inline-block h-7 w-7 mr-2' />Number of Majors: {uni[0]?.number_of_majors}
                            </p>
                            <p className="text-lg text-black flex-grow mb-3 -ml-1">
                                <IoLocation className='text-blue-500 inline-block h-7 w-7 mr-2' />Location: {uni[0]?.university_location}
                            </p>
                            <p className="text-lg text-black flex-grow mb-3">
                                <FaBusAlt className='text-blue-500 inline-block h-6 w-6 mr-2' />The number of buses that reach this university: {street?.length}
                            </p>
                            <footer className="flex items-center">
                                <div className="my-3">
                                    <ul className="flex flex-wrap text-xs font-medium -m-1">
                                        <a href={`tel://${uni[0]?.university_phone}`}>
                                            <li className="m-1 inline-flex text-center items-center border border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500 justify-between gap-4 text-lg py-1 px-3 rounded-full">
                                                <FaPhone className=' h-7 w-7' />
                                                {uni[0]?.university_phone}
                                            </li>
                                        </a>
                                        <a href={`mailto:${uni[0]?.university_email}`}>
                                            <li className="m-1 inline-flex text-center items-center border border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500 justify-between gap-4 text-lg py-1 px-3 rounded-full">
                                                <MdEmail className=' h-7 w-7' />
                                                {uni[0]?.university_email}
                                            </li>
                                        </a>
                                        <button onClick={() => { setEdit(!edit) }}>
                                            <li className="m-1 inline-flex text-center items-center border border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500 justify-between gap-4 text-lg py-1 px-3 rounded-full">
                                                <FaEdit className=' h-6 w-6' />
                                                Edit Data
                                            </li>
                                        </button>
                                    </ul>
                                </div>
                            </footer>
                        </div>
                    </article>
                </div>
            </section>
            {edit && (
                <div className='block pb-16'>
                    <div className="px-10">
                        <h3 className="text-blue-500 text-xl font-semibold sm:text-2xl">
                            Edit University data
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
                                        value={university_name}
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
                                        value={university_description}
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
                                        value={university_email}
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
                                        value={number_of_majors}
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
                                        value={university_location}
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
                                        value={university_phone}
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
                                        />
                                    </label>
                                </div>
                                <div>
                                    <p className='m-0 mt-10 -mb-7'>
                                        Card and details image <span className='text-red-700 text-xl'>*</span>
                                    </p>
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
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <button type='submit'
                                    className="rounded-lg border border-current px-6 py-2 md:text-sm font-normal border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="text-left max-w-screen-xl mx-auto px-4 lg:flex md:px-8 pt-10 flex justify-between">
                <h3 className="text-blue-500 text-3xl font-semibold sm:text-4xl">
                    Buses
                </h3>
                <button
                    onClick={() => setAddStreet(true)}
                    className="rounded-lg border border-current px-6 py-2 md:text-sm font-normal border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500">
                    Add new street
                </button>
            </div>
            {addStreet && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-md z-50 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4 text-left">
                            Create new street
                        </h2>
                        <form onSubmit={handleCreateStreet}>
                            <div className="mb-4">
                                <label
                                    htmlFor="starting_place"
                                    className="block text-black font-bold mb-2 text-left">
                                    Starting place <span className='text-red-700 text-xl'>*</span>
                                </label>
                                <input
                                    onChange={(event) => setStarting_place(event.target.value)}
                                    type="text"
                                    id="starting_place"
                                    placeholder='Starting . . .'
                                    className="shadow-xl border border-black focus:border-blue-500 text-blue-500 rounded-lg w-full py-2 px-3 leading-tight outline-none"
                                    required />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="departure_time"
                                    className="block text-black font-bold mb-2 text-left">
                                    Departure time <span className='text-red-700 text-xl'>*</span>
                                </label>
                                <input
                                    onChange={(event) => setDeparture_time(event.target.value)}
                                    type="time"
                                    id="departure_time"
                                    className="shadow-xl border border-black focus:border-blue-500 text-blue-500 rounded-lg w-full py-2 px-3 leading-tight outline-none"
                                    required />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="rounded-lg border border-blue-500 px-8 py-3 text-sm font-medium text-blue-500 transition hover:rotate-2 hover:scale-110 outline-none ring-0 hover:bg-blue-500 hover:text-white">
                                    Create street
                                </button>
                                <button
                                    onClick={() => setAddStreet(false)}
                                    className="rounded-lg border border-red-500 px-8 py-3 text-sm font-medium text-red-500 transition hover:rotate-2 hover:scale-110 outline-none ring-0 hover:bg-red-500 hover:text-white">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="text-left max-w-screen-xl mx-auto px-4 lg:flex md:px-8">
                <p className="mt-3">
                    We'll show you most of the bus locations and departure times:
                </p>
            </div>
            <section className='pb-24 mt-12'>
                {
                    street?.map((item, idx) => (
                        <div key={idx} className="flex w-full justify-start items-center mb-4 gap-4 max-w-screen-xl mx-auto px-4 lg:flex md:px-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none">
                                <g clip-path="url(#clip0_35_760)">
                                    <path
                                        d="M10.4301 27.6753L10.4281 27.6741L3.71713 24.0168L10.4209 20.3526C10.421 20.3525 10.4211 20.3524 10.4213 20.3524C14.6026 18.0678 18.0488 14.6217 20.3334 10.4405C20.3336 10.4403 20.3337 10.44 20.3338 10.4397C20.3339 10.4396 20.334 10.4395 20.334 10.4394L24.0088 3.72229L27.6753 10.4301C29.9599 14.6119 33.4063 18.0584 37.588 20.3431C37.5882 20.3432 37.5883 20.3432 37.5884 20.3433L44.2953 24.0093L37.5884 27.6753C37.5883 27.6753 37.5882 27.6754 37.588 27.6755C33.4063 29.9602 29.9599 33.4067 27.6753 37.5884L24.0093 44.2953L20.3433 37.5884C18.0586 33.4066 14.612 29.96 10.4301 27.6753Z"
                                        stroke="#3b82f6"
                                        stroke-width="4.5" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_35_760">
                                        <rect
                                            width="48"
                                            height="48"
                                            fill="white"
                                            transform="translate(48 48) rotate(-180)"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            <p className="text-black">
                                Bus no {idx + 1}: Stopping place {item.starting_place}{' '}
                                {item.departure_time && (
                                    <>
                                        And the departure time is{' '}
                                        {formatDepartureTime(item.departure_time)}
                                    </>
                                )}
                            </p>
                            <button
                                onClick={() => {
                                    setEditStreet(true);
                                    setStreet_id(item?.street_id);
                                }}
                                className="ml-6">
                                <FaEdit className='w-6 h-6 text-blue-500' />
                            </button>
                        </div>
                    ))
                }
            </section>
            {editStreet && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-md z-50 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4 text-left">
                            Edit street
                        </h2>
                        <form onSubmit={handleEditStreet}>
                            <div className="mb-4">
                                <label
                                    htmlFor="editStarting_place"
                                    className="block text-black font-bold mb-2 text-left">
                                    Starting place <span className='text-red-700 text-xl'>*</span>
                                </label>
                                <input
                                    onChange={(event) => setEditStarting_place(event.target.value)}
                                    type="text"
                                    id="editStarting_place"
                                    value={editStarting_place}
                                    placeholder='Starting . . .'
                                    className="shadow-xl border border-black focus:border-blue-500 text-blue-500 rounded-lg w-full py-2 px-3 leading-tight outline-none"
                                    required />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="starting_place"
                                    className="block text-black font-bold mb-2 text-left">
                                    Departure time <span className='text-red-700 text-xl'>*</span>
                                </label>
                                <input
                                    onChange={(event) => setEditDeparture_time(event.target.value)}
                                    type="time"
                                    id="starting_place"
                                    value={editDeparture_time}
                                    className="shadow-xl border border-black focus:border-blue-500 text-blue-500 rounded-lg w-full py-2 px-3 leading-tight outline-none"
                                    required />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="rounded-lg border border-blue-500 px-8 py-3 text-sm font-medium text-blue-500 transition hover:rotate-2 hover:scale-110 outline-none ring-0 hover:bg-blue-500 hover:text-white">
                                    Update
                                </button>
                                <button
                                    onClick={() => setEditStreet(false)}
                                    className="rounded-lg border border-red-500 px-8 py-3 text-sm font-medium text-red-500 transition hover:rotate-2 hover:scale-110 outline-none ring-0 hover:bg-red-500 hover:text-white">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UniDetails;