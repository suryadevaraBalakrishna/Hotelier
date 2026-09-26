"use client";
import React from 'react'
import { Provider } from 'react-redux'
import { myStore } from './store/store'

export default function Mainlayout({children}) {
  return (
    <Provider store={myStore}>
        {children}
    </Provider>
  )
}