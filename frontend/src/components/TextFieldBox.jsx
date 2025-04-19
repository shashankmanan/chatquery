import React from 'react'

export default function TextFieldBox({
  title,
  read = false,
  data,
  changeHandlerFunction,
  value,
  onChange,
  input
}) {
  // For backward compatibility with existing usage
  const thisValue = data 
    ? (title === "id" ? data["_id"] : data[title] || "") 
    : value !== undefined ? value : "";
  
  const handleChange = (e) => {
    if (onChange) {
      // Use the new onChange prop if provided
      onChange(e.target.value);
    } else if (changeHandlerFunction) {
      // Fallback to the old changeHandlerFunction for backward compatibility
      changeHandlerFunction(e);
    }
  };

  return (
    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label">{title}</label>
      <div className="col-sm-9">
        {read ? (
          <input 
            type="text" 
            readOnly 
            className="form-control"  
            value={thisValue}
          />    
        ) : (
          <input 
            type="text" 
            className="form-control" 
            placeholder={`Enter ${title}`} 
            id={title}
            value={thisValue}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  )
}
