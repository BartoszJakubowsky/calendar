

import { useEffect } from "react";
import useCalendars from "../hooks/useCalendars";

export default function NotFoundPate()
{
    const {navigate} = useCalendars();
    useEffect(()=>
    {
        setTimeout(()=> navigate('/'),3000);
    })
    

    return (
        <div className="w-screen h-screen bg-amber-400">
            <h1>Ups...</h1>
            <h3>Strona, której szukasz nie istnieje</h3>
            <h3>Zaraz zostaniesz przekierowany z powrotem</h3>
        </div>
    )
}