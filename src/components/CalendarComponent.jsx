import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importa los estilos por defecto

const CalendarComponent = ({ reservations, maintenances }) => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Selecciona una fecha:</h2>
      <Calendar onChange={setDate} value={date} />
      <p className="mt-4">Fecha seleccionada: {date.toDateString()}</p>
    </div>
  );
};

export default CalendarComponent;
