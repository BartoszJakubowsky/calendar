
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
    const DAYS_OF_WEEK = ['PONIEDZIAŁEK', 'WTOREK', 'ŚRODA', 'CZWARTEK', 'PIĄTEK', 'SOBOTA', 'NIEDZIELA'];

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
    
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = DAYS_OF_WEEK[(firstDayOfMonth + day - 1) % 7];
        const formattedDate = formatDate(date);
        allDaysInMonth.push({ dayOfWeek, formattedDate, day });
        if (year > currentYear ||
            (year === currentYear && month > currentMonth) ||
            (year === currentYear && month === currentMonth && day >= currentDay)) {
          allDaysLeftInMonth.push({ dayOfWeek, formattedDate, day });
        }
      }
      const {allWeeksInMonth, allWeeksLeftInMonth} = getWeeksInMonth(allDaysInMonth,allDaysLeftInMonth, currentMonth);
      return { allDaysInMonth, allDaysLeftInMonth, allWeeksInMonth, allWeeksLeftInMonth};
    }
    

    function getWeeksInMonth(daysInMonth, allDaysLeftInMonth, currentMonth) {
      // Sortowanie dni w miesiącu po tygodniach
      const allWeeksInMonth = [];
      let currentWeek = [];
    
      daysInMonth.forEach(day => {
        const dayOfWeek = day.dayOfWeek;
        currentWeek.push(day);
    
        if (dayOfWeek === DAYS_OF_WEEK[DAYS_OF_WEEK.length - 1]) {
          allWeeksInMonth.push(currentWeek);
          currentWeek = [];
        }
      });
    
      if (currentWeek.length) {
        allWeeksInMonth.push(currentWeek);
      }
    
      // Sortowanie dni w allDaysLeftInMonth
      allDaysLeftInMonth.sort((a, b) => new Date(a.date) - new Date(b.date));
    
      // Sortowanie tygodni w allWeeksLeftInMonth na podstawie allDaysLeftInMonth
      const allWeeksLeftInMonth = allDaysLeftInMonth.map(day => {
        return allWeeksInMonth.find(week => week.some(d => d.date === day.date));
      });
    
      // Filtrowanie dni miesiąca, aby zwrócić tylko dni w aktualnym lub przyszłym tygodniu
      const currentDate = new Date();
      const currentDayOfMonth = currentDate.getDate();
      const allWeeksLeftInMonthFiltered = allWeeksLeftInMonth.filter(week =>
        week.some(day => {
          const [dayOfMonth, month] = day.formattedDate.split('.');
          return (Number(month) === currentMonth && Number(dayOfMonth) >= currentDayOfMonth) || Number(month) > currentMonth;
        })
      );
    
      return {
        allWeeksInMonth,
        allWeeksLeftInMonth: allWeeksLeftInMonthFiltered,
      };
    }
    


    function formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }
    const { allDaysInMonth, allDaysLeftInMonth, allWeeksInMonth, allWeeksLeftInMonth} = getDaysInMonth(date);
    console.log('dni', allDaysInMonth, 'wszystkie tygodnie', allWeeksInMonth);


    return (
        <div className={`bg-red-300 h-full w-full`}>

          {date}
          <Week/>
        </div>
    )

}