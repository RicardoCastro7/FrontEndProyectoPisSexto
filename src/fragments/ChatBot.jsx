import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Slide } from 'react-awesome-reveal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Contenedor, ChatCircleButton,
  Titulo,
  MensajesContainer,
  Mensaje,
  Formulario,
  InputText,
  ButtonSubmit,
  LoadingDots,
  TituloSugerencia,
  SugerenciasContainer,
  sugerencias,
  SugerenciaButton,
  LimpiarChatButton
} from '../utiles/vistaChat';


const ChatBot = () => {

  const [messages, setMessages] = useState([]);
  const [inputContent, setInputContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [setGeneratedContent] = useState('');
  const apiKey = "AIzaSyBcVWGbWToIhZKuA7yOnCWtDzuIyXi_mnI";
  const mensajesRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);


  const handleSugerenciaClick = (sugerencia) => {
    setInputContent(sugerencia);
  };

  const handleInputChange = (e) => {
    setInputContent(e.target.value);
  };

  const runModel = async () => {
    if (!apiKey) {
      console.error('Por favor, ingrese la api key');
      return;
    }
    
    setIsGenerating(true);
    const isGreeting = checkIfGreeting(inputContent);
    if (isGreeting) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'answer', content: '¡Hola! Soy un chatbot diseñado para proporcionarte información sobre los rayos UV. ¿Qué te gustaría saber hoy?' },
      ]);
      setIsGenerating(false);
      setInputContent('');
      return;
    }

    const isRelatedToUV = checkIfRelatedToUV(inputContent);

    try {
      let text;

      if (isRelatedToUV) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Establecer parámetros para limitar la respuesta a 30 palabras
        const prompt = `${inputContent} (limit: 50 words)`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        text = await response.text();

        // Puedes eliminar el mensaje " (limit: 50 words)" de la respuesta final si lo deseas
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
      setInputContent('');
    }
  };

  const checkIfRelatedToUV = (question) => {
    const uvKeywords = ['UV', 'radiación UV', 'rayos UV', 'índice UV', 'rayos ultravioleta', 'protección solar', 'uv enfermedades', 'luz solar', 'cancer'];
    return uvKeywords.some(keyword => question.toLowerCase().includes(keyword.toLowerCase()));
  };

  const checkIfGreeting = (question) => {
    const greetings = ['hola', 'cómo estas', 'buenos dias', 'buenas tardes', 'buenas noches'];
    return greetings.some(greeting => question.toLowerCase().includes(greeting.toLowerCase()));
  };

  const generateOptionsForUV = () => {
    const options = [
      "¡ NO ENTIENDO TU PREGUNTA !",
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


  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <ChatCircleButton onClick={toggleChat}>Chat</ChatCircleButton>
      <Contenedor isOpen={isChatOpen}>
        <Titulo>Asistente Chatbot</Titulo>
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
    </div>
  );
};

export default ChatBot;
