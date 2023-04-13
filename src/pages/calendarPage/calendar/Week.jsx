
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import useMobileDevice from '../../../hooks/useMobileDevice';
import Day from './Day';
import Time from './Time';

export default function Week({ allDaysInMonth, allDaysLeftInMonth, allWeeksInMonth, allWeeksLeftInMonth, time }) 
{
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const isMobile = useMobileDevice();


  //useEffect for triggering isMobileDevice
  
  useEffect(() => {
    function handleResize() 
    {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const weekClassName = classNames('w-full h-screen overflow-y-scroll overflow-x-hidden snap snap-y snap-mandatory', 
                                  isMobile? `` : `grid-rows-${allWeeksInMonth}`)
  if (isMobile)
  return (
    <div className={weekClassName}>
      {allDaysInMonth.map((day, index)=>
        {
          return (
            <section key={index} className='"w-full h-screen flex snap-start'>
            <Time time={time}/>
            {/* check if array from object is empty (if object is === {})   */}
            <Day className='' day={day} isActive={(Object.keys(allDaysLeftInMonth[index]).length === 0 ? false :true)}/>
            </section>
          )
        })}
    </div>
  )
  else
  return(
    <div className={weekClassName}>
     {allWeeksInMonth.map((week, index)=>
        {
          return (
          <section key={index} className='"w-full h-screen flex snap-start'>
            <Time time={time}/>
            {/* only days for this week */}
            <div>
            {week.map((day, dayIndex) => 
            {
              return (
              <Day key={day.date} className='' day={day} isActive={!!(allWeeksLeftInMonth[index]?.[dayIndex])}/>
              )
            })}
            </div>
          </section>
          )
        })}
    </div>
  )

}
    