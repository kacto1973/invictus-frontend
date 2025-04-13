/* Aquí estarán acumulandose todos los fetchers que tendrá nuestr app, para cada distinta vista */

export const fetchDashboard = async () => {
  const res = await fetch("/api/inicio");
  return res.json();
};
