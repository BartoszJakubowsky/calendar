
import classNames from "classnames";
import Link from './Link';

export default function CalendarCard({className, calendar, children, ...rest}) 
{
    
const CartCardClasses = classNames(rest.className,
    "relative m-2 box-content w-64 h-64 border-4 border-gray-800 hover:-translate-y-1 duration-300 backdrop-blur-sm text-2xl"
);

    return <div
            {...rest} 
            className={` order-${calendar.order}  ${CartCardClasses} flex justify-center items-center cursor-pointer`}
            >{children}
            </div>;

}
