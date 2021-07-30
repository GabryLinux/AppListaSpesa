import React, { useEffect, useState } from 'react'
import SectionHeaderlement from './SectionHeaderlement'
import firebase from 'firebase'
import { list } from 'postcss'
import DeleteAllCheckedButton from './DeleteAllCheckedButton'

function Header({lista,deleteElement,setLista}) {
    //const luoghi = ['Supermarket','Ferramenta','Farmacia','Panificio']
    const [luoghi,setLuoghi] = useState("")
    const [activeOption,setActive] = useState('Supermarket')
    const [ListaDb,setListaDB] = useState([])
    const [DB,setDB] = useState([])
    //<ListaSpesa lista={lista} setLista={setLista} changeStatus={changeStatus} deleteElement={deleteElement}/>
    useEffect(async()=>{
        setDB((await firebase.firestore().collection("Acquisti").get()).docs.map(x=>{return {
            Market : x.id,
            Prodotti: [...x.data().Prodotti]
        }}))
        console.log(DB)
        
        setLuoghi([...DB.map(x=>x.Market)])
        
    },[])
    function flatten(arr) {
        return Array.isArray(arr) ? [].concat.apply([], arr.map(flatten)) : arr;
    }
    
    function deleteElement(id,Market){
        var listaCopy = [...DB.map(x=>{
            if(x.Market == Market)
            return x.Prodotti.map(y=>y)
        })]

        listaCopy = listaCopy.filter(function( element ) {
            return element !== undefined;
         })
         listaCopy = flatten(listaCopy)

        const index = listaCopy.findIndex(el=>{
            return el.uuid == id
        })
        listaCopy.splice(index,1)
        console.log([...listaCopy])
        
        firebase.firestore().collection("Acquisti").doc(Market).set({
            Prodotti : [...listaCopy]
        }).then((e)=>
            {
                firebase.firestore().collection("Acquisti").get().then(e=>{
                    setDB(e.docs.map(x=>{return {
                        Market : x.id,
                        Prodotti: [...x.data().Prodotti]
                    }}))
                }).catch(e=>console.log(e))
            }
        ).catch(e=>console.log(e))
    }

    async function deleteAllCheckedElement(Market){
        var listaCopy = [...DB.map(x => {
            if (x.Market == Market)
                return x.Prodotti.map(y => y)
        })]
        listaCopy = listaCopy.filter(function (element) {
          return element !== undefined;
        });
        listaCopy = flatten(listaCopy);
        console.log(listaCopy)
        listaCopy = listaCopy.filter(function (element) {
            return !element.Status;
        })
        await firebase
          .firestore()
          .collection("Acquisti")
          .doc(Market)
          .set({
            Prodotti: [...listaCopy],
          });
        let lista = await firebase.firestore().collection("Acquisti").get();
        setDB(
          lista.docs.map((x) => {
            console.log({
              Market: x.id,
              Prodotti: [...x.data().Prodotti],
            });
            return {
              Market: x.id,
              Prodotti: [...x.data().Prodotti],
            };
          }),
        );
        
        /*
        firebase.firestore().collection("Acquisti").doc(Market).set({
            Prodotti: [...listaCopy]
        }).then((e) => {
            firebase.firestore().collection("Acquisti").get().then(e => {
                setDB(e.docs.map(x => {
                    console.log(x)
                    return {
                        Market: x.id,
                        Prodotti: [...x.data().Prodotti]
                    }
                }))
            }).catch(e => console.log(e))
        }
        ).catch(e => console.log(e))
        */
    }
    useEffect(()=>{
        console.log("DONE : ", [...DB.map((x) => x.Prodotti.map((y) => y))]);
        setListaDB([...DB.map((x) => x.Prodotti.map((y) => y))]);
        console.log([...ListaDb])
    },[DB])

    return (
        <div className="w-full h-full py-3 px-3">
            <p className="text-4xl px-1 text-gray-700 font-light">Lista della Spesa</p>
            <div className="w-full h-full pt-6 flex justify-around relative">
                {
                    DB.map((x,index)=>{
                        console.log(x)
                        return <SectionHeaderlement dbLista={ListaDb.length>0 ? [...ListaDb[index]] : []} lista={DB} setLista={setDB} deleteElement={deleteElement} section={x.Market} activeOption={activeOption} onClick={() => {setActive(x.Market)}} deleteFunc={deleteAllCheckedElement}/>
                    })
                }
                
            </div>

        </div>
    )
}

export default Header
