import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importa los estilos por defecto
import { DateTime } from "luxon";

const CalendarComponent = ({
  reservations,
  maintenances,
  selectedRange,
  onChangeRange,
  applyRange,
}) => {
  /*states */
  //  const [selectedRange, setSelectedRange] = useState([]);

  /* functions */
  const getTileClassName = ({ date, view }) => {
    //si la vista es distina a los 30 días del mes, no aplicamos clases
    if (view !== "month") return null;

    const zonaHermosillo = "America/Hermosillo";

    const dateTile = DateTime.fromJSDate(date, { zone: zonaHermosillo });
    const currentDate = DateTime.now({ zone: zonaHermosillo });

    if (dateTile < currentDate) {
      return "!pointer-events-none !cursor-not-allowed !bg-gray-300 !text-black";
    }

    if (Array.isArray(reservations) || reservations?.length > 0) {
      //comparamos si el día se encuentra en el rango de una reserva

      for (const reservation of reservations) {
        const startDate = DateTime.fromISO(reservation.fechaInicio, {
          zone: zonaHermosillo,
        });
        const endDate = DateTime.fromISO(reservation.fechaFin, {
          zone: zonaHermosillo,
        }).plus({ days: 1 }); //mexicanada pa q jale porque no incluye el último día;

        //si cae en el rango aplicamos el color de la reservación
        if (startDate <= dateTile && dateTile <= endDate) {
          return "!bg-red-400";
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

        //si cae en el rango aplicamos el color del mantenimeinto
        if (startDate <= dateTile && dateTile <= endDate) {
          return "!bg-orange-400";
        }
      }
    }

    return null;
  };

  return (
    <div className="p-4">
      {/*<h2 className="text-lg font-semibold mb-2">Selecciona una fecha:</h2>*/}
      <Calendar
        selectRange={applyRange}
        tileClassName={getTileClassName}
        onChange={onChangeRange}
        value={selectedRange}
      />

      {}
    </div>
  );
};

export default CalendarComponent;
