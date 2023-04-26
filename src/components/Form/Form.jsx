import React from 'react'

const Form = ({children,...props}) => {
  return (
    <form {...props} onSubmit={(e) => e.preventDefault()}>
        {children}
    </form>
  )
}

export default Form