import React from 'react'
import TendinaProdotti from './TendinaProdotti'

function ListaProdotti({lista}) {
    console.log(lista)
    return (
        <div className="w-full h-full">
            {
                lista.map(x=>{
                    return <TendinaProdotti listaItem={x}/>
                })
            }
        </div>
    )
}

export default ListaProdotti
