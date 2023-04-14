
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import useMobileDevice from '../../../hooks/useMobileDevice';
import Day from './Day';
import Time from './Time';

export default function Week({ allDaysInMonth, allDaysLeftInMonth, allWeeksInMonth, allWeeksLeftInMonth, time }) 
{

  const DAYS_OF_WEEK = ['PONIEDZIAŁEK', 'WTOREK', 'ŚRODA', 'CZWARTEK', 'PIĄTEK', 'SOBOTA', 'NIEDZIELA'];
  const generateTimes = (timeStart, timeEnd, timeBetween) =>
  {
    const times = [];
    let currentTime = timeStart;
    
    while (currentTime <= timeEnd) {
      times.push(currentTime);
      const [hours, minutes] = currentTime.split(':');
      const currentMinutes = parseInt(hours) * 60 + parseInt(minutes);
      const beetwMinutes = parseInt(timeBetween.split(':')[0]) * 60 + parseInt(timeBetween.split(':')[1]);
      const nextMinutes = currentMinutes + beetwMinutes;
      const nextHours = Math.floor(nextMinutes / 60).toString().padStart(2, '0');
      const nextMinutesRemainder = nextMinutes % 60;
      currentTime = `${nextHours}:${nextMinutesRemainder.toString().padStart(2, '0')}`;
    }
  
    return times;
  }
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [timeArr, setTimeArr] = useState(generateTimes(time.timeFrom, time.timeTo, time.timeSpace));
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


  console.log(allWeeksInMonth);
  


  const weekClassName = classNames('w-full h-screen overflow-y-scroll overflow-x-hidden snap snap-y snap-mandatory');
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
            <section key={index} className={`snap-start h-screen w-screen bg-gray-100 inline-flex items-baseline`}>
            {/* time */}
            <Time timeArr={timeArr}/>
            {/* only days for this week */}

            {week.map((day, dayIndex) => 
            {
              return <Day key={day.date} className={``} day={day} isActive={!!(allWeeksLeftInMonth[index]?.[dayIndex])}/>
            })}
          </section>
          )
        })}
    </div>
  )

}
    