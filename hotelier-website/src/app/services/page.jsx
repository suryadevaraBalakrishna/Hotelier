import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import HotelSearch from '../components/HomeComponent/HotelSearch'
import Service from '../components/HomeComponent/Service'

export default function page() {
  return (
   <>
   <Breadcrumb title="Services"/>
   <HotelSearch/>
   <Service/>
   </>
  )
}
