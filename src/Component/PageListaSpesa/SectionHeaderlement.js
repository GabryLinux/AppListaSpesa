import React, { useEffect, useState } from 'react'
import DeleteAllCheckedButton from './DeleteAllCheckedButton'
import ListaSpesa from './ListaSpesa'

function SectionHeaderlement({ section, activeOption, onClick, lista, deleteElement, dbLista, deleteFunc}) {
    const [listat,setLista] = useState("")
    useEffect(()=>{
        console.log(activeOption)
    },[])
    
    return (
        <div className="w-full h-full flex flex-col">
        <button className={`text-sm w-auto rounded-2xl border-blue-500 border px-2 py-1 ${section === activeOption && 'bg-blue-500 text-white'}`}onClick={()=>onClick()}>
            {section}
        </button>
            {section === activeOption &&
                <div className="h-full w-full flex flex-col">
                <ListaSpesa dbLista={dbLista} Market={section} listas={lista} setLista={setLista} deleteElement={deleteElement} />
                </div>
            }
            <DeleteAllCheckedButton deleteFunc={async ()=>{await deleteFunc(section)}}/>
        </div>
    )
}

export default SectionHeaderlement
