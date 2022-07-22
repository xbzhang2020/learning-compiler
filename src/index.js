import React from 'react'
import { createRoot } from 'react-dom/client'

function HelloMessage({ name }) {
  return <div>{name}</div>
}

const root = createRoot(document.getElementById('root'))
root.render(<HelloMessage name="zxb" />)
