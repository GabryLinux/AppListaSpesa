import React, { useEffect, useRef } from 'react'

function AlertMessage({text="Aggiunto",color="green",interruttore,setInterruttore}) {
    const elRef = useRef()
    let timeout
    useEffect(()=>{
        if(interruttore){
            if(elRef.current)
                elRef.current.style.opacity = "1.0"
                
            timeout = setTimeout(()=>{
                if(elRef.current)
                    elRef.current.style.opacity = "0.0";
                setInterruttore(false)
                clearTimeout(timeout)
            },1500)
        }
    },[interruttore])
    return (
        <div className={`absolute w-full bottom-0 bg-green-300  flex justify-center duration-250 overflow-hidden opacity-0`} ref={elRef}>
            <div className="py-6 px-3">
                <p className={`text-green-800 text-3xl`}>{text}</p>
            </div>
        </div>
    )
}

export default AlertMessage
