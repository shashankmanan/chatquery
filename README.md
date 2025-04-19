# ChatQuery

A web application that allows you to interact with your database through natural language queries.

## Project Structure

- **frontend**: React application with Gemini AI integration
- **backend**: Express server with MongoDB database

## Environment Setup

This project uses environment variables for configuration. Follow these steps to set up:

### Backend Setup

1. Navigate to the `backend` directory
2. Copy `.env.example` to `.env`:
   ```
   cp .env.example .env
   ```
3. Edit `.env` and update the variables:
   - `PORT`: The port the server will run on
   - `DBURL`: Your MongoDB connection string

### Frontend Setup

1. Navigate to the `frontend` directory
2. Copy `.env.example` to `.env`:
   ```
   cp .env.example .env
   ```
3. Edit `.env` and update the variables:
   - `REACT_APP_GEMINI_API_KEY`: Your Google Gemini API key
   - `REACT_APP_BACKEND_URL`: URL to your backend server

## Running the Application

### Backend
```
cd backend
npm install
npm start
```

### Frontend
```
cd frontend
npm install
npm start
```

## Important Notes

- The `.env` files contain sensitive information and are excluded from Git by the `.gitignore` file
- Always use environment variables for sensitive data and configuration
- Do not commit `.env` files to the repository 