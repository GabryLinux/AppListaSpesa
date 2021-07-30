import React, { useEffect, useState } from 'react'
import { subscribe } from 'on-screen-keyboard-detector'
import ListItem from './ListItem'
import firebase from 'firebase'

function SearchBarSpesa({ options, setOptions, text, setText,titleCase}) {
    
    
    
    return (
        <div>
            <input type="text" value={text} placeholder="Riempi qui la lista della spesa" onChange={(e)=>{setText(titleCase(e.target.value))}} className="w-full  px-5 py-4 text-lg text-gray-700 focus:outline-none "/>
        </div>
    )
}

export default SearchBarSpesa
