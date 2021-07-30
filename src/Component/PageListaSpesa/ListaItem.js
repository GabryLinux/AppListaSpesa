import React, { useEffect, useRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useState } from 'react/cjs/react.development'
import CheckBox from '../checkBox/CheckBox'
import './shadow.css'

//import { useSwipeable } from 'react-swipeable' 

function ListaItem({itemName,Quantity,Status,index,changeStatus,id,deleteElement,Data,Market}) {
    const [status,setStatus] = useState(Status)
    const [eliminated,setEliminated] = useState(false)
    const elRef = useRef()
    const anchorRef = useRef()
    var statusCopy = Status
    
    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(0);

    const getTranslationX = (translation)=>{
        let string = ''
        let i;
        if(translation)
            for(i=0;i<translation.length;i++){
                while(!isNaN(translation.charAt(i))){
                    string += translation.charAt(i)
                    i++
                }
                if(string != '')
                    break
            }
        return string
    }

    

    function getStyle(style) {
        if (style?.transform) {
            const axisLockX = `${style.transform.split(",").shift()}, 0px)`;
            return {
              ...style,
              transform: axisLockX,
            };
          }
          return style;
      }
    
    const onClickHandle = ()=>{
        //elRef.current.style.opacity = '0.0'
        statusCopy = !Status
    }

    const onTransitionEndHandle = ()=>{
        if(statusCopy!==Status)
            changeStatus(index)
    }

    const touchHandle = (event) => {
        var touch = event.targetTouches[0];
        event.target.style.left = touch.pageX + 'px';
        event.target.style.top = touch.pageY + 'px';
        event.preventDefault();
    }

    useEffect(()=>{
        //elRef.current.addEventListener('touchmove', touchHandle , false);
        return ()=>{
           // elRef.current.removeEventListener('touchmove', touchHandle)
        }
    },[])
    return (
        <Draggable key={id} draggableId={id} index={index}  direction={'horizontal'} timeForLongPress={1}>
            
            {(provided,snapshot) => 
                {
                if (parseInt(getTranslationX(provided.draggableProps.style.transform)) > 100 && Status)
                    {anchorRef.current.style.transform = 'translateX(3000px)'
                     anchorRef.current.style.height = '0px'
                    
                        console.log("SLIDED")
                        //console.log(Status)
                        //deleteElement(index)
                }
                    
                return <div className="w-full h-14 mb-5 duration-100" ref={anchorRef} onTransitionEnd={(e) => { if (Status && e.propertyName == 'height') { deleteElement(id, Market); anchorRef.current.style.display = 'none';}}}>
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="w-full px-5 py-4 rounded-full flex items-start  new-shadow transition-all duration-300 opacity-100 " onClick={() => { changeStatus(index) }}  style={getStyle(provided.draggableProps.style,snapshot)}>  
                <div className="flex flex-row justify-between items-center h-full w-full pr-2" >
                    <p className={`text-xl text-gray-600 ${Status && 'line-through text-gray-300 opacity-30'}`}>{itemName}</p>
                    {!Status ?
                        <p className="text-xs text-gray-400">{Quantity}</p>
                        :
                        <p className="text-xs text-gray-400">{Data}</p>
                    }
                </div>
                <CheckBox index={index} Status={!Status} />
                    </div>
                </div>}}
        </Draggable>
    )
}

export default ListaItem
