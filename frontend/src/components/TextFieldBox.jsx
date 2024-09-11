import React from 'react'

export default function TextFieldBox({title,read}) {
  return (
    <div class="mb-3 row">
            <label  class="col-sm-2 col-form-label">{title}</label>
            <div class="col-sm-9">
              {
                read? 
                <input type="text" readOnly class="form-control"  placeholder={`Enter ${title}`}/>    
                :
                <input type="text" class="form-control"  placeholder={`Enter ${title}`}/>
              }
            
            </div>
        </div>
  )
}
