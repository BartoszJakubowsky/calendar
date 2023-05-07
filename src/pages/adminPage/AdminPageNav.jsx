import classNames from 'classnames';
import {motion as m} from 'framer-motion';
import { useSprings, animated } from 'react-spring';

export default function AdminPageNav({display, setDisplay}) 
{

    const handleButtonClick = (index) => setDisplay(index);

    //  <div className='bg-black w-1/4 h-1 absolute top-8'></div>,
    // const underlines = 
    // [
    //     <div className='bg-black w-1/4 h-1 absolute top-8'></div>,
    //     <div className='bg-black w-1/4 h-1 absolute top-8'></div>,
    //     <div className='bg-black w-1/4 h-1 absolute top-8'></div>,
    //     <div className='bg-black w-1/4 h-1 absolute top-8'></div>
    // ];
   

    const userVariants = 
    {
          hidden: { opacity: 0},
          enter: { opacity: 1, transition:{duration: 0.5, delay: 0.3}},
          exit: { opacity: 0,  transition:{duration: 0.5, delay: 0.6}},
    }
    const userPasswordVariants = 
    {
     hidden: { opacity: 0},
    enter: { opacity: 1, transition:{duration: 0.5, delay: 0.5}},
    exit: { opacity: 0,  transition:{duration: 0.5, delay: 0.4}},

    }
    const userRegisterVariants = 
    {
        hidden: { opacity: 0},
        enter: { opacity: 1, transition:{duration: 0.5, delay: 0.7}},
        exit: { opacity: 0,  transition:{duration: 0.5, delay: 0.2}},
    }
    const calendarsVariants = 
    {
        hidden: { opacity: 0},
        enter: { opacity: 1, transition:{duration: 0.5, delay: 0.9}},
        exit: { opacity: 0,  transition:{duration: 0.5}},
    }
    const variants = [userVariants, userPasswordVariants, userRegisterVariants, calendarsVariants];

    const underlines = 
    [
        <m.div className=' bg-slate-700 w-3/4 rounded-md h-1' variants={variants[display]} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'></m.div>,
        <div></div>,
        <div></div>,
        <div></div>
    ];
    const springs = useSprings(
        underlines.length,
        underlines.map((form, index) => ({
        transform: `translateX(${(display - index) * 100}%)`,
        position: "absolute",
        width: "25%",
        background: '',
        opacity: 1,
        top: 32,
        left: 0,
        display: "flex",
        justifyContent: "center",
        }))
    );

 
    const buttonsClassNames = classNames( 'text-black hover:text-white duration-200 hover:duration-200 focus:font-semibold active:scale-105 w-full h-full transition-font-weight font-normal', );
    return (<>
        <nav className="relative w-full h-10 bg-blue-200 flex flex-row rounded-sm bg-blue-200">
            <m.button className={buttonsClassNames} onClick={()=>handleButtonClick(0)} variants={variants[0]} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'>Użytkownicy</m.button>
            <m.button className={buttonsClassNames} onClick={()=>handleButtonClick(1)} variants={variants[1]} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'>Prośby o reset hasła</m.button>
            <m.button className={buttonsClassNames} onClick={()=>handleButtonClick(2)} variants={variants[2]} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'>Prośby o rejestrację</m.button>
            <m.button className={buttonsClassNames} onClick={()=>handleButtonClick(3)} variants={variants[3]} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'>Kalendarze</m.button>
            {springs.map((props, index) => (
                <animated.div key={index} className={''} style={{...props}} >
                    {underlines[index]}
                </animated.div>
            ))}
        </nav>
        </>)
}