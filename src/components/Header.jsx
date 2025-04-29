import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

const Header = ({ label }) => {
  const [currentTime, setCurrentTime] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todo");
  

 
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Reactivo agotado",
      description: "Actualmente no contamos con glicina en inventario.",
      status: "Sin leer",
      type: "reactivo-agotado",  
    },
    {
      id: 2,
      title: "Equipo calendarizado",
      description: "El cromatógrafo de gas ha sido calendarizado por 10 días.",
      status: "Leído",
      type: "equipo-calendarizado",
    },
    {
      id: 3,
      title: "Mantenimiento de equipo",
      description: "EEl equipo HPLC se encuentra bajo mantenimiento",
      status: "Sin leer",
      type: "mantenimiento-equipo", 
    },
    
    {
      id: 4,
      title: "Reactivo agotado",
      description: "Actualmente no contamos con azul de metileno en el inventario.",
      status: "Sin leer",
      type: "reactivo-agotado", 
    },
    
  ]);

  const counts = {
    Todo: notifications.length,
    Leído: notifications.filter((n) => n.status === "Leído").length,
    "Sin leer": notifications.filter((n) => n.status === "Sin leer").length,
  };
  

  
  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
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

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === "Todo") return true;
    return notif.status === activeFilter;
  });

  return (
    <>
      {/* HEADER */}
      <div className="w-full h-[5rem] bg-[#E2BDFD] mb-5 absolute top-0 left-0 flex items-center z-50">
        <span className="ml-[280px] font-bold text-xl">{label}</span>
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
          <div className="bg-white p-2 ml-8 rounded-md relative">
            <img
              src="svgs/bell-black.svg"
              alt="bell icon"
              width={25}
              onClick={handleBellClick}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

  
<div
  className="absolute right-5 flex flex-col items-center"
  style={{
    top: "5rem",
    width: "390px",
    height: "521px",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    zIndex: 40,
    overflow: "hidden",
    display: showNotifications ? 'flex' : 'none',
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
   {["Todo", "Leído", "Sin leer"].map((filter) => (
  <button
    key={filter}
    onClick={() => handleFilterClick(filter)}
    style={{
      width: "105px",
      height: "33px",
      backgroundColor: activeFilter === filter ? "#A8A6A6" : "#FFFFFF",
      border: "none",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 8px",
      fontWeight: "bold",
      fontSize: "14px",
      cursor: "pointer",
    }}
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


  <div style={{ height: "33px" }}></div>

<div
  className="w-full overflow-y-auto flex flex-col items-center gap-2 py-2"
  style={{
    height: "320px",
    paddingBottom: "10px"
  }}
>
{filteredNotifications.map((notif) => (
  <div
    key={notif.id}
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
      cursor: "pointer",
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
    src={`svgs/${notif.type}.svg`} 
    alt="Icono de notificación"
    style={{
      width: "20px",
      height: "20px",
      objectFit: "contain",
    }}
  />
</div>

    {/* contenido de la notificación */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "4px" }}>
        {notif.title}
      </div>
      <div style={{ fontSize: "14px", color: "#555555" }}>
        {notif.description}
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
      cursor: "pointer",
      flexShrink: 0, 
    }}
  >
    Ver todas las notificaciones
  </div>
</div>

      
    </>
  );
};

export default Header;
