import React from 'react';
import preloader from '../utils/prelod.gif'
import WithAndHeight from './preloader.module.css'
export const Preloader = () => (
    <>
        <img className={WithAndHeight.preloader} src={preloader} alt={'preloader'}/>
    </>
);

