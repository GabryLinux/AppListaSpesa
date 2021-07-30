import React, { useEffect, useRef } from 'react'

function AlertMessage({text="Aggiunto",color="green",interruttore,setInterruttore}) {
    const elRef = useRef()
    let timeout
    useEffect(()=>{
        if(interruttore){
            if(elRef.current)
                elRef.current.style.visibility = "visible"
            timeout = setTimeout(()=>{
                if(elRef.current)
                    elRef.current.style.visibility = "hidden"
                setInterruttore(false)
                clearTimeout(timeout)
            },1500)
        }
    },[interruttore])
    return (
        <div className={`absolute w-full bottom-1/3 bg-${color}-300 ${interruttore ? 'opacity-100' : "opacity-0"} flex justify-center duration-250 overflow-hidden invisible`} ref={elRef}>
            <div className="py-6 px-3">
                <p className={`text-${color}-800 text-3xl`}>{text}</p>
            </div>
        </div>
    )
}

export default AlertMessage
