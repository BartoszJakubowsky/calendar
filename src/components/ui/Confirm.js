import { useEffect, useState, useRef} from "react"
import useCalendars from "../../hooks/useCalendars";
import { useTransition, animated, config } from 'react-spring';


export default function Confirm({message, additional, submit = 'Tak', handleSubmit, close = 'ANULUJ', ...rest})
{

    const divOut = useRef();
    const {convirm, setConvirm} = useCalendars();


    useEffect(()=>
    {

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

    
    const handleClose = () =>
    {
        handleSubmit(false);
        setConvirm(false);
    }
    
    const handleClick = () =>
    {
        handleSubmit(true);
        setConvirm(false);
    }
    
    const transition = useTransition(convirm, {
        from: { opacity: 0, transform: 'translateY(300px)' },
  config: { tension: 300, friction: 50, duration: 300 },
  enter: { from: { opacity: 0, transform: 'translateY(300px)' }, to: { opacity: 1, transform: 'translateY(0)' }, config: config.wobbly },
  leave: { from: { opacity: 1, transform: 'translateY(0)' }, to: { opacity: 0, transform: 'translateY(300px)' }, config: config.wobbly },
});
    
    return  <div ref={divOut} className={`absolute flex justify-center items-center h-screen w-screen z-50 ${convirm? `backdrop-blur-sm backdrop-brightness-50 duration-150` : 'pointer-events-none '} ${rest.className}`}>
            {transition((style, state) =>state? <animated.div  style={style} className={`bg-white shadow-sm h-80 w-80 border-2 rounded-md flex flex-col items-center text-center cursor-default ${state? '' : 'pointer-events-none'}`}>
                <h3 className="text-3xl mt-2 mx-2 basis-1/4" >{message}</h3>
                <p className="mt-2 basis 1/4">{additional}</p>
                <div className='basis-1/2 flex flex-col justify-end '>
                    <button 
                        onClick={handleClick}
                        className="self-end-center px-2 group relative overflow-hidden rounded-md bg-white text-xl uppercase cursor-pointer shadow">
                        <div className="absolute inset-0 w-0 bg-blue-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                        <span className="relative text-black group-hover:text-white duration-[200ms]">{submit}</span>
                    </button>
                    {close && 
                     <button 
                     onClick={handleClose}
                     className="self-end-center px-2 mt-2 group relative overflow-hidden rounded-md bg-white text-xl uppercase cursor-pointer shadow">
                     <div className="absolute inset-0 w-0 bg-red-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                     <span className="relative text-black group-hover:text-white duration-[200ms]">{close}</span>
                 </button>}
                </div>
            </animated.div> : false)}
        </div>
    

}