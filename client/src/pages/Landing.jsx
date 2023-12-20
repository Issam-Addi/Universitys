import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Hero from "../assets/image/Hero.png";

function Landing() {

    const [unis, setUnis] = useState([]);
    const showAll = false;
    const visibleUnis = showAll ? unis : unis.slice(0, 3);

    useEffect(() => {
        const unisData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/unisData');
                setUnis(response.data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        unisData();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const features = [
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>,
            title: "Moving fast",
            desc: "Reducing time and effort searching for the rogue bus."
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>,
            title: "Accurate data",
            desc: "Be aware of the updated data first."
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                </svg>,
            title: "Availability of all universities",
            desc: "Find out information about universities and ways to reach them."
        },

    ]

    return (
        <>
            <div
                className="bg-cover bg-center h-screen bg-fixed"
                style={{ backgroundImage: `url(${Hero})`, height: "39.7rem" }}>
                <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <div className="text-center w-1/2">
                        <h1 className="font-bold text-5xl text-blue-500 mb-3">Welcome to Naqilati</h1>
                        <h3 className="font-bold text-2xl text-white">In Naqilati, do not get lost or confused,<br />Know your University bus, where to stop and when to move</h3>
                        <div className="mt-8">
                            <Link to='/all_university'>
                                <button className="rounded-lg border px-6 py-2 md:text-sm font-normal border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500">
                                    Pick Your University
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <section className="relative pt-10">
                <div className="relative z-10 max-w-screen-xl mx-auto px-4 justify-between gap-24 lg:flex md:px-8">
                    <div className="max-w-xl">
                        <h3 className="text-blue-500 text-3xl font-semibold sm:text-4xl">
                            Some features for the weibsite
                        </h3>
                        <p className="mt-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus
                        </p>
                    </div>
                    <div className="mt-12 lg:mt-0">
                        <ul className="grid gap-8 sm:grid-cols-2">
                            {
                                features.map((item, idx) => (
                                    <li key={idx} className="flex gap-x-4 border border-blue-500 p-4 rounded-lg h-40">
                                        <div className="flex-none w-12 h-12 bg-black text-blue-500 rounded-lg flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-lg text-black font-semibold">
                                                {item.title}
                                            </h4>
                                            <p className="mt-3">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <div className="max-w-screen-xl mx-auto px-4 text-center py-28 md:px-8">
                    <div className="text-left">
                        <h3 className="text-blue-500 text-3xl font-semibold sm:text-4xl">
                            The most popular universities
                        </h3>
                    </div>
                    <div className="mt-12">
                        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                            {visibleUnis.map((item, idx) => (
                                <Link
                                    to={`/university/${item.university_id}`}
                                    key={idx}
                                    className="transition hover:rotate-2 hover:scale-110 hover:shadow-xl rounded-lg">
                                    <div className="border border-blue-500 px-1 rounded-lg">
                                        <img
                                            src={item.university_image1}
                                            alt={`${item.university_name} university`}
                                            className="object-center w-full rounded-t-md h-48" />
                                        <div className="flex flex-col justify-between p-6 space-y-8">
                                            <div className="space-y-2">
                                                <h2 className="text-3xl">{item.university_name}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {!showAll && unis.length > 3 && (
                            <div className="mt-4 text-center">
                                <Link to="/all_university">
                                    <button className="rounded-lg border px-6 py-2 md:text-sm font-normal border-blue-500 hover:border-blue-500 text-blue-500 transition hover:rotate-2 hover:scale-110 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:shadow-blue-500">
                                        Show More
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Landing;