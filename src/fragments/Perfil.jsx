import '../css/perfilStyle.css';
import BarraMenu from './BarraMenu';
import logoIcon from '../img/LOGO_UV.png';
import { getCorreo, getRol, getUser } from '../utiles/SessionUtil';
import React, { useEffect, useState } from 'react';

const Perfil = () => {
    const rol = getRol();
    const usuario = getUser();
    const correo = getCorreo();
    const [nombreUsuario, setNombreUsuario] = useState('');

    useEffect(() => {
        if (usuario && usuario.nombres) {
            setNombreUsuario(usuario.nombres);
        }
    }, []);

    //CAMBIAR FORMATO FECHA

    const obtenerFechaFormateada = (fechaString) => {
        const fecha = new Date(fechaString);
        fecha.setDate(fecha.getDate() + 1); // Ajustar la fecha sumando 1 día
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
        const day = ('0' + fecha.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    return (
        <div>
            <BarraMenu />
            <div className="container5">
                <div className="main-body" style={{ backgroundColor: '#e4e4e4' }}>
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={logoIcon} alt="Admin" className="rounded-circle" width="250" />
                                        <div className="mt-3">
                                            <h4 style={{ fontWeight: 'bold' }}>{usuario.nombres + " " + usuario.apellidos}</h4>
                                            <p className="text-secondary mb-1">{rol}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Proyecto de la UNL</h6>
                                        <span className="text-secondary">https://unl.edu.ec/</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-8" style={{ marginTop: '85px' }}>
                            <div class="card-body p-4">
                                <h6 style={{ fontWeight: 'bold' }}>Información personal</h6>
                                <hr class="mt-0 mb-4" />
                                <div class="row pt-1">
                                    <div class="col-6 mb-3">
                                        <h6>Correo electrónico</h6>
                                        <p class="text-muted">{correo}</p>
                                    </div>
                                    <div class="col-6 mb-3">
                                        <h6>Fecha de nacimiento</h6>
                                        <p class="text-muted">{obtenerFechaFormateada(usuario.fecha_nacimiento)}</p>
                                    </div>
                                </div>
                                <h6 style={{ fontWeight: 'bold' }}>Información institucional</h6>
                                <hr class="mt-0 mb-4" />
                                <div class="row pt-1">
                                    <div class="col-6 mb-3">
                                        <h6>Cargo</h6>
                                        <p class="text-muted">{usuario.cargo}</p>
                                    </div>
                                    <div class="col-6 mb-3">
                                        <h6>Institución</h6>
                                        <p class="text-muted">{usuario.institucion}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <footer class="bg-body-tertiary text-center text-lg-start">
                <div class="text-center p-3" style={{ color: '#fff', backgroundColor: '#0C2840', marginTop: '205px', height: '50px', textAlign: 'center' }}>
                    © 2024 API UV
                </div>
            </footer>

        </div>

    );
};

export default Perfil;
