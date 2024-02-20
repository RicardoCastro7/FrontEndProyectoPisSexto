import React, { useState } from 'react';
import '../css/registroStyle.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { GuardarPersona, ObtenerGet, PostGuardar } from '../hooks/Conexion';
import mensajes from '../utiles/Mensajes';
import { borrarSesion, getToken } from '../utiles/SessionUtil';
import Header from './Header';
import logoIcon from '../img/imagenesRegistro/LOGO_UV.png';


const Registro = () => {

    const navegation = useNavigate();
    const { register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm();
    // console.log(errors)

    //CONSTANTES PARA LLAMAR UNA VEZ AL SERVIDOR
    const [llRoles, setRoles] = useState(false);

    //DATOS
    const [dataR, setDataR] = useState([]);

    if (!llRoles) {
        ObtenerGet(getToken(), '/listar/rol').then((info) => {
            if (info.code !== 200 && info.msg == 'Acceso denegado. Token a expirado') {
                borrarSesion();
                mensajes(info.mensajes);
                navegation("/principal");
            } else {
                setDataR(info.info);
                setRoles(true);
            }
        })
    }

    const onSubmit = (data) => {

        var datos = {
            "nombres": data.nombres,
            "apellidos": data.apellidos,
            "cargo": data.cargo,
            "clave": data.clave,
            "correo": data.correo,
            "institucion": data.institucion,
            "external_rol": dataR[1].external_id,
            "fecha_nacimiento": data.fecha_nacimiento,
        };
        PostGuardar(datos, getToken(), '/guardar/personas').then((info) => {
            if (info.code !== 200) {
                mensajes(info.msg, 'error', 'Error');
            } else {
                mensajes(info.msg);
            }
        })

    }

    return (
        <div className="registro-fondo">
            <Header />
            <div className='registro-containerPadre'>
                <div className="registro-containerRegistro">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="registro-tituloRegistro">REGISTRO</h1>
                        <div className='registro-iconunl'>
                            <img src={logoIcon} alt="Logo UNL" />
                        </div>
                        <div className="registro-row">
                            {/* NOMBRES DEL USUARIO */}
                            <div className="registro-col">
                                <label className="registro-label" htmlFor="fname">Nombres:</label>
                                <input className="registro-input registro-name" name='nombre' type="text" id="nombre" placeholder="Nombre"
                                    {...register("nombres", {
                                        required: {
                                            value: true,
                                            message: "Nombres son requeridos"
                                        },
                                        minLength: {
                                            value: 5,
                                            message: "Este campo debe tener un mínimo de 5 caracteres"
                                        },
                                        maxLength: {
                                            value: 25,
                                            message: "Este campo debe tener un máximo de 25 caracteres"
                                        },
                                    })} />
                                {
                                    errors.nombres &&
                                    <span className="registro-span">{errors.nombres.message}</span>
                                }
                            </div>
                            {/* APELLIDOS DEL USUARIO */}
                            <div className="registro-col">
                                <label className="registro-label" htmlFor="lname">Apellidos:</label>
                                <input className="registro-input registro-lastname" name='apellidos' type="text" id="apellido" placeholder="Apellido" {...register("apellidos", {
                                    required: {
                                        value: true,
                                        message: "Apellidos son requeridos"
                                    },
                                    minLength: {
                                        value: 5,
                                        message: "Este campo debe tener un mínimo de 5 caracteres"
                                    },
                                    maxLength: {
                                        value: 25,
                                        message: "Este campo debe tener un máximo de 25 caracteres"
                                    },
                                })} />
                                {
                                    errors.apellidos &&
                                    <span className="registro-span">{errors.apellidos.message}</span>
                                }
                            </div>
                        </div>

                        <div className="registro-row">
                            {/* EMAIL DEL USUARIO */}
                            <div className="registro-col">
                                <label className="registro-label" htmlFor="email">Email:</label>
                                <input className="registro-input registro-email" type="email" id="email" name='email' placeholder="ejemplo@gmail.com" {...register("correo", {
                                    required: {
                                        value: true,
                                        message: "Correo es requerido"
                                    },
                                    pattern: {
                                        value: /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
                                        message: "Correo no válido"
                                    }
                                })} />
                                {
                                    errors.correo &&
                                    <span className="registro-span">{errors.correo.message}</span>
                                }
                            </div>

                            {/* FECHA DE NACIMIENTO DEL USUARIO */}
                            <div className="registro-col">
                                <label className="registro-label" htmlFor="date">Fecha de nacimiento:</label>
                                <input className="registro-input registro-fechanac" type="date" name='nacimiento' id='nacimiento' placeholder="dd-mm-aaaa" {...register("fecha_nacimiento", {
                                    required: {
                                        value: true,
                                        message: "Fecha de nacimiento requerida"
                                    },
                                    validate: (value) => {
                                        const fechaNacimiento = new Date(value);
                                        const fechaActual = new Date();
                                        const edad =
                                            fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                                        return edad >= 15 || "Debe ser mayor de 15 años"
                                    }
                                })} />
                                {
                                    errors.fecha_nacimiento && <span className="registro-span">{errors.fecha_nacimiento.message}</span>
                                }
                            </div>
                        </div>
                        <div className="registro-row">
                            {/* INSTITUCION DE PROCEDENCIA DEL USUARIO */}
                            <div className="registro-col">
                                <label className="registro-label" htmlFor="lname">Institución:</label>
                                <input className="registro-input registro-lastname" name='institucion' type="text" id="institucion" placeholder="Institucion" {...register("institucion", {
                                    required: {
                                        value: true,
                                        message: "Institución requerida"
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Este campo debe tener un mínimo de 3 caracteres"
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: "Este campo debe tener un máximo de 30 caracteres"
                                    },
                                })} />
                                {
                                    errors.institucion &&
                                    <span className="registro-span">{errors.institucion.message}</span>
                                }
                            </div>
                            {/* CARGO DEL USUARIO */}
                            <div className="registro-col">
                                <label className="registro-label" htmlFor="lname">Cargo:</label>
                                <input className="registro-input registro-lastname" name='cargo' type="text" id="cargo" placeholder="Cargo" {...register("cargo", {
                                    required: {
                                        value: true,
                                        message: "Cargo requerido"
                                    },
                                    minLength: {
                                        value: 5,
                                        message: "Este campo debe tener un mínimo de 5 caracteres"
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: "Este campo debe tener un máximo de 30 caracteres"
                                    },
                                })} />
                                {
                                    errors.cargo &&
                                    <span className="registro-span">{errors.cargo.message}</span>
                                }
                            </div>
                        </div>
                        {/* PASSWORD */}
                        <div className="registro-row">
                            <div className="registro-col">
                                <label className="registro-label" htmlFor="password">Contraseña:</label>
                                <input className="registro-input registro-password" type="password" name='contraseña' id="contraseña" placeholder="xxxxx" {...register("clave", {
                                    required: {
                                        value: true,
                                        message: "Contraseña es requerida"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "La contraseña debe tener al menos 6 caracteres"
                                    }
                                })} />
                                {
                                    errors.clave && <span className="registro-span">{errors.clave.message}</span>
                                }
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <button type='submit' className="registro-botonDeRegistro" >Registrarse</button>
                        </div>
                        <p className="registro-p">
                            Registrate, es fácil y rápido!
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );



};
export default Registro;