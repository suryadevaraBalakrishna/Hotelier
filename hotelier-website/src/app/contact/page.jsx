import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import HotelSearch from '../components/HomeComponent/HotelSearch'
import Contact from '../components/ContactComponents/Contact'

export default function page() {
  return (
   <>
   <Breadcrumb title="contact"/>
   <HotelSearch/>
   <Contact/>
   </>
  )
}
