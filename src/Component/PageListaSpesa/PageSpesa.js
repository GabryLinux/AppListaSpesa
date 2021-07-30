import React, { useEffect, useState } from 'react'
import SearchBarSpesa from '../SearchBarSpesa'
import Header from './Header'
import ListaSpesa from './ListaSpesa'
import firebase from 'firebase'

function PageSpesa() {
    const backup = [{name : 'Coca Cola',quantity : '1l',Status: false,id : 'ccca2e39-042a-40ab-8ac6-fe3253587d99'},{name : 'Olio Rovagnati',quantity : '400ml',Status: false,id : '66394150-a548-4f09-b52e-3f913a3ba2e9'},{name : 'Pane Pizza',quantity : '2',Status: false,id: '896c7026-8a88-4e7e-9274-0be74cc3d472'},{name : 'San Carlo',quantity : '500gr',Status: false,id: '07d4fcf4-bb18-4eed-b5b6-50d65ec57bdd'}]
    const [lista,setLista] = useState([])
    
    const deleteElement = (index)=>{
        /*
        var listaCopy = lista
        listaCopy.splice(index,1)
        setLista(listaCopy)
        console.log(listaCopy)
        */
    }
    useEffect(()=>{

    })
    return (
        <div className="w-full h-full " >
           <Header lista={lista} setLista={setLista}  deleteElement={deleteElement}/>
        </div>
    )
}

export default PageSpesa
