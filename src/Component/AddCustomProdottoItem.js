import React from 'react'
import './PageListaSpesa/shadow.css'

function AddCustomProdottoItem({click}) {
    return (
        <button className="w-full h-12 flex flex-row justify-between items-center px-2 " onClick={()=>click()}>
            <p className="text-gray-700 p-2 new-shadow">Clicca qui per aggiungere un alimento non presente in database</p>
        </button>
    )
}

export default AddCustomProdottoItem
