
import {HiOutlineX as CloseSlotSettingsIcon} from 'react-icons/hi';
import classNames from 'classnames';

export default function Close({onClick, ...rest}) 
{

    const closeClassName = classNames("bg-red-400 absolute top-0 right-0 rounded-sm cursor-pointer hover:bg-red-500 duration-150 hover:text-lg",
    rest.className)


    return (
        <CloseSlotSettingsIcon 
            className={closeClassName}
            onClick={onClick}
            {...rest}
        />
    )
}
