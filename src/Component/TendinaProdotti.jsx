import React,{useEffect,useState} from 'react'
import TendinaLista from './TendinaLista.jsx'



function TendinaProdotti({listaItem}) {

    
    useEffect(()=>{
        console.log(listaItem)
    })
    return (
        <div className="w-full h-auto ">
            <h1 className="w-full h-10 py-1 text-gray-400 text-3xl">{listaItem.Market}</h1>
            <div className="pl-4  flex flex-row flex-wrap">
                {
                    listaItem.Categorie.map(x=>{
                        return (
                            <TendinaLista lista={x}/>
                        )
                    })
                }
            </div>    
        </div>
    )
}

export default TendinaProdotti
