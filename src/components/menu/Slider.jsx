
import MenuContent from "./MenuContent";

export default function DesktopMenu({isOpen, setIsOpen, theme}) 
{
    const handleClick = ( ) => setIsOpen(false);

    return (
    <nav className={`${theme? theme : 'bg-orange-300 '} top-0 left-0 md:w-[35vw] p-10 w-full md:pl-20 md:inline-block flex justify-center items-start text-white absolute z-30 h-full ease-in-out duration-300 ${
    isOpen ? "translate-x-0 " : "-translate-x-full"
    }`} >
        
    <MenuContent handleClick={handleClick}/>

    </nav>
)
}