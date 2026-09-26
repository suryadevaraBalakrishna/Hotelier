import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import HotelSearch from '../components/HomeComponent/HotelSearch'
import About from '../components/HomeComponent/About'
import Team from '../components/HomeComponent/Team'

export default function page() {
  return (
    <>
    <Breadcrumb title="About Us"/>
    <HotelSearch/>
    <About/>
   <Team/>
    </>
  )
}
