import React from 'react'
import useLongPress from './useLongPress'

function ListItem({itemName,onClick,onHold}) {
    

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };
    const longPressEvent = useLongPress(onHold, onClick, defaultOptions);
    return (
        <button {...longPressEvent} className="h-12 w-full flex flex-row justify-between items-center px-3  " >
            <p className="text-gray-500 text-sm ">{itemName}</p>
            <p className="text-green-500 text-lg font-semibold rounded-full border border-green-500 h-4 w-4 flex justify-center items-center">+</p>
        </button>
    )
}

export default ListItem
