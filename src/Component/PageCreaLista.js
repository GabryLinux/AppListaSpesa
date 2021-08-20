import React, { useEffect, useRef, useState } from 'react'
import ListItem from './ListItem'
import PopUpAddLista from './PopUpAddLista'
import SearchBarSpesa from './SearchBarSpesa'
import firebase from 'firebase'
import { v4 as uuidv4 } from 'uuid';
import AlertMessage from './AlertMessage'
import AddCustomProdottoItem from './AddCustomProdottoItem'

function PageCreaLista() {
    const [text, setText] = useState('')
    const [options, setOptions] = useState([])
    const [currentOption,setCurrent] = useState(' ‎‎')
    const [interruttore,setInterruttore] = useState(false)
    const [isScrolling,setScrolling] = useState(false)
    var timerFunc
    const popUpRef = useRef()
    const db = firebase.firestore()
    var textAlert;
    var color;
    async function getDB(){
        return await (await db.collection("Prodotti").get()).docs.map(doc => doc.data())
    }
    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }
    function flatten(arr) {
        return arr.reduce(function (flat, toFlatten) {
          return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
        }, []);
      }
    async function addLista(obj){
        var getAcquisti = await (await db.collection("Acquisti").doc(obj.Market).get()).data()
        if(!getAcquisti){
            getAcquisti = []
        }else{
            getAcquisti = getAcquisti.Prodotti
        }
        const newObj = {
            Item : obj.Item,
            Quantity : obj.Quantity,
            Status : false,
            uuid: uuidv4(),
            Data : ""
        }
        
        console.log(newObj)
        getAcquisti.push({...newObj,id : getAcquisti.length})
                
        await db.collection("Acquisti").doc(obj.Market).set({
            Prodotti : [...getAcquisti]
        })
        
        
    }
    var array = []
    useEffect(async ()=>{
        const data = await getDB()
       
        array.push([...data.map(x=>{
            return x.Categorie.map(y=>{
                return y.Prodotti.map(z=>{
                    return titleCase(z.Item)
                })
            })
        })])
        console.log(array)
        setOptions([...flatten(array)])
    },[])
    useEffect(()=>{
        console.log(currentOption)
    },[currentOption])
    async function findFunc(text,quantity){
        array = []
        const data = await getDB()
       
        array.push([...data.map(x=>{
            return {
                Market : x.Market,
                Prodotti : [...flatten(x.Categorie.map(y=>{
                    return y.Prodotti.map(z=>{
                        return titleCase(z.Item)
                    })
                }))]
            }
        })])
        console.log(quantity)
        var obj = {
            Market : "",
            Item : text,
            Quantity : quantity
        }
        var returnValue
        console.log(array[0])
        array[0].every((x,index)=>{
            console.log(x)
            obj.Market = x.Market
            returnValue = x.Prodotti.every(y=>{
                
                if(y == obj.Item){
                    console.log(y)
                    return false
                }
                return true
            })
            if(index == x.length || !returnValue){
                return false
            }
            return true
        })
        
        return obj
    }

    async function Click(stringa){
        try
        {
            await addLista(await findFunc(stringa,""))
            textAlert = "Aggiunto"
            color = "green"
        }
        catch(e){
            textAlert = "C'é stato un errore"
            color = 'red'
        }
    }

    function setAlertProps(textP,colorP){
        textAlert = textP
        color = colorP
    }

    useEffect(()=>{
        if(currentOption != '')
        popUpRef.current.style.display = 'flex'
    },[currentOption])
    return (
        <div className="w-full h-full relative">
        <div className="w-full h-full py-4 px-2 ">
            <div className="shadow-md  rounded border border-gray-400 divide-y divide-black ">
            <SearchBarSpesa options={options} setOptions={setOptions} text={text} setText={setText} titleCase={titleCase}/>
            {options.length > 0 &&
                <div className="max-h-full h-96 pt-5 px-2 overflow-scroll" onScroll={()=>{setScrolling(true);timerFunc = setTimeout(()=>setScrolling(false),1000)}}>
                    <p className="text-xs text-gray-400 px-3 py-1">Seleziona il prodotto da inserire nella lista</p>
                    <AddCustomProdottoItem click={()=>{setCurrent(' ')}}/>
                    {
                    options.map(x => {
                        if(text==0 || x.includes(text))
                            return <ListItem itemName={x} onClick={async()=>{if(!isScrolling){await Click(x);setInterruttore(true)}}} onHold={() => { setText(''); setCurrent(x); }} />
                    })
                    }
                    
                </div>
            }
                <PopUpAddLista text={currentOption} popUpRef={popUpRef} findFunc={findFunc} addLista={addLista} setInterruttore={setInterruttore} setAlertProp={setAlertProps} setCurrent={setCurrent}/>
                
            </div>
            
        </div>
        <AlertMessage text={textAlert} color={color} interruttore={interruttore} setInterruttore={setInterruttore}/>
        </div>
    )
}

export default PageCreaLista
