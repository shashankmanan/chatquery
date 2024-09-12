import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import DataDisplayLayout from "./DataDisplayLayout";
import axios from "axios"
import { routes_urls } from "../API/routes";
import { getCarData, deleteData } from "../API/carApi";
import Alert from "react-bootstrap/Alert"

export default function DeleteQuery({ columnNames }) {

  const [searchField, setSearchField] = useState("id");
  const [searchValue,setSearchValue] = useState("");
  const [data,setData] = useState([])
  const [selectedData,setSelectedData] = useState(0)
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(
    () => {
    getData()

  } , []
)
  const getData = async () => {
    const baseURL = routes_urls['GET_ALL_DATA_CAR']  //"http://localhost:5000/cars/"
    
    
    try{ 
      const req = await axios.get(baseURL)

      if(req.status != 200) {
          console.log(500 + "SERVER_ERROR")
          return
      }
      setData(req.data)

    } catch(error) {
      console.log(404  +  " server not found...")
    }
  }
  
  const searchHandler = async () => {
    console.log(searchValue)
    const resp = await getCarData({"field":searchField , "value" : searchValue})
    console.log(resp)
    setData(resp.data)
}
  const deleteHandler = async () => {
    console.log(data[selectedData])
    const {_id} = data[selectedData]
    const resp = await deleteData(_id)
    if(resp == 200) {
      setShowSuccess(true)
    
    } else
      setShowAlert(true)
  }
  return (
    <div
      className="d-flex flex-column justify-content-evenly"
      style={{ textAlign: "center", width: "100%", height: "100%" }}
    >
      <h4>Delete Data</h4>
      {
            showAlert ?
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Unable to delete!</Alert.Heading>
      </Alert> : <></>
        }
        {   
            showSuccess ?
            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
            <Alert.Heading>Succesfully Added!</Alert.Heading>
      </Alert> : <></>
        }
      <div>
        
        <div className="d-flex mb-3 flex-row justify-content-evenly align-items-center">
          <h6>Search By:</h6>
          <Form.Select style={{ width: "80%" }} onChange={ (e) => setSearchField(e.target.value)}>
            { 
              columnNames.map(  
                 (i) => <option>{i}</option>
              )
            }
          </Form.Select>
        </div>
        <div className="container">
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">{searchField}</label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                placeholder={`Enter ${searchField}`}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <div className="col-sm-2">
              <Button className="w-100" onClick={searchHandler}>Search</Button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h6>Found Fields: {data.length}</h6>
      <DataDisplayLayout columnNames={columnNames} data = {data[selectedData]}/>
      <div>
        <Button onClick={deleteHandler}>Delete</Button>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-center">
      <button style= {{border:"none",backgroundColor:"white"}} className="p-4" onClick={ () => selectedData == 0 ? setSelectedData(0) : setSelectedData(selectedData - 1) } ><h2>{ "<" }</h2></button>
      <h3 className="p-4 border"> {selectedData + 1}</h3>
      <button style= {{border:"none",backgroundColor:"white"}} className="p-4" onClick={ () => selectedData == data.length - 1? setSelectedData(data.length - 1) : setSelectedData(selectedData + 1) }><h2>{ ">" }</h2></button>
    </div>
    
    </div>
  );
}