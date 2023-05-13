import { useEffect } from "react"
import { motion as m } from "framer-motion";
import {useSprings, animated} from 'react-spring';

import axios from "axios";


import Menu from '../components/Menu';
import Users from "./adminPage/Users";
import UsersPassword from "./adminPage/UsersPassword";
import UsersRegister from "./adminPage/UsersRegister";
import Calendars from "./adminPage/Calendars";
import AdminPageNav from "./adminPage/AdminPageNav";
import LoadingIcon from "../components/LoadingIcon";

import { useState } from 'react';
import Message from "../components/Message";
import Confirm from "../components/Confirm";
import useCalendars from "../hooks/useCalendars";


export default function AdminPage() 
{
    const [display, setDisplay] = useState(0);
    const [getData, setGetData] = useState(false);
    const [users, setUsers] = useState(false);
    const [usersPassword, setUsersPassword] = useState(false);
    const [usersRegister, setUsersRegister] = useState(false);
    const [message, setMessage] = useState(false);

    const {convirm, setConvirm} = useCalendars();
    
    useEffect(()=>
    {
      axios.get('http://localhost:3002/data/all', ).then(response => 
      {
        
          setTimeout(() => 
          {
            const {user, userRegister, userPassword} = response.data;      
            setUsers(user);
            setUsersPassword(userPassword);
            setUsersRegister(userRegister);
            setGetData(true)
          }, 1000);
          


      }).catch(err => console.log('Błąd podczas pobierania danych', err))

    }, [])

    useEffect(()=>
    {
        setTimeout(() => {
          setMessage(false);
        }, 3000);
    }, [message])

    const updateAll = (data) =>
    {
            const {user, userRegister, userPassword} = data;      
            setUsers(user);
            setUsersPassword(userPassword);
            setUsersRegister(userRegister);
    }

    const pagesToShow = 
    [    
        <Users items={users} setMessage={setMessage} setConvirm={setConvirm}/>,
        <UsersPassword items={usersPassword} setMessage={setMessage} updateAll={updateAll} setConvirm={setConvirm}/>,
        <UsersRegister items={usersRegister} setMessage={setMessage} updateAll={updateAll} setConvirm={setConvirm}/>,
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

    const variantsForSuspense = 
                  {
                        hidden: { opacity: 0, x: -200, y: 0 },
                        enter: { opacity: 1, x: 0, y: 0 },
                        exit: { opacity: 0, x: 0, y: -100 },
                  }


                  

    if (!getData)
    return (
      <m.div className='w-screen h-screen justify-center items-center flex' variants={variantsForSuspense} initial='hidden' animate='enter' transition={{type: 'linear'}} exit={{x: 200, transition: 0.2 }}>
        <LoadingIcon classname={' fill-blue-500'}></LoadingIcon>
      </m.div>
    )
    return (<>
    <Menu className='flex' theme='bg-amber-300'/>
    <m.div className="flex w-screen h-screen relative justify-center items-start overflow-hidden" variants={variantsForAdminPage} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'>
    <Message message={message}/>
    <Confirm message={convirm.message} submit={convirm.submit} handleSubmit={convirm.handleSubmit}/>
        <div className="mt-12 h-full text-xs w-11/12 md:text-base md:w-3/4 md:1/2">
                <AdminPageNav display={display} setDisplay={setDisplay} users={users} usersPassword={usersPassword} usersRegister={usersRegister}/>
            <div className="relative w-full overflow-hidden z-10">
            
            {pagesToShow[display]}

            </div>
        </div>
    </m.div>
    </>)
}