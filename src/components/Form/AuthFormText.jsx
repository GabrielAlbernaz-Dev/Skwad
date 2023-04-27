import React from 'react'

const AuthFormText = ({title,subtitle,containerStyle,titleStyle,subtitleStyle}) => {
  return (
    <div className={containerStyle}>
        <h2 className={titleStyle}>{title}</h2>
        <h4 className={subtitleStyle}>{subtitle}</h4>
    </div>
  )
}

export default AuthFormText