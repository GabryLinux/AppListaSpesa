import React from 'react'

function ArrowSVG({isActive}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"  width="15%" height="15%" viewBox="0 0 50 73" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`transform origin-center ${isActive ? 'rotate-0' : 'rotate-180'}`}>
            <polyline points="36 28 24 40 12 28" />
        </svg>
    )
}

export default ArrowSVG