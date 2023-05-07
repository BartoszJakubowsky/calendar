
import MenuContent from "./MenuContent";

export default function DesktopMenu({isOpen, setIsOpen}) 
{
    const handleClick = ( ) => setIsOpen(false);

    return (
    <nav className={`top-0 left-0 w-[35vw] bg-orange-300 p-10 pl-20 text-white absolute z-20 h-full  ease-in-out duration-300 ${
    isOpen ? "translate-x-0 " : "-translate-x-full"
    }`} >
        
    <MenuContent handleClick={handleClick}/>

    </nav>
)
}