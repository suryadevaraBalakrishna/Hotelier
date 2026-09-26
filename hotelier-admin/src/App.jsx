import { useState } from 'react'
import Header from './components/common/Header'
import { Routes, Route } from 'react-router-dom'
import MenuSetting from './components/pages/menu-setting/MenuSetting'
import WebsiteSetting from './components/pages/website-setting/WebsiteSetting'
import Footer from './components/common/Footer'
import EditSetting from './components/pages/menu-setting/EditSetting'
import Dashboard from './components/pages/Dashboard'
import NewsletterSetting from './components/pages/newsletter-setting/NewsletterSetting'
import { ToastContainer } from 'react-toastify'
import AddSlider from './components/pages/slider-setting/AddSlider'
import EditSlider from './components/pages/slider-setting/EditSlider'
import About from './components/pages/about-setting/About'
import AddTeam from './components/pages/team-setting/AddTeam'
import EditTeam from './components/pages/team-setting/EditTeam'
import AddService from './components/pages/service-setting/AddService'
import EditService from './components/pages/service-setting/EditService'
import Login from './components/pages/Login'
import ForgotPassword from './components/pages/ForgotPassword'
import ResetPassword from './components/pages/ResetPassword'
import Account from './components/pages/account/Account'
import ProtectedRoute from './components/common/ProtectedRoute'
import Hotel from './components/pages/hotel/Hotel'
import AddHotel from './components/pages/hotel/AddHotel'
import EditHotel from './components/pages/hotel/EditHotel'
import AddRoom from './components/pages/room/AddRoom'
import EditRoom from './components/pages/room/EditRoom'
import Order from './components/pages/orders/Order'
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/menu-setting' element={<MenuSetting />} />
          <Route path='/website-setting' element={<WebsiteSetting />} />
          <Route path='/menu-setting/edit/:id' element={<EditSetting />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/newsletter-setting' element={<NewsletterSetting />} />
          <Route path='/add-slider' element={<AddSlider />} />
          <Route path='/slider/edit/:id' element={<EditSlider />} />
          <Route path='/about' element={<About />} />
          <Route path='add-team' element={<AddTeam />} />
          <Route path='/team/edit/:id' element={<EditTeam />} />
          <Route path='add-service' element={<AddService />} />
          <Route path='/service/edit/:id' element={<EditService />} />
          <Route path='/accounts' element={<Account />} />
          <Route path='/hotel' element={<Hotel />} />
          <Route path='/add-hotel' element={<AddHotel />} />
          <Route path='/edit-hotel/:id' element={<EditHotel />} />
          <Route path='/add-room' element={<AddRoom />} />
          <Route path='/edit-room/:id' element={<EditRoom />} />
          <Route path='/orders' element={<Order />} />
        </Route>

      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
