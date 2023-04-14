
import classNames from "classnames";
import useMobileDevice from "../../../hooks/useMobileDevice";
import Week from "./Week";

export default function Month({name, date, slots, time}) 
{
    const isMobile = useMobileDevice();
    const className = classNames('');
    const thisYear = new Date().getFullYear();

    const [month, year] = date.split('.');
    const MONTHS = ['STYCZEŃ', 'LUTY', 'MARZEC', 'KWIECIEŃ', 'MAJ', 'CZERWIEC', 'LIPIEC', 'SIERPIEŃ', 'WRZESIEŃ', 'PAŹDZIERNIK', 'LISTOPAD', 'GRUDZIEŃ'];
    const DAYS_OF_WEEK = ['NIEDZIELA', 'PONIEDZIAŁEK', 'WTOREK', 'ŚRODA', 'CZWARTEK', 'PIĄTEK', 'SOBOTA'];

    function getDaysInMonth(dateStr) {
      const [monthStr, yearStr] = dateStr.split('.');
      const month = MONTHS.indexOf(monthStr.toUpperCase());
      const year = parseInt(yearStr, 10);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const allDaysInMonth = [];
      const allDaysLeftInMonth = [];
      const allWeeksInMonth = [];
      const allWeeksLeftInMonth = [];
    
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const dayOfWeek = DAYS_OF_WEEK[date.getDay()];
        const day = {
          day: dayOfWeek,
          date: date
        };
        allDaysInMonth.push(day);
        if (date >= currentDate) 
          allDaysLeftInMonth.push(day);
        else
          allDaysLeftInMonth.push({})

      }
    
      let currentWeek = [];
      let currentWeekLeft = [];
      for (let i = 1; i <= daysInMonth; i++) 
      {
        const date = new Date(year, month, i);
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 1) 
        {
          allWeeksInMonth.push(currentWeek);
          allWeeksLeftInMonth.push(currentWeekLeft);
          currentWeek = [];
          currentWeekLeft = [];
        }
        const day = 
        {
          day: DAYS_OF_WEEK[dayOfWeek],
          date: date
        };
        currentWeek.push(day);
        if (date >= currentDate) 
        {
          currentWeekLeft.push(day);
        }
      }
      if (currentWeek.length > 0) 
      {
        allWeeksInMonth.push(currentWeek);
        allWeeksLeftInMonth.push(currentWeekLeft);
      }
    
      return {
        allDaysInMonth: allDaysInMonth,
        allDaysLeftInMonth: allDaysLeftInMonth,
        allWeeksInMonth: allWeeksInMonth.filter(subarray => subarray.length > 0),
        allWeeksLeftInMonth: allWeeksLeftInMonth
      };
    }
    const {allDaysInMonth, allDaysLeftInMonth, allWeeksInMonth, allWeeksLeftInMonth} = getDaysInMonth(date);
    return (
        <div className={`bg-red-300 h-full w-full`}>
          {date}
          <Week allDaysInMonth={allDaysInMonth} allDaysLeftInMonth={allDaysLeftInMonth} allWeeksInMonth={allWeeksInMonth} allWeeksLeftInMonth={allWeeksLeftInMonth} time={time}/>
        </div>
    )

}