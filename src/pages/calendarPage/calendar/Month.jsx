
import classNames from "classnames";
import useMobileDevice from "../../../hooks/useMobileDevice";


export default function Month({name, date, slots, time}) 
{
    const isMobile = useMobileDevice();
    const className = classNames('');
    const monthsNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj',  'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', ' Grudzień' ];
    const thisYear = new Date().getFullYear();

    const [month, year] = date.split('');

    return (
        <div className={`bg-red-300 h-fit m-auto flex w-full`}>
            
        </div>
    )

}