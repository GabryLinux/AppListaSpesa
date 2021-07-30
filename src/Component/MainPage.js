import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Navbar from './Navbar'

function MainPage({children}) {
    return (
        <div className="w-full h-full flex flex-col justify-between">
            {children}
            <Navbar/>
        </div>
    )
}

export default MainPage
