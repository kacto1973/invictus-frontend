import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

const Header = ({ label }) => {
  // STATES
  const [currentTime, setCurrentTime] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todo"); 

  // FUNCTIONS
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

  return (
    <>
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

      {/* NOTIFICACIONES */}
      {showNotifications && (
        <div
          className="absolute right-5 flex flex-col items-center"
          style={{
            top: '5rem',
            width: '390px',
            height: '521px',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 40,
            overflow: 'hidden',
          }}
        >
          
          <div
            style={{
              width: '100%',
              height: '48px',
              backgroundColor: '#D9D9D9',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '16px',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            Notificaciones
          </div>

          
          <div style={{ height: '22px' }}></div>

        
          <div
            style={{
              width: '330px',
              height: '43px',
              backgroundColor: '#D9D9D9',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '5px',
            }}
          >
          
            <button
              onClick={() => handleFilterClick("Todo")}
              style={{
                width: '105px',
                height: '33px',
                backgroundColor: activeFilter === "Todo" ? '#A8A6A6' : '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 8px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Todo
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: '#D9D9D9',
                  borderRadius: '50%',
                }}
              ></div>
            </button>

            <button
              onClick={() => handleFilterClick("Leído")}
              style={{
                width: '105px',
                height: '33px',
                backgroundColor: activeFilter === "Leído" ? '#A8A6A6' : '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 8px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Leído
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: '#D9D9D9',
                  borderRadius: '50%',
                }}
              ></div>
            </button>
            <button
              onClick={() => handleFilterClick("Sin leer")}
              style={{
                width: '105px',
                height: '33px',
                backgroundColor: activeFilter === "Sin leer" ? '#A8A6A6' : '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 8px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Sin leer
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: '#D9D9D9',
                  borderRadius: '50%',
                }}
              ></div>
            </button>
          </div>
          <div className="w-full flex-1 p-4"></div>
          <div
            style={{
              width: '100%',
              height: '48px',
              backgroundColor: '#D9D9D9',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '16px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Ver todas las notificaciones
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
