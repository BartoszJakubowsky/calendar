
//message as state
import { useEffect, useState } from 'react';
import {useSprings, useTransition, animated, config} from 'react-spring';


export default function Message({message, theme}) 
{

    const [showOld, setShowOld] = useState('');
    useEffect(()=>
    {
      if (message)
        setShowOld(message)
    },[message])
    
    const transitions = useTransition(message, {
        from: { opacity: 0, transform: 'translateY(-100%)' },
        enter: { opacity: 1, transform: 'translateY(0%)', config: config.wobbly },
        leave: [
          { opacity: 1, transform: 'translateY(20%)', config: { duration: 150 } },
          { opacity: 0, transform: 'translateY(-200%)', config: { duration: 200 } },
        ],
      });

      const showMessage = message;

      return (
        <>
            {transitions((style, state) => state ? (
            <animated.div
              style={style}
              className={` ${!theme? ' bg-sky-200' : theme } font-medium px-2 z-20 absolute top-2 cursor-default m-auto left-0 right-0 h-10 w-fit border-2 border-gr rounded-md flex items-center justify-center text-center cursor-fault text-w`}
            >
              {message || showOld}
            </animated.div>
          ) : null
        )}
        </>
      )


}