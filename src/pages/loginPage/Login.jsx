import { useState } from "react";
import { useSpring, animated } from 'react-spring';
import Password from "./Password";

export default function Login({mail, setMail, move}) 
{

    const [password, setPassword] = useState('');


    const [mailError, setMailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    const mailCheck = mail.length <= 5 || mail === '';
    const passwordCheck = password.length <= 3 || password === '';

    const [sent, setSent] = useState(false);

    
    const handleMailChange = (event) => 
    {   
        
        if (mailError && !mailCheck)
            setMailError(false);

        setMail(event.target.value);
    }


    const handleRegisterClick = () => 
    {
        window.history.pushState({}, '', '/register');  
        move(2);
    }
    const handlePasswordClick = () => 
    {
        window.history.pushState({}, '', '/password');  
        move(0);
    }

    const handlePasswordChange = (event) => 
    {

        if (passwordError && !passwordCheck)
            setPasswordError(false)
        
        setPassword(event.target.value);
    }


    const handleSendClick = (event) =>
    {
        event.preventDefault();

        

        if (mailCheck)
            setMailError(true)
      
        if (passwordCheck)
            setPasswordError(true);


        if (mailCheck || passwordCheck)
            setSent(false);
        else
            setSent(true);  
    }



    const buttonAnimation = useSpring({
        opacity: sent ? 0 : 1,
        transform: sent ? 'translateY(0%)' : 'translateY(100%)'
       
      });
    
      const messageAnimation = useSpring({
        opacity: sent ? 1 : 0,
        transform: sent ? 'translateY(0%)' : 'translateY(100%)',
      });

      
    return (
        <div className=" w-11/12 lg:w-1/2 p-6 m-auto bg-white rounded-md shadow-md">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
               Zaloguj się
            </h1>
            <form className="mt-6">
                <div className="mb-2">
                    <label
                        for="email"
                        className={`block text-sm font-semibold  ${mailError? 'valid text-red-300 duration-75' : 'text-gray-800 duration-300'}`}
                    >
                        Twój email
                    </label>
                    <input
                        type="email"
                        className="peer block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleMailChange}
                        onBlur={handleMailChange}
                        value={mail}
                        required 
                    />
                    <label
                        for="password"
                        className={`block text-sm font-semibold ${passwordError? ' valid text-red-300' : 'text-gray-800'}`}
                    >
                        Twoje hasło
                    </label>
                    <input
                        type="password"
                        className="peer block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordChange}
                        value={password}
                        required 
                    />
                </div>
       
              <div className="overflow-hidden">
              <a
                        className="text-xs text-purple-600 hover:underline"
                        onClick={handlePasswordClick}
                    >
                        Zapomniałeś hasła?
                    </a>
                <animated.button
                    style={buttonAnimation}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                    onClick={handleSendClick}
                >
                    Zaloguj się
                </animated.button>

                <animated.div style={messageAnimation} className="w-full px-4 py-2 tracking-wide text-center flex justify-center flex-col">
                    Poczekaj, sprawdzamy twoje dane
                    <div role="status" className="flex justify-center mt-4">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-white animate-spin fill-purple-700" viewBox="0 0 100 101" fill="none" >
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                </animated.div>
               
                </div>
            </form>
            <p className="mt-8 text-xs font-light text-center text-gray-700 flex flex-col">
                    
                    Nie masz jeszcze konta?
                    <a
                        className="font-medium text-purple-600 hover:underline"
                        onClick={handleRegisterClick}
                    >
                        Wyślij prośbę o rejestrację
                    </a>
                </p>
        </div>
);
}