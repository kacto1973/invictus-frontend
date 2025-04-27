import React, { useEffect } from "react";
import { useState } from "react";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";
import ReactantTable from "../components/ReactantTable";
import Button from "../components/Button";
import TextField from "@mui/material/TextField";
import {
  fetchCategories,
  fetchBrands,
  fetchDrawers,
  fetchMeasurements,
  fetchPhysicalStates,
  fetchNewReactant,
  fetchDeleteReactantById,
} from "../services/fetchers";
import { useQuery } from "@tanstack/react-query";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import { useQueryClient } from "@tanstack/react-query";
import { fetchInventory } from "../services/fetchers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Inventory = () => {
  /* tanstack */

  const queryClient = useQueryClient();

  /* tanstack */
  const { data } = useQuery({
    queryKey: ["data"],
    queryFn: fetchInventory,
  });

  const { data: marcas } = useQuery({
    queryKey: ["marcas"],
    queryFn: fetchBrands,
  });

  const { data: unidadesMedidas } = useQuery({
    queryKey: ["unidadesMedidas"],
    queryFn: fetchMeasurements,
  });

  const { data: estadosFisicos } = useQuery({
    queryKey: ["estadosFisicos"],
    queryFn: fetchPhysicalStates,
  });

  const { data: categorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: fetchCategories,
  });

  const { data: gabinetes } = useQuery({
    queryKey: ["gabinetes"],
    queryFn: fetchDrawers,
  });

  /* functions */

  const getNoDataBrandObject = (brandsArray) => {
    if (!brandsArray) {
      return null;
    }

    for (const brand of brandsArray) {
      if (brand.nombre === "N/D") {
        return brand;
      }
    }
    return null;
  };

  const handleReactantSelection = (reactant) => {
    setSelectedReactant(reactant);
  };

  const checkEntries = (reactantObject) => {
    if (reactantObject.nombre === "") {
      toast.warning("El nombre del reactivo es obligatorio");
      return false;
    }
    if (reactantObject.codigoCatalogo === "") {
      toast.warning("El código de catálogo es obligatorio o como N/D");
      return false;
    }
    if (reactantObject.idMarca === "") {
      toast.warning("La marca es obligatoria");
      return false;
    }
    if (!reactantObject.unidadMedida.valor) {
      toast.warning("La notacion de  la unidad medida es obligatoria");
      return false;
    }
    if (reactantObject.unidadMedida.idUnidadMedida === "") {
      toast.warning("La unidad de medida es obligatoria");
      return false;
    }
    if (reactantObject.idEstadoFisico === "") {
      toast.warning("El estado físico es obligatorio");
      return false;
    }
    if (reactantObject.idCategoria === "") {
      toast.warning("La categoría es obligatoria");
      return false;
    }
    if (reactantObject.idGabinete === "") {
      toast.warning("El gabinete es obligatorio");
      return false;
    }

    return true;
  };

  const addReactant = async (reactantObject) => {
    const response = await fetchNewReactant(reactantObject);
    const data = await response.json();

    if (response.ok) {
      console.log("Reactivo agregado correctamente: ", data);
      toast.success("Reactivo agregado correctamente");
    } else {
      console.log("Error al agregar reactivo: ", data);
      toast.error("Error al agregar reactivo");
      throw new Error("Error adding reactant");
    }
  };

  const updateReactant = (id) => {
    console.log("editing reactant..");
  };

  const deleteReactant = async (id) => {
    console.log("deleting reactant..");
    const response = await fetchDeleteReactantById(id);
    const data = await response.json();

    if (response.ok) {
      console.log("Reactivo eliminado correctamente: ", data);
      toast.success("Reactivo eliminado correctamente");
    } else {
      console.log("Error al eliminar reactivo: ", data);
      toast.error("Error al eliminar reactivo, por favor intente de nuevo.");
    }
  };

  /* STATES */
  const [selectedReactant, setSelectedReactant] = useState(null);
  //copia de selectedReactant para editarlo que cuenta con la estructura de newReactant
  const [editReactant, setEditReactant] = useState(null);
  const [newReactant, setNewReactant] = useState({
    //OBLIGATORIO, EJ: anduaga, lo  mete el usuario
    nombre: "",
    //OPCIONAL, EJ: 1, lo mete el usuario (no se tiene que enviar al back)
    cantidad: 0,
    //OBLIGATORIO, lo fetcheas del back y lo selecciona de un dropdown el user
    idMarca: "",
    //OBLIGATORIO, lo fetcheas y se selecciona del dropdown
    idGabinete: "",
    //OBLIGATORIO, lo fetcheas y se selecciona del dropdown

    unidadMedida: {
      valor: 0,
      idUnidadMedida: "",
    },

    //OBLIGATORIO, lo fetcheas y se selecciona del dropdown
    idEstadoFisico: "",
    //OBLIGATORIO, lo fetcheas y se selecciona del dropdown
    idCategoria: "",
    //OBLIGATORIO, se selecciona del dropdown por parte del usuario
    esPeligroso: false,
    //OBLIGATORIO, lo pone el usuario
    codigoCatalogo: "",
  });
  const [activeModal, setActiveModal] = useState(null);
  const [filter, setFilter] = useState({
    nameFilter: "",
    brandFilter: "",
    categoryFilter: "",
  });
  const [codigoCatalogoEnabled, setCodigoCatalogoEnabled] = useState(false);

  /* CONSTANTS */
  const MODAL_TYPE = {
    AGREGAR_REACTIVO: "agregarReactivo",
    EDITAR_REACTIVO: "editarReactivo",
    BORRAR_REACTIVO: "borrarReactivo",
  };

  /* USE EFFECTS */
  useEffect(() => {
    if (activeModal === MODAL_TYPE.EDITAR_REACTIVO) {
      setEditReactant(selectedReactant);
    }
  }, [activeModal]);

  useEffect(() => {
    setEditReactant(JSON.parse(JSON.stringify(selectedReactant)));
  }, [selectedReactant]);

  useEffect(() => {
    console.log(editReactant);
  }, [editReactant]);

  useEffect(() => {
    if (!codigoCatalogoEnabled) {
      setNewReactant((prevState) => ({ ...prevState, codigoCatalogo: "N/D" }));
    } else {
      setNewReactant((prevState) => ({ ...prevState, codigoCatalogo: "" }));
    }
  }, [codigoCatalogoEnabled]);

  useEffect(() => {
    console.log("Nuevo valor de newReactant:", newReactant);
  }, [newReactant]);

  useEffect(() => {
    if (marcas && marcas.length > 0) {
      const noBrandId = getNoDataBrandObject(marcas)?._id;
      if (noBrandId) {
        setNewReactant((prevState) => ({
          ...prevState,
          idMarca: noBrandId,
        }));
      }
    }
  }, [marcas]);

  /* USE EFFECTS */
  useEffect(() => {
    console.log("agregar reactivo: ", newReactant);
  }, [newReactant]);

  /*  useEffect(() => {
    console.log("Marcas: ", marcas);
    console.log("Categorias: ", categorias);
  }, [categorias, marcas]); */

  return (
    <>
      <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
        <TemporaryDrawer></TemporaryDrawer>
        <Header label="Reactivos"></Header>
        <ToastContainer position="bottom-right" autoClose={2500} />

        {/*div padre de todo lo demas */}
        <div
          className={`relative ml-[250px] mt-[5rem] w-[calc(100vw-250px)] h-[calc(100vh-5rem)] bg-[#EDEDED] overflow-hidden flex `}
        >
          <p className=" absolute top-[37%] text-gray-600 right-[20%] text-regular w-[15rem] text-center font-bold">
            Haga click sobre un reactivo para ver su información
          </p>
          <img
            src="/images/matraz.png"
            alt="matraz icon"
            className="absolute top-[45%] right-[20%]"
          />
          <div className="w-[35%] h-full flex flex-col p-5 pr-0">
            <SearchBox
              value={filter?.nameFilter}
              onChange={(e) =>
                setFilter({ ...filter, nameFilter: e.target.value })
              }
              classNames="w-full h-[3rem] mb-5"
            ></SearchBox>
            <ReactantTable
              filter={filter}
              onReactantClick={handleReactantSelection}
              data={data}
            ></ReactantTable>
          </div>
          <div className="w-[65%] h-full flex flex-col pb-5 pr-5">
            <div className=" w-full h-[6.1rem] flex items-center">
              <TextField
                id="outlined-basic"
                label="Marca"
                variant="outlined"
                select
                value={filter?.brandFilter}
                onChange={(e) => {
                  setFilter({ ...filter, brandFilter: e.target.value });
                }}
                sx={{
                  width: "10rem",
                  marginLeft: "2rem",
                  backgroundColor: "white",
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  },
                }}
              >
                <MenuItem value="">Ninguna</MenuItem>
                {marcas?.map((marca) => (
                  <MenuItem key={marca.nombre} value={marca.nombre}>
                    {marca.nombre}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-basic"
                label="Categoría"
                variant="outlined"
                select
                value={filter?.categoryFilter}
                onChange={(e) => {
                  setFilter({ ...filter, categoryFilter: e.target.value });
                }}
                sx={{
                  width: "10rem",
                  marginLeft: "2rem",
                  backgroundColor: "white",
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  },
                }}
              >
                <MenuItem value="">Ninguna</MenuItem>
                {categorias?.map((categoria) => (
                  <MenuItem key={categoria.nombre} value={categoria.nombre}>
                    {categoria.nombre}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                classNames="hover:bg-[#1a94c7] bg-[#1ba2db] w-[10rem] h-[3rem] ml-4 shadow-md rounded-md text-bold text-white text-lg"
                label="Limpiar Filtros"
                onClick={() => {
                  setFilter({
                    nameFilter: "",
                    brandFilter: "",
                    categoryFilter: "",
                  });
                }}
              ></Button>

              <Button
                classNames="hover:bg-[#6DBA43] bg-[#79CB4C] w-[9rem] h-[3rem] ml-4 shadow-md rounded-md text-bold text-white text-lg"
                icon="svgs/plus-sign.svg"
                label="Añadir"
                onClick={() => {
                  setActiveModal(MODAL_TYPE.AGREGAR_REACTIVO);
                }}
              ></Button>
            </div>

            {/* pestaña que se despliega al seleccionar un reactivo */}
            <div
              className={`bg-white  h-full w-[95%] rounded-r-lg shadow-md ${
                selectedReactant === null ? "hidden" : "relative"
              }`}
            >
              <div
                className="w-[45%] bg-[#FFBB00] h-[2.5rem] absolute left-1/2 -translate-1/2 top-10 
            text-2xl font-bold rounded-md text-center items-center flex justify-center"
              >
                {selectedReactant?.nombre}
              </div>
              <Button
                label="Editar"
                classNames="!absolute cursor-pointer hover:bg-[#6DBA43] bg-[#79CB4C] w-[5rem] h-[2.5rem] left-10 top-5 shadow-md rounded-md text-bold text-white text-lg"
                onClick={() => setActiveModal(MODAL_TYPE.EDITAR_REACTIVO)}
              ></Button>
              <img
                src="svgs/trash-red.svg"
                alt="icon"
                width={30}
                className="absolute top-5 right-5 cursor-pointer"
                onClick={() => setActiveModal(MODAL_TYPE.BORRAR_REACTIVO)}
              />

              {/*div padre */}
              <div className="absolute w-full h-[45%] top-[15%] flex flex-col">
                {/*una mitad la de arriba */}
                <div className="w-full h-[50%] flex">
                  <div className="relative h-full w-[33%] border-b-2 border-gray-300">
                    <p className="bg-[#C796EB]  py-1 text-center px-4 rounded-full w-[8rem] absolute left-1/2 -translate-x-1/2 top-5 text-white font-bold text-xl">
                      Marca
                    </p>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-lg font-bold text-center">
                      {selectedReactant?.idMarca?.nombre}
                    </span>
                  </div>
                  <div className="relative h-full w-[33%] border-b-2 border-gray-300">
                    <p className="bg-[#C796EB]  py-1 text-center px-4 rounded-full w-[10rem] absolute left-1/2 -translate-x-1/2 top-5 text-white font-bold text-xl">
                      Presentación
                    </p>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-lg font-bold text-center">
                      {selectedReactant?.unidadMedida?.idUnidadMedida?.nombre}
                    </span>
                  </div>
                  <div className="relative h-full w-[33%] border-b-2 border-gray-300">
                    <p className="bg-[#C796EB]  py-1 text-center px-4 rounded-full w-[10rem] absolute left-1/2 -translate-x-1/2 top-5 text-white font-bold text-xl">
                      Cantidad
                    </p>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-lg font-bold text-center">
                      {selectedReactant?.cantidad}
                    </span>
                  </div>
                </div>

                {/*una mitad la de arriba */}
                <div className="w-full h-[50%]  flex relative">
                  <div className="relative h-full w-[33%] border-b-2 border-gray-300">
                    <p className="bg-[#C796EB]  py-1 text-center px-4 rounded-full w-[10rem] absolute left-1/2 -translate-x-1/2 top-5 text-white font-bold text-xl">
                      Código/ID
                    </p>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-lg font-bold text-center">
                      {selectedReactant?.codigoCatalogo}
                    </span>
                  </div>
                  <div className="relative h-full w-[33%] border-b-2 border-gray-300">
                    <p className="bg-[#C796EB]  py-1 text-center px-4 rounded-full w-[10rem] absolute left-1/2 -translate-x-1/2 top-5 text-white font-bold text-xl">
                      Estado Físico
                    </p>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-lg font-bold text-center">
                      {selectedReactant?.idEstadoFisico?.nombre}
                    </span>
                  </div>
                  <div className="relative h-full w-[33%] border-b-2 border-gray-300">
                    <p className="bg-[#C796EB] py-1 text-center px-4 rounded-full w-[10rem] absolute left-1/2 -translate-x-1/2 top-5 text-white font-bold text-xl">
                      Categoría
                    </p>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-lg w-[12rem] font-bold text-center">
                      {selectedReactant?.idCategoria?.nombre}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="w-[60%] h-[10rem] bg-[#DBE1DA] 
              rounded-4xl flex flex-col absolute bottom-5 left-1/2 -translate-x-1/2
             justify-around  "
              >
                <img
                  src="svgs/EPP.svg"
                  width={150}
                  className="p-3  top-2  left-0 absolute"
                />
                <p className="text-xl absolute w-[60%] text-[18px] right-10 top-5  z-50">
                  <span className="font-bold">Equipo de protección:</span>
                  <ul>
                    <li>•Bata de laboratorio </li>
                    <li>•Guantes de nitrilo/látex</li>
                    <li>•Gafas de protección</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* pantalla opaca del fondo */}
      {activeModal !== null && (
        <div className="absolute top-0 left-0 w-full h-full bg-black z-50 opacity-40"></div>
      )}
      {/*modales*/}
      {activeModal === MODAL_TYPE.BORRAR_REACTIVO && (
        <div className=" flex justify-center w-[30%] h-[30%] bg-white shadow-md rounded-md absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50">
          <p className="text-xl font-bold text-left w-[80%] top-[2rem] left-1/2 bottom-0 -translate-x-1/2 absolute ">
            ¿Desea usted eliminar el reactivo: {selectedReactant?.nombre}?
          </p>
          <Button
            onClick={async () => {
              await deleteReactant(selectedReactant?._id);

              queryClient.invalidateQueries(["data"]);
              setSelectedReactant(null);
              setActiveModal(null);
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
      )}

      {activeModal === MODAL_TYPE.EDITAR_REACTIVO && (
        <div className="w-[45%] h-[75%] bg-white shadow-md rounded-md absolute left-1/2 -translate-x-1/2 top-10  z-50 flex justify-center">
          <div className="h-[4rem] bg-[#C49DE0] w-full absolute top-0 left-0 flex items-center ">
            <p className="text-xl font-bold flex-start ml-5">
              Editar {selectedReactant?.nombre}
            </p>
            <div
              onClick={() => {
                console.log(
                  "Descartando reactivo y sanitizando entradas del modal..."
                );
                setActiveModal(null);
              }}
              className="font-black text-2xl absolute top-4 right-4 cursor-pointer"
            >
              X
            </div>
          </div>
          <div className="flex flex-row justify-around  w-[90%] h-[100%-4rem] mt-[5rem]">
            <div className="flex flex-col w-[45%] h-full">
              <div className="relative w-full">
                <TextField
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  margin="normal"
                  value={editReactant?.nombre}
                  onChange={(e) => {
                    setEditReactant({
                      ...editReactant,
                      nombre: e.target.value,
                    });
                  }}
                  sx={{
                    width: "100%",
                  }}
                />
                <span className="font-bold text-2xl text-red-500 absolute right-1 top-3">
                  *
                </span>
              </div>

              <TextField
                id="outlined-basic"
                label="Cantidad"
                variant="outlined"
                margin="normal"
                value={editReactant?.cantidad}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                  setEditReactant({
                    ...editReactant,
                    cantidad: onlyNumbers,
                  });
                }}
              />

              <div className="w-full flex flex-row justify-between">
                <TextField
                  disabled={!codigoCatalogoEnabled}
                  id="outlined-basic"
                  label="Código / Catálogo"
                  variant="outlined"
                  margin="normal"
                  value={
                    codigoCatalogoEnabled ? editReactant?.codigoCatalogo : "N/D"
                  }
                  onChange={(e) => {
                    setEditReactant({
                      ...editReactant,
                      codigoCatalogo: e.target.value,
                    });
                  }}
                  sx={{
                    width: "90%",
                  }}
                />
                <Checkbox
                  checked={codigoCatalogoEnabled}
                  onChange={(e) => setCodigoCatalogoEnabled((prev) => !prev)}
                  color="primary"
                />
              </div>

              <div className="relative w-full">
                <TextField
                  id="outlined-basic"
                  label="Marca"
                  variant="outlined"
                  margin="normal"
                  select
                  value={editReactant?.idMarca}
                  onChange={(e) => {
                    setEditReactant({
                      ...editReactant,
                      idMarca: e.target.value,
                    });
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                  }}
                >
                  {marcas.map((marca) => (
                    <MenuItem key={marca._id} value={marca._id}>
                      {marca.nombre}
                    </MenuItem>
                  ))}
                </TextField>
                <span className="font-bold text-2xl text-red-500 absolute right-1 top-3">
                  *
                </span>
              </div>
            </div>
            <div className="flex flex-col w-[45%] h-full">
              <div className="w-full flex flex-row justify-between">
                <div className="relative w-[55%]">
                  <TextField
                    id="outlined-basic"
                    label="Notación"
                    variant="outlined"
                    margin="normal"
                    value={editReactant?.unidadMedida?.valor}
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                      setEditReactant({
                        ...editReactant,
                        unidadMedida: {
                          ...editReactant.unidadMedida,
                          valor: onlyNumbers,
                        },
                      });
                    }}
                  />
                  <span className="font-bold text-2xl text-red-500 absolute right-1 top-3">
                    *
                  </span>
                </div>
                <div className="relative w-[40%]">
                  <TextField
                    id="outlined-basic"
                    label="Unidad"
                    variant="outlined"
                    margin="normal"
                    select
                    value={editReactant?.unidadMedida?.idUnidadMedida}
                    onChange={(e) => {
                      setEditReactant({
                        ...editReactant,
                        unidadMedida: {
                          ...editReactant.unidadMedida,
                          idUnidadMedida: e.target.value,
                        },
                      });
                    }}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          style: {
                            maxHeight: 200,
                          },
                        },
                      },
                    }}
                    sx={{
                      width: "100%",
                    }}
                  >
                    {unidadesMedidas.map((unidadMedida) => (
                      <MenuItem key={unidadMedida._id} value={unidadMedida._id}>
                        {unidadMedida.nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                  <span className="font-bold text-2xl text-red-500 absolute right-1 top-3">
                    *
                  </span>
                </div>
              </div>

              <div className="relative w-full">
                <TextField
                  id="outlined-basic"
                  label="Estado Físico"
                  variant="outlined"
                  margin="normal"
                  select
                  value={editReactant?.idEstadoFisico}
                  onChange={(e) => {
                    setEditReactant({
                      ...editReactant,
                      idEstadoFisico: e.target.value,
                    });
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                  }}
                >
                  {estadosFisicos.map((estadoFisico) => (
                    <MenuItem key={estadoFisico._id} value={estadoFisico._id}>
                      {estadoFisico.nombre}
                    </MenuItem>
                  ))}
                </TextField>
                <span className="font-bold text-2xl text-red-500 absolute right-1 top-3">
                  *
                </span>
              </div>

              <div className="relative w-full">
                <TextField
                  id="outlined-basic"
                  label="Categoría"
                  variant="outlined"
                  margin="normal"
                  select
                  value={editReactant?.idCategoria}
                  onChange={(e) => {
                    setEditReactant({
                      ...editReactant,
                      idCategoria: e.target.value,
                    });
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                  }}
                >
                  {categorias.map((categoria) => (
                    <MenuItem key={categoria._id} value={categoria._id}>
                      {categoria.nombre}
                    </MenuItem>
                  ))}
                </TextField>
                <span className="font-bold text-2xl text-red-500 absolute right-1 top-3">
                  *
                </span>
              </div>

              <div className="relative w-full">
                <TextField
                  id="outlined-basic"
                  label="Gabinete"
                  variant="outlined"
                  margin="normal"
                  select
                  value={editReactant?.idGabinete}
                  onChange={(e) => {
                    setEditReactant({
                      ...editReactant,
                      idGabinete: e.target.value,
                    });
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                  }}
                >
                  {gabinetes.map((gabinete) => (
                    <MenuItem key={gabinete._id} value={gabinete._id}>
                      {gabinete.nombre}
                    </MenuItem>
                  ))}
                </TextField>
                <span className="font-bold text-2xl text-red-500 absolute right-1 top-3">
                  *
                </span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              console.log(
                "Editando Reactivo nuevo y sanitizando entradas del modal.."
              );
              setActiveModal(null);
            }}
            classNames="cursor-pointer hover:bg-[#6DBA43] !absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#79CB4C] w-[10rem] h-[3rem] shadow-md rounded-md text-bold text-white text-xl"
            label="Confirmar"
          ></Button>
        </div>
      )}

      {activeModal === MODAL_TYPE.AGREGAR_REACTIVO && (
        <div className="w-[45%] h-[75%] bg-white shadow-md rounded-md absolute left-1/2 -translate-x-1/2 top-10  z-50 flex justify-center">
          <div className="h-[4rem] bg-[#C49DE0] w-full absolute top-0 left-0 flex items-center ">
            <p className="text-xl font-bold flex-start ml-5">
              Agregar Reactivo
            </p>
            <div
              onClick={() => {
                console.log(
                  "Descartando reactivo y sanitizando entradas del modal..."
                );
                setActiveModal(null);
              }}
              className="font-black text-2xl absolute top-4 right-4 cursor-pointer"
            >
              X
            </div>
          </div>
          <div className="flex flex-row justify-around  w-[90%] h-[100%-4rem] mt-[5rem]">
            <div className="flex flex-col w-[45%] h-full">
              <div className="relative w-full">
                <TextField
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  margin="normal"
                  value={newReactant?.nombre}
                  onChange={(e) => {
                    setNewReactant({ ...newReactant, nombre: e.target.value });
                  }}
                  sx={{
                    width: "100%",
                  }}
                />
                <span className="font-bold text-2xl text-red-500 absolute right-1 top-3">
                  *
                </span>
              </div>

              <TextField
                id="outlined-basic"
                label="Cantidad"
                variant="outlined"
                margin="normal"
                value={newReactant?.cantidad}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                  setNewReactant({
                    ...newReactant,
                    cantidad: onlyNumbers,
                  });
                }}
              />

              <div className="w-full flex flex-row justify-between">
                <TextField
                  disabled={!codigoCatalogoEnabled}
                  id="outlined-basic"
                  label="Código / Catálogo"
                  variant="outlined"
                  margin="normal"
                  value={
                    codigoCatalogoEnabled ? newReactant?.codigoCatalogo : "N/D"
                  }
                  onChange={(e) => {
                    setNewReactant({
                      ...newReactant,
                      codigoCatalogo: e.target.value,
                    });
                  }}
                  sx={{
                    width: "90%",
                  }}
                />
                <Checkbox
                  checked={codigoCatalogoEnabled}
                  onChange={(e) => setCodigoCatalogoEnabled((prev) => !prev)}
                  color="primary"
                />
              </div>

              <div className="relative w-full">
                <TextField
                  id="outlined-basic"
                  label="Marca"
                  variant="outlined"
                  margin="normal"
                  select
                  value={newReactant?.idMarca}
                  onChange={(e) => {
                    setNewReactant({ ...newReactant, idMarca: e.target.value });
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                  }}
                >
                  {marcas.map((marca) => (
                    <MenuItem key={marca._id} value={marca._id}>
                      {marca.nombre}
                    </MenuItem>
                  ))}
                </TextField>
                <span className="font-bold text-2xl text-red-500 absolute right-1 top-3">
                  *
                </span>
              </div>
            </div>
            <div className="flex flex-col w-[45%] h-full">
              <div className="w-full flex flex-row justify-between">
                <div className="relative w-[55%]">
                  <TextField
                    id="outlined-basic"
                    label="Notación"
                    variant="outlined"
                    margin="normal"
                    value={newReactant?.unidadMedida?.valor}
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                      setNewReactant({
                        ...newReactant,
                        unidadMedida: {
                          ...newReactant.unidadMedida,
                          valor: onlyNumbers,
                        },
                      });
                    }}
                  />
                  <span className="font-bold text-2xl text-red-500 absolute right-1 top-3">
                    *
                  </span>
                </div>
                <div className="relative w-[40%]">
                  <TextField
                    id="outlined-basic"
                    label="Unidad"
                    variant="outlined"
                    margin="normal"
                    select
                    value={newReactant?.unidadMedida?.idUnidadMedida}
                    onChange={(e) => {
                      setNewReactant({
                        ...newReactant,
                        unidadMedida: {
                          ...newReactant.unidadMedida,
                          idUnidadMedida: e.target.value,
                        },
                      });
                    }}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          style: {
                            maxHeight: 200,
                          },
                        },
                      },
                    }}
                    sx={{
                      width: "100%",
                    }}
                  >
                    {unidadesMedidas.map((unidadMedida) => (
                      <MenuItem key={unidadMedida._id} value={unidadMedida._id}>
                        {unidadMedida.nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                  <span className="font-bold text-2xl text-red-500 absolute right-1 top-3">
                    *
                  </span>
                </div>
              </div>

              <div className="relative w-full">
                <TextField
                  id="outlined-basic"
                  label="Estado Físico"
                  variant="outlined"
                  margin="normal"
                  select
                  value={newReactant?.idEstadoFisico}
                  onChange={(e) => {
                    setNewReactant({
                      ...newReactant,
                      idEstadoFisico: e.target.value,
                    });
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                  }}
                >
                  {estadosFisicos.map((estadoFisico) => (
                    <MenuItem key={estadoFisico._id} value={estadoFisico._id}>
                      {estadoFisico.nombre}
                    </MenuItem>
                  ))}
                </TextField>
                <span className="font-bold text-2xl text-red-500 absolute right-1 top-3">
                  *
                </span>
              </div>

              <div className="relative w-full">
                <TextField
                  id="outlined-basic"
                  label="Categoría"
                  variant="outlined"
                  margin="normal"
                  select
                  value={newReactant?.idCategoria}
                  onChange={(e) => {
                    setNewReactant({
                      ...newReactant,
                      idCategoria: e.target.value,
                    });
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                  }}
                >
                  {categorias.map((categoria) => (
                    <MenuItem key={categoria._id} value={categoria._id}>
                      {categoria.nombre}
                    </MenuItem>
                  ))}
                </TextField>
                <span className="font-bold text-2xl text-red-500 absolute right-1 top-3">
                  *
                </span>
              </div>

              <div className="relative w-full">
                <TextField
                  id="outlined-basic"
                  label="Gabinete"
                  variant="outlined"
                  margin="normal"
                  select
                  value={newReactant?.idGabinete}
                  onChange={(e) => {
                    setNewReactant({
                      ...newReactant,
                      idGabinete: e.target.value,
                    });
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                  }}
                >
                  {gabinetes.map((gabinete) => (
                    <MenuItem key={gabinete._id} value={gabinete._id}>
                      {gabinete.nombre}
                    </MenuItem>
                  ))}
                </TextField>
                <span className="font-bold text-2xl text-red-500 absolute right-1 top-3">
                  *
                </span>
              </div>
            </div>
          </div>
          <div className="absolute right-25 bottom-15">
            <Checkbox
              checked={newReactant?.esPeligroso}
              onChange={(e) =>
                setNewReactant({
                  ...newReactant,
                  esPeligroso: e.target.checked,
                })
              }
              color="primary"
            />
            ¿Es Peligroso?
          </div>

          <Button
            onClick={async () => {
              console.log(
                "Verificando entradas, Agregando Reactivo nuevo y sanitizando entradas del modal.. y cerrando modal"
              );

              if (!checkEntries(newReactant)) {
                return;
              }

              try {
                await addReactant(newReactant);

                setNewReactant({
                  nombre: "",
                  cantidad: 0,
                  notacion: 0,
                  idMarca: "",
                  idGabinete: "",
                  unidadMedida: {
                    valor: 0,
                    idUnidadMedida: "",
                  },
                  idEstadoFisico: "",
                  idCategoria: "",
                  esPeligroso: false,
                  codigoCatalogo: "",
                });

                queryClient.invalidateQueries(["data"]);

                setActiveModal(null);
              } catch (error) {
                console.log("Error al agregar reactivo, detalles: ", error);
              }
            }}
            classNames="cursor-pointer hover:bg-[#6DBA43] !absolute bottom-15 left-13 bg-[#79CB4C] w-[10rem] h-[3rem] shadow-md rounded-md text-bold text-white text-xl"
            icon="svgs/plus-sign.svg"
            label="Añadir"
          ></Button>
        </div>
      )}
    </>
  );
};

export default Inventory;
