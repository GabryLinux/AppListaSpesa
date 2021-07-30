import React from 'react'

function TendinaItem({Item,isLast}) {
    console.log(Item)
    return (
        <div className="min-h-10 h-12 w-full flex flex-row text-lg text-gray-600 ">
            <div className={`justify-center items-start flex flex-col h-full ${isLast && 'relative'}`}>
                <div className={` ${isLast ? 'absolute top-0 h-1/2' : 'h-full'} bg-gray-700`} style={{width : '1px'}}/>
            </div>
            <div className="flex flex-row items-center">
                <div className="w-8 bg-gray-700" style={{height : '1px'}}/>
                <p className="text-base">
                    {Item}
                </p>
            </div>
        </div>
    )
}

export default TendinaItem
