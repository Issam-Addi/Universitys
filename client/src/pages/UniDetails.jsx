import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import { MdEmail, MdDescription } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { IoLocation } from "react-icons/io5";
import { FaBusAlt } from "react-icons/fa";

function UniDetails() {

    const { university_id } = useParams();

    const [uni, setUni] = useState([]);
    const [street, setStreet] = useState([]);

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

    useEffect(() => {
        const unisData = async () => {
            try {
                const uniData = await axios.get(`http://localhost:5000/uniData/${university_id}`);
                setUni(uniData.data);
                const streetData = await axios.get(`http://localhost:5000/uniStreetData/${university_id}`);
                setStreet(streetData.data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        unisData();
    }, [university_id]);

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
                                    </ul>
                                </div>
                            </footer>
                        </div>
                    </article>
                </div>
            </section>
            <div className="text-left max-w-screen-xl mx-auto px-4 lg:flex md:px-8 pt-5 md:pt-0 mt-80 md:mt-0">
                <h3 className="text-blue-500 text-3xl font-semibold sm:text-4xl">
                    Buses
                </h3>
            </div>
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
                        </div>
                    ))
                }
            </section>
        </div>
    )
}

export default UniDetails;
