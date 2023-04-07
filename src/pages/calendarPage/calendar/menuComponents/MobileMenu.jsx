   
  export default function MobileMenu({isOpen}) 
  {
    return (
        <div className={`w-full h-full top-0 left-0 absolute z-20 backdrop-blur-sm backdrop-brightness-75 flex justify-center items-center ease-out duration-150
         ${isOpen? 'opacity-100' : 'opacity-0' }`}>
            <ul>
                <li>Jakaś lista</li>
            </ul>
        </div>
    );
  }