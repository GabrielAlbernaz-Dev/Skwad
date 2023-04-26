import React from 'react'

const Input = ({type,...props}) => {
  return (
    <input type={type ? type : 'text'} {...props} />
  )
}

export default Input