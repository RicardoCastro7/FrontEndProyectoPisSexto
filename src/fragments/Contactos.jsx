import logoIconFondo from '../img/LOGO_UV.png';
import Header from './Header';

const Contactos = () => {
    return (

        <section className="bg-light py-3 py-md-5">
            <Header />
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                        <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row gy-3 gy-md-4 gy-lg-0 align-items-xl-center">
                    <div className="col-12 col-lg-6">
                        <img className="img-fluid rounded" loading="lazy" src={logoIconFondo} alt="" />
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="row justify-content-xl-center">
                            <div className="col-12 col-xl-11">
                                <div className="bg-white border rounded shadow-sm overflow-hidden">

                                    <form action="#!">
                                        <div className="row gy-4 gy-xl-5 p-4 p-xl-5">
                                            <div className="col-12">
                                                <label for="fullname" className="form-label" style={{ fontStyle: 'italic', fontSize: '24px', fontWeight: 'bold' }}>Proyecto Integrador de Saberes</label>

                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label for="text" className="form-label" style={{ fontWeight: 'bold' }}>Carrera</label>
                                                <h2>
                                                    <p>Computación</p>
                                                </h2>

                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label for="text" className="form-label" style={{ fontWeight: 'bold' }}>Ciclo/Período</label>
                                                <p>
                                                    <span >Sexto/Octubre-Febrero 2024</span>
                                                </p>
                                            </div>
                                            <div className="col-12">
                                                <label for="subject" className="form-label" style={{ fontWeight: 'bold' }}>Facultad</label>
                                                <p>
                                                    <span >Facultad de la Energía, las Industrias y los Recursos Naturales no Renovables</span>
                                                </p>
                                            </div>
                                            <div className="col-12">
                                                <label for="message" className="form-label" style={{ fontWeight: 'bold' }}>Developer team</label>
                                                <ul style={{paddingLeft:'30px'}}>
                                                    <li style={{listStyleType:'disc'}}>Hilary Madeley Calva Camacho (hilary.calva@unl.edu.ec)</li>
                                                    <li style={{listStyleType:'disc'}}>Ricardo Alejandro Castro Sarmiento (ricardo.castro@unl.edu.ec)</li>
                                                    <li style={{listStyleType:'disc'}}>Gari Roberto Coronel Lojan (gari.coronel@unl.edu.ec)</li>
                                                    <li style={{listStyleType:'disc'}}>Joan Daniel Riofrío Bustamante (joan.riofrio@unl.edu.ec)</li>
                                                    <li style={{listStyleType:'disc'}}>Yovin Stiven Urrrego Gomez (yovin.urrego@unl.edu.ec)</li>
                                                </ul>
                                            </div>

                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="bg-body-tertiary text-center text-lg-start">
                <div class="text-center p-3" style={{ color: '#fff', backgroundColor: '#0C2840', marginTop: '10px', height: '100px', textAlign: 'center', marginLeft: '-200px', marginRight: '-200px' }}>
                    © 2024 API UV
                </div>
            </footer>
        </section>

    );
}

export default Contactos;