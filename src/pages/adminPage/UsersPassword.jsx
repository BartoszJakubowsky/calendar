import {motion as m} from 'framer-motion';


export default function UserPassword({items}) 
{

    const variantsForUsersPasswords = 
    {
          hidden: { opacity: 0, y: -200},
          enter: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8}},
          exit: { opacity: 0, x: 0, y: -200},
    }

    const handleAccpetPassword = (index) => 
    {
        const user = items[index];
        console.log('Przenieś do userów z password: ', user);
    }

    const handleAccpetAll = () => 
    {
        console.log('Przenieś wszystkich userów z password');
    }


    const acceptPassword = items.map((user, index)=>
    {
        return (
            <div key={index} className='md:text-lg text-gray-700 border-b border-x border-gray-500 bg-slate-100 flex flex-row justify-between items-center'>
                <div className='flex flex-col pl-2'>
                <p>{user.name}</p>
                <p>{user.mail}</p>
                </div>
                <button onClick={() => handleAccpetPassword(index)} className="bg-blue-400 w-fit p-2 h-fit mr-2 rounded-sm btn ripple  text-white  active:scale-110 hover:text-black hover:bg-blue-100 duration-200">Zaakceptuj</button>
            </div>
        )
    })

    return (
      <m.div className="w-full h-full bg-blue-300 overflow-auto" variants={variantsForUsersPasswords} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'>
        <div className="w-full md:h-20 bg-white border-x border-b-blue-300 border-b border-blue-300 flex flex-col ">
        
        <button onClick={handleAccpetAll} className="bg-slate-400 w-fit p-2 mt-2 h-fit ml-2 rounded-sm btn ripple  text-white  active:scale-110 hover:text-black hover:bg-slate-100 duration-200">
            Zaakceptuj wszystkich
        </button>
       
      </div>
            {acceptPassword}
        </m.div>
    )
}