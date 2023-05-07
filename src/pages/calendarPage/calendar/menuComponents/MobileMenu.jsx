   

  import MenuContent from "./MenuContent";


  export default function MobileMenu({isOpen, setIsOpen}) 
  {

    const handleClick = ( ) => setIsOpen(false);
    // bg-opacity-50
    //${isOpen? 'backdrop-blur-sm backdrop-brightness-75 ' : 'pointer-events-none opacity-0' }`}>
    return (
        <div className={`w-full h-full top-0 left-0 absolute z-20 ease-out duration-300 overflow-hidden flex justify-center items-start
         ${isOpen? 'bg-orange-300 translatex-0' : 'pointer-events-none opacity-0 -translate-x-full' }`}>
           <MenuContent handleClick={handleClick}/>
        </div>
    );
  }