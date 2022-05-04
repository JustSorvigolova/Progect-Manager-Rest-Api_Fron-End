import React, {useState} from 'react';

export const Tick = (props) => {
    let [state, setState] = useState(props.time)
        setTimeout(()=>{
            setState(state-1)
        },1000)
    return (
        <span>{state}</span>
    )
}

