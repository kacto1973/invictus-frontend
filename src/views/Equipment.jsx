import React from "react";
import Header from "../components/Header";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Card from "../components/Card";
import SearchBox from "../components/SearchBox.jsx";
import Button from "../components/Button";
import CalendarComponent from "../components/CalendarComponent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { fetchEquipment } from "../services/fetchers.js";

import { useState, useRef } from "react";

const Equipment = () => {
  /* tanstack */

  const queryClient = useQueryClient();

  /* tanstack */
  const { data: equipment } = useQuery({
    queryKey: ["equipment"],
    queryFn: fetchEquipment,
  });

  // constants

  const fileInputRef = useRef();

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
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
      <TemporaryDrawer></TemporaryDrawer>
      <Header label="Equipment"></Header>
      <div
        className={`ml-[250px] mt-[5rem] w-[calc(100vw-250px)]
           h-[calc(100vh-5rem)] bg-[#EDEDED] overflow-hidden p-5 relative`}
      >
        {/* this is pushing everything else below the header */}
        <div className="flex flex-row w-[40%] h-[12%]">
          <SearchBox classNames="w-[280px] h-[3rem] mb-5" />
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
              {equipment?.map((device) => (
                <div
                  id={device?._id}
                  className="w-[95%] h-[8rem] min-h-[8rem] max-h-[8rem]  bg-gray-200 shadow-sm rounded-md relative mt-4 mb-2 "
                >
                  <div className="flex justify-center items-center h-[8rem] min-h-[8rem] max-h-[8rem] w-[10rem] bg-white overflow-hidden border-4 border-dotted border-gray-300">
                    <img
                      className="w-full h-full object-contain"
                      src={device?.urlImagen}
                      alt="device image"
                    />
                  </div>

                  <img
                    onClick={() => {
                      console.log("Execute Task...");
                      setSelectedEquipment(device);
                      setActiveModal(true);
                    }}
                    className="absolute top-2 right-2 cursor-pointer"
                    src="/svgs/trash-red.svg"
                    width={25}
                    alt="arrow svg"
                  />
                  <span className=" absolute top-2 left-[44%] font-bold -translate-x-[2rem]">
                    {device?.nombre}
                  </span>
                  <span className=" absolute bottom-4 left-[37%] bg-pink-300 rounded-full py-1 px-4 ">
                    {device?.status}
                  </span>
                  <img
                    src="/svgs/edit-black.svg"
                    width={25}
                    alt="info"
                    className="right-23 bottom-4 absolute cursor-pointer"
                    onClick={() => {
                      setSelectedEquipment(device);
                      setActiveTab(TAB_TYPE.EDITAR);
                    }}
                  />
                  <img
                    src="/svgs/calendar-black.svg"
                    width={30}
                    alt="info"
                    className="right-12 bottom-4 absolute cursor-pointer"
                    onClick={() => {
                      setSelectedEquipment(device);
                      setActiveTab(TAB_TYPE.CALENDARIZADO);
                    }}
                  />
                  <img
                    src="/svgs/information.svg"
                    width={24}
                    alt="info"
                    className="right-2 bottom-4 absolute cursor-pointer"
                    onClick={() => {
                      setSelectedEquipment(device);
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
          <div className="w-full h-[calc(100%-3rem)] flex flex-col items-center mt-[3rem] relative">
            <h1 className="text-lg font-bold mt-2">Nombre del equipo</h1>
            <p className="text-sm text-justify w-[95%] mt-2">
              Una máquina de laboratorio es un equipo especializado diseñado
              para realizar análisis, mediciones o procesos técnicos con alta
              precisión en entornos controlados. Suelen utilizarse en
              investigaciones científicas, análisis clínicos o ensayos
              industriales.
            </p>
            <div className="mt-2 flex flex-row justify-between w-[52%] items-center">
              <span className="text-sm font-bold">Días Calendarizados:</span>
              <span className="px-4 py-1 bg-green-300 text-sm font-medium rounded-full">
                Liberado
              </span>
            </div>
            <div className="scale-[0.85] absolute top-[27%]  flex flex-col items-center justify-center">
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
          <div className="w-full h-[calc(100%-3rem)] flex flex-col items-center mt-[3rem] relative">
            <h1 className="text-lg font-bold mt-2">Nombre del equipo</h1>
            <h2 className="text-base font-bold mt-4">
              Elegir días para calendarizar
            </h2>

            <div className="scale-[0.85] absolute top-[10%]  flex flex-col items-center justify-center">
              <CalendarComponent></CalendarComponent>
            </div>
            <div className="absolute bottom-10 w-[80%] flex flex-row justify-around">
              <Button
                label="Cancelar"
                onClick={() => {
                  console.log("Cancelar equipo...");
                }}
                classNames="cursor-pointer  bg-[#EDEDED] border-1 text-black w-[10rem] h-[2.5rem] shadow-md rounded-md text-bold text-xl"
              />
              <Button
                label="Guardar"
                onClick={() => {
                  console.log("Agregar equipo...");
                }}
                classNames="cursor-pointer hover:bg-[#6DBA43] bg-[#79CB4C] w-[10rem] h-[2.5rem] shadow-md rounded-md text-bold text-white text-xl"
              />
            </div>
          </div>
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
          <div className="w-full h-[calc(100%-3rem)] flex flex-col items-center mt-[3rem]">
            <div className="mt-6 w-full flex justify-center">
              <TextField
                label="Nombre del equipo"
                sx={{ width: "90%" }}
              ></TextField>
            </div>
            <div className="mt-4 w-full flex justify-center">
              <TextField
                label="Descripción del equipo"
                multiline
                rows={3}
                sx={{ width: "90%" }}
              ></TextField>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <div className="bg-[#F0E6F7] mt-4 w-[90%] h-[4rem] flex flex-row items-center justify-center border-dotted border-4 border-[#AFAFAF] rounded-md cursor-pointer">
              <img src="/svgs/upload-purple.svg" alt="upload icon" width={40} />
              <span className="text-lg ml-4">Subir Imagen</span>
            </div>
            <img
              className="mt-6"
              src="/images/machine-sample.png"
              alt="machine img"
              width={130}
            />
            <div className="mt-4 w-[80%] flex flex-row justify-around">
              <Button
                label="Cancelar"
                onClick={() => {
                  console.log("Cancelar equipo...");
                }}
                classNames="cursor-pointer  bg-[#EDEDED] border-1 text-black w-[10rem] h-[2.5rem] shadow-md rounded-md text-bold text-xl"
              />
              <Button
                label="Agregar"
                onClick={() => {
                  console.log("Agregar equipo...");
                }}
                classNames="cursor-pointer hover:bg-[#6DBA43] bg-[#79CB4C] w-[10rem] h-[2.5rem] shadow-md rounded-md text-bold text-white text-xl"
              />
            </div>
          </div>
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
          <div className="w-full h-[calc(100%-3rem)] flex flex-col items-center mt-[3rem]">
            <div className="mt-6 w-full flex justify-center">
              <TextField
                label="Nombre del equipo"
                sx={{ width: "90%" }}
              ></TextField>
            </div>
            <div className="mt-4 w-full flex justify-center">
              <TextField
                label="Descripción del equipo"
                multiline
                rows={3}
                sx={{ width: "90%" }}
              ></TextField>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <div className="bg-[#F0E6F7] mt-4 w-[90%] h-[4rem] flex flex-row items-center justify-center border-dotted border-4 border-[#AFAFAF] rounded-md cursor-pointer">
              <img src="/svgs/upload-purple.svg" alt="upload icon" width={40} />
              <span className="text-lg ml-4">Subir Imagen</span>
            </div>
            <img
              className="mt-6"
              src="/images/machine-sample.png"
              alt="machine img"
              width={130}
            />
            <div className="mt-4 w-[80%] flex flex-row justify-around">
              <Button
                label="Cancelar"
                onClick={() => {
                  console.log("Cancelar equipo...");
                }}
                classNames="cursor-pointer  bg-[#EDEDED] border-1 text-black w-[10rem] h-[2.5rem] shadow-md rounded-md text-bold text-xl"
              />
              <Button
                label="Confirmar"
                onClick={() => {
                  console.log("Actualizando equipo...");
                }}
                classNames="cursor-pointer hover:bg-[#6DBA43] bg-[#79CB4C] w-[10rem] h-[2.5rem] shadow-md rounded-md text-bold text-white text-xl"
              />
            </div>
          </div>
        </div>
      </div>
      {/* panel de borrar equipo */}
      {activeModal && (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-black z-50 opacity-40"></div>

          <div className=" flex justify-center w-[30%] h-[30%] bg-white shadow-md rounded-md absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50">
            <p className="text-xl font-bold text-left w-[80%] top-[2rem] left-1/2 bottom-0 -translate-x-1/2 absolute ">
              ¿Desea usted eliminar el reactivo: EQUIPO DE EJEMPLO?
            </p>
            <Button
              onClick={() => {
                console.log("Eliminar equipo...");
              }}
              classNames="!absolute cursor-pointer hover  :bg-[#CD1C1C] bg-[#D41D1D] w-[8rem] h-[2rem] left-1/2 -translate-x-1/2 bottom-8 shadow-md rounded-md text-bold text-white text-LG"
              label="Eliminar"
            ></Button>
            <span
              onClick={() => {
                setActiveModal(null);
              }}
              className="absolute right-4 top-4 font-bold text-2xl cursor-pointer"
            >
              X
            </span>
          </div>
        </>
      )}
    </div>
  );
};
//chino el pro estuvo aqui
export default Equipment;
