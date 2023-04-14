export default function Day({day, isActive, key, ...rest}) 
{

    return (
        <div className={` ${rest.className} bg-orange-300`} key={key}>
            {day.day}
        </div>
    )
}