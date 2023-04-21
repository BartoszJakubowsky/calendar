
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import useMobileDevice from '../../../hooks/useMobileDevice';
import DayColumn from './DayColumn';
import Time from './Time';

export default function Week({ allDaysInMonth, allDaysLeftInMonth, allWeeksInMonth, allWeeksLeftInMonth, time, name, slots, date}) 
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



  const weekClassName = classNames('w-full h-full overflow-y-scroll overflow-x-scroll snap snap-y snap-mandatory');
  // const dayTimeColumnClass = classNames('h-full w-full flex flex-auto')
  if (isMobile)
  return (
    <div className={weekClassName}>
      {allDaysInMonth.map((day, index)=>
        {
          return (
            <section key={index} className='"w-full h-screen flex snap-start'>
            <Time time={time}/>
            {/* check if array from object is empty (if object is === {})   */}
            <DayColumn className='' day={day} isActive={(Object.keys(allDaysLeftInMonth[index]).length === 0 ? false :true)}/>
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
            <section key={index} className={`snap-start h-full w-full bg-gray-100 flex flex-row`}>
            {/* time */}
            <Time timeArr={timeArr} 
            // className={dayTimeColumnClass}
            />
            {/* only days for this week */}

            {DAYS_OF_WEEK.map((day, dayIndex) => 
            {

              let doesDayExist = false;

              for (let i = 0; i < week.length; i++) 
              {
                const dayInWeek = week[i];
                if (dayInWeek.day.toUpperCase() === day)
                {
                  doesDayExist = true;
                  break;
                }
              }
              if (doesDayExist)
              return <DayColumn 
                // className={dayTimeColumnClass} 
                day={day} 
                isActive={!!(allWeeksLeftInMonth[index]?.[dayIndex])} 
                isBlank={false}
                timeArr={timeArr}
                slots={slots}
                name={name}
                date={date}
                weekIndex={index}
                />
              else
              return <DayColumn
                // className={dayTimeColumnClass}
                day={day.date}
                isActive={!!(allWeeksLeftInMonth[index]?.[dayIndex])}
                isBlank={true}
                slots={slots}/>
            })}
            
          </section>
          )
        })}
    </div>
  )

}
    