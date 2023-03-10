import { useEffect, useState, useRef} from "react"
import useCalendars from "../hooks/useCalendars";

export default function Convirm({message, additional, submit = 'Tak', handleSubmit})
{

    const divOut = useRef();
    const {convirm, setConvirm} = useCalendars();


    useEffect(()=>
    {
        let blockFirstClick = false;

        const handleKey = key =>
        {
            if (key.keyCode === 27)
            {
                handleSubmit(false);
                setConvirm(false);
            }
        }

        const handleOutsideClick = event =>
        {

            if (!blockFirstClick)
            {
                blockFirstClick = true;
                return;
            }

            if (event.target === divOut.current)
            {
                handleSubmit(false);
                setConvirm(false);
            }
        }

            document.addEventListener('keydown', handleKey);
            document.addEventListener('click', handleOutsideClick);

            const removeListeners = () => {document.removeEventListener('keydown', handleKey); document.removeEventListener('click', handleOutsideClick);}

            return removeListeners;
    }, )



    

    const handleClick = () =>
    {
        handleSubmit(true);
        setConvirm(false);
    }


    return <div ref={divOut} className="absolute flex justify-center items-center h-screen w-screen backdrop-blur-sm backdrop-brightness-50 ">
                        <div 
                            className="bg-white shadow-sm h-80 w-80 border-2 rounded-md flex flex-col items-center text-center">
                            <h3 className="text-3xl mt-2 mx-2 basis-1/4" >{message}</h3>
                            <p className="mt-2 basis 1/4">{additional}</p>
                            <div className='basis-1/2 flex items-end'>
                                <button 
                                    onClick={handleClick}
                                    className="self-end-center px-2 group relative overflow-hidden rounded-md bg-white text-xl uppercase cursor-pointer shadow">
                                    <div className="absolute inset-0 w-0 bg-blue-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                                    <span className="relative text-black group-hover:text-white duration-[200ms]">{submit}</span>
                                </button>
                            </div>
                        </div>
                    </div>

}