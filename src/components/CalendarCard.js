
import classNames from "classnames";
import Link from './Link';

export default function CalendarCard({calendar, children, ...rest}) 
{
const CartCardClasses = classNames(rest.className,
    "relative m-2 box-content md:w-64 md:h-64 text-sm md:text-xl w-44 h-44 border-4 border-gray-800 hover:-translate-y-1 duration-300 backdrop-blur-sm text-2xl overflow-hidden"
);
    return <div
            {...rest} 
            className={` order-${calendar.order}  ${CartCardClasses} flex justify-center items-center cursor-pointer overflow-hidden`}
            >{children}
            </div>;

}
