/* Aquí estarán acumulandose todos los fetchers que tendrá nuestr app, para cada distinta vista */
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchDashboard = async () => {
  const res = await fetch(`${BASE_URL}/inicio`);
  return res.json();
};

export const fetchInventory = async () => {
  const res = await fetch(`${BASE_URL}/reactivos`);
  return res.json();
};

export const fetchBrands = async () => {
  const res = await fetch(`${BASE_URL}/marcas`);
  return res.json();
};

export const fetchMeasurements = async () => {
  const res = await fetch(`${BASE_URL}/unidad-medida`);
  return res.json();
};

export const fetchPhysicalStates = async () => {
  const res = await fetch(`${BASE_URL}/estado-fisico`);
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/categorias`);
  return res.json();
};

export const fetchDrawers = async () => {
  const res = await fetch(`${BASE_URL}/gabinetes`);
  return res.json();
};

export const fetchNewReactant = async (newReactant) => {
  return await fetch(`${BASE_URL}/reactivos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newReactant),
  });
};

export const fetchReports = async () => {
  const res = await fetch(`${BASE_URL}/reportes`);
  return res.json();
}

export const fetchRemoveReport = async (idReport) => {
  return await fetch(`${BASE_URL}/reportes/eliminar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "id": idReport
    }),
  });
};
