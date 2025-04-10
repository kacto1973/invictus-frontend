import React from "react";
import Header from "../components/Header";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Card from "../components/Card";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

const Configuration = () => {
  const handleResetDatabase = () => {
    alert("la base de datos se restableció");
  };

  return (
    <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
      <TemporaryDrawer />
      <Header label="Configuración" />
      <div className="ml-[250px] mt-[5rem] w-[calc(100vw-250px)] h-[calc(100vh-5rem)] bg-[#EDEDED] flex items-start">
        <Card
          label="Configuración"
          icon="svgs/gear.svg"
          classNames="w-[40%] h-[700px] flex flex-col justify-between p-5"
        >
          <InputBox label="Cambiar contraseña de administrador" placeholder="Ingrese la nueva contraseña" secondIconSrc="svgs/save.svg"/>
          <InputBox label="URL de la Base de datos" placeholder="Ingrese la URL" iconSrc="svgs/eye.svg" secondIconSrc="svgs/save.svg"/>

          <div className="flex items-center justify-between mt-5">
            <label className="text-red-600 font-semibold">Restablecer base de datos</label>
            <Button
            icon = "svgs/restore-sign.svg"
            label = "Restablecer"
            onClick={() => alert("la base de datos se ha restablecido")}
            classNames="hover:bg-[#CA5E5E] bg-[#E96D6D] w-[30%] h-[3rem] mb-9 ml-25 flex items-center justify-center gap-7 text-white font-normal"
          />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Configuration;
