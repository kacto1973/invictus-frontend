import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UnifiedSearchBox = ({ classNames = "", onChange, value, onKeyDown, onDateRangeSelected }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const wrapperRef = useRef(null);

    const handleApplyDates = () => {
        if (startDate && endDate) {
            const formatDate = (date) => {
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            };

            const formattedStart = formatDate(startDate);
            const formattedEnd = formatDate(endDate);

            const newValue = `${formattedStart}$${formattedEnd}`;
            onDateRangeSelected(newValue);
            setShowCalendar(false);
        }
    };

    return (
        <div className={`relative flex items-center bg-white shadow-md rounded-md h-[3rem] w-full ${classNames}`} ref={wrapperRef}>
            <img
                src="/svgs/magnifying-glass-black.svg"
                alt="Buscar"
                className="w-6 h-6 ml-4 mr-2"
            />

            <input
                type="text"
                placeholder="Buscar reporte..."
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="flex-grow outline-none text-sm"
            />

            <button
                type="button"
                onClick={() => setShowCalendar((prev) => !prev)}
                className="h-full flex items-center justify-center rounded-r-md overflow-hidden cursor-pointer transform hover:scale-110 transition duration-200 ease-in-out"
            >
                <img src="/svgs/calendar.svg" alt="Calendario" className="w-full h-full" />
            </button>

            <div
                className={`absolute top-full right-0 bg-white p-4 rounded shadow-lg z-10 mt-2 flex flex-col gap-2 transition-all duration-300 ease-in-out transform ${
                    showCalendar ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
            >

                <label className="text-sm text-gray-700">Fecha inicio:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        className="border p-1 rounded text-sm"
                    />
                    <label className="text-sm text-gray-700">Fecha fin:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        dateFormat="dd/MM/yyyy"
                        className="border p-1 rounded text-sm"
                    />

                    <button
                        onClick={handleApplyDates}
                        className="bg-green-500 hover:bg-green-600 text-white py-1 rounded mt-2"
                    >
                        Aplicar fechas
                    </button>
                </div>

        </div>
    );
};

export default UnifiedSearchBox;
