import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import styled, {keyframes} from 'styled-components';
import { Slide, Fade } from 'react-awesome-reveal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Componente de estilo para el contenedor principal
const Contenedor = styled.div`
  max-width: 600px;
  max-height: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #0C2840;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
// Componente de estilo para el título
const Titulo = styled.h1`
  color: #ffffff;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TituloSugerencia = styled.h1`
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  margin-bottom: 0px;
  animation: ${fadeIn} 0.5s ease-in-out; /* Ajusta la duración y la función de temporización según tus preferencias */
`;


// Componente de estilo para los mensajes
const Mensaje = styled.div`
margin-rigth: ${({ type }) => (type === 'answer' ? 'auto' : 'none')};
margin-left: ${({ type }) => (type === 'question' ? 'auto' : 'none')};
background-color: ${({ type }) => (type === 'question' ? '#3498db' : '#4caf50')};
color: ${({ type }) => (type === 'answer' ? 'white' : 'black')};
border-radius: 8px;
padding: 10px;
margin-bottom: 10px;
max-width: 70%;
width: fit-content;
`;

// Componente de estilo para el formulario
const Formulario = styled.form`
  display: flex;
  margin-top: 20px;
`;

// Componente de estilo para el input de texto
const InputText = styled.input`
  flex: 1;
  padding: 10px;
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
const ButtonSubmit = styled.button`
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
const LoadingDots = styled.div`
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


const MensajesContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

`;

const SugerenciasContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin-top: 20px; /* Ajusta aquí según sea necesario */
`;

const SugerenciaButton = styled.button`
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 8px;
  background-color: #CB634D; /* Cambia a verde */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: ${({ marginTop }) => marginTop};
  transition: margin-top 0.5s; /* Agregamos una transición para suavizar el desplazamiento */

  &:hover {
    transform: scale(1.1); /* Aplicamos un aumento de escala al pasar el cursor */
  }
`;

//Sugerencias
const sugerencias = [
  '¿Cómo afecta la radiación UV a la piel?',
  '¿Cómo se mide el índice UV?',
  'Efectos de la radiación UV en los ojos',
  '¿Hay diferencias en la radiación UV según la ubicación geográfica?',
];

const LimpiarChatButton = styled.button`
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

const App = () => {
  const handleSugerenciaClick = (sugerencia) => {
    setInputContent(sugerencia);
  };

  const [messages, setMessages] = useState([]);
  const [inputContent, setInputContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const apiKey = "AIzaSyBcVWGbWToIhZKuA7yOnCWtDzuIyXi_mnI";
  const mensajesRef = useRef(null);

  const handleInputChange = (e) => {
    setInputContent(e.target.value);
  };

  const runModel = async () => {
    if (!apiKey) {
      console.error('Por favor, ingrese la api key');
      return;
    }
    setIsGenerating(true);

    const isRelatedToUV = checkIfRelatedToUV(inputContent);

    try {
      let text;

      if (isRelatedToUV) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        // Establecer parámetros para limitar la respuesta a 30 palabras
        const prompt = `${inputContent} (limit: 30 words)`;
  
        const result = await model.generateContent(prompt);
        const response = await result.response;
        text = await response.text();
  
        // Puedes eliminar el mensaje " (limit: 30 words)" de la respuesta final si lo deseas
        text = text.replace(' (limit: 50 words)', '');
      } else {
        text = generateOptionsForUV();
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'question', content: inputContent },
        { type: 'answer', content: text },
      ]);

      setGeneratedContent(text);
      setInputContent('');
    } catch (error) {
      console.error('Error al generar contenido:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const checkIfRelatedToUV = (question) => {
    const uvKeywords = ['UV', 'radiación UV', 'rayos UV', 'índice UV', 'rayos ultravioleta'];
    return uvKeywords.some(keyword => question.toLowerCase().includes(keyword.toLowerCase()));
  };

  const generateOptionsForUV = () => {
    const options = [
      "No estoy seguro de entender tu pregunta",
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Evitar el envío si el input está vacío
    if (inputContent.trim() === '') {
      toast.warning('Por favor, escribe una pregunta.');
      return;
    }
    runModel();
  };

  const handleLimpiarChat = () => {
    setMessages([]);
  };

  useEffect(() => {
    // Cada vez que se actualizan los mensajes, desplázate hacia abajo
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  }, [messages]);


  return (
    <body>
      <Contenedor>
        <Titulo>Hola, soy tu asistente chatBot :D</Titulo>
        <MensajesContainer ref={mensajesRef}>
          {messages.map((message, index) => (
            <Slide key={index} direction={message.type === 'question' ? 'left' : 'right'} triggerOnce>
              <Mensaje type={message.type}>
                <p>{message.content}</p>
              </Mensaje>
            </Slide>
          ))}
        </MensajesContainer>
        <Formulario onSubmit={handleSubmit}>
          <InputText
            type='text'
            value={inputContent}
            onChange={handleInputChange}
            placeholder='Escribe tu pregunta...'
          />
          <ButtonSubmit type="submit" loading={isGenerating}>
            {isGenerating ? <LoadingDots /> : 'Preguntar'}
          </ButtonSubmit>
        </Formulario>
        <TituloSugerencia>Preguntas frecuentes</TituloSugerencia>
        <SugerenciasContainer>
          {sugerencias.map((sugerencia, index) => (
            <SugerenciaButton key={index} onClick={() => handleSugerenciaClick(sugerencia)}>
              {sugerencia}
            </SugerenciaButton>
          ))}
        </SugerenciasContainer>
        <LimpiarChatButton onClick={handleLimpiarChat}>Limpiar Chat</LimpiarChatButton>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      </Contenedor>
    </body>
  );
};

export default App;