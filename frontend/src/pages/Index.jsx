import React from 'react'
import "../styles/Home.css"
import Button from 'react-bootstrap/esm/Button'
import Alert from "react-bootstrap/Alert"
import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div className='box mt-4 d-flex flex-column align-items-center justify-content-evenly' >
      <h2>Welcome To ChatQuery!</h2>
      <div className='d-flex flex-column align-items-center'>
          <h4>Connect Database</h4>
          <Button className="m-3">Connect</Button>
          <Alert variant={"success"}>Connected!</Alert>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-evenly border border-dark" style={{width:"100%",height:"100%",textAlign:"center"}} >
        <div className = "" style={{}}>
           <h3 className = "m-2">Chat with Database</h3>
           <Link to="/chat"><Button>Chat</Button></Link>
        </div>
        
        <div className = "d-flex flex-column justify-content-center align-items-center" style={{borderLeft:"1px black solid",width:"40%",height:"100%"}}>
          <h3 className = "m-2">Try manually</h3>
          <Link to="/manual"><Button>Manual</Button></Link>
        </div>
      </div>
    </div>
  )
}
