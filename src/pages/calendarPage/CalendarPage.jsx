import { useState } from "react";
import { useSprings, animated } from "react-spring";
import classNames from "classnames";
import Menu from './calendar/Menu'
import Month from "./calendar/Month";
import useMobileDevice from "../../hooks/useMobileDevice";

export default function CalendarPage({calendar})
{

const {name, date, slots, time} = calendar;
const isMobile = useMobileDevice();
const [displayedMonth, setDisplayedMonth] = useState(0); 


const monthCount = date.length;

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



    return(
    <div className="w-screen h-screen overflow-hidden">
        <Menu calendarName={name}/>
        {/* month holder */}
        <div className={`${isMobile? 'mt-5 w-full h-full' : ' mt-14 w-4/5 h-5/6'} bg-red-300 mx-auto overflow-hidden rounded-sm`}>
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
              <animated.div key={index} className="absolute w-full h-full" style={{ ...props }}>
                <Month name={name} date={date[index]} slots={slots} time={time} />
              </animated.div>
            ))}
 
    </div>
        </div>

        
    </div>);
}



//renders name and "calandars look -> sends request for data"

//date -> all the stuff

// takes data -> sorts 


