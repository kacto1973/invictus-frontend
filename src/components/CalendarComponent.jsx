import { DATE_VIEWS } from "@mui/x-date-pickers/internals";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importa los estilos por defecto
import { DateTime } from "luxon";

const CalendarComponent = ({ reservations, maintenances }) => {
  //const [selectedDate, setSelectedDate] = useState(new Date());

  /* functions */
  const getTileClassName = ({ date, view }) => {
    //si la vista es distina a los 30 días del mes, no aplicamos clases
    if (view !== "month") return null;

    const zonaHermosillo = "America/Hermosillo";

    //comparamos si el día se encuentra en el rango de una reserva

    if (Array.isArray(reservations) || reservations?.length > 0) {
      for (const reservation of reservations) {
        const startDate = DateTime.fromISO(reservation.fechaInicio, {
          zone: zonaHermosillo,
        });
        const endDate = DateTime.fromISO(reservation.fechaFin, {
          zone: zonaHermosillo,
        }).plus({ days: 1 }); //mexicanada pa q jale porque no incluye el último día;
        const dateTile = DateTime.fromJSDate(date, { zone: zonaHermosillo });

        //si cae en el rango aplicamos el color de la reservación
        if (startDate <= dateTile && dateTile <= endDate) {
          return "!bg-blue-300";
        }
      }
    }
    if (Array.isArray(maintenances) || maintenances?.length > 0) {
      for (const maintenance of maintenances) {
        const startDate = DateTime.fromISO(maintenance.fechaInicio, {
          zone: zonaHermosillo,
        });
        const endDate = DateTime.fromISO(maintenance.fechaFin, {
          zone: zonaHermosillo,
        }).plus({ days: 1 }); //mexicanada pa q jale porque no incluye el último día;
        const dateTile = DateTime.fromJSDate(date, { zone: zonaHermosillo });

        //si cae en el rango aplicamos el color de la reservación
        if (startDate <= dateTile && dateTile <= endDate) {
          return "!bg-pink-300";
        }
      }
    }

    return null;
  };

  return (
    <div className="p-4">
      {/*<h2 className="text-lg font-semibold mb-2">Selecciona una fecha:</h2>*/}
      <Calendar
        tileClassName={getTileClassName}
        //onChange={setSelectedDate}
        //value={selectedDate}
      />

      {/*<p className="mt-4">Fecha seleccionada: {selectedDate.toDateString()}</p>*/}
    </div>
  );
};

export default CalendarComponent;
