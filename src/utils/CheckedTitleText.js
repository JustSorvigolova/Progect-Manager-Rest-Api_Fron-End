import React from 'react';
import text_line from  '../Components/Project-Components/ProjectCreate.module.css'
export const CheckedTitleText = ({title, done}) => {
    let checked = done? text_line.text_checked_true : text_line.text_checked_false
    return (
           <span className={checked}>
        {title}
    </span>

    )
}



