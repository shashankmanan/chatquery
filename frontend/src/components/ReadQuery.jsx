import React from "react";
import Form from "react-bootstrap/Form";
import TextFieldBox from "./TextFieldBox";
import { useState } from "react";
import Button from "react-bootstrap/Button";

export default function ReadQuery({ columnNames }) {
  const [searchValue, setSearchValue] = useState("id");
  return (
    <div
      className="d-flex flex-column justify-content-evenly"
      style={{ textAlign: "center", width: "100%", height: "100%" }}
    >
      <h4>Get Data</h4>
      <div>
        
        <div className="d-flex mb-3 flex-row justify-content-evenly align-items-center">
          <h6>Search By:</h6>
          <Form.Select style={{ width: "80%" }} onChange={ (e) => setSearchValue(e.target.value)}>
            { 
              columnNames.map(  
                 (i) => <option>{i}</option>
              )
            }
          </Form.Select>
        </div>
        <div className="container">
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">{searchValue}</label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                placeholder={`Enter ${searchValue}`}
              />
            </div>
            <div className="col-sm-2">
              <Button className="w-100">Search</Button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h6>Found Field: </h6>
      <div>
        {columnNames.map((i) => (
          <TextFieldBox title={i} read={true}/>
        ))}
      </div>
    </div>
  );
}