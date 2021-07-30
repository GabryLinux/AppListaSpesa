import React, { useEffect, useRef, useState } from 'react'
import './style.css'

function CheckBox({Status,index}) {
    const checkRef = useRef()
    useEffect(()=>{
        console.log("IN CHECKBOX : ",checkRef.current.checked,' NUM : ',index)
        if(!Status)  
            checkRef.current.checked = true 
        else
            checkRef.current.checked = false
    },[Status])
    return (
            <div className={`round z-20`}>
                <input type="checkbox" id={`checkbox${index}`} ref={checkRef} />
                <label for={`checkbox${index}`}></label>
            </div>
    )
}

export default CheckBox
