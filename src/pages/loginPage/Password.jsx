import { useState } from "react";
import { useSpring, animated } from 'react-spring';
export default function Password() 
{

    const [mail, setMail] = useState('');
    const [sent, setSent] = useState(false);
    const [mailError, setMailError] = useState(false);
    const mailCheck = mail === '';

    const handleMailChange = (event) => 
    {

        if (mailCheck && mailCheck)
            setMailError(false);

        setMail(event.target.value);
    }

    const handleSendClick = (event) =>
    {
        event.preventDefault();
        if (mailCheck)
            setMailError(true)
        else
            setSent(true)
    }


    const buttonAnimation = useSpring({
        opacity: sent ? 0 : 1,
        transform: sent ? 'translateY(0%)' : 'translateY(100%)',
      });
    
      const messageAnimation = useSpring({
        opacity: sent ? 1 : 0,
        transform: sent ? 'translateY(0%)' : 'translateY(100%)',
      });


      
    return (
        <div className=" w-3/4 lg:w-1/2 p-6 m-auto bg-white rounded-md shadow-md">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
               Zresetuj hasło
            </h1>
            <form className="mt-6">
                <div className="mb-2">
                    <label
                        for="email"
                        className={`block text-sm font-semibold ${mailError? ' valid text-red-300' : 'text-gray-800'}`}
                    >
                        Wporawdź swój email lub imię i nazwisko
                    </label>
                    <input
                        type="email"
                        className="peer block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleMailChange}
                        onBlur={handleMailChange}
                        value={mail}
                        required 
                    />
                    {/* {mail !== '' ? <p class="invisible peer-invalid:visible text-red-700 font-light">
                    Please enter a valid email address
                    </p> : false} */}
                </div>
       
              <div className="overflow-hidden">
                <animated.button
                    style={buttonAnimation}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                    onClick={handleSendClick}
                >
                    {'Poproś o zresetowanie hasła'}
                </animated.button>

                <animated.div style={messageAnimation} className="w-full px-4 py-2 tracking-wide text-center rounded-md">
                    Twoja prośba została wysłana do Rysia Pysia
                </animated.div>
                </div>
            </form>
         
        </div>
);
}