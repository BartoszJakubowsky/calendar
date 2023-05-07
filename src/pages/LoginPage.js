import React, { useState } from 'react';
import Login from './loginPage/Login';
import Password from './loginPage/Password';
import Register from './loginPage/Register';
import { useSprings, animated } from "react-spring";
import {motion as m} from 'framer-motion';

export default function LoginPage({page}) 
{


    const [mail, setMail] = useState('');

    const [displayedFrom, setDisplayedFrom] = useState(page||1); 
    const formToShow = [<Password mail={mail} setMail={setMail} moveBack={setDisplayedFrom}/>, <Login mail={mail} setMail={setMail} move={setDisplayedFrom}/>, <Register mail={mail} setMail={setMail} moveBack={setDisplayedFrom}/>]
    const formCount = formToShow.length;
    

    


    const springs = useSprings(
        formCount,
        formToShow.map((form, index) => ({
        transform: `translateX(${(index - displayedFrom) * 100}%)`,
        position: "absolute",
        width: "full",
        height: "full",
        top: 0,
        left: 0,
        zIndex: index === displayedFrom ? 1 : 0
        }))
    );

 

    return (
        <m.div className="flex bg-indigo-100 justify-center h-screen w-screen overflow-hidden" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration:0.5, ease: 'easeOut'}} exit={{ opacity:0}} layoutId='1'>
        {/* <m.div className="flex bg-indigo-100 justify-center h-screen w-screen overflow-hidden" initial={{y: '100%'}} animate={{y: "0%"}} transition={{duration:0.5, ease: 'easeOut'}} exit={{opacity:0}} layoutId='1'> */}
            {springs.map((props, index) => (
              <animated.div key={index} className="absolute w-full h-full bg-orange-500" style={{ ...props }}>
                {formToShow[index]}
              </animated.div>
            ))}
        </m.div>
    );
}