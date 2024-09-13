import React from "react";
import "../styles/Home.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";

export default function Chat() {
    const [chatHistory, setChatHistory] = useState([]);
    const [userMessage,setUserMessage] = useState("")
    const enterHandler = () => {    
        if(userMessage === "" ||userMessage === "  ")
            return
        chatHistory.push({
            "by" : "user" ,
            "message" : userMessage
        })
        setChatHistory(chatHistory)
        setUserMessage("")
    }
    const handleKeyPress = (event) => {
        console.log("enter")
        if (event.keyCode === 13 || event.which === 13) {
          enterHandler()
        }
      }
    return (
        <div
            className="box m-3 d-flex flex-column align-items-center justify-content-between"
            style={{ height: "90vh", width: "80%" }}
        >
            <h2>ChatQuery</h2>
            <div
                className="border border-dark p-3"
                style={{ height: "100%", width: "100%", overflow:"scroll"}}
            >
                {
                    chatHistory.map(
                        (chat) => 
                            chat.by === "user"?
                                <div className="d-flex flex-row align-items-center justify-content-end m-2" style={{width:"100%" , textAlign:"center"}}>
                                    <h6 className="m-2">{chat.message}</h6>
                                    <div className="border border-dark rounded-circle" style={{width:"40px",height:"40px"}}>You</div>
                                </div> : 
                                <p>{chat.message}</p>   
                    )
                }
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
                        fontSize: "30px",
                    }}
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <div className="d-flex align-items-center">
                    <Button className="m-3" size="lg" onClick={enterHandler} >
                        Enter
                    </Button>
                </div>
            </div>
        </div>
    );
}
