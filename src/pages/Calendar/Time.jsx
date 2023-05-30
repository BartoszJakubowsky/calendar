export default function Time({timeArr, ...rest}) 
{
    //pb-[17px]
    return (
        <div 
            className={`flex w-20 flex-col bg-white lg:pb-[17px]`}>
                <div className="h-20 border-b-2 border-black "></div>
                {timeArr.map((time, index) => 
                {
                    return <div key={time} className={`bg-white flex w-full h-full flex-1 border-b-2 border-black items-center justify-center`} time={time}>{time}</div>
                })}
        </div>)
}