import React, { useState, useEffect } from 'react';
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import UniHero from "../assets/image/UniHero.png"
import ReactPaginate from 'react-paginate';

function AllUniversity() {

    const [unis, setUnis] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [pageCount, setPageCount] = useState('');

    useEffect(() => {
        const unisData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/unisData?p=1');
                setUnis(response.data[1]);
                setFilterData(response.data[1]);
                setPageCount(response.data[0]);
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

    const filterDataByName = (search) => {
        const filtered = unis?.filter((item) =>
            item.university_name.toLowerCase().includes(search.toLowerCase())
        );
        setFilterData(filtered);
    }


    async function handlePageClick(event) {
        const currentPage = event.selected + 1;
        try {
            const response = await axios.get(`http://localhost:5000/unisData?p=${currentPage}`);
            setUnis(response.data[1]);
            setFilterData(response.data[1]);
            setPageCount(response.data[0]);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div>
            <div
                className="bg-cover bg-center h-screen bg-fixed"
                style={{ backgroundImage: `url(${UniHero})`, height: "39.7rem" }}>
                <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">All Universitys</h1>
                        <nav className="text-white mb-8">
                            <ol className="list-none p-0 inline-flex">
                                <li className="flex items-center">
                                    <Link to="/" className="text-blue-500 hover:text-white hover:underline transition">
                                        Home
                                    </Link>
                                    <span className="mx-2"><AiOutlineRight /></span>
                                </li>
                                <li>All University</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="pt-10 max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="sm:w-1/2 w-full">
                    <div className="relative">
                        <div className="absolute flex items-center ml-2 h-full">
                            <BsSearch className="text-blue-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name of University"
                            className="w-full px-8 py-2 border bg-transparent outline-none shadow-sm rounded-lg border-black text-blue-500 focus:border-blue-500"
                            onChange={(event) => { filterDataByName(event.target.value); }} />
                    </div>
                </div>
            </div>

            <section>
                <div className="max-w-screen-xl mx-auto px-4 text-center mt-5 pb-28 md:px-8">
                    <div className="text-left">
                        <h3 className="text-blue-500 text-3xl font-semibold sm:text-4xl">
                            All Universitys
                        </h3>
                    </div>
                    <div className="mt-12">
                        {filterData.length === 0 ? (
                            <p>No data matching your criteria</p>
                        ) : (
                            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                                {
                                    filterData?.map((item, idx) => (
                                        <Link to={`/university/${item.university_id}`}
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
                        )}
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            pageCount={pageCount}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            marginPagesDisplayed={2}
                            containerClassName="flex justify-center mt-4 text-xl"
                            pageClassName="mx-1 flex items-center justify-center px-3 py-1 hover:text-blue-500 transition duration-150"
                            previousClassName="mx-2 flex items-center justify-center px-3 py-1 hover:text-blue-500 transition duration-150"
                            nextClassName="mx-2 flex items-center justify-center px-3 py-1 hover:text-blue-500 transition duration-150"
                            activeClassName="text-blue-500"/>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AllUniversity;
