import React from "react";
import Header from "../components/Header";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Card from "../components/Card";
import SearchBox from "../components/SearchBox.jsx";
import Button from "../components/Button";
import { useState } from "react";

const Equipment = () => {

    const equiposLaboratorio = [
      {
        nombre: "Microscopio Óptico",
        descripcion: "Permite observar muestras biológicas con aumentos de hasta 1000x.",
        requiereMantenimiento: true,
        status: "En Utilización"
      },
      {
        nombre: "Centrífuga de Laboratorio",
        descripcion: "Utilizada para separar componentes de una muestra por densidad.",
        requiereMantenimiento: false,
        status: "Liberado"
      },
      {
        nombre: "Espectrofotómetro",
        descripcion: "Mide la absorción de luz en diferentes longitudes de onda.",
        requiereMantenimiento: true,
        status: "En Utilización"
      },
      {
        nombre: "Balanza Analítica",
        descripcion: "Permite medir masas con gran precisión hasta microgramos.",
        requiereMantenimiento: false,
        status: "Liberado"
      },
      {
        nombre: "Autoclave",
        descripcion: "Esteriliza material de laboratorio usando vapor de alta presión.",
        requiereMantenimiento: true,
        status: "En Utilización"
      }
    ];
        
  
  return (
    <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
      <TemporaryDrawer></TemporaryDrawer>
      <Header label="Equipment"></Header>
      <div
        className={`ml-[250px] mt-[5rem] w-[calc(100vw-250px)]
           h-[calc(100vh-5rem)] bg-[#EDEDED] overflow-hidden p-5`} >{/* this is pushing everything else below the header */}
          <div className="flex flex-row w-[100%] h-[12%]">
           <SearchBox classNames="w-[400px] h-[3rem] mb-5" />
            <Button 
            icon = "/svgs/plus-sign.svg"
            label= "Add Equipment"
            onClick={() => alert("Added Equipment!")}
            classNames="hover:bg-[#6FB847] bg-[#79CB4C] w-[20%] h-[3rem] mb-5 ml-25"
          />
           <Button
            icon = "svgs/minus-sign.svg"
            label = "Delete Equipment"
            onClick={() => alert("Deleted Equipment!")}
            classNames="hover:bg-[#CA5E5E] bg-[#E96D6D]  w-[20%] h-[3rem] mb-5 ml-15"
          />
         </div>
         
         <div className="w-[40%] h-[80%] mt-5 flex flex-col ">
            <div className="relative w-full h-full  bg-white shadow-md rounded-md overflow-hidden">
              <div className="absolute bg-[#E0C8F2] w-full h-[3rem] flex items-center "><p className="ml-5 *:">Equipo de Laboratorio</p></div>
              <div className="w-full mt-[3rem] h-[calc(100%-5rem)] flex flex-col   items-center overflow-y-auto">
              {equiposLaboratorio.map((equipo, index) => (
                <div className="w-[80%]  bg-white shadow-md border-2     rounded-md relative mt-4 mb-2 ">
                      <img className="" width={130} src="images/machine-sample.png" alt="machine image" />
                      <img onClick={() => { console.log("Execute Task...")}} className="absolute top-2 right-2" src="svgs/arrow-right.svg" width={25} alt="arrow svg" />
                      <span className=" absolute top-2 left-1/2 -translate-x-[2rem]">{equipo.nombre}</span>
                      <span className=" absolute bottom-4 right-4 bg-pink-300 rounded-full py-1 px-4 ">{equipo.status}</span>

                </div>
                 ))}
              </div>
            </div>
         </div>
         <div className="w-[23.5%] h-[32%] absolute top-[12.75rem] ml-[45rem] flex-col">
         <div className="relative w-full h-full  bg-white shadow-md rounded-md overflow-hidden">
              <div className="absolute bg-[#E0C8F2] w-full h-[3rem] flex items-center "><p className="ml-5 *:">Calendarización de Uso de Equipo</p></div>
              <div className="w-full mt-[3rem] h-[100%] flex flex-col  items-center overflow-y-auto">
              <img
            src="svgs/calendar-black.svg"
            alt="clock icon"
            className="hover:bg-[#C0BEBE] bg-[#E0DFDF] w-[70%] h-[70%] border-8 border-[#E0DFDF] mt-3 mb-3 ml-2 rounded-md"
          />
              </div>
            </div>
         </div>

         <div className="w-[23.5%] h-[32%] absolute top-[30.75rem] ml-[45rem] flex-col ">
         <div className="relative w-full h-full bg-white shadow-md rounded-md overflow-hidden">
              <div className="absolute bg-[#E0C8F2] w-full h-[3rem] flex items-center "><p className="ml-5 *:">Calendarización de Servicio de Equipo</p></div>
              <div className="w-full mt-[3rem] h-[100%] flex flex-col items-center overflow-y-auto">
              <img
            src="svgs/tools-icon.svg"
            alt="clock icon"
            className="hover:bg-[#C0BEBE] bg-[#E0DFDF] w-[70%] h-[70%] border-8 border-[#E0DFDF] mt-3 mb-3 ml-2 rounded-md"
          />
            </div>
            </div>
         </div>        

      </div>
    </div>
  );
};
//chino el pro estuvo aqui
export default Equipment;