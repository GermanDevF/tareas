export const getGroups = async () => {
  const response = await fetch("/api/groups");
  if (!response.ok) {
    throw new Error("Error al obtener los grupos");
  }
  const data = await response.json();
  return data;
};
