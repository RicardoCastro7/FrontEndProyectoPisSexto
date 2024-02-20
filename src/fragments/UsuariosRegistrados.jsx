import { borrarSesion } from '../utiles/SessionUtil';
import { useNavigate } from 'react-router';
import { getToken } from '../utiles/SessionUtil';
import mensajes from '../utiles/Mensajes';
import '../css/tableStyle.css';
import 'boxicons';
import BarraMenu from './BarraMenu';
import { ObtenerGet } from '../hooks/Conexion';
import React, { useState } from 'react';


const UsuariosRegistrados = () => {
    const navegation = useNavigate();

    //CONSTANTES PARA LLAMAR UNA VEZ AL SERVIDOR
    const [llUsuarios, setUsuarios] = useState(false);

    //DATOS
    const [data, setData] = useState([]);

    if (!llUsuarios) {
        ObtenerGet(getToken(), '/listar/personas').then((info) => {
            if (info.code !== 200 && info.msg == 'Acceso denegado. Token a expirado') {
                borrarSesion();
                mensajes(info.mensajes);
                navegation("/principal");
            } else {
                setData(info.info);
                setUsuarios(true);
            }
        })
    }

    //CAMBIAR FORMATO FECHA

    const obtenerFechaFormateada = (fechaString) => {
        const fecha = new Date(fechaString);
        fecha.setDate(fecha.getDate() + 1); // Ajustar la fecha sumando 1 día
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
        const day = ('0' + fecha.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const usuariosFiltrados = data.filter(usuario => 
        usuario.persona_rol.length > 0 && usuario.persona_rol[0].rol.nombre !== "ADMINISTRADOR"
    );
    

    return (
        <div >
            <BarraMenu />
            <div className='containerUsuarios'>
                <main className='table'>
                    <section className='table_header'>
                        <h1>Usuarios Registrados</h1>
                    </section>
                    <section className='table_body'>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Cargo</th>
                                        <th>Institución</th>
                                        <th>Estado</th>
                                        <th>Fecha de nacimiento</th>
                                        <th>Rol</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {usuariosFiltrados.map((usuario) => (
                                        <tr key={usuario.id}>
                                            <td>{usuario.nombres}</td>
                                            <td>{usuario.apellidos}</td>
                                            <td>{usuario.cargo}</td>
                                            <td>{usuario.institucion}</td>
                                            <td>{usuario.estado ? 'ACTIVO' : 'DESACTIVO'}</td>
                                            <td>{obtenerFechaFormateada(usuario.fecha_nacimiento)}</td>
                                            <td>{usuario.persona_rol[0].rol.nombre}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>
                    </section>
                </main>

            </div>

        </div>

    )
}

export default UsuariosRegistrados;