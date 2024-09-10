import React from 'react'

export default function TextFieldBox({title}) {
  return (
    <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">{title}</label>
            <div class="col-sm-9">
            <input type="text" class="form-control" id="inputPassword" placeholder={`Enter ${title}`}/>
            </div>
        </div>
  )
}
