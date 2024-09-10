import React from 'react'
import TextFieldBox from './TextFieldBox'
import Button from 'react-bootstrap/esm/Button';
export default function AddQuery({columnNames}) {

  return (
    <div style={{textAlign:"center"}}>
        <h4>Add into Database</h4>
        { 
            columnNames.map( (i) => <TextFieldBox title={i}/> )
        }
        <Button variant="secondary">Add Data</Button>
    </div>
  )
}
