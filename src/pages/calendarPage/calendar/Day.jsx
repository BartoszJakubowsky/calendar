import classNames from "classnames"

export default function Day({day, isActive, key, isBlank, timeArr, slots,  ...rest}) 
{


    if (isBlank)
        return (
            <div className={` bg-gray-400 flex flex-1`} key={key}>
                <div className={`w-full flex-1`}>{day}</div>
            </div>
        )
    return (
        <div className={`flex flex-col flex-1 bg-orange-300  `}  key={key}>
            <div className={`h-10`}>{day}</div>
            {timeArr.map((daySlot, index) =>
            {

                return (
                    
                <div
                    key={key} 
                    className="flex flex-1 flex-row w-full">
                        {slots.map(slot =>
                        {
                            const className = classNames(`flex flex-auto flex-wrap order-${slot.order}`)
                                let spaces = [];
                                for (let i = 0; i <= parseInt(slot.space); i++) 
                                {
                                    spaces.push(
                                        <div className="flex flex-1">
                                        {slot.order}
                                        </div>
                                    )
                                }

                            return <div className={className}>
                                    {spaces}
                                    </div>
                        })}
                </div>)
            })}
        </div>
    )
}