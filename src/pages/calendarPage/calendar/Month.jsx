
import classNames from "classnames";
import useMobileDevice from "../../../hooks/useMobileDevice";


export default function Month({name, date, slots, time}) 
{
    const isMobile = useMobileDevice();
    const className = classNames('');
    const thisYear = new Date().getFullYear();

    const [month, year] = date.split('.');
    const MONTHS = ['STYCZEŃ', 'LUTY', 'MARZEC', 'KWIECIEŃ', 'MAJ', 'CZERWIEC', 'LIPIEC', 'SIERPIEŃ', 'WRZESIEŃ', 'PAŹDZIERNIK', 'LISTOPAD', 'GRUDZIEŃ'];
    const DAYS_OF_WEEK = ['NIEDZIELA', 'PONIEDZIAŁEK', 'WTOREK', 'ŚRODA', 'CZWARTEK', 'PIĄTEK', 'SOBOTA'];

    function showDays() {
        const [monthStr, yearStr] = date.split('.');
        const month = MONTHS.indexOf(monthStr.toUpperCase());
        const year = parseInt(yearStr, 10);
      
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();
      
        let availableDays = '';
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(year, month, day);
          const dayOfWeek = DAYS_OF_WEEK[date.getDay()];
          const formattedDate = formatDate(date);
          console.log(`${dayOfWeek}, ${formattedDate}`);
          if (year > currentYear ||
              (year === currentYear && month > currentMonth) ||
              (year === currentYear && month === currentMonth && day >= currentDay)) {
            if (availableDays) {
              availableDays += ', ';
            }
            availableDays += `${dayOfWeek}, ${formattedDate}`;
          }
        }
      
        console.log(`DOSTĘPNE DNI: ${availableDays}`);
      }
      
      function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      }
      
    
    showDays();



    return (
        <div className={`bg-red-300 h-fit m-auto flex w-full`}>
        </div>
    )

}