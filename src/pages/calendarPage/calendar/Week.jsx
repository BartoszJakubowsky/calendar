
import { useState } from 'react';
import useMobileDevice from '../../../hooks/useMobileDevice';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';


export default function Week({ allDaysInMonth, allDaysLeftInMonth, allWeeksInMonth, allWeeksLeftInMonth }) 
{
    const [displayedWeek, setDisplayedWeek] = useState(0);
    const weekCount = allWeeksInMonth.length;
  
    const springs = useSprings(
      weekCount,
      allWeeksInMonth.map((week, index) => ({
        transform: `translateY(${(index - displayedWeek) * 100}%)`,
        position: "absolute",
        width: "full",
        height: "full",
        top: 0,
        left: 0,
        zIndex: index === displayedWeek ? 1 : 0,
      }))
    );
  
    const bind = useGesture({
      onWheel: ({ delta: [, dy] }) => {
        setDisplayedWeek((prev) => Math.min(Math.max(prev + (dy > 0 ? 1 : -1), 0), weekCount - 1));
      },
    });
  
    return (
      <div className="relative w-full h-full" {...bind()}>
        {springs.map((props, index) => (
          <animated.div key={index} className="absolute w-full h-full" style={{ ...props }}>
            <div>To jest tydzień</div>
          </animated.div>
        ))}
      </div>
    );
  }
    