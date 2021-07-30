import React, { useState } from 'react'
import {BrowserRouter as Link, NavLink} from 'react-router-dom'
import CreateListSVG from './CreateListSVG'
import ProdottiSVG from './ProdottiSVG'
import ShoppingBag from './ShoppingBagSVG'

function Navbar() {
    const [isActive,setActive] = useState(1)
    
    const style = `flex flex-col flex-1 flex justify-center items-center text-sm text-gray-700 duration-200 ease-in-out `
    return (
        <div className="max-w-full overflow-hidden">
            <div className="w-full h-14 flex justify-between relative border-t border border-gray-300">
                <NavLink exact to="/lista/Spesa" className={style} onClick={()=>{setActive(1)}}>
                    <ShoppingBag isActive={isActive}/>
                    <p className={`${isActive==1 ? 'flex' : 'hidden'} absolute top-8`}>Spesa</p>
                </NavLink>
                <NavLink exact to="/lista/CreaLista" className={style} onClick={()=>{setActive(2)}}>
                    <CreateListSVG isActive={isActive}/>
                    <p className={`${isActive==2 ? 'flex' : 'hidden'} absolute top-8`}>Crea Lista</p>
                </NavLink>
                <NavLink exact to="/lista/Prodotti" className={style} onClick={()=>{setActive(3)}}>
                    <ProdottiSVG isActive={isActive}/>
                    <p className={`${isActive==3 ? 'flex' : 'hidden'} absolute top-8`}>Prodotti</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar
