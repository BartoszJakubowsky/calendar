import {motion as m} from 'framer-motion';
import axios from 'axios';

export default function UserPassword({items, setMessage, updateAll}) 
{

    const variantsForUsersPasswords = 
    {
          hidden: { opacity: 0, y: -200},
          enter: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8}},
          exit: { opacity: 0, x: 0, y: -200},
    }

    const handleAccpetPassword = (index) => 
    {
        const user = [items[index]];

        axios.post('http://localhost:3002/password/add', user).then(response => 
        {  
            
                if (!response)
                    setMessage('Coś poszło nie tak');
                else
                    {
                        setMessage(response.data.message);
                        updateAll(response.data.data);
                    }
            
        }).catch(err => console.log('Błąd podczas pobierania danych', err))
    }

    const handleAccpetAll = () => 
    {
        const user = items;

        axios.post('http://localhost:3002/password/add', user).then(response => 
        {  

                if (!response)
                    setMessage('Coś poszło nie tak');
                else
                    {
                        setMessage(response.data.message);
                        updateAll(response.data.data);
                    }
        }).catch(err => console.log('Błąd podczas pobierania danych', err))
    }


    const acceptPassword = items.map((user, index)=>
    {
        return (
            <div key={index} className='md:text-lg h-fit py-2 text-gray-700 border-b border-x border-gray-500 bg-slate-100 flex flex-row justify-between items-center'>
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
        {items.length === 1 ? false : <div className="w-full h-14 md:h-20 bg-white border-x border-b-blue-300 border-b border-blue-300 flex flex-col ">
        {items.length === 0? <div className='bg-slate-400 w-fit p-2 mt-2 h-fit ml-2 rounded-sm btn ripple  text-white cursor-default'>Brak próśb o zresetowanie hasła 😁</div> : false}
        {items.length <2? false : <button onClick={handleAccpetAll} className="bg-slate-400 w-fit p-2 mt-2 h-fit ml-2 rounded-sm btn ripple  text-white  active:scale-110 hover:text-black hover:bg-slate-100 duration-200">
            Zaakceptuj wszystkich
        </button>}
       
      </div>}
            {acceptPassword}
        </m.div>
    )
}