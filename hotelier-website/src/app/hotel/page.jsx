import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import HotelList from '../components/common/HotelList'


export default function page() {
  return (
    <>
    <Breadcrumb title="Hotel" />
    <HotelList />
    </>
  )
}
