import React from "react";
import Header from "../components/Header";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Card from "../components/Card";
import SearchBox from "../components/SearchBox.jsx";
import Button from "../components/Button";
import CalendarComponent from "../components/CalendarComponent";
import { useState } from "react";

const Equipment = () => {
  // constants

  const TAB_TYPE = {
    CALENDARIZADO: "calendarizado",
    DETALLES: "detalles",
    AGREGAR: "agregar",
    EDITAR: "editar",
  };

  const equiposLaboratorio = [
    {
      nombre: "Microscopio Óptico",
      descripcion:
        "Permite observar muestras biológicas con aumentos de hasta 1000x.",
      requiereMantenimiento: true,
      status: "En Utilización",
    },
    {
      nombre: "Centrífuga de Laboratorio",
      descripcion:
        "Utilizada para separar componentes de una muestra por densidad.",
      requiereMantenimiento: false,
      status: "Liberado",
    },
    {
      nombre: "Espectrofotómetro",
      descripcion: "Mide la absorción de luz en diferentes longitudes de onda.",
      requiereMantenimiento: true,
      status: "En Utilización",
    },
    {
      nombre: "Balanza Analítica",
      descripcion: "Permite medir masas con gran precisión hasta microgramos.",
      requiereMantenimiento: false,
      status: "Liberado",
    },
    {
      nombre: "Autoclave",
      descripcion:
        "Esteriliza material de laboratorio usando vapor de alta presión.",
      requiereMantenimiento: true,
      status: "En Utilización",
    },
  ];

  // use states

  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
      <TemporaryDrawer></TemporaryDrawer>
      <Header label="Equipment"></Header>
      <div
        className={`ml-[250px] mt-[5rem] w-[calc(100vw-250px)]
           h-[calc(100vh-5rem)] bg-[#EDEDED] overflow-hidden p-5 relative`}
      >
        {/* this is pushing everything else below the header */}
        <div className="flex flex-row w-full h-[12%]">
          <SearchBox classNames="w-[400px] h-[3rem] mb-5" />
          <Button
            label="Add Equipment"
            onClick={() => {
              setActiveTab(TAB_TYPE.AGREGAR);
            }}
            classNames="cursor-pointer hover:bg-[#6DBA43] bg-[#79CB4C] ml-4 w-[12rem] h-[3rem] shadow-md rounded-md text-bold text-white text-xl"
          />
        </div>

        {/*panel equipos de laboratorio  */}
        <div className="w-[40%] h-[80%] flex flex-col absolute ">
          <div className="relative w-full h-full  bg-white shadow-md rounded-md overflow-hidden">
            <div className="absolute bg-[#E0C8F2] w-full h-[3rem] flex items-center ">
              <p className="ml-5 *:">Equipo de Laboratorio</p>
            </div>

            <div className="w-full mt-[3rem] h-[calc(100%-5rem)] flex flex-col bg-white   items-center overflow-y-auto">
              {/* individual cards para cada equipo */}
              {equiposLaboratorio.map((equipo, index) => (
                <div
                  id={index}
                  className="w-[85%]  bg-gray-100 shadow-sm rounded-md relative mt-4 mb-2 "
                >
                  <img
                    className=""
                    width={130}
                    src="images/machine-sample.png"
                    alt="machine image"
                  />
                  <img
                    onClick={() => {
                      console.log("Execute Task...");
                    }}
                    className="absolute top-2 right-2 cursor-pointer"
                    src="/svgs/trash-red.svg"
                    width={25}
                    alt="arrow svg"
                  />
                  <span className=" absolute top-2 left-[32%] font-bold -translate-x-[2rem]">
                    {equipo.nombre}
                  </span>
                  <span className=" absolute bottom-4 left-[26%] bg-pink-300 rounded-full py-1 px-4 ">
                    {equipo.status}
                  </span>
                  <img
                    src="/svgs/edit-black.svg"
                    width={25}
                    alt="info"
                    className="right-23 bottom-4 absolute cursor-pointer"
                    onClick={() => {
                      setSelectedEquipment(equipo);
                      setActiveTab(TAB_TYPE.EDITAR);
                    }}
                  />
                  <img
                    src="/svgs/calendar-black.svg"
                    width={30}
                    alt="info"
                    className="right-12 bottom-4 absolute cursor-pointer"
                    onClick={() => {
                      setSelectedEquipment(equipo);
                      setActiveTab(TAB_TYPE.CALENDARIZADO);
                    }}
                  />
                  <img
                    src="/svgs/information.svg"
                    width={24}
                    alt="info"
                    className="right-2 bottom-4 absolute cursor-pointer"
                    onClick={() => {
                      setSelectedEquipment(equipo);
                      setActiveTab(TAB_TYPE.DETALLES);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* panel de detalles del equipo */}
        <div
          className={` ${
            activeTab === TAB_TYPE.DETALLES
              ? "absolute w-[40%] h-[90%]  left-[45%] top-[5%] flex flex-col bg-white rounded-md shadow-md"
              : "hidden"
          } `}
        >
          <div className="absolute bg-[#E0C8F2] w-full h-[3rem] flex items-center rounded-t-md ">
            <p className="ml-5 *:">Detalles del Equipo</p>
          </div>
          <div className="w-full h-[calc(100%-3rem)] flex flex-col items-center mt-[3rem]">
            <h1 className="text-[30px] font-bold mt-4">Nombre del equipo</h1>
            <p className="text-base text-justify w-[85%] mt-4">
              Una máquina de laboratorio es un equipo especializado diseñado
              para realizar análisis, mediciones o procesos técnicos con alta
              precisión en entornos controlados. Suelen utilizarse en
              investigaciones científicas, análisis clínicos o ensayos
              industriales, y están construidas para ofrecer resultados
              confiables, repetibles y seguros.
            </p>
            <div className="mt-5 flex flex-row justify-between w-[50%]">
              <span className="text-[20px] font-bold">
                Días Calendarizados:
              </span>
              <span className="px-4 py-1 bg-green-300 text-[20px] font-medium rounded-full">
                Liberado
              </span>
            </div>
            <div className="mt-2">
              {" "}
              <CalendarComponent></CalendarComponent>
            </div>
          </div>
        </div>

        {/* panel calendarización de equipo */}
        <div
          className={` ${
            activeTab === TAB_TYPE.CALENDARIZADO
              ? "absolute w-[40%] h-[90%]  left-[45%] top-[5%] flex flex-col bg-white rounded-md shadow-md"
              : "hidden"
          }`}
        >
          <div className="absolute bg-[#E0C8F2] w-full h-[3rem] flex items-center rounded-t-md ">
            <p className="ml-5 *:">Calendarizar uso del Equipo</p>
          </div>
          <div className="w-full h-[calc(100%-3rem)] flex flex-col items-center mt-[3rem]"></div>
        </div>

        {/* panel de agregar equipo nuevo */}
        <div
          className={` ${
            activeTab === TAB_TYPE.AGREGAR
              ? "absolute w-[40%] h-[90%]  left-[45%] top-[5%] flex flex-col bg-white rounded-md shadow-md"
              : "hidden"
          } `}
        >
          <div className="absolute bg-[#E0C8F2] w-full h-[3rem] flex items-center rounded-t-md ">
            <p className="ml-5 *:">Agregar un equipo</p>
          </div>
          <div className="w-full h-[calc(100%-3rem)] flex flex-col items-center mt-[3rem]"></div>
        </div>

        {/* panel de editar equipo */}
        <div
          className={` ${
            activeTab === TAB_TYPE.EDITAR
              ? "absolute w-[40%] h-[90%]  left-[45%] top-[5%] flex flex-col bg-white rounded-md shadow-md"
              : "hidden"
          } `}
        >
          <div className="absolute bg-[#E0C8F2] w-full h-[3rem] flex items-center rounded-t-md ">
            <p className="ml-5 *:">Editar Equipo</p>
          </div>
          <div className="w-full h-[calc(100%-3rem)] flex flex-col items-center mt-[3rem]"></div>
        </div>
      </div>
    </div>
  );
};
//chino el pro estuvo aqui
export default Equipment;
