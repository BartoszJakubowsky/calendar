import {motion as m} from 'framer-motion';
import axios from 'axios';

export default function UserRegister({items, setUsersRegister}) 
{

    const variantsForUsersPasswords = 
    {
          hidden: { opacity: 0, y: -200},
          enter: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8}},
          exit: { opacity: 0, x: 0, y: -200},
    }

    const handleAccpetRegister = (index) => 
    {
        const user = [items[index]];
        axios.post('http://localhost:3002/add_user', user).then(response => 
        {
            
            setTimeout(() => 
            {
                // setUsersRegister(response.data)
                console.log(response.data)
            }, 1000);
            
        }).catch(err => console.log('Błąd podczas wysyłania', err))
    }

    const handleAccpetAll = () => 
    {

        const acceptedUsersToRegister = items;
        if (acceptedUsersToRegister.length === 0)
            return;
            
        axios.post('http://localhost:3002/add_user', acceptedUsersToRegister).then(response => 
        {
            
            setTimeout(() => 
            {
                // setUsersRegister(response.data)
                console.log(response.data)
            }, 1000);
            
        }).catch(err => console.log('Błąd podczas wysyłania', err))
    }

    const acceptRegister = items.map((user, index)=>
    {
        return (
            <div key={index} className='md:text-lg text-gray-700 border-b border-x border-gray-500 bg-slate-100 flex flex-row justify-between items-center'>
                <div className='flex flex-col pl-2'>
                <p>{user.name}</p>
                <p>{user.mail}</p>
                </div>
                <button onClick={() => handleAccpetRegister(index)} className="bg-blue-400 w-fit p-2 h-fit mr-2 rounded-sm btn ripple  text-white  active:scale-110 hover:text-black hover:bg-blue-100 duration-200">Zaakceptuj</button>
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
            {acceptRegister}
        </m.div>
    )
}