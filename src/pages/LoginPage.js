import React, { useState } from 'react';
import Login from './loginPage/Login';
import Password from './loginPage/Password';
import Register from './loginPage/Register';
import { useSprings, animated } from "react-spring";
export default function LoginPage({page}) 
{


    const [mail, setMail] = useState('');

    const [displayedFrom, setDisplayedFrom] = useState(page); 
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
        zIndex: index === displayedFrom ? 1 : 0,
        }))
    );

 

    return (
        <div className="flex bg-indigo-100 justify-center h-screen w-screen overflow-hidden">
            {springs.map((props, index) => (
              <animated.div key={index} className="absolute flex w-full h-full overflow-hidden pb-14" style={{ ...props }}>
                {formToShow[displayedFrom]}
              </animated.div>
            ))}
        </div>
    );
}