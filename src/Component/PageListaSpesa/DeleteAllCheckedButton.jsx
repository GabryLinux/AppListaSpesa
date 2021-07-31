import React from 'react'
import BasketSVG from './BasketSVG.jsx'
import './shadow.css'

function DeleteAllCheckedButton({deleteFunc}) {
    return (
        <button className="absolute right-6 bottom-14 w-12 h-12 rounded-full new-shadow flex justify-center items-center z-20 bg-white" onClick={deleteFunc}>
            <BasketSVG/>
        </button>
    )
}

export default DeleteAllCheckedButton
