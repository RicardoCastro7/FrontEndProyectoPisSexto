import React, { useState } from 'react';
import '../css/yovinstyle.css';
import Footer from './Footer';
import Header from './Header';
import mensajes from '../utiles/Mensajes';
import { metodoGet } from '../hooks/Conexion';
import { format } from 'date-fns';
const VerPeticion = () => {
    const [peticiones, setPeticiones] = useState([]);
    const [bucle, setBucle] = useState(false);
    if (!bucle) {
        //getMateria
        metodoGet("/listar/peticiones", "null").then((info) => {
            console.log(info);
            if (info.code !== 200 && (info.msg === "No existe token" || info.msg === "Token no valido")) {
                mensajes(info.msg);
            } else {
                console.log(info.info);
                setBucle(true);
                setPeticiones(info.info);
            }
        })

    }


    const PeticionCard = ({ id, peticion, external_id, createdAt, cuentum }) => {
        const [abierto, setAbierto] = useState(false);
        const { correo, persona } = cuentum;
        const { nombres, apellidos, institucion } = persona;
        var fechaHora = format(new Date(createdAt), 'yyyy-MM-dd HH:mm:ss');
        const handleAceptar = () => {
            acepReac(1);
        };

        const handleRechazar = () => {
            acepReac(0);
           console.log(external_id);
            setPeticiones((prevPeticiones) =>
                prevPeticiones.filter((p) => p.external_id !== external_id)
            );
        };

        const acepReac = (datac) => {
           metodoGet(`/aceptarechazar/peticiones/${external_id}/${datac}`, "null").then((info) => {
                console.log(info);
                if (info.code !== 200 && (info.msg === "No existe token" || info.msg === "Token no valido")) {
                    mensajes(info.msg);
                } else {
                    console.log(info.info);
                }
            })
            setPeticiones((prevPeticiones) =>
                prevPeticiones.filter((p) => p.external_id !== external_id)
            );
        }
        return (
            <div className="users-container">
                <div className={`peticion-card ${abierto ? 'abierto' : ''}`}
                    onClick={() => setAbierto(!abierto)} >
                    <h2>{nombres + " " + apellidos}</h2>
                    <p>{correo}</p>
                    <p>{institucion}</p>
                    <p>Fecha y Hora: {fechaHora}</p>
                    {abierto && (
                        <div>
                            <p>Petición: {peticion}</p>
                            <div className="boton-container">
                                <div className="aceptar-boton">
                                    <button onClick={handleAceptar}>Aceptar</button>
                                </div>
                                <div className="rechazar-boton">
                                    <button onClick={handleRechazar}>Rechazar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <div className='backgroundYovin'>
            </div>
            <div className="contentYovin1">
                <dir className="contentYovin">
                    <dir className="contentYovin">
                        <h1 className="titulo-peticiones">Listado de Peticiones</h1>

                        {peticiones.map((peticion) => (
                            <PeticionCard key={peticion.id} {...peticion} />
                        ))}
                    </dir>
                </dir>
            </div>
            <Footer />
        </div>
    );

};

export default VerPeticion;
