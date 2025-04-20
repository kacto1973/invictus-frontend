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

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/categorias`);
  return res.json();
};

export const fetchBrands = async () => {
  const res = await fetch(`${BASE_URL}/marcas`);
  return res.json();
};
