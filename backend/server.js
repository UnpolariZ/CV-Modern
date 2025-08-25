const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());  // Assurez-vous que CORS est activé pour autoriser les requêtes depuis votre frontend

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    console.log('Requête reçue :', userMessage); // Pour vérifier si la requête arrive

    if (!OPENAI_API_KEY) {
        console.error('Clé API manquante');
        return res.status(500).send('Clé API manquante');
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo", // Utilisez le modèle souhaité
                messages: [{ role: 'user', content: userMessage }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Réponse OpenAI:', response.data); // Vérifier la réponse d'OpenAI

        res.json(response.data.choices[0].message);
    }  catch (error) {
        console.error('Erreur lors de la requête à OpenAI:', error.response ? error.response.data : error.message);
        
        if (error.response && error.response.data && error.response.data.error) {
            if (error.response.data.error.code === 'insufficient_quota') {
                return res.status(400).send('Quota dépassé. Veuillez vérifier votre plan et vos crédits.');
            }
        }
    
        res.status(500).send('Erreur lors de la communication avec OpenAI');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
