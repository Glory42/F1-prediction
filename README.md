# F1 Result Forecast

A web application that predicts Formula 1 race winners based on qualifying results and displays past race predictions.

## Features

- Predicts race winners based on qualifying results
- Displays past race predictions and actual winners
- Modern and responsive UI

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- PostgreSQL database

## Setup

1. Clone the repository:
```
git clone https://github.com/yourusername/f1-prediction.git
cd f1-prediction
```

2. Install Node.js dependencies:
```
npm install
```

3. Install Python dependencies:
```
pip install -r requirements.txt
```

4. Create a PostgreSQL database named `f1_prediction`

5. Create a `.env` file in the root directory with the following content:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=f1_prediction
DB_PASSWORD=postgres
DB_PORT=5432
PORT=3000
```

## Running the Application

1. Start the server:
```
npm start
```

2. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `public/` - Static files (HTML, CSS, JavaScript)
- `python/` - Python scripts for F1 data processing
- `config/` - Configuration files
- `server.js` - Express server

## Technologies Used

- Node.js
- Express
- PostgreSQL
- Python
- FastF1
- Pandas
- NumPy

## License

MIT
