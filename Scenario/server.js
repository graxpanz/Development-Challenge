import express from 'express';
import cors from 'cors'; 
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

const token = '7brtKEhvXuAoBHZecO2GP7AkvXgQW4cN9GvV85GGuSs';

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/notify', async (req, res) => {
    const { message } = req.body; 

    try {
        const response = await fetch('https://notify-api.line.me/api/notify', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ message }),
        });

        const result = await response.json();
        res.status(200).send(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error sending notification');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
