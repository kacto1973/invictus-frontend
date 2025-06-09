import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import {
  fetchNotifications,
  fetchDeleteAllNotifications,
  fetchReadAllNotifications,
  fetchDeleteNotificacion,
} from "../services/fetchers.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const getTimeElapsed = (fecha) => {
  const now = DateTime.now();
  const created = DateTime.fromISO(fecha);
  const diffInMins = now.diff(created, "minutes").minutes;
  const diffInHours = now.diff(created, "hours").hours;
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30); // Aprox. mensual

  if (diffInMonths >= 1) {
    return `Hace ${diffInMonths} ${diffInMonths === 1 ? "mes" : "meses"}.`;
  } else if (diffInWeeks >= 1) {
    return `Hace ${diffInWeeks} ${diffInWeeks === 1 ? "sem" : "sems"}.`;
  } else if (diffInDays >= 1) {
    return `Hace ${diffInDays} ${diffInDays === 1 ? "día" : "días"}.`;
  } else if (diffInHours >= 1) {
    return `Hace ${Math.floor(diffInHours)} ${
      Math.floor(diffInHours) === 1 ? "hr" : "hrs"
    }.`;
  } else if (diffInMins < 0) {
    return "Hace 0 mins.";
  } else {
    return `Hace ${Math.floor(diffInMins)} ${
      Math.floor(diffInMins) === 1 ? "min" : "mins"
    }.`;
  }
};

const Header = ({ label }) => {
  const [currentTime, setCurrentTime] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todo");
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  const formatCount = (count) => (count > 9 ? "9+" : count);
  const counts = {
    Todo: formatCount(
      notifications.filter(
        (n) => n.idEstadoNotificacion?.nombre !== "Eliminado"
      ).length
    ),
    Leido: formatCount(
      notifications.filter((n) => n.idEstadoNotificacion?.nombre === "Leido")
        .length
    ),
    "Sin leer": formatCount(
      notifications.filter((n) => n.idEstadoNotificacion?.nombre === "Sin leer")
        .length
    ),
  };

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    if (showNotifications) {
      fetchReadAllNotifications()
        .then(() => {
          queryClient.invalidateQueries(["notifications"]);
        })
        .catch((error) => {
          console.error("Error al marcar notificaciones como leídas:", error);
        });
    }
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = DateTime.now().setZone("America/Hermosillo");
      setCurrentTime(now.toFormat("EEE, h:mm a"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const filteredNotifications = notifications
    .filter((notif) => notif.idEstadoNotificacion?.nombre !== "Eliminado")
    .filter((notif) => {
      if (activeFilter === "Todo") return true;
      return notif.idEstadoNotificacion?.nombre === activeFilter;
    });

  return (
    <>
      {/* HEADER */}
      <div className="w-full h-[5rem] bg-primary mb-5 absolute top-0 left-0 flex items-center z-50">
        <span className="ml-[280px] font-bold text-xl text-white">{label}</span>
        <div className="mr-[5rem] flex flex-row absolute right-0">
          <div className="bg-white flex flex-row p-[5px] rounded-md px-[10px] items-center">
            <img
              src="svgs/clock-black.svg"
              alt="clock icon"
              width={20}
              className="mr-[5px]"
            />
            <p>{currentTime}</p>
          </div>
          <div
            className="bg-white p-2 ml-8 rounded-md relative hover:bg-gray-200 transition duration-200 ease-in-out cursor-pointer"
            onClick={handleBellClick}
          >
            <img
              src="svgs/bell-black.svg"
              alt="bell icon"
              width={25}
              className="transform hover:scale-110 transition duration-200 ease-in-out"
            />
            {counts["Sin leer"] !== 0 && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-[#FE4C4C] rounded-full border border-white"></span>
            )}
          </div>
        </div>
      </div>

      <div
        className={`absolute right-5 flex flex-col items-center transform transition-all duration-300 ease-in-out
      ${
        showNotifications
          ? "opacity-100 translate-y-0"
          : "opacity-0 hidden -translate-y-5"
      }
    `}
        style={{
          top: "5rem",
          width: "390px",
          height: "521px",
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          zIndex: 40,
          overflow: "hidden",
          // display: showNotifications ? 'flex' : 'none',
        }}
      >
        <div
          style={{
            width: "100%",
            height: "48px",
            backgroundColor: "#D9D9D9",
            display: "flex",
            alignItems: "center",
            paddingLeft: "16px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Notificaciones
        </div>

        <div style={{ height: "22px" }}></div>

        {/* filtros de todo, leído y sin leer */}
        <div
          style={{
            width: "330px",
            height: "43px",
            backgroundColor: "#D9D9D9",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px",
          }}
        >
          {["Todo", "Leido", "Sin leer"].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`w-[105px] h-[33px] rounded-[6px] px-2 font-bold text-sm flex items-center justify-between 
    ${activeFilter === filter ? "bg-[#A8A6A6]" : "bg-white hover:bg-[#f6f6f6]"} 
    transition duration-200 cursor-pointer shadow-sm`}
            >
              {filter}
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  backgroundColor: "#D9D9D9",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                {counts[filter]}
              </div>
            </button>
          ))}
        </div>

        <div style={{ height: "6px" }}></div>
        {/* Botón para limpiar notificaciones */}
        <div
          onClick={async () => {
            try {
              await fetchDeleteAllNotifications();
              queryClient.invalidateQueries(["notifications"]);
            } catch (error) {
              console.error("Error al vaciar notificaciones:", error);
            }
          }}
          className="w-[330px] h-[40px] bg-[#D9D9D9] rounded-md flex justify-center items-center font-bold text-sm
             cursor-pointer hover:bg-red-300 transition duration-200 mb-3 mt-1"
        >
          Vaciar notificaciones
        </div>

        <div
          className="w-full overflow-y-auto flex flex-col items-center gap-2 py-2"
          style={{
            height: "320px",
            paddingBottom: "10px",
          }}
        >
          {filteredNotifications.map((notif) => (
            <div
              key={notif._id}
              className="flex-shrink-0"
              style={{
                width: "350px",
                backgroundColor: "#EFEFEF",
                borderRadius: "8px",
                padding: "10px 16px",
                marginLeft: "9px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                minHeight: "87px",
              }}
            >
              {/* iconos de notif */}
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`svgs/${notif.idTipoNotificacion?.nombre
                    .toLowerCase()
                    .replace(/ /g, "_")}.svg`}
                  alt="Icono de notificación"
                  style={{
                    width: "20px",
                    height: "20px",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* contenido de la notificación */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    {notif.idTipoNotificacion?.nombre}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontStyle: "italic",
                      fontWeight: 600,
                      color: "#888888",
                    }}
                  >
                    {getTimeElapsed(notif?.fechaGeneracion)}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginTop: "5px",
                  }}
                >
                  {/*icono de borrar notificaciones*/}
                  <div style={{ fontSize: "14px", color: "#555555" }}>
                    {notif.descripcion}
                  </div>
                  <img
                    src="/svgs/trash-red2.svg"
                    alt="Borrar"
                    onClick={async () => {
                      await fetchDeleteNotificacion(notif?._id);
                      queryClient.invalidateQueries(["notifications"]);
                    }}
                    style={{
                      width: "18px",
                      height: "18px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ flexGrow: 1 }}></div>

        <div
          style={{
            width: "100%",
            height: "48px",
            backgroundColor: "#D9D9D9",
            display: "flex",
            alignItems: "center",
            paddingLeft: "16px",
            fontWeight: "bold",
            fontSize: "16px",
            flexShrink: 0,
          }}
        ></div>
      </div>
    </>
  );
};

export default Header;
