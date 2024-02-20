import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import '../css/sobreApi.css';
import Header from './Header';

import logoIcon from '../img/LOGO_UV.png';


const SobreApi = () => {

    return (
        <div>
            <Header />
            <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff', marginTop: '80px' }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBRow>
                            <MDBCol lg="9" xl="7" style={{ marginBottom: '0px' }}>
                                <MDBCard style={{ marginBottom: '-20px' }}>
                                    <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#f8f9fa', height: '200px' }}>
                                        <div className="ms-3" style={{ marginTop: '80px' }}>
                                            <MDBTypography tag="h5" style={{ color: '#0C2840', fontSize: '30px', fontWeight: 'bold' }}>INFORMACIÓN SOBRE EL API</MDBTypography>
                                        </div>
                                    </div>
                                    <div className="p-4 text-black d-flex justify-content-center" style={{ backgroundColor: '#fff', marginTop: '50px' }}>
                                        <div className="text-center px-3">
                                            <MDBCardText className="mb-1 h5">Sensores</MDBCardText>
                                            <MDBCardText className="small text-muted mb-0">Ubicados en la ciudad de Loja-Ecuador</MDBCardText>
                                        </div>
                                        <div className="text-center px-3">
                                            <MDBCardText className="mb-1 h5">Proyecto</MDBCardText>
                                            <MDBCardText className="small text-muted mb-0">Universidad Nacional de Loja</MDBCardText>
                                        </div>
                                        <div className="text-center px-3">
                                            <MDBCardText className="mb-1 h5">Dirigido</MDBCardText>
                                            <MDBCardText className="small text-muted mb-0">Desarrolladores, investigadores, organizaciones</MDBCardText>
                                        </div>
                                    </div>


                                    <MDBCardBody className="text-black p-4">
                                        <div className="mb-5" style={{ marginTop: '50px' }}>
                                            <p className="lead fw-bold mb-1">Requisitos para el registro</p>
                                            <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}><div>
                                                <MDBCardText className="font-italic mb-1"><span>&#8226;</span> Tener al menos 15 años de edad para registrarse y acceder al API</MDBCardText>
                                                <MDBCardText className="font-italic mb-1"><span>&#8226;</span> Registrar una cuenta en la plataforma</MDBCardText>
                                                <MDBCardText className="font-italic mb-0"><span>&#8226;</span> Proporcionar información sobre cómo se utilizarán los datos que brinda el API</MDBCardText>
                                                <MDBCardText className="font-italic mb-0"><span>&#8226;</span> Ser estudiante, profesor o personal de una institución educativa para acceder al API.</MDBCardText>
                                                <MDBCardText className="font-italic mb-0"><span>&#8226;</span> Utilizar los datos de radiación solar con fines educativos dentro del ámbito académico</MDBCardText>
                                            </div>

                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                        </div>
                                    </MDBCardBody>



                                </MDBCard>
                            </MDBCol>

                            <MDBCol lg="3" xl="5" className="ms-auto" style={{ paddingTop: '110px', marginLeft: '10px' }}>
                                <MDBCard>
                                    <div className='iconunl'>
                                        <img src={logoIcon} alt="Logo UNL" />
                                    </div>
                                    <MDBCardBody className="text-black p-4" style={{ marginBottom: '-65px' }}>
                                        <div className="mb-5" style={{ marginTop: '120px' }}>
                                            <p className="lead fw-bold mb-1">Datos requeridos</p>
                                            <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                                <div className="">
                                                    <MDBCardText className="font-italic mb-1"><span>&#8226;</span>Nombres y apellidos completos</MDBCardText>
                                                    <MDBCardText className="font-italic mb-1"><span>&#8226;</span>Institución de Pertenencia</MDBCardText>
                                                    <MDBCardText className="font-italic mb-0"><span>&#8226;</span>Cargo en la Institución</MDBCardText>
                                                    <MDBCardText className="font-italic mb-0"><span>&#8226;</span>Correo Institucional</MDBCardText>
                                                    <MDBCardText className="font-italic mb-0"><span>&#8226;</span>Fecha de Nacimiento</MDBCardText>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                        </div>
                                    </MDBCardBody>

                                </MDBCard>
                            </MDBCol>
                        </MDBRow>

                    </MDBRow>
                </MDBContainer>
            </div>
            <footer class="bg-body-tertiary text-center text-lg-start">
                <div class="text-center p-3" style={{ color: '#fff', backgroundColor: '#0C2840', marginTop: '10px', height: '100px', textAlign: 'center', marginLeft: '-200px', marginRight: '-200px' }}>
                    © 2024 API UV
                </div>
            </footer>
        </div>

    );
};


export default SobreApi;