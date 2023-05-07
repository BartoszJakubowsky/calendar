import { useEffect } from "react"
import { motion as m } from "framer-motion";
import {useSprings, animated} from 'react-spring';

import Menu from '../components/Menu';
import Users from "./adminPage/Users";
import UsersPassword from "./adminPage/UsersPassword";
import UsersRegister from "./adminPage/UsersRegister";
import Calendars from "./adminPage/Calendars";
import AdminPageNav from "./adminPage/AdminPageNav";

import { useState } from 'react';


export default function AdminPage() 
{
    const [display, setDisplay] = useState(0);

    useEffect(()=>
    {
        //fetch data each page reloads
    })

    const pagesToShow = 
    [    
        <Users/>,
        <UsersPassword/>,
        <UsersRegister/>,
        <Calendars/>
    ]
    const pagesCount = pagesToShow.length;
    

    


    const springs = useSprings(
        pagesCount,
        pagesToShow.map((form, index) => ({
        transform: `translateX(${(index - display) * 100}%)`,
        position: 'absolute',
        width: "full",
        height: "full",
        top: 0,
        left: 0,
        }))
    );

    const variantsForAdminPage = 
    {
          hidden: { opacity: 0, x: -200, y: 0 },
          enter: { opacity: 1, x: 0, y: 0 },
          exit: { opacity: 0, x: 0, y: -100, transition:{delay: 1} },
    }

    return (<>
    <Menu className='flex'/>
    <m.div className="flex w-screen h-screen justify-center items-start overflow-hidden" variants={variantsForAdminPage} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'>
        <div className="mt-10 h-full w-3/4 md:1/2">
                <AdminPageNav display={display} setDisplay={setDisplay}/>
            <div className=" relative h-5/6 w-full overflow-hidden">
            {springs.map((props, index) => (
              <animated.div key={index} className="bg-blue-300 w-full h-full flex flex-col items-center " style={{ ...props }}>
                {pagesToShow[index]}
              </animated.div>
            ))}
            </div>
        </div>
    </m.div>
    </>)
}