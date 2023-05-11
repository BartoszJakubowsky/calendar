
//to do: db
//repair back and forward 
//create create user 
//post/delete calendars
//websockets connections per calendar









import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import AdminPage from './pages/AdminPage'
import CreateCalendarPage from './pages/CreateCalendarPage'
import NotFoundPage from './pages/NotFoundPage'
import Menu from './components/Menu'
//only for test purpusses -> at the end it's goint to be admin
import useCalendars from './hooks/useCalendars';
import useAuthenctication from './hooks/useAuthentication';
// import CalendarPage from './pages/calendarPage/CalendarPage'
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation} from 'react-router-dom';
import React, {Suspense} from 'react';
import LoadingIcon from './components/LoadingIcon'
import {motion as m} from 'framer-motion';
const LazyCalendarPage = React.lazy(()=> import('./pages/calendarPage/CalendarPage'));

function App()
{
      const {isAdmin} = useAuthenctication();
      const {login, calendars, calendarToEdit, currentPath} = useCalendars();
      const location = useLocation();

      const formsPaths = ['/logowanie', '/haslo', '/rejestracja'];

      const calendarsRoutes = calendars.map(calendar=>
            {
                  if (calendar.name === undefined || calendar.name === '')
                  return false;
                  const name = '/' + (calendar.name).replaceAll(' ', '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  // const LazyCalendarPage = React.lazy(()=> import('./pages/calendarPage/CalendarPage'));

                  const variantsForSuspense = 
                  {
                        hidden: { opacity: 0, x: -200, y: 0 },
                        enter: { opacity: 1, x: 0, y: 0 },
                        exit: { opacity: 0, x: 0, y: -100 },
                  }
                  // const RouteCalendarElement = (
                  //       <Suspense fallback={<m.div className='w-screen h-screen justify-center items-center flex' variants={variantsForSuspense} initial='hidden' animate='enter' transition={{type: 'linear'}} exit={{x: 200, transition: 0.2 }}><LoadingIcon classname={' fill-red-500'}></LoadingIcon></m.div>}>
                  //             <LazyCalendarPage calendar={calendar}/>
                  //       </Suspense>
                  // )
                  return (
                        <Route path={name} key={calendar.name} element={
                        <Suspense fallback={<m.div className='w-screen h-screen justify-center items-center flex' variants={variantsForSuspense} initial='hidden' animate='enter' transition={{type: 'linear'}} exit={{x: 200, transition: 0.2 }}><LoadingIcon classname={' fill-red-500'}></LoadingIcon></m.div>}>
                              <LazyCalendarPage calendar={calendar}/>
                        </Suspense>
                        }></Route>
                              // <Route path={name} key={calendar.name} element={<CalendarPage calendar={calendar} />} />
                        );
                              
            });
        
        return (<>
                  <AnimatePresence mode='wait'>
                  {/* {formsPaths.includes(currentPath)? false : <Menu className='flex'/>} */}
                  <Routes key={location.pathname} location={location}>
                        <Route path='/' element={<MainPage/>}/>
                        {formsPaths.map(form => {return <Route path={form} key={form} element={<LoginPage replace/>}/>})}
                              
                  {calendarsRoutes}
                  {/* {login &&
                  <Route path='/admin'
                         key='admin'>
                        <AdminPage/>
                  </Route>} */}
                  {isAdmin && 
                  <>
                  <Route path='/ustawienia' element={
                        <CreateCalendarPage 
                        calendarName={calendarToEdit?.name} 
                        calendarDate={calendarToEdit?.date} 
                        calendarTime={calendarToEdit?.time} 
                        calendarSlots={calendarToEdit?.slots}
                        calendarId={calendarToEdit?.id}/>}/>
                  <Route path='/admin' element={<AdminPage/>}/>   
                  </>}
                  <Route path='*'element={<NotFoundPage/>}/>

                  </Routes>

                  </AnimatePresence>
                  </>)
}

export default App; 