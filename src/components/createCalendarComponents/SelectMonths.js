

import { HiArrowSmLeft as ArrowLeft} from "react-icons/hi";
import { HiArrowSmRight as ArrowRight } from "react-icons/hi";

export default function SelectMonths({year = new Date().getFullYear(), handleYear, handleMonth}) 
{
    const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj',  'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', ' Grudzień' ];
    const thisYear = new Date().getFullYear();
    const chosedYear = year === thisYear;
    const arrowsClassNames ='';


    let avaibleMonths;






    if (chosedYear)
    {
        const actualMonth = new Date().getMonth();
        avaibleMonths = months.slice(actualMonth);
    }
    else
        avaibleMonths = months;

    


    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center">
            {chosedYear && <ArrowLeft className=" hover:scale-130" onClick={()=>handleYear('previous')}/>}
            <span className=" font-semibold text-cyan-900 pointer-events-none">{year}</span>
            <ArrowRight onClick={()=>handleYear('next')}/>
            </div>
        <ul className="flex flex-row just">
            <div className="h-10 w-10 bg-gray-300"></div>
            <div className="h-10 w-10 bg-gray-300"></div>
            <div className="h-10 w-10 bg-gray-300"></div>
            <div className="h-10 w-10 bg-gray-300"></div>
            <div className="h-10 w-10 bg-gray-300"></div>
            <div className="h-10 w-10 bg-gray-300"></div>
        </ul>
        </div>
    )


}