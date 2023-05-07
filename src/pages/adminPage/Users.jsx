import { useSpring, animated } from "react-spring";
import {IoIosArrowUp} from 'react-icons/io';
import Accordion from "./adminComponents/Accordion";
import { useState } from "react";

export default function Users() 
{
  

    const items = 
    [
        {id:0, label: 'Dupa Wołowa', content: 'Więcej info'},
        {id:1, label: 'Dupa Wołowa', content: 'Więcej info'},
        {id:2, label: 'Dupa Wołowa', content: 'Więcej info'},
        {id:3, label: 'Dupa Wołowa', content: 'Więcej info'}
    ]
    return (
        <div className="w-full h-full">
        {items.map((item, index)=> 
        {
            return <Accordion question={item.label} answer={item.content}/>
        })}
        </div>
    )
}