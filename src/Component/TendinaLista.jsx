import React,{useState} from 'react'
import ArrowSVG from './ArrowSVG'
import TendinaItem from './TendinaItem'

function TendinaLista({lista}) {
    const [isActive,setActive] = useState(false)
    console.log(lista)
    return (
        <div className="w-40 h-full text-gray-500 text-2xl overflow-hidden">
            <div className="h-full flex items-center  ">
                <div className="justify-center items-center flex flex-col h-full relative  ">
                    <div className=" h-1/2 bg-gray-700  absolute top-1/2" style={{width : '1px'}}/>
                    <div className="w-2 h-2 bg-blue-500 z-10 " style={{borderRadius : '50%'}}/>
                </div>
                <button className="flex h-full flex-row items-center px-3" onClick={()=>{setActive(!isActive)}}>
                    <p>{lista.Nome}</p>
                    <ArrowSVG isActive={isActive}/>
                </button>
            </div>
                                
            <div className={`${isActive ? 'max-h-full' : 'max-h-0'} h-full`} style={{marginLeft : '3.5px'}}>
                {
                     lista.Prodotti.map((y,index)=>{
                     return <TendinaItem Item={y.Item} isLast={index == lista.Prodotti.length -1}/>
                })
            }
            </div>
        </div>
    )
}

export default TendinaLista
