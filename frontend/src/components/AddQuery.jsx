import React, { useState } from 'react'
import TextFieldBox from './TextFieldBox'
import Button from 'react-bootstrap/esm/Button';
import Alert from "react-bootstrap/Alert"
import axios from "axios"

export default function AddQuery({columnNames}) {
  const [input,setInput] = useState({
    "make" : "" ,
    "model" : "" , 
    "year" : "" ,
    "price" : "" ,
    "fuel_type" : "" ,
    "transmission" : "" ,
     "mileage" : 0
  })
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertErrorMessage,setAlertErrorMessage] = useState("")

  const addAPICall = async () => {
    const baseURL = "http://localhost:5000/cars/add"
    try{
      const response = await axios.post(baseURL,input).then()

      if(response.status == 201)
          return 201
    } catch(error) {
        return error.status     
    }
    
    return 500
  }

  const addHandler = async () => {
    for(let i of columnNames) {
        if(i === "id") {}
        else {
          if(input[i] === "" || input[i] == null) {
            setAlertErrorMessage(`Please Enter \"${i}\" field`)
            setShowAlert(true)
            return;
          }
        }
    }
    const call = await addAPICall()
    if(call == 201){
      successCall()
      return;
    } else{
    setAlertErrorMessage("Something went wrong")
    setShowAlert(true)
    }
  }

  const successCall = () => {
    setShowAlert(false)
    setShowSuccess(true)
    setTimeout(
        () => setShowSuccess(false) , 3000
    )
  }

  const updateChange = (e) => {
    input[e.target.id] = e.target.value
    console.log(input)
    setInput(input)
  }
  return (
    <div style={{textAlign:"center"}}>
        <h4>Add into Database</h4>
        {
            showAlert ?
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>{alertErrorMessage}</Alert.Heading>
      </Alert> : <></>
        }
        {   
            showSuccess ?
            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
            <Alert.Heading>Succesfully Added!</Alert.Heading>
      </Alert> : <></>
        }
        { 
            columnNames.map( (i) => i != "id" ? <TextFieldBox title={i} input = {input} changeHandlerFunction = {updateChange} /> : <></> )
        }
        <Button variant="primary" onClick={addHandler} >Add Data</Button>
    </div>
  )
}
