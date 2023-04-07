
export default function DesktopMenu({isOpen}) 
{

    return (
    <div className={`top-0 left-0 w-[35vw] bg-blue-600  p-10 pl-20 text-white absolute z-20 h-full  ease-in-out duration-300 ${
    isOpen ? "translate-x-0 " : "-translate-x-full"
    }`} >
        <h3 className="mt-20 text-4xl font-semibold text-white">I am a sidebar</h3>
    </div>
)
}