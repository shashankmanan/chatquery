import axios from 'axios';
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Use environment variables for API key and backend URL
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// Initialize Google AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const userMessagehandler = async (userMessage) => {
    try {
        console.log(userMessage);
        
        // Process the message with Gemini to classify the query
        const prompt = `Convert the below question into an appropriate database operation and return only the word from the following list. If the question is not related return ERROR_NOT_RELATED:
         list = (GET_ONE_DATA, GET_ALL_DATA, DELETE_DATA)
         question = ${userMessage}
         give only one word as response
        `;

        const geminiResult = await model.generateContent(prompt);
        const operation = geminiResult.response.text();
        console.log("Classified as:", operation);
        
        // Generate a more detailed response based on the operation
        let detailedResponse;
        
        switch(operation.trim()) {
            case "GET_ALL_DATA":
                detailedResponse = "I'll retrieve all records from the database for you.";
                break;
            case "GET_ONE_DATA":
                detailedResponse = "I'll find the specific record you're looking for.";
                break;
            case "DELETE_DATA":
                detailedResponse = "I'll help you delete the specified record.";
                break;
            case "ERROR_NOT_RELATED":
                detailedResponse = "I'm not sure how to handle this query in relation to the database.";
                break;
            default:
                detailedResponse = "I'm processing your request.";
        }
        
        // Return the classification and a helpful message
        return {
            status: 200,
            message: `${detailedResponse} (Operation: ${operation})`
        };
    } catch (error) {
        console.error("Error processing message:", error);
        return {
            status: 500,
            message: "An error occurred processing your message. Please try again."
        };
    }
}