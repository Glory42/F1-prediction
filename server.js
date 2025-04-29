require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Helper function to run Python script
function runPythonScript(args) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['python/f1_predictor.py', ...args]);
        let dataString = '';
        let errorString = '';

        pythonProcess.stdout.on('data', (data) => {
            dataString += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorString += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Python script exited with code ${code}: ${errorString}`));
            } else {
                try {
                    const result = JSON.parse(dataString);
                    resolve(result);
                } catch (error) {
                    reject(new Error(`Failed to parse Python output: ${error.message}`));
                }
            }
        });
    });
}

// API Routes
app.get('/api/prediction', async (req, res) => {
    try {
        const result = await runPythonScript(['--current']);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/past-forecast', async (req, res) => {
    try {
        const { year, race } = req.query;
        if (!year || !race) {
            return res.status(400).json({ error: 'Year and race parameters are required' });
        }
        const result = await runPythonScript(['--past', year, race]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 