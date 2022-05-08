import React from "react";
import './styles.css'

const EMPTY_COMPUTER = '0x0000000000000000000000000000000000000000'

const Computer = ({value, id}) => {
    return (
        <div className='computer-container'>
            <p>{id}</p>
            <p>{value===EMPTY_COMPUTER ? 'Free' : `Using by ${value}`}</p>
        </div>
    )
}

export default Computer;
