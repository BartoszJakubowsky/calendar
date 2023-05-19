

import { useEffect } from "react";
import useCalendars from "../../hooks/useCalendars";


export default function NotFoundPate()
{
    const {navigate} = useCalendars();
    useEffect(()=>
    {
        setTimeout(()=> navigate('/'),2500);
    })
    
    return (
        <div className="flex w-screen h-screen justify-start items-center flex-col bg-amber-400" >
            <h1 className="mt-10 font- text-2xl">Ups...</h1>
            <h3 className="text-whiter">Strona, której szukasz nie istnieje!</h3>
            <h3>Zaraz zostaniesz przekierowany z powrotem...</h3>
        </div>
    )
}