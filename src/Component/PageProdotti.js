import React, { useEffect, useState } from 'react'
import ListaProdotti from './ListaProdotti'
import firebase from 'firebase';

function PageProdotti() {
  /*
    const lista = {
        "DB": [
          {
            "Market": "Supermercato",
            "Categorie": [
              {
                "Nome": "Snack",
                "Prodotti": [
                  {
                    "Item": "Patatine"
                  },
                  {
                    "Item": "atatine"
                  },
                  {
                    "Item": "Patatine"
                  }
                ]
              }, {
                "Nome": "Snack",
                "Prodotti": [
                  {
                    "Item": "Patatine"
                  },
                  {
                    "Item": "atatine"
                  },
                  {
                    "Item": "Patatine"
                  }
                ]
              },
              {
                "Nome": "Snack",
                "Prodotti": [
                  {
                    "Item": "Patatine"
                  },
                  {
                    "Item": "atatine"
                  },
                  {
                    "Item": "Patatine"
                  }
                ]
              },
              {
                "Nome": "Spezie",
                "Prodotti": [
                  {
                    "Item": "Tabasco"
                  },
                  {
                    "Item": "Paprika Forte"
                  },
                  {
                    "Item": "Cannella"
                  }
                ]
              }
            ]
          },
          {
            "Market": "Ferramenta",
            "Categorie": [
              {
                "Nome": "Fai Da te",
                "Prodotti": [
                  {
                    "Item": "Patatine"
                  },
                  {
                    "Item": "atatine"
                  },
                  {
                    "Item": "Patatine"
                  }
                ]
              },
              {
                "Nome": "Elettronica",
                "Prodotti": [
                  {
                    "Item": "Tabasco"
                  },
                  {
                    "Item": "Paprika Forte"
                  },
                  {
                    "Item": "Cannella"
                  }
                ]
              }
            ]
          }
        ]
      }*/
      
    
    const [lista,setLista] = useState([])
    async function getDB(){
      const db = firebase.firestore()
      return await (await db.collection("Prodotti").get()).docs.map(doc => doc.data())
    }
   
    useEffect(async ()=>{
      setLista(await getDB())
      
    },[])
    return (
        <div className="w-full h-full flex-col px-4 py-6 text-gray-400">
          {
            lista &&
            <ListaProdotti lista={lista}/>
          }
        </div>
    )
}

export default PageProdotti
