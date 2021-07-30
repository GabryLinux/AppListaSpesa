import React, { useEffect, useRef, useState } from 'react'
import firebase from 'firebase'

function PopUpAddLista({ text, popUpRef,findFunc,addLista,setInterruttore,setAlertProp}) {
    const [lista,setLista] = useState([])
    const [quantity,setQuantity] = useState('')
    const [prodotto,setProdotto] = useState("")
    const [market,setMarket] = useState("")
    const marketRef = useRef()
    async function getDB(){
        const db = firebase.firestore()
        return await (await db.collection("Prodotti").get()).docs.map(doc => doc.data())
    }
    
    useEffect(async ()=>{
        
    },[quantity])

    useEffect(()=>{
        setProdotto(text)
    },[text])

    useEffect(()=>{
        if(prodotto !== text){
            console.log("PRDOTTO CHANGED")
            marketRef.current.style.height = "100px"
        }
    },[prodotto])

    useEffect(()=>{
        //popUpRef.current.style.transfrom = 'translateY(-20px)'
       
    })
    return (
        <div className="absolute hidden top-0 left-0 bg-black bg-opacity-50 w-full h-full justify-center items-center z-10 " ref={popUpRef}>
            <div className="flex flex-col w-64 h-auto rounded-md bg-white  transition-all duration-300 divide-y divide-gray-300" >
                <div className="px-5 py-6">
                    <p className="text-xs text-gray-500 ">{prodotto.length>0 ? "Prodotto selezionato :" : "Scrivi il prodotto da aggiungere"}</p>
                    <input type="text" value={prodotto} onChange={(e)=>setProdotto(e.target.value)} className="text-3xl text-gray-700 border-gray-300 border px-1 w-full"/>
                </div>
                <div className="duration-200 h-0 overflow-hidden" ref={marketRef}>
                    <div className="px-5 py-6 ">
                        <p className="text-xs text-gray-500 ">Dove si compra?</p>
                        <input type="text" value={market} onChange={(e)=>setMarket(e.target.value)} className="text-3xl text-gray-700 border-gray-300 border px-1 w-full"/>
                    </div>
                </div>
                <div className="px-5 py-6 ">
                    <p className="text-xs text-gray-500 pb-1">Digita la quantità da comprare:</p>
                    <input type="text" value={quantity} className="text-xl text-gray-700 w-full focus:outline-none border px-2 py-2 border-blue-500 rounded-xl" onChange={(e)=>{setQuantity(e.target.value)}}></input>
                </div>
                <div className="w-full h-full flex items-end justify-between px-4 py-3">
                    <button className="text-white bg-red-500 text-xl p-2 rounded-lg" onClick={()=>{popUpRef.current.style.display = 'none'; marketRef.current.style.height = "0px"}}>Annulla</button>
                    <button className="text-white bg-green-500 text-xl p-2 rounded-lg" onClick={async () => { popUpRef.current.style.display = 'none'; 
                    try
                    {
                        if(market.length > 0){
                            await addLista({
                                Market : market,
                                Item : prodotto,
                                Quantity : quantity
                            })
                        }else{
                            await addLista(await findFunc(prodotto,quantity)) 
                        }
                        setAlertProp("Aggiunto","green")
                    }
                    catch(e){
                        setAlertProp("C'é stato un errore","red")
                    }finally{
                        setInterruttore(true)
                    }
                    }}>Aggiungi</button>
                </div>
            </div>
        </div>
    )
}

export default PopUpAddLista
