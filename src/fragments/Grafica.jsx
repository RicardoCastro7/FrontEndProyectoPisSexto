import React, { Component } from "react";
import Chart from "react-apexcharts";
import _ from 'lodash';
const URL = "https://computacion.unl.edu.ec/uv/api/medicionFechas";

const obtenerFechaHoyEcuador = () => {
    const fechaHoy = new Date();
    fechaHoy.setUTCHours(fechaHoy.getUTCHours() - 5); // Restar 5 horas para ajustar a GMT-5 (Ecuador)
    return fechaHoy.toISOString().split('T')[0];
};

const obtenerFechaMananaEcuador = () => {
    const fechaManana = new Date();
    fechaManana.setDate(fechaManana.getDate() + 1); // Sumar 1 día para obtener mañana
    fechaManana.setUTCHours(fechaManana.getUTCHours() - 5); // Restar 5 horas para ajustar a GMT-5 (Ecuador)
    return fechaManana.toISOString().split('T')[0];
};

class Grafica extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "Horas del dia",
                },
                xaxis: {
                    name: "Horas del dia",
                    categories: [],
                },
                max: 15,  
                yaxis: {
                    labels: {
                        formatter: function (value) {
                            // Formatea el valor para mostrar solo la parte entera
                            return Math.floor(value);
                        },
                    },
                },
            },
            series: [
                {
                    name: "Indice UV",
                    data: [],
                },
            ],
        };
    }

    componentDidMount() {
        const dispositivoId = parseInt(this.props.dispositivoId, 10);
     //   console.log(this.props);
        const data = {
            fechaInicio: obtenerFechaHoyEcuador(),
            fechaFin: obtenerFechaMananaEcuador()
        };

        // Realiza la solicitud GET para obtener los datos
        fetch(`${URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJCQUNLRU5EIiwiaWF0IjoxNzA3MDc2NzkyfQ.xT3uhWgUbCsCFmPepyiGQOUIsdzetlfgrHvdGqKr-Iw"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {

                const medicionesDispositivo = data.mediciones.filter(
                    (medicion) => medicion.dispositivoId === dispositivoId
                  
                  );
             //     console.log(medicionesDispositivo );
                // Agrupar las mediciones por hora y calcular el promedio
                const medicionesPorHora = _.groupBy(
                    medicionesDispositivo,
                    (medicion) => {
                        const fecha = new Date(medicion.fecha);
                        
                        // Filtrar solo las horas entre las 6 am y las 5 pm (17:00)
                        const hora = fecha.getHours()+5;
                        if (hora >= 6 && hora <= 17) {
                            return (
                                (hora ) +
                                ":" +
                                ("0" + fecha.getMinutes()).slice(-2)
                            );
                        }else if (hora < 6 ){
                            return (
                                (hora ) +
                                ":" +
                                ("0" + fecha.getMinutes()).slice(-2)
                            );
                        }
                    }
                );
                

                const promediosPorHora = _.map(medicionesPorHora, (mediciones, hora) => {
                    const horaInt = parseInt(hora.split(':')[0], 10);
                    if (horaInt >= 6 && horaInt <= 17) {
                        return {
                            hora,
                            promedioUV: _.meanBy(mediciones, 'uv'),
                        };
                    } else {
                        return null; 
                    }
                });
                const promediosValidos = promediosPorHora.filter(item => item !== null);
            //    console.log(promediosPorHora);
                const horas = promediosValidos.map(item => item.hora);
                const medicionesUV = promediosValidos.map(item => item.promedioUV);
               
                // Actualizar el estado con los datos del gráfico
                this.setState({
                    options: {
                        ...this.state.options,
                        xaxis: {
                            categories: horas,
                            labels: {
                                formatter: function (value) {
                                    return value+ " H"; // Agrega "h" al valor para indicar horas
                                },
                            },
                        },
                        yaxis: {
                            max: 15, 
                            labels: {
                                formatter: function (value) {
                                    return  parseFloat(value.toFixed(2))+ " UV"; // Agrega " UV" al valor para indicar índices UV
                                },
                            },
                        },
                    },
                    series: [
                        {
                            ...this.state.series[0],
                            data: medicionesUV.map(value => parseFloat(value.toFixed(2))),
                        },
                    ],
                });
            })
            .catch(error => console.error("Error al obtener datos:", error));
    }

    render() {
        return (
            <div className="appGary">
                <div className="center-chartGary">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            width="100%"
                            height="400"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Grafica;