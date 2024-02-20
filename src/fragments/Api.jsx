import React, { useEffect, useState } from 'react';
import '../css/joanstyle.css';
import '../css/apiStyle.css';
import Prism from 'prismjs';
import BarraMenu from './BarraMenu';
import Footer from './Footer';


const Api = () => {

  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [resultado, setResultado] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [consolaActiva, setConsolaActiva] = useState('');

  // Función para manejar las peticiones POST y GET
  const ejecutarPeticion = (tipo, endpoint) => {
    const url = `https://computacion.unl.edu.ec/uv/api/${endpoint}`;
    let opciones = {};

    if (tipo === 'POST') {
      opciones = {
        method: tipo,
        headers: {
          'Content-Type': 'application/json',
          'x-api-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJCQUNLRU5EIiwiaWF0IjoxNzA3MzU0OTc5fQ.1t8MKkzaD9_ldyWdfsBFwcdM3mP05VtvU2-CurNX1Jk',
        },
        body: JSON.stringify({
          fechaInicio,
          fechaFin,
        }),
      };
    } else {
      opciones = {
        method: tipo,
      };
    }

    fetch(url, opciones)
      .then((response) => response.json())
      .then((data) => {
        setResultado({ ...resultado, [endpoint]: data });
        setMensaje("Petición ejecutada con éxito !!! 😃 🎉");
      })
      .catch((error) => {
        console.error('Error en la petición:', error);
        setMensaje("Error al ejecutar la petición");
      });

    setConsolaActiva(endpoint);
  };

  // Función para renderizar los resultados
  const renderizarResultados = () => {
    return Object.entries(resultado).map(([key, value]) => (
      <div key={key} className={`containerConsola ${consolaActiva === key ? 'active' : ''}`}>
        <pre className="language-javascript">
          <code className="language-javascript">
            {JSON.stringify(value, null, 2)}
          </code>
        </pre>
      </div>
    ));
  };


  return (
    <div>
      <BarraMenu />
      <div className='containerTitulos'>
        <h2 className="text-2xl mb-one">API de Radiación Ultravioleta</h2>
        <p>Ejecuta las peticiones, en consola o desde cualquier sitio:</p>
      </div>

      {/* Formulario para las fechas de las peticiones POST */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">
            PETICIONES POST
          </h2>
          <div className="border p-4 rounded space-y-4">
            <div className="flex gap-2 items-center">
              <label className="flex-grow" htmlFor="fecha-inicio">Fecha de inicio</label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                placeholder="Fecha de inicio"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-grow"
              />
            </div>

            <div className="flex gap-2 items-center">
              <label className='fecha'>Fecha de fin</label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                placeholder="Fecha de fin"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-grow"
              />
            </div>
            <div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium color h-10 px-4 py-2 w-full'>
              <label className='titleFech'>
                Medición por fechas
              </label>
              <button onClick={() => ejecutarPeticion('POST', 'medicionFechas')} className="btn"><i class='bx bx-right-arrow'></i></button>
            </div>

            <div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium color h-10 px-4 py-2 w-full'>
              <label htmlFor="">
                Medición por semana
                <button onClick={() => ejecutarPeticion('POST', 'medicionSemana')} className="btn"><i class='bx bx-right-arrow'></i></button>
              </label>
            </div>

            <div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium color h-10 px-4 py-2 w-full'>
              <label htmlFor="">
                Medición por día
                <button onClick={() => ejecutarPeticion('POST', 'medicionDia')} className="btn"><i class='bx bx-right-arrow'></i></button>
              </label>
            </div>
          </div>

          {/* Botones para las peticiones GET */}

          <h2 className="text-lg font-semibold mb-2">
            PETICIONES GET
          </h2>
          <div className="border p-4 rounded space-y-4">
            <div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium color h-10 px-4 py-2 w-full'>
              <label>
                Medición promedio
              </label>
              <button onClick={() => ejecutarPeticion('GET', 'medicionPromedio')} className="btn"> <i class='bx bx-right-arrow'></i></button>
            </div>

            <div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium color h-10 px-4 py-2 w-full'>
              <label>
                Medición por dispositivos
              </label>
              <button onClick={() => ejecutarPeticion('GET', 'medicionDispositivos')} className="btn"><i class='bx bx-right-arrow'></i></button>
            </div>

            <div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium color h-10 px-4 py-2 w-full'>
              <label>
                Activos
              </label>
              <button onClick={() => ejecutarPeticion('GET', 'activos')} className="btn"><i class='bx bx-right-arrow'></i></button>
            </div>

            <div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium color h-10 px-4 py-2 w-full'>
              <label>
                Listar dispositivos
              </label>
              <button onClick={() => ejecutarPeticion('GET', 'listar')} className="btn"><i class='bx bx-right-arrow'></i></button>
            </div>
          </div>
        </div>
        <div>
          
            {/* Contenedores para mostrar los resultados de las peticiones */}
            {renderizarResultados()}
          <div className='containerPeticiones' style={{ textAlign: 'center' }}>
            {mensaje && <p id="run-message" className="message w-full">{mensaje}</p>}
          </div>
        </div>
      </section>

    </div>
  );
};


export default Api;