import React, { useState } from 'react';
import '../css/hilarystyle.css';
import '../css/headerStyle.css';
import 'boxicons';
import logoIcon from '../img/LOGO_UV.png';
import Header from './Header';
import { InicioSesion, obtener } from '../hooks/Conexion'
import { getRol, getToken, getUser, saveCorreo, saveRol, saveToken, saveUser } from '../utiles/SessionUtil';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import mensajes from '../utiles/Mensajes';

const Login = () => {

    const navegation = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [focused, setFocused] = useState({ correo: false, clave: false });

    const handleFocus = (field) => {
        setFocused({ ...focused, [field]: true });
    };

    const handleBlur = (field, hasValue) => {
        setFocused({ ...focused, [field]: hasValue });
    };


    const onSubmit = (data) => {
        var datos = {
            "correo": data.correo,
            "clave": data.clave
        };

        InicioSesion(datos).then((info) => {
            var infoAux = info.info;
            console.log(infoAux);
            if (info.code !== 200) {
                mensajes(info.msg, "error", "Error")
            } else {
                saveToken(infoAux.token);
                saveRol(infoAux.rol);
                saveUser(infoAux.user);
                saveCorreo(infoAux.correo);
                navegation("/principalusuario");
                mensajes(info.info);
            }
        })
    };

    return (
        <div>

            <Header />
            <div className='background'>

            </div>

            <div className='container1'>
                <div className='content'>
                    <h2 className='text'>API RADIACIÓN ULTRAVIOLETA</h2>
                    <div className='text-sci'>
                        <h2 className='textoBienve'>Bienvenido! <br /> <span className='parrafoInfo'>A un enfoque más consciente de la exposición solar en Loja</span></h2>
                        <p className='parrafo'> Nuestra plataforma ha sido diseñada pensando en personas que buscan acceder
                            a información valiosa sobre los niveles de radiación UV en fechas pasadas. Con nuestra API, ahora es
                            posible explorar y utilizar datos detallados de radiación UV históricos, esta proporcionará acceso a una fuente confiable y completa de información. </p>

                    </div>
                </div>

                <div className='logreg-box'>
                    <div className='form-box login'>
                        <div className='iconunl'>
                            <img src={logoIcon} alt="Logo UNL" />
                        </div>
                        <h2>Iniciar Sesión</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='input-box'>
                                <span className='icon'><i className='bx bxs-envelope'></i></span>
                                <input type="email"
                                    {...register("correo", {
                                        required: {
                                            value: true,
                                            message: "Ingrese un correo"
                                        },
                                        pattern: {
                                            value: /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
                                            message: "Ingrese un correo válido"
                                        }
                                    })}
                                    onFocus={() => handleFocus('correo')}
                                    onBlur={(e) => handleBlur('correo', e.target.value !== '')}
                                />
                                {errors.correo && <span className='mensajeerror'>{errors.correo.message}</span>}
                                <label className={focused.correo ? 'active' : ''}>Correo electrónico</label>
                            </div>

                            <div className='input-box'>
                                <span className='icon'><i className='bx bxs-lock-alt'></i></span>
                                <input type="password"
                                    {...register("clave", {
                                        required: {
                                            value: true,
                                            message: "Ingrese una contraseña"
                                        }
                                    })}
                                    onFocus={() => handleFocus('clave')}
                                    onBlur={(e) => handleBlur('clave', e.target.value !== '')}
                                />
                                {errors.clave && <span className='mensajeerror'>{errors.clave.message}</span>}
                                <label className={focused.clave ? 'active' : ''}>Contraseña</label>
                            </div>

                            <div className='boton-login'>
                                <button type='submit' className='button-login-ingresar'>Ingresar</button>

                            </div>


                        </form>

                        <div className='login-register'>
                            <p>¿No tienes cuenta? <a href="/registro" className='register-link'>Regístrate</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
