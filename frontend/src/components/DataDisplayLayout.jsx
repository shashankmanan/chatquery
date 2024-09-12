import React from 'react'
import TextFieldBox from './TextFieldBox'

export default function DataDisplayLayout({columnNames,data}) {
  return (
    <div>
        {columnNames.map((i) => (
          <TextFieldBox title={i} read={true} data={data}/>
        ))}
      </div>
  )
}
