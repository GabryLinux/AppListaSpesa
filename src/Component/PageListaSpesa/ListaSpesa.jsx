import React, { useEffect, useState } from 'react'
import ListaItem from './ListaItem.jsx'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import firebase from 'firebase'

function ListaSpesa({ deleteElement, dbLista, Market, listas}) {
    const [lista,setLista] = useState([...dbLista])
    const [flag,setFlag] = useState(false)
    const DB = firebase.firestore().collection("Acquisti")
    /*
    function handleOnDragEnd(result){
        if(!result.destination)
            return;
        var items = [...lista]
        const [reordereItem] = items.splice(result.source.index,1)
        items.splice(result.destination.index,0,reordereItem)
        //setLista(items)
        DB.doc(Market).set({
            Prodotti : [...items]
        })
    }*/
    const changeStatus = (index) => {
        let newArr = [...lista]; // copying the old datas array
        let today = new Date().toLocaleDateString()
        if (lista.length > 0)
            newArr[index].Status = !newArr[index].Status; // replace e.target.value with whatever you want to change it to
            newArr[index].data = today
        const sortedArray = [
            ...newArr.filter(({ Status }) => !Status),
            ...newArr.filter(({ Status }) => Status)
        ];
        console.log(sortedArray)
        setLista(sortedArray); // ??
        DB.doc(Market).set({
            Prodotti : [...sortedArray]
        })

    }
    
    useEffect(()=>{
        console.log(dbLista)
    })
    useEffect(()=>{
        setFlag(!flag)
    },[listas])
    useEffect(() => {
        setLista([...dbLista])
      console.log("UPDATED IN CHILD");
    }, [dbLista]);
    return (
        <DragDropContext >
        <div className="py-1 px-2 max-w-full w-full flex-1 h-5/6 overflow-y-scroll overflow-x-hidden absolute left-0">
        <Droppable  droppableId="items" >
            {(provided)=>(
                <div {...provided.droppableProps} ref={provided.innerRef}>
                {
                    ListaSpesa.length>0 && lista.map((x,index)=>{
                        if(!x.Status)
                            return <ListaItem itemName={x.Item} id={x.uuid} Quantity={x.Quantity} Status={x.Status} index={index} changeStatus={changeStatus} deleteElement={deleteElement} Market={Market}/>
                    })
                }
                <div className="w-full h-0 border border-gray-300"></div>
                {
                    ListaSpesa.length>0 &&  lista.map((x,index)=>{
                        if(x.Status)
                            return <ListaItem itemName={x.Item} id={x.uuid} Quantity={x.Quantity} Status={x.Status} index={index} changeStatus={changeStatus} deleteElement={deleteElement} Data={x.data} Market={Market}/>
                    })
                }
                {
                    provided.placeholder
                }
            </div>)
            
            } 
        </Droppable>
        <div className="pt-5">
        {/*<Droppable  droppableId="items-completed">
            {(provided)=>(
                <div {...provided.droppableProps} ref={provided.innerRef}>
                {
                    
                }
                {
                    provided.placeholder
                }
            </div>)} 
            </Droppable>*/}
        </div>
            
            
           
        </div>
        </DragDropContext>
    )
}

export default ListaSpesa
