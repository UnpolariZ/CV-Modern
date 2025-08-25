import React, { useState } from 'react';
import axios from 'axios';

function Chatbox() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ajouter le message de l'utilisateur dans l'historique
        setChatHistory([...chatHistory, { user: message }]);
        setMessage('');

        try {
            // Appel à votre backend
            const response = await axios.post('http://localhost:5000/chat', {
                message,
            });

            // Ajouter la réponse de ChatGPT dans l'historique
            setChatHistory([
                ...chatHistory,
                { user: message },
                { bot: response.data.content },
            ]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='z-index'>
            <h1>Chatbot</h1>
            <div>
                {chatHistory.map((chat, index) => (
                    <div key={index}>
                        {chat.user && <p><strong>User:</strong> {chat.user}</p>}
                        {chat.bot && <p><strong>Bot:</strong> {chat.bot}</p>}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chatbox;
