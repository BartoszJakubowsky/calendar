import { useState , useEffect} from "react";
import { useSprings, animated } from "react-spring";
import classNames from "classnames";
import Menu from '../../components/Menu'
import Month from "./calendar/Month";
import useCalendars from '../../hooks/useCalendars';
import Confirm from '../../components/Confirm';
import {motion as m} from 'framer-motion';
import useSlot from "../../hooks/useSlot";

import io from "socket.io-client";
import useSocket from '../../hooks/useSocket';

export default function CalendarPage({calendar})
{
const {convirm} = useCalendars();
const {name, date, slots, time} = calendar;
const [displayedMonth, setDisplayedMonth] = useState(0); 
const {updateSlot} = useSlot();
const {setSocket, handleSocket} = useSocket();


const monthCount = date.length;

  useEffect(() => {

      // const socket = io.connect();
      const socket = io.connect("http://localhost:3002");
      
      socket.on("connected", (data) => 
      {
        setSocket(socket)  
        console.log(data)
      });

      socket.on('message', data => 
      {

        console.log(data);
          // updateSlot(data.slot)
      })

      return () => {
        // Zamykanie połączenia socket.io po opuszczeniu komponentu
        console.log('Websockets disconnect')
        setSocket(false);
        socket.disconnect();
      };
  }, []);


  const springs = useSprings(
    monthCount,
    date.map((month, index) => ({
      transform: `translateX(${(index - displayedMonth) * 100}%)`,
      position: "absolute",
      width: "full",
      height: "full",
      top: 0,
      left: 0,
      zIndex: index === displayedMonth ? 1 : 0,
    }))
  );

  const handlePrevClick = () => {
    setDisplayedMonth((displayedMonth - 1 + monthCount) % monthCount);
  };

  const handleNextClick = () => {
    setDisplayedMonth((displayedMonth + 1) % monthCount);
  };


  const variantsForCalendarPage = 
  {
        hidden: { opacity: 0, x: -200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        // exit: { opacity: 0, x: -200, y: 0 },
        exit: { opacity: 0 },
  }
    return(
    <m.div className=" w-screen h-screen flex items-center flex-col bg-red-100" variants={variantsForCalendarPage} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'>
    {/* <div className=" w-screen h-screen bg-red-100"> */}
    <Confirm message={convirm.message} submit={convirm.submit} handleSubmit={convirm.handleSubmit}/>
        <Menu calendarName={name} theme='bg-red-300'/>
        {/* month holder */}
        {/* <div className={`${isMobile? 'mt-5 mx-5 w-full h-full' : ' mt-14 max-w-[90%] h-5/6'} bg-red-300 mx-auto overflow-x-hidden rounded-sm text-sm overflow-hidden`}> */}
        <div className={`mt-4 w-11/12 h-[90%] md:mt-14 md:max-w-[90%] md:h-5/6 bg-red-300 md:mx-auto overflow-x-hidden rounded-sm text-xs overflow-hidden`}>
            <div className="bg-blue-400 w-full h-10 flex justify-start">
          <button
            className={classNames(
                "py-2 px-4 rounded-md text-white",
                displayedMonth === 0 ? "bg-gray-500 cursor-default" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            )}
            onClick={handlePrevClick}
            disabled={displayedMonth === 0}
            >
            Poprzedni miesiąc
            </button>
            <button
            className={classNames(
                "py-2 px-4 rounded-md text-white",
                displayedMonth === monthCount - 1 ? "bg-gray-500 cursor-default" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            )}
            onClick={handleNextClick}
            disabled={displayedMonth === monthCount - 1}
            >
            Następny miesiąc
            </button>
            </div>
            {/* caruzel */}
            <div className="relative w-full h-full">
            {springs.map((props, index) => (
              <animated.div key={index} className="absolute w-full h-full pb-14" style={{ ...props }}>
                <Month name={name} date={date[index]} slots={slots} time={time} />
              </animated.div>
            ))}
    </div>
        </div>
    </m.div>
    );
}



//renders name and "calandars look -> sends request for data"

//date -> all the stuff

// takes data -> sorts 


