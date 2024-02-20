import '../css/homeStyle.css';
import '../css/barraMenuStyle.css';
import BarraMenu from './BarraMenu';
import logoIcon from '../img/LOGO_UV.png';
import { getRol, getUser } from '../utiles/SessionUtil';
import React, { useEffect, useState } from 'react';

const PrincipalUsuario = () => {
    const rol = getRol();
    const [nombreUsuario, setNombreUsuario] = useState('');

    useEffect(() => {
        const usuario = getUser();
        if (usuario && usuario.nombres) {
            setNombreUsuario(usuario.nombres);
        }
    }, []);

    return (
        <div>
            <BarraMenu />
            <section className="home-container">
                <div className="home-text">
                    <h1>Hola, {nombreUsuario}</h1>
                    {rol === 'ADMINISTRADOR' && (
                        <>
                            <p>Nos complace darte la bienvenida al Panel de Control de Administración. Tu rol es crucial para mantener la integridad y eficiencia de nuestra comunidad.
                            </p>
                        </>
                    )}
                    {rol === 'USUARIO' && (<>
                        <p>Explora los niveles de radiación ultravioleta y mantente informado sobre los patrones y tendencias de la radiación ultravioleta a lo largo del tiempo.
                        </p>
                    </>)}

                </div>
            </section >
           
        </div>

    );
};

export default PrincipalUsuario;
