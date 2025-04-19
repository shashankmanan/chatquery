import React from "react";
import Form from "react-bootstrap/Form";
import TextFieldBox from "./TextFieldBox";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

export default function UpdateQuery({ columnNames }) {
  const [searchValue, setSearchValue] = useState("_id");
  const [searchTerm, setSearchTerm] = useState("");
  const [foundCar, setFoundCar] = useState(null);
  const [updateData, setUpdateData] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5000";

  const searchCar = async () => {
    if (!searchTerm) {
      setMessage({ text: "Please enter a search term", type: "warning" });
      return;
    }

    setLoading(true);
    try {
      // Create a query object with the search field and value
      const query = { [searchValue]: searchTerm };
      
      // Make API call to search for the car
      const response = await axios.get(`${API_URL}/cars/check`, { params: query });
      
      if (response.data && response.data.length > 0) {
        setFoundCar(response.data[0]);
        // Initialize update data with the found car data
        setUpdateData({ ...response.data[0] });
        setMessage({ text: "Car found successfully", type: "success" });
      } else {
        setFoundCar(null);
        setUpdateData({});
        setMessage({ text: "No car found with the provided criteria", type: "danger" });
      }
    } catch (error) {
      console.error("Error searching for car:", error);
      setMessage({ text: "Error searching for car", type: "danger" });
      setFoundCar(null);
      setUpdateData({});
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setUpdateData({
      ...updateData,
      [field]: value
    });
  };

  const updateCar = async () => {
    if (!foundCar || !foundCar._id) {
      setMessage({ text: "No car selected for update", type: "warning" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/cars/update/${foundCar._id}`, updateData);
      
      if (response.status === 200) {
        setMessage({ text: "Car updated successfully", type: "success" });
        // Reset form after successful update
        setTimeout(() => {
          setFoundCar(null);
          setUpdateData({});
          setSearchTerm("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating car:", error);
      setMessage({ 
        text: error.response?.data?.message || "Error updating car", 
        type: "danger" 
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFoundCar(null);
    setUpdateData({});
    setSearchTerm("");
    setMessage({ text: "", type: "" });
  };

  return (
    <div
      className="d-flex flex-column justify-content-evenly"
      style={{ textAlign: "center", width: "100%", height: "100%" }}
    >
      <h4>Update Datafield</h4>
      
      {message.text && (
        <Alert variant={message.type} onClose={() => setMessage({ text: "", type: "" })} dismissible>
          {message.text}
        </Alert>
      )}
      
      <div>
        <div className="d-flex mb-3 flex-row justify-content-evenly align-items-center">
          <h6>Search By:</h6>
          <Form.Select 
            style={{ width: "80%" }} 
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          >
            {columnNames.map((column, index) => (
              <option key={index} value={column}>{column}</option>
            ))}
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="col-sm-2">
              <Button 
                className="w-100" 
                onClick={searchCar} 
                disabled={loading || !searchTerm}
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {foundCar && (
        <>
          <hr />
          <h6>Found Car: </h6>
          <div>
            {columnNames.map((column, index) => (
              <TextFieldBox 
                key={index} 
                title={column} 
                value={updateData[column] || ""}
                onChange={(value) => handleInputChange(column, value)}
              />
            ))}
            <div className="d-flex justify-content-center mt-3">
              <Button 
                variant="success" 
                className="mx-2" 
                onClick={updateCar}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </Button>
              <Button 
                variant="secondary" 
                className="mx-2" 
                onClick={resetForm}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}