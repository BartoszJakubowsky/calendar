export default function Day({day, isActive, ...rest}) 
{

    return (
        <div className={` ${rest.className}`}>
            Jeden z dni
        </div>
    )
}