import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMessageSend = async () => {
    if (!userMessage) return;

    // Ajouter le message de l'utilisateur à l'historique
    setMessages([...messages, { sender: 'user', content: userMessage }]);
    setUserMessage('');
    setLoading(true);

    try {
      // Requête vers le backend local qui va interagir avec OpenAI
      const response = await axios.post(
        'http://localhost:5000/chat',  // Assurez-vous que ce point de terminaison correspond à votre backend
        { message: userMessage }      // Passer uniquement le message
      );

      // Ajouter la réponse de l'IA à l'historique des messages
      setMessages([
        ...messages,
        { sender: 'user', content: userMessage },
        { sender: 'bot', content: response.data.content },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...messages,
        { sender: 'user', content: userMessage },
        { sender: 'bot', content: 'Désolé, une erreur est survenue.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='z-index  chatbox__container'>
      <div className="chatbox" style={{ border: '1px solid #ccc', padding: '20px', height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <p style={{ color: msg.sender === 'user' ? 'blue' : 'green' }}>
              {msg.content}
            </p>
          </div>
        ))}
        {loading && <p style={{ color: 'gray' }}>Chargement...</p>}
      </div>

      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Tapez un message..."
        style={{ width: '100%', padding: '10px', marginTop: '10px' }}
      />
      <button onClick={handleMessageSend} style={{ padding: '10px 20px', marginTop: '10px' }}>
        Envoyer
      </button>
    </div>
  );
};

export default Chatbot;
