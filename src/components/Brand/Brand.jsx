import React from 'react'
import { NavLink } from 'react-router-dom'
import brand from '../../assets/brand.png'
import brandMobile from '../../assets/brand-mobile.png'
import MediaQuery from 'react-responsive'

const Brand = () => {
  return (
    <NavLink to="/">
      <MediaQuery maxWidth={767}>
        <img src={brandMobile} alt="brand-skwad" />
      </MediaQuery>
      <MediaQuery minWidth={768}>
        <img src={brand} alt="brand-skwad" />
      </MediaQuery>
    </NavLink>
  )
}

export default Brand