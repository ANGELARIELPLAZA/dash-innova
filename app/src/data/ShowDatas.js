import axios from "axios";
import { useState, useEffect } from "react";
import { ShowTable } from "./ShowTable";

const URI = "http://192.168.100.52:3001/data/";

const CompShowDatas = () => {
  const [datas, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(URI);
        setData(res.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    // Realizar la primera llamada a la API al montar el componente
    fetchData();

    // Configurar la actualización periódica de los datos cada segundo
    const interval = setInterval(fetchData, 200);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  // Ordenar los datos en forma descendente por hora
  const sortedData = datas.sort((a, b) => b.hora.localeCompare(a.hora));
  // Obtener los últimos 5 datos
  const lastFiveData = sortedData.slice(0, 5);

  // Ordenar los datos en forma descendente por hora
  const grapic = datas.sort((a, b) => a.hora.localeCompare(b.hora));
  // Obtener los últimos 5 datos
  const lastFiveDatagrapic = grapic.slice(-5);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <table className="table">
            <thead className="tableTheadBg">
              <tr>
                <th>Volt</th>
                <th>Amper</th>
                <th>Caudal</th>
                <th>Fecha</th>
                <th>Hora</th>
              </tr>
            </thead>
            <tbody>
              {lastFiveData.map((data, index) => (
                <tr key={index}>
                  <td>{data.volt}</td>
                  <td>{data.amper}</td>
                  <td>{data.caudal}</td>
                  <td>{data.fecha}</td>
                  <td>{data.hora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col">
        <ShowTable data={lastFiveDatagrapic} />
      </div>
    </div>
  );
};

export default CompShowDatas;
