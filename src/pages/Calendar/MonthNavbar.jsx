import classNames from "classnames";

export default function MonthNavbar({displayedMonth,setDisplayedMonth, monthsCountForMonthCarousel}) 
{



    const handleShowPrevMonthClick = () => {
        setDisplayedMonth((displayedMonth - 1 + monthsCountForMonthCarousel) % monthsCountForMonthCarousel);
      };
    
    const handleShowNextMonthClick = () => {
        setDisplayedMonth((displayedMonth + 1) % monthsCountForMonthCarousel);
      };

    return (
        <div className="bg-blue-400 w-full h-10 flex justify-start">
        <button
          className={classNames(
              "py-2 px-4  text-white",
              displayedMonth === 0 ? "bg-gray-500 cursor-default" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
          )}
          onClick={handleShowPrevMonthClick}
          disabled={displayedMonth === 0}
          >
          Poprzedni miesiąc
          </button>
          <button
          className={classNames(
              "py-2 px-4 rounded-r-md text-white",
              displayedMonth === monthsCountForMonthCarousel - 1 ? "bg-gray-500 cursor-default" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
          )}
          onClick={handleShowNextMonthClick}
          disabled={displayedMonth === monthsCountForMonthCarousel - 1}
          >
          Następny miesiąc
          </button>
          </div>
    )    
}