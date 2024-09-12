import React from 'react'

export default function TextFieldBox({title,read,data,changeHandlerFunction,input}) {
  
  const thisValue = data ? (title === "id" ? data["_id"] : data[title] || "error"): "error";
  

  return (
    <div class="mb-3 row">
            <label  class="col-sm-2 col-form-label">{title}</label>
            <div class="col-sm-9">
              {
                read? 
                <input type="text" readOnly class="form-control"  value={thisValue}/>    
                :
                <input type="text" class="form-control" placeholder={`Enter ${title}`} id={title}  onChange={(e) => {changeHandlerFunction(e)}}/>
              }
            
            </div>
        </div>
  )
}
