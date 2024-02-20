import styled, {keyframes} from 'styled-components';
// Componente de estilo para el contenedor principal
export const Contenedor = styled.div`
  max-width: 400px;
  max-height: 700px;
  margin: 0 auto;
  padding: 20px;
  background-color: #0C2840;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: ${({ isOpen }) => (isOpen ? '80px' : '-100%')}; /* Cambiado para utilizar transform */
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: opacity 0.3s ease, bottom 0.3s ease; /* Añadida transición para bottom */
`;

export const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;
export const ChatCircleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #0C2840;
  border-radius: 50%;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  animation: ${pulseAnimation} 2s infinite; /* Animación de pulso */
`;
// Componente de estilo para el título
export const Titulo = styled.h1`
  color: #ffffff;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 0px;
`;

export const TituloSugerencia = styled.h1`
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  margin-bottom: 0px;
`;


// Componente de estilo para los mensajes
export const Mensaje = styled.div`
margin-rigth: ${({ type }) => (type === 'answer' ? 'auto' : 'none')};
margin-left: ${({ type }) => (type === 'question' ? 'auto' : 'none')};
background-color: ${({ type }) => (type === 'question' ? '#3498db' : '#669C2B')};
color: ${({ type }) => (type === 'answer' ? 'white' : 'black')};
border-radius: 8px;
padding: 5px;
font-size: 13px;
margin-bottom: 10px;
max-width: 70%;
width: fit-content;
`;

// Componente de estilo para el formulario
export const Formulario = styled.form`
  display: flex;
  margin-top: 20px;
`;

// Componente de estilo para el input de texto
export const InputText = styled.input`
  flex: 1;
  padding: 10px;
  max-width: 200px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 16px;
  outline: none; /* Elimina el contorno al hacer clic */
  transition: border-color 0.3s ease; /* Agrega una transición al color del borde */
  
  &:focus {
    border-color: #3498db; /* Cambia el color del borde al enfocarse */
  }
`;

// Componente de estilo para el botón de envío
export const ButtonSubmit = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: ${({ loading }) => (loading ? 'not-allowed' : 'pointer')};
  font-size: 16px;
  transition: background-color 0.3s ease; /* Transición del color de fondo */
  &:hover {
    background-color: #2980b9; /* Cambia el color de fondo al pasar el ratón */
  }
`;

// Componente de estilo para el componente de carga
export const LoadingDots = styled.div`
  display: inline-block;
  vertical-align: middle;
  font-size: 20px;
  animation: loadingDots 1.5s infinite ease-in-out;
  
  @keyframes loadingDots {
    0%, 20%, 80%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
  }
`;
export const MensajesContainer = styled.div`
  max-width: 500px;
  overflow-y: auto;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

`;

export const SugerenciasContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  margin-top: 10px; /* Ajusta aquí según sea necesario */
`;

export const SugerenciaButton = styled.button`
  background-color: #e4e4e4; /* Cambia a verde */
  color: #000;
  font-size: 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: margin-top 0.5s; /* Agregamos una transición para suavizar el desplazamiento */

  &:hover {
    transform: scale(1.1); /* Aplicamos un aumento de escala al pasar el cursor */
  }
`;

//Sugerencias
export const sugerencias = [
  '¿Cómo afecta la radiación UV a la piel?',
  '¿Cómo se mide el índice UV?',
  'Efectos de la radiación UV en los ojos',
  '¿Hay diferencias en la radiación UV según la ubicación geográfica?',
  'Protección solar y su importancia',
  'Consejos para reducir la exposición a la radiación UV',
];

export const LimpiarChatButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #e74c3c; /* Color de fondo */
  color: #fff; /* Color del texto */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Transición del color de fondo */

  &:hover {
    background-color: #c0392b; /* Cambia el color de fondo al pasar el ratón */
  }
`;