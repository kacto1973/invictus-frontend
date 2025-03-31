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
          <InputBox label="Cambiar contraseña de administrador" placeholder="Ingrese la nueva contraseña" />
          <InputBox label="URL de la Base de datos" placeholder="Ingrese la URL" />

          <div className="flex items-center justify-between mt-5">
            <label className="text-red-600 font-semibold">Restablecer base de datos</label>
            <Button
              type="reset-db"
              onClick={handleResetDatabase}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Configuration;
