import React from 'react'
import { useState } from 'react'
import "../styles/Home.css"
import Button from "react-bootstrap/Button"
import AddQuery from '../components/AddQuery'
import DeleteQuery from '../components/DeleteQuery'
import UpdateQuery from '../components/UpdateQuery'
import ReadQuery from '../components/ReadQuery'
import NavBar from '../components/NavBar'

export default function ManualHome() {
  const [columns,setColumns] = useState([
    'id',
    'make',
    'model',
    'year',
    'price',
    'fuel_type',
    'transmission',
    'mileage'
])
  const [query,setQuery] = useState(<ReadQuery columnNames={columns}/>)

  
  const queryButtonClickHandler = (operation) => {
    switch(operation) {
      case "add_data_query" : setQuery(<AddQuery columnNames={columns}/>)
          break
      case "update_data_query" : setQuery(<UpdateQuery columnNames={columns}/>)
          break
      case "delete_data_query" : setQuery(<DeleteQuery columnNames={columns}/>)
          break
      case "get_data_query" : setQuery(<ReadQuery columnNames={columns}/>)
          break
      default: setQuery(AddQuery)
    }
  } 
  
  return (
    <>

    <div className='d-flex flex-column align-items-center'>
      <div className='d-flex flex-row align-items-center justify-content-evenly m-1' style={{width:"60vh"}}>
      <Button variant='primary' onClick={() => queryButtonClickHandler("get_data_query") }>Get Data</Button>
      <Button variant='primary' onClick={() => queryButtonClickHandler("add_data_query") }>Add</Button>
      <Button variant='primary' onClick={() => queryButtonClickHandler("update_data_query") }>Update</Button>
      <Button variant='primary' onClick={() => queryButtonClickHandler("delete_data_query") }>Delete</Button>
      </div>
      <div className='box' style={{backgroundColor:"white"}}>
        { query }
      </div>
    </div>
    </>
  )
}
