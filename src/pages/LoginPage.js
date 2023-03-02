//remember about logging out when enter this page
//think about using useAunthentication also as setting new cookies + sending data to server
import { useEffect } from 'react';
import useCarts from '../hooks/useCarts';


export default function LoginPage() 
{
    const {login, setLogin} = useCarts();

    useEffect(()=> setLogin(false), [])
    

}