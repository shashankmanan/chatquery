import React from 'react'
import { useState } from 'react'
import "../styles/Home.css"
import Button from "react-bootstrap/Button"
import AddQuery from '../components/AddQuery'
import DeleteQuery from '../components/DeleteQuery'
import UpdateQuery from '../components/UpdateQuery'
import ReadQuery from '../components/ReadQuery'

export default function Home() {
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
  const [query,setQuery] = useState(<AddQuery columnNames={columns}/>)

  
  const queryButtonClickHandler = (operation) => {
    switch(operation) {
      case "add_data_query" : setQuery(<AddQuery columnNames={columns}/>)
          break
      case "update_data_query" : setQuery(UpdateQuery)
          break
      case "delete_data_query" : setQuery(DeleteQuery)
          break
      case "get_data_query" : setQuery(ReadQuery)
          break
      default: setQuery(AddQuery)
    }
  } 
  
  return (
    <div className='d-flex flex-column align-items-center'>
      <div className='d-flex flex-row align-items-center justify-content-evenly m-1' style={{width:"60vh"}}>
      <Button variant='primary' onClick={() => queryButtonClickHandler("add_data_query") }>Add</Button>
      <Button variant='primary' onClick={() => queryButtonClickHandler("update_data_query") }>Update</Button>
      <Button variant='primary' onClick={() => queryButtonClickHandler("delete_data_query") }>Delete</Button>
      <Button variant='primary' onClick={() => queryButtonClickHandler("get_data_query") }>Get Data</Button>
      </div>
      <div className='box'>
        { query }
      </div>

    </div>
  )
}
