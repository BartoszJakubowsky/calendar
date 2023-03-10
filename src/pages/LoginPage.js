//remember about logging out when enter this page
//think about using useAunthentication also as setting new cookies + sending data to server
import { useEffect } from 'react';
import useCalendars from '../hooks/useCalendars';


export default function LoginPage() 
{
    const {login, setLogin} = useCalendars();

    useEffect(()=> setLogin(false), [])
    

}