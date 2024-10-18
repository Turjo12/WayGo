"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaThList, FaThLarge } from "react-icons/fa";
import Link from "next/link";

const AllBus = ({ searchResults, departureDate }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [layout, setLayout] = useState("list");
  const busData = searchResults;

  const handleShowMore = () => {
    if (visibleCount < busData.length) {
      setVisibleCount((prevCount) => Math.min(prevCount + 6, busData.length));
    } else {
      setVisibleCount(6);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleLayout = () => {
    setLayout((prevLayout) => (prevLayout === "list" ? "grid" : "list"));
  };

  return (
    <div className="p-4 min-h-screen my-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-orange-600">All Buses</h2>
        <button onClick={toggleLayout} aria-label="Toggle layout view">
          {layout === "list" ? (
            <FaThLarge className="text-2xl text-orange-600 hover:text-orange-700 transition-colors" />
          ) : (
            <FaThList className="text-2xl text-orange-600 hover:text-orange-700 transition-colors" />
          )}
        </button>
      </div>

      <div
        className={`${
          layout === "list"
            ? "space-y-6"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center"
        }`}
      >
        <AnimatePresence>
          {busData.slice(0, visibleCount).map((bus) => (
            <motion.div
              key={bus._id}
              className={`bg-white shadow-md rounded-lg overflow-hidden p-6 flex flex-col ${
                layout === "list" ? "md:flex-row" : "items-start"
              } justify-between gap-6 hover:shadow-lg transition-shadow duration-300`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              layout
            >
              <div
                className={`${
                  layout === "list" ? "w-full md:w-1/3" : "w-full"
                }`}
              >
                <img
                  src={bus.busImage}
                  alt={bus.busName}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div
                className={`${
                  layout === "list"
                    ? "w-full md:w-2/3"
                    : "w-full mt-4 text-left"
                }`}
              >
                <h3 className="text-lg font-semibold text-orange-700 mb-2">
                  {bus.busName}
                </h3>
                {layout === "list" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p>
                        <strong>From:</strong> {bus.from}
                      </p>
                      <p>
                        <strong>To:</strong> {bus.to}
                      </p>
                      <p>
                        <strong>Departure Time:</strong> {bus.departureTime}
                      </p>
                      <p>
                        <strong>Arrival Time:</strong> {bus.arrivalTime}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>AC:</strong> {bus.ac}
                      </p>
                      <p>
                        <strong>WiFi:</strong> {bus.wifi}
                      </p>
                      <p>
                        <strong>Total Seats:</strong> {bus.totalSeats}
                      </p>
                      <p className="text-xl font-bold text-orange-600">
                        Seat Price: {bus.seatPrice} BDT
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>
                      <strong>From:</strong> {bus.from}
                    </p>
                    <p>
                      <strong>To:</strong> {bus.to}
                    </p>
                    <p>
                      <strong>Departure:</strong> {bus.departureTime}
                    </p>
                    <p>
                      <strong>Arrival:</strong> {bus.arrivalTime}
                    </p>
                    <p>
                      <strong>AC:</strong> {bus.ac}
                    </p>
                    <p>
                      <strong>WiFi:</strong> {bus.wifi}
                    </p>
                    <p>
                      <strong>Total Seats:</strong> {bus.totalSeats}
                    </p>
                    <p className="text-xl font-bold text-orange-600">
                      Seat Price: ${bus.seatPrice}
                    </p>
                  </div>
                )}
              </div>
              <div className="text-left mt-4">
                <Link href={`/AllBus/${bus._id}?date=${departureDate}`}>
                  <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    Book a Ticket
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {busData.length > 6 && (
        <div className="text-center mt-6">
          <button
            className="px-8 py-3 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 transition-all duration-300"
            onClick={handleShowMore}
          >
            {visibleCount >= busData.length ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBus;
