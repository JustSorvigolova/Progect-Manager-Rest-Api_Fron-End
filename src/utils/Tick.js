import React, {useState} from 'react';

export const Tick = () => {
    let [state, setState] = useState(0)
        setTimeout(()=>{
            setState(state+1)
        },1000)
    return (
        <h3>{state}</h3>
    )
}

