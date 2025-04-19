import React from "react";
import "../styles/Home.css"; 
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { userMessagehandler } from "../API/chatAPI";

export default function Chat() {
    const [chatHistory, setChatHistory] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const enterHandler = async () => {    
        if (userMessage === "" || userMessage.trim() === "")
            return;
            
        // Create a copy of the chat history and add the user message
        const updatedHistory = [
            ...chatHistory,
            {
                "by": "user",
                "message": userMessage
            }
        ];
        
        setChatHistory(updatedHistory);
        setIsLoading(true);
        
        try {
            const response = await userMessagehandler(userMessage);
            
            // Create another copy with the API response
            const finalHistory = [
                ...updatedHistory,
                {
                    "by": "api",
                    "message": response.status === 200 ? response.message : "Something went wrong. Please try again!"
                }
            ];
            
            setChatHistory(finalHistory);
        } catch (error) {
            console.error("Error handling message:", error);
            // Create another copy with the error message
            const finalHistory = [
                ...updatedHistory,
                {
                    "by": "api",
                    "message": "An error occurred. Please try again!"
                }
            ];
            
            setChatHistory(finalHistory);
        } finally {
            setUserMessage("");
            setIsLoading(false);
        }
    };
    
    const handleKeyPress = (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            // Prevent default to avoid form submission
            event.preventDefault();
            enterHandler();
        }
    };
    
    return (
        <div
            className="box m-3 d-flex flex-column align-items-center justify-content-between"
            style={{ height: "90vh", width: "80%" }}
        >
            <h2>ChatQuery</h2>
            <div
                className="border border-dark p-3"
                style={{ height: "100%", width: "100%", overflow: "auto"}}
            >
                {chatHistory.length === 0 ? (
                    <div className="text-center text-muted p-5">
                        <h5>Start a conversation by sending a message</h5>
                        <p>Ask about the database or request specific data</p>
                    </div>
                ) : (
                    chatHistory.map((chat, index) => 
                        chat.by === "user" ? (
                            <div key={index} className="d-flex flex-row align-items-center justify-content-end m-2" style={{width: "100%", textAlign: "center"}}>
                                <div className="bg-primary text-white p-2 rounded" style={{maxWidth: "70%"}}>
                                    <p className="m-0">{chat.message}</p>
                                </div>
                                <div className="border border-dark rounded-circle d-flex align-items-center justify-content-center ms-2" 
                                     style={{width: "40px", height: "40px", backgroundColor: "#e9ecef"}}>
                                    <span>You</span>
                                </div>
                            </div>
                        ) : (
                            <div key={index} className="d-flex flex-row align-items-center m-2" style={{width: "100%"}}>
                                <div className="border border-dark rounded-circle d-flex align-items-center justify-content-center me-2" 
                                     style={{width: "40px", height: "40px", backgroundColor: "#f8f9fa"}}>
                                    <span>AI</span>
                                </div>
                                <div className="bg-light p-2 rounded" style={{maxWidth: "70%"}}>
                                    <p className="m-0">{chat.message}</p>
                                </div>
                            </div>
                        )
                    )
                )}
                {isLoading && (
                    <div className="d-flex flex-row align-items-center m-2">
                        <div className="border border-dark rounded-circle d-flex align-items-center justify-content-center me-2" 
                             style={{width: "40px", height: "40px", backgroundColor: "#f8f9fa"}}>
                            <span>AI</span>
                        </div>
                        <div className="bg-light p-2 rounded">
                            <p className="m-0">Thinking...</p>
                        </div>
                    </div>
                )}
            </div>
            <div
                className="d-flex flex-row align-items-center"
                style={{ width: "100%", height: "20%" }}
            >
                <Form.Control
                    as="textarea"
                    style={{
                        width: "95%",
                        height: "90%",
                        margin: "2px",
                        fontSize: "20px",
                    }}
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message here..."
                    disabled={isLoading}
                />
                <div className="d-flex align-items-center">
                    <Button 
                        className="m-3" 
                        size="lg" 
                        onClick={enterHandler}
                        disabled={isLoading || userMessage.trim() === ""}
                    >
                        {isLoading ? "Sending..." : "Send"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
